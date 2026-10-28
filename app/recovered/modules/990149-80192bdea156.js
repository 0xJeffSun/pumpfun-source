// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  function t(e) {
    return `0x${e.reduce((e, t) => e + t.replace("0x", ""), "")}`;
  }
  e.s([
    "w",
    0,
    function (e) {
      return "string" == typeof e[0]
        ? t(e)
        : (function (e) {
            let t = 0;
            for (let n of e) t += n.length;
            let n = new Uint8Array(t),
              r = 0;
            for (let t of e) (n.set(t, r), (r += t.length));
            return n;
          })(e);
    },
    "s",
    0,
    t,
  ]);
};
