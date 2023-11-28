import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import MouthSelector from "../MouthSelector";

describe("MouthSelector Component", () => {
  it("renders correctly", () => {
    render(<MouthSelector />);
    expect(screen.getByText("<")).toBeInTheDocument();
    expect(screen.getByText(">")).toBeInTheDocument();
  });

  it("renders custom buttons if provided", () => {
    const CustomPrev = <p>{"Custom <"}</p>;
    const CustomNext = <p>{"Custom >"}</p>;
    render(
      <MouthSelector
        CustomPreviousButton={CustomPrev}
        CustomNextButton={CustomNext}
      />
    );
    expect(screen.getByText("Custom <")).toBeInTheDocument();
    expect(screen.getByText("Custom >")).toBeInTheDocument();
  });

  it("triggers onPreviousClick and onNextClick when buttons are clicked", () => {
    const onPreviousClick = jest.fn();
    const onNextClick = jest.fn();
    render(
      <MouthSelector
        onPreviousClick={onPreviousClick}
        onNextClick={onNextClick}
      />
    );

    fireEvent.click(screen.getByText("<"));
    fireEvent.click(screen.getByText(">"));

    expect(onPreviousClick).toHaveBeenCalled();
    expect(onNextClick).toHaveBeenCalled();
  });
});
