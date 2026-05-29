import { IncomeBasisEnum } from "@/contexts/CalculatorContext/CalculatorContext";

interface IncomeBasisSelectorProps {
  value: IncomeBasisEnum;
  onChange: (basis: IncomeBasisEnum) => void;
  labelledBy?: string;
}

const options: { value: IncomeBasisEnum; label: string }[] = [
  { value: IncomeBasisEnum.Hourly, label: "Hourly" },
  { value: IncomeBasisEnum.Daily, label: "Daily" },
  { value: IncomeBasisEnum.Monthly, label: "Monthly" },
  { value: IncomeBasisEnum.Yearly, label: "Yearly" },
];

const IncomeBasisSelector = ({
  value,
  onChange,
  labelledBy,
}: IncomeBasisSelectorProps) => {
  return (
    <div
      aria-labelledby={labelledBy}
      className="grid w-full grid-cols-2 gap-1 sm:grid-cols-4"
      role="group"
    >
      {options.map((option) => (
        <button
          key={option.value}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={`cursor-pointer rounded-[2px] border px-3 py-2.5 text-center text-sm font-normal leading-none transition-all duration-150 ${
            value === option.value
              ? "border-rust bg-rust text-paper"
              : "border-charcoal bg-transparent text-warm hover:border-flame hover:text-paper"
          }`}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default IncomeBasisSelector;
