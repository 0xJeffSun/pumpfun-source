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
            for (let r of e) t += r.length;
            let r = new Uint8Array(t),
              s = 0;
            for (let t of e) (r.set(t, s), (s += t.length));
            return r;
          })(e);
    },
    "s",
    0,
    t,
  ]);
};
