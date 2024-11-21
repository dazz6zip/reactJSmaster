import { useState } from "react";
import Circle from "./Circle";
import styled from "styled-components";

// @types/... 대형 Github Repository로, 모든 유명한 npm 라이브러리를 가지고 있는 저장소
// typescript에게 모든 정보를 알려 주기 위해 type definition (typescript에게 제공할 설명)을 만들어 제공
// https://github.com/DefinitelyTyped/DefinitelyTyped

export default function TypeScript() {
  const [value, setValue] = useState("");

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    // 이런 타입을 찾을 때 document 문서를 찾거나 구글링해야 함
    // TypeScript는 onChange 함수가 InputElement에 의해서 실행될 것을 알게 됨
    const {
      currentTarget: { value },
      /* target을 TypeScript에서는 currentTarget로 사용*/
    } = e;
    /* 위는 구조분해 할당으로, const value = e.currentTarget.value; 와 같은 의미임 */
    setValue(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 어떤 이벤트인지 지정해 줌으로써 관련 이벤트 자동완성이 가능해짐
    e.preventDefault();
    console.log("hello ", value);
  };

  // -- 3.6 Themes

  const Container = styled.div`
    background-color: ${(props) => props.theme.bgColor};
  `;

  const H1 = styled.h1`
    color: ${(props) => props.theme.textColor};
  `;

  return (
    /* 
    <div>
      
      <Circle bgColor="teal" borderColor="pink"></Circle>
       <Circle bgColor="tomato" text="text value"></Circle>
       
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder="username"
        ></input>
        <button>Log in</button>
      </form>
     
    </div>
     */

    <Container>
      <H1>proptected</H1>
    </Container>
  );
}
