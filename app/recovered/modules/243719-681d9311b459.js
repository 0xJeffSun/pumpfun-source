// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(267146);
  var t = e.i(540805),
    r = e.i(890088),
    i = e.i(271517),
    a = e.i(714283);
  let s = [2, 3, 4],
    n = ({ value: e, decimals: t }) => {
      let r = 10 ** t;
      return Math.round(e * r) / r;
    };
  e.s([
    "P",
    0,
    ({ pct: e, locale: t }) => {
      let i = Number.isFinite(e) ? e : 0,
        s = (0, r.R)(t, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(i);
      return (0, a.f)(`${s}%`);
    },
    "g",
    0,
    ({ pct: e, locale: t }) => {
      let i = Number.isFinite(e) ? e : 0,
        l = n({ value: i, decimals: 5 }),
        o = s.find((e) => n({ value: i, decimals: e }) === l) ?? 5,
        c = (0, r.R)(t, {
          minimumFractionDigits: Math.max(2, o),
          maximumFractionDigits: Math.max(2, o),
        }).format(i);
      return (0, a.f)(`${c}%`);
    },
    "d",
    0,
    ({ nextFundingAt: e, nowMs: t }) => {
      if (null === e || !(t > 0)) return "—";
      let r = Math.max(0, Math.floor((e - t) / 1e3)),
        i = Math.floor(r / 3600),
        a = Math.floor((r % 3600) / 60),
        s = `${String(a).padStart(2, "0")}:${String(r % 60).padStart(2, "0")}`;
      return i > 0 ? `${i}:${s}` : s;
    },
    "l",
    0,
    (e) => {
      let r = (({ liquidationPx: e, markPx: t }) => {
        if (null == e || null == t) return null;
        let r = Number(e),
          i = Number(t);
        return Number.isFinite(r) && i > 0 ? ((r - i) / i) * 100 : null;
      })(e);
      return null === r ? "—" : (0, t.c)(r, { fractionDigits: 2 });
    },
    "Q",
    0,
    ({ px: e, szDecimals: t, locale: s }) => {
      let n = "number" == typeof e ? e : Number(e);
      if (!Number.isFinite(n) || n <= 0) return (0, a.f)("—");
      let l = (0, i.V)(t ?? 0),
        o =
          "number" == typeof e && void 0 !== t && n > 0
            ? (0, i.W)({ px: n, szDecimals: t })
            : n,
        c = Math.min(
          l,
          ((e) => {
            if (e.includes("e")) return null;
            let t = e.indexOf(".");
            return -1 === t ? 0 : e.length - t - 1;
          })("string" == typeof e ? e.trim() : String(o)) ?? l,
        ),
        d = (0, r.R)(s, {
          minimumFractionDigits: c,
          maximumFractionDigits: c,
        }).format(o);
      return (0, a.f)(`$${d}`);
    },
  ]);
};
