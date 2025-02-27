import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import styled from "styled-components";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "src/atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding-top: 10px;
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newTodo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoard) => {
      // 수정되지 않는 보드나 수정되는 보드의 다른 요소들은 그대로 두고 추가만 하기
      return {
        ...allBoard,
        [boardId]: [newTodo, ...allBoard[boardId]],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        ></input>
      </Form>
      <Droppable droppableId={boardId}>
        {/* Droppable : 드래그할 수 있는 영역 */}
        {(magic, snapshot) => (
          // magic, snapshot : Droppable 에서 제공하는 함수형 컴포넌트 파라미터
          // 정해진 이름 x, 순서로 정해짐
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            // 현재 드래그 중인 카드가 이 영역 위에 있는지 여부 (boolean)
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            // 이 보드에서 드래그가 시작되었는지 여부 (boolean)
            ref={magic.innerRef}
            // ref : js로부터 html 요소 가져와서 사용
            // 이 영역을 React가 참조할 수 있도록 연결
            {...magic.droppableProps}
            // Droppable 에서 전달해 주는 기본 이벤트 핸들러를 적용해야 정상 작동됨
            // 드래그 가능 영역임을 인식하게만 하면 됨
            // 드래그 핸들링 할 필요 없음
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              ></DragabbleCard>
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
