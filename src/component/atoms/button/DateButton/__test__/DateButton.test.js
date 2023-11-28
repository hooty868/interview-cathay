/* eslint-disable simple-import-sort/imports */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import DateButton from "../DateButton";

describe("DateButton", () => {
  it("renders the button with the given text", () => {
    render(<DateButton>1</DateButton>);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("applies the today style if isToday is true", () => {
    render(<DateButton isToday>Today</DateButton>);
    const button = screen.getByText("Today");
    expect(button).toHaveClass("today"); // Assuming 'today' is a class in your styles
  });

  it("is disabled if isDisabled is true", () => {
    render(<DateButton isDisabled>Disabled</DateButton>);
    const button = screen.getByText("Disabled");
    expect(button).toBeDisabled();
  });

  it("triggers onClick when the button is clicked", () => {
    const onClick = jest.fn();
    render(<DateButton onClick={onClick}>Click me</DateButton>);
    fireEvent.click(screen.getByText("Click me"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
