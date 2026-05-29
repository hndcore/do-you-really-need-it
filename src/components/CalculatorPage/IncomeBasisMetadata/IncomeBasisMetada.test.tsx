import { useEffect } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  CalculatorProvider,
  IncomeBasisEnum,
  useCalculatorContext,
} from "@/contexts/CalculatorContext/CalculatorContext";
import IncomeBasisMetadata from "./IncomeBasisMetada";

const MonthlyMetadata = () => {
  const { setBasis } = useCalculatorContext();

  useEffect(() => {
    setBasis(IncomeBasisEnum.Monthly);
  }, [setBasis]);

  return <IncomeBasisMetadata />;
};

const BasisMetadata = ({ basis }: { basis: IncomeBasisEnum }) => {
  const {
    setBasis,
    setErrors,
  } = useCalculatorContext();

  useEffect(() => {
    setBasis(basis);
    setErrors({
      workHours: "Work hours are required",
      takeHome: "Take-home pay is required",
      workingDays: "Working days are required",
    });
  }, [basis, setBasis, setErrors]);

  return <IncomeBasisMetadata />;
};

describe("IncomeBasisMetadata", () => {
  it("shows only the hourly take-home pay field for hourly income", () => {
    render(
      <CalculatorProvider>
        <IncomeBasisMetadata />
      </CalculatorProvider>,
    );

    expect(screen.getByLabelText("Your take-home pay (per hour, net)")).toBeInTheDocument();
    expect(screen.queryByLabelText("Work hours / day")).not.toBeInTheDocument();
  });

  it("shows work schedule fields for monthly income", async () => {
    render(
      <CalculatorProvider>
        <MonthlyMetadata />
      </CalculatorProvider>,
    );

    expect(await screen.findByLabelText("Work hours / day")).toBeInTheDocument();
    expect(screen.getByLabelText("Working days / month")).toBeInTheDocument();
    expect(screen.getByLabelText("Your take-home pay (per month, net)")).toBeInTheDocument();
  });

  it("shows work hours and daily take-home pay for daily income", async () => {
    render(
      <CalculatorProvider>
        <BasisMetadata basis={IncomeBasisEnum.Daily} />
      </CalculatorProvider>,
    );

    expect(await screen.findByLabelText("Work hours / day")).toBeInTheDocument();
    expect(screen.getByLabelText("Your take-home pay (per day, net)")).toBeInTheDocument();
  });

  it("shows yearly take-home pay and clears field errors when values change", async () => {
    const user = userEvent.setup();

    render(
      <CalculatorProvider>
        <BasisMetadata basis={IncomeBasisEnum.Yearly} />
      </CalculatorProvider>,
    );

    await user.type(await screen.findByLabelText("Work hours / day"), "7");
    await user.type(screen.getByLabelText("Working days / month"), "20");
    await user.type(screen.getByLabelText("Your take-home pay (per year, net)"), "30000");

    expect(screen.queryByText("Work hours are required")).not.toBeInTheDocument();
    expect(screen.queryByText("Working days are required")).not.toBeInTheDocument();
    expect(screen.queryByText("Take-home pay is required")).not.toBeInTheDocument();
  });
});
