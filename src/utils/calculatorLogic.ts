import i18n from "@/i18n";
import type { TFunction } from "i18next";

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

export const MAX_WORK_HOURS_PER_DAY = 24;
export const MAX_WORKING_DAYS_PER_MONTH = 31;

const translate = (t: TFunction | undefined, key: string, options?: Record<string, unknown>) =>
  (t ?? i18n.t)(key, options);

export const validateCalculatorInput = ({
  price,
  workHoursPerDay,
  takeHomePay,
  workingDaysPerMonth,
  basis,
}: CalculatorInput, t?: TFunction): ErrorsShape => {
  const errors: ErrorsShape = {};

  if (!price || parseFloat(price) <= 0) {
    errors.price = translate(t, "calculator.form.errors.price");
  }

  const workHours = parseFloat(workHoursPerDay);
  const workingDays = parseFloat(workingDaysPerMonth);

  if (!workHoursPerDay || workHours <= 0) {
    errors.workHours = translate(t, "calculator.form.errors.workHours");
  } else if (workHours > MAX_WORK_HOURS_PER_DAY) {
    errors.workHours = translate(t, "calculator.form.errors.workHoursMax", {
      max: MAX_WORK_HOURS_PER_DAY,
    });
  }

  if (!takeHomePay || parseFloat(takeHomePay) <= 0) {
    errors.takeHome = translate(t, "calculator.form.errors.takeHome");
  }

  if (
    (basis === IncomeBasisEnum.Monthly || basis === IncomeBasisEnum.Yearly) &&
    (!workingDaysPerMonth || workingDays <= 0)
  ) {
    errors.workingDays = translate(t, "calculator.form.errors.workingDays");
  } else if (
    (basis === IncomeBasisEnum.Monthly || basis === IncomeBasisEnum.Yearly) &&
    workingDays > MAX_WORKING_DAYS_PER_MONTH
  ) {
    errors.workingDays = translate(t, "calculator.form.errors.workingDaysMax", {
      max: MAX_WORKING_DAYS_PER_MONTH,
    });
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
}: CalculatorInput, t?: TFunction): CalculatorResult => {
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
        unit: translate(t, "calculator.units.hour", { count: hoursValue }),
        hoursValue,
      };
    case IncomeBasisEnum.Daily: {
      const value = hoursValue / hoursPerDay;

      return {
        value,
        unit: translate(t, "calculator.units.day", { count: value }),
        hoursValue,
      };
    }
    case IncomeBasisEnum.Monthly: {
      const value = hoursValue / (hoursPerDay * workDays);

      return {
        value,
        unit: translate(t, "calculator.units.month", { count: value }),
        hoursValue,
      };
    }
    case IncomeBasisEnum.Yearly: {
      const value = hoursValue / (hoursPerDay * workDays * 12);

      return {
        value,
        unit: translate(t, "calculator.units.year", { count: value }),
        hoursValue,
      };
    }
  }
};

export const getAffordability = (hours: number, t?: TFunction): string => {
  if (hours < 2) return translate(t, "calculator.results.affordabilityLevels.veryHigh");
  if (hours < 8) return translate(t, "calculator.results.affordabilityLevels.high");
  if (hours < 24) return translate(t, "calculator.results.affordabilityLevels.medium");
  if (hours < 80) return translate(t, "calculator.results.affordabilityLevels.low");
  return translate(t, "calculator.results.affordabilityLevels.veryLow");
};

export const getWaitPeriodMessage = (hours: number, t?: TFunction): string => {
  if (hours > 10) {
    return translate(t, "calculator.results.waitPeriod.days30");
  }

  return translate(t, "calculator.results.waitPeriod.hours24");
};
