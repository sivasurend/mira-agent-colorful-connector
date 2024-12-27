import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { sendChatMessage } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";

interface ChatProps {
  apiKey: string;
}

export const Chat = ({ apiKey }: ChatProps) => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hi! I'm Mira, your Agent Builder Assistant. How can I help you today?", isUser: false },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
    setIsTyping(true);

    try {
      const response = await sendChatMessage(userMessage, apiKey);
      setIsTyping(false);
      setMessages((prev) => [...prev, { text: response.message || "I'm here to help!", isUser: false }]);
    } catch (error) {
      setIsTyping(false);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-mira-light via-white to-mira-neutral animate-gradient-shift bg-[length:400%_400%]">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col max-w-4xl">
        <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-lg p-6 flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-mira-purple/20 scrollbar-track-transparent pr-4">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg.text} isUser={msg.isUser} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-white/80 border-mira-purple/20 focus-visible:ring-mira-purple/30"
            />
            <Button 
              type="submit" 
              size="icon"
              className="bg-mira-purple hover:bg-mira-purple/90 transition-colors"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};