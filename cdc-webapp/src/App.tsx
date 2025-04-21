import { useEffect, useState } from 'react'
import './App.css'

type Message = {
  kind: string;
  table: string;
  columns: string[];
  types: string[];
  values: any[];
}

type MessageHandler = (message: Message) => void;

const useWebSocket = (handler: MessageHandler) => {
  useEffect(() => {
    const socket = new WebSocket(`ws://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}`);

    socket.addEventListener('message', (message) => {
      const data = JSON.parse(message.data) as Message;
      handler(data)
    })

    socket.addEventListener('open', () => {
      console.log('Connected to remote server')
    })

    socket.addEventListener('close', () => {
      console.log('Closing connection to remote server')
    })

    return () => socket.close();
  }, [])
}

function Pill({
  text
}: { text: string }) {
  return <span className="pill">{text}</span>
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  useWebSocket((message) => {
    console.log('Received message:', message);
    setMessages((prevMessages) => [message, ...prevMessages])
  });

  return (
    <div>
      <nav>
        <a href="https://github.com/aloussase/postgres-wal-cdc" target="_blank">GitHub</a>
      </nav>
      <h1>Database Audit Log</h1>
      <p>This sample application connects to a WebSocket server that uses Kafka to read
        CDC events from a PostgreSQL database. </p>
      <p>In this case, we are building a sort of admin audit log, but you can imagine the endless
        possibilities something like this could be used for.</p>
      <p><b>NOTE</b> You will only see new entries when I do something on the database :p. Ping me if you want to see it in action.</p>
      {messages.length === 0 && <p>No messages yet...</p>}
      {messages.map((message) => {
        return <details className="message">
          <summary>
            Someone did a <b>{message.kind.toUpperCase()}</b> on <b>{message.table.toUpperCase()}</b>
          </summary>
          <div className="message-change-columns">
            Columns: {message.columns.map((column) => <Pill text={column} />)}
          </div>
          <div className="message-change-values">
            Values: {message.values.map((column) => <Pill text={column} />)}
          </div>
        </details>
      })}
    </div>
  )
}

export default App
