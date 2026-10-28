// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = (e, t = 3) =>
      0 === e
        ? t - 1
        : Math.max(0, t - (Math.floor(Math.log10(Math.abs(e))) + 1)),
    r = (e, r = 3) => {
      let n = t(e, r),
        i = Number(e.toFixed(n)),
        s = t(i, r);
      return i.toFixed(s);
    },
    n = (e) => {
      if ("number" != typeof e) return "0";
      if (e >= 1e9) {
        let t = e / 1e9,
          n = Number(r(t));
        return n >= 1e3 ? `${r(n / 1e3)}T` : `${r(t)}B`;
      }
      if (e >= 1e6) {
        let t = e / 1e6,
          n = Number(r(t));
        return n >= 1e3 ? `${r(n / 1e3)}B` : `${r(t)}M`;
      }
      if (e >= 1e3) {
        let t = e / 1e3,
          n = Number(r(t));
        return n >= 1e3 ? `${r(n / 1e3)}M` : `${r(t)}K`;
      }
      return `${e.toFixed(0)}`;
    },
    i = (e) => n(e),
    s = (e) =>
      e >= 1e9
        ? (e / 1e9).toFixed(1).replace(/\.0$/, "") + "B"
        : e >= 1e6
          ? (e / 1e6).toFixed(1).replace(/\.0$/, "") + "M"
          : e >= 1e3
            ? (e / 1e3).toFixed(1).replace(/\.0$/, "") + "k"
            : e.toFixed(0);
  e.s([
    "I",
    0,
    function (e) {
      let t = Number(e);
      return Number.isFinite(t) ? t : 0;
    },
    "J",
    0,
    s,
    "O",
    0,
    function (e, t = "en-US") {
      return Number.isFinite(e) ? (e >= 1e4 ? s(e) : e.toLocaleString(t)) : "0";
    },
    "q",
    0,
    function (e, t = 2, r = "$") {
      if (null == e) return `${r}0`;
      let n = "string" == typeof e ? parseFloat(e) : e;
      return isNaN(n)
        ? `${r}0`
        : n >= 1e9
          ? `${r}${(n / 1e9).toFixed(t)}B`
          : n >= 1e6
            ? `${r}${(n / 1e6).toFixed(t)}M`
            : n >= 1e3
              ? `${r}${(n / 1e3).toFixed(t)}K`
              : `${r}${n.toFixed(t)}`;
    },
    "M",
    0,
    i,
    "w",
    0,
    function (e) {
      let t = e;
      return (
        Number.isFinite(t) || (t = 0),
        new Intl.NumberFormat("en-US", {
          currency: "USD",
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
          style: "currency",
        }).format(t)
      );
    },
    "C",
    0,
    n,
    "a",
    0,
    (e) => `$${i(e)}`,
  ]);
};
