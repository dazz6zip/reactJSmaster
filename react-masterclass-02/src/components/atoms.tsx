import { atom, selector } from "recoil";
// selector : atom의 output을 변형시키는 도구

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

export const categoryState = atom({
  key: "category",
  default: "TO_DO",
});

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
    // get function으로 selector 내부의 여러 atom을 가져올 수 있음

    const category = get(categoryState);

    return toDos.filter((toDo) => toDo.category === category);
    // return 값이 selector의 value
  },
});
