// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t,
    r = 256;
  e.s([
    "f",
    0,
    function (e = 11) {
      if (!t || r + e > 512) {
        ((t = ""), (r = 0));
        for (let e = 0; e < 256; e++)
          t += ((256 + 256 * Math.random()) | 0).toString(16).substring(1);
      }
      return t.substring(r, r++ + e);
    },
  ]);
};
