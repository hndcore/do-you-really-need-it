const HistoryPage = () => {
  return (
    <main className="min-h-[calc(100vh-var(--navbar-height)-var(--footer-height))] flex-1 bg-paper px-[6vw] py-14 sm:py-16 lg:py-20">
      <section className="mx-auto max-w-5xl border-t border-mist pt-8">
        <article className="max-w-4xl">
          <p className="mb-4 text-xs uppercase tracking-[0.14em] text-earth">
            Why was this tool born?
          </p>
          <h1 className="font-serif text-[clamp(44px,6vw,86px)] leading-none text-ink">
            A more conscious way to spend.
          </h1>

          <figure className="mt-6 mb-6 w-32 sm:w-40 md:float-right md:ml-8 md:mt-2 md:mb-5 lg:w-44">
            <img
              src="/me.webp"
              alt="Portrait of the creator"
              className="aspect-square w-full rounded-full border border-mist object-cover grayscale"
            />
            <figcaption className="mt-3 text-center text-xs uppercase tracking-[0.14em] text-earth">
              Personal note
            </figcaption>
          </figure>

          <div className="mt-8 space-y-12">
            <section>
              <h2 className="font-serif text-[clamp(34px,4vw,52px)] italic leading-none text-ink">
                Why was this tool born?
              </h2>
              <div className="mt-5 space-y-5 text-lg font-light leading-[1.75] text-clay">
                <p>
                  We live in a hyper-connected society centered on
                  productivity, where money seems to be the only resource that
                  matters when building a life project. However, in that race
                  for material things, we often leave behind the most precious
                  asset we have: <strong className="font-semibold text-ink">time</strong>.
                </p>
                <p>
                  The money we earn at work is nothing more than{" "}
                  <strong className="font-semibold text-ink">
                    time from our lives that we have traded
                  </strong>
                  . Time is a finite, unrecoverable resource and the true
                  engine of everything.
                </p>
                <p>
                  This is not about not spending what we earn, but about doing
                  so responsibly. It is about being aware that, beyond
                  possessions, the true luxury is the time we gain to enjoy our
                  loved ones, a hobby, playing sports, resting, or simply taking
                  care of our health and finding peace.
                </p>
              </div>
            </section>

            <section className="border-t border-mist pt-8">
              <h2 className="font-serif text-[clamp(34px,4vw,52px)] italic leading-none text-ink">
                A personal project
              </h2>
              <div className="mt-5 space-y-5 text-lg font-light leading-[1.75] text-clay">
                <p>
                  The goal of this tool is not to lecture anyone. I am
                  certainly not the best person in the world at managing
                  finances; in fact,{" "}
                  <strong className="font-semibold text-ink">
                    that is exactly why I built this calculator
                  </strong>
                  : to learn how to value every single economic decision I
                  make.
                </p>
                <p>
                  I love my job, and programming is also my passion. Because of
                  this, I could not think of a better way to tackle this need
                  than by combining my technical knowledge with this personal
                  learning process.
                </p>
                <p>
                  In this 2026, I have decided to start a voluntary digital
                  detox from the information overload that surrounds us. I have
                  started eating healthier, working out, and leading a better
                  lifestyle. The reason?{" "}
                  <strong className="font-semibold text-ink">
                    I want to be more conscious of my lifetime and enjoy it the
                    way I truly want to.
                  </strong>
                </p>
                <p>
                  If you have read this far, thank you so much for giving me a
                  few minutes of your most valuable resource.
                </p>
                <p>I truly hope this tool is useful to you.</p>
              </div>
            </section>
          </div>
        </article>
      </section>
    </main>
  );
};

export default HistoryPage;
