import { Todo } from "../types/todo";
import {
  ADD_ITEM,
  UPDATE_ITEM,
  REMOVE_ITEM,
  TOGGLE_ITEM,
  REMOVE_ALL_ITEMS,
  TOGGLE_ALL,
  REMOVE_COMPLETED_ITEMS,
  Action,
} from "./constants";

/* Borrowed from https://github.com/ai/nanoid/blob/3.0.2/non-secure/index.js

The MIT License (MIT)

Copyright 2017 Andrey Sitnik <andrey@sitnik.ru>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */

export const todoReducer = (state: Todo[], action: Action) => {
  switch (action.type) {
    case ADD_ITEM:
      return state.concat({
        id: action.payload.id!,
        title: action.payload.title!,
        completed: false,
      });
    case UPDATE_ITEM:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo,
      );
    case REMOVE_ITEM:
      return state.filter((todo) => todo.id !== action.payload.id);
    case TOGGLE_ITEM:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    case REMOVE_ALL_ITEMS:
      return [];
    case TOGGLE_ALL:
      return state.map((todo) =>
        todo.completed !== action.payload.completed
          ? { ...todo, completed: action.payload.completed }
          : todo,
      );
    case REMOVE_COMPLETED_ITEMS:
      return state.filter((todo) => !todo.completed);
  }

  throw Error(`Unknown action: ${action.type}`);
};
