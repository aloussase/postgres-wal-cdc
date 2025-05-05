import { useCallback } from "react";
import { Input } from "./input";

import { ADD_ITEM } from "../constants";
import { useServerUrl } from "../../hooks/useServerUrl";
import { useId } from "../../hooks/useId";

export function Header({ dispatch }) {
  const { serverUrl } = useServerUrl();
  const { createId } = useId();

  const addItem = useCallback(
    async (title: string) => {
      const todo = {
        id: await createId(),
        title,
        completed: false,
      };

      await fetch(`${serverUrl}/todos`, {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: ADD_ITEM, payload: todo });
    },
    [dispatch],
  );

  return (
    <header className="header" data-testid="header">
      <h1>todos</h1>
      <Input
        onSubmit={addItem}
        label="New Todo Input"
        placeholder="What needs to be done?"
      />
    </header>
  );
}
