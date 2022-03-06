export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Chat {
  id: number;
  name: string;
  createdAt?: string;
  text?: string;
  unreadMessageCount?: number;
  isGroupChat?: Boolean;
  isAdmin?: Boolean;
}

export interface Message {
  id: string;
  senderId: number;
  receiverId?: number;
  senderName: string;
  receiverName?: string;
  text: string;
  createdAt: string;
}
