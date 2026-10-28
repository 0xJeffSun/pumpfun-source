// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = /^[1-9A-HJ-NP-Za-km-z]+$/,
    r = (e) => {
      let r = e.trim();
      return !(r.length < 32) && !(r.length > 44) && t.test(r);
    };
  e.s([
    "k",
    0,
    r,
    "R",
    0,
    (e) => {
      let t = e.trim();
      return r(t) ? t : null;
    },
  ]);
};
