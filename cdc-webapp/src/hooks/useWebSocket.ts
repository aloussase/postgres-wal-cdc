import { useEffect } from "react";
import { Message } from "../types/message";

type MessageHandler = (message: Message) => void;

export const useWebSocket = (handler: MessageHandler) => {
  useEffect(() => {
    try {
      const proto = import.meta.env.DEV ? "ws" : "wss";

      const socket = new WebSocket(
        `${proto}://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}`,
      );

      socket.addEventListener("message", (message) => {
        const data = JSON.parse(message.data) as Message;
        handler(data);
      });

      socket.addEventListener("open", () => {
        console.log("Connected to remote server");
      });

      socket.addEventListener("close", () => {
        console.log("Closing connection to remote server");
      });

      return () => socket.close();
    } catch (error) {
      console.log("error while connecting to the remote server", error);
    }
  }, []);
};
