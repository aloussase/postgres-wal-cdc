import { Todo } from "../types/todo";

export const ADD_ITEM = "ADD_ITEM";
export const UPDATE_ITEM = "UPDATE_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const TOGGLE_ITEM = "TOGGLE_ITEM";
export const REMOVE_ALL_ITEMS = "REMOVE_ALL_ITEMS";
export const TOGGLE_ALL = "TOGGLE_ALL";
export const REMOVE_COMPLETED_ITEMS = "REMOVE_COMPLETED_ITEMS";

export type ActionType =
  | typeof ADD_ITEM
  | typeof UPDATE_ITEM
  | typeof REMOVE_ITEM
  | typeof TOGGLE_ITEM
  | typeof REMOVE_ALL_ITEMS
  | typeof TOGGLE_ALL
  | typeof REMOVE_COMPLETED_ITEMS;

export type Action = {
  type: ActionType;
  payload: Partial<Todo>;
};
