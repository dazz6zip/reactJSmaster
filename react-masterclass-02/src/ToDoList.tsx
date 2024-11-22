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

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    // 여기서 제네릭 : Form에서 입력받아 검증할 key들의 type
    defaultValues: {
      email: "@naver.com",
    },
  });
  // watch : form 입력값들의 변화를 관찰할 수 있게 해 주는 함수
  // handleSubmit : validation
  // formState : error 등의 상태 저장
  // setError : 발생하는 문제에 따라 추가적으로 에러를 설정할 수 있게 함

  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      // 비밀번호 확인 실패할 경우
      setError(
        "password1",
        { message: "Password are not the same" },
        { shouldFocus: true }
        // 문제가 생긴 곳으로
      );
    }
    setError("extraError", { message: "Server offline." });
  };

  console.log(errors);

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        {/* handleSubmit(유효할 때 호출되는 함수(필수), 유효하지 않을 때 호출되는 함수(선택)) 
        submit event가 발생되면 handleSubmit이 해야 하는 모든 validation을 마친 후 함수를 호출함*/}
        <input
          {...register("email", {
            required: "Email isrequired",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "only naver.com email",
            },
          })}
          placeholder="Email"
        ></input>
        <span>{errors?.email?.message as string}</span>
        {/* input 태그에서 지원하는 required 보다 안전 (html 태그는 브라우저에서 수정하기 너무도 쉽기 때문에) */}
        <input
          {...register("firstName", {
            required: "write here",
            // validate: (value) => true, // firstName이 항상 검사를 통과함

            // validate: (value) =>
            //   value.includes("purin") ? "no purin allowed" : true,
            // react-hook-form에서 문자열 반환 -> 해당 에러 반환

            validate: {
              noPurin: (value) => (value.includes("purin") ? "No purin" : true),
              // 여기서 서버와 통신해서 검증할 수도 있음
              noKitty: (value) => (value.includes("kitty") ? "No kitty" : true),
            },
          })}
          placeholder="First Name"
        ></input>
        <span>{errors?.firstName?.message as string}</span>
        <input
          {...register("lastName", { required: "write here" })}
          placeholder="Last Name"
        ></input>
        <span>{errors?.lastName?.message as string}</span>
        <input
          {...register("username", { required: "write here" })}
          placeholder="Username"
        ></input>
        <span>{errors?.username?.message as string}</span>
        <input
          {...register("password", { required: "write here", minLength: 10 })}
          placeholder="Password"
        ></input>
        <span>{errors?.password?.message as string}</span>
        <input
          {...register("password1", { required: "Password is required" })}
          placeholder="Password1"
        ></input>
        <span>{errors?.password1?.message as string}</span>
        {/* register("toDo")의 반환값을 분해하여 properties로 */}
        <button>Add</button>
        <span>{errors?.extraError?.message as string}</span>
      </form>
    </div>
  );
}

export default ToDoList;
