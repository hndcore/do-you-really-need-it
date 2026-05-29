import { render, screen } from "@testing-library/react";
import CoverSection from "./CoverSection";

describe("CoverSection", () => {
  it("explains the purpose of the calculator with example purchases", () => {
    render(<CoverSection />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Do you reallyneed it?");
    expect(screen.getByText(/transform every purchase/i)).toBeInTheDocument();
    expect(screen.getByText("6€ coffee")).toBeInTheDocument();
    expect(screen.getByText("150€ shoes")).toBeInTheDocument();
    expect(screen.getByText("1400€ laptop")).toBeInTheDocument();
  });
});
