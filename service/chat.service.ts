import { BaseResponse } from "@/lib/interface/baseresponse";
import { UrlBuilder } from "@/lib/urlbuilder";
import { Endpoint } from "@/lib/shared/constants/endpoint";

interface MessageContent {
  type: string;
  text: string;
}

export interface Message {
  _id?: string;
  from: string;
  to: string;
  messageContent: MessageContent;
  createdAt?: string;
}

export class ChatService {
  private static instance: ChatService;

  private constructor() {}

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  // Fetch the first available admin
  async getFirstAdmin(): Promise<any> {
    try {
      const url = new UrlBuilder()
        .addPath(Endpoint.USERS)
        .addParam("admins/first")
        .build();

      const response = await fetch(url, {
        method: "GET",
        credentials: "omit",
      });

      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error("Error fetching admin:", error);
      return null;
    }
  }

  // Fetch message history with a specific user
  async getMessages(userId: string): Promise<Message[]> {
    try {
      const url = new UrlBuilder()
        .addPath(Endpoint.MESSAGES)
        .addParam(userId)
        .build();

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  }

  // Send a new message
  async sendMessage(to: string, text: string): Promise<Message | null> {
    try {
      const url = new UrlBuilder()
        .addPath(Endpoint.MESSAGES)
        .build();

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ to, text }),
      });

      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error("Error sending message:", error);
      return null;
    }
  }
}
