// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  let e = BigInt(0xffffffff),
    n = BigInt(32);
  t.s([
    "s",
    0,
    function (t, e, n, i) {
      let s = (e >>> 0) + (i >>> 0);
      return { h: (t + n + ((s / 0x100000000) | 0)) | 0, l: 0 | s };
    },
    "H",
    0,
    (t, e, n, i) => (e + n + i + ((t / 0x100000000) | 0)) | 0,
    "d",
    0,
    (t, e, n) => (t >>> 0) + (e >>> 0) + (n >>> 0),
    "l",
    0,
    (t, e, n, i, s) => (e + n + i + s + ((t / 0x100000000) | 0)) | 0,
    "Z",
    0,
    (t, e, n, i) => (t >>> 0) + (e >>> 0) + (n >>> 0) + (i >>> 0),
    "p",
    0,
    (t, e, n, i, s, r) => (e + n + i + s + r + ((t / 0x100000000) | 0)) | 0,
    "c",
    0,
    (t, e, n, i, s) =>
      (t >>> 0) + (e >>> 0) + (n >>> 0) + (i >>> 0) + (s >>> 0),
    "v",
    0,
    (t, e, n) => (e << (n - 32)) | (t >>> (64 - n)),
    "L",
    0,
    (t, e, n) => (t << (n - 32)) | (e >>> (64 - n)),
    "C",
    0,
    (t, e, n) => (t << n) | (e >>> (32 - n)),
    "t",
    0,
    (t, e, n) => (e << n) | (t >>> (32 - n)),
    "u",
    0,
    (t, e, n) => (t << (64 - n)) | (e >>> (n - 32)),
    "N",
    0,
    (t, e, n) => (t >>> (n - 32)) | (e << (64 - n)),
    "q",
    0,
    (t, e, n) => (t >>> n) | (e << (32 - n)),
    "h",
    0,
    (t, e, n) => (t << (32 - n)) | (e >>> n),
    "a",
    0,
    (t, e, n) => t >>> n,
    "I",
    0,
    (t, e, n) => (t << (32 - n)) | (e >>> n),
    "$",
    0,
    function (t, i = !1) {
      let s = t.length,
        r = new Uint32Array(s),
        o = new Uint32Array(s);
      for (let a = 0; a < s; a++) {
        let { h: s, l: u } = (function (t, i = !1) {
          return i
            ? { h: Number(t & e), l: Number((t >> n) & e) }
            : { h: 0 | Number((t >> n) & e), l: 0 | Number(t & e) };
        })(t[a], i);
        [r[a], o[a]] = [s, u];
      }
      return [r, o];
    },
  ]);
};
