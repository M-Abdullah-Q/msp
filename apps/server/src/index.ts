import express from "express";
import https from "https";
import fs from "fs";

import { Server } from "socket.io";
import * as mediasoup from "mediasoup";
import { rtcMinPort, rtcMaxPort } from "./config/workerConfig";
import cors from "cors";

const app = express();
app.use(cors());

const httpServer = https.createServer(
  {
    key: fs.readFileSync("./src/certs/key.pem"),
    cert: fs.readFileSync("./src/certs/cert.pem"),
  },
  app
);

app.get("/", (req, res) => {
  res.json({ message: "Hello from base" });
});

httpServer.listen(8000, () => {
  console.log("Server Listening on 8000....");
});

let worker: mediasoup.types.Worker;

const createWorker = async () => {
  if (typeof worker !== "undefined") {
    return worker;
  }

  worker = await mediasoup.createWorker({
    rtcMinPort,
    rtcMaxPort,
  });
  console.log(`worker pid ${worker.pid}`);

  worker.on("died", (error) => {
    // This implies something serious happened, so kill the application
    console.error("mediasoup worker has died");
    setTimeout(() => process.exit(1), 2000); // exit in 2 seconds
  });

  return worker;
};

const io = new Server(httpServer, {
  cors: {
    origin: "*", // FE
    methods: ["GET", "POST"],
  },
});

import("./sfu/eventHandler").then((module) => {
  module.connections;
});

(async () => {
  worker = await createWorker();
})();

export { worker, io };
