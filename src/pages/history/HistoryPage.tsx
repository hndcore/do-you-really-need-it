import { Trans, useTranslation } from "react-i18next";

const HistoryPage = () => {
  const { t } = useTranslation();

  return (
    <main className="min-h-[calc(100vh-var(--navbar-height)-var(--footer-height))] flex-1 bg-paper px-[6vw] py-14 sm:py-16 lg:py-20">
      <section className="mx-auto max-w-5xl border-t border-mist pt-8">
        <article className="max-w-4xl">
          <p className="mb-4 text-xs uppercase tracking-[0.14em] text-earth">
            {t("history.eyebrow")}
          </p>
          <h1 className="font-serif text-[clamp(44px,6vw,86px)] leading-none text-ink">
            {t("history.title")}
          </h1>

          <figure className="mt-6 mb-6 w-32 sm:w-40 md:float-right md:ml-8 md:mt-2 md:mb-5 lg:w-44">
            <img
              src="/me.webp"
              alt={t("history.imageAlt")}
              className="aspect-square w-full rounded-full border border-mist object-cover grayscale"
            />
            <figcaption className="mt-3 text-center text-xs uppercase tracking-[0.14em] text-earth">
              {t("history.caption")}
            </figcaption>
          </figure>

          <div className="mt-8 space-y-12">
            <section>
              <h2 className="font-serif text-[clamp(34px,4vw,52px)] italic leading-none text-ink">
                {t("history.originTitle")}
              </h2>
              <div className="mt-5 space-y-5 text-lg font-light leading-[1.75] text-clay">
                <p>
                  <Trans
                    i18nKey="history.originP1"
                    components={{ strong: <strong className="font-semibold text-ink" /> }}
                  />
                </p>
                <p>
                  <Trans
                    i18nKey="history.originP2"
                    components={{ strong: <strong className="font-semibold text-ink" /> }}
                  />
                </p>
                <p>
                  {t("history.originP3")}
                </p>
              </div>
            </section>

            <section className="border-t border-mist pt-8">
              <h2 className="font-serif text-[clamp(34px,4vw,52px)] italic leading-none text-ink">
                {t("history.projectTitle")}
              </h2>
              <div className="mt-5 space-y-5 text-lg font-light leading-[1.75] text-clay">
                <p>
                  <Trans
                    i18nKey="history.projectP1"
                    components={{ strong: <strong className="font-semibold text-ink" /> }}
                  />
                </p>
                <p>
                  {t("history.projectP2")}
                </p>
                <p>
                  <Trans
                    i18nKey="history.projectP3"
                    components={{ strong: <strong className="font-semibold text-ink" /> }}
                  />
                </p>
                <p>
                  {t("history.projectP4")}
                </p>
                <p>{t("history.projectP5")}</p>
              </div>
            </section>
          </div>
        </article>
      </section>
    </main>
  );
};

export default HistoryPage;
