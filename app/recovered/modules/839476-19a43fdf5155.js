// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = /([\w-]+)\s*=\s*([^;]+)/g;
  e.s([
    "H",
    0,
    function (e, n) {
      for (t.lastIndex = 0; ; ) {
        let r = t.exec(e);
        if (r) {
          if (r[1] === n) return r[2];
        } else break;
      }
    },
    "w",
    0,
    function (e) {
      let n = new Map();
      for (t.lastIndex = 0; ; ) {
        let r = t.exec(e);
        if (r) n.set(r[1], r[2]);
        else break;
      }
      return n;
    },
    "o",
    0,
    function e(t) {
      return t
        ? (
            parseInt(t, 10) ^
            ((16 * Math.random()) >> (parseInt(t, 10) / 4))
          ).toString(16)
        : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, e);
    },
    "C",
    0,
    function (e, t, n = "") {
      let r = e.charCodeAt(t - 1),
        i = r >= 55296 && r <= 56319 ? t + 1 : t;
      return e.length <= i ? e : `${e.slice(0, i)}${n}`;
    },
  ]);
};
