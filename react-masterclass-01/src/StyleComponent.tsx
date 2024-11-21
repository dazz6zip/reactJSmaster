import styled, { keyframes } from "styled-components";

export default function StyleComponent() {
  const Wrapper = styled.div`
    display: flex;
    background-color: ${(props) => props.theme.backgroundColor};
  `;

  interface BoxProps {
    bgColor: string;
  }

  // styled."" < html 코드
  const Box = styled.div<BoxProps>`
    background-color: ${(props) => props.bgColor};
    width: 100px;
    height: 100px;
  `;

  const Text = styled.span`
    color: white;
  `;

  // Box의 모든 속성들을 들고 온 다음 해당 속성만 추가함
  // Box에서 props를 받아 처리했던 것도 동일하게 가능
  const Circle = styled(Box)`
    border-radius: 50px;
  `;

  const Btn = styled.button`
    color: white;
    background-color: tomato;
    border: 0;
    border-radius: 15px;
  `;

  // input component 안 모든 input에 required, minLength 속성 추가
  const Input = styled.input.attrs({ required: true, minLength: 10 })`
    background-color: tomato;
  `;

  // keyframes : 애니메이션에서 사용 (styled-components와 별개)
  const rotationAdnimation = keyframes`
  0%{
  transform:rotate(0deg);
  border-radius:0px;
  }
  50%{
  border-radius:100px;
  }
  100%{
   transform:rotate(360deg);
  border-radius:0px;
  }
`;

  const Emoji = styled.span`
    font-size: 36px;
  `;

  // Box1 내의 span 태그 선택 가능
  // span 안에 있는 &:hover는 span:hover와 동일 -> tag 이름에 의존하는 상태
  // ${Emoji} 형식을 사용해서 jsx 부분에는 <Emoji as="">를 사용함으로 tag에 의존하지 않도록 할 수 있음
  // (참고) active : 클릭하고 있는 상태
  const Box1 = styled.div`
    height: 200px;
    width: 200px;
    background-color: tomato;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${rotationAdnimation} 1s linear infinite;
    span {
      font-size: 50px;
      &:hover {
        font-size: 70px;
      }
      &:active {
        opacity: 0;
      }
    }
    ${Emoji} {
      font-size: 50px;
      &:hover {
        font-size: 70px;
      }
      &:active {
        opacity: 0;
      }
    }
  `;

  /* theme : 색을 가지고 있는 모든 오브젝트 */
  // index.js에서 설정

  // index.js에서 준 props 가 dark인지 light인지 구분하여 스타일을 지정함
  const Title = styled.h1`
    color: ${(props) => props.theme.textColor};
  `;

  return (
    <Wrapper>
      <Box bgColor="teal" />
      <Circle bgColor="whitesmoke" />
      {/* as props 로 Btn의 button 태그를 a 태그로 변경하여 같은 스타일을 사용하는 다른 태그로 만듦 */}
      <Btn as="a" href="/">
        Log In
      </Btn>
      <Input />
      <Input />
      <Box1>
        {/* 해당 span은 styled-components로 생성하지 않음 Box1 내에서 선택하여 처리함 */}
        {/* <span>^_^</span> */}
        <Emoji>^_^</Emoji>
        <Title>하하</Title>
      </Box1>
    </Wrapper>
  );
}
