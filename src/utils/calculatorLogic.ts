export enum IncomeBasisEnum {
  Hourly = "hourly",
  Daily = "daily",
  Monthly = "monthly",
  Yearly = "yearly",
}

export type CalculatorResult = {
  value: number;
  unit: string;
  hoursValue: number;
};

export type ErrorsShape = {
  workHours?: string;
  takeHome?: string;
  price?: string;
  workingDays?: string;
};

type CalculatorInput = {
  price: string;
  workHoursPerDay: string;
  takeHomePay: string;
  workingDaysPerMonth: string;
  basis: IncomeBasisEnum;
};

export const validateCalculatorInput = ({
  price,
  workHoursPerDay,
  takeHomePay,
  workingDaysPerMonth,
  basis,
}: CalculatorInput): ErrorsShape => {
  const errors: ErrorsShape = {};

  if (!price || parseFloat(price) <= 0) {
    errors.price = "Please enter a valid price";
  }

  if (!workHoursPerDay || parseFloat(workHoursPerDay) <= 0) {
    errors.workHours = "Please enter valid work hours per day";
  }

  if (!takeHomePay || parseFloat(takeHomePay) <= 0) {
    errors.takeHome = "Please enter a valid take-home pay amount";
  }

  if (
    (basis === IncomeBasisEnum.Monthly || basis === IncomeBasisEnum.Yearly) &&
    (!workingDaysPerMonth || parseFloat(workingDaysPerMonth) <= 0)
  ) {
    errors.workingDays = "Please enter valid working days per month";
  }

  return errors;
};

export const calculateHoursFromBasis = (
  price: number,
  hoursPerDay: number,
  takeHomePay: number,
  basis: IncomeBasisEnum,
  workingDays: number,
): number => {
  switch (basis) {
    case IncomeBasisEnum.Hourly:
      return price / takeHomePay;
    case IncomeBasisEnum.Daily:
      return price / (takeHomePay / hoursPerDay);
    case IncomeBasisEnum.Monthly:
      return (price / takeHomePay) * hoursPerDay * workingDays;
    case IncomeBasisEnum.Yearly:
      return price / (takeHomePay / (hoursPerDay * workingDays * 12));
  }
};

export const calculateResult = ({
  price,
  workHoursPerDay,
  takeHomePay,
  workingDaysPerMonth,
  basis,
}: CalculatorInput): CalculatorResult => {
  const priceNum = parseFloat(price);
  const hoursPerDay = parseFloat(workHoursPerDay);
  const netSalary = parseFloat(takeHomePay);
  const workDays = parseFloat(workingDaysPerMonth);
  const hoursValue = calculateHoursFromBasis(
    priceNum,
    hoursPerDay,
    netSalary,
    basis,
    workDays,
  );

  switch (basis) {
    case IncomeBasisEnum.Hourly:
      return {
        value: hoursValue,
        unit: hoursValue === 1 ? "hour" : "hours",
        hoursValue,
      };
    case IncomeBasisEnum.Daily: {
      const value = hoursValue / hoursPerDay;

      return {
        value,
        unit: value === 1 ? "day" : "days",
        hoursValue,
      };
    }
    case IncomeBasisEnum.Monthly: {
      const value = hoursValue / (hoursPerDay * workDays);

      return {
        value,
        unit: value === 1 ? "month" : "months",
        hoursValue,
      };
    }
    case IncomeBasisEnum.Yearly: {
      const value = hoursValue / (hoursPerDay * workDays * 12);

      return {
        value,
        unit: value === 1 ? "year" : "years",
        hoursValue,
      };
    }
  }
};

export const getAffordability = (hours: number): string => {
  if (hours < 2) return "Very high";
  if (hours < 8) return "High";
  if (hours < 24) return "Medium";
  if (hours < 80) return "Low";
  return "Very low";
};

export const getWaitPeriodMessage = (hours: number): string => {
  if (hours > 10) {
    return "Wait 30 days before buying.";
  }

  return "Wait 24 hours before buying.";
};
