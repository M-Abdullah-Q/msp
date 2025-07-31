import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Users } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Alice Cooper',
      content: 'Hey everyone! Thanks for joining the call.',
      timestamp: new Date(Date.now() - 300000),
      isOwn: false,
    },
    {
      id: '2',
      sender: 'You',
      content: 'Happy to be here! The video quality looks amazing.',
      timestamp: new Date(Date.now() - 240000),
      isOwn: true,
    },
    {
      id: '3',
      sender: 'Bob Wilson',
      content: 'Agreed! This platform is really smooth.',
      timestamp: new Date(Date.now() - 180000),
      isOwn: false,
    },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'You',
        content: newMessage.trim(),
        timestamp: new Date(),
        isOwn: true,
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 h-full w-64 sm:w-80 bg-primary-900/95 backdrop-blur-sm border-l border-primary-800 flex flex-col animate-slide-in z-40">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-primary-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" />
          <h3 className="font-inter font-semibold text-white text-sm sm:text-base">Chat</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-primary-800 rounded-lg transition-colors duration-200 text-primary-400 hover:text-white"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] px-3 sm:px-4 py-2 rounded-2xl ${
                message.isOwn
                  ? 'bg-primary-500 text-white rounded-br-md'
                  : 'bg-primary-800 text-white rounded-bl-md'
              }`}
            >
              {!message.isOwn && (
                <p className="text-xs text-primary-300 mb-1 font-inter font-medium">
                  {message.sender}
                </p>
              )}
              <p className="text-xs sm:text-sm font-inter leading-relaxed">{message.content}</p>
              <p className="text-xs text-primary-200 mt-1 opacity-70">
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t border-primary-800">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 bg-primary-800 border border-primary-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-primary-400 font-inter text-xs sm:text-sm"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-2 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPanel;