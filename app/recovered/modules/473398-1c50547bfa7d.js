// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  let n = new Uint8Array(512),
    o = new Uint8Array(256),
    i = 1;
  for (let t = 0; t < 255; t++)
    ((n[t] = i), (o[i] = t), 256 & (i <<= 1) && (i ^= 285));
  for (let t = 255; t < 512; t++) n[t] = n[t - 255];
  ((r.log = function (t) {
    if (t < 1) throw Error("log(" + t + ")");
    return o[t];
  }),
    (r.exp = function (t) {
      return n[t];
    }),
    (r.mul = function (t, e) {
      return 0 === t || 0 === e ? 0 : n[o[t] + o[e]];
    }));
};
