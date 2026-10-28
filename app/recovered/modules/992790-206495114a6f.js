// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, i) => {
  let r = new Uint8Array(512),
    o = new Uint8Array(256),
    n = 1;
  for (let t = 0; t < 255; t++)
    ((r[t] = n), (o[n] = t), 256 & (n <<= 1) && (n ^= 285));
  for (let t = 255; t < 512; t++) r[t] = r[t - 255];
  ((i.log = function (t) {
    if (t < 1) throw Error("log(" + t + ")");
    return o[t];
  }),
    (i.exp = function (t) {
      return r[t];
    }),
    (i.mul = function (t, e) {
      return 0 === t || 0 === e ? 0 : r[o[t] + o[e]];
    }));
};
