import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CalculatorProvider } from "@/contexts/CalculatorContext/CalculatorContext";
import CalculatorPageContainer from "./CalculatorPageContainer";

const renderCalculator = () =>
  render(
    <CalculatorProvider>
      <CalculatorPageContainer />
    </CalculatorProvider>,
  );

const getPriceInput = () => screen.getAllByPlaceholderText("0.00").at(-1)!;

describe("CalculatorPageContainer", () => {
  it("renders the calculator landing content and form", () => {
    renderCalculator();

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Do you reallyneed it?");
    expect(screen.getByText("01 - Your wage basis")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Calculate Effort" })).toBeInTheDocument();
  });

  it("shows validation messages when the user calculates with empty values", async () => {
    const user = userEvent.setup();

    renderCalculator();

    await user.click(screen.getByRole("button", { name: "Calculate Effort" }));

    expect(screen.getByText("Please enter a valid price")).toBeInTheDocument();
    expect(screen.getByText("Please enter a valid take-home pay amount")).toBeInTheDocument();
  });

  it("shows schedule validation messages for monthly income", async () => {
    const user = userEvent.setup();

    renderCalculator();

    await user.click(screen.getByRole("button", { name: "Monthly" }));
    await user.clear(screen.getByLabelText("Work hours / day"));
    await user.clear(screen.getByLabelText("Working days / month"));
    await user.type(screen.getByLabelText("Your take-home pay (per month, net)"), "1600");
    await user.type(getPriceInput(), "160");
    await user.click(screen.getByRole("button", { name: "Calculate Effort" }));

    expect(screen.getByText("Please enter valid work hours per day")).toBeInTheDocument();
    expect(screen.getByText("Please enter valid working days per month")).toBeInTheDocument();
  });

  it("calculates the time cost from an hourly wage", async () => {
    const user = userEvent.setup();

    renderCalculator();

    await user.type(screen.getByLabelText("Your take-home pay (per hour, net)"), "10");
    await user.type(getPriceInput(), "120");
    await user.click(screen.getByRole("button", { name: "Calculate Effort" }));

    expect(await screen.findByText("12 hours")).toBeInTheDocument();
    expect(screen.getByText("1.5")).toBeInTheDocument();
    expect(screen.getByText("0.3")).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();
  });

  it("calculates the time cost from daily income and clears the form", async () => {
    const user = userEvent.setup();

    renderCalculator();

    await user.click(screen.getByRole("button", { name: "Daily" }));
    await user.clear(screen.getByLabelText("Work hours / day"));
    await user.type(screen.getByLabelText("Work hours / day"), "8");
    await user.type(screen.getByLabelText("Your take-home pay (per day, net)"), "80");
    await user.type(getPriceInput(), "160");
    await user.click(screen.getByRole("button", { name: "Calculate Effort" }));

    expect(await screen.findByText("16 hours")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear" }));

    expect(screen.getByLabelText("Work hours / day")).toHaveValue("8");
    expect(screen.getByLabelText("Your take-home pay (per day, net)")).toHaveValue("");
    expect(screen.queryByText("16 hours")).not.toBeInTheDocument();
  });

  it("calculates the time cost from monthly income", async () => {
    const user = userEvent.setup();

    renderCalculator();

    await user.click(screen.getByRole("button", { name: "Monthly" }));
    await user.clear(screen.getByLabelText("Work hours / day"));
    await user.type(screen.getByLabelText("Work hours / day"), "8");
    await user.clear(screen.getByLabelText("Working days / month"));
    await user.type(screen.getByLabelText("Working days / month"), "20");
    await user.type(screen.getByLabelText("Your take-home pay (per month, net)"), "1600");
    await user.type(getPriceInput(), "160");
    await user.click(screen.getByRole("button", { name: "Calculate Effort" }));

    expect(await screen.findByText("16 hours")).toBeInTheDocument();
  });

  it("calculates the time cost from yearly income", async () => {
    const user = userEvent.setup();

    renderCalculator();

    await user.click(screen.getByRole("button", { name: "Yearly" }));
    await user.clear(screen.getByLabelText("Work hours / day"));
    await user.type(screen.getByLabelText("Work hours / day"), "8");
    await user.clear(screen.getByLabelText("Working days / month"));
    await user.type(screen.getByLabelText("Working days / month"), "20");
    await user.type(screen.getByLabelText("Your take-home pay (per year, net)"), "19200");
    await user.type(getPriceInput(), "160");
    await user.click(screen.getByRole("button", { name: "Calculate Effort" }));

    expect(await screen.findByText("16 hours")).toBeInTheDocument();
  });

  it.each([
    ["10", "1 hours", "Very high"],
    ["60", "6 hours", "High"],
    ["400", "40 hours", "Low"],
    ["1000", "100 hours", "Very low"],
  ])("shows %s euros as %s with %s affordability", async (price, hours, affordability) => {
    const user = userEvent.setup();

    renderCalculator();

    await user.type(screen.getByLabelText("Your take-home pay (per hour, net)"), "10");
    await user.type(getPriceInput(), price);
    await user.click(screen.getByRole("button", { name: "Calculate Effort" }));

    expect(await screen.findByText(hours)).toBeInTheDocument();
    expect(screen.getByText(affordability)).toBeInTheDocument();
  });
});
