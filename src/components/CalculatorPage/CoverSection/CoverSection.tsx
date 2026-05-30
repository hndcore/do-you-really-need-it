import type React from "react";
import { Trans, useTranslation } from "react-i18next";

const formatExampleTime = (hours: number, t: (key: string, options?: Record<string, unknown>) => string): string => {
  if (hours < 1) return t("calculator.cover.time.minutes", { count: Math.round(hours * 60) });
  if (hours < 8) return t("calculator.cover.time.hours", { count: hours.toFixed(2) });
  return t("calculator.cover.time.days", { count: (hours / 8).toFixed(2) });
};

const examples = [
  { labelKey: "calculator.cover.examples.0.label", cost: 6 },
  { labelKey: "calculator.cover.examples.1.label", cost: 150 },
  { labelKey: "calculator.cover.examples.2.label", cost: 1400 },
];

const fixedExampleHourlyRate = 2000 / (8 * 22);

const CoverSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="flex min-h-full flex-col justify-between bg-paper px-[6vw] py-[6vh]">
      <div>
        <p className="mb-[2.5vh] text-xs uppercase tracking-[0.14em] text-ink">
          {t("calculator.cover.eyebrow")}
        </p>
        <h1 className="font-serif text-[clamp(52px,5.8vw,106px)] font-bold leading-none text-ink">
          {t("calculator.cover.titleBefore")} <em className="text-rust italic">{t("calculator.cover.titleEmphasis")}</em>
          <br />
          {t("calculator.cover.titleAfter")}
        </h1>
        <p className="mt-[2.5vh] max-w-[460px] text-[clamp(16px,1.2vw,20px)] font-light leading-[1.65] text-ink">
          <Trans
            i18nKey="calculator.cover.intro"
            components={{ strong: <span className="font-bold text-night" /> }}
          />
        </p>
      </div>

      <div className="mt-12 border-t border-mist pt-[2.5vh]">
        <p className="mb-5 text-xs uppercase tracking-[0.14em] text-ink">
          {t("calculator.cover.exampleIntro")}
        </p>
        <div className="flex flex-col gap-2.5">
          {examples.map((example) => (
            <div
              key={example.labelKey}
              className="flex flex-wrap items-center gap-3 text-sm text-ink"
            >
              <span className="whitespace-nowrap rounded-[2px] bg-ink px-3 py-1.5 text-xs tracking-[0.06em] text-paper">
                {t(example.labelKey)}
              </span>
              <span>-&gt;</span>
              <span>
                {t("calculator.cover.exampleLife", {
                  time: formatExampleTime(example.cost / fixedExampleHourlyRate, t),
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoverSection;
