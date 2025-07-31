import { useEffect, useRef, useState, useCallback } from "react";
import io from "socket.io-client";
import * as mediasoupClient from "mediasoup-client";

const localUrl = process.env.LOCAL_URL;

interface Participant {
  id: string;
  name: string;
  isLocal: boolean;
  stream?: MediaStream;
  audioEnabled?: boolean;
  videoEnabled?: boolean;
}

interface ConsumerTransport {
  consumerTransport: mediasoupClient.types.Transport;
  serverConsumerTransportId: string;
  producerId: string;
  consumer: mediasoupClient.types.Consumer;
}

interface UseMediaSoupReturn {
  participants: Participant[];
  localStream: MediaStream | null;
  isConnected: boolean;
  isProducing: boolean;
  joinRoom: (roomName: string) => void;
  leaveRoom: () => void;
  toggleAudio: () => void;
  toggleVideo: () => void;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
}

export const useMediaSoup = (): UseMediaSoupReturn => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isProducing, setIsProducing] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  const socketRef = useRef<any | null>(null); //fix this shi
  const deviceRef = useRef<mediasoupClient.types.Device | null>(null);
  const producerTransportRef = useRef<mediasoupClient.types.Transport | null>(
    null
  );
  const consumerTransportsRef = useRef<ConsumerTransport[]>([]);
  const audioProducerRef = useRef<mediasoupClient.types.Producer | null>(null);
  const videoProducerRef = useRef<mediasoupClient.types.Producer | null>(null);
  const rtpCapabilitiesRef =
    useRef<mediasoupClient.types.RtpCapabilities | null>(null);
  const consumingTransportsRef = useRef<string[]>([]);

  // MediaSoup parameters
  const params = {
    encodings: [
      {
        rid: "r0",
        maxBitrate: 100000,
        scalabilityMode: "S1T3",
      },
      {
        rid: "r1",
        maxBitrate: 300000,
        scalabilityMode: "S1T3",
      },
      {
        rid: "r2",
        maxBitrate: 900000,
        scalabilityMode: "S1T3",
      },
    ],
    codecOptions: {
      videoGoogleStartBitrate: 1000,
    },
  };

  const getLocalStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: {
            min: 640,
            max: 1920,
          },
          height: {
            min: 400,
            max: 1080,
          },
        },
      });

      console.log("Local stream obtained:", stream);
      console.log("Local stream tracks:", stream.getTracks());

      setLocalStream(stream);

      setParticipants((prev) => {
        console.log("Adding local participant, current participants:", prev);
        const withoutLocal = prev.filter((p) => !p.isLocal);

        const newParticipants = [
          ...withoutLocal,
          {
            id: "local",
            name: "You",
            isLocal: true,
            stream: stream,
            audioEnabled: true,
            videoEnabled: true,
          },
        ];

        console.log("New participants array:", newParticipants);
        return newParticipants;
      });

      console.log("Local stream setup complete");
      return stream;
    } catch (error) {
      console.error("Error getting local stream:", error);
      throw error;
    }
  }, []);

  const createDevice = useCallback(async () => {
    try {
      const device = new mediasoupClient.Device();

      if (!rtpCapabilitiesRef.current) {
        throw new Error("RTP capabilities not available");
      }

      await device.load({
        routerRtpCapabilities: rtpCapabilitiesRef.current,
      });

      deviceRef.current = device;
      console.log("Device RTP Capabilities", device.rtpCapabilities);

      return device;
    } catch (error) {
      console.error("Error creating device:", error);
      if (
        typeof error === "object" &&
        error !== null &&
        "name" in error &&
        (error as { name?: string }).name === "UnsupportedError"
      ) {
        console.warn("Browser not supported");
      }
      throw error;
    }
  }, []);

  const createSendTransport = useCallback(async (roomName: any) => {
    return new Promise<void>((resolve, reject) => {
      if (!socketRef.current) {
        reject(new Error("Socket not connected"));
        return;
      }

      socketRef.current.emit(
        "createWebRtcTransport",
        { consumer: false, roomName },
        ({ params: transportParams }: { params: any }) => {
          if (transportParams.error) {
            console.error(transportParams.error);
            reject(new Error(transportParams.error));
            return;
          }

          if (!deviceRef.current) {
            reject(new Error("Device not created"));
            return;
          }

          const producerTransport =
            deviceRef.current.createSendTransport(transportParams);
          producerTransportRef.current = producerTransport;

          producerTransport.on(
            "connect",
            async ({ dtlsParameters }, callback, errback) => {
              try {
                if (!socketRef.current) {
                  throw new Error("Socket not connected");
                }
                const transportId = producerTransport.id;
                await new Promise<void>((resolve) => {
                  socketRef.current!.emit(
                    "transport-connect",
                    { dtlsParameters, transportId },
                    resolve
                  );
                });

                callback();
              } catch (error) {
                errback(error as Error);
              }
            }
          );

          producerTransport.on(
            "produce",
            async (parameters, callback, errback) => {
              try {
                if (!socketRef.current) {
                  throw new Error("Socket not connected");
                }

                await new Promise<void>((resolve) => {
                  socketRef.current!.emit(
                    "transport-produce",
                    {
                      kind: parameters.kind,
                      rtpParameters: parameters.rtpParameters,
                      appData: parameters.appData,
                    },
                    (data: {
                      id: string;
                      producersExist: boolean;
                      error?: string;
                    }) => {
                      callback({ id: data.id });

                      if (data.producersExist) {
                        getProducers();
                      }
                      resolve();
                    }
                  );
                });
              } catch (error) {
                errback(error as Error);
              }
            }
          );

          resolve();
        }
      );
    });
  }, []);

  const connectSendTransport = useCallback(
    async (stream: MediaStream) => {
      if (!producerTransportRef.current) {
        throw new Error("Producer transport not created");
      }

      const audioTrack = stream.getAudioTracks()[0];
      const videoTrack = stream.getVideoTracks()[0];

      try {
        if (audioTrack) {
          const audioProducer = await producerTransportRef.current.produce({
            track: audioTrack,
          });
          audioProducerRef.current = audioProducer;

          audioProducer.on("trackended", () => {
            console.log("Audio track ended");
          });

          audioProducer.on("transportclose", () => {
            console.log("Audio transport ended");
          });
        }

        if (videoTrack) {
          const videoProducer = await producerTransportRef.current.produce({
            track: videoTrack,
            ...params,
          });
          videoProducerRef.current = videoProducer;

          videoProducer.on("trackended", () => {
            console.log("Video track ended");
          });

          videoProducer.on("transportclose", () => {
            console.log("Video transport ended");
          });
        }

        setIsProducing(true);
      } catch (error) {
        console.error("Error connecting send transport:", error);
        throw error;
      }
    },
    [params]
  );

  const signalNewConsumerTransport = useCallback(
    async (remoteProducerId: string) => {
      if (consumingTransportsRef.current.includes(remoteProducerId)) return;
      consumingTransportsRef.current.push(remoteProducerId);

      if (!socketRef.current) return;

      socketRef.current!.emit(
        "createWebRtcTransport",
        { consumer: true },
        ({ params: transportParams }: { params: any }) => {
          if (transportParams.error) {
            console.error(transportParams.error);
            return;
          }

          if (!deviceRef.current) return;

          let consumerTransport;
          try {
            consumerTransport =
              deviceRef.current.createRecvTransport(transportParams);
          } catch (error) {
            console.error(error);
            return;
          }

          consumerTransport.on(
            "connect",
            async ({ dtlsParameters }, callback, errback) => {
              try {
                if (!socketRef.current) {
                  throw new Error("Socket not connected");
                }

                await new Promise<void>((resolve) => {
                  socketRef.current!.emit(
                    "transport-recv-connect",
                    {
                      dtlsParameters,
                      serverConsumerTransportId: transportParams.id,
                    },
                    resolve
                  );
                });

                callback();
              } catch (error) {
                errback(error as Error);
              }
            }
          );

          connectRecvTransport(
            consumerTransport,
            remoteProducerId,
            transportParams.id
          );
        }
      );
    },
    []
  );

  const connectRecvTransport = useCallback(
    async (
      consumerTransport: mediasoupClient.types.Transport,
      remoteProducerId: string,
      serverConsumerTransportId: string
    ) => {
      if (!socketRef.current || !deviceRef.current) return;

      socketRef.current!.emit(
        "consume",
        {
          rtpCapabilities: deviceRef.current.rtpCapabilities,
          remoteProducerId,
          serverConsumerTransportId,
        },
        async ({ params: consumeParams }: { params: any }) => {
          if (consumeParams.error) {
            console.error("Cannot Consume");
            return;
          }

          const consumer = await consumerTransport.consume({
            id: consumeParams.id,
            producerId: consumeParams.producerId,
            kind: consumeParams.kind,
            rtpParameters: consumeParams.rtpParameters,
          });

          consumerTransportsRef.current = [
            ...consumerTransportsRef.current,
            {
              consumerTransport,
              serverConsumerTransportId: consumeParams.id,
              producerId: remoteProducerId,
              consumer,
            },
          ];

          const { track } = consumer;
          const stream = new MediaStream([track]);

          // Add or update participant
          setParticipants((prev) => {
            const existingIndex = prev.findIndex(
              (p) => p.id === remoteProducerId
            );
            const participantName = `Participant ${remoteProducerId.slice(-4)}`;

            if (existingIndex !== -1) {
              const updated = [...prev];
              updated[existingIndex] = {
                ...updated[existingIndex],
                stream,
                audioEnabled: consumeParams.kind === "audio",
                videoEnabled: consumeParams.kind === "video",
              };
              return updated;
            } else {
              return [
                ...prev,
                {
                  id: remoteProducerId,
                  name: participantName,
                  isLocal: false,
                  stream,
                  audioEnabled: consumeParams.kind === "audio",
                  videoEnabled: consumeParams.kind === "video",
                },
              ];
            }
          });

          if (socketRef.current) {
            socketRef.current.emit("consumer-resume", {
              serverConsumerId: consumeParams.serverConsumerId,
            });
          }
        }
      );
    },
    []
  );

  const getProducers = useCallback(() => {
    if (!socketRef.current) return;

    socketRef.current.emit("getProducers", (producerIds: string[]) => {
      console.log("Available producers:", producerIds);
      producerIds.forEach(signalNewConsumerTransport);
    });
  }, [signalNewConsumerTransport]);

  // const joinExisting = useCallback(
  //   async ({ roomName }: { roomName: string }) => {
  //     //we need to create two consumers for each existing participant
  //     //for that we will need all the existing remoteProducerIDs.
  //     //the add them to the consumers List
  //     socketRef.current!.emit("joinExisting", { roomName }, (data: any) => {
  //       //get producerList
  //       const producerList = data.producerList;
  //       try {
  //         producerList.map((producerId: any) => {
  //           signalNewConsumerTransport(producerId);
  //         });
  //       } catch (error) {
  //         console.error("Error Joining existing room : ", error);
  //       }
  //     });
  //   },
  //   []
  // );

  const joinRoom = useCallback(
    async (roomName: string) => {
      try {
        // Initialize socket
        socketRef.current = io(`https://${localUrl}:8000/call`);

        // Wait for connection before proceeding
        socketRef.current.on("connect", () => {
          console.log("Socket connected");
        });

        socketRef.current.on(
          "connection-success",
          async ({ socketId }: { socketId: string }) => {
            console.log("Connected with socket ID inside:", socketId);
            console.log("Before set");
            setIsConnected(true);
            console.log("After Set");

            try {
              const stream = await getLocalStream();

              console.log("after getLocal");

              // Add a timeout to the joinRoom emit
              const joinRoomPromise = new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                  reject(new Error("joinRoom timeout"));
                }, 10000); // 10 secs

                socketRef.current!.emit(
                  "joinRoom",
                  { roomName },
                  (response: any) => {
                    clearTimeout(timeout);
                    console.log("Received joinRoom response:", response);

                    if (response.error) {
                      reject(new Error(response.error));
                    } else {
                      resolve(response);
                    }
                  }
                );
              });

              const { rtpCapabilities } = (await joinRoomPromise) as any;
              console.log("After fn call");
              console.log("Router RTP Capabilities received:", rtpCapabilities);
              rtpCapabilitiesRef.current = rtpCapabilities;

              try {
                await createDevice();
                await createSendTransport(roomName);
                await connectSendTransport(stream);
                console.log("MediaSoup setup completed successfully");
              } catch (error) {
                console.error("Error in MediaSoup setup:", error);
              }
            } catch (error) {
              console.error("Error in room joining process:", error);
            }
          }
        );

        socketRef.current.on("connect_error", (error: any) => {
          console.error("Socket connection error:", error);
        });

        socketRef.current.on("disconnect", (reason: any) => {
          console.log("Socket disconnected:", reason);
          setIsConnected(false);
        });

        socketRef.current.on(
          "new-producer",
          ({ producerId }: { producerId: any }) => {
            console.log("New producer:", producerId);
            signalNewConsumerTransport(producerId);
          }
        );

        socketRef.current.on(
          "producer-closed",
          ({ remoteProducerId }: { remoteProducerId: any }) => {
            console.log("Producer closed:", remoteProducerId);
            const producerToClose = consumerTransportsRef.current.find(
              (transportData) => transportData.producerId === remoteProducerId
            );

            if (producerToClose) {
              producerToClose.consumerTransport.close();
              producerToClose.consumer.close();

              consumerTransportsRef.current =
                consumerTransportsRef.current.filter(
                  (transportData) =>
                    transportData.producerId !== remoteProducerId
                );

              setParticipants((prev) =>
                prev.filter((p) => p.id !== remoteProducerId)
              );
            }
          }
        );
      } catch (error) {
        console.error("Error joining room:", error);
      }
    },
    [
      getLocalStream,
      createDevice,
      createSendTransport,
      connectSendTransport,
      signalNewConsumerTransport,
    ]
  );

  const leaveRoom = useCallback(() => {
    //state check before disconnecting
    if (!socketRef.current || !isConnected) {
      return;
    }

    console.log("Leaving room...");

    if (socketRef.current.connected) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }

    consumerTransportsRef.current.forEach(({ consumerTransport, consumer }) => {
      consumerTransport.close();
      consumer.close();
    });

    consumerTransportsRef.current = [];
    consumingTransportsRef.current = [];

    setParticipants([]);
    setIsConnected(false);
    setIsProducing(false);
  }, [localStream, isConnected]);

  const toggleAudio = useCallback(() => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);

        setParticipants((prev) =>
          prev.map((p) =>
            p.isLocal ? { ...p, audioEnabled: audioTrack.enabled } : p
          )
        );
      }
    }
  }, [localStream]);

  const toggleVideo = useCallback(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);

        setParticipants((prev) =>
          prev.map((p) =>
            p.isLocal ? { ...p, videoEnabled: videoTrack.enabled } : p
          )
        );
      }
    }
  }, [localStream]);

  useEffect(() => {
    return () => {
      leaveRoom();
    };
  }, [isConnected]);

  return {
    participants,
    localStream,
    isConnected,
    isProducing,
    joinRoom,
    leaveRoom,
    toggleAudio,
    toggleVideo,
    isAudioEnabled,
    isVideoEnabled,
  };
};
