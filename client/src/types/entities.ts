export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Chat {
  id: number;
  username: string;
  email?: string;
  createdAt?: string;
  text?: string;
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
