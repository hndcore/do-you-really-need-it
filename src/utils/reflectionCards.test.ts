import { vi } from "vitest";
import { getRandomReflectionCards, reflectionCards } from "./reflectionCards";

describe("reflectionCards", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the requested number of unique reflection cards", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    const cards = getRandomReflectionCards(3);

    expect(cards).toHaveLength(3);
    expect(new Set(cards.map((card) => card.title)).size).toBe(3);
    expect(reflectionCards).toHaveLength(9);
  });

  it("formats dynamic reflection card descriptions", () => {
    const ruleOf30 = reflectionCards.find((card) => card.title === "The Rule of 30");
    const opportunityCost = reflectionCards.find((card) => card.title === "Opportunity cost");

    expect(ruleOf30?.description(12, "Wait 30 days before buying.")).toContain("Wait 30 days before buying.");
    expect(opportunityCost?.description(12, "")).toContain("Those 12 hours");
  });
});
