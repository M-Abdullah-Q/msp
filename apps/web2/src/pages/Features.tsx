import React from 'react';
import { Video, Shield, Zap, Users, MessageCircle, Share2, Settings, Globe } from 'lucide-react';
import BackgroundAnimation from '../components/BackgroundAnimation';

const Features: React.FC = () => {
  const features = [
    {
      icon: Video,
      title: 'HD Video Quality',
      description: 'Experience crystal-clear video calls with adaptive quality that automatically adjusts to your internet connection for the best possible experience.',
      color: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-500',
    },
    {
      icon: Shield,
      title: 'End-to-End Encryption',
      description: 'Your conversations are protected with military-grade encryption, ensuring complete privacy and security for all your communications.',
      color: 'text-green-500 dark:text-green-400',
      bgColor: 'bg-green-500',
    },
    {
      icon: Zap,
      title: 'Instant Connection',
      description: 'No downloads, no sign-ups required. Create or join rooms instantly and start connecting with others in seconds.',
      color: 'text-yellow-500 dark:text-yellow-400',
      bgColor: 'bg-yellow-500',
    },
    {
      icon: Users,
      title: 'Multi-Participant Support',
      description: 'Host video calls with multiple participants, perfect for team meetings, family gatherings, or group discussions.',
      color: 'text-purple-500 dark:text-purple-400',
      bgColor: 'bg-purple-500',
    },
    {
      icon: MessageCircle,
      title: 'Real-time Chat',
      description: 'Communicate through text alongside your video call with our integrated chat system that syncs across all participants.',
      color: 'text-pink-500 dark:text-pink-400',
      bgColor: 'bg-pink-500',
    },
    {
      icon: Share2,
      title: 'Screen Sharing',
      description: 'Share your screen seamlessly for presentations, collaboration, or troubleshooting with just one click.',
      color: 'text-indigo-500 dark:text-indigo-400',
      bgColor: 'bg-indigo-500',
    },
    {
      icon: Settings,
      title: 'Customizable Controls',
      description: 'Personalize your experience with customizable audio and video settings, background blur, and more.',
      color: 'text-gray-500 dark:text-gray-400',
      bgColor: 'bg-gray-500',
    },
    {
      icon: Globe,
      title: 'Cross-Platform',
      description: 'Works seamlessly across all devices and browsers - desktop, mobile, tablet. Connect from anywhere, anytime.',
      color: 'text-teal-500 dark:text-teal-400',
      bgColor: 'bg-teal-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-primary-50/20 dark:from-primary-950 dark:via-primary-900 dark:to-black pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <BackgroundAnimation />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="font-happy text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 px-4">
            Powerful Features for
            <span className="text-primary-600 dark:text-primary-400"> Seamless</span> Communication
          </h1>
          <p className="font-inter text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
            Discover all the tools you need to connect, collaborate, and communicate effectively with our comprehensive video chat solution.
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
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:rotate-12 transition-transform duration-300`}>
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

        {/* CTA Section */}
        <div className="text-center py-12 sm:py-16 px-4">
          <div className="bg-white/60 dark:bg-primary-800/40 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-12 max-w-4xl mx-auto border border-gray-200/50 dark:border-primary-700/50">
            <h2 className="font-happy text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Ready to Experience the Future of Video Calling?
            </h2>
            <p className="font-inter text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust ConnectSpace for their video communication needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href="/join"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-inter font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-glow"
              >
                Start Your First Call
              </a>
              <a
                href="/how-it-works"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/80 dark:bg-primary-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-primary-800 text-gray-900 dark:text-white rounded-xl font-inter font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-gray-200 dark:border-primary-700"
              >
                Learn How It Works
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;