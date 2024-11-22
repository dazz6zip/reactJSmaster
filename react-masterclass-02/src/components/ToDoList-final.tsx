import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

interface IForm {
  toDo: string;
}
interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

// 전역으로 쓸 atom 선언 (key : toDo, 기본값 : 빈 배열)
const toDoState = atom<IToDo[]>({
  // IToDo 타입으로 이루어진 배열이 들어올 수 있다는 뜻
  key: "toDo", // atom을 구분하기 위한 unique key
  default: [],
});

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  // 일반 useState 처럼 useRecoilState를 쓸 수 있음 (값과 setter 반환)
  // useRecoilState = useRecoilValue + useSetRecoilState
  // 여기서 인자로 들어가는 toDoState 는 위에서 선언한 toDoState atom을 가져오거나, 수정하겠다는 의미

  const { register, handleSubmit, setValue } = useForm<IForm>();
  // 유저에게 입력받아 관리할 값에 대한 타입 -> IForm
  // useForm을 사용하여 register로 관리, handleSubmit으로 제출 관리, setValue로 입력값 변경

  const handleValid = ({ toDo }: IForm) => {
    // IForm을 구조분해하여 toDo 값 사용
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      // toDo는 IToDo[] 타입이므로 IToDo 요소들을 하나씩 채워 준 배열을 생성한 뒤
      ...oldToDos,
      // 기존 데이터와 병합함
    ]);
    setValue("toDo", "");
    // 병합(추가) 성공 후 input 입력값 초기화
  };
  return (
    <div>
      <h1>투두리스트</h1>
      <hr />
      <form onSubmit={handleSubmit(handleValid)}>
        {/* useForm에서 선언한 handleSubmit을 사용하여, handleValid 함수를 주는데
        이는 제출시 input 태그 안에 있는 모든 검증을 거친 후,
        성공할 경우 handleValid 함수를 실행하겠다는 것 */}
        <input
          {...register("toDo", {
            required: "Please write a To Do",
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}
export default ToDoList;
