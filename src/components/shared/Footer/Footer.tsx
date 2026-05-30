import { VERSION } from "@/utils/versioning";
import { useEffect, useRef } from "react";

const Footer = () => {
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
        <span className="font-serif text-lg italic text-ink">Do you really need it? <span className="!not-italic text-sm text-earth font-light font-sans">v{VERSION}</span></span>
        <span className="text-sm leading-relaxed text-earth">
          © {new Date().getFullYear()} Manuel L. Camarena. Reflect before you spend. No copyright. Free to use, modify and distribute. With ❤️
        </span>
      </div>
    </footer>
  );
};

export default Footer;
