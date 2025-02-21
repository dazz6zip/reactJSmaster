import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

// https://www.npmjs.com/package/react-beautiful-dnd

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  // 작동이 끝났을 떄 실행되는 함수
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) {
      // 유저가 드래그 후 같은 자리에 둘 경우
      return;
    }

    // setToDos((oldToDos) => {
    // const toDosCopy = [...oldToDos];
    // // 1) source.index 아이템 삭제하기
    // toDosCopy.splice(source.index, 1);
    // // 2) destination.index 아이템 삽입하기
    // toDosCopy.splice(destination?.index, 0, draggableId);
    // return toDosCopy;
    // });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
