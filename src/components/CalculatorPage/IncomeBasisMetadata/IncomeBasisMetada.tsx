import TextInput from "@/components/shared/TextInput/TextInput";
import { useCalculatorContext, IncomeBasisEnum } from "@/contexts/CalculatorContext/CalculatorContext";
import type React from "react";

const IncomeBasisMetadata: React.FC = () => {
  const {
    basis,
    workHoursPerDay,
    setWorkHoursPerDay,
    takeHomePay,
    setTakeHomePay,
    workingDaysPerMonth,
    setWorkingDaysPerMonth,
    errors,
    setErrors,
  } = useCalculatorContext();

  if (basis === IncomeBasisEnum.Hourly) {
    return (
      <div className="mt-[clamp(1.2rem,2.5vh,2rem)] grid grid-cols-1 gap-[clamp(1.2rem,2.5vh,2rem)]">
        <TextInput
          prefix="€"
          variant="gray"
          placeholder="0.00"
          label="Your take-home pay (per hour, net)"
          value={takeHomePay}
          onChange={(e) => {
            setTakeHomePay(e.target.value);
            if (errors.takeHome) {
              setErrors({ ...errors, takeHome: "" });
            }
          }}
          error={errors.takeHome}
          step="0.01"
          min="0"
        />
      </div>
    );
  }

  if (basis === IncomeBasisEnum.Daily) {
    return (
      <div className="mt-[clamp(1.2rem,2.5vh,2rem)] grid grid-cols-1 gap-[clamp(1.2rem,2.5vh,2rem)] sm:grid-cols-2">
        <TextInput
          variant="gray"
          placeholder="8"
          label="Work hours / day"
          value={workHoursPerDay}
          onChange={(e) => {
            setWorkHoursPerDay(e.target.value);
            if (errors.workHours) {
              setErrors({ ...errors, workHours: "" });
            }
          }}
          error={errors.workHours}
          step="0.5"
          min="0"
        />

        <TextInput
          prefix="€"
          variant="gray"
          placeholder="0.00"
          label="Your take-home pay (per day, net)"
          value={takeHomePay}
          onChange={(e) => {
            setTakeHomePay(e.target.value);
            if (errors.takeHome) {
              setErrors({ ...errors, takeHome: "" });
            }
          }}
          error={errors.takeHome}
          step="0.01"
          min="0"
        />
      </div>
    );
  }

  if (basis === IncomeBasisEnum.Monthly || basis === IncomeBasisEnum.Yearly) {
    return (
      <div className="mt-[clamp(1.2rem,2.5vh,2rem)] space-y-[clamp(1.2rem,2.5vh,2rem)]">
        <div className="grid grid-cols-1 gap-[clamp(1.2rem,2.5vh,2rem)] sm:grid-cols-2">
          <TextInput
            variant="gray"
            placeholder="8"
            label="Work hours / day"
            value={workHoursPerDay}
            onChange={(e) => {
              setWorkHoursPerDay(e.target.value);
              if (errors.workHours) {
                setErrors({ ...errors, workHours: "" });
              }
            }}
            error={errors.workHours}
            step="0.5"
            min="0"
          />

          <TextInput
            variant="gray"
            placeholder="22"
            label="Working days / month"
            value={workingDaysPerMonth}
            onChange={(e) => {
              setWorkingDaysPerMonth(e.target.value);
              if (errors.workingDays) {
                setErrors({ ...errors, workingDays: "" });
              }
            }}
            error={errors.workingDays}
            step="1"
            min="0"
          />
        </div>

        <TextInput
          prefix="€"
          variant="gray"
          placeholder="0.00"
          label={`Your take-home pay (per ${basis === IncomeBasisEnum.Monthly ? "month" : "year"}, net)`}
          value={takeHomePay}
          onChange={(e) => {
            setTakeHomePay(e.target.value);
            if (errors.takeHome) {
              setErrors({ ...errors, takeHome: "" });
            }
          }}
          error={errors.takeHome}
          step="0.01"
          min="0"
        />
      </div>
    );
  }

  return null;
};

export default IncomeBasisMetadata;
