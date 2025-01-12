import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// https://www.npmjs.com/package/react-beautiful-dnd

function App() {
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        {/* Droppable, Draggable 의 children은 function 이어야 함 */}
        <Droppable droppableId="one">
          {() => (
            <ul>
              <Draggable draggableId="first" index={0}>
                {() => <li>One</li>}
              </Draggable>
              <Draggable draggableId="second" index={1}>
                {() => <li>Two</li>}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
