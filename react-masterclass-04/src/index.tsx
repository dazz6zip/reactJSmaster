import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import { QueryClient } from "react-query";

import App from "./App";
import { RecoilRoot } from "recoil";

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

}
* {
box-sizing: border-box;
}
a {
text-decoration: none;
color:inherit;
}
`;

const queryClient = new QueryClient();

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container is missing in index.html");
}

const root = ReactDOM.createRoot(container);
root.render(
  <RecoilRoot>
    <GlobalStyle></GlobalStyle>
    <App />
  </RecoilRoot>
);
