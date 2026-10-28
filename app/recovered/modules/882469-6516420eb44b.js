// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = BigInt(0xffffffff),
    n = BigInt(32);
  e.s([
    "s",
    0,
    function (e, t, n, r) {
      let i = (t >>> 0) + (r >>> 0);
      return { h: (e + n + ((i / 0x100000000) | 0)) | 0, l: 0 | i };
    },
    "H",
    0,
    (e, t, n, r) => (t + n + r + ((e / 0x100000000) | 0)) | 0,
    "d",
    0,
    (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0),
    "l",
    0,
    (e, t, n, r, i) => (t + n + r + i + ((e / 0x100000000) | 0)) | 0,
    "Z",
    0,
    (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0),
    "p",
    0,
    (e, t, n, r, i, o) => (t + n + r + i + o + ((e / 0x100000000) | 0)) | 0,
    "c",
    0,
    (e, t, n, r, i) =>
      (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (i >>> 0),
    "v",
    0,
    (e, t, n) => (t << (n - 32)) | (e >>> (64 - n)),
    "L",
    0,
    (e, t, n) => (e << (n - 32)) | (t >>> (64 - n)),
    "C",
    0,
    (e, t, n) => (e << n) | (t >>> (32 - n)),
    "t",
    0,
    (e, t, n) => (t << n) | (e >>> (32 - n)),
    "u",
    0,
    (e, t, n) => (e << (64 - n)) | (t >>> (n - 32)),
    "N",
    0,
    (e, t, n) => (e >>> (n - 32)) | (t << (64 - n)),
    "q",
    0,
    (e, t, n) => (e >>> n) | (t << (32 - n)),
    "h",
    0,
    (e, t, n) => (e << (32 - n)) | (t >>> n),
    "a",
    0,
    (e, t, n) => e >>> n,
    "I",
    0,
    (e, t, n) => (e << (32 - n)) | (t >>> n),
    "$",
    0,
    function (e, r = !1) {
      let i = e.length,
        o = new Uint32Array(i),
        s = new Uint32Array(i);
      for (let a = 0; a < i; a++) {
        let { h: i, l } = (function (e, r = !1) {
          return r
            ? { h: Number(e & t), l: Number((e >> n) & t) }
            : { h: 0 | Number((e >> n) & t), l: 0 | Number(e & t) };
        })(e[a], r);
        [o[a], s[a]] = [i, l];
      }
      return [o, s];
    },
  ]);
};
