import { useCalculatorContext } from "@/contexts/CalculatorContext/CalculatorContext";
import {
  calculateResult,
  validateCalculatorInput,
} from "@/utils/calculatorLogic";
import { useRef } from "react";
import CoverSection from "../CoverSection/CoverSection";
import CalculatorSection from "../CalculatorSection/CalculatorSection";
import ResultsSection from "../ResultsSection/ResultsSection";

const CalculatorPageContainer = () => {
  const {
    workHoursPerDay,
    setWorkHoursPerDay,
    takeHomePay,
    setTakeHomePay,
    workingDaysPerMonth,
    setWorkingDaysPerMonth,
    setErrors,
    basis,
    price,
    setPrice,
    result,
    setResult,
    setIsLoading,
  } = useCalculatorContext();

  const resultRef = useRef<HTMLElement | null>(null);

  const calculateEffort = () => {
    const input = {
      price,
      workHoursPerDay,
      takeHomePay,
      workingDaysPerMonth,
      basis,
    };
    const newErrors = validateCalculatorInput(input);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsLoading(true);
  
    setTimeout(() => {
      setResult(calculateResult(input));
      setIsLoading(false);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
        resultRef.current?.focus({ preventScroll: true });
      }, 100);
    }, 500);
  };

  const handleClear = () => {
    setPrice("");
    setWorkHoursPerDay("8");
    setTakeHomePay("");
    setWorkingDaysPerMonth("22");
    setResult(null);
    setErrors({});
  };

  return (
    <main className="flex-1 bg-paper">
      <div className="grid min-h-[calc(100vh-var(--navbar-height)-var(--footer-height))] grid-cols-1 lg:grid-cols-2">
        <div className="min-w-0">
          <CoverSection />
        </div>
        <div className="min-w-0">
          <CalculatorSection
            calculateEffort={calculateEffort}
            handleClear={handleClear}
          />
        </div>
      </div>
      {result && (
        <ResultsSection resultRef={resultRef} />
      )}
    </main>
  );
};

export default CalculatorPageContainer;
