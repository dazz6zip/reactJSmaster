import { useRecoilState, useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "./atoms";
import { useEffect } from "react";

function ToDo({ text, category, id }: IToDo) {
  // ToDoList-final.tsx 에서 넘겨 준 text, category, id

  const setToDos = useSetRecoilState(toDoState);

  const onClick = (newCategory: IToDo["category"]) => {
    // 상태 button을 클릭하면 어떤 버튼을 클릭했는지 인자로 넘어옴
    // console.log("newCategory : " + newCategory);

    // 현재 atom(recoil)에 저장되어 있는 ToDos의 값을 변경
    setToDos((oldToDos) => {
      // category 변경할 todo의 id 찾기
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      //   console.log(targetIndex);

      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: newCategory };

      // 현재 저장되어 있는 모든 ToDos를 순회하여 ToDoList-final.tsx에서 받은 id와 같은 자료 찾기

      // 업데이트(수정)가 아니라 새로운 배열을 만드는 방식으로 반환
      // 수정할 targetIndex를 기준으로 그 이전 자료와 그 이후 자료로 분할, 가운데에 수정할 데이터를 삽입하는 방식
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  // 인자로 넘기지 않고 button 태그에 name을 부여해서 event.currentTarget.name으로 구분하는 방법도 있음
  // const { currentTarget : {name}, } = event
  // 이 경우 event의 type은 React.MouseEvent<HTMButtonElement>
  return (
    <li>
      <span>{text}</span>&emsp;
      {category !== "DOING" && (
        <button onClick={() => onClick("DOING")}>DOING</button>
      )}
      {category !== "TO_DO" && (
        <button onClick={() => onClick("TO_DO")}>TO DO</button>
      )}
      {category !== "DONE" && (
        <button onClick={() => onClick("DONE")}>DONE</button>
      )}
    </li>
  );
}
export default ToDo;
