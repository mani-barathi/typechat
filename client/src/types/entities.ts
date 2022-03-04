export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Chat {
  id: number;
  username: string;
  createdAt?: string;
  text?: string;
  unreadMessageCount?: number;
  isGroupChat?: Boolean;
  isAdmin?: Boolean;
}

export interface DirectMessage {
  id: string;
  senderId: number;
  receiverId: number;
  sender?: Pick<User, "id" | "username">;
  receiver?: Pick<User, "id" | "username">;
  text: string;
  createdAt: string;
}
