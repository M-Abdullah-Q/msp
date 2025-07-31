import { Router } from "mediasoup/node/lib/RouterTypes";
import { Consumer, Producer, Transport } from "mediasoup/node/lib/types";

interface TransportInfo {
  socketId: string;
  roomName: string;
  transport: Transport;
  consumer: boolean;
}

interface ProducerInfo {
  socketId: string;
  roomName: string;
  producer: Producer;
}

interface ConsumerInfo {
  socketId: string;
  roomName: string;
  consumer: Consumer;
}

let participants: TransportInfo[] = [];
let producers: ProducerInfo[] = [];
let consumers: ConsumerInfo[] = [];

const addTransport = ({
  socketId,
  roomName,
  transport,
  consumer,
}: TransportInfo) => {
  participants = [...participants, { socketId, roomName, transport, consumer }];
};

const getTransport = ({
  socketId,
}: {
  socketId: string;
}): Transport | undefined => {
  const peer = participants.find((p) => p.socketId === socketId);
  return peer?.transport;
};

const getConsumerTransport = (transportId: string): Transport | undefined => {
  const transportInfo = participants.find(
    (p) => p.transport.id === transportId
  );
  return transportInfo?.transport;
};

const getClosingTransports = (
  roomName: string,
  transportId: string
): Transport[] => {
  return participants
    .filter((p) => p.roomName === roomName && p.transport.id !== transportId)
    .map((p) => p.transport);
};

const addProducerT = ({ producer, roomName, socketId }: ProducerInfo) => {
  producers = [...producers, { socketId, roomName, producer }];
};

const addConsumer = ({ consumer, roomName, socketId }: ConsumerInfo) => {
  consumers = [...consumers, { socketId, roomName, consumer }];
};

const getRoom = ({ socketId }: { socketId: string }): string | null => {
  const participant = participants.find((p) => p.socketId === socketId);
  return participant ? participant.roomName : null;
};

const createWebRtcTransport = async (router: Router) => {
  return new Promise(async (resolve, reject) => {
    try {
      const webRtcTransport_options = {
        listenIps: [
          {
            ip: "0.0.0.0", //chaange in prod.
            announcedIp: "10.0.0.115",
          },
        ],
        enableUdp: true,
        enableTcp: true,
        preferUdp: true,
      };

      let transport = await router.createWebRtcTransport(
        webRtcTransport_options
      );
      console.log(`transport id: ${transport.id}`);

      transport.on("dtlsstatechange", (dtlsState: any) => {
        if (dtlsState === "closed") {
          transport.close();
        }
      });

      transport.on("@close", () => {
        console.log("transport closed");
      });

      resolve(transport);
    } catch (error) {
      reject(error);
    }
  });
};

export {
  createWebRtcTransport,
  getTransport,
  addTransport,
  getRoom,
  addProducerT,
  getConsumerTransport,
  addConsumer,
  getClosingTransports,
};
