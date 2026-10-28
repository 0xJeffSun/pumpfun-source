// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = [25, 50, 100, 200],
    r = [-10, -25, -50, -75],
    a = (e) => Math.max(0, 6 - Math.max(0, Math.trunc(e))),
    i = ({ px: e, szDecimals: t }) => {
      if (!Number.isFinite(e) || e <= 0) return 0;
      let r = a(t),
        i = 10 ** r,
        s = Math.round(e * i) / i;
      if (Number.isInteger(s)) return s;
      let n = Math.min(
          r,
          Math.max(0, 5 - (Math.floor(Math.log10(Math.abs(s))) + 1)),
        ),
        o = 10 ** n;
      return Math.round(s * o) / o;
    },
    s = ({ px: e, szDecimals: t }) => {
      let r = i({ px: e, szDecimals: t });
      return r <= 0 ? "" : String(r);
    },
    n = (e) =>
      Number.isFinite(e) ? String(Math.round(100 * Math.abs(e)) / 100) : "",
    o = ({ px: e, markPx: t, side: r, leverage: a }) =>
      t > 0 && Number.isFinite(e) && a > 0
        ? ("long" === r ? e / t - 1 : 1 - e / t) * a * 100
        : 0,
    l = ({ kind: e, side: t, px: r, markPx: a }) =>
      Number.isFinite(r) && !(r <= 0) && a > 0
        ? (("tp" === e) == ("long" === t) ? r > a : r < a)
          ? null
          : "wrong_side"
        : "invalid",
    m = { unit: "px", text: "" },
    u = (e) => (void 0 !== e.entryPx && e.entryPx > 0 ? e.entryPx : e.markPx),
    c = { px: null, pct: null, pxText: "", pctText: "", error: null };
  e.s([
    "t",
    0,
    m,
    "f",
    0,
    100,
    "w",
    0,
    o,
    "V",
    0,
    a,
    "a",
    0,
    (e) => ({ unit: "pct", text: n(e) }),
    "U",
    0,
    ({ px: e, szDecimals: t }) =>
      void 0 !== e && e > 0
        ? { unit: "px", text: s({ px: e, szDecimals: t }) }
        : m,
    "C",
    0,
    ({ px: e, entryPx: t, sizeCoins: r, side: a }) =>
      Number.isFinite(e) && e > 0 && t > 0 && r > 0
        ? r * ("long" === a ? e - t : t - e)
        : null,
    "k",
    0,
    (e) => ("tp" === e ? t : r),
    "n",
    0,
    ({ kind: e, draft: t, ctx: r }) => {
      let m,
        d = ((e) => {
          if ("" === e.trim()) return null;
          let t = Number(e);
          return !Number.isFinite(t) || t <= 0 ? null : t;
        })(t.text);
      if (null === d)
        return {
          ...c,
          pxText: "px" === t.unit ? t.text : "",
          pctText: "pct" === t.unit ? t.text : "",
        };
      if ("px" === t.unit) {
        let a =
            null === r
              ? null
              : o({ px: d, markPx: u(r), side: r.side, leverage: r.leverage }),
          i =
            null === r
              ? null
              : l({ kind: e, side: r.side, px: d, markPx: r.markPx });
        return {
          px: d,
          pct: a,
          pxText: t.text,
          pctText: null === a ? "" : n(a),
          error:
            i ?? ("sl" === e && null !== a && a < -100 ? "max_loss" : null),
        };
      }
      let h = "sl" === e ? Math.min(d, 100) : d,
        p = (({ kind: e, magnitude: t }) =>
          ("tp" === e ? 1 : -1) * Math.abs(t))({ kind: e, magnitude: h });
      if (null === r) return { ...c, pct: p, pctText: t.text };
      let b =
          "tp" === e && "short" === r.side ? Math.min(p, 100 * r.leverage) : p,
        f = i({
          px: (({ pct: e, markPx: t, side: r, leverage: a }) => {
            if (!(t > 0) || !Number.isFinite(e) || !(a > 0)) return 0;
            let i = e / 100 / a;
            return "long" === r ? t * (1 + i) : t * (1 - i);
          })({ pct: b, markPx: u(r), side: r.side, leverage: r.leverage }),
          szDecimals: r.szDecimals,
        }),
        y = f <= 0 ? ((m = r.szDecimals), 1 / 10 ** a(m)) : f;
      return {
        px: y,
        pct: b,
        pxText: s({ px: y, szDecimals: r.szDecimals }),
        pctText: t.text,
        error: l({ kind: e, side: r.side, px: y, markPx: r.markPx }),
      };
    },
    "W",
    0,
    i,
  ]);
};
