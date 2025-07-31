import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Copy, Users, Lock, ArrowRight, Check } from "lucide-react";
import BackgroundAnimation from "../components/BackgroundAnimation";

const JoinRoom: React.FC = () => {
  const [roomId, setRoomId] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const generateRoomId = () => {
    const id = Math.random().toString(36).substring(2, 12).toUpperCase();
    setRoomId(id);
    setIsCreating(true);
  };

  const copyToClipboard = async () => {
    if (roomId) {
      const roomUrl = `${window.location.origin}/room/${roomId}`;
      await navigator.clipboard.writeText(roomUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      navigate(`/call?room=${roomId.trim()}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleJoinRoom();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-primary-50/20 dark:from-primary-950 dark:via-primary-900 dark:to-black pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <BackgroundAnimation />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="font-happy text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">
            Join or Create Room
          </h1>
          <p className="font-inter text-base sm:text-lg text-gray-600 dark:text-gray-300 px-4">
            Connect with others in a secure video chat room
          </p>
        </div>

        <div className="bg-white/80 dark:bg-primary-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200 dark:border-primary-700 mx-4">
          <div className="space-y-6 sm:space-y-8">
            {/* Create New Room */}
            <div className="text-center">
              <h2 className="font-inter font-semibold text-lg sm:text-xl text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center justify-center gap-2">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" />
                Create New Room
              </h2>
              <button
                onClick={generateRoomId}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-inter font-medium text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-bounce-subtle"
              >
                Generate Room ID
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-primary-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/80 dark:bg-primary-800/80 text-gray-500 dark:text-gray-400 font-inter">
                  or
                </span>
              </div>
            </div>

            {/* Join Existing Room */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label
                  htmlFor="roomId"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-inter"
                >
                  Room ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="roomId"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                    placeholder="Enter room ID or generate one above"
                    className="w-full px-4 py-3 dark:text-white text-neutral-950 dark:bg-primary-900 border border-gray-300 dark:border-primary-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 font-inter text-base sm:text-lg tracking-wider"
                  />
                  {isCreating && roomId && (
                    <button
                      type="button"
                      onClick={copyToClipboard}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200"
                      title="Copy room link"
                    >
                      {copied ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  )}
                </div>
                {copied && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-2 font-inter animate-slide-in">
                    Room link copied to clipboard!
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!roomId.trim()}
                className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-inter font-medium text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                Join Room
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </form>

            {/* Room Options */}
            {isCreating && roomId && (
              <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-primary-50 dark:bg-primary-900/50 rounded-xl border border-primary-200 dark:border-primary-700 animate-slide-in">
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 dark:text-primary-400" />
                  <h3 className="font-inter font-semibold text-sm sm:text-base text-primary-900 dark:text-primary-100">
                    Room Created
                  </h3>
                </div>
                <p className="font-inter text-sm text-primary-700 dark:text-primary-300 mb-3">
                  Your room ID is:{" "}
                  <span className="font-mono font-bold">{roomId}</span>
                </p>
                <p className="font-inter text-sm text-primary-600 dark:text-primary-400">
                  Share this ID with others to invite them to your room. The
                  room will be created when you join.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6 sm:mt-8 px-4">
          <Link
            to="/"
            className="font-inter text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
