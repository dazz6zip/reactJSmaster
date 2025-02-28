import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardState, toDoState } from "./atoms";
import Board from "./Components/Board";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

// https://www.npmjs.com/package/react-beautiful-dnd

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  /* height: 100vh; */
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  min-height: 200px;
`;

const AddInput = styled.input`
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  border: #74b9ff 2px solid;
`;

const AddDiv = styled.div`
  text-align: center;
  padding-top: 30px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [boards, setBoards] = useRecoilState(boardState);

  useEffect(() => {
    const loadCard = localStorage.getItem("todolist");
    const board = localStorage.getItem("board");
    if (loadCard && board) {
      setToDos(JSON.parse(loadCard));
      setBoards(JSON.parse(board));
    }
  }, []);

  // 작동이 끝났을 떄 실행되는 함수
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    // destination (droppableId 보드 아이디, index 위치) : 목적지
    // draggableId : 드래그 중인 요소의 아이디
    // source (droppableId 보드 아이디, index 위치 : 출발지
    if (!destination) {
      return;
    }
    if (info.type === "BOARD") {
      setBoards((allBoards) => {
        const newBoards = [...allBoards];
        const movedBoard = newBoards.splice(source.index, 1)[0];
        newBoards.splice(destination.index, 0, movedBoard);

        localStorage.setItem("boardState", JSON.stringify(newBoards));
        return newBoards;
      });
      return;
    }
    if (destination?.droppableId === "TRASH") {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);

        const temp = {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
        localStorage.setItem("todolist", JSON.stringify(temp));
        return temp;
      });
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

        const temp = {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
        localStorage.setItem("todolist", JSON.stringify(temp));
        return temp;
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

        const temp = {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinatinoBoard,
        };
        localStorage.setItem("todolist", JSON.stringify(temp));
        return temp;
      });
    }
  };

  const { register, setValue, handleSubmit } = useForm<{
    boardName: string;
  }>();

  const onValid = ({ boardName }: { boardName: string }) => {
    setToDos((allBoard) => {
      const temp = {
        ...allBoard,
        [boardName]: [],
      };
      localStorage.setItem("todolist", JSON.stringify(temp));
      return temp;
    });
    setBoards((allBoard) => {
      const temp = [...allBoard, boardName];
      localStorage.setItem("board", JSON.stringify(temp));
      return temp;
    });
    setValue("boardName", "");
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AddDiv>
        <form onSubmit={handleSubmit(onValid)}>
          <AddInput
            {...register("boardName", { required: true })}
            type="text"
            placeholder={`보드를 추가해 보세용`}
          ></AddInput>
        </form>
      </AddDiv>
      <Wrapper>
        <Droppable droppableId="boards" direction="horizontal" type="BOARD">
          {(provided) => (
            <Boards ref={provided.innerRef} {...provided.droppableProps}>
              {boards.map((boardId, index) => (
                <Draggable key={boardId} draggableId={boardId} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Board
                        boardId={boardId}
                        key={boardId}
                        toDos={toDos[boardId]}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Boards>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
