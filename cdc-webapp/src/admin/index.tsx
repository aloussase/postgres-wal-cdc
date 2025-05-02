import { Message } from "../types/message";

function Pill({ text }: { text: string }) {
  return <span className="pill">{text}</span>;
}

interface Props {
  messages: Message[];
}

export const AdminPage = ({ messages }: Props) => {
  return (
    <div className="adminpanel">
      <h1>Database Audit Log</h1>
      <p>
        This sample application connects to a WebSocket server that uses Kafka
        to read CDC events from a PostgreSQL database.{" "}
      </p>
      <p>
        In this case, we are building a sort of admin audit log, but you can
        imagine the endless possibilities something like this could be used for.
      </p>
      <p>
        <b>NOTE</b> You will only see new entries when I do something on the
        database :p. Ping me if you want to see it in action.
      </p>
      {messages.length === 0 && <p>No messages yet...</p>}
      {messages.map((message) => {
        return (
          <details className="message">
            <summary>
              Someone did a <b>{message.kind.toUpperCase()}</b> on{" "}
              <b>{message.table.toUpperCase()}</b>
            </summary>
            <div className="message-change-columns">
              Columns:{" "}
              {message.columns.map((column) => (
                <Pill text={column} />
              ))}
            </div>
            <div className="message-change-values">
              Values:{" "}
              {message.values.map((column) => (
                <Pill text={column} />
              ))}
            </div>
          </details>
        );
      })}
    </div>
  );
};
