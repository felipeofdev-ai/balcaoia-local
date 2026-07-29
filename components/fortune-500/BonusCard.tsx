type Props = {
  icon: string;
  title: string;
  description: string;
  value: number;
  primaryColor: string;
};

export function BonusCard({ icon, title, description, value, primaryColor }: Props) {
  return (
    <div
      className="flex gap-5 rounded-2xl border-2 p-5 md:p-6"
      style={{ borderColor: `${primaryColor}18`, background: `${primaryColor}06` }}
    >
      <span className="text-3xl" aria-hidden>
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-bold text-[#0a0a0a]">{title}</h3>
          <div className="shrink-0 text-right">
            <p className="text-[10px] tracking-wider text-[#9ca3af] uppercase">Ref.</p>
            <p className="text-lg font-extrabold" style={{ color: primaryColor }}>
              R$ {value}
            </p>
          </div>
        </div>
        <p className="mt-2 text-sm font-light leading-relaxed text-[#6b7280]">{description}</p>
      </div>
    </div>
  );
}
