import { atom, selector } from "recoil";
// selector : atom의 output을 변형시키는 도구

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

// 전역으로 쓸 atom 선언 (key : toDo, 기본값 : 빈 배열)
export const toDoState = atom<IToDo[]>({
  // IToDo 타입으로 이루어진 배열이 들어올 수 있다는 뜻
  key: "toDoState", // atom을 구분하기 위한 unique key
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    return [
      // toDos 데이터를 category별로 나눈 배열 return
      toDos.filter((toDo) => toDo.category === "TO_DO"),
      toDos.filter((toDo) => toDo.category === "DOING"),
      toDos.filter((toDo) => toDo.category === "DONE"),
    ];
    // return 값이 selector의 value
  },
});
