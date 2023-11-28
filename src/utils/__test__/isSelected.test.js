import { isSelected } from "../dateUtils";

describe("isSelected", () => {
  const startDate = "2023-11-01";
  const endDate = "2023-11-30";

  it("should return true if date is same as start date", () => {
    expect(isSelected(startDate, startDate)).toBeTruthy();
  });

  it("should return false if date is before start date", () => {
    expect(isSelected("2023-10-31", startDate)).toBeFalsy();
  });

  it("should return true if date is within the range", () => {
    expect(isSelected("2023-11-15", startDate, endDate)).toBeTruthy();
  });

  it("should return false if date is after end date", () => {
    expect(isSelected("2023-12-01", startDate, endDate)).toBeFalsy();
  });

  it("should handle undefined end date", () => {
    expect(isSelected("2023-11-01", startDate, undefined)).toBeTruthy();
  });

  it("should handle null end date", () => {
    expect(isSelected("2023-11-01", startDate, null)).toBeTruthy();
  });
});
