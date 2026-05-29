import { createRef, useEffect } from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import {
  CalculatorProvider,
  useCalculatorContext,
} from "@/contexts/CalculatorContext/CalculatorContext";
import ResultsSection from "./ResultsSection";

const ResultsWithValue = ({ hoursValue = 12 }: { hoursValue?: number }) => {
  const { setResult } = useCalculatorContext();

  useEffect(() => {
    setResult({ value: hoursValue, unit: "hours", hoursValue });
  }, [hoursValue, setResult]);

  return (
    <ResultsSection resultRef={createRef<HTMLElement>()} />
  );
};

describe("ResultsSection", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("does not render anything until there is a calculation result", () => {
    const { container } = render(
      <CalculatorProvider>
        <ResultsSection resultRef={createRef<HTMLElement>()} />
      </CalculatorProvider>,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("shows the calculated time, effort summaries, and affordability", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.99);

    render(
      <CalculatorProvider>
        <ResultsWithValue />
      </CalculatorProvider>,
    );

    expect(await screen.findByText(/this costs you/i)).toBeInTheDocument();
    expect(screen.getByText("12 hours")).toBeInTheDocument();
    expect(screen.getByText("Days of labor")).toBeInTheDocument();
    expect(screen.getByText("1.5")).toBeInTheDocument();
    expect(screen.getByText("Weeks of effort")).toBeInTheDocument();
    expect(screen.getByText("0.3")).toBeInTheDocument();
    expect(screen.getByText("Affordability")).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();
    expect(screen.getByText("The Rule of 30")).toBeInTheDocument();
    expect(screen.getByText("Maintenance cost")).toBeInTheDocument();
    expect(screen.getByText("Opportunity cost")).toBeInTheDocument();
  });

  it.each([
    [1, /small amount of work/i],
    [6, /less than a work day/i],
    [16, /nearly 2 full work days/i],
    [80, /around 2 work weeks/i],
    [200, /around 5 weeks of work/i],
    [400, /months of work/i],
  ])("shows an appropriate result message for %i hours", async (hoursValue, message) => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    render(
      <CalculatorProvider>
        <ResultsWithValue hoursValue={hoursValue} />
      </CalculatorProvider>,
    );

    expect(await screen.findByText(message)).toBeInTheDocument();
  });
});
