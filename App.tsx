import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatList } from './components/ChatList';
import { ChatWindow } from './components/ChatWindow';
import { CHAT_LIST, MOCK_MESSAGES } from './constants';

const App: React.FC = () => {
  const [activeChatId, setActiveChatId] = useState<string>(CHAT_LIST[0].id);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  const activeChat = CHAT_LIST.find((c) => c.id === activeChatId) || CHAT_LIST[0];

  const handleChatSelect = (id: string) => {
    setActiveChatId(id);
    setIsMobileChatOpen(true);
  };

  const handleMobileBack = () => {
    setIsMobileChatOpen(false);
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex text-text-primary-light dark:text-text-primary-dark bg-background-light dark:bg-background-dark">
      {/* 
        Sidebar + ChatList Container
        Hidden on mobile when a chat is open. Visible otherwise.
      */}
      <div className={`flex flex-row h-full w-full md:w-auto flex-shrink-0 ${isMobileChatOpen ? 'hidden md:flex' : 'flex'}`}>
        <Sidebar />
        <ChatList 
          chats={CHAT_LIST} 
          activeChatId={activeChatId} 
          onSelectChat={handleChatSelect} 
        />
      </div>

      {/* 
        ChatWindow Container 
        Full width on mobile when chat is open. Hidden on mobile when list is open.
        Always visible on desktop.
      */}
      <div className={`flex-1 h-full min-w-0 ${isMobileChatOpen ? 'flex fixed inset-0 z-50 md:static md:z-auto' : 'hidden md:flex'}`}>
        <ChatWindow 
          activeChat={activeChat} 
          messages={MOCK_MESSAGES} 
          onBack={handleMobileBack}
        />
      </div>
    </div>
  );
};

export default App;