import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coin from "./Coin";
import Coins from "./Coins";

/*
typescript 타입 기재

1. 변수 선언시
let ex : string = value;

2. 함수 매개변수와 반환값
function ex(param : string) : number {
string : 매개변수 타입
number : 반환값 타입
}

2-1. 익명 함수
const ex = (a : number, b : number) : number => a + b;

3. 객체와 배열
let user: { name: string; age: number } = { name: "John", age: 25 };

4. 인터페이스와 타입 별칭
interface Ex {
key1: string;
key2: number;
}

const ex : Ex = {key1 : "", key2 : ""}

5. 제네릭 타입
const exValue = ex<string>("");
*/

// Router 가 function을 받는 경우
interface IRouterProps {
  toggleDark: () => void;
  isDark: boolean;
}

// export default function Router({ toggleDark, isDark }: IRouterProps) {
export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin></Coin>
          {/* <Coin isDark={isDark}></Coin> */}
        </Route>
        <Route path="/">
          <Coins></Coins>
          {/* <Coins toggleDark={toggleDark}></Coins> */}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
