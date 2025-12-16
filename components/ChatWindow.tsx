import React, { useEffect, useRef, useState } from 'react';
import { Chat, Message } from '../types';
import { MessageBubble } from './MessageBubble';
import { ContactInfo } from './ContactInfo';
import { ChatSearch } from './ChatSearch';

interface ChatWindowProps {
  activeChat: Chat;
  messages: Message[];
  onBack: () => void;
}

type SidebarView = 'none' | 'info' | 'search';

export const ChatWindow: React.FC<ChatWindowProps> = ({ activeChat, messages, onBack }) => {
  const [inputText, setInputText] = useState('');
  const [sidebarView, setSidebarView] = useState<SidebarView>('none');
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Close sidebar if active chat changes
  useEffect(() => {
     setSidebarView('none');
     setIsMoreMenuOpen(false);
  }, [activeChat.id]);

  // Handle click outside for More Menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex-1 flex flex-row h-full overflow-hidden">
      
      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col min-w-0 bg-[#efe7dd] dark:bg-[#0b141a] relative z-0 h-full transition-all duration-300 ease-in-out`}>
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 bg-repeat z-0 bg-chat-pattern-light dark:bg-chat-pattern-dark pointer-events-none opacity-40 dark:opacity-10" 
          style={{ backgroundSize: '400px' }}
        ></div>

        {/* Header - Increased z-index to 20 to overlap messages */}
        <div className="h-[60px] flex items-center justify-between px-4 bg-secondary-light dark:bg-panel-dark border-b border-border-light dark:border-border-dark z-20 flex-shrink-0">
          <div 
             className="flex items-center gap-2 cursor-pointer group"
             onClick={() => setSidebarView(sidebarView === 'info' ? 'none' : 'info')}
             title="Clique para dados do contato"
          >
            <button 
              onClick={(e) => { e.stopPropagation(); onBack(); }}
              className="md:hidden p-1 -ml-2 text-text-primary-light dark:text-text-primary-dark hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>

            <div className="w-10 h-10 rounded-full overflow-hidden">
              {activeChat.user.name.includes('9287') ? (
                  <div className="w-full h-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg">
                      <img className="w-full h-full object-cover opacity-80" src={activeChat.user.avatar} alt="Avatar" />
                  </div>
              ) : (
                  <img
                    alt="Current Chat Avatar"
                    className="w-full h-full object-cover"
                    src={activeChat.user.avatar}
                  />
              )}
            </div>
            <div className="ml-1">
              <h2 className="text-base font-medium text-text-primary-light dark:text-text-primary-dark group-hover:underline decoration-1 underline-offset-2">
                {activeChat.user.name}
              </h2>
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                Mensagens para mim
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-text-secondary-light dark:text-text-secondary-dark">
            
            {/* Shortcut Icons (Hidden on Mobile) */}
            <div className="hidden md:flex items-center gap-1">
              <button 
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition relative group"
                aria-label="Transferir Conversa"
              >
                <span className="material-symbols-outlined text-xl">forward</span>
                <span className="absolute top-full right-0 mt-1.5 hidden group-hover:block bg-gray-800 text-white text-[11px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
                  Transferir Conversa
                </span>
              </button>

              <button 
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition relative group"
                aria-label="Encerrar Atendimento"
              >
                <span className="material-symbols-outlined text-xl">check_circle</span>
                <span className="absolute top-full right-0 mt-1.5 hidden group-hover:block bg-gray-800 text-white text-[11px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
                  Encerrar Atendimento
                </span>
              </button>

              <button 
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition relative group"
                aria-label="Adicionar Nota"
              >
                <span className="material-symbols-outlined text-xl">note_add</span>
                <span className="absolute top-full right-0 mt-1.5 hidden group-hover:block bg-gray-800 text-white text-[11px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
                  Adicionar Nota
                </span>
              </button>

              <button 
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition relative group"
                aria-label="Etiquetar Conversa"
              >
                <span className="material-symbols-outlined text-xl">label</span>
                <span className="absolute top-full right-0 mt-1.5 hidden group-hover:block bg-gray-800 text-white text-[11px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
                  Etiquetar Conversa
                </span>
              </button>

              {/* Vertical Divider */}
              <div className="h-6 w-[1px] bg-border-light dark:bg-border-dark mx-1"></div>
            </div>

            <button 
              className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition ${sidebarView === 'search' ? 'bg-black/10 dark:bg-white/10' : ''}`}
              onClick={() => setSidebarView(sidebarView === 'search' ? 'none' : 'search')}
              title="Pesquisar..."
            >
              <span className="material-symbols-outlined text-xl">search</span>
            </button>
            
            <div className="relative" ref={moreMenuRef}>
              <button 
                className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition ${isMoreMenuOpen ? 'bg-black/10 dark:bg-white/10' : ''}`}
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              >
                <span className="material-symbols-outlined text-xl">more_vert</span>
              </button>

              {isMoreMenuOpen && (
                <div className="absolute top-full right-0 mt-1 w-64 bg-white dark:bg-panel-dark rounded-lg shadow-xl py-2 z-50 border border-border-light dark:border-border-dark animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                  <button 
                    onClick={() => { setSidebarView('info'); setIsMoreMenuOpen(false); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-background-light dark:hover:bg-secondary-dark text-text-primary-light dark:text-text-primary-dark text-sm flex items-center gap-3"
                  >
                    <span className="material-symbols-outlined text-[20px] text-text-secondary-light dark:text-text-secondary-dark">contact_page</span>
                    Dados do contato
                  </button>
                  <button 
                    onClick={() => setIsMoreMenuOpen(false)}
                    className="w-full text-left px-4 py-2.5 hover:bg-background-light dark:hover:bg-secondary-dark text-text-primary-light dark:text-text-primary-dark text-sm flex items-center gap-3"
                  >
                    <span className="material-symbols-outlined text-[20px] text-text-secondary-light dark:text-text-secondary-dark">close</span>
                    Fechar conversa
                  </button>
                  <button 
                    onClick={() => setIsMoreMenuOpen(false)}
                    className="w-full text-left px-4 py-2.5 hover:bg-background-light dark:hover:bg-secondary-dark text-text-primary-light dark:text-text-primary-dark text-sm flex items-center gap-3"
                  >
                    <span className="material-symbols-outlined text-[20px] text-text-secondary-light dark:text-text-secondary-dark">check_circle</span>
                    Selecionar mensagens
                  </button>
                  <button 
                    onClick={() => setIsMoreMenuOpen(false)}
                    className="w-full text-left px-4 py-2.5 hover:bg-background-light dark:hover:bg-secondary-dark text-text-primary-light dark:text-text-primary-dark text-sm flex items-center gap-3"
                  >
                    <span className="material-symbols-outlined text-[20px] text-text-secondary-light dark:text-text-secondary-dark">forward</span>
                    Transferir conversa
                  </button>
                   <button 
                    onClick={() => setIsMoreMenuOpen(false)}
                    className="w-full text-left px-4 py-2.5 hover:bg-background-light dark:hover:bg-secondary-dark text-text-primary-light dark:text-text-primary-dark text-sm flex items-center gap-3"
                  >
                    <span className="material-symbols-outlined text-[20px] text-text-secondary-light dark:text-text-secondary-dark">download</span>
                    Exportar conversa
                  </button>
                  <button 
                    onClick={() => setIsMoreMenuOpen(false)}
                    className="w-full text-left px-4 py-2.5 hover:bg-background-light dark:hover:bg-secondary-dark text-text-primary-light dark:text-text-primary-dark text-sm flex items-center gap-3"
                  >
                    <span className="material-symbols-outlined text-[20px] text-text-secondary-light dark:text-text-secondary-dark">note_add</span>
                    Adicionar nota
                  </button>
                  <button 
                    onClick={() => setIsMoreMenuOpen(false)}
                    className="w-full text-left px-4 py-2.5 hover:bg-background-light dark:hover:bg-secondary-dark text-text-primary-light dark:text-text-primary-dark text-sm flex items-center gap-3"
                  >
                    <span className="material-symbols-outlined text-[20px] text-text-secondary-light dark:text-text-secondary-dark">label</span>
                    Etiquetar conversa
                  </button>
                  <button 
                    onClick={() => setIsMoreMenuOpen(false)}
                    className="w-full text-left px-4 py-2.5 hover:bg-background-light dark:hover:bg-secondary-dark text-text-primary-light dark:text-text-primary-dark text-sm flex items-center gap-3"
                  >
                    <span className="material-symbols-outlined text-[20px] text-text-secondary-light dark:text-text-secondary-dark">share</span>
                    Compartilhar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 z-10 scrollbar-thin flex flex-col">
          <div className="flex-1" /> {/* Pushes messages to bottom if few */}
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="min-h-[60px] px-4 py-3 bg-secondary-light dark:bg-panel-dark flex items-end gap-3 z-10 flex-shrink-0">
          <button className="mb-1 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition">
            <span className="material-symbols-outlined text-2xl">add</span>
          </button>
          
          <div className="flex-1 bg-white dark:bg-secondary-dark rounded-lg flex items-end px-3 py-2 gap-2 shadow-sm">
            <button className="mb-0.5 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition">
              <span className="material-symbols-outlined text-2xl">mood</span>
            </button>
            
            <input
              className="flex-1 py-1.5 focus:outline-none text-text-primary-light dark:text-text-primary-dark text-base bg-transparent border-none focus:ring-0 placeholder:text-text-secondary-dark"
              placeholder="Digite uma mensagem"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
          
          <button className="mb-1 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition">
            <span className="material-symbols-outlined text-2xl">mic</span>
          </button>
        </div>
      </div>

      {/* Right Sidebar - Dynamic Content (Info or Search) */}
      <div 
        className={`transition-all duration-300 ease-in-out bg-secondary-light dark:bg-panel-dark border-l border-border-light dark:border-border-dark flex-shrink-0 overflow-hidden ${
          sidebarView !== 'none' ? 'w-full md:w-[350px] lg:w-[400px]' : 'w-0 border-l-0'
        }`}
      >
        <div className="w-full md:w-[350px] lg:w-[400px] h-full relative">
           {sidebarView === 'info' && (
             <ContactInfo chat={activeChat} onClose={() => setSidebarView('none')} />
           )}
           {sidebarView === 'search' && (
             <ChatSearch messages={messages} onClose={() => setSidebarView('none')} />
           )}
        </div>
      </div>

    </div>
  );
};