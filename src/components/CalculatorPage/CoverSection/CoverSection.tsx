import type React from "react";

const formatExampleTime = (hours: number): string => {
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  if (hours < 8) return `${hours.toFixed(1)}h`;
  return `${(hours / 8).toFixed(1)} days`;
};

const examples = [
  { label: "6€ coffee", cost: 6 },
  { label: "150€ shoes", cost: 150 },
  { label: "1400€ laptop", cost: 1400 },
];

const fixedExampleHourlyRate = 2000 / (8 * 22);

const CoverSection: React.FC = () => {
  return (
    <section className="flex min-h-full flex-col justify-between bg-paper px-[6vw] py-[6vh]">
      <div>
        <p className="mb-[2.5vh] text-xs uppercase tracking-[0.14em] text-ink">
          The real cost you should take into account
        </p>
        <h1 className="font-serif text-[clamp(52px,5.8vw,106px)] font-bold leading-none text-ink">
          Do you <em className="text-rust italic">really</em>
          <br />
          need it?
        </h1>
        <p className="mt-[2.5vh] max-w-[460px] text-[clamp(16px,1.2vw,20px)] font-light leading-[1.65] text-ink">
          Transform every purchase into a measurement of your most precious
          resource: <span className="font-bold text-night">time</span>. Reflection is the antidote to impulse.
        </p>
      </div>

      <div className="mt-12 border-t border-mist pt-[2.5vh]">
        <p className="mb-5 text-xs uppercase tracking-[0.14em] text-ink">
          For example, for someone with a €2000 monthly take-home pay working
          8h/day and 22 days/month.
        </p>
        <div className="flex flex-col gap-2.5">
          {examples.map((example) => (
            <div
              key={example.label}
              className="flex flex-wrap items-center gap-3 text-sm text-ink"
            >
              <span className="whitespace-nowrap rounded-[2px] bg-ink px-3 py-1.5 text-xs tracking-[0.06em] text-paper">
                {example.label}
              </span>
              <span>-&gt;</span>
              <span>
                {formatExampleTime(example.cost / fixedExampleHourlyRate)} of
                your life
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoverSection;
