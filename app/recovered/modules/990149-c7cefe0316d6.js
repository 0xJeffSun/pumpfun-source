// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  function e(t) {
    return `0x${t.reduce((t, e) => t + e.replace("0x", ""), "")}`;
  }
  t.s([
    "w",
    0,
    function (t) {
      return "string" == typeof t[0]
        ? e(t)
        : (function (t) {
            let e = 0;
            for (let n of t) e += n.length;
            let n = new Uint8Array(e),
              i = 0;
            for (let e of t) (n.set(e, i), (i += e.length));
            return n;
          })(t);
    },
    "s",
    0,
    e,
  ]);
};
