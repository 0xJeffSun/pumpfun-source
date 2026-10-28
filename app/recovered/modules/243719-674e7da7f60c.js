// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(267146);
  var t = e.i(540805),
    i = e.i(890088),
    r = e.i(271517),
    l = e.i(714283);
  let a = [2, 3, 4],
    n = ({ value: e, decimals: t }) => {
      let i = 10 ** t;
      return Math.round(e * i) / i;
    };
  e.s([
    "P",
    0,
    ({ pct: e, locale: t }) => {
      let r = Number.isFinite(e) ? e : 0,
        a = (0, i.R)(t, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(r);
      return (0, l.f)(`${a}%`);
    },
    "g",
    0,
    ({ pct: e, locale: t }) => {
      let r = Number.isFinite(e) ? e : 0,
        s = n({ value: r, decimals: 5 }),
        o = a.find((e) => n({ value: r, decimals: e }) === s) ?? 5,
        d = (0, i.R)(t, {
          minimumFractionDigits: Math.max(2, o),
          maximumFractionDigits: Math.max(2, o),
        }).format(r);
      return (0, l.f)(`${d}%`);
    },
    "d",
    0,
    ({ nextFundingAt: e, nowMs: t }) => {
      if (null === e || !(t > 0)) return "—";
      let i = Math.max(0, Math.floor((e - t) / 1e3)),
        r = Math.floor(i / 3600),
        l = Math.floor((i % 3600) / 60),
        a = `${String(l).padStart(2, "0")}:${String(i % 60).padStart(2, "0")}`;
      return r > 0 ? `${r}:${a}` : a;
    },
    "l",
    0,
    (e) => {
      let i = (({ liquidationPx: e, markPx: t }) => {
        if (null == e || null == t) return null;
        let i = Number(e),
          r = Number(t);
        return Number.isFinite(i) && r > 0 ? ((i - r) / r) * 100 : null;
      })(e);
      return null === i ? "—" : (0, t.c)(i, { fractionDigits: 2 });
    },
    "Q",
    0,
    ({ px: e, szDecimals: t, locale: a }) => {
      let n = "number" == typeof e ? e : Number(e);
      if (!Number.isFinite(n) || n <= 0) return (0, l.f)("—");
      let s = (0, r.V)(t ?? 0),
        o =
          "number" == typeof e && void 0 !== t && n > 0
            ? (0, r.W)({ px: n, szDecimals: t })
            : n,
        d = Math.min(
          s,
          ((e) => {
            if (e.includes("e")) return null;
            let t = e.indexOf(".");
            return -1 === t ? 0 : e.length - t - 1;
          })("string" == typeof e ? e.trim() : String(o)) ?? s,
        ),
        c = (0, i.R)(a, {
          minimumFractionDigits: d,
          maximumFractionDigits: d,
        }).format(o);
      return (0, l.f)(`$${c}`);
    },
  ]);
};
