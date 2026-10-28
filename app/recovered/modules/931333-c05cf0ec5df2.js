// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(267146);
  var t = e.i(540805),
    i = e.i(890088),
    n = e.i(714283),
    r = e.i(90832);
  let s = (e) => {
      let t = Number(e);
      return Number.isFinite(t) ? t : 0;
    },
    o = (e) => (0, t.w)(s(e)),
    a = (e) => (0, r.m)(s(e), 4),
    l = { lt: "<", eq: "", gt: ">" };
  e.s([
    "_",
    0,
    (e) => (0, t.l)(s(e)),
    "B",
    0,
    ({ outAmount: e, denominationOut: t }) =>
      "sol" === t
        ? { amount: `≈ ${a(e)}`, symbol: "SOL" }
        : { amount: o(e).replace(/^\$/, ""), symbol: "USDC" },
    "r",
    0,
    ({ impactBps: e, bookDepthExceeded: t, locale: r }) => {
      let { pct: s, bound: o } = (({
          impactBps: e,
          bookDepthExceeded: t = !1,
        }) => {
          let i = Math.max(0, Number.isFinite(e) ? e : 0) / 100;
          return t
            ? { pct: Math.max(i, 0.01), bound: "gt" }
            : i < 0.01
              ? { pct: 0.01, bound: "lt" }
              : { pct: i, bound: "eq" };
        })({ impactBps: e, bookDepthExceeded: t }),
        a = (0, i.R)(r, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(s);
      return (0, n.f)(`${l[o]}${a}%`);
    },
    "$",
    0,
    ({ size: e, locale: t }) =>
      (0, n.f)(
        (0, i.R)(t, { maximumFractionDigits: 6, useGrouping: !1 }).format(s(e)),
      ),
    "s",
    0,
    a,
    "O",
    0,
    o,
    "t",
    0,
    ({ value: e, locale: t }) =>
      (0, n.f)(
        (0, i.R)(t, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(s(e)),
      ),
    "U",
    0,
    ({ impactBps: e, bookDepthExceeded: t = !1 }) => t || e > 100,
    "L",
    0,
    s,
  ]);
};
