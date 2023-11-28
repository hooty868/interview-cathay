import { isDisabled } from "../dateUtils";
import dayjs from "dayjs";

describe("isDisabled", () => {
  it("should return true for past date", () => {
    expect(isDisabled("2022-01-01")).toBeTruthy();
  });

  it("should return false for today or future date", () => {
    const today = dayjs().format("YYYY-MM-DD");
    expect(isDisabled(today)).toBeFalsy();
    expect(isDisabled("2024-01-01")).toBeFalsy();
  });
});
