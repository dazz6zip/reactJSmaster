import { useEffect, useState } from "react";
import {
  Switch,
  Route,
  useLocation,
  useParams,
  useRouteMatch,
  Link,
} from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { fetchCoinInfo, fetchCoinTickers } from "src/api";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";

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

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

// 어떤 탭을 선택했는지에 따른 isActive 값을 기준으로 선택되어 있는 탭에 css 스타일 추가
const Tab = styled.span<{ isActive: boolean }>`
  // tab의 기본 스타일들
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;

  // isActive (현재 경로 파악) 를 기준으로 색상을 다르게 설정함
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};

  a {
    display: block;
  }
`;

interface RouteParam {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface ICoinProps {
  isDark: boolean;
}

// function Coin({ isDark }: ICoinProps) {
function Coin() {
  // const [loading, setLoading] = useState(true);
  const { coinId } = useParams<RouteParam>();
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();

  useEffect(() => {
    console.log("coinId changed:", coinId);
  }, [coinId]);

  // useRouteMatch : 해당 경로에 있다면 Object, 없으면 null
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  // 첫 번째 인자값은 고유한 값이어야 하기 때문에 array로 만들어서 고유하게 만듦
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    // 여기 제네릭이 data의 타입 interface 임
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
    // 5초마다 refetch(새로 가져오기) -> API 실시간 반영
  );

  console.log(tickersData);
  // useQuery에서 로딩 상태 관리하는 변수 이름은 무조건 isLoading이어야 하는데 겹치지 않게 하기 위해 별칭을 지정함

  // // api
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     console.log(infoData);
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     console.log(priceData);
  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, [coinId]);
  // // coinId는 url에서 받아오기 때문에 변하지 않는 값
  // // 한 번만 실행되는 것

  // 둘 중에 하나라도 로딩이면 로딩 상태로
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>{loading ? "Loading..." : state?.name || infoData?.name}</title>
      </Helmet>
      <Header>
        <Title>{loading ? "Loading..." : state?.name || infoData?.name}</Title>
        {/* state가 null이면 Loading 출력 (바로 이 경로 접근시 state 누락) */}
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              {/* Tab component에서 현재 경로면 true를 반환하여 글자색을 설정하는 것
              true를 반환할 경우 (현재 경로일 경우) 글자색을 강조색상으로 설정 */}
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/:coinId/price`}>
              <Price coinId={coinId} PriceData={tickersData} />
            </Route>
            <Route path={`/:coinId/chart`}>
              {/* <Chart isDark={isDark} coinId={coinId} /> */}
              <Chart coinId={coinId} />
            </Route>
          </Switch>
          <Link to="/">홈으로 이동하기</Link>
        </>
      )}
    </Container>
  );
}

export default Coin;
