
import { CalculatorProvider } from "@/contexts/CalculatorContext/CalculatorContext";
import CalculatorPageContainer from "@/components/CalculatorPage/CalculatorPageContainer/CalculatorPageContainer";

const CalculatorPage = () => {
  return (
    <CalculatorProvider>
      <CalculatorPageContainer />
    </CalculatorProvider>
  );
};

export default CalculatorPage;