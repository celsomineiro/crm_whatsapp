import React from 'react';
import { Chat } from '../types';

interface ContactInfoProps {
  chat: Chat;
  onClose: () => void;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ chat, onClose }) => {
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
          Dados do contato
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin bg-background-light dark:bg-background-dark">
        
        {/* Profile Section */}
        <div className="bg-panel-light dark:bg-panel-dark shadow-sm pb-4 mb-2 animate-in fade-in duration-300">
          <div className="p-6 flex justify-center">
            <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg relative group cursor-pointer">
               {/* CRM User visual handling */}
               {chat.user.name.includes('9287') ? (
                   <div className="w-full h-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-4xl overflow-hidden">
                      <img className="w-full h-full object-cover opacity-80" src={chat.user.avatar} alt="Avatar" />
                   </div>
               ) : (
                  <img src={chat.user.avatar} alt="Profile" className="w-full h-full object-cover" />
               )}
               <div className="absolute inset-0 bg-black/30 hidden group-hover:flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-3xl">camera_alt</span>
                  <span className="text-xs mt-1 text-center w-20">Mudar foto de perfil</span>
               </div>
            </div>
          </div>
          <div className="text-center px-4">
            <h2 className="text-xl font-medium text-text-primary-light dark:text-text-primary-dark mb-1">
              {chat.user.name}
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
              {chat.user.id.includes('unknown') || chat.user.name.includes('+55') ? chat.user.name : '+55 11 99999-9999'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-6 mt-6 px-4">
             <div className="flex flex-col items-center gap-1 cursor-pointer group">
                <div className="p-3 rounded-xl border border-border-light dark:border-border-dark group-hover:bg-background-light dark:group-hover:bg-white/5 transition">
                   <span className="material-symbols-outlined text-primary text-2xl">call</span>
                </div>
                <span className="text-xs text-primary font-medium">Áudio</span>
             </div>
             <div className="flex flex-col items-center gap-1 cursor-pointer group">
                <div className="p-3 rounded-xl border border-border-light dark:border-border-dark group-hover:bg-background-light dark:group-hover:bg-white/5 transition">
                   <span className="material-symbols-outlined text-primary text-2xl">videocam</span>
                </div>
                <span className="text-xs text-primary font-medium">Vídeo</span>
             </div>
             <div className="flex flex-col items-center gap-1 cursor-pointer group">
                <div className="p-3 rounded-xl border border-border-light dark:border-border-dark group-hover:bg-background-light dark:group-hover:bg-white/5 transition">
                   <span className="material-symbols-outlined text-primary text-2xl">search</span>
                </div>
                <span className="text-xs text-primary font-medium">Buscar</span>
             </div>
          </div>
        </div>

        {/* CRM Information Card */}
        <div className="bg-panel-light dark:bg-panel-dark p-4 shadow-sm mb-2">
            <h3 className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-3 uppercase tracking-wider">
               Informações do Atendimento
            </h3>
            <div className="space-y-3">
               <div className="flex justify-between items-center">
                  <span className="text-sm text-text-primary-light dark:text-text-primary-dark">Ticket</span>
                  <span className="text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark">{chat.ticketId || 'N/A'}</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-sm text-text-primary-light dark:text-text-primary-dark">Fila</span>
                  <span className="text-xs font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">{chat.queueName || 'GERAL'}</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-sm text-text-primary-light dark:text-text-primary-dark">Canal</span>
                  <div className="flex items-center gap-1">
                     <span className="text-green-600 dark:text-green-400 text-sm material-symbols-outlined">
                       {chat.connectionType === 'instagram' ? 'photo_camera' : chat.connectionType === 'facebook' ? 'public' : 'chat'}
                    </span>
                    <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark capitalize">{chat.connectionName || 'WhatsApp'}</span>
                  </div>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-sm text-text-primary-light dark:text-text-primary-dark">Atendente</span>
                  <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{chat.agentName || 'Bot'}</span>
               </div>
               
               <div className="pt-2">
                  <button className="w-full py-2 bg-secondary-light dark:bg-secondary-dark hover:bg-black/10 dark:hover:bg-white/10 rounded text-sm text-primary font-medium transition">
                     Editar Informações CRM
                  </button>
               </div>
            </div>
        </div>

        {/* About / Recado */}
        <div className="bg-panel-light dark:bg-panel-dark p-4 shadow-sm mb-2 hover:bg-background-light dark:hover:bg-white/5 cursor-pointer transition">
          <h3 className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-1">Recado</h3>
          <p className="text-text-primary-light dark:text-text-primary-dark text-base">
            Disponível para novos negócios.
          </p>
        </div>

        {/* Media, Links and Docs */}
        <div className="bg-panel-light dark:bg-panel-dark p-4 shadow-sm mb-2">
           <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Mídia, links e docs</span>
              <div className="flex items-center text-text-secondary-light dark:text-text-secondary-dark gap-1 cursor-pointer hover:text-text-primary-light dark:hover:text-text-primary-dark">
                 <span className="text-xs font-medium">201</span>
                 <span className="material-symbols-outlined text-sm">chevron_right</span>
              </div>
           </div>
           <div className="flex gap-2 overflow-hidden">
              {[1, 2, 3].map((i) => (
                 <div key={i} className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-gray-400">image</span>
                 </div>
              ))}
           </div>
        </div>

        {/* Options */}
        <div className="bg-panel-light dark:bg-panel-dark shadow-sm mb-2">
          <button className="w-full flex items-center gap-4 p-4 hover:bg-background-light dark:hover:bg-white/5 transition text-left">
            <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">notifications</span>
            <div className="flex-1">
              <p className="text-text-primary-light dark:text-text-primary-dark text-base">Silenciar notificações</p>
            </div>
            {chat.isMuted && (
               <span className="bg-green-500 w-8 h-4 rounded-full relative">
                  <span className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></span>
               </span>
            )}
          </button>
          <div className="border-t border-border-light dark:border-border-dark mx-4"></div>
          <button className="w-full flex items-center gap-4 p-4 hover:bg-background-light dark:hover:bg-white/5 transition text-left">
            <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">star</span>
            <div className="flex-1">
              <p className="text-text-primary-light dark:text-text-primary-dark text-base">Mensagens favoritas</p>
            </div>
            <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark text-lg">chevron_right</span>
          </button>
          <div className="border-t border-border-light dark:border-border-dark mx-4"></div>
          <button className="w-full flex items-center gap-4 p-4 hover:bg-background-light dark:hover:bg-white/5 transition text-left">
            <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark">lock</span>
            <div className="flex-1">
              <p className="text-text-primary-light dark:text-text-primary-dark text-base">Criptografia</p>
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">As mensagens e as chamadas são protegidas com a criptografia de ponta a ponta.</p>
            </div>
          </button>
        </div>

        {/* Actions */}
        <div className="bg-panel-light dark:bg-panel-dark shadow-sm mb-8">
           <button className="w-full flex items-center gap-4 p-4 hover:bg-background-light dark:hover:bg-white/5 transition text-left text-red-500 hover:text-red-600">
            <span className="material-symbols-outlined">block</span>
            <span className="text-base font-medium">Bloquear {chat.user.name}</span>
          </button>
          <div className="border-t border-border-light dark:border-border-dark mx-4"></div>
          <button className="w-full flex items-center gap-4 p-4 hover:bg-background-light dark:hover:bg-white/5 transition text-left text-red-500 hover:text-red-600">
            <span className="material-symbols-outlined">thumb_down</span>
            <span className="text-base font-medium">Denunciar {chat.user.name}</span>
          </button>
          <div className="border-t border-border-light dark:border-border-dark mx-4"></div>
          <button className="w-full flex items-center gap-4 p-4 hover:bg-background-light dark:hover:bg-white/5 transition text-left text-red-500 hover:text-red-600">
            <span className="material-symbols-outlined">delete</span>
            <span className="text-base font-medium">Apagar conversa</span>
          </button>
        </div>
      </div>
    </div>
  );
};
