// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = (e) => Math.min(e, 50),
    r = {
      slippage: 10,
      priorityFee: 0.001,
      tipAmount: 0.001,
      frontRunningProtection: !0,
      holdToConfirm: !0,
    },
    i = (e) => `Preset ${e + 1}`,
    s = (e, t, r = 0) => {
      let i = Number(e);
      return Number.isFinite(i) ? Math.max(i, r) : t;
    },
    n = (e) => ("string" == typeof e ? e.slice(0, 24) : ""),
    o = ({ preset: e, index: t }) => e?.name.trim() || i(t),
    a = (e) => {
      let r = e ?? {};
      return {
        slippage: t(s(r.slippage, 10)),
        priorityFee: s(r.priorityFee, 0.001),
        tipAmount: s(r.tipAmount, 0.001),
        frontRunningProtection:
          "boolean" != typeof r.frontRunningProtection ||
          r.frontRunningProtection,
        holdToConfirm: "boolean" != typeof r.holdToConfirm || r.holdToConfirm,
      };
    },
    l = (e, t) => {
      let r = e ?? {};
      return { name: "string" == typeof r.name ? n(r.name) : i(t), ...a(r) };
    },
    c = (e, t) => Number.isInteger(t) && t >= 0 && t < e.presets.length,
    d = (e, t) => {
      let r = Number(e);
      return !Number.isInteger(r) || r < 0 || r >= t ? 0 : r;
    };
  e.s([
    "A",
    0,
    0.001,
    "V",
    0,
    10,
    "Z",
    0,
    0.001,
    "d",
    0,
    r,
    "b",
    0,
    50,
    "P",
    0,
    3,
    "y",
    0,
    24,
    "E",
    0,
    t,
    "l",
    0,
    d,
    "z",
    0,
    (e) => ({ name: i(e), ...r }),
    "L",
    0,
    (e, t) => {
      if (e.presets.length <= 1 || !c(e, t)) return e;
      let r = e.presets.filter((e, r) => r !== t),
        i = e.active;
      return (
        t < e.active
          ? (i = e.active - 1)
          : t === e.active && (i = Math.min(t, r.length - 1)),
        { active: i, presets: r }
      );
    },
    "_",
    0,
    (e, t) => {
      if (e.presets.length >= 3 || !c(e, t)) return e;
      let r = e.presets[t],
        i = [
          ...e.presets,
          {
            ...r,
            name: ((e, t) => {
              let r = o({ preset: e[t], index: t }),
                i = new Set(e.map((e, t) => o({ preset: e, index: t })));
              for (let e = 2; ; e += 1) {
                let t = ` ${e}`,
                  s = 24 - t.length,
                  n = `${r.slice(0, s).trimEnd()}${t}`;
                if (!i.has(n)) return n;
              }
            })(e.presets, t),
          },
        ];
      return { active: i.length - 1, presets: i };
    },
    "$",
    0,
    (e) => ({
      slippage: e.slippage,
      priorityFee: e.priorityFee,
      tipAmount: e.tipAmount,
      frontRunningProtection: e.frontRunningProtection,
      holdToConfirm: e.holdToConfirm,
    }),
    "B",
    0,
    o,
    "W",
    0,
    a,
    "X",
    0,
    n,
    "C",
    0,
    l,
    "a",
    0,
    (e) => {
      let t = e ?? {},
        r = Array.isArray(t.presets) ? t.presets : [],
        i = Array.from({ length: Math.min(Math.max(r.length, 1), 3) }, (e, t) =>
          l(r[t], t),
        );
      return { active: d(t.active, i.length), presets: i };
    },
  ]);
};
