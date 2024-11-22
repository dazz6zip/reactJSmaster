import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import CreateToDo, { IForm } from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const [toDos] = useRecoilState(toDoState);
  // 일반 useState 처럼 useRecoilState를 쓸 수 있음 (값과 setter 반환)
  // useRecoilState = useRecoilValue + useSetRecoilState
  // 여기서 인자로 들어가는 toDoState 는 위에서 선언한 toDoState atom을 가져오거나, 수정하겠다는 의미

  return (
    <div>
      <h1>투두리스트</h1>
      <hr />
      <CreateToDo></CreateToDo>
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo}></ToDo>
        ))}
      </ul>
    </div>
  );
}
export default ToDoList;
