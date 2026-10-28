// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  let n = t.r(473398);
  ((r.mul = function (t, e) {
    let r = new Uint8Array(t.length + e.length - 1);
    for (let o = 0; o < t.length; o++)
      for (let i = 0; i < e.length; i++) r[o + i] ^= n.mul(t[o], e[i]);
    return r;
  }),
    (r.mod = function (t, e) {
      let r = new Uint8Array(t);
      for (; r.length - e.length >= 0; ) {
        let t = r[0];
        for (let o = 0; o < e.length; o++) r[o] ^= n.mul(e[o], t);
        let o = 0;
        for (; o < r.length && 0 === r[o]; ) o++;
        r = r.slice(o);
      }
      return r;
    }),
    (r.generateECPolynomial = function (t) {
      let e = new Uint8Array([1]);
      for (let o = 0; o < t; o++) e = r.mul(e, new Uint8Array([1, n.exp(o)]));
      return e;
    }));
};
