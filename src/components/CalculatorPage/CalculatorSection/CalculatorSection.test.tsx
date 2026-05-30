import { useEffect } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import {
  CalculatorProvider,
  useCalculatorContext,
} from "@/contexts/CalculatorContext/CalculatorContext";
import CalculatorSection from "./CalculatorSection";

const CalculatorSectionWithPriceError = () => {
  const { setErrors } = useCalculatorContext();

  useEffect(() => {
    setErrors({ price: "Please enter a valid price" });
  }, [setErrors]);

  return <CalculatorSection calculateEffort={vi.fn()} handleClear={vi.fn()} />;
};

describe("CalculatorSection", () => {
  it("renders the wage, cost, and action controls", () => {
    render(
      <CalculatorProvider>
        <CalculatorSection calculateEffort={vi.fn()} handleClear={vi.fn()} />
      </CalculatorProvider>,
    );

    expect(screen.getByText("01 - Your wage basis")).toBeInTheDocument();
    expect(screen.getByText("02 - The cost - how much do you plan to spend?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Calculate Effort" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument();
  });

  it("runs the provided actions when the user clicks the form buttons", async () => {
    const user = userEvent.setup();
    const calculateEffort = vi.fn();
    const handleClear = vi.fn();

    render(
      <CalculatorProvider>
        <CalculatorSection
          calculateEffort={calculateEffort}
          handleClear={handleClear}
        />
      </CalculatorProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Calculate Effort" }));
    await user.click(screen.getByRole("button", { name: "Clear" }));

    expect(calculateEffort).toHaveBeenCalledOnce();
    expect(handleClear).toHaveBeenCalledOnce();
  });

  it("resets the wage metadata when the user changes the income basis", async () => {
    const user = userEvent.setup();

    render(
      <CalculatorProvider>
        <CalculatorSection calculateEffort={vi.fn()} handleClear={vi.fn()} />
      </CalculatorProvider>,
    );

    await user.type(screen.getByLabelText("Your take-home pay (per hour, net)"), "20");
    await user.click(screen.getByRole("button", { name: "Monthly" }));

    expect(screen.getByLabelText("Work hours / day")).toHaveValue(8);
    expect(screen.getByLabelText("Working days / month")).toHaveValue(22);
    expect(screen.getByLabelText("Your take-home pay (per month, net)")).toHaveValue(null);
  });

  it("clears the price error when the user edits the cost", async () => {
    const user = userEvent.setup();

    render(
      <CalculatorProvider>
        <CalculatorSectionWithPriceError />
      </CalculatorProvider>,
    );

    expect(await screen.findByText("Please enter a valid price")).toBeInTheDocument();

    await user.type(screen.getAllByPlaceholderText("0.00").at(-1)!, "45");

    expect(screen.queryByText("Please enter a valid price")).not.toBeInTheDocument();
  });
});
