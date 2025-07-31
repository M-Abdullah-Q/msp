import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  Share,
  Settings,
  Users,
} from "lucide-react";
import ChatPanel from "../components/ChatPanel";
import { useMediaSoup } from "../hook/useMediaSoup";

interface VideoCallProps {
  roomName?: string;
}

const VideoCall: React.FC<VideoCallProps> = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const roomName = params.get("room") || "default-room";

  const {
    participants,
    localStream,
    isConnected,
    // isProducing,
    joinRoom,
    leaveRoom,
    toggleAudio,
    toggleVideo,
    isAudioEnabled,
    isVideoEnabled,
  } = useMediaSoup();

  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  //joining use effect
  useEffect(() => {
    if (!hasJoined) {
      joinRoom(roomName);
      setHasJoined(true);
    }
  }, [roomName, hasJoined]);

  //cleanup for leaving
  useEffect(() => {
    return () => {
      if (isConnected) leaveRoom();
    };
  }, [isConnected, leaveRoom]);

  // Separate local and remote
  const localParticipant = participants.find((p) => p.isLocal);
  const remoteParticipants = participants.filter((p) => !p.isLocal);

  const handleEndCall = () => {
    leaveRoom();
    window.history.back();
  };

  const getConnectionStatus = () =>
    !isConnected ? "Connecting..." : "Connected";

  const setVideoRef =
    (participantId: string) => (el: HTMLVideoElement | null) => {
      videoRefs.current[participantId] = el;
      if (el) {
        const p = participants.find((x) => x.id === participantId);
        if (p?.stream) el.srcObject = p.stream;
      }
    };

  return (
    <div className="h-screen bg-primary-950 flex flex-col overflow-hidden relative">
      {/* Header */}
      <header className="bg-primary-900/80 backdrop-blur-sm px-3 sm:px-4 py-3 flex items-center justify-between border-b border-primary-800 z-10">
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-yellow-500"}`}
          ></div>
          <span className="font-inter text-white font-medium text-sm sm:text-base">
            Room: {roomName}
          </span>
          <div className="flex items-center gap-1 text-primary-300">
            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">{participants.length}</span>
          </div>
          <span className="text-xs text-primary-400">
            {getConnectionStatus()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 sm:p-2 hover:bg-primary-800 rounded-lg transition-colors duration-200 text-primary-300 hover:text-white">
            <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </header>

      {/* Video and Chat */}
      <div className="flex-1 flex relative">
        <div
          className={`flex-1 p-2 sm:p-4 transition-all duration-300 ${isChatOpen ? "mr-64 sm:mr-80" : ""}`}
        >
          <div className="h-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            {remoteParticipants.map((participant) => (
              <div
                key={participant.id}
                className="relative bg-primary-900 rounded-xl overflow-hidden shadow-2xl border-2 transition-all duration-300 border-primary-700 hover:border-primary-600"
              >
                {participant.stream && participant.videoEnabled !== false ? (
                  <video
                    ref={setVideoRef(participant.id)}
                    autoPlay
                    playsInline
                    muted={false}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-900 flex items-center justify-center">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-white">
                        {participant.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center justify-between">
                  <span className="text-white font-inter font-medium text-sm truncate">
                    {participant.name}
                    {participant.isLocal && " (You)"}
                  </span>
                  <div className="flex items-center gap-2">
                    {participant.audioEnabled === false && (
                      <MicOff className="w-4 h-4 text-red-400" />
                    )}
                    {participant.videoEnabled === false && (
                      <VideoOff className="w-4 h-4 text-red-400" />
                    )}
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

        {/* Floating local video box */}
        {localParticipant && (
          <div className="absolute bottom-24 right-6 w-36 h-24 sm:w-48 sm:h-32 bg-primary-900 rounded-xl overflow-hidden border-2 border-primary-500 shadow-lg z-20">
            <video
              ref={setVideoRef(localParticipant.id)}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-primary-900/90 backdrop-blur-sm px-3 sm:px-4 py-4 sm:py-6 border-t border-primary-800 flex items-center justify-center gap-4 z-10">
        <button
          onClick={toggleAudio}
          disabled={!localStream}
          className={`p-3 sm:p-4 rounded-full transition transform hover:scale-105 disabled:opacity-50 ${!isAudioEnabled ? "bg-red-500" : "bg-primary-700"}`}
          title={isAudioEnabled ? "Mute" : "Unmute"}
        >
          {isAudioEnabled ? (
            <Mic className="w-6 h-6" />
          ) : (
            <MicOff className="w-6 h-6" />
          )}
        </button>
        <button
          onClick={toggleVideo}
          disabled={!localStream}
          className={`p-3 sm:p-4 rounded-full transition transform hover:scale-105 disabled:opacity-50 ${!isVideoEnabled ? "bg-red-500" : "bg-primary-700"}`}
          title={isVideoEnabled ? "Stop Video" : "Start Video"}
        >
          {isVideoEnabled ? (
            <Video className="w-6 h-6" />
          ) : (
            <VideoOff className="w-6 h-6" />
          )}
        </button>
        <button
          onClick={() => setIsScreenSharing(!isScreenSharing)}
          disabled={!isConnected}
          className={`p-3 sm:p-4 rounded-full transition transform hover:scale-105 disabled:opacity-50 ${isScreenSharing ? "bg-primary-500" : "bg-primary-700"}`}
          title="Share screen"
        >
          <Share className="w-6 h-6" />
        </button>
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`p-3 sm:p-4 rounded-full transition transform hover:scale-105 ${isChatOpen ? "bg-primary-500" : "bg-primary-700"}`}
          title="Toggle chat"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
        <button
          onClick={handleEndCall}
          className="p-3 sm:p-4 bg-red-500 rounded-full transition transform hover:scale-105"
          title="End call"
        >
          <PhoneOff className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
