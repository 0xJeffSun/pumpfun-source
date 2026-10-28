type RewardCard = {
  label: string;
  amount: string;
  denomination: string;
  icon: string;
};

const cards: RewardCard[] = [
  { label: "Total Earned", amount: "12,450.82", denomination: "SOL", icon: "💰" },
  { label: "Claimed", amount: "8,230.50", denomination: "SOL", icon: "✅" },
  { label: "Unclaimed", amount: "4,220.32", denomination: "SOL", icon: "⏳" },
];

/** Three summary cards for reward totals. */
export function RewardSummary() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-border-secondary bg-bg-secondary p-4"
        >
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="text-lg">
              {card.icon}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
              {card.label}
            </span>
          </div>
          <p className="mt-2 text-xl font-bold tracking-tight text-text-primary">
            {card.amount}
          </p>
          <p className="text-xs text-text-tertiary">{card.denomination}</p>
          <p className="mt-2 text-[10px] text-text-muted">
            Reconstruction data
          </p>
        </div>
      ))}
    </div>
  );
}
