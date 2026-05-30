import { VERSION } from "@/utils/versioning";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const setFooterHeight = () => {
      const height = el.offsetHeight;
      document.documentElement.style.setProperty("--footer-height", `${height}px`);
    };

    setFooterHeight();
    const ro = new ResizeObserver(setFooterHeight);
    ro.observe(el);
    window.addEventListener("resize", setFooterHeight);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setFooterHeight);
    };
  }, []);

  return (
    <footer ref={ref} className="w-full border-t border-mist bg-paper py-5">
      <div className="mx-[4vw] flex flex-col items-start gap-1">
        <span className="font-serif text-lg italic text-ink">{t("app.brand")} <span className="!not-italic text-sm text-earth font-light font-sans">v{VERSION}</span></span>
        <span className="text-sm leading-relaxed text-earth">
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
