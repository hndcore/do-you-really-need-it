import { getRandomItems } from "./random";

export type ReflectionCard = {
  title: string;
  description: (hours: number, waitPeriodMessage: string) => string;
};

export const reflectionCards: ReflectionCard[] = [
  {
    title: "The Rule of 30",
    description: (_hours, waitPeriodMessage) =>
      `${waitPeriodMessage} If you still want it after that, the decision will be clearer.`,
  },
  {
    title: "Maintenance cost",
    description: () =>
      "Will this need cleaning, fixing, charging, updates, refills, or extra accessories? Count that too.",
  },
  {
    title: "Opportunity cost",
    description: (hours) =>
      `Those ${Math.round(hours)} hours could also stay in your pocket for rest, travel, debt, savings, or a calmer month.`,
  },
  {
    title: "Storage cost",
    description: () =>
      "Where will this live when you are not using it? If you do not know, that is part of the cost.",
  },
  {
    title: "Replacement test",
    description: () =>
      "If you lost it six months from now, would you buy the same thing again right away?",
  },
  {
    title: "Usage forecast",
    description: () =>
      "Name the next three times you would use it. If that is hard, the use case may be thin.",
  },
  {
    title: "Future you",
    description: () =>
      "Next month, when the novelty is gone, will you be glad this money is not there?",
  },
  {
    title: "Borrow first",
    description: () =>
      "If this is for occasional use, borrowing, renting, or buying used might be enough.",
  },
  {
    title: "Upgrade trap",
    description: () =>
      "If you already own a working version, write down what actually improves. Be specific.",
  },
];

export const getRandomReflectionCards = (count: number) =>
  getRandomItems(reflectionCards, count);
