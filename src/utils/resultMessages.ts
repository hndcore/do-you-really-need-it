import { getRandomItem } from "./random";

type ResultMessage = string | ((hours: number) => string);

type ResultMessageRange = {
  maxHours: number;
  messages: ResultMessage[];
};

const resolveMessage = (message: ResultMessage, hours: number) =>
  typeof message === "function" ? message(hours) : message;

export const resultMessageRanges: ResultMessageRange[] = [
  {
    maxHours: 4,
    messages: [
      "This is a small amount of work. If you really want or need it, go for it. Just keep an eye on how often these little buys happen.",
      "This one is not a big deal by itself. The only question is whether it is useful, enjoyable, or just something to click on.",
      "A few hours is a fair trade for some things. If it will actually make your day better, that matters too.",
      "This sits in small-treat territory. Worth it if it feels chosen, less worth it if it feels automatic.",
    ],
  },
  {
    maxHours: 8,
    messages: [
      "That's less than a work day. According to the Rule of 30, if you can wait 30 days and still want it, then it's probably worth it. If not, you just saved yourself a day of work.",
      "This costs less than one work day. That is easy to justify, so it is also easy to stop thinking about it too soon.",
      "You are trading part of a work day for this. If you would still choose it tomorrow, it may be fine.",
      "This is not huge, but it is not nothing. Waiting one day can tell you a lot.",
    ],
  },
  {
    maxHours: 40,
    messages: [
      (hours) =>
        `That's nearly ${Math.round(hours / 8)} full work days. Worth pausing before you give that much time to one purchase.`,
      (hours) =>
        `That's about ${Math.round(hours / 8)} work days. Imagine finishing those days and choosing this with the money in your hand.`,
      (hours) =>
        `This is roughly ${Math.round(hours / 8)} days of labor. Make sure you are buying something you will still care about later.`,
      (hours) =>
        `You are close to trading ${Math.round(hours / 8)} full work days for this. It deserves a real yes, not a quick one.`,
    ],
  },
  {
    maxHours: 160,
    messages: [
      (hours) =>
        `That's around ${Math.round(hours / 40)} work weeks of your life. Consider waiting at least 30 days before making this purchase.`,
      (hours) =>
        `This is about ${Math.round(hours / 40)} work weeks. Let it sit for a while and see if you still feel the same.`,
      (hours) =>
        `You are looking at roughly ${Math.round(hours / 40)} weeks of work. That is enough time to deserve a slower decision.`,
      (hours) =>
        `That is close to ${Math.round(hours / 40)} work weeks. Ask what else this money could quietly do for you.`,
    ],
  },
  {
    maxHours: 320,
    messages: [
      (hours) =>
        `That's around ${Math.round(hours / 40)} weeks of work. This is no longer a casual purchase.`,
      (hours) =>
        `This represents about ${Math.round(hours / 40)} work weeks. Treat it like a decision, not just a checkout.`,
      (hours) =>
        `You are weighing roughly ${Math.round(hours / 40)} weeks of effort. Sleep on it and check the numbers again.`,
      (hours) =>
        `That is around ${Math.round(hours / 40)} weeks of earned time. Be honest about how often you will really use it.`,
    ],
  },
  {
    maxHours: Number.POSITIVE_INFINITY,
    messages: [
      "That's months of work. Consider whether this purchase truly aligns with your values, stability, and long-term goals.",
      "This is a major amount of work. Put it next to rent, savings, health, family, and the boring things that keep life steady.",
      "At this scale, the question is not only whether you can pay for it. It is whether you want to work this long for it.",
      "This is big enough to wait, compare options, and talk it through before deciding.",
    ],
  },
];

export const getResultMessage = (hours: number) => {
  const range = resultMessageRanges.find(({ maxHours }) => hours < maxHours);
  const message = getRandomItem(range?.messages ?? resultMessageRanges[0].messages);

  return resolveMessage(message, hours);
};
