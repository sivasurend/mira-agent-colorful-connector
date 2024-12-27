export const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-1 px-4 py-3 bg-white/90 backdrop-blur-sm rounded-2xl rounded-tl-sm w-fit">
      <div className="w-2 h-2 bg-mira-purple/60 rounded-full animate-blink" />
      <div className="w-2 h-2 bg-mira-purple/60 rounded-full animate-blink [animation-delay:0.2s]" />
      <div className="w-2 h-2 bg-mira-purple/60 rounded-full animate-blink [animation-delay:0.4s]" />
    </div>
  );
};