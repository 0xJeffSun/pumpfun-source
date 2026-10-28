// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  let n = e.r(627869);
  function i(e, t, r, n, i, o) {
    ((l[e] = l[e] + l[t] + i),
      (l[n] = s(l[n] ^ l[e], 16)),
      (l[r] = l[r] + l[n]),
      (l[t] = s(l[t] ^ l[r], 12)),
      (l[e] = l[e] + l[t] + o),
      (l[n] = s(l[n] ^ l[e], 8)),
      (l[r] = l[r] + l[n]),
      (l[t] = s(l[t] ^ l[r], 7)));
  }
  function s(e, t) {
    return (e >>> t) ^ (e << (32 - t));
  }
  let o = new Uint32Array([
      0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c,
      0x1f83d9ab, 0x5be0cd19,
    ]),
    a = new Uint8Array([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15,
      13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6,
      7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8, 9, 0, 5,
      7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4,
      13, 7, 5, 15, 14, 1, 9, 12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8,
      11, 13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10, 6, 15, 14, 9,
      11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5, 10, 2, 8, 4, 7, 6, 1, 5, 15, 11,
      9, 14, 3, 12, 13, 0,
    ]),
    l = new Uint32Array(16),
    f = new Uint32Array(16);
  function u(e, t) {
    let r = 0;
    for (r = 0; r < 8; r++) ((l[r] = e.h[r]), (l[r + 8] = o[r]));
    for (
      l[12] ^= e.t, l[13] ^= e.t / 0x100000000, t && (l[14] = ~l[14]), r = 0;
      r < 16;
      r++
    ) {
      var n, s;
      f[r] =
        (n = e.b)[(s = 4 * r)] ^
        (n[s + 1] << 8) ^
        (n[s + 2] << 16) ^
        (n[s + 3] << 24);
    }
    for (r = 0; r < 10; r++)
      (i(0, 4, 8, 12, f[a[16 * r + 0]], f[a[16 * r + 1]]),
        i(1, 5, 9, 13, f[a[16 * r + 2]], f[a[16 * r + 3]]),
        i(2, 6, 10, 14, f[a[16 * r + 4]], f[a[16 * r + 5]]),
        i(3, 7, 11, 15, f[a[16 * r + 6]], f[a[16 * r + 7]]),
        i(0, 5, 10, 15, f[a[16 * r + 8]], f[a[16 * r + 9]]),
        i(1, 6, 11, 12, f[a[16 * r + 10]], f[a[16 * r + 11]]),
        i(2, 7, 8, 13, f[a[16 * r + 12]], f[a[16 * r + 13]]),
        i(3, 4, 9, 14, f[a[16 * r + 14]], f[a[16 * r + 15]]));
    for (r = 0; r < 8; r++) e.h[r] ^= l[r] ^ l[r + 8];
  }
  function c(e, t) {
    if (!(e > 0 && e <= 32))
      throw Error("Incorrect output length, should be in [1, 32]");
    let r = t ? t.length : 0;
    if (t && !(r > 0 && r <= 32))
      throw Error("Incorrect key length, should be in [1, 32]");
    let n = {
      h: new Uint32Array(o),
      b: new Uint8Array(64),
      c: 0,
      t: 0,
      outlen: e,
    };
    return (
      (n.h[0] ^= 0x1010000 ^ (r << 8) ^ e),
      r > 0 && (d(n, t), (n.c = 64)),
      n
    );
  }
  function d(e, t) {
    for (let r = 0; r < t.length; r++)
      (64 === e.c && ((e.t += e.c), u(e, !1), (e.c = 0)), (e.b[e.c++] = t[r]));
  }
  function h(e) {
    for (e.t += e.c; e.c < 64; ) e.b[e.c++] = 0;
    u(e, !0);
    let t = new Uint8Array(e.outlen);
    for (let r = 0; r < e.outlen; r++)
      t[r] = (e.h[r >> 2] >> (8 * (3 & r))) & 255;
    return t;
  }
  function b(e, t, r) {
    ((r = r || 32), (e = n.normalizeInput(e)));
    let i = c(r, t);
    return (d(i, e), h(i));
  }
  t.exports = {
    blake2s: b,
    blake2sHex: function (e, t, r) {
      let i = b(e, t, r);
      return n.toHex(i);
    },
    blake2sInit: c,
    blake2sUpdate: d,
    blake2sFinal: h,
  };
};
