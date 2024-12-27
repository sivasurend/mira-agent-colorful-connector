import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface ApiKeyFormProps {
  onSubmit: (apiKey: string) => void;
}

export const ApiKeyForm = ({ onSubmit }: ApiKeyFormProps) => {
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter an API key",
        variant: "destructive",
      });
      return;
    }
    onSubmit(apiKey);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-mira-light via-white to-mira-neutral p-4">
      <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Enter Your Lyzr API Key</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            className="w-full"
          />
          <Button type="submit" className="w-full bg-mira-purple hover:bg-mira-purple/90">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};