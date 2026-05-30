import {
  calculateHoursFromBasis,
  calculateResult,
  getAffordability,
  getWaitPeriodMessage,
  IncomeBasisEnum,
  validateCalculatorInput,
} from "./calculatorLogic";

describe("calculatorLogic", () => {
  it("validates required positive calculator values", () => {
    expect(
      validateCalculatorInput({
        price: "",
        workHoursPerDay: "0",
        takeHomePay: "",
        workingDaysPerMonth: "",
        basis: IncomeBasisEnum.Monthly,
      }),
    ).toEqual({
      price: "Please enter a valid price",
      workHours: "Please enter valid work hours per day",
      takeHome: "Please enter a valid take-home pay amount",
      workingDays: "Please enter valid working days per month",
    });
  });

  it("validates work schedule upper limits", () => {
    expect(
      validateCalculatorInput({
        price: "10",
        workHoursPerDay: "25",
        takeHomePay: "1000",
        workingDaysPerMonth: "366",
        basis: IncomeBasisEnum.Monthly,
      }),
    ).toEqual({
      workHours: "Please enter 24 work hours per day or less",
      workingDays: "Please enter 31 working days per month or less",
    });
  });

  it("calculates hours from every income basis", () => {
    expect(calculateHoursFromBasis(80, 8, 10, IncomeBasisEnum.Hourly, 20)).toBe(8);
    expect(calculateHoursFromBasis(80, 8, 80, IncomeBasisEnum.Daily, 20)).toBe(8);
    expect(calculateHoursFromBasis(160, 8, 1600, IncomeBasisEnum.Monthly, 20)).toBe(16);
    expect(calculateHoursFromBasis(160, 8, 19200, IncomeBasisEnum.Yearly, 20)).toBe(16);
  });

  it("returns display values and units for each basis", () => {
    expect(
      calculateResult({
        price: "10",
        workHoursPerDay: "8",
        takeHomePay: "10",
        workingDaysPerMonth: "20",
        basis: IncomeBasisEnum.Hourly,
      }),
    ).toEqual({ value: 1, unit: "hour", hoursValue: 1 });

    expect(
      calculateResult({
        price: "80",
        workHoursPerDay: "8",
        takeHomePay: "80",
        workingDaysPerMonth: "20",
        basis: IncomeBasisEnum.Daily,
      }),
    ).toEqual({ value: 1, unit: "day", hoursValue: 8 });

    expect(
      calculateResult({
        price: "1600",
        workHoursPerDay: "8",
        takeHomePay: "1600",
        workingDaysPerMonth: "20",
        basis: IncomeBasisEnum.Monthly,
      }),
    ).toEqual({ value: 1, unit: "month", hoursValue: 160 });

    expect(
      calculateResult({
        price: "19200",
        workHoursPerDay: "8",
        takeHomePay: "19200",
        workingDaysPerMonth: "20",
        basis: IncomeBasisEnum.Yearly,
      }),
    ).toEqual({ value: 1, unit: "year", hoursValue: 1920 });
  });

  it("rates affordability by time cost", () => {
    expect(getAffordability(1)).toBe("Very high");
    expect(getAffordability(4)).toBe("High");
    expect(getAffordability(12)).toBe("Medium");
    expect(getAffordability(40)).toBe("Low");
    expect(getAffordability(100)).toBe("Very low");
  });

  it("returns the waiting period based on the size of the purchase", () => {
    expect(getWaitPeriodMessage(10)).toBe("Wait 24 hours before buying.");
    expect(getWaitPeriodMessage(11)).toBe("Wait 30 days before buying.");
  });
});
