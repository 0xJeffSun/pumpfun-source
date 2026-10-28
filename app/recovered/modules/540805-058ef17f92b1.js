// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    n = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }),
    r = new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
      maximumSignificantDigits: 3,
    }),
    i = (e) => "number" == typeof e && Number.isFinite(e),
    o = (e, t, n) =>
      /[1-9]/.test(t) ? (e < 0 ? `−${t}` : n && e > 0 ? `+${t}` : t) : t,
    s = 0.005,
    l = { gain: "text-gain", loss: "text-loss", neutral: "text-text-tertiary" };
  e.s([
    "j",
    0,
    "−",
    "v",
    0,
    l,
    "l",
    0,
    function (e) {
      if (!i(e)) return "—";
      let s = Math.abs(e),
        l =
          s >= 999.5
            ? r.format(s).toUpperCase()
            : s >= 1
              ? n.format(s)
              : t.format(s);
      return o(e, `$${l}`, !1);
    },
    "O",
    0,
    function (e) {
      if (!i(e)) return "—";
      let t = Math.abs(e);
      return t >= 1e4 ? r.format(t).toUpperCase() : n.format(t);
    },
    "c",
    0,
    function (e, t = {}) {
      if (!i(e)) return "—";
      let { fractionDigits: r = 1 } = t,
        s = Math.abs(e),
        l = s >= 1e3 ? n.format(Math.round(s)) : s.toFixed(r);
      return o(e, `${l}%`, !0);
    },
    "u",
    0,
    function (e, t = {}) {
      if (!i(e)) return "—";
      let { fractionDigits: n = 2 } = t,
        r = Math.abs(e).toLocaleString("en-US", {
          minimumFractionDigits: n,
          maximumFractionDigits: n,
        });
      return o(e, `$${r}`, !0);
    },
    "w",
    0,
    function (e) {
      if (!i(e)) return "—";
      let n = t.format(Math.abs(e));
      return o(e, `$${n}`, !1);
    },
    "k",
    0,
    (e, t = s) =>
      l[
        ((e, t = s) =>
          null == e || !Number.isFinite(e) || Math.abs(e) <= t
            ? "neutral"
            : e > 0
              ? "gain"
              : "loss")(e, t)
      ],
  ]);
};
