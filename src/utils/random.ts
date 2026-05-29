export const getRandomItem = <T,>(items: T[]) =>
  items[Math.floor(Math.random() * items.length)];

export const getRandomItems = <T,>(items: T[], count: number) => {
  const shuffledItems = [...items];

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledItems[index], shuffledItems[randomIndex]] = [
      shuffledItems[randomIndex],
      shuffledItems[index],
    ];
  }

  return shuffledItems.slice(0, count);
};
