import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it("calls the click handler when the user presses it", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button label="Calculate Effort" onClick={handleClick} />);

    await user.click(screen.getByRole("button", { name: "Calculate Effort" }));

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("shows a loading state and disables the button while work is happening", () => {
    render(<Button label="Calculate Effort" isLoading />);

    const button = screen.getByRole("button", { name: /calculating/i });

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Calculating...");
  });
});
