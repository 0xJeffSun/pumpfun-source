// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  let n = e.r(627869);
  function i(e, t, r) {
    let n = e[t] + e[r],
      i = e[t + 1] + e[r + 1];
    (n >= 0x100000000 && i++, (e[t] = n), (e[t + 1] = i));
  }
  function s(e, t, r, n) {
    let i = e[t] + r;
    r < 0 && (i += 0x100000000);
    let s = e[t + 1] + n;
    (i >= 0x100000000 && s++, (e[t] = i), (e[t + 1] = s));
  }
  function o(e, t) {
    return e[t] ^ (e[t + 1] << 8) ^ (e[t + 2] << 16) ^ (e[t + 3] << 24);
  }
  function a(e, t, r, n, o, a) {
    let l = c[o],
      f = c[o + 1],
      d = c[a],
      h = c[a + 1];
    (i(u, e, t), s(u, e, l, f));
    let b = u[n] ^ u[e],
      p = u[n + 1] ^ u[e + 1];
    ((u[n] = p),
      (u[n + 1] = b),
      i(u, r, n),
      (b = u[t] ^ u[r]),
      (p = u[t + 1] ^ u[r + 1]),
      (u[t] = (b >>> 24) ^ (p << 8)),
      (u[t + 1] = (p >>> 24) ^ (b << 8)),
      i(u, e, t),
      s(u, e, d, h),
      (b = u[n] ^ u[e]),
      (p = u[n + 1] ^ u[e + 1]),
      (u[n] = (b >>> 16) ^ (p << 16)),
      (u[n + 1] = (p >>> 16) ^ (b << 16)),
      i(u, r, n),
      (b = u[t] ^ u[r]),
      (p = u[t + 1] ^ u[r + 1]),
      (u[t] = (p >>> 31) ^ (b << 1)),
      (u[t + 1] = (b >>> 31) ^ (p << 1)));
  }
  let l = new Uint32Array([
      0xf3bcc908, 0x6a09e667, 0x84caa73b, 0xbb67ae85, 0xfe94f82b, 0x3c6ef372,
      0x5f1d36f1, 0xa54ff53a, 0xade682d1, 0x510e527f, 0x2b3e6c1f, 0x9b05688c,
      0xfb41bd6b, 0x1f83d9ab, 0x137e2179, 0x5be0cd19,
    ]),
    f = new Uint8Array(
      [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9,
        15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13, 10, 14,
        3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8,
        9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0,
        11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9, 12, 5, 1, 15, 14, 13, 4, 10, 0, 7,
        6, 3, 9, 2, 8, 11, 13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10,
        6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5, 10, 2, 8, 4, 7, 6,
        1, 5, 15, 11, 9, 14, 3, 12, 13, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
        12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
      ].map(function (e) {
        return 2 * e;
      }),
    ),
    u = new Uint32Array(32),
    c = new Uint32Array(32);
  function d(e, t) {
    let r = 0;
    for (r = 0; r < 16; r++) ((u[r] = e.h[r]), (u[r + 16] = l[r]));
    for (
      u[24] = u[24] ^ e.t,
        u[25] = u[25] ^ (e.t / 0x100000000),
        t && ((u[28] = ~u[28]), (u[29] = ~u[29])),
        r = 0;
      r < 32;
      r++
    )
      c[r] = o(e.b, 4 * r);
    for (r = 0; r < 12; r++)
      (a(0, 8, 16, 24, f[16 * r + 0], f[16 * r + 1]),
        a(2, 10, 18, 26, f[16 * r + 2], f[16 * r + 3]),
        a(4, 12, 20, 28, f[16 * r + 4], f[16 * r + 5]),
        a(6, 14, 22, 30, f[16 * r + 6], f[16 * r + 7]),
        a(0, 10, 20, 30, f[16 * r + 8], f[16 * r + 9]),
        a(2, 12, 22, 24, f[16 * r + 10], f[16 * r + 11]),
        a(4, 14, 16, 26, f[16 * r + 12], f[16 * r + 13]),
        a(6, 8, 18, 28, f[16 * r + 14], f[16 * r + 15]));
    for (r = 0; r < 16; r++) e.h[r] = e.h[r] ^ u[r] ^ u[r + 16];
  }
  let h = new Uint8Array([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  function b(e, t, r, n) {
    if (0 === e || e > 64)
      throw Error("Illegal output length, expected 0 < length <= 64");
    if (t && t.length > 64)
      throw Error("Illegal key, expected Uint8Array with 0 < length <= 64");
    if (r && 16 !== r.length)
      throw Error("Illegal salt, expected Uint8Array with length is 16");
    if (n && 16 !== n.length)
      throw Error("Illegal personal, expected Uint8Array with length is 16");
    let i = {
      b: new Uint8Array(128),
      h: new Uint32Array(16),
      t: 0,
      c: 0,
      outlen: e,
    };
    (h.fill(0),
      (h[0] = e),
      t && (h[1] = t.length),
      (h[2] = 1),
      (h[3] = 1),
      r && h.set(r, 32),
      n && h.set(n, 48));
    for (let e = 0; e < 16; e++) i.h[e] = l[e] ^ o(h, 4 * e);
    return (t && (p(i, t), (i.c = 128)), i);
  }
  function p(e, t) {
    for (let r = 0; r < t.length; r++)
      (128 === e.c && ((e.t += e.c), d(e, !1), (e.c = 0)), (e.b[e.c++] = t[r]));
  }
  function g(e) {
    for (e.t += e.c; e.c < 128; ) e.b[e.c++] = 0;
    d(e, !0);
    let t = new Uint8Array(e.outlen);
    for (let r = 0; r < e.outlen; r++) t[r] = e.h[r >> 2] >> (8 * (3 & r));
    return t;
  }
  function y(e, t, r, i, s) {
    ((r = r || 64),
      (e = n.normalizeInput(e)),
      i && (i = n.normalizeInput(i)),
      s && (s = n.normalizeInput(s)));
    let o = b(r, t, i, s);
    return (p(o, e), g(o));
  }
  t.exports = {
    blake2b: y,
    blake2bHex: function (e, t, r, i, s) {
      let o = y(e, t, r, i, s);
      return n.toHex(o);
    },
    blake2bInit: b,
    blake2bUpdate: p,
    blake2bFinal: g,
  };
};
