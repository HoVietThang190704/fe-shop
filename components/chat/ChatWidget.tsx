"use client";

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { MessageCircle, X, Send } from "lucide-react";
import { useAuth } from "@/provider/AuthProvider";
import { ChatService, Message } from "@/service/chat.service";

const SOCKET_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export function ChatWidget() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (!user) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    const newSocket = io(SOCKET_URL, {
      withCredentials: true,
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Chat Socket connected:", newSocket.id);
    });

    newSocket.on("receive_message", (msg: Message) => {
      setMessages((prev) => {
        if (prev.find(m => m._id === msg._id)) return prev;
        return [...prev, msg];
      });
    });

    const initChat = async () => {
      const chatSvc = ChatService.getInstance();
      const adminData = await chatSvc.getFirstAdmin();
      if (adminData && adminData._id) {
        setAdminId(adminData._id);
        const history = await chatSvc.getMessages(adminData._id);
        setMessages(history.reverse());
      }
    };
    initChat();

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  if (!user) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !adminId) return;

    const chatSvc = ChatService.getInstance();
    const textToSend = inputText;
    setInputText(""); // optimistic clear

    const sentMsg = await chatSvc.sendMessage(adminId, textToSend);
    if (sentMsg) {
      setMessages((prev) => {
        if (prev.find(m => m._id === sentMsg._id)) return prev;
        return [...prev, sentMsg];
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 h-96 bg-background border rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between p-4 border-b bg-card text-card-foreground">
            <h3 className="font-semibold text-sm">Chat với Admin</h3>
            <button onClick={() => setIsOpen(false)} className="hover:bg-muted p-1 rounded-full transition-colors">
              <X size={18} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
            {messages.map((m, i) => {
              const isMine = m.from === user._id;
              return (
                <div key={m._id || i} className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
                  <div className={`px-4 py-2 rounded-2xl max-w-[85%] text-sm ${isMine ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-muted text-foreground rounded-bl-sm border'}`}>
                    {m.messageContent?.text}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-3 border-t bg-card flex items-center space-x-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Nhập tin nhắn..." 
              className="flex-1 px-3 py-2 text-sm bg-muted text-foreground border-none rounded-full focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button 
              type="submit" 
              disabled={!inputText.trim()}
              className="p-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
        >
          <MessageCircle size={28} />
        </button>
      )}
    </div>
  );
}
