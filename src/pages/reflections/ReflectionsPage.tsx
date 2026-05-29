type Quote = {
  text: string;
  author: string;
  source?: string;
};

type RecommendedRead = {
  title: string;
  author: string;
  href?: string;
};

const quotes: Quote[] = [
  {
    text: "Too many people spend money they have not earned, to buy things they do not want, to impress people they do not like.",
    author: "Will Rogers",
  },
  {
    text: "The things you own end up owning you.",
    author: "Chuck Palahniuk",
    source: "Fight Club",
  },
  {
    text: "Wealth is the ability to fully experience life.",
    author: "Henry David Thoreau",
  },
  {
    text: "Money often costs too much.",
    author: "Ralph Waldo Emerson",
  },
  {
    text: "It is not the man who has too little, but the man who craves more, that is poor.",
    author: "Seneca",
  },
  {
    text: "Money is a terrible master but an excellent servant.",
    author: "P.T. Barnum",
  },
  {
    text: "It is the time you have wasted for your rose that makes your rose so important.",
    author: "Antoine de Saint-Exupery",
    source: "The Little Prince",
  },
  {
    text: "The price of anything is the amount of life you exchange for it.",
    author: "Henry David Thoreau",
  },
  {
    text: "He who buys what he does not need steals from himself.",
    author: "Swedish proverb",
  },
  {
    text: "The greatest wealth is to live content with little.",
    author: "Plato",
  },
  {
    text: "Beware the barrenness of a busy life.",
    author: "Socrates",
  },
];

const recommendedReads: RecommendedRead[] = [
  {
    title: "On the Shortness of Life",
    author: "Seneca",
  },
  {
    title: "The Myth of Sisyphus",
    author: "Albert Camus",
  },
  {
    title: "Meditations",
    author: "Marcus Aurelius",
  },
  {
    title: "The Burnout Society",
    author: "Byung-Chul Han",
  },
  {
    title: "The Scent of Time",
    author: "Byung-Chul Han",
  },
  {
    title: "Time Is More Valuable Than Money",
    author: "Jim Rohn",
    href: "https://www.jimrohn.com/wisdom/articles/time-vs-money",
  },
];

const ReflectionsPage = () => {
  return (
    <main className="min-h-[calc(100vh-var(--navbar-height)-var(--footer-height))] flex-1 bg-paper px-[6vw] py-14 sm:py-16 lg:py-20">
      <section className="mx-auto max-w-6xl border-t border-mist pt-8">
        <h1 className="mb-4 text-sm uppercase tracking-[0.14em] text-earth">
          Reflections
        </h1>

        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
          {quotes.map((quote) => (
            <figure
              key={`${quote.author}-${quote.text}`}
              className="border-t border-mist pt-7"
            >
              <blockquote>
                <p className="font-serif text-[clamp(18px,1.25vw,22px)] italic leading-snug text-ink">
                  "{quote.text}"
                </p>
              </blockquote>
              <figcaption className="mt-5 text-sm uppercase tracking-[0.14em] text-earth">
                {quote.author}
                {quote.source && (
                  <span className="block pt-1 normal-case tracking-normal text-clay">
                    {quote.source}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>

        <section className="mt-16 border-t border-mist pt-8">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-full">
              <h2 className="mb-4 text-sm uppercase tracking-[0.14em] text-earth">
                Recommended reads
              </h2>
            </div>

            {recommendedReads.map((read) => {
              const content = (
                <>
                  <span className="block font-serif text-3xl italic leading-tight text-ink">
                    {read.title}
                  </span>
                  <span className="mt-2 block text-sm uppercase tracking-[0.14em] text-earth">
                    {read.author}
                  </span>
                </>
              );

              return read.href ? (
                <a
                  key={`${read.author}-${read.title}`}
                  href={read.href}
                  target="_blank"
                  rel="noreferrer"
                  className="border-t border-mist pt-4 underline underline-offset-4 transition-colors hover:border-rust"
                >
                  {content}
                </a>
              ) : (
                <article
                  key={`${read.author}-${read.title}`}
                  className="border-t border-mist pt-4"
                >
                  {content}
                </article>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
};

export default ReflectionsPage;
