// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = Math.min,
    n = Math.max,
    r = Math.round,
    i = Math.floor;
  function o(e) {
    let t = e[0];
    return "t" === t || "b" === t ? "y" : "x";
  }
  e.s([
    "O",
    0,
    function (e, r, i) {
      return n(e, t(r, i));
    },
    "h",
    0,
    function (e, t) {
      return "function" == typeof e ? e(t) : e;
    },
    "w",
    0,
    i,
    "R",
    0,
    function (e) {
      return e.split("-")[1];
    },
    "i",
    0,
    function (e) {
      return "x" === o(e) ? "y" : "x";
    },
    "T",
    0,
    function (e) {
      return "y" === e ? "height" : "width";
    },
    "j",
    0,
    function (e) {
      return "number" != typeof e
        ? { top: 0, right: 0, bottom: 0, left: 0, ...e }
        : { top: e, right: e, bottom: e, left: e };
    },
    "m",
    0,
    function (e) {
      return e.split("-")[0];
    },
    "$",
    0,
    o,
    "H",
    0,
    r,
  ]);
};
