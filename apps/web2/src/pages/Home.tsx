import React from "react";
import { Link } from "react-router-dom";
import {
  Video,
  Mic,
  Zap,
  MessageCircle,
  Share2,
  Shield,
  ArrowRight,
  Users,
  Globe,
  Settings,
} from "lucide-react";
import FloatingIcon from "../components/FloatingIcon";
import BackgroundAnimation from "../components/BackgroundAnimation";

const Home: React.FC = () => {
  const features = [
    {
      icon: Video,
      title: "HD Video Quality",
      description:
        "Experience crystal-clear video calls with adaptive quality that automatically adjusts to your internet connection for the best possible experience.",
      color: "text-blue-500 dark:text-blue-400",
      bgColor: "bg-blue-500",
    },
    {
      icon: Shield,
      title: "End-to-End Encryption",
      description:
        "Your conversations are protected with military-grade encryption, ensuring complete privacy and security for all your communications.",
      color: "text-green-500 dark:text-green-400",
      bgColor: "bg-green-500",
    },
    {
      icon: Zap,
      title: "Instant Connection",
      description:
        "No downloads, no sign-ups required. Create or join rooms instantly and start connecting with others in seconds.",
      color: "text-yellow-500 dark:text-yellow-400",
      bgColor: "bg-yellow-500",
    },
    {
      icon: Users,
      title: "Multi-Participant Support",
      description:
        "Host video calls with multiple participants, perfect for team meetings, family gatherings, or group discussions.",
      color: "text-purple-500 dark:text-purple-400",
      bgColor: "bg-purple-500",
    },
    {
      icon: MessageCircle,
      title: "Real-time Chat",
      description:
        "Communicate through text alongside your video call with our integrated chat system that syncs across all participants.",
      color: "text-pink-500 dark:text-pink-400",
      bgColor: "bg-pink-500",
    },
    {
      icon: Share2,
      title: "Screen Sharing",
      description:
        "Share your screen seamlessly for presentations, collaboration, or troubleshooting with just one click.",
      color: "text-indigo-500 dark:text-indigo-400",
      bgColor: "bg-indigo-500",
    },
    {
      icon: Settings,
      title: "Customizable Controls",
      description:
        "Personalize your experience with customizable audio and video settings, background blur, and more.",
      color: "text-gray-500 dark:text-gray-400",
      bgColor: "bg-gray-500",
    },
    {
      icon: Globe,
      title: "Cross-Platform",
      description:
        "Works seamlessly across all devices and browsers - desktop, mobile, tablet. Connect from anywhere, anytime.",
      color: "text-teal-500 dark:text-teal-400",
      bgColor: "bg-teal-500",
    },
  ];

  const steps = [
    {
      icon: Users,
      title: "Create or Join a Room",
      description:
        "Generate a unique room ID or enter an existing one to join a conversation. No account required.",
      color: "bg-blue-500",
      step: "01",
    },
    {
      icon: Video,
      title: "Enable Your Camera & Mic",
      description:
        "Grant camera and microphone permissions to start your video call with crystal-clear quality.",
      color: "bg-green-500",
      step: "02",
    },
    {
      icon: MessageCircle,
      title: "Connect & Collaborate",
      description:
        "Start your conversation, share screens, send messages, and enjoy seamless communication.",
      color: "bg-purple-500",
      step: "03",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-primary-50/20 dark:from-primary-950 dark:via-primary-900 dark:to-black transition-colors duration-500">
      <BackgroundAnimation />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center relative z-10">
            {/* Floating Icons - positioned to avoid text overlap */}
            <div className="hidden lg:block">
              <FloatingIcon Icon={Video} className="top-10 left-8" delay={0} />
              <FloatingIcon Icon={Mic} className="top-20 right-12" delay={1} />
              <FloatingIcon Icon={Zap} className="top-32 right-1/4" delay={2} />
              <FloatingIcon
                Icon={MessageCircle}
                className="top-16 left-1/4"
                delay={1.5}
              />
              <FloatingIcon
                Icon={Share2}
                className="top-40 right-8"
                delay={0.5}
              />
            </div>

            {/* Main Heading */}
            <h1 className="font-happy text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
              Connect.{" "}
              <span className="text-primary-600 dark:text-primary-400">
                Collaborate.
              </span>
              <br />
              Face-to-Face.
            </h1>

            {/* Subheading */}
            <p className="font-inter text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
              Experience seamless video communication with crystal-clear
              quality, instant connectivity, and secure conversations that bring
              people together.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4">
              <Link
                to="/join"
                className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-inter font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-glow flex items-center justify-center gap-2"
              >
                Start a Call
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>

              <button
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/80 dark:bg-primary-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-primary-800 text-gray-900 dark:text-white rounded-xl font-inter font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-gray-200 dark:border-primary-700"
              >
                Learn More
              </button>
            </div>

            {/* Features Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto px-4">
              <div className="group p-4 sm:p-6 bg-white/60 dark:bg-primary-800/40 backdrop-blur-sm rounded-2xl hover:bg-white/80 dark:hover:bg-primary-800/60 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-500 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300">
                  <Video className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="font-inter font-semibold text-base sm:text-lg text-gray-900 dark:text-white mb-2">
                  HD Video Quality
                </h3>
                <p className="font-inter text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Crystal-clear video calls with adaptive quality that adjusts
                  to your connection.
                </p>
              </div>

              <div className="group p-4 sm:p-6 bg-white/60 dark:bg-primary-800/40 backdrop-blur-sm rounded-2xl hover:bg-white/80 dark:hover:bg-primary-800/60 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-500 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="font-inter font-semibold text-base sm:text-lg text-gray-900 dark:text-white mb-2">
                  Secure & Private
                </h3>
                <p className="font-inter text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  End-to-end encryption ensures your conversations remain
                  completely private.
                </p>
              </div>

              <div className="group p-4 sm:p-6 bg-white/60 dark:bg-primary-800/40 backdrop-blur-sm rounded-2xl hover:bg-white/80 dark:hover:bg-primary-800/60 transition-all duration-300 transform hover:scale-105 hover:shadow-lg sm:col-span-2 lg:col-span-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-500 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="font-inter font-semibold text-base sm:text-lg text-gray-900 dark:text-white mb-2">
                  Instant Connection
                </h3>
                <p className="font-inter text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Join or create rooms instantly without any downloads or
                  sign-ups required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-happy text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 px-4">
              Powerful Features for
              <span className="text-primary-600 dark:text-primary-400">
                {" "}
                Seamless
              </span>{" "}
              Communication
            </h2>
            <p className="font-inter text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              Discover all the tools you need to connect, collaborate, and
              communicate effectively with our comprehensive video chat
              solution.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 px-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-4 sm:p-6 bg-white/60 dark:bg-primary-800/40 backdrop-blur-sm rounded-2xl hover:bg-white/80 dark:hover:bg-primary-800/60 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-gray-200/50 dark:border-primary-700/50"
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:rotate-12 transition-transform duration-300`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="font-inter font-semibold text-base sm:text-lg text-gray-900 dark:text-white mb-2 sm:mb-3">
                    {feature.title}
                  </h3>
                  <p className="font-inter text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-happy text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 px-4">
              How It{" "}
              <span className="text-primary-600 dark:text-primary-400">
                Works
              </span>
            </h2>
            <p className="font-inter text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              Get started with ConnectSpace in just three simple steps. No
              downloads, no complicated setup – just instant video
              communication.
            </p>
          </div>

          {/* Steps */}
          <div className="max-w-5xl mx-auto mb-12 sm:mb-16 px-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;

              return (
                <div key={index} className="relative">
                  <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 mb-8 sm:mb-12">
                    {/* Step Number & Icon */}
                    <div className="flex-shrink-0 relative">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/60 dark:bg-primary-800/40 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl border border-gray-200/50 dark:border-primary-700/50 group-hover:scale-105 transition-transform duration-300">
                        <div
                          className={`w-12 h-12 sm:w-16 sm:h-16 ${step.color} rounded-xl flex items-center justify-center`}
                        >
                          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                      </div>
                      <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-primary-500 rounded-full flex items-center justify-center">
                        <span className="font-inter font-bold text-white text-xs sm:text-sm">
                          {step.step}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="font-inter font-bold text-xl sm:text-2xl text-gray-900 dark:text-white mb-3 sm:mb-4">
                        {step.title}
                      </h3>
                      <p className="font-inter text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  {!isLast && (
                    <div className="flex justify-center mb-8 sm:mb-12">
                      <div className="p-2 sm:p-3 bg-primary-500/20 rounded-full">
                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center py-12 sm:py-16 px-4">
            <div className="bg-white/60 dark:bg-primary-800/40 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-12 max-w-4xl mx-auto border border-gray-200/50 dark:border-primary-700/50">
              <h3 className="font-happy text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Ready to Experience the Future of Video Calling?
              </h3>
              <p className="font-inter text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust ConnectSpace for their video
                communication needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Link
                  to="/join"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-inter font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-glow"
                >
                  Start Your First Call
                </Link>
                <button
                  onClick={() =>
                    document
                      .getElementById("features")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/80 dark:bg-primary-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-primary-800 text-gray-900 dark:text-white rounded-xl font-inter font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-gray-200 dark:border-primary-700"
                >
                  Explore Features
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
