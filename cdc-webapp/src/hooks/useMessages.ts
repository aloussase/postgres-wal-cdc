import React from "react";
import { Message } from "../types/message";

export const useMessages = () => {
  const [messages, setMessages] = React.useState<Message[]>([]);

  React.useEffect(() => {
    const storedMessages = localStorage.getItem("messages");
    if (storedMessages !== null) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const addMessage = (message: Message) => {
    setMessages((prevMessages) => {
      const newMessages = [message, ...prevMessages];
      const json = JSON.stringify(newMessages);
      localStorage.setItem("messages", json);
      return newMessages;
    });
  };

  return {
    addMessage,
    messages,
  };
};
