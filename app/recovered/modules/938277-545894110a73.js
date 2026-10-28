// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = (e, t = 3) =>
      0 === e
        ? t - 1
        : Math.max(0, t - (Math.floor(Math.log10(Math.abs(e))) + 1)),
    i = (e, i = 3) => {
      let r = t(e, i),
        n = Number(e.toFixed(r)),
        a = t(n, i);
      return n.toFixed(a);
    },
    r = (e) => {
      if ("number" != typeof e) return "0";
      if (e >= 1e9) {
        let t = e / 1e9,
          r = Number(i(t));
        return r >= 1e3 ? `${i(r / 1e3)}T` : `${i(t)}B`;
      }
      if (e >= 1e6) {
        let t = e / 1e6,
          r = Number(i(t));
        return r >= 1e3 ? `${i(r / 1e3)}B` : `${i(t)}M`;
      }
      if (e >= 1e3) {
        let t = e / 1e3,
          r = Number(i(t));
        return r >= 1e3 ? `${i(r / 1e3)}M` : `${i(t)}K`;
      }
      return `${e.toFixed(0)}`;
    },
    n = (e) => r(e),
    a = (e) =>
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
    a,
    "O",
    0,
    function (e, t = "en-US") {
      return Number.isFinite(e) ? (e >= 1e4 ? a(e) : e.toLocaleString(t)) : "0";
    },
    "q",
    0,
    function (e, t = 2, i = "$") {
      if (null == e) return `${i}0`;
      let r = "string" == typeof e ? parseFloat(e) : e;
      return isNaN(r)
        ? `${i}0`
        : r >= 1e9
          ? `${i}${(r / 1e9).toFixed(t)}B`
          : r >= 1e6
            ? `${i}${(r / 1e6).toFixed(t)}M`
            : r >= 1e3
              ? `${i}${(r / 1e3).toFixed(t)}K`
              : `${i}${r.toFixed(t)}`;
    },
    "M",
    0,
    n,
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
    r,
    "a",
    0,
    (e) => `$${n(e)}`,
  ]);
};
