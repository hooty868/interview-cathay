import { initializeDate } from "../dateUtils"; // replace with your actual file name
import dayjs from "dayjs";

describe("initializeDate", () => {
  it("should return formatted date for valid input", () => {
    expect(initializeDate("2023-11-28")).toBe("2023-11-28");
  });

  it("should return null for invalid date", () => {
    expect(initializeDate("invalid-date")).toBeNull();
  });

  it("should return null for undefined input", () => {
    expect(initializeDate(undefined)).toBeNull();
  });
});
