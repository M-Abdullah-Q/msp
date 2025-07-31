import { Router } from "mediasoup/node/lib/RouterTypes";
import { worker } from "..";
import { mediaCodecs } from "../config/workerConfig";
import { AppData, Producer } from "mediasoup/node/lib/types";
import { io } from "..";
import { Socket } from "socket.io";

interface RoomInfo {
  router: Router;
  peers?: string[];
  producers?: Producer[];
}

const routers = new Map<string, RoomInfo>();

const getRouter = (roomName: string): Router => {
  try {
    const room = routers.get(roomName);
    if (!room) {
      throw new Error(`Room '${roomName}' does not exist`);
    }
    return room.router;
  } catch (error) {
    console.error("Error getting router : ", error);
    throw error;
  }
};

// const getRoom = (socketId: string): string | null => {
//   for (const [roomName, roomInfo] of routers.entries()) {
//     if (roomInfo.peers && roomInfo.peers.includes(socketId)) {
//       return roomName;
//     }
//   }
//   return null;
// }

const createRouter = async (roomName: string): Promise<Router> => {
  try {
    const newRouter = await worker.createRouter({ mediaCodecs });
    routers.set(roomName, { router: newRouter, producers: [] });
    return newRouter;
  } catch (error) {
    console.error("Error creating new Router : ", error);
    throw error;
  }
};

const getProducers = (roomName: string): Producer[] | undefined => {
  const room = routers.get(roomName);
  if (!room) {
    return undefined;
  }
  const producers = room?.producers;
  return producers;
};

const getProducer = (producerId: string): string => {
  return "";
};

const addProducer = (
  roomName: string,
  producer: Producer
): Producer[] | undefined => {
  const room = routers.get(roomName);
  if (!room) {
    return undefined;
  }
  if (!room.producers) {
    room.producers = [];
  }
  room.producers.push(producer);
  routers.set(roomName, room);
  return room.producers;
};

const addPeer = (roomName: string, socketId: string): string[] | undefined => {
  const room = routers.get(roomName);
  if (!room) {
    return undefined;
  }
  if (!room.peers) {
    room.peers = [];
  }
  room.peers.push(socketId);
  routers.set(roomName, room);
  return room.peers;
};

async function getSocketById(socketId: string): Promise<Socket | null> {
  try {
    const socket = io.sockets.sockets.get(socketId);

    if (socket) {
      console.log("Found socket:", socket.id);
      return socket;
    } else {
      console.log("Socket not found with ID:", socketId);
      return null;
    }
  } catch (error) {
    console.error("Error fetching socket:", error);
    return null;
  }
}

export {
  getRouter,
  createRouter,
  getProducers,
  addProducer,
  addPeer,
  getSocketById,
};
