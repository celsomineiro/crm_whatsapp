import React, { useState, useEffect, useRef } from 'react';
import { Message } from '../types';

interface ChatSearchProps {
  messages: Message[];
  onClose: () => void;
}

export const ChatSearch: React.FC<ChatSearchProps> = ({ messages, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const filteredMessages = searchTerm.trim() 
    ? messages.filter((msg) => 
        msg.text && msg.text.toLowerCase().includes(searchTerm.toLowerCase())
      ).reverse() // Show newest first usually in search results
    : [];

  return (
    <div className="w-full h-full flex flex-col bg-secondary-light dark:bg-panel-dark border-l border-border-light dark:border-border-dark overflow-hidden">
      {/* Header */}
      <div className="h-[60px] flex items-center px-4 bg-secondary-light dark:bg-panel-dark border-b border-border-light dark:border-border-dark flex-shrink-0">
        <button 
          onClick={onClose}
          className="mr-3 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition text-text-secondary-light dark:text-text-secondary-dark"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
        <h2 className="text-base font-medium text-text-primary-light dark:text-text-primary-dark">
          Pesquisar mensagens
        </h2>
      </div>

      {/* Search Input Area */}
      <div className="p-3 bg-secondary-light dark:bg-panel-dark border-b border-border-light dark:border-border-dark shadow-sm z-10">
        <div className="relative flex items-center bg-white dark:bg-secondary-dark rounded-lg px-3 py-1.5">
          <button 
            className={`transition-all duration-200 ${searchTerm ? 'rotate-90 opacity-0 w-0' : 'rotate-0 opacity-100 w-6'}`}
          >
             <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark text-xl">search</span>
          </button>
          
          {searchTerm && (
             <button onClick={() => setSearchTerm('')} className="animate-in fade-in zoom-in duration-200 absolute left-2">
                <span className="material-symbols-outlined text-primary text-xl">arrow_back</span>
             </button>
          )}

          <input
            ref={inputRef}
            className="flex-1 ml-2 py-1 focus:outline-none text-text-primary-light dark:text-text-primary-dark text-sm bg-transparent border-none focus:ring-0 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          {searchTerm && (
            <button onClick={() => setSearchTerm('')}>
              <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark text-lg hover:text-text-primary-light">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Content / Results */}
      <div className="flex-1 overflow-y-auto scrollbar-thin bg-background-light dark:bg-background-dark">
        {!searchTerm ? (
          <div className="h-full flex flex-col items-center justify-center text-text-secondary-light dark:text-text-secondary-dark opacity-60">
             <span className="material-symbols-outlined text-6xl mb-4">search</span>
             <p className="text-sm">Pesquisar mensagens neste chat</p>
          </div>
        ) : filteredMessages.length === 0 ? (
           <div className="p-8 text-center text-text-secondary-light dark:text-text-secondary-dark">
              <p className="text-sm">Nenhuma mensagem encontrada para "{searchTerm}"</p>
           </div>
        ) : (
           <div className="py-2">
              {filteredMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className="px-4 py-3 cursor-pointer hover:bg-panel-light dark:hover:bg-panel-dark transition border-b border-transparent hover:border-border-light dark:hover:border-border-dark flex flex-col gap-1 group"
                >
                   <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                      {msg.dateHeader || msg.time}
                   </span>
                   <p className="text-sm text-text-primary-light dark:text-text-primary-dark line-clamp-2">
                      {msg.text}
                   </p>
                </div>
              ))}
           </div>
        )}
      </div>
    </div>
  );
};
