type Feature = { icon: string; title: string; desc: string };

type Props = {
  title: string;
  description: string;
  features: Feature[];
  primaryColor: string;
};

export function SolutionSection({ title, description, features, primaryColor }: Props) {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-5">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0a0a0a] md:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-light leading-relaxed text-[#6b7280]">
            {description}
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-3xl border border-[#f0f0f0] bg-white p-7 transition-shadow hover:shadow-md"
            >
              <div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-xl"
                style={{ background: `${primaryColor}12` }}
                aria-hidden
              >
                {f.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold text-[#0a0a0a]">{f.title}</h3>
              <p className="text-sm font-light leading-relaxed text-[#6b7280]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
