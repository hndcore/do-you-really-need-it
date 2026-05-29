import {
  IncomeBasisEnum,
  type CalculatorResult,
  type ErrorsShape,
} from "@/utils/calculatorLogic";
import React, { useMemo } from "react";

export { IncomeBasisEnum };
export type { CalculatorResult, ErrorsShape };

type CalculatorContextType = {
  workHoursPerDay: string;
  setWorkHoursPerDay: React.Dispatch<React.SetStateAction<string>>;
  takeHomePay: string;
  setTakeHomePay: React.Dispatch<React.SetStateAction<string>>;
  workingDaysPerMonth: string;
  setWorkingDaysPerMonth: React.Dispatch<React.SetStateAction<string>>;
  errors: ErrorsShape;
  setErrors: React.Dispatch<React.SetStateAction<ErrorsShape>>;
  basis:  IncomeBasisEnum;
  setBasis: React.Dispatch<React.SetStateAction<IncomeBasisEnum>>;
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  result: CalculatorResult | null;
  setResult: React.Dispatch<React.SetStateAction<CalculatorResult | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState: CalculatorContextType = {
  workHoursPerDay: "",
  setWorkHoursPerDay: () => {},
  takeHomePay: "",
  setTakeHomePay: () => {},
  workingDaysPerMonth: "22",
  setWorkingDaysPerMonth: () => {},
  errors: {
    workHours: "",
    takeHome: "",
    price: "",
    workingDays: "",
  },
  setErrors: () => {},
  basis: IncomeBasisEnum.Hourly,
  setBasis: () => {},
  price: "",
  setPrice: () => {},
  result: null,
  setResult: () => {},
  isLoading: false,
  setIsLoading: () => {},
};

const CalculatorContext = React.createContext<CalculatorContextType>(initialState);

export const CalculatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workHoursPerDay, setWorkHoursPerDay] = React.useState<string>("8");
  const [takeHomePay, setTakeHomePay] = React.useState<string>("");
  const [workingDaysPerMonth, setWorkingDaysPerMonth] = React.useState<string>("22");
  const [errors, setErrors] = React.useState<ErrorsShape>({
    workHours: "",
    takeHome: "",
    price: "",
    workingDays: "",
  });
  const [basis, setBasis] = React.useState<IncomeBasisEnum>(IncomeBasisEnum.Hourly);
  const [price, setPrice] = React.useState<string>("");
  const [result, setResult] = React.useState<CalculatorResult | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const contextValue = useMemo(() => ({
    workHoursPerDay,
    setWorkHoursPerDay,
    takeHomePay,
    setTakeHomePay,
    workingDaysPerMonth,
    setWorkingDaysPerMonth,
    errors,
    setErrors,
    basis,
    setBasis,
    price,
    setPrice,
    result,
    setResult,
    isLoading,
    setIsLoading,
  }), [workHoursPerDay, takeHomePay, workingDaysPerMonth, errors, basis, price, result, isLoading, setWorkHoursPerDay, setTakeHomePay, setWorkingDaysPerMonth, setErrors, setBasis, setPrice, setResult, setIsLoading]);

  return (
    <CalculatorContext.Provider
      value={contextValue}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculatorContext = () => {
  const context = React.useContext(CalculatorContext);
  if (!context) {
    throw new Error("useCalculatorContext must be used within a CalculatorProvider");
  }
  return context;
};

export default CalculatorContext;
