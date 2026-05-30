import { getRandomItems } from "./random";

export type ReflectionCard = {
  id: string;
  titleKey: string;
  descriptionKey: string;
};

export const reflectionCards: ReflectionCard[] = [
  {
    id: "rule-of-30",
    titleKey: "calculator.results.reflectionCards.ruleOf30.title",
    descriptionKey: "calculator.results.reflectionCards.ruleOf30.description",
  },
  {
    id: "maintenance",
    titleKey: "calculator.results.reflectionCards.maintenance.title",
    descriptionKey: "calculator.results.reflectionCards.maintenance.description",
  },
  {
    id: "opportunity",
    titleKey: "calculator.results.reflectionCards.opportunity.title",
    descriptionKey: "calculator.results.reflectionCards.opportunity.description",
  },
  {
    id: "storage",
    titleKey: "calculator.results.reflectionCards.storage.title",
    descriptionKey: "calculator.results.reflectionCards.storage.description",
  },
  {
    id: "replacement",
    titleKey: "calculator.results.reflectionCards.replacement.title",
    descriptionKey: "calculator.results.reflectionCards.replacement.description",
  },
  {
    id: "usage",
    titleKey: "calculator.results.reflectionCards.usage.title",
    descriptionKey: "calculator.results.reflectionCards.usage.description",
  },
  {
    id: "future",
    titleKey: "calculator.results.reflectionCards.future.title",
    descriptionKey: "calculator.results.reflectionCards.future.description",
  },
  {
    id: "borrow",
    titleKey: "calculator.results.reflectionCards.borrow.title",
    descriptionKey: "calculator.results.reflectionCards.borrow.description",
  },
  {
    id: "upgrade",
    titleKey: "calculator.results.reflectionCards.upgrade.title",
    descriptionKey: "calculator.results.reflectionCards.upgrade.description",
  },
];

export const getRandomReflectionCards = (count: number) =>
  getRandomItems(reflectionCards, count);
