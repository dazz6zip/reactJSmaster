import { createGlobalStyle, ThemeProvider } from "styled-components";
import Router from "./routes/Router";
import StyleComponent from "./StyleComponent";
import TypeScript from "./TypeScript";
import { ReactQueryDevtools } from "react-query/devtools";
import { darkTheme, lightTheme } from "./theme";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";

/* Reset code */
// createGlobalStyle에서 지정한 스타일은 애플리케이션 전역에 적용됨
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Stylish&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

 html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
body {
  font-family: "Ubuntu", sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
}
* {
box-sizing: border-box;
}
a {
text-decoration: none;
color:inherit;
}
`;

function App() {
  // ThemeProvider 를 index.tsx에서 App.tsx로 옮긴 이유
  // -> 애플리케이션의 state를 기반으로 테마를 변경하기 위해
  // -> 보통 동적으로 테마 변경을 하기 위해서는 App.tsx에서 처리하는 게 일반적

  // const [isDark, setIsDark] = useState(false);
  // const toggleDark = () => setIsDark((current) => !current);
  // 현재 true면 false, false면 true

  const isDark = useRecoilValue(isDarkAtom);

  return (
    <div>
      {/* 
      <StyleComponent></StyleComponent> 
      <TypeScript></TypeScript>
      */}
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle></GlobalStyle>
        <Router></Router>
        {/* <Router isDark={isDark} toggleDark={toggleDark}></Router> */}
        <ReactQueryDevtools initialIsOpen={true}></ReactQueryDevtools>
      </ThemeProvider>
    </div>
  );
}

export default App;
