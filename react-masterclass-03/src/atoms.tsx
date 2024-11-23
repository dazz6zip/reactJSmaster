import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minutes",
  default: 0,
});
export const hourSelector = selector({
  key: "hours",
  get: ({ get }) => {
    const minutes = get(minuteState);
    // selector 내에서 get -> atom 값 가져오기
    return minutes / 60;
  },
});