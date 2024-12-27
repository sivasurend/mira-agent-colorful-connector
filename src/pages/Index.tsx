import { useState, useEffect } from "react";
import { Chat } from "@/components/Chat";
import { ApiKeyForm } from "@/components/ApiKeyForm";

const Index = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    const storedApiKey = localStorage.getItem("lyzr_api_key");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleApiKeySubmit = (key: string) => {
    localStorage.setItem("lyzr_api_key", key);
    setApiKey(key);
  };

  if (!apiKey) {
    return <ApiKeyForm onSubmit={handleApiKeySubmit} />;
  }

  return <Chat />;
};

export default Index;