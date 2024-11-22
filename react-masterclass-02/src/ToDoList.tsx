import { useState } from "react";
import { useForm } from "react-hook-form";

// function ToDoList() {
//   const [toDo, setToDo] = useState("");
//   const [toDoError, setToDoError] = useState("");

//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDoError("");
//     setToDo(value);
//   };

//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (toDo.length < 10) {
//       return setToDoError("To do should be longer");
//     }
//     console.log("submit");
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input
//           onChange={onChange}
//           value={toDo}
//           placeholder="Write a to do"
//         ></input>
//         <button>Add</button>
//         {toDoError !== "" ? toDoError : null}
//       </form>
//     </div>
//   );
// }

function ToDoList() {
  const { register, handleSubmit, formState } = useForm();
  // watch : form 입력값들의 변화를 관찰할 수 있게 해 주는 함수
  // handleSubmit : validation
  // formState : error 등의 상태 저장

  const onValid = (data: any) => {
    console.log(data);
  };

  console.log(formState.errors);

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        {/* handleSubmit(유효할 때 호출되는 함수(필수), 유효하지 않을 때 호출되는 함수(선택)) 
        submit event가 발생되면 handleSubmit이 해야 하는 모든 validation을 마친 후 함수를 호출함*/}
        <input
          {...register("email", { required: true, minLength: 10 })}
          placeholder="Email"
        ></input>
        {/* input 태그에서 지원하는 required 보다 안전 (html 태그는 브라우저에서 수정하기 너무도 쉽기 때문에) */}
        <input
          {...register("firstName", { required: true })}
          placeholder="First Name"
        ></input>
        <input
          {...register("lastName", { required: true })}
          placeholder="Last Name"
        ></input>
        <input
          {...register("username", { required: true })}
          placeholder="Username"
        ></input>
        <input
          {...register("password", { required: true })}
          placeholder="Password"
        ></input>
        <input
          {...register("password1", { required: "Password is required" })}
          placeholder="Password1"
        ></input>
        {/* register("toDo")의 반환값을 분해하여 properties로 */}
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
