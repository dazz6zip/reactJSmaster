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
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, draggableId, source } = info;
    // destination (droppableId 보드 아이디, index 위치) : 목적지
    // draggableId : 드래그 중인 요소의 아이디
    // source (droppableId 보드 아이디, index 위치 : 출발지
    if (!destination) {
      return;
    }
    if (destination?.droppableId === source.droppableId) {
      // 같은 보드 내 이동
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        // boardCopy에서 지우기 전에 taskObj에 임시로 저장해 두기
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        // splice 0 : 삽입
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      // 다른 보드 이동
      setToDos((allBoards) => {
        // 움직임 시작 보드 복사본
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        // 움직임 끝 보드 복사본
        const destinatinoBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinatinoBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinatinoBoard,
        };
      });
    }
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
