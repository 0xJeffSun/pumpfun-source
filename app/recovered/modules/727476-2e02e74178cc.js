// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, i) => {
  let r = t.r(992790);
  ((i.mul = function (t, e) {
    let i = new Uint8Array(t.length + e.length - 1);
    for (let o = 0; o < t.length; o++)
      for (let n = 0; n < e.length; n++) i[o + n] ^= r.mul(t[o], e[n]);
    return i;
  }),
    (i.mod = function (t, e) {
      let i = new Uint8Array(t);
      for (; i.length - e.length >= 0; ) {
        let t = i[0];
        for (let o = 0; o < e.length; o++) i[o] ^= r.mul(e[o], t);
        let o = 0;
        for (; o < i.length && 0 === i[o]; ) o++;
        i = i.slice(o);
      }
      return i;
    }),
    (i.generateECPolynomial = function (t) {
      let e = new Uint8Array([1]);
      for (let o = 0; o < t; o++) e = i.mul(e, new Uint8Array([1, r.exp(o)]));
      return e;
    }));
};
