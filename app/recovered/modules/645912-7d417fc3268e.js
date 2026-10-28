// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = /[^\u0000-\u007F]/;
  e.s([
    "A",
    0,
    1024,
    "y",
    0,
    1048576,
    "C",
    0,
    function (e) {
      return t.test(e)
        ? void 0 !== window.TextEncoder
          ? new TextEncoder().encode(e).length
          : new Blob([e]).size
        : e.length;
    },
    "Y",
    0,
    function (e) {
      let t = new Uint8Array(e.reduce((e, t) => e + t.length, 0)),
        n = 0;
      for (let r of e) (t.set(r, n), (n += r.length));
      return t;
    },
  ]);
};
