import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoSelector, toDoState } from "./atoms";
import CreateToDo, { IForm } from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  // const [toDo, doing, done] = useRecoilValue(toDoSelector);
  // 일반 useState 처럼 useRecoilState를 쓸 수 있음 (값과 setter 반환)
  // useRecoilState = useRecoilValue + useSetRecoilState
  // 여기서 인자로 들어가는 toDoState 는 위에서 선언한 toDoState atom을 가져오거나, 수정하겠다는 의미

  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    // input 값이 바뀌면 categoryState(atom)의 category 변경
    setCategory(event.currentTarget.value);
  };

  return (
    <div>
      <h1>투두리스트</h1>
      <hr />
      <select onInput={onInput}>
        <option value="TO_DO">To Do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>
      <CreateToDo></CreateToDo>

      {/* <h2>TODO</h2>
      <ul>
        {toDo.map((toDo) => (
          <ToDo key={toDo.id} {...toDo}></ToDo>
        ))}
      </ul>
      <hr />
      <h2>DOING</h2>
      <ul>
        {doing.map((toDo) => (
          <ToDo key={toDo.id} {...toDo}></ToDo>
        ))}
      </ul>
      <hr />
      <h2>DONE</h2>
      <ul>
        {done.map((toDo) => (
          <ToDo key={toDo.id} {...toDo}></ToDo>
        ))}
      </ul>
      */}
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo}></ToDo>
      ))}
    </div>
  );
}
export default ToDoList;
