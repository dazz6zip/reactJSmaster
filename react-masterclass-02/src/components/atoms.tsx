import { atom, selector } from "recoil";
// selector : atom의 output을 변형시키는 도구

export enum Categories {
  // 그냥 "TO_DO", "DOING" 이런 식으로 선언하면 index(0, 1...)로 읽어서 문자열로 지정해 줘야 함
  TO_DO = "TO_DO",
  DOING = "DOING",
  DONE = "DONE",
}
export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

// 전역으로 쓸 atom 선언 (key : toDo, 기본값 : 빈 배열)
export const toDoState = atom<IToDo[]>({
  // IToDo 타입으로 이루어진 배열이 들어올 수 있다는 뜻
  key: "toDoState", // atom을 구분하기 위한 unique key
  default: [],
});

// atom이 아니라 selector를 사용하여 데이터는 수정하지 않고 가져오고 싶은 자료만 가져올 수 있음
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
