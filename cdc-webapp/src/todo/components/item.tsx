import { memo, useState, useCallback } from "react";
import classnames from "classnames";

import { Input } from "./input";

import { TOGGLE_ITEM, REMOVE_ITEM, UPDATE_ITEM } from "../constants";
import { useServerUrl } from "../../hooks/useServerUrl";

export const Item = memo(function Item({ todo, dispatch, index }) {
  const [isWritable, setIsWritable] = useState(false);
  const { title, completed, id } = todo;
  const { serverUrl } = useServerUrl();

  const toggleItem = useCallback(async () => {
    await fetch(`${serverUrl}/todos/${id}/toggle`, {
      method: "POST",
    });

    dispatch({ type: TOGGLE_ITEM, payload: { id } });
  }, [dispatch]);

  const removeItem = useCallback(async () => {
    await fetch(`${serverUrl}/todos/${id}`, {
      method: "DELETE",
    });

    dispatch({ type: REMOVE_ITEM, payload: { id } });
  }, [dispatch]);

  const updateItem = useCallback(
    async (id: number, title: string) => {
      await fetch(`${serverUrl}/todos/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: UPDATE_ITEM, payload: { id, title } });
    },
    [dispatch],
  );

  const handleDoubleClick = useCallback(() => {
    setIsWritable(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsWritable(false);
  }, []);

  const handleUpdate = useCallback(
    (title) => {
      if (title.length === 0) removeItem(id);
      else updateItem(id, title);

      setIsWritable(false);
    },
    [id, removeItem, updateItem],
  );

  return (
    <li
      className={classnames({ completed: todo.completed })}
      data-testid="todo-item"
    >
      <div className="view">
        {isWritable ? (
          <Input
            onSubmit={handleUpdate}
            label="Edit Todo Input"
            defaultValue={title}
            onBlur={handleBlur}
          />
        ) : (
          <>
            <input
              className="toggle"
              type="checkbox"
              data-testid="todo-item-toggle"
              checked={completed}
              onChange={toggleItem}
            />
            <label
              data-testid="todo-item-label"
              onDoubleClick={handleDoubleClick}
            >
              {title}
            </label>
            <button
              className="destroy"
              data-testid="todo-item-button"
              onClick={removeItem}
            />
          </>
        )}
      </div>
    </li>
  );
});
