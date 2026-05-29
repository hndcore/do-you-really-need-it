import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("shows the project name, current year, and free-use message", () => {
    render(<Footer />);

    expect(screen.getByText("Do you really need it?")).toBeInTheDocument();
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
    expect(screen.getByText(/free to use, modify and distribute/i)).toBeInTheDocument();
  });
});
