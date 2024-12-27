import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

export const ChatMessage = ({ message, isUser }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] px-4 py-3 rounded-2xl",
          isUser
            ? "bg-mira-purple text-white rounded-tr-sm"
            : "bg-white/90 backdrop-blur-sm rounded-tl-sm shadow-sm"
        )}
      >
        <p className="text-sm leading-relaxed">{message}</p>
      </div>
    </div>
  );
};