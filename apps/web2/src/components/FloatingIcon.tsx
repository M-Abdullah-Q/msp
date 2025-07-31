import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FloatingIconProps {
  Icon: LucideIcon;
  delay?: number;
  size?: number;
  className?: string;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ 
  Icon, 
  delay = 0, 
  size = 20, 
  className = '' 
}) => {
  return (
    <div
      className={`absolute animate-float pointer-events-none z-0 ${className}`}
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      <div className="p-2 bg-white/5 dark:bg-primary-800/20 backdrop-blur-sm rounded-full transition-all duration-300">
        <Icon 
          size={size} 
          className="text-primary-600/30 dark:text-primary-400/30 transition-colors duration-300" 
        />
      </div>
    </div>
  );
};

export default FloatingIcon;