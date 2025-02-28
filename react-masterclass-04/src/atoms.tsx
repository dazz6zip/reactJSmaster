import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    TODO: [],
    DOING: [],
    DONE: [],
    TRASH: [],
  },
});

export const boardState = atom<string[]>({
  key: "board",
  default: ["TODO", "DOING", "DONE", "TRASH"],
});
