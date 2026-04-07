import { useState } from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { label: "Calculator", to: "/calculator" },
  { label: "Reflections", to: "/reflections" },
  { label: "History", to: "/history" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white w-full px-6 py-4 shadow-sm relative">
      <div className="flex items-center">
        <span className="text-primary font-extrabold flex-1" style={{ fontSize: "var(--text-header)" }}>
          Do you really need it?
        </span>

        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              style={{ fontSize: "var(--text-header)" }}
              className={({ isActive }) =>
                isActive
                  ? "text-nav-active font-semibold underline underline-offset-4"
                  : "text-secondary font-medium hover:text-nav-active transition-colors"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 text-primary"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          type="button"
        >
          <span className={`block h-0.5 w-6 bg-current transition-transform duration-300 origin-center ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-current transition-transform duration-300 origin-center ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      <nav
        id="mobile-menu"
        hidden={!menuOpen}
        className="md:hidden flex flex-col gap-4 pt-4 pb-2"
      >
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: "var(--text-header)" }}
              className={({ isActive }) =>
                isActive
                  ? "text-nav-active font-semibold underline underline-offset-4"
                  : "text-secondary font-medium hover:text-nav-active transition-colors"
              }
            >
              {label}
            </NavLink>
          ))}
      </nav>
    </header>
  );
}

