import React, { useReducer } from "react";
import { Header } from "./components/header";
import { Main } from "./components/main";
import { Footer } from "./components/footer";

import { todoReducer } from "./reducer";

import "todomvc-app-css/index.css";
import "todomvc-common/base.css";

import "./app.css";
import { useTodos } from "../hooks/useTodos";
import { ADD_ITEM } from "./constants";

export function TodoApp() {
  const [serverTodos, _setServerTodos] = useTodos();
  const [todos, dispatch] = useReducer(todoReducer, []);

  React.useEffect(() => {
    if (!serverTodos) return;
    for (const todo of serverTodos) {
      dispatch({ type: ADD_ITEM, payload: todo });
    }
  }, [serverTodos]);

  return (
    <div className="todoapp">
      <Header dispatch={dispatch} />
      <Main todos={todos} dispatch={dispatch} />
      <Footer todos={todos} dispatch={dispatch} />
    </div>
  );
}
