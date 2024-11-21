import { useQuery } from "react-query";
import styled from "styled-components";

interface priceProps {
  coinId: string;
  PriceData?: PriceData;
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

const PriceBox = styled.div`
  display: flex;
`;

function Price({ coinId, PriceData }: priceProps) {
  return (
    <>
      <PriceBox>{PriceData?.quotes.USD.ath_date}</PriceBox>
    </>
  );
}

export default Price;
