import { vi } from "vitest";
import { getResultMessage } from "./resultMessages";

describe("resultMessages", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each([
    [1, /small amount of work/i],
    [6, /less than a work day/i],
    [16, /nearly 2 full work days/i],
    [80, /around 2 work weeks/i],
    [200, /around 5 weeks of work/i],
    [400, /months of work/i],
  ])("returns a range message for %i hours", (hours, message) => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    expect(getResultMessage(hours)).toMatch(message);
  });
});
