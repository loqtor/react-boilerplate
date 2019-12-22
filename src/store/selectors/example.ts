import { RootState } from "../index";

export const getClickCount = (state: RootState) => {
  return state.example.clickCount;
};