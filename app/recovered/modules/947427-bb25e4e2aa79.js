// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(148269);
  let r = (e) => {
    switch (e) {
      case t.E.FEATURED:
        return "movers";
      case t.E.TRENDING:
        return "trending";
      default:
        return;
    }
  };
  e.s(
    [
      "H",
      0,
      ({ sort: e, chain: t }) => ("trending" === r(e) ? "all" : t),
      "r",
      0,
      r,
      "n",
      0,
      (e) => void 0 !== r(e),
      "p",
      0,
      (e) =>
        e === t.E.TRENDING
          ? "web.home.trending_rail_label"
          : "web.home.movers_rail_label",
    ],
    947427,
  );
  let a = ["", "", "", "hidden @[820px]:flex", "hidden @[1000px]:flex"];
  e.s(
    [
      "i",
      0,
      "block size-16 overflow-hidden rounded-xl border border-border-secondary bg-bg-primary",
      "L",
      0,
      64,
      "C",
      0,
      "flex h-[92px] items-center",
      "V",
      0,
      2,
      "Y",
      0,
      "group relative flex flex-col gap-2 rounded-xl border border-border-secondary bg-bg-secondary/40 p-3 transition-colors hover:border-border-primary",
      "k",
      0,
      "flex shrink-0 flex-col items-end gap-0.5 text-right",
      "T",
      0,
      "flex h-16 items-center gap-3",
      "z",
      0,
      "absolute right-0 top-1/2 z-[2] -translate-y-1/2 opacity-0 pointer-events-none transition-opacity group-hover:opacity-100 group-hover:pointer-events-auto focus-within:opacity-100 focus-within:pointer-events-auto data-[active=true]:opacity-100 data-[active=true]:pointer-events-auto [@media(hover:none)]:static [@media(hover:none)]:translate-y-0 [@media(hover:none)]:shrink-0 [@media(hover:none)]:opacity-100 [@media(hover:none)]:pointer-events-auto",
      "a",
      0,
      "flex h-7 items-center justify-between gap-2",
      "O",
      0,
      "h-[92px] w-full",
      "S",
      0,
      { width: 200, height: 92 },
      "o",
      0,
      "h-[92px] w-full",
      "K",
      0,
      "min-w-0 truncate text-[11px] leading-3 tabular-nums text-text-tertiary",
      "I",
      0,
      "group-hover:invisible group-has-[[data-quick-buy-seat]:focus-within]:invisible group-data-[quick-buy-active=true]:invisible [@media(hover:none)]:group-hover:visible [@media(hover:none)]:group-has-[[data-quick-buy-seat]:focus-within]:visible [@media(hover:none)]:group-data-[quick-buy-active=true]:visible",
      "Q",
      0,
      "mb-3 hidden @[610px]:block",
      "U",
      0,
      "@container w-full min-w-0",
      "E",
      0,
      "truncate text-xs font-semibold uppercase tracking-wide text-text-tertiary",
      "n",
      0,
      "mb-2 flex h-6 items-center",
      "D",
      0,
      "grid grid-cols-3 gap-3 @[820px]:grid-cols-4 @[1000px]:grid-cols-5",
      "W",
      0,
      (e) => a[e] ?? "hidden",
    ],
    219266,
  );
};
