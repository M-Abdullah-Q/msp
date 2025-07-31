const rtcMinPort = 2000;
const rtcMaxPort = 2020;

import { MediaKind } from "mediasoup/node/lib/rtpParametersTypes";

const mediaCodecs = [
  {
    kind: "audio" as MediaKind,
    mimeType: "audio/opus",
    clockRate: 48000,
    channels: 2,
  },
  {
    kind: "video" as MediaKind,
    mimeType: "video/VP8",
    clockRate: 90000,
    parameters: {
      "x-google-start-bitrate": 1000,
    },
  },
];

export { rtcMinPort, rtcMaxPort, mediaCodecs };
