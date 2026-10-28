// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = BigInt(0xffffffff),
    r = BigInt(32);
  e.s([
    "s",
    0,
    function (e, t, r, n) {
      let i = (t >>> 0) + (n >>> 0);
      return { h: (e + r + ((i / 0x100000000) | 0)) | 0, l: 0 | i };
    },
    "H",
    0,
    (e, t, r, n) => (t + r + n + ((e / 0x100000000) | 0)) | 0,
    "d",
    0,
    (e, t, r) => (e >>> 0) + (t >>> 0) + (r >>> 0),
    "l",
    0,
    (e, t, r, n, i) => (t + r + n + i + ((e / 0x100000000) | 0)) | 0,
    "Z",
    0,
    (e, t, r, n) => (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0),
    "p",
    0,
    (e, t, r, n, i, o) => (t + r + n + i + o + ((e / 0x100000000) | 0)) | 0,
    "c",
    0,
    (e, t, r, n, i) =>
      (e >>> 0) + (t >>> 0) + (r >>> 0) + (n >>> 0) + (i >>> 0),
    "v",
    0,
    (e, t, r) => (t << (r - 32)) | (e >>> (64 - r)),
    "L",
    0,
    (e, t, r) => (e << (r - 32)) | (t >>> (64 - r)),
    "C",
    0,
    (e, t, r) => (e << r) | (t >>> (32 - r)),
    "t",
    0,
    (e, t, r) => (t << r) | (e >>> (32 - r)),
    "u",
    0,
    (e, t, r) => (e << (64 - r)) | (t >>> (r - 32)),
    "N",
    0,
    (e, t, r) => (e >>> (r - 32)) | (t << (64 - r)),
    "q",
    0,
    (e, t, r) => (e >>> r) | (t << (32 - r)),
    "h",
    0,
    (e, t, r) => (e << (32 - r)) | (t >>> r),
    "a",
    0,
    (e, t, r) => e >>> r,
    "I",
    0,
    (e, t, r) => (e << (32 - r)) | (t >>> r),
    "$",
    0,
    function (e, n = !1) {
      let i = e.length,
        o = new Uint32Array(i),
        a = new Uint32Array(i);
      for (let s = 0; s < i; s++) {
        let { h: i, l } = (function (e, n = !1) {
          return n
            ? { h: Number(e & t), l: Number((e >> r) & t) }
            : { h: 0 | Number((e >> r) & t), l: 0 | Number(e & t) };
        })(e[s], n);
        [o[s], a[s]] = [i, l];
      }
      return [o, a];
    },
  ]);
};
