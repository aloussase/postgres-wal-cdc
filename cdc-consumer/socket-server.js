import { WebSocketServer } from "ws";

export class SocketServer {
  #webSocket;
  #connections;

  constructor({ server }) {
    this.#webSocket = new WebSocketServer({ server, path: "/ws" });
    this.#connections = new Set();
  }

  /**
   * Send a message to all connected clients.
   * @param {any} message
   * @returns
   */
  sendMessage(message) {
    if (this.#connections.size === 0) {
      console.log("No clients connected");
      return;
    }

    for (const ws of this.#connections) {
      ws.send(JSON.stringify(message));
    }
  }

  /**
   * Start the web socket server.
   */
  start() {
    this.#webSocket.on("connection", (ws) => {
      this.#connections.add(ws);

      this.#webSocket.on("close", () => {
        console.log("Client disconnected");
        this.#connections.delete(ws);
      });

      this.#webSocket.on("error", (err) => {
        console.log("WS error", err);
        this.#connections.delete(ws);
      });
    });
  }
}
