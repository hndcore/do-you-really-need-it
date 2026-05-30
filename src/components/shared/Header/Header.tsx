import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const navLinks = [
  { labelKey: "header.nav.calculator", to: "/calculator" },
  { labelKey: "header.nav.reflections", to: "/reflections" },
  { labelKey: "header.nav.history", to: "/history" },
];

const languages = [
  { code: "en", labelKey: "header.language.en", flagSrc: "/flags/uk.svg", flagAlt: "United Kingdom flag" },
  { code: "es", labelKey: "header.language.es", flagSrc: "/flags/es.svg", flagAlt: "Spain flag" },
] as const;

type LanguageSelectorProps = {
  id: string;
  selectedLanguage: "en" | "es";
  onChange: (language: "en" | "es") => void;
};

const LanguageSelector = ({
  id,
  selectedLanguage,
  onChange,
}: LanguageSelectorProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const selected = languages.find((language) => language.code === selectedLanguage) ?? languages[0];

  return (
    <div className="relative w-fit">
      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t("header.language.label")}
        className="flex cursor-pointer items-center gap-2 rounded-[2px] border border-mist bg-paper px-2 py-1 text-sm uppercase tracking-[0.08em] text-ink outline-none transition-colors hover:border-rust"
        id={id}
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        <img
          alt={selected.flagAlt}
          className="h-4 w-6 rounded-[1px] border border-mist object-cover"
          src={selected.flagSrc}
        />
        <span>{t(selected.labelKey)}</span>
      </button>
      {open && (
        <div
          aria-labelledby={id}
          className="absolute right-0 top-[calc(100%+0.25rem)] z-50 min-w-full border border-mist bg-paper shadow-sm"
          role="listbox"
        >
          {languages.map((language) => (
            <button
              aria-selected={language.code === selectedLanguage}
              className="flex w-full cursor-pointer items-center gap-2 px-2 py-2 text-left text-sm uppercase tracking-[0.08em] text-ink transition-colors hover:bg-mist"
              key={language.code}
              onClick={() => {
                onChange(language.code);
                setOpen(false);
              }}
              role="option"
              type="button"
            >
              <img
                alt={language.flagAlt}
                className="h-4 w-6 rounded-[1px] border border-mist object-cover"
                src={language.flagSrc}
              />
              <span>{t(language.labelKey)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const { i18n, t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const selectedLanguage = i18n.resolvedLanguage?.startsWith("es") ? "es" : "en";
  const changeLanguage = (language: "en" | "es") => {
    void i18n.changeLanguage(language);
  };

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
          {t("app.brand")}
        </span>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ labelKey, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "border-b font-bold border-rust pb-0.5 text-base tracking-[0.04em] text-night"
                  : "text-base tracking-[0.04em] text-ink transition-colors hover:text-night"
              }
            >
              {t(labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSelector
            id="language-selector"
            onChange={changeLanguage}
            selectedLanguage={selectedLanguage}
          />
          <button
            className="cursor-pointer text-right text-sm uppercase tracking-[0.08em] text-ink transition-colors hover:text-rust"
            onClick={() => window.open("https://aedem.org/", "_blank")}
            type="button"
          >
            {t("header.support")}
          </button>
        </div>

        <button
          className="md:hidden flex h-8 w-8 items-center justify-center text-ink"
          aria-label={menuOpen ? t("header.menu.close") : t("header.menu.open")}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          type="button"
        >
          <span className="text-base uppercase tracking-[0.08em]">
            {menuOpen ? t("header.menu.buttonClose") : t("header.menu.buttonOpen")}
          </span>
        </button>
      </div>

      <nav
        id="mobile-menu"
        hidden={!menuOpen}
        className="absolute left-0 top-full w-full border-b border-mist bg-paper px-[4vw] py-4 md:hidden"
      >
        <div className="flex flex-col gap-4">
          {navLinks.map(({ labelKey, to }) => (
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
              {t(labelKey)}
            </NavLink>
          ))}
          <LanguageSelector
            id="mobile-language-selector"
            onChange={changeLanguage}
            selectedLanguage={selectedLanguage}
          />
          <button
            className="cursor-pointer text-left text-xs uppercase tracking-[0.08em] text-ink"
            onClick={() => window.open("https://aedem.org/", "_blank")}
            type="button"
          >
            {t("header.support")}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;

