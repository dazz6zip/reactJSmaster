import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { fetchCoin } from "src/api";
import { isDarkAtom } from "src/atoms";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.textColor};
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    /* padding: 20px; */
    transition: color 0.2s ease-in;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

// api가 가지고 오는 값도 interface 정의 필요
interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface ICoinsProps {
  toggleDark: () => void;
}

// function Coins({ toggleDark }: ICoinsProps) {
function Coins() {
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []); // component가 실행될 때 딱 한 번 실행

  const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoin);
  // useQuery(고유식별자, fetcher function)
  // 여기서 fetcher function은 반드시 promise를 반환해야 함
  // 반환값 : isLoading, isError, data, error (정해진 이름)
  // fetcher 함수가 데이터를 가져오는 동안 자동으로 isLoading 상태가 true로 설정되고, 완료되면 자동으로 반환된 JSON 데이터가 data에 저장됨!

  // 데이터를 파괴하지 않고 캐시에 저장해 두는 특성이 있음
  // data가 캐시에 저장되어 있으면 fetcher function에 접근하지 않음! (isLoading도 안 됨)

  /*
  ReactQuery 반환객체 주요 속성
  isLoading: 데이터 fetch 중이면 true, 아니면 false
  data: fetcher 함수가 성공적으로 반환한 데이터
  isError: fetcher 함수가 실패했을 때 true
  error: fetcher 함수가 반환한 에러 객체
  isFetching: 백그라운드에서 데이터를 다시 가져오는 중인지 나타냄
  */

  // console.log(isLoading);
  // console.log(data);

  const setterFn = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setterFn((prev) => !prev);

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        {/* <button onClick={toggleDark}>Toggle Mode</button> */}
        <button onClick={toggleDarkAtom}>Toggle Mode</button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{ pathname: `/${coin.id}`, state: { name: coin.name } }}
              >
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                ></Img>
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
