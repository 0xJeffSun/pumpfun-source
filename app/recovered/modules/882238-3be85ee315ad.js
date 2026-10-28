// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(921152),
    n = e.i(445242),
    r = e.i(352386);
  e.i(550675);
  var i = e.i(547562);
  let l = () => (0, i.L)("chart.interval"),
    a = ({ mint: e, ignoreLastSelected: t }) => {
      let n = l(),
        r = n.byMint?.[e];
      return t ? r : (r ?? n.lastSelected);
    },
    o = (e, t) => a({ mint: e, ignoreLastSelected: t });
  e.s(
    [
      "T",
      0,
      a,
      "r",
      0,
      (e) => {
        let t,
          a,
          s,
          u = (0, n.c)(9),
          { mint: d, fallbackInterval: c, ignoreLastSelected: f } = e,
          m = void 0 !== f && f;
        u[0] !== m || u[1] !== d
          ? ((t = () => o(d, m) ?? null), (u[0] = m), (u[1] = d), (u[2] = t))
          : (t = u[2]);
        let [p, h] = (0, r.useState)(t),
          [y, g] = (0, r.useState)(d),
          [v, b] = (0, r.useState)(m),
          [w, k] = (0, r.useState)(null);
        ((y !== d || v !== m) && (g(d), b(m), h(o(d, m) ?? null), k(null)),
          u[3] !== d
            ? ((a = (e) => {
                var t;
                (k(null),
                  h(e),
                  (t = { lastSelected: e, byMint: { ...l().byMint, [d]: e } }),
                  (0, i.i)("chart.interval", t));
              }),
              (u[3] = d),
              (u[4] = a))
            : (a = u[4]));
        let S = a,
          C = w ?? p ?? c,
          A = null !== p;
        return (
          u[5] !== S || u[6] !== C || u[7] !== A
            ? ((s = {
                interval: C,
                persistInterval: S,
                overrideInterval: k,
                hasStoredPreference: A,
              }),
              (u[5] = S),
              (u[6] = C),
              (u[7] = A),
              (u[8] = s))
            : (s = u[8]),
          s
        );
      },
    ],
    359189,
  );
  var s = e.i(267951),
    u = e.i(880783);
  let d = (e, t) => t && (null == e || Date.now() - e < s.w),
    c = (e, t = !1) => {
      if (d(e, t)) return "1s";
      if (!e) return "1m";
      let n = Date.now() - e,
        r = n / 6e4,
        i = n / 36e5;
      return r < 5
        ? "1s"
        : r < 15
          ? "15s"
          : i < 1
            ? "1m"
            : i < 6
              ? "5m"
              : i < 24
                ? "15m"
                : i < 168
                  ? "1h"
                  : i < 720
                    ? "4h"
                    : "1d";
    };
  e.s(
    [
      "v",
      0,
      c,
      "w",
      0,
      d,
      "u",
      0,
      ({ coin: e }) => {
        let n = (0, s.z)(e),
          r =
            a({
              mint: e.mint,
              ignoreLastSelected: d(e.created_timestamp, n),
            }) ?? c(e.created_timestamp, n);
        return (0, u.B)(e) ? (0, t.b)(r) : r;
      },
    ],
    882238,
  );
};
