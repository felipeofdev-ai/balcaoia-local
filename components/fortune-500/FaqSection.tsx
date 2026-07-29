type Faq = { q: string; a: string };

type Props = { faqs: Faq[]; primaryColor: string };

export function FaqSection({ faqs, primaryColor }: Props) {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <h2 className="mb-10 text-center text-3xl font-extrabold tracking-tight text-[#0a0a0a]">
          Perguntas frequentes
        </h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group overflow-hidden rounded-2xl border border-[#eee] open:border-[#ddd]"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 font-bold text-[#0a0a0a]">
                <span className="leading-snug">{faq.q}</span>
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm transition-transform group-open:rotate-45"
                  style={{ background: `${primaryColor}12`, color: primaryColor }}
                >
                  +
                </span>
              </summary>
              <div className="px-5 pb-5">
                <p className="text-sm font-light leading-relaxed text-[#6b7280]">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
