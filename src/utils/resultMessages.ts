import { getRandomItem } from "./random";
import i18n from "@/i18n";
import type { TFunction } from "i18next";

type ResultMessageRange = {
  maxHours: number;
  key: string;
};

export const resultMessageRanges: ResultMessageRange[] = [
  { maxHours: 4, key: "calculator.results.messages.small" },
  { maxHours: 8, key: "calculator.results.messages.day" },
  { maxHours: 40, key: "calculator.results.messages.days" },
  { maxHours: 160, key: "calculator.results.messages.weeks" },
  { maxHours: 320, key: "calculator.results.messages.largeWeeks" },
  { maxHours: Number.POSITIVE_INFINITY, key: "calculator.results.messages.months" },
];

export const getResultMessage = (hours: number, t: TFunction = i18n.t) => {
  const range = resultMessageRanges.find(({ maxHours }) => hours < maxHours);
  const key = range?.key ?? resultMessageRanges[0].key;
  const options = {
    returnObjects: true,
    days: Math.round(hours / 8),
    weeks: Math.round(hours / 40),
  };
  const translatedMessages = t(key, options) as unknown as string[];
  const messages = translatedMessages.some(Boolean)
    ? translatedMessages
    : (i18n.getFixedT("en")(key, options) as unknown as string[]);

  return getRandomItem(messages);
};
