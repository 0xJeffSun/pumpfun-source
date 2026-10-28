// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(267146);
  var t = e.i(540805),
    i = e.i(890088),
    r = e.i(271517),
    a = e.i(714283);
  let n = [2, 3, 4],
    l = ({ value: e, decimals: t }) => {
      let i = 10 ** t;
      return Math.round(e * i) / i;
    };
  e.s([
    "P",
    0,
    ({ pct: e, locale: t }) => {
      let r = Number.isFinite(e) ? e : 0,
        n = (0, i.R)(t, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(r);
      return (0, a.f)(`${n}%`);
    },
    "g",
    0,
    ({ pct: e, locale: t }) => {
      let r = Number.isFinite(e) ? e : 0,
        o = l({ value: r, decimals: 5 }),
        s = n.find((e) => l({ value: r, decimals: e }) === o) ?? 5,
        c = (0, i.R)(t, {
          minimumFractionDigits: Math.max(2, s),
          maximumFractionDigits: Math.max(2, s),
        }).format(r);
      return (0, a.f)(`${c}%`);
    },
    "d",
    0,
    ({ nextFundingAt: e, nowMs: t }) => {
      if (null === e || !(t > 0)) return "—";
      let i = Math.max(0, Math.floor((e - t) / 1e3)),
        r = Math.floor(i / 3600),
        a = Math.floor((i % 3600) / 60),
        n = `${String(a).padStart(2, "0")}:${String(i % 60).padStart(2, "0")}`;
      return r > 0 ? `${r}:${n}` : n;
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
    ({ px: e, szDecimals: t, locale: n }) => {
      let l = "number" == typeof e ? e : Number(e);
      if (!Number.isFinite(l) || l <= 0) return (0, a.f)("—");
      let o = (0, r.V)(t ?? 0),
        s =
          "number" == typeof e && void 0 !== t && l > 0
            ? (0, r.W)({ px: l, szDecimals: t })
            : l,
        c = Math.min(
          o,
          ((e) => {
            if (e.includes("e")) return null;
            let t = e.indexOf(".");
            return -1 === t ? 0 : e.length - t - 1;
          })("string" == typeof e ? e.trim() : String(s)) ?? o,
        ),
        d = (0, i.R)(n, {
          minimumFractionDigits: c,
          maximumFractionDigits: c,
        }).format(s);
      return (0, a.f)(`$${d}`);
    },
  ]);
};
