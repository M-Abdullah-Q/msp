"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Settings,
  Users,
  Share2,
  ArrowLeft,
  Circle,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function StreamPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "create";
  const streamCode = searchParams.get("code") || "";

  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [streamId] = useState(() =>
    Math.random().toString(36).substring(2, 8).toUpperCase()
  );

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Simulate getting user media (in a real app, you'd request actual camera access)
    if (videoRef.current && mode === "create") {
      // This would be replaced with actual getUserMedia call
      videoRef.current.style.background =
        "linear-gradient(45deg, #8B5CF6, #3B82F6)";
    }
  }, [mode]);

  useEffect(() => {
    // Simulate viewer count updates when live
    if (isLive) {
      const interval = setInterval(() => {
        setViewerCount((prev) => prev + Math.floor(Math.random() * 3));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isLive]);

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    // In a real app, this would mute/unmute the audio track
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    // In a real app, this would enable/disable the video track
  };

  const startStream = () => {
    setIsLive(true);
    setViewerCount(1);
    // In a real app, this would start the actual stream
  };

  const stopStream = () => {
    setIsLive(false);
    setViewerCount(0);
    // In a real app, this would stop the stream
  };

  const getTitle = () => {
    switch (mode) {
      case "create":
        return "Your Stream";
      case "join":
        return `Joining Stream: ${streamCode}`;
      case "watch":
        return "Live Streams";
      default:
        return "Stream";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iIzhCNUNGNiIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-20"></div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Video className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold">FermWatch</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isLive && (
              <div className="flex items-center space-x-2">
                <Badge
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-600"
                >
                  <Circle
                    className="w-2 h-2 mr-1 animate-pulse"
                    fill="currentColor"
                  />
                  LIVE
                </Badge>
                <div className="flex items-center space-x-1 text-gray-300">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{viewerCount}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            {getTitle()}
          </h1>

          {/* Video Container */}
          <Card className="bg-black/50 backdrop-blur-lg border-white/20 mb-8">
            <CardContent className="p-6">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                {mode === "create" ? (
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                    <div className="text-center text-gray-400">
                      <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">
                        {mode === "join"
                          ? "Connecting to stream..."
                          : "Select a stream to watch"}
                      </p>
                    </div>
                  </div>
                )}

                {/* Video Overlay */}
                {!isVideoEnabled && mode === "create" && (
                  <div className="absolute inset-0 bg-black flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <VideoOff className="w-16 h-16 mx-auto mb-4" />
                      <p>Camera is off</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Stream Info */}
          {mode === "create" && (
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-8">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Stream Code
                  </h3>
                  <div className="inline-flex items-center space-x-2 bg-black/30 rounded-lg px-4 py-2">
                    <code className="text-2xl font-mono text-purple-300">
                      {streamId}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-300 hover:text-white"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-gray-300 text-sm mt-2">
                    Share this code with viewers to join your stream
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Controls */}
          {mode === "create" && (
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {/* Media Controls */}
                  <div className="flex items-center space-x-3">
                    <Button
                      variant={isAudioEnabled ? "default" : "destructive"}
                      size="lg"
                      onClick={toggleAudio}
                      className="w-12 h-12 rounded-full"
                    >
                      {isAudioEnabled ? (
                        <Mic className="w-5 h-5" />
                      ) : (
                        <MicOff className="w-5 h-5" />
                      )}
                    </Button>

                    <Button
                      variant={isVideoEnabled ? "default" : "destructive"}
                      size="lg"
                      onClick={toggleVideo}
                      className="w-12 h-12 rounded-full"
                    >
                      {isVideoEnabled ? (
                        <Video className="w-5 h-5" />
                      ) : (
                        <VideoOff className="w-5 h-5" />
                      )}
                    </Button>
                  </div>

                  {/* Stream Control */}
                  <div className="flex items-center space-x-3">
                    {!isLive ? (
                      <Button
                        size="lg"
                        onClick={startStream}
                        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8"
                      >
                        Go Live
                      </Button>
                    ) : (
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={stopStream}
                        className="border-red-400 text-red-300 hover:bg-red-500 hover:text-white px-8"
                      >
                        End Stream
                      </Button>
                    )}
                  </div>

                  {/* Settings */}
                  <Button
                    variant="ghost"
                    size="lg"
                    className="w-12 h-12 rounded-full text-gray-300 hover:text-white"
                  >
                    <Settings className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
