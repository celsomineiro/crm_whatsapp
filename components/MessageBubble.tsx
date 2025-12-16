import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <>
      {message.dateHeader && (
        <div className="flex justify-center my-4">
          <span className="bg-white dark:bg-panel-dark text-text-secondary-light dark:text-text-secondary-dark text-xs px-3 py-1.5 rounded-lg shadow-sm uppercase font-medium">
            {message.dateHeader}
          </span>
        </div>
      )}
      
      <div className={`flex ${message.isSentByMe ? 'justify-end' : 'justify-start'} mb-2`}>
        <div
          className={`
            p-2 rounded-lg shadow-sm relative max-w-[65%] min-w-[80px]
            ${message.isSentByMe 
              ? 'bg-message-out-light dark:bg-message-out-dark rounded-tr-none' 
              : 'bg-message-in-light dark:bg-message-in-dark rounded-tl-none'}
          `}
        >
          {message.senderName && (
            <p className="text-xs font-bold text-black dark:text-white mb-0.5 italic">
              {message.senderName}:
            </p>
          )}
          
          <p className={`text-sm text-text-primary-light dark:text-text-primary-dark ${message.isSentByMe ? 'pr-6' : ''} whitespace-pre-wrap`}>
            {message.text}
          </p>

          <div className={`flex items-center gap-1 absolute bottom-1 right-2`}>
            <span className="text-[10px] text-text-secondary-light dark:text-gray-300">
              {message.time}
            </span>
            {message.isSentByMe && (
              <span className={`material-symbols-outlined text-[14px] ${message.isRead ? 'text-blue-400' : 'text-text-secondary-light'}`}>
                done_all
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
