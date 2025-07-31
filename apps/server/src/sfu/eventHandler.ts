import { error } from "console";
import { io } from "..";
import {
  addProducer,
  createRouter,
  getProducers,
  getRouter,
  getSocketById,
} from "./routerManager";
import {
  addConsumer,
  addTransport,
  createWebRtcTransport,
  getClosingTransports,
  getConsumerTransport,
  getRoom,
  getTransport,
} from "./transportManager";

io.on("connection", (socket) => {
  console.log("defaulter", socket.id);
});
const connections = io.of("/call");

connections.on("connection", (socket) => {
  console.log(socket.id);
  socket.emit("connection-success", { socketId: socket.id });

  //joinRoom
  socket.on("joinRoom", async ({ roomName }, callback) => {
    try {
      console.log("Creating router for room:", roomName);
      const newRouter = await createRouter(roomName);

      if (!newRouter || !newRouter.rtpCapabilities) {
        throw new Error("Failed to create router or get RTP capabilities");
      }

      const rtpCapabilities = newRouter.rtpCapabilities;
      console.log("Router created successfully, sending RTP capabilities");

      callback({ rtpCapabilities });
      console.log("Callback sent successfully");
    } catch (error: any) {
      console.error("Error creating router:", error);
      callback({ error: error.message || "Failed to create router" });
    }
  });

  //createWebRtcTransport
  socket.on(
    "createWebRtcTransport",
    async ({ consumer, roomName }, callback) => {
      const router = getRouter(roomName);
      createWebRtcTransport(router).then(
        (transport: any) => {
          callback({
            params: {
              id: transport.id,
              iceParameters: transport.iceParameters,
              iceCandidates: transport.iceCandidates,
              dtlsParameters: transport.dtlsParameters,
            },
          });

          if (!consumer) {
            addProducer(roomName, transport.id);
            addTransport({
              socketId: socket.id,
              roomName,
              transport,
              consumer,
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  );

  //transport-connect
  socket.on(
    "transport-connect",
    async ({ dtlsParameters, transportId }, callback) => {
      try {
        const socketId = socket.id;
        const transport = getTransport({ socketId });
        if (!transport) {
          callback({ error: "Transport not found" });
          return;
        }
        transport.connect({ dtlsParameters });
        callback({ connected: true });
      } catch (error: any) {
        console.error("Error connecting transport:", error);
        callback({ error: error.message });
      }
    }
  );

  //transport-produce
  socket.on(
    "transport-produce",
    async ({ kind, rtpParameters, appData }, callback) => {
      const socketId = socket.id;
      const transport = getTransport({ socketId });
      if (!transport) {
        callback({ error: "Transport not found during  produce" });
        return;
      }

      const producer = await transport.produce({ kind, rtpParameters });

      const roomName = getRoom({ socketId });
      if (!roomName) {
        callback({ error: "room not found" });
        return;
      }

      const producerList = addProducer(roomName, producer);
      if (!producerList || !Array.isArray(producerList)) {
        callback({ error: "Error appending to producers list" });
        return;
      }

      await informConsumers(roomName, socketId, producer.id);

      console.log("Producer ID: ", producer.id, producer.kind);

      producer.on("transportclose", () => {
        console.log("transport for this producer closed ");
        producer.close();
      });

      // Send back to the client the Producer id
      callback({
        id: producer.id,
        producersExist: producerList.length > 1 ? true : false,
      });
    }
  );

  const informConsumers = async (
    roomName: string,
    socketId: string,
    producerId: string
  ) => {
    console.log(`just joined, id ${producerId}, ${roomName}, ${socketId}`);
    // Notify all other sockets in the room except the sender
    const producers = getProducers(roomName) || [];
    producers.forEach(async (producer: any) => {
      if (producer.socketId !== socketId) {
        const producerSocket = await getSocketById(socketId);
        if (producerSocket) {
          producerSocket.emit("new-producer", { producerId });
        }
      }
    });
  };

  //transport-recv-connect
  socket.on(
    "transport-recv-connect",
    async ({ dtlsParameters, serverConsumerTransportId }) => {
      console.log(`DTLS PARAMS: ${dtlsParameters}`);
      const consumerTransport = getConsumerTransport(serverConsumerTransportId);
      if (!consumerTransport) {
        console.error("Error connecting consumer transport");
        return;
      }
      await consumerTransport.connect({ dtlsParameters });
    }
  );

  //consume
  socket.on(
    "consume",
    async (
      { rtpCapabilities, remoteProducerId, serverConsumerTransportId },
      callback
    ) => {
      try {
        const socketId = socket.id;
        const roomName = getRoom({ socketId });
        if (!roomName) {
          throw new Error();
        }
        const router = getRouter(roomName);
        const consumerTransport = getConsumerTransport(
          serverConsumerTransportId
        );

        if (!consumerTransport) {
          throw new Error();
        }

        // check if the router can consume the specified producer
        if (
          router.canConsume({
            producerId: remoteProducerId,
            rtpCapabilities,
          })
        ) {
          // transport can now consume and return a consumer
          const consumer = await consumerTransport.consume({
            producerId: remoteProducerId,
            rtpCapabilities,
            paused: true,
          });

          consumer.on("transportclose", () => {
            console.log("transport close from consumer");
          });

          consumer.on("producerclose", () => {
            console.log("producer of consumer closed");
            socket.emit("producer-closed", { remoteProducerId });

            consumerTransport.close();
            let transports = getClosingTransports(
              roomName,
              serverConsumerTransportId
            );
            consumer.close();
            let consumers = getConsumerTransport(serverConsumerTransportId);
          });

          addConsumer({ consumer, roomName, socketId });

          //params for client
          const params = {
            id: consumer.id,
            producerId: remoteProducerId,
            kind: consumer.kind,
            rtpParameters: consumer.rtpParameters,
            serverConsumerId: consumer.id,
          };

          // send the params to the client
          callback({ params });
        }
      } catch (error: any) {
        console.log(error.message);
        callback({
          params: {
            error: error,
          },
        });
      }
    }
  );
});

export { connections };

//consumer-resume later
