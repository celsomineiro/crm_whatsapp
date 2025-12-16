import React, { useState, useRef, useEffect } from 'react';
import { Chat } from '../types';
import { CURRENT_USER } from '../constants';

interface ChatListProps {
  chats: Chat[];
  activeChatId: string;
  onSelectChat: (id: string) => void;
}

export const ChatList: React.FC<ChatListProps> = ({ chats, activeChatId, onSelectChat }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'normal' | 'groups' | 'internal' | 'bot'>('normal');
  const [activeSubTab, setActiveSubTab] = useState<'open' | 'pending' | 'closed'>('open');
  const [openChatMenuId, setOpenChatMenuId] = useState<string | null>(null);
  
  // State for Context Menu (Right Click)
  const [contextMenu, setContextMenu] = useState<{ chatId: string; x: number; y: number } | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const chatMenuRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  const contextMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false);
      }
      if (openChatMenuId && chatMenuRefs.current[openChatMenuId] && !chatMenuRefs.current[openChatMenuId]?.contains(event.target as Node)) {
        setOpenChatMenuId(null);
      }
      if (contextMenu && contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
        setContextMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    // Also close on scroll to avoid floating menu detachment
    document.addEventListener("scroll", () => setContextMenu(null), true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", () => setContextMenu(null), true);
    };
  }, [openChatMenuId, contextMenu]);

  const handleChatMenuToggle = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    if (openChatMenuId === chatId) {
      setOpenChatMenuId(null);
    } else {
      setOpenChatMenuId(chatId);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, chatId: string) => {
    e.preventDefault(); // Prevent default browser context menu
    
    const menuHeight = 260; // Estimated height of the menu (increased for new item)
    const windowHeight = window.innerHeight;
    let y = e.clientY;
    
    // If opening down would clip, open up
    if (y + menuHeight > windowHeight) {
       y = y - menuHeight;
    }

    setContextMenu({
        chatId,
        x: e.clientX,
        y: y
    });
  };

  const handleAcceptChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    // Logic to accept/pick chat would go here
    console.log(`Accepted chat ${chatId}`);
    // Close menus after action
    setOpenChatMenuId(null);
    setContextMenu(null);
  };

  // Get the chat object for the active context menu to determine Read/Unread state
  const activeContextMenuChat = contextMenu ? chats.find(c => c.id === contextMenu.chatId) : null;

  return (
    <div className="flex-1 md:flex-none md:w-[400px] flex flex-col bg-panel-light dark:bg-panel-dark border-r border-border-light dark:border-border-dark flex-shrink-0 z-10 h-full min-w-0">
      
      {/* Header - Background changed to bg-secondary-light to match ChatWindow */}
      <div className="h-[60px] flex items-center justify-between px-4 bg-secondary-light dark:bg-panel-dark flex-shrink-0 relative z-20">
        
        <div className="flex items-center gap-2">
            {/* Back Arrow (Visual Only) */}
            <button className="p-2 -ml-2 rounded-full text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5 transition">
                <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>

            {/* User Profile Dropdown */}
            <div 
              className="relative flex items-center gap-3 cursor-pointer p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              ref={dropdownRef}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border border-border-light dark:border-border-dark">
                 <img src={CURRENT_USER.avatar} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center gap-1">
                 <span className="font-semibold text-text-primary-light dark:text-text-primary-dark">Admin</span>
                 <span className={`material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark text-xl transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                   expand_more
                 </span>
              </div>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-secondary-dark rounded-lg shadow-xl py-2 z-50 border border-border-light dark:border-border-dark animate-in fade-in zoom-in-95 duration-100 origin-top-left">
                  <button className="w-full text-left px-4 py-2.5 hover:bg-background-light dark:hover:bg-panel-dark text-text-primary-light dark:text-text-primary-dark text-sm flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px]">person</span>
                    Perfil
                  </button>
                  <button className="w-full text-left px-4 py-2.5 hover:bg-background-light dark:hover:bg-panel-dark text-text-primary-light dark:text-text-primary-dark text-sm flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px]">restart_alt</span>
                    Reiniciar
                  </button>
                  <div className="my-1 border-t border-border-light dark:border-border-dark"></div>
                  <button className="w-full text-left px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 hover:text-red-600 text-sm flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px]">logout</span>
                    Sair
                  </button>
                </div>
              )}
            </div>
        </div>

        <div className="flex items-center gap-3 text-text-secondary-light dark:text-text-secondary-dark">
          <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition">
            <span className="material-symbols-outlined text-xl">add_comment</span>
          </button>
          
          <div className="relative" ref={moreMenuRef}>
            <button 
              className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition ${isMoreMenuOpen ? 'bg-black/5 dark:bg-white/5' : ''}`}
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
            >
              <span className="material-symbols-outlined text-xl">more_vert</span>
            </button>
            
            {isMoreMenuOpen && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-secondary-dark rounded-lg shadow-xl py-2 z-50 border border-border-light dark:border-border-dark animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                <button className="w-full text-left px-4 py-2.5 hover:bg-background-light dark:hover:bg-panel-dark text-text-primary-light dark:text-text-primary-dark text-sm">
                  Filtro/Pesquisar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Tabs (Replaces Search & Filters) */}
      <div className="px-2 py-2 border-b border-border-light dark:border-border-dark bg-panel-light dark:bg-panel-dark flex-shrink-0 z-0 flex items-center justify-between gap-1">
        
        {/* Tab 1: Conversas Normais */}
        <button 
          onClick={() => setActiveTab('normal')}
          className={`group relative flex-1 p-2 rounded-lg transition-colors flex items-center justify-center ${activeTab === 'normal' ? 'bg-secondary-light dark:bg-secondary-dark text-primary' : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5'}`}
        >
          <span className="material-symbols-outlined text-2xl">chat</span>
          <span className="absolute bottom-full mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30">
            Conversas Normais
          </span>
        </button>

        {/* Tab 2: Conversas de Grupos */}
        <button 
          onClick={() => setActiveTab('groups')}
          className={`group relative flex-1 p-2 rounded-lg transition-colors flex items-center justify-center ${activeTab === 'groups' ? 'bg-secondary-light dark:bg-secondary-dark text-primary' : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5'}`}
        >
          <span className="material-symbols-outlined text-2xl">groups</span>
          <span className="absolute bottom-full mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30">
            Conversas de Grupos
          </span>
        </button>

        {/* Tab 3: Chat Interno */}
        <button 
          onClick={() => setActiveTab('internal')}
          className={`group relative flex-1 p-2 rounded-lg transition-colors flex items-center justify-center ${activeTab === 'internal' ? 'bg-secondary-light dark:bg-secondary-dark text-primary' : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5'}`}
        >
          <span className="material-symbols-outlined text-2xl">forum</span>
          <span className="absolute bottom-full mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30">
            Chat Interno
          </span>
        </button>

        {/* Tab 4: Chat Bot */}
        <button 
          onClick={() => setActiveTab('bot')}
          className={`group relative flex-1 p-2 rounded-lg transition-colors flex items-center justify-center ${activeTab === 'bot' ? 'bg-secondary-light dark:bg-secondary-dark text-primary' : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5'}`}
        >
          <span className="material-symbols-outlined text-2xl">smart_toy</span>
          <span className="absolute bottom-full mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30">
            Chat Bot
          </span>
        </button>
      </div>

      {/* Sub Status Tabs (Only visible for 'Conversas Normais') */}
      {activeTab === 'normal' && (
        <div className="flex items-center bg-panel-light dark:bg-panel-dark border-b border-border-light dark:border-border-dark flex-shrink-0 animate-in slide-in-from-top-2 duration-200">
          <button 
            onClick={() => setActiveSubTab('open')}
            className={`flex-1 py-3 text-xs md:text-sm font-medium transition-colors relative uppercase tracking-wide ${
              activeSubTab === 'open' 
                ? 'text-primary border-b-[3px] border-primary' 
                : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-background-dark border-b-[3px] border-transparent'
            }`}
          >
            ABERTOS
          </button>
          <button 
            onClick={() => setActiveSubTab('pending')}
            className={`flex-1 py-3 text-xs md:text-sm font-medium transition-colors relative uppercase tracking-wide ${
              activeSubTab === 'pending' 
                ? 'text-primary border-b-[3px] border-primary' 
                : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-background-dark border-b-[3px] border-transparent'
            }`}
          >
            PENDENTES
          </button>
          <button 
            onClick={() => setActiveSubTab('closed')}
            className={`flex-1 py-3 text-xs md:text-sm font-medium transition-colors relative uppercase tracking-wide ${
              activeSubTab === 'closed' 
                ? 'text-primary border-b-[3px] border-primary' 
                : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-background-dark border-b-[3px] border-transparent'
            }`}
          >
            FECHADOS
          </button>
        </div>
      )}

      {/* Chat List Items */}
      <div className="flex-1 overflow-y-auto scrollbar-thin bg-panel-light dark:bg-panel-dark pb-20">
        {chats.map((chat) => {
          const isActive = chat.id === activeChatId;
          const isMenuOpen = openChatMenuId === chat.id;

          return (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              onContextMenu={(e) => handleContextMenu(e, chat.id)}
              className={`flex gap-3 px-3 py-3 cursor-pointer border-b border-border-light dark:border-border-dark group transition-colors relative ${
                isActive ? 'bg-secondary-light dark:bg-secondary-dark' : 'hover:bg-background-light dark:hover:bg-background-dark/30'
              }`}
            >
              {/* Avatar Column */}
              <div className="relative w-12 h-12 flex-shrink-0 mt-1">
                 {/* Hack to handle the custom avatar from the image (orange background one) */}
                 {chat.user.name.includes('9287') ? (
                     <div className="w-full h-full rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg overflow-hidden">
                        <img className="w-full h-full object-cover opacity-80" src={chat.user.avatar} alt="Avatar" />
                     </div>
                 ) : (
                    <img
                        alt="Avatar"
                        className="w-full h-full rounded-full object-cover"
                        src={chat.user.avatar}
                    />
                 )}
              </div>

              {/* Content Column - 3 Lines */}
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                
                {/* Line 1: Name and Time */}
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-semibold text-text-primary-light dark:text-text-primary-dark truncate">
                    {chat.user.name}
                  </h3>
                  <span className={`text-xs flex-shrink-0 ${chat.unreadCount > 0 ? 'font-bold text-primary dark:text-primary' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>
                    {chat.lastMessageTime}
                  </span>
                </div>

                {/* Line 2: Ticket Info, Connection, Actions */}
                <div className="flex items-center gap-2 text-xs h-6">
                  {/* Ticket Number */}
                  <span className="text-text-secondary-light dark:text-text-secondary-dark font-medium">
                    {chat.ticketId || '#0000'}
                  </span>
                  
                  {/* Connection Icon */}
                  <div className="group/tooltip relative flex items-center">
                    <span className="text-green-600 dark:text-green-400 text-sm material-symbols-outlined">
                       {chat.connectionType === 'instagram' ? 'photo_camera' : chat.connectionType === 'facebook' ? 'public' : 'chat'}
                    </span>
                     {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover/tooltip:block bg-gray-800 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-50">
                        {chat.connectionType?.toUpperCase() || 'WHATSAPP'}
                    </div>
                  </div>

                  {/* Connection Name Badge */}
                  <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded-[3px] text-[10px] font-semibold truncate max-w-[80px]">
                    {chat.connectionName || 'Conexão'}
                  </span>
                  
                  <div className="flex-1"></div>

                  {/* Right Aligned Actions */}
                  <div className="flex items-center gap-2">
                    {/* Pick/Accept Chat Icon */}
                    <button 
                      onClick={(e) => handleAcceptChat(e, chat.id)}
                      title="Atender"
                      className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">support_agent</span>
                    </button>

                    {/* Unread Badge */}
                    {chat.unreadCount > 0 && (
                      <span className="bg-primary text-white text-[10px] font-bold h-4 min-w-[1rem] px-1 rounded-full flex items-center justify-center">
                        {chat.unreadCount}
                      </span>
                    )}

                    {/* Dropdown Menu Toggle */}
                    <div className="relative" ref={(el) => { chatMenuRefs.current[chat.id] = el; }}>
                        <button 
                            onClick={(e) => handleChatMenuToggle(e, chat.id)}
                            className={`text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark transition-colors ${isMenuOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                        >
                        <span className="material-symbols-outlined text-xl">expand_more</span>
                        </button>
                        
                        {/* Dropdown Menu - Existing click menu */}
                        {isMenuOpen && (
                            <div className="absolute top-full right-0 mt-1 w-56 bg-white dark:bg-panel-dark rounded-lg shadow-xl py-2 z-50 border border-border-light dark:border-border-dark animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                                <button 
                                    onClick={(e) => handleAcceptChat(e, chat.id)}
                                    className="w-full text-left px-4 py-2 hover:bg-background-light dark:hover:bg-secondary-dark text-text-primary-light dark:text-text-primary-dark text-sm flex items-center gap-3"
                                >
                                    <span className="material-symbols-outlined text-lg text-text-secondary-light dark:text-text-secondary-dark">support_agent</span>
                                    Atender
                                </button>
                                <button className="w-full text-left px-4 py-2 hover:bg-background-light dark:hover:bg-secondary-dark text-text-primary-light dark:text-text-primary-dark text-sm flex items-center gap-3">
                                    <span className="material-symbols-outlined text-lg text-text-secondary-light dark:text-text-secondary-dark">archive</span>
                                    Arquivar Conversa
                                </button>
                                <button className="w-full text-left px-4 py-2 hover:bg-background-light dark:hover:bg-secondary-dark text-text-primary-light dark:text-text-primary-dark text-sm flex items-center gap-3">
                                    <span className="material-symbols-outlined text-lg text-text-secondary-light dark:text-text-secondary-dark">push_pin</span>
                                    Fixar Conversa
                                </button>
                                <button className="w-full text-left px-4 py-2 hover:bg-background-light dark:hover:bg-secondary-dark text-text-primary-light dark:text-text-primary-dark text-sm flex items-center gap-3">
                                    <span className="material-symbols-outlined text-lg text-text-secondary-light dark:text-text-secondary-dark">label</span>
                                    Etiquetar Conversa
                                </button>
                                <button className="w-full text-left px-4 py-2 hover:bg-background-light dark:hover:bg-secondary-dark text-text-primary-light dark:text-text-primary-dark text-sm flex items-center gap-3">
                                    <span className="material-symbols-outlined text-lg text-text-secondary-light dark:text-text-secondary-dark">
                                      {chat.unreadCount > 0 ? 'mark_chat_read' : 'mark_chat_unread'}
                                    </span>
                                    Marcar como {chat.unreadCount > 0 ? 'lida' : 'não lida'}
                                </button>
                            </div>
                        )}
                    </div>
                  </div>
                </div>

                {/* Line 3: Queue and Agent Badges */}
                <div className="flex items-center gap-2 mt-0.5">
                   {/* Queue Badge */}
                   <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded-[3px] text-[10px] font-bold uppercase tracking-wider">
                      {chat.queueName || 'GERAL'}
                   </span>

                   {/* Agent Badge */}
                   <span className="bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300 px-1.5 py-0.5 rounded-[3px] text-[10px] font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[10px]">person</span>
                      {chat.agentName || 'Bot'}
                   </span>
                </div>

              </div>
            </div>
          );
        })}
      </div>
      
      {/* Floating Context Menu */}
      {contextMenu && activeContextMenuChat && (
        <div 
          ref={contextMenuRef}
          style={{ top: contextMenu.y, left: contextMenu.x }}
          className="fixed w-56 bg-white dark:bg-panel-dark rounded-lg shadow-2xl py-2 z-[100] border border-border-light dark:border-border-dark animate-in fade-in zoom-in-95 duration-75"
        >
            <button 
                onClick={(e) => handleAcceptChat(e, activeContextMenuChat.id)}
                className="w-full text-left px-4 py-2 hover:bg-background-light dark:hover:bg-secondary-dark text-text-primary-light dark:text-text-primary-dark text-sm flex items-center gap-3"
            >
                <span className="material-symbols-outlined text-lg text-text-secondary-light dark:text-text-secondary-dark">support_agent</span>
                Atender
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-background-light dark:hover:bg-secondary-dark text-text-primary-light dark:text-text-primary-dark text-sm flex items-center gap-3">
                <span className="material-symbols-outlined text-lg text-text-secondary-light dark:text-text-secondary-dark">archive</span>
                Arquivar Conversa
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-background-light dark:hover:bg-secondary-dark text-text-primary-light dark:text-text-primary-dark text-sm flex items-center gap-3">
                <span className="material-symbols-outlined text-lg text-text-secondary-light dark:text-text-secondary-dark">push_pin</span>
                Fixar Conversa
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-background-light dark:hover:bg-secondary-dark text-text-primary-light dark:text-text-primary-dark text-sm flex items-center gap-3">
                <span className="material-symbols-outlined text-lg text-text-secondary-light dark:text-text-secondary-dark">label</span>
                Etiquetar Conversa
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-background-light dark:hover:bg-secondary-dark text-text-primary-light dark:text-text-primary-dark text-sm flex items-center gap-3">
                <span className="material-symbols-outlined text-lg text-text-secondary-light dark:text-text-secondary-dark">
                    {activeContextMenuChat.unreadCount > 0 ? 'mark_chat_read' : 'mark_chat_unread'}
                </span>
                Marcar como {activeContextMenuChat.unreadCount > 0 ? 'lida' : 'não lida'}
            </button>
        </div>
      )}
    </div>
  );
};