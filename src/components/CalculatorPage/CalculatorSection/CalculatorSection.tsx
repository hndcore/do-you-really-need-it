import { useCalculatorContext } from "@/contexts/CalculatorContext/CalculatorContext";
import type React from "react";
import IncomeBasisSelector from "../IncomeBasisSelector/IncomeBasisSelector";
import IncomeBasisMetadata from "../IncomeBasisMetadata/IncomeBasisMetada";
import TextInput from "@/components/shared/TextInput/TextInput";
import Button from "@/components/shared/Button/Button";

type CalculatorSectionProps = {
  calculateEffort: () => void;
  handleClear: () => void;
};

const CalculatorSection: React.FC<CalculatorSectionProps> = ({
  calculateEffort,
  handleClear,
}) => {
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
            01 - Your wage basis
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
            02 - The cost - how much do you plan to spend?
          </label>
          <TextInput
            id="purchase-price"
            aria-labelledby="purchase-price-label"
            variant="white"
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
            label="Calculate Effort"
            onClick={calculateEffort}
            isLoading={isLoading}
            variant="primary"
            size="md"
          />
          <Button
            label="Clear"
            onClick={handleClear}
            variant="ghost"
            size="lg"
            className="flex-1"
          />
        </div>
      </div>
      <p className="text-center text-sm tracking-[0.04em] text-sand">
        We don't track or store any of your data. All calculations are done in your browser, and the results are not sent to any server.
      </p>
    </section>
  );
};

export default CalculatorSection;
