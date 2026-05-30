import { IncomeBasisEnum } from "@/contexts/CalculatorContext/CalculatorContext";
import { useTranslation } from "react-i18next";

interface IncomeBasisSelectorProps {
  value: IncomeBasisEnum;
  onChange: (basis: IncomeBasisEnum) => void;
  labelledBy?: string;
}

const options: { value: IncomeBasisEnum; labelKey: string }[] = [
  { value: IncomeBasisEnum.Hourly, labelKey: "calculator.form.basis.hourly" },
  { value: IncomeBasisEnum.Daily, labelKey: "calculator.form.basis.daily" },
  { value: IncomeBasisEnum.Monthly, labelKey: "calculator.form.basis.monthly" },
  { value: IncomeBasisEnum.Yearly, labelKey: "calculator.form.basis.yearly" },
];

const IncomeBasisSelector = ({
  value,
  onChange,
  labelledBy,
}: IncomeBasisSelectorProps) => {
  const { t } = useTranslation();

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
          {t(option.labelKey)}
        </button>
      ))}
    </div>
  );
};

export default IncomeBasisSelector;
