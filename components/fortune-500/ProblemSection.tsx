type Props = {
  title: string;
  subtitle: string;
  items: string[];
  primaryColor: string;
};

export function ProblemSection({ title, subtitle, items, primaryColor }: Props) {
  return (
    <section className="bg-[#fafafa] py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-5">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0a0a0a] md:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base font-light text-[#6b7280]">{subtitle}</p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {items.map((item, i) => (
            <li
              key={item}
              className="flex gap-3 rounded-2xl border border-[#eee] bg-white p-5 text-sm leading-relaxed text-[#374151]"
            >
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{ background: `${primaryColor}14`, color: primaryColor }}
              >
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
