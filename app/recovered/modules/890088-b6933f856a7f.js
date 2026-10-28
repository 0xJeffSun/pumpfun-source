// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(668487);
  let r = (e) => e;
  e.s(["f", 0, r], 714283);
  var a = e.i(187611);
  let i = new Map(),
    s = new Map(),
    n = (e, t) => {
      if (!t) return e;
      let r = Object.entries(t)
        .filter(([, e]) => void 0 !== e)
        .sort(([e], [t]) => e.localeCompare(t))
        .map(([e, t]) => `${e}:${String(t)}`)
        .join("|");
      return 0 === r.length ? e : `${e}|${r}`;
    },
    o = (e, t, r) => {
      let a = e.get(t);
      if (void 0 !== a) return a;
      let i = r();
      if (e.size >= 50) {
        let t = e.keys().next().value;
        void 0 !== t && e.delete(t);
      }
      return (e.set(t, i), i);
    },
    l = (e, t) => o(i, n(e, t), () => new Intl.NumberFormat(e, t)),
    m = (e, t) => o(s, n(e, t), () => new Intl.DateTimeFormat(e, t)),
    u = [
      { threshold: 1e12, key: "numbers.compact.trillion" },
      { threshold: 1e9, key: "numbers.compact.billion" },
      { threshold: 1e6, key: "numbers.compact.million" },
      { threshold: 1e3, key: "numbers.compact.thousand" },
    ],
    c = ({ value: e, locale: t }) => {
      let [a, i] = e.toExponential(1).split("e"),
        s = l(t, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(
          Number(a),
        );
      return r(`${s}e${(i ?? "").replace("+", "")}`);
    },
    d = [
      { unitMs: 31104e6, key: "time.abbreviations.year" },
      { unitMs: 2592e6, key: "time.abbreviations.month" },
      { unitMs: 864e5, key: "time.abbreviations.day" },
      { unitMs: 36e5, key: "time.abbreviations.hour" },
      { unitMs: 6e4, key: "time.abbreviations.minute" },
      { unitMs: 1e3, key: "time.abbreviations.second" },
    ],
    h = ({ t: e, elapsedMs: t, suffix: r = !0 }) => {
      if (!Number.isFinite(t)) return (0, a.T)("", "unicode-symbol");
      let i = Math.max(1e3, t),
        s = d.find(({ unitMs: e }) => i >= e) ?? d[d.length - 1],
        n = (0, a.T)(`${Math.floor(i / s.unitMs)}${e(s.key)}`, "date-format");
      return r ? e("common.time_ago", { time: n }) : n;
    };
  e.s(
    [
      "Z",
      0,
      1e15,
      "T",
      0,
      ({
        value: e,
        locale: t,
        minimumFractionDigits: a,
        maximumFractionDigits: i = 4,
        useGrouping: s,
      }) => {
        let n = l(t, {
          minimumFractionDigits: a,
          maximumFractionDigits: i,
          useGrouping: s,
        });
        if (!Number.isFinite(e)) return r(n.format(0));
        let o = 10 ** -i,
          m = Math.abs(e);
        if (0 === m || m >= o) return r(n.format(e));
        let u = l(t, { maximumFractionDigits: i, useGrouping: s });
        return r(`${e < 0 ? "-" : ""}<${u.format(o)}`);
      },
      "u",
      0,
      ({ locale: e, timestampMs: r, timeZone: i }) => {
        let s = new Date(r),
          n = s.getFullYear() === new Date((0, t.t)()).getFullYear();
        return (0, a.T)(
          m(e, {
            month: "short",
            day: "numeric",
            ...(n ? {} : { year: "numeric" }),
            ...(i ? { timeZone: i } : {}),
          }).format(s),
          "date-format",
        );
      },
      "a",
      0,
      (e, t) => (0, a.T)(m(t, { timeStyle: "short" }).format(e), "date-format"),
      "J",
      0,
      ({ value: e, locale: t, t: a, maximumFractionDigits: i = 1 }) => {
        let s = Math.abs(e);
        if (s >= 1e15) return c({ value: e, locale: t });
        let n = u.find(({ threshold: e }) => s >= e),
          o = n ? e / n.threshold : e,
          m = l(t, { maximumFractionDigits: n ? i : 0 }).format(o);
        return r(n ? `${m}${a(n.key)}` : m);
      },
      "G",
      0,
      (e, t, r) =>
        (0, a.T)(
          m(t, {
            dateStyle: "medium",
            ...(r?.timeZone ? { timeZone: r.timeZone } : {}),
          }).format(e),
          "date-format",
        ),
      "V",
      0,
      (e, t) =>
        (0, a.T)(
          m(t, { dateStyle: "medium", timeStyle: "short" }).format(e),
          "date-format",
        ),
      "h",
      0,
      c,
      "f",
      0,
      h,
      "K",
      0,
      ({ t: e, timestampMs: r, suffix: a }) =>
        h({ t: e, elapsedMs: (0, t.t)() - r, suffix: a }),
      "r",
      0,
      m,
      "R",
      0,
      l,
    ],
    890088,
  );
};
