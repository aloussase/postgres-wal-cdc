import React from "react";
import { AdminPage } from "./admin";
import { TodoApp } from "./todo/app";
import { useWebSocket } from "./hooks/useWebSocket";
import { useMessages } from "./hooks/useMessages";

export const Navbar = () => {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const { messages, addMessage } = useMessages();

  useWebSocket((message) => {
    console.log("Received message:", message);
    addMessage(message);
  });

  return (
    <>
      <nav>
        <div id="navbar-links">
          <h1>Postgres WAL CDC</h1>
          <ul>
            <li>
              <a
                href="https://github.com/aloussase/postgres-wal-cdc"
                target="_blank"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <label htmlFor="admin-toggle">
            {isAdmin ? "Admin" : "User"} view
          </label>
          <label className="switch">
            <input
              type="checkbox"
              id="admin-toggle"
              onChange={() => setIsAdmin(!isAdmin)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </nav>
      <main>{isAdmin ? <AdminPage messages={messages} /> : <TodoApp />}</main>
    </>
  );
};
