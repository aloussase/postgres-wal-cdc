import { Message } from "../types/message";
import { LineChart } from "./lineChart";
import { Logs } from "./logs";

interface Props {
  messages: Message[];
}

export const AdminPage = ({ messages }: Props) => {
  return (
    <div className="adminpanel">
      <h1>Admin Dashboard</h1>
      <p>
        This sample application connects to a WebSocket server that uses Kafka
        to read CDC events from a PostgreSQL database.
      </p>
      <p>
        <b>NOTE</b> You will only see new entries when I do something on the
        database :p. Ping me if you want to see it in action.
      </p>
      {messages.length === 0 && <p>No messages yet...</p>}
      <div
        style={{
          display: "flex",
          gap: "5px",
          flexDirection: "column",
        }}
      >
        <Logs messages={messages} />
        <LineChart messages={messages} />
      </div>
    </div>
  );
};
