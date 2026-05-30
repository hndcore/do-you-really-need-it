import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import TextInput from "./TextInput";

describe("TextInput", () => {
  it("connects the label to the input and accepts typed values", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <TextInput
        label="Your take-home pay"
        value=""
        onChange={handleChange}
      />,
    );

    await user.type(screen.getByLabelText("Your take-home pay"), "2500");

    expect(handleChange).toHaveBeenCalled();
  });

  it("uses text inputs by default and supports number inputs", () => {
    render(
      <>
        <TextInput label="Name" />
        <TextInput label="Amount" type="number" />
      </>,
    );

    expect(screen.getByLabelText("Name")).toHaveAttribute("type", "text");
    expect(screen.getByLabelText("Amount")).toHaveAttribute("type", "number");
  });

  it("shows suffix and validation feedback when provided", () => {
    render(
      <TextInput
        label="Price"
        suffix="€"
        error="Please enter a valid price"
      />,
    );

    expect(screen.getByText("€")).toBeInTheDocument();
    expect(screen.getByText("Please enter a valid price")).toBeInTheDocument();
  });
});
