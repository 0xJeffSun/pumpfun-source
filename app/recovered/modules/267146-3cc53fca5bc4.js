// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(540805);
  let n = new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 0,
    }),
    r = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }),
    i = new Map(),
    o = (e) => {
      if (!Number.isFinite(e)) return "—";
      let i = Math.abs(e),
        o = i >= 999.5 ? n.format(i).toUpperCase() : r.format(i);
      return /[1-9]/.test(o) && e < 0 ? `${t.j}$${o}` : `$${o}`;
    };
  e.s([
    "k",
    0,
    3,
    "O",
    0,
    o,
    "p",
    0,
    (e, t = 1) => {
      if (!Number.isFinite(e)) return "—";
      let n = i.get(t);
      return (
        void 0 === n &&
          ((n = new Intl.NumberFormat("en-US", { maximumFractionDigits: t })),
          i.set(t, n)),
        `${n.format(e)}%`
      );
    },
    "v",
    0,
    (e, n = {}) => {
      if (!Number.isFinite(e)) return "—";
      let r = n.whole ? o(e) : (0, t.l)(e);
      return e > 0 && /[1-9]/.test(r) ? `+${r}` : r;
    },
    "H",
    0,
    (e) => (0, t.w)(Math.round(e)).replace(/\.00$/, ""),
  ]);
};
