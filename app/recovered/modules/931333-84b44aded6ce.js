// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(267146);
  var t = e.i(540805),
    n = e.i(890088),
    r = e.i(714283),
    i = e.i(90832);
  let l = (e) => {
      let t = Number(e);
      return Number.isFinite(t) ? t : 0;
    },
    a = (e) => (0, t.w)(l(e)),
    s = (e) => (0, i.m)(l(e), 4),
    o = { lt: "<", eq: "", gt: ">" };
  e.s([
    "_",
    0,
    (e) => (0, t.l)(l(e)),
    "B",
    0,
    ({ outAmount: e, denominationOut: t }) =>
      "sol" === t
        ? { amount: `≈ ${s(e)}`, symbol: "SOL" }
        : { amount: a(e).replace(/^\$/, ""), symbol: "USDC" },
    "r",
    0,
    ({ impactBps: e, bookDepthExceeded: t, locale: i }) => {
      let { pct: l, bound: a } = (({
          impactBps: e,
          bookDepthExceeded: t = !1,
        }) => {
          let n = Math.max(0, Number.isFinite(e) ? e : 0) / 100;
          return t
            ? { pct: Math.max(n, 0.01), bound: "gt" }
            : n < 0.01
              ? { pct: 0.01, bound: "lt" }
              : { pct: n, bound: "eq" };
        })({ impactBps: e, bookDepthExceeded: t }),
        s = (0, n.R)(i, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(l);
      return (0, r.f)(`${o[a]}${s}%`);
    },
    "$",
    0,
    ({ size: e, locale: t }) =>
      (0, r.f)(
        (0, n.R)(t, { maximumFractionDigits: 6, useGrouping: !1 }).format(l(e)),
      ),
    "s",
    0,
    s,
    "O",
    0,
    a,
    "t",
    0,
    ({ value: e, locale: t }) =>
      (0, r.f)(
        (0, n.R)(t, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(l(e)),
      ),
    "U",
    0,
    ({ impactBps: e, bookDepthExceeded: t = !1 }) => t || e > 100,
    "L",
    0,
    l,
  ]);
};
