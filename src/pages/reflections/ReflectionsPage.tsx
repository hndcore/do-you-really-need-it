import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

type Quote = {
  text: string;
  author: string;
  source?: string;
};

type RecommendedRead = {
  title: string;
  author: string;
};

const recommendedReadLinks: Record<number, string> = {
  5: "https://www.jimrohn.com/wisdom/articles/time-vs-money",
};

const hasTranslatedText = (items: Array<Record<string, string | undefined>>) =>
  items.some((item) => Object.values(item).some(Boolean));

const ReflectionsPage = () => {
  const { t } = useTranslation();
  const translatedQuotes = t("reflections.quotes", { returnObjects: true }) as Quote[];
  const translatedRecommendedReads = t("reflections.recommended", {
    returnObjects: true,
  }) as RecommendedRead[];
  const quotes = hasTranslatedText(translatedQuotes)
    ? translatedQuotes
    : (i18n.getFixedT("en")("reflections.quotes", { returnObjects: true }) as Quote[]);
  const recommendedReads = hasTranslatedText(translatedRecommendedReads)
    ? translatedRecommendedReads
    : (i18n.getFixedT("en")("reflections.recommended", {
        returnObjects: true,
      }) as RecommendedRead[]);

  return (
    <main className="min-h-[calc(100vh-var(--navbar-height)-var(--footer-height))] flex-1 bg-paper px-[6vw] py-14 sm:py-16 lg:py-20">
      <section className="mx-auto max-w-6xl border-t border-mist pt-8">
        <h1 className="mb-4 text-sm uppercase tracking-[0.14em] text-earth">
          {t("reflections.title")}
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
                {t("reflections.recommendedReads")}
              </h2>
            </div>

            {recommendedReads.map((read, index) => {
              const href = recommendedReadLinks[index];
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

              return href ? (
                <a
                  key={`${read.author}-${read.title}`}
                  href={href}
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
