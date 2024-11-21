import styled from "styled-components";
import { useState } from "react";

// interface : 객체 모양을 typescript에게 설명

/* Container 라는 styled-component 를 지정하는 데 있어서, 값을 받아 유동적으로 처리할 오브젝트(bgColor)에 대해 들어올 값을 문자열 (string) 으로 지정해 둠 */
interface ContainerProps {
  bgColor: string;
  borderColor?: string;
  // 여기도 optinal 로 지정해 주지 않으면 오류 발생 (CircleProps의 지정과는 별개로 여기서는 borderColor props를 required로 알고 있기 때문)

  text?: string;
}

/* ContainerProps 에서 지정한 것처럼 bgColor는 문자열(string)으로 받음을 div 태그 뒤에 명시함.
뒤에 ContainerProps 를 지정해 주었으므로 Container 안에 있는 bgColor 속성은 무조건 string 임 */
const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 1px solid ${(props) => props.borderColor};
`;

/* CircleProps interface 지정.
Circle 이라는 컴포넌트를 부를 때 bgColor를 지정해 줄 건데 그 값이 문자열(string)임. */
interface CircleProps {
  bgColor: string;
  borderColor?: string;
  // optinal props 설정

  text?: string;
}

/* Circle 컴포넌트에서 bgColor를 필수로 받아야 하는 props로 정의하고, -> <Circle bgColor="..."> 속성 필수
그 props는 CircleProps에서 지정했듯 문자열(string)만 가능함
Circle 컴포넌트에서 bgColor라는 이름으로 받는 props는 무조건 문자열 (string) 이어야 한다는 것. */
/* 
Q. 지금 ContainerProps와 CircleProps는 이름만 다를 뿐 내용은 같은데 
(bgColor:string) 둘을 굳이 다른 이름으로 두 번 저장한 것이 가독성 및 편의 구분을 위한 것인가? 같은 걸 여러 군데에서 쓰는 것이 낫지 않은가?
A. bgColorProps 로 통일하여 하나로 사용하는 것이 효율적.
*/
// CircleProps 타입 안에 있는 bgColor에 타입이 정의되어 있음을 표시
function Circle({
  bgColor,
  borderColor,
  text = "default text 지정하는 법 (text가 null일 경우)",
}: CircleProps) {
  const [counter, setCounter] = useState(1);
  //   setCounter("hello"); // useState 초기값으로 counter 및 setCounter는 number 타입으로 추론되었으므로 오류 발생

  const [value, setValue] = useState<number | string>(0);
  // number 타입과 string 타입 둘 다 가능함을 명시함 (잘 사용하지 않음)
  setValue(2);
  setValue("hello");
  //   setValue(true); // 명시하지 않은 boolean 타입이므로 오류 발생
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  );
}
// borderColor ?? bgColor -> borderColor 가 null 이면 bgColor로 설정
/* Circle 에서 bgColor 값을 받고, Circle 이 포함된 Container 를 반환하기 때문에
CircleProps, ContainerProps 둘 다 bgColor 및 borderColor를 지정해 줘야 하는 것. */

export default Circle;

/* name은 문자열(String), age는 숫자(number)로 타입 지정 */
interface PlayerShape {
  name: string;
  age: number;
}

/* sayHello 라는 컴포넌트 생성. 받을 값에 대한 타입은 위에서 지정한 PlayerShape 사용 */
const sayHello = (playerObj: PlayerShape) =>
  `Hello ${playerObj.name}. you are ${playerObj.age} years old.`;

/* 컴포넌트를 호출할 때 PlayerShape 에서 지정한 타입이 아닐 경우 에러 발생 */
sayHello({ name: "name", age: 12 });
// sayHello({ name: "name", age: "12" }); // 에러 발생
