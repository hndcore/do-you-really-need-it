import { useCalculatorContext } from "@/contexts/CalculatorContext/CalculatorContext";
import {
  getAffordability,
  getWaitPeriodMessage,
} from "@/utils/calculatorLogic";
import { getRandomReflectionCards } from "@/utils/reflectionCards";
import { getResultMessage } from "@/utils/resultMessages";
import React, { useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";

type ResultsSectionProps = {
  resultRef: React.RefObject<HTMLElement | null>;
};

const ResultsSection: React.FC<ResultsSectionProps> = ({
  resultRef,
}) => {
  const { t } = useTranslation();
  const { result } = useCalculatorContext();
  const hoursValue = result?.hoursValue ?? 0;

  const resultMessage = useMemo(
    () => getResultMessage(hoursValue, t),
    [result, hoursValue, t],
  );
  const selectedReflectionCards = useMemo(
    () => getRandomReflectionCards(3),
    [result],
  );

  if (!result) return null;

  return (
    <section
      ref={resultRef}
      aria-labelledby="results-heading"
      aria-live="polite"
      className="animate-fadeIn bg-paper px-[6vw] py-16"
      tabIndex={-1}
    >
      <div className="mx-auto max-w-6xl">
        <div className="border-t border-mist pt-8">
          <p className="mb-4 text-xs uppercase tracking-[0.14em] text-ink">
            {t("calculator.results.eyebrow")}
          </p>
          <h2
            id="results-heading"
            className="max-w-4xl font-serif text-[clamp(40px,4.3vw,74px)] leading-none text-ink"
          >
            <Trans
              i18nKey="calculator.results.title"
              values={{ hours: Math.round(hoursValue) }}
              components={{ em: <em className="text-rust" /> }}
            />
          </h2>
          <p className="mt-5 max-w-2xl text-lg font-light leading-[1.65] text-ink">
            {resultMessage}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-[2px] border border-mist bg-ink p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-paper">
              {t("calculator.results.daysLabor")}
            </p>
            <p className="mt-3 font-serif text-5xl italic text-rust">
              {(hoursValue / 8).toFixed(1)}
            </p>
          </div>
          <div className="rounded-[2px] border border-mist bg-paper p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-ink">
              {t("calculator.results.weeksEffort")}
            </p>
            <p className="mt-3 font-serif text-5xl italic text-rust">
              {(hoursValue / 40).toFixed(1)}
            </p>
          </div>
          <div className="rounded-[2px] border border-mist bg-paper p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-ink">
              {t("calculator.results.affordability")}
            </p>
            <p className="mt-3 font-serif text-5xl italic text-rust">
              {getAffordability(hoursValue, t)}
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {selectedReflectionCards.map((card) => (
            <article
              key={card.id}
              className="border-t pt-5 border-rust"
            >
              <h3 className="font-serif text-3xl italic text-ink">
                {t(card.titleKey)}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-clay">
                {t(card.descriptionKey, {
                  hours: Math.round(hoursValue),
                  waitPeriodMessage: getWaitPeriodMessage(hoursValue, t),
                })}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
