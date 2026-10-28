// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(668487);
  let n = (e) => e;
  e.s(["f", 0, n], 714283);
  var r = e.i(187611);
  let i = new Map(),
    a = new Map(),
    o = (e, t) => {
      if (!t) return e;
      let n = Object.entries(t)
        .filter(([, e]) => void 0 !== e)
        .sort(([e], [t]) => e.localeCompare(t))
        .map(([e, t]) => `${e}:${String(t)}`)
        .join("|");
      return 0 === n.length ? e : `${e}|${n}`;
    },
    s = (e, t, n) => {
      let r = e.get(t);
      if (void 0 !== r) return r;
      let i = n();
      if (e.size >= 50) {
        let t = e.keys().next().value;
        void 0 !== t && e.delete(t);
      }
      return (e.set(t, i), i);
    },
    l = (e, t) => s(i, o(e, t), () => new Intl.NumberFormat(e, t)),
    u = (e, t) => s(a, o(e, t), () => new Intl.DateTimeFormat(e, t)),
    c = [
      { threshold: 1e12, key: "numbers.compact.trillion" },
      { threshold: 1e9, key: "numbers.compact.billion" },
      { threshold: 1e6, key: "numbers.compact.million" },
      { threshold: 1e3, key: "numbers.compact.thousand" },
    ],
    d = ({ value: e, locale: t }) => {
      let [r, i] = e.toExponential(1).split("e"),
        a = l(t, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(
          Number(r),
        );
      return n(`${a}e${(i ?? "").replace("+", "")}`);
    },
    f = [
      { unitMs: 31104e6, key: "time.abbreviations.year" },
      { unitMs: 2592e6, key: "time.abbreviations.month" },
      { unitMs: 864e5, key: "time.abbreviations.day" },
      { unitMs: 36e5, key: "time.abbreviations.hour" },
      { unitMs: 6e4, key: "time.abbreviations.minute" },
      { unitMs: 1e3, key: "time.abbreviations.second" },
    ],
    h = ({ t: e, elapsedMs: t, suffix: n = !0 }) => {
      if (!Number.isFinite(t)) return (0, r.T)("", "unicode-symbol");
      let i = Math.max(1e3, t),
        a = f.find(({ unitMs: e }) => i >= e) ?? f[f.length - 1],
        o = (0, r.T)(`${Math.floor(i / a.unitMs)}${e(a.key)}`, "date-format");
      return n ? e("common.time_ago", { time: o }) : o;
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
        minimumFractionDigits: r,
        maximumFractionDigits: i = 4,
        useGrouping: a,
      }) => {
        let o = l(t, {
          minimumFractionDigits: r,
          maximumFractionDigits: i,
          useGrouping: a,
        });
        if (!Number.isFinite(e)) return n(o.format(0));
        let s = 10 ** -i,
          u = Math.abs(e);
        if (0 === u || u >= s) return n(o.format(e));
        let c = l(t, { maximumFractionDigits: i, useGrouping: a });
        return n(`${e < 0 ? "-" : ""}<${c.format(s)}`);
      },
      "u",
      0,
      ({ locale: e, timestampMs: n, timeZone: i }) => {
        let a = new Date(n),
          o = a.getFullYear() === new Date((0, t.t)()).getFullYear();
        return (0, r.T)(
          u(e, {
            month: "short",
            day: "numeric",
            ...(o ? {} : { year: "numeric" }),
            ...(i ? { timeZone: i } : {}),
          }).format(a),
          "date-format",
        );
      },
      "a",
      0,
      (e, t) => (0, r.T)(u(t, { timeStyle: "short" }).format(e), "date-format"),
      "J",
      0,
      ({ value: e, locale: t, t: r, maximumFractionDigits: i = 1 }) => {
        let a = Math.abs(e);
        if (a >= 1e15) return d({ value: e, locale: t });
        let o = c.find(({ threshold: e }) => a >= e),
          s = o ? e / o.threshold : e,
          u = l(t, { maximumFractionDigits: o ? i : 0 }).format(s);
        return n(o ? `${u}${r(o.key)}` : u);
      },
      "G",
      0,
      (e, t, n) =>
        (0, r.T)(
          u(t, {
            dateStyle: "medium",
            ...(n?.timeZone ? { timeZone: n.timeZone } : {}),
          }).format(e),
          "date-format",
        ),
      "V",
      0,
      (e, t) =>
        (0, r.T)(
          u(t, { dateStyle: "medium", timeStyle: "short" }).format(e),
          "date-format",
        ),
      "h",
      0,
      d,
      "f",
      0,
      h,
      "K",
      0,
      ({ t: e, timestampMs: n, suffix: r }) =>
        h({ t: e, elapsedMs: (0, t.t)() - n, suffix: r }),
      "r",
      0,
      u,
      "R",
      0,
      l,
    ],
    890088,
  );
};
