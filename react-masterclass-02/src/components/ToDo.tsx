import { useRecoilState, useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "./atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (newCategory: IToDo["category"]) => {
    console.log("newCategory : " + newCategory);
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
