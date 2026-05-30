import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
const navLinks = [
  { label: "Calculator", to: "/calculator" },
  { label: "Reflections", to: "/reflections" },
  { label: "History", to: "/history" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const setNavbarHeight = () => {
      const height = el.offsetHeight;
      document.documentElement.style.setProperty("--navbar-height", `${height}px`);
    };

    setNavbarHeight();

    const ro = new ResizeObserver(setNavbarHeight);
    ro.observe(el);
    window.addEventListener("resize", setNavbarHeight);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setNavbarHeight);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 flex min-h-[60px] w-full items-center border-b border-mist bg-paper px-[4vw]"
    >
      <div className="flex w-full items-center justify-between gap-4">
        <span className="font-serif text-xl italic text-ink">
          Do you really need it?
        </span>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "border-b font-bold border-rust pb-0.5 text-base tracking-[0.04em] text-night"
                  : "text-base tracking-[0.04em] text-ink transition-colors hover:text-night"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center">
          <button
            className="cursor-pointer text-right text-sm uppercase tracking-[0.08em] text-ink transition-colors hover:text-rust"
            onClick={() => window.open("https://aedem.org/", "_blank")}
            type="button"
          >
            Support MS patients in Spain -&gt;
          </button>
        </div>

        <button
          className="md:hidden flex h-8 w-8 items-center justify-center text-ink"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          type="button"
        >
          <span className="text-base uppercase tracking-[0.08em]">
            {menuOpen ? "Close" : "Menu"}
          </span>
        </button>
      </div>

      <nav
        id="mobile-menu"
        hidden={!menuOpen}
        className="absolute left-0 top-full w-full border-b border-mist bg-paper px-[4vw] py-4 md:hidden"
      >
        <div className="flex flex-col gap-4">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-base font-bold text-night underline decoration-rust underline-offset-4"
                  : "text-base text-ink transition-colors hover:text-night"
              }
            >
              {label}
            </NavLink>
          ))}
          <button
            className="cursor-pointer text-left text-xs uppercase tracking-[0.08em] text-ink"
            onClick={() => window.open("https://aedem.org/", "_blank")}
            type="button"
          >
            Support MS patients in Spain -&gt;
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;

