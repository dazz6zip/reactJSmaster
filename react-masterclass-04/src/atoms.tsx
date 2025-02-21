import { atom } from "recoil";

interface IToDoState {
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    TODO: ["a", "b"],
    DOING: ["c", "d", "e"],
    DONE: ["f"],
  },
});
