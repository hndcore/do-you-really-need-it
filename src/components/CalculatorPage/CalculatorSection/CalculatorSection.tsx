import { useCalculatorContext } from "@/contexts/CalculatorContext/CalculatorContext";
import type React from "react";
import IncomeBasisSelector from "../IncomeBasisSelector/IncomeBasisSelector";
import IncomeBasisMetadata from "../IncomeBasisMetadata/IncomeBasisMetada";
import TextInput from "@/components/shared/TextInput/TextInput";
import Button from "@/components/shared/Button/Button";
import { useTranslation } from "react-i18next";

type CalculatorSectionProps = {
  calculateEffort: () => void;
  handleClear: () => void;
};

const CalculatorSection: React.FC<CalculatorSectionProps> = ({
  calculateEffort,
  handleClear,
}) => {
  const { t } = useTranslation();
  const {
    basis,
    setBasis,
    price,
    setPrice,
    errors,
    setErrors,
    isLoading,
    setResult,
    setWorkHoursPerDay,
    setTakeHomePay,
    setWorkingDaysPerMonth,
  } = useCalculatorContext();

  return (
    <section className="flex min-h-full flex-col justify-center gap-[clamp(1.2rem,2.5vh,2rem)] bg-panel px-[6vw] py-[6vh]">
      <div>
        <div className="mb-7">
          <label
            id="income-basis-label"
            className="mb-[0.6rem] block text-xs font-normal uppercase leading-none tracking-[0.14em] text-warm"
          >
            {t("calculator.form.basisLabel")}
          </label>
          <IncomeBasisSelector
            labelledBy="income-basis-label"
            value={basis}
            onChange={(newBasis) => {
              setBasis(newBasis);
              setWorkHoursPerDay("8");
              setTakeHomePay("");
              setWorkingDaysPerMonth("22");
              setResult(null);
              setErrors({});
            }}
          />
          <IncomeBasisMetadata />
        </div>

        <div className="mb-7">
          <label
            id="purchase-price-label"
            className="mb-[0.6rem] block text-xs font-normal uppercase leading-none tracking-[0.14em] text-warm"
          >
            {t("calculator.form.priceLabel")}
          </label>
          <TextInput
            id="purchase-price"
            aria-labelledby="purchase-price-label"
            variant="white"
            type="number"
            prefix="€"
            placeholder="0.00"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              if (errors.price) {
                setErrors({ ...errors, price: "" });
              }
            }}
            error={errors.price}
            step="0.01"
            min="0"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            label={t("calculator.form.calculate")}
            onClick={calculateEffort}
            isLoading={isLoading}
            variant="primary"
            size="md"
          />
          <Button
            label={t("calculator.form.clear")}
            onClick={handleClear}
            variant="ghost"
            size="lg"
            className="flex-1"
          />
        </div>
      </div>
      <p className="text-center text-sm tracking-[0.04em] text-sand">
        {t("calculator.form.privacy")}
      </p>
    </section>
  );
};

export default CalculatorSection;
