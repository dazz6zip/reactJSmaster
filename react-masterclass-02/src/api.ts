const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoin() {
  return fetch(`${BASE_URL}/coins`).then((res) => {
    return res.json();
  });
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => {
    return res.json();
  });
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => {
    return res.json();
  });
}

export function fetchCoinHistory(coinId: string) {
  // const endDate = Math.floor(Date.now() / 1000);
  // const startDate = endDate - 60 * 60 * 24 * 7; // 일주일
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  ).then((res) => {
    return res.json();
  });
}
