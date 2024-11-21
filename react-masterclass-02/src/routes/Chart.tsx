import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "src/api";
import ApexCharts from "react-apexcharts";
import { start } from "repl";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "src/atoms";
// https://apexcharts.com/
// demo 에서 샘플 보는 것 추천

interface CharProps {
  coinId: string;
  // isDark: boolean;
}

interface IHistorical {
  time_open: string;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

// function Chart({ coinId, isDark }: CharProps) {
function Chart({ coinId }: CharProps) {
  // Chart function을 사용할 때 CharProps Object가 들어오면, 그 중 coinId를 사용

  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  console.log(data);

  const isDark = useRecoilValue(isDarkAtom);

  // 제공하는 옵션은 공식 문서에서 확인 가능!
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexCharts
          type="line"
          series={[
            { name: "price", data: data?.map((price) => price.close) ?? [] },
          ]}
          options={{
            theme: { mode: isDark ? "dark" : "light" },
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 2,
            },
            yaxis: { show: false },
            xaxis: {
              axisTicks: { show: false },
              axisBorder: { show: false },
              labels: { show: false },
              categories:
                data?.map((price) =>
                  new Date(price.time_close * 1000).toISOString()
                ) ?? [],
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: { y: { formatter: (value) => `${value.toFixed(3)}$` } },
          }}
        ></ApexCharts>
      )}
    </div>
  );
}

export default Chart;
