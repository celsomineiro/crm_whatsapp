
export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Message {
  id: string;
  text: string;
  time: string;
  isSentByMe: boolean;
  isRead: boolean;
  senderName?: string; // For group chats or CRM context
  dateHeader?: string; // e.g., "TODAY", "YESTERDAY"
}

export interface Chat {
  id: string;
  user: User;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isMuted: boolean;
  statusIcon?: string; // e.g. 'done_all', 'mic'
  statusText?: string;
  isGroup?: boolean;
  
  // CRM Specific Fields
  ticketId?: string;
  connectionType?: 'whatsapp' | 'instagram' | 'facebook' | 'telegram';
  connectionName?: string;
  queueName?: string;
  agentName?: string;
}
