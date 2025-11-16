"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, User, Sparkles, Paperclip, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "👋 Hi there! I'm your AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand your question! Here's what I can suggest...",
        "That's an interesting point. Based on my knowledge...",
        "Great question! Let me break this down for you.",
        "I've analyzed your query and here's my response.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: randomResponse,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className=" w-full h-[85vh] flex flex-col border-0 shadow-2xl rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-12 w-12 border-2 border-white/20">
                <AvatarImage src="/bot.png" />
                <AvatarFallback className="bg-indigo-500">
                  <Sparkles className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-xl font-semibold">AI Assistant</h1>
              <p className="text-indigo-100 text-sm">Always here to help you</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-6 bg-gradient-to-b from-white to-gray-50/50" ref={scrollRef}>
          <div className="flex flex-col gap-6">
            <AnimatePresence initial={false}>
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex-shrink-0"
                    >
                      <Avatar className="h-8 w-8 border border-indigo-200">
                        <AvatarImage src="/bot.png" />
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                  )}

                  <div className="flex flex-col gap-1 max-w-[70%]">
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm shadow-sm relative ${msg.role === "assistant"
                        ? "bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-md"
                        : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md rounded-br-md"
                        }`}
                    >
                      {msg.content}
                      {/* Message tail */}
                      <div
                        className={`absolute bottom-0 w-3 h-3 ${msg.role === "assistant"
                          ? "left-0 transform -translate-x-1/2 bg-white border-l border-t border-gray-100 rotate-45"
                          : "right-0 transform translate-x-1/2 bg-indigo-500 rotate-45"
                          }`}
                      />
                    </div>
                    <span
                      className={`text-xs text-gray-500 px-2 ${msg.role === "user" ? "text-right" : "text-left"
                        }`}
                    >
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>

                  {msg.role === "user" && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex-shrink-0"
                    >
                      <Avatar className="h-8 w-8 border border-purple-200">
                        <AvatarImage src="/user-avatar.png" />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <Avatar className="h-8 w-8 border border-indigo-200">
                  <AvatarFallback className="bg-indigo-500 text-white">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      className="h-2 w-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="h-2 w-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      className="h-2 w-2 bg-gray-400 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t max-w-4xl border-gray-100 p-6 bg-white/90 backdrop-blur-sm">
          <div className="flex items-end gap-3">
            <div className="flex gap-2 flex-1">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-xl border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
              >
                <Paperclip className="h-5 w-5 text-gray-600" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  placeholder="Ask me anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  className="flex-1 h-12 rounded-2xl border-gray-200 bg-gray-50/50 pl-4 pr-12 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 resize-none"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-xl text-gray-500 hover:text-indigo-600"
                >
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                className="h-12 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <Send className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            AI can make mistakes. Consider checking important information.
          </p>
        </div>
      </Card>
    </div>
  );
}