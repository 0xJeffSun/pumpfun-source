// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(668487);
  function n(e, t = {}) {
    let r, i;
    if (!Number.isFinite(e)) return "";
    let { suffix: l = !0 } = t,
      a = Math.max(1e3, e);
    return (
      a < 6e4
        ? ((r = Math.floor(a / 1e3)), (i = "s"))
        : a < 36e5
          ? ((r = Math.floor(a / 6e4)), (i = "m"))
          : a < 864e5
            ? ((r = Math.floor(a / 36e5)), (i = "h"))
            : a < 2592e6
              ? ((r = Math.floor(a / 864e5)), (i = "d"))
              : a < 31104e6
                ? ((r = Math.floor(a / 2592e6)), (i = "mo"))
                : ((r = Math.floor(a / 31104e6)), (i = "y")),
      `${r}${i}${l ? " ago" : ""}`
    );
  }
  e.s([
    "g",
    0,
    n,
    "u",
    0,
    function (e, r = {}) {
      return n((0, t.t)() - e, r);
    },
    "l",
    0,
    function (e) {
      if (null == e) return null;
      if (e instanceof Date) {
        let t = e.getTime();
        return Number.isFinite(t) ? t : null;
      }
      if ("number" == typeof e)
        return Number.isFinite(e) ? (e < 1e10 ? 1e3 * e : e) : null;
      let t = Date.parse(e);
      return Number.isFinite(t) ? t : null;
    },
  ]);
};
