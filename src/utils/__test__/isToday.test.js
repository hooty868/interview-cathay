import { isToday } from "../dateUtils";
import dayjs from "dayjs";

describe("isToday", () => {
  it("should return true for today's date", () => {
    const today = dayjs().format("YYYY-MM-DD");
    expect(isToday(today)).toBeTruthy();
  });

  it("should return false for a different date", () => {
    expect(isToday("2023-01-01")).toBeFalsy();
  });
});
