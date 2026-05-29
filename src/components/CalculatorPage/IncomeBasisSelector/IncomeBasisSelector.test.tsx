import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { IncomeBasisEnum } from "@/contexts/CalculatorContext/CalculatorContext";
import IncomeBasisSelector from "./IncomeBasisSelector";

describe("IncomeBasisSelector", () => {
  it("renders every wage basis option and reports the selected one", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <IncomeBasisSelector
        value={IncomeBasisEnum.Hourly}
        onChange={handleChange}
      />,
    );

    expect(screen.getByRole("button", { name: "Hourly" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Daily" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Monthly" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Yearly" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Monthly" }));

    expect(handleChange).toHaveBeenCalledWith(IncomeBasisEnum.Monthly);
  });
});
