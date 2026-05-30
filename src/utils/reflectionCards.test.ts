import { vi } from "vitest";
import { getRandomReflectionCards, reflectionCards } from "./reflectionCards";
import i18n from "@/i18n";

describe("reflectionCards", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the requested number of unique reflection cards", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    const cards = getRandomReflectionCards(3);

    expect(cards).toHaveLength(3);
    expect(new Set(cards.map((card) => card.id)).size).toBe(3);
    expect(reflectionCards).toHaveLength(9);
  });

  it("stores dynamic reflection card description keys", () => {
    const ruleOf30 = reflectionCards.find((card) => card.id === "rule-of-30");
    const opportunityCost = reflectionCards.find((card) => card.id === "opportunity");

    expect(i18n.t(ruleOf30!.descriptionKey, {
      waitPeriodMessage: "Wait 30 days before buying.",
    })).toContain("Wait 30 days before buying.");
    expect(i18n.t(opportunityCost!.descriptionKey, { hours: 12 })).toContain("Those 12 hours");
  });
});
