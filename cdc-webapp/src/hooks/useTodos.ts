import React from "react";
import { Todo } from "../types/todo";
import { useServerUrl } from "./useServerUrl";

export const useTodos = () => {
  const { serverUrl } = useServerUrl();
  const [todos, setTodos] = React.useState<Todo[]>([]);

  React.useEffect(() => {
    fetch(`${serverUrl}/todos`)
      .then((res) => res.json())
      .then((todos) => setTodos(todos))
      .catch((err) => console.log(err));
  }, [serverUrl]);

  return [todos, setTodos] as const;
};
