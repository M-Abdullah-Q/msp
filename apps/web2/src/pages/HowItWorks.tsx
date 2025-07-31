import React from 'react';
import { ArrowRight, UserPlus, Video, MessageCircle } from 'lucide-react';
import BackgroundAnimation from '../components/BackgroundAnimation';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Create or Join a Room',
      description: 'Generate a unique room ID or enter an existing one to join a conversation. No account required.',
      color: 'bg-blue-500',
      step: '01',
    },
    {
      icon: Video,
      title: 'Enable Your Camera & Mic',
      description: 'Grant camera and microphone permissions to start your video call with crystal-clear quality.',
      color: 'bg-green-500',
      step: '02',
    },
    {
      icon: MessageCircle,
      title: 'Connect & Collaborate',
      description: 'Start your conversation, share screens, send messages, and enjoy seamless communication.',
      color: 'bg-purple-500',
      step: '03',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-primary-50/20 dark:from-primary-950 dark:via-primary-900 dark:to-black pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <BackgroundAnimation />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="font-happy text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 px-4">
            How It <span className="text-primary-600 dark:text-primary-400">Works</span>
          </h1>
          <p className="font-inter text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
            Get started with ConnectSpace in just three simple steps. No downloads, no complicated setup – just instant video communication.
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
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 ${step.color} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                    </div>
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-primary-500 rounded-full flex items-center justify-center">
                      <span className="font-inter font-bold text-white text-xs sm:text-sm">{step.step}</span>
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

        {/* Demo Section */}
        <div className="bg-white/60 dark:bg-primary-800/40 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-12 text-center border border-gray-200/50 dark:border-primary-700/50 mb-12 sm:mb-16 mx-4">
          <h2 className="font-happy text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            See It in Action
          </h2>
          <p className="font-inter text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Watch how easy it is to get started with ConnectSpace and begin your first video call in seconds.
          </p>
          
          {/* Mock Video Player */}
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-primary-900 to-primary-800 rounded-xl overflow-hidden shadow-2xl border-2 border-primary-600/20">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-500 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                    <Video className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <p className="font-inter text-white text-base sm:text-lg">Demo Video Coming Soon</p>
                  <p className="font-inter text-primary-300 text-sm mt-2">Interactive tutorial and walkthrough</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-12 sm:py-16 px-4">
          <h2 className="font-happy text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Ready to Get Started?
          </h2>
          <p className="font-inter text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join your first video call now and experience the simplicity of ConnectSpace.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="/join"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-inter font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-glow flex items-center justify-center gap-2"
            >
              Create Your First Room
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="/features"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/80 dark:bg-primary-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-primary-800 text-gray-900 dark:text-white rounded-xl font-inter font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-gray-200 dark:border-primary-700"
            >
              Explore Features
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;