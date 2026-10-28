// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(267146);
  var t = e.i(540805),
    l = e.i(890088),
    i = e.i(271517),
    r = e.i(714283);
  let a = [2, 3, 4],
    s = ({ value: e, decimals: t }) => {
      let l = 10 ** t;
      return Math.round(e * l) / l;
    };
  e.s([
    "P",
    0,
    ({ pct: e, locale: t }) => {
      let i = Number.isFinite(e) ? e : 0,
        a = (0, l.R)(t, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(i);
      return (0, r.f)(`${a}%`);
    },
    "g",
    0,
    ({ pct: e, locale: t }) => {
      let i = Number.isFinite(e) ? e : 0,
        n = s({ value: i, decimals: 5 }),
        o = a.find((e) => s({ value: i, decimals: e }) === n) ?? 5,
        d = (0, l.R)(t, {
          minimumFractionDigits: Math.max(2, o),
          maximumFractionDigits: Math.max(2, o),
        }).format(i);
      return (0, r.f)(`${d}%`);
    },
    "d",
    0,
    ({ nextFundingAt: e, nowMs: t }) => {
      if (null === e || !(t > 0)) return "—";
      let l = Math.max(0, Math.floor((e - t) / 1e3)),
        i = Math.floor(l / 3600),
        r = Math.floor((l % 3600) / 60),
        a = `${String(r).padStart(2, "0")}:${String(l % 60).padStart(2, "0")}`;
      return i > 0 ? `${i}:${a}` : a;
    },
    "l",
    0,
    (e) => {
      let l = (({ liquidationPx: e, markPx: t }) => {
        if (null == e || null == t) return null;
        let l = Number(e),
          i = Number(t);
        return Number.isFinite(l) && i > 0 ? ((l - i) / i) * 100 : null;
      })(e);
      return null === l ? "—" : (0, t.c)(l, { fractionDigits: 2 });
    },
    "Q",
    0,
    ({ px: e, szDecimals: t, locale: a }) => {
      let s = "number" == typeof e ? e : Number(e);
      if (!Number.isFinite(s) || s <= 0) return (0, r.f)("—");
      let n = (0, i.V)(t ?? 0),
        o =
          "number" == typeof e && void 0 !== t && s > 0
            ? (0, i.W)({ px: s, szDecimals: t })
            : s,
        d = Math.min(
          n,
          ((e) => {
            if (e.includes("e")) return null;
            let t = e.indexOf(".");
            return -1 === t ? 0 : e.length - t - 1;
          })("string" == typeof e ? e.trim() : String(o)) ?? n,
        ),
        m = (0, l.R)(a, {
          minimumFractionDigits: d,
          maximumFractionDigits: d,
        }).format(o);
      return (0, r.f)(`$${m}`);
    },
  ]);
};
