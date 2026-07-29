type Props = {
  number: string;
  title: string;
  items: string[];
  primaryColor: string;
};

export function ModuleCard({ number, title, items, primaryColor }: Props) {
  return (
    <div className="rounded-3xl border border-white/[0.07] bg-white/[0.03] p-7 md:p-8">
      <div className="flex gap-5 md:gap-7">
        <span
          className="text-4xl font-extrabold leading-none md:text-5xl"
          style={{ color: `${primaryColor}55` }}
        >
          {number}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="mb-4 text-lg font-bold text-white md:text-xl">{title}</h3>
          <ul className="space-y-2.5">
            {items.map((item) => (
              <li key={item} className="flex gap-3 text-sm font-light leading-relaxed text-white/65">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: primaryColor }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
