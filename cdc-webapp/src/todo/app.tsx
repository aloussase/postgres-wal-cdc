import { useReducer } from "react";
import { Header } from "./components/header";
import { Main } from "./components/main";
import { Footer } from "./components/footer";

import { todoReducer } from "./reducer";

import "todomvc-app-css/index.css";
import "todomvc-common/base.css";

import "./app.css";

export function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);

  return (
    <>
      <Header dispatch={dispatch} />
      <Main todos={todos} dispatch={dispatch} />
      <Footer todos={todos} dispatch={dispatch} />
    </>
  );
}
