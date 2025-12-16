
import { Chat, Message, User } from './types';

export const CURRENT_USER: User = {
  id: 'me',
  name: 'FenixBanheiras (você)',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj14CQWh1ecWD4xKh_zVIvgrMpvR0KCZ5Hv6K6VJ0PMCHwh88p2aXeysHrCsHTrmNNVduDj5RlDAwSq3DFng4xx9l9Qcun8NQq0WyA8uMknTRnjdaWTby0wOOerOEXnX-xaAaHQY-xeRIYbvEt9gnfcTcR5k8TzccPdFuoLYlz-hCsRSIxaMi8PklXpbUAzAcN2W-PcaL-_eOq9jkR2YK-U6x18r2d1OliJlLFlPraZwrr3lbSuHr-t3SJkkUc5QIj8Nyv8B1iqYM'
};

export const CHAT_LIST: Chat[] = [
  {
    id: '1',
    user: {
      id: 'me',
      name: 'FenixBanheiras (você)',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj14CQWh1ecWD4xKh_zVIvgrMpvR0KCZ5Hv6K6VJ0PMCHwh88p2aXeysHrCsHTrmNNVduDj5RlDAwSq3DFng4xx9l9Qcun8NQq0WyA8uMknTRnjdaWTby0wOOerOEXnX-xaAaHQY-xeRIYbvEt9gnfcTcR5k8TzccPdFuoLYlz-hCsRSIxaMi8PklXpbUAzAcN2W-PcaL-_eOq9jkR2YK-U6x18r2d1OliJlLFlPraZwrr3lbSuHr-t3SJkkUc5QIj8Nyv8B1iqYM'
    },
    lastMessage: 'Celso Web: chat com IA',
    lastMessageTime: '15:16',
    unreadCount: 0,
    isMuted: false,
    statusIcon: 'done_all',
    ticketId: '#1234',
    connectionType: 'whatsapp',
    connectionName: 'Principal',
    queueName: 'COMERCIAL',
    agentName: 'Você'
  },
  {
    id: '2',
    user: {
      id: 'celso',
      name: 'Celso Pessoal',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrpfhrE_rJKnoQqf5OYeD2DItFuK1KCAjTqzLDft8vmwt2OAgBWGBaL8G9uHBGIC9DGjCFuYeVetY-ZKC4VQFI66WWaJADqaPAIre_lihuJeYOSnP_Df6clQy2hWOUCBM-iOeS0enAwJsBgaZMcihgc6g9QTxr7rUjbwaCRs7B2KjtxTBu-APccJrsRP0C5uZAIc0pYg0sFLb1ebdOQU-NNMW7owsJaWoBOGWmdIAsx1tdqYagh_K2PUw-X48AMRY4ZtPDZ-TiSaU'
    },
    lastMessage: 'Admin: testando no docker',
    lastMessageTime: '14:57',
    unreadCount: 5,
    isMuted: true,
    statusIcon: 'done_all',
    ticketId: '#1235',
    connectionType: 'whatsapp',
    connectionName: 'Suporte',
    queueName: 'SUPORTE',
    agentName: 'Admin'
  },
  {
    id: '3',
    user: {
      id: 'unknown1',
      name: '+55 11 91749-9287',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtnk1lhEA_7Nzs_MVwAr1QjCtrZxy0z7v1Mg8nF2rygpa_HoehOm9NxdrWOdCnoOxTOM7uE1JZJphJkX7taUC6_IhLPmHVEFcrR3sRmaDvUMhSVC5Spf9RsViZmEbny-m9Ef5MIflqnegUBJ3Dbaf48XIR7xoaepESyXq0Q9EgkAN0LevoUH18DVLkNpTHWxapcza8p2O-X1-1_CC_UOfgpYvZexJ7KR9cRf9aZ52dtnZREJhqtS4lp_GnXC4FWhZt_NnwdA-QvgM'
    },
    lastMessage: 'Será para quando?',
    lastMessageTime: 'Ontem',
    unreadCount: 1,
    isMuted: false,
    ticketId: '#1236',
    connectionType: 'instagram',
    connectionName: 'Insta Direct',
    queueName: 'FINANCEIRO',
    agentName: 'Maria'
  },
  {
    id: '4',
    user: {
      id: 'unknown2',
      name: '+55 11 97517-3312',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6TMiOuJMmWNuVy0ytlKjq3gtDUnWViaY2CeFZHUvd7p4SZZwNjJEVOlzUHH_d6ZWsCnFtUP4YvTqtJTjuBMO4d9shcHCPB3NN6-mCN1MC6SoIiyaWvTQYkODagCAZ_cbbUsvqd344Sdin0LYlnK8PKx3Grua4etP3dquQsB3VAgdaRko2D9DdfkZKUgw9uwUAWBQQoGZ54ohR5un52UYuVCOq5sqkT7aI32mzb7VlFHVDxR_E7KA-8APcGCcXXWUlBHAdgLbwTr8'
    },
    lastMessage: '0:07',
    lastMessageTime: 'sexta-feira',
    unreadCount: 0,
    isMuted: false,
    statusIcon: 'mic',
    ticketId: '#1237',
    connectionType: 'whatsapp',
    connectionName: 'Principal',
    queueName: 'COMERCIAL',
    agentName: 'João'
  },
  {
    id: '5',
    user: {
      id: 'unknown3',
      name: '+55 11 93742-5802',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7F8ymFDPnWYyS7JbqVlzfEKHZFZE_CL0-RfyYXxenTe1fTWIoE5p4tt3qmDXKKtyKRmwyYWIhwTaC-uqTxA0syAQvpLdBx844YoP4-BCgT2oQvNFfmRuRhK8jijjWxJRxrylgFJJU1qc4TNjTKwbAStRmQsgdWsjQGKPpgz-fm93XU1r2yLeB-w8fEZ4tDRBD_cWZNs2fnY3COsZB2pyq6SbVRoj1ChTERuGe6C49_BNSRstU6X5OTHcoV5hlq52x76TNHadCaI0'
    },
    lastMessage: '0:03',
    lastMessageTime: 'sexta-feira',
    unreadCount: 0,
    isMuted: false,
    statusIcon: 'mic',
    ticketId: '#1238',
    connectionType: 'facebook',
    connectionName: 'FB Page',
    queueName: 'TRIAGEM',
    agentName: 'Bot'
  }
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1',
    text: 'Olá! Gostaria de saber mais sobre a blindagem de vidros Iron Glass.',
    time: '16:06',
    isSentByMe: true,
    isRead: true,
    dateHeader: 'QUARTA-FEIRA'
  },
  {
    id: 'm2',
    text: '',
    time: '16:07',
    isSentByMe: true,
    isRead: true
  },
  {
    id: 'm3',
    text: 'Ola',
    time: '00:58',
    isSentByMe: true,
    isRead: true,
    dateHeader: 'HOJE'
  },
  {
    id: 'm4',
    text: 'boa tarde',
    time: '15:00',
    isSentByMe: true,
    isRead: true
  },
  {
    id: 'm5',
    text: 'oi, tudo bem como vai?',
    senderName: 'Admin',
    time: '15:06',
    isSentByMe: true,
    isRead: true
  },
  {
    id: 'm6',
    text: 'tudo legal ai',
    senderName: 'Celso Web',
    time: '15:07',
    isSentByMe: true,
    isRead: true
  },
  {
    id: 'm7',
    text: 'tudo sim',
    senderName: 'Admin',
    time: '15:07',
    isSentByMe: true,
    isRead: true
  },
  {
    id: 'm8',
    text: 'chat com IA',
    senderName: 'Celso Web',
    time: '15:16',
    isSentByMe: true,
    isRead: true
  }
];
