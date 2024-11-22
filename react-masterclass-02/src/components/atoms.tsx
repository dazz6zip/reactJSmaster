import { atom } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

// 전역으로 쓸 atom 선언 (key : toDo, 기본값 : 빈 배열)
export const toDoState = atom<IToDo[]>({
  // IToDo 타입으로 이루어진 배열이 들어올 수 있다는 뜻
  key: "toDo", // atom을 구분하기 위한 unique key
  default: [],
});
