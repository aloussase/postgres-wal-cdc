import { Message } from "../types/message";

interface Props {
  messages: Message[];
}

export const Logs = ({ messages }: Props) => {
  return (
    <pre
      style={{
        height: "180px",
        overflow: "auto",
        backgroundColor: "black",
        color: "lightgreen",
      }}
    >
      {messages.map((message) => {
        return (
          <span>
            {message.kind} {message.table} {JSON.stringify(message.columns)}{" "}
            {JSON.stringify(message.values)}
            {"\n"}
          </span>
        );
      })}
    </pre>
  );
};
