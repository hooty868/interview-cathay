/* eslint-disable simple-import-sort/imports */
import React from "react";
import { render, screen } from "@testing-library/react";

import MouthButton from "../MouthButton";

describe("MouthButton", () => {
  it("renders the button with the given text", () => {
    render(<MouthButton>Click me</MouthButton>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
