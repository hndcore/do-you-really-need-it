import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Header from "./Header";

describe("Header", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows the brand and main navigation links", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByText("Do you really need it?")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Calculator" })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Reflections" })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "History" })[0]).toBeInTheDocument();
  });

  it("opens and closes the mobile menu when the menu button is pressed", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    expect(screen.getByRole("button", { name: "Close menu" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close menu" }));

    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
  });

  it("opens the support link and closes the mobile menu after navigation", async () => {
    const user = userEvent.setup();
    const open = vi.spyOn(window, "open").mockImplementation(() => null);

    render(
      <MemoryRouter initialEntries={["/reflections"]}>
        <Header />
      </MemoryRouter>,
    );

    await user.click(screen.getAllByRole("button", { name: /support ms patients/i })[0]);

    expect(open).toHaveBeenCalledWith("https://aedem.org/", "_blank");

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getAllByRole("link", { name: "History" }).at(-1)!);

    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
  });
});
