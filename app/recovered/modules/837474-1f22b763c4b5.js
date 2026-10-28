// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(944445);
  function i(e, t, i) {
    return (e & t) ^ (~e & i);
  }
  function a(e, t, i) {
    return (e & t) ^ (e & i) ^ (t & i);
  }
  class s extends t.B {
    constructor(e, i, a, s) {
      (super(),
        (this.finished = !1),
        (this.length = 0),
        (this.pos = 0),
        (this.destroyed = !1),
        (this.blockLen = e),
        (this.outputLen = i),
        (this.padOffset = a),
        (this.isLE = s),
        (this.buffer = new Uint8Array(e)),
        (this.view = (0, t.y)(this.buffer)));
    }
    update(e) {
      ((0, t.s)(this), (e = (0, t.D)(e)), (0, t.C)(e));
      let { view: i, buffer: a, blockLen: s } = this,
        n = e.length;
      for (let l = 0; l < n; ) {
        let r = Math.min(s - this.pos, n - l);
        if (r === s) {
          let i = (0, t.y)(e);
          for (; s <= n - l; l += s) this.process(i, l);
          continue;
        }
        (a.set(e.subarray(l, l + r), this.pos),
          (this.pos += r),
          (l += r),
          this.pos === s && (this.process(i, 0), (this.pos = 0)));
      }
      return ((this.length += e.length), this.roundClean(), this);
    }
    digestInto(e) {
      ((0, t.s)(this), (0, t.W)(e, this), (this.finished = !0));
      let { buffer: i, view: a, blockLen: s, isLE: n } = this,
        { pos: l } = this;
      ((i[l++] = 128),
        (0, t.f)(this.buffer.subarray(l)),
        this.padOffset > s - l && (this.process(a, 0), (l = 0)));
      for (let e = l; e < s; e++) i[e] = 0;
      (!(function (e, t, i, a) {
        if ("function" == typeof e.setBigUint64) return e.setBigUint64(t, i, a);
        let s = BigInt(32),
          n = BigInt(0xffffffff),
          l = Number((i >> s) & n),
          r = Number(i & n),
          c = 4 * !!a,
          o = 4 * !a;
        (e.setUint32(t + c, l, a), e.setUint32(t + o, r, a));
      })(a, s - 8, BigInt(8 * this.length), n),
        this.process(a, 0));
      let r = (0, t.y)(e),
        c = this.outputLen;
      if (c % 4) throw Error("_sha2: outputLen should be aligned to 32bit");
      let o = c / 4,
        d = this.get();
      if (o > d.length) throw Error("_sha2: outputLen bigger than state");
      for (let e = 0; e < o; e++) r.setUint32(4 * e, d[e], n);
    }
    digest() {
      let { buffer: e, outputLen: t } = this;
      this.digestInto(e);
      let i = e.slice(0, t);
      return (this.destroy(), i);
    }
    _cloneInto(e) {
      (e || (e = new this.constructor()), e.set(...this.get()));
      let {
        blockLen: t,
        buffer: i,
        length: a,
        finished: s,
        destroyed: n,
        pos: l,
      } = this;
      return (
        (e.destroyed = n),
        (e.finished = s),
        (e.length = a),
        (e.pos = l),
        a % t && e.buffer.set(i),
        e
      );
    }
    clone() {
      return this._cloneInto();
    }
  }
  let n = Uint32Array.from([
      0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c,
      0x1f83d9ab, 0x5be0cd19,
    ]),
    l = Uint32Array.from([
      0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939, 0xffc00b31, 0x68581511,
      0x64f98fa7, 0xbefa4fa4,
    ]),
    r = Uint32Array.from([
      0xcbbb9d5d, 0xc1059ed8, 0x629a292a, 0x367cd507, 0x9159015a, 0x3070dd17,
      0x152fecd8, 0xf70e5939, 0x67332667, 0xffc00b31, 0x8eb44a87, 0x68581511,
      0xdb0c2e0d, 0x64f98fa7, 0x47b5481d, 0xbefa4fa4,
    ]),
    c = Uint32Array.from([
      0x6a09e667, 0xf3bcc908, 0xbb67ae85, 0x84caa73b, 0x3c6ef372, 0xfe94f82b,
      0xa54ff53a, 0x5f1d36f1, 0x510e527f, 0xade682d1, 0x9b05688c, 0x2b3e6c1f,
      0x1f83d9ab, 0xfb41bd6b, 0x5be0cd19, 0x137e2179,
    ]);
  e.s(
    [
      "F",
      0,
      i,
      "u",
      0,
      s,
      "O",
      0,
      a,
      "h",
      0,
      l,
      "n",
      0,
      n,
      "D",
      0,
      r,
      "s",
      0,
      c,
    ],
    853197,
  );
  var o = e.i(882469);
  let d = Uint32Array.from([
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
      0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
      0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
      0xfc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
      0x6ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
      0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
      0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
      0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
      0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
    ]),
    h = new Uint32Array(64);
  class x extends s {
    constructor(e = 32) {
      (super(64, e, 8, !1),
        (this.A = 0 | n[0]),
        (this.B = 0 | n[1]),
        (this.C = 0 | n[2]),
        (this.D = 0 | n[3]),
        (this.E = 0 | n[4]),
        (this.F = 0 | n[5]),
        (this.G = 0 | n[6]),
        (this.H = 0 | n[7]));
    }
    get() {
      let { A: e, B: t, C: i, D: a, E: s, F: n, G: l, H: r } = this;
      return [e, t, i, a, s, n, l, r];
    }
    set(e, t, i, a, s, n, l, r) {
      ((this.A = 0 | e),
        (this.B = 0 | t),
        (this.C = 0 | i),
        (this.D = 0 | a),
        (this.E = 0 | s),
        (this.F = 0 | n),
        (this.G = 0 | l),
        (this.H = 0 | r));
    }
    process(e, s) {
      for (let t = 0; t < 16; t++, s += 4) h[t] = e.getUint32(s, !1);
      for (let e = 16; e < 64; e++) {
        let i = h[e - 15],
          a = h[e - 2],
          s = (0, t.M)(i, 7) ^ (0, t.M)(i, 18) ^ (i >>> 3),
          n = (0, t.M)(a, 17) ^ (0, t.M)(a, 19) ^ (a >>> 10);
        h[e] = (n + h[e - 7] + s + h[e - 16]) | 0;
      }
      let { A: n, B: l, C: r, D: c, E: o, F: x, G: f, H: m } = this;
      for (let e = 0; e < 64; e++) {
        let s =
            (m +
              ((0, t.M)(o, 6) ^ (0, t.M)(o, 11) ^ (0, t.M)(o, 25)) +
              i(o, x, f) +
              d[e] +
              h[e]) |
            0,
          u =
            (((0, t.M)(n, 2) ^ (0, t.M)(n, 13) ^ (0, t.M)(n, 22)) +
              a(n, l, r)) |
            0;
        ((m = f),
          (f = x),
          (x = o),
          (o = (c + s) | 0),
          (c = r),
          (r = l),
          (l = n),
          (n = (s + u) | 0));
      }
      ((n = (n + this.A) | 0),
        (l = (l + this.B) | 0),
        (r = (r + this.C) | 0),
        (c = (c + this.D) | 0),
        (o = (o + this.E) | 0),
        (x = (x + this.F) | 0),
        (f = (f + this.G) | 0),
        (m = (m + this.H) | 0),
        this.set(n, l, r, c, o, x, f, m));
    }
    roundClean() {
      (0, t.f)(h);
    }
    destroy() {
      (this.set(0, 0, 0, 0, 0, 0, 0, 0), (0, t.f)(this.buffer));
    }
  }
  class f extends x {
    constructor() {
      (super(28),
        (this.A = 0 | l[0]),
        (this.B = 0 | l[1]),
        (this.C = 0 | l[2]),
        (this.D = 0 | l[3]),
        (this.E = 0 | l[4]),
        (this.F = 0 | l[5]),
        (this.G = 0 | l[6]),
        (this.H = 0 | l[7]));
    }
  }
  let m = o.$(
      [
        "0x428a2f98d728ae22",
        "0x7137449123ef65cd",
        "0xb5c0fbcfec4d3b2f",
        "0xe9b5dba58189dbbc",
        "0x3956c25bf348b538",
        "0x59f111f1b605d019",
        "0x923f82a4af194f9b",
        "0xab1c5ed5da6d8118",
        "0xd807aa98a3030242",
        "0x12835b0145706fbe",
        "0x243185be4ee4b28c",
        "0x550c7dc3d5ffb4e2",
        "0x72be5d74f27b896f",
        "0x80deb1fe3b1696b1",
        "0x9bdc06a725c71235",
        "0xc19bf174cf692694",
        "0xe49b69c19ef14ad2",
        "0xefbe4786384f25e3",
        "0x0fc19dc68b8cd5b5",
        "0x240ca1cc77ac9c65",
        "0x2de92c6f592b0275",
        "0x4a7484aa6ea6e483",
        "0x5cb0a9dcbd41fbd4",
        "0x76f988da831153b5",
        "0x983e5152ee66dfab",
        "0xa831c66d2db43210",
        "0xb00327c898fb213f",
        "0xbf597fc7beef0ee4",
        "0xc6e00bf33da88fc2",
        "0xd5a79147930aa725",
        "0x06ca6351e003826f",
        "0x142929670a0e6e70",
        "0x27b70a8546d22ffc",
        "0x2e1b21385c26c926",
        "0x4d2c6dfc5ac42aed",
        "0x53380d139d95b3df",
        "0x650a73548baf63de",
        "0x766a0abb3c77b2a8",
        "0x81c2c92e47edaee6",
        "0x92722c851482353b",
        "0xa2bfe8a14cf10364",
        "0xa81a664bbc423001",
        "0xc24b8b70d0f89791",
        "0xc76c51a30654be30",
        "0xd192e819d6ef5218",
        "0xd69906245565a910",
        "0xf40e35855771202a",
        "0x106aa07032bbd1b8",
        "0x19a4c116b8d2d0c8",
        "0x1e376c085141ab53",
        "0x2748774cdf8eeb99",
        "0x34b0bcb5e19b48a8",
        "0x391c0cb3c5c95a63",
        "0x4ed8aa4ae3418acb",
        "0x5b9cca4f7763e373",
        "0x682e6ff3d6b2b8a3",
        "0x748f82ee5defb2fc",
        "0x78a5636f43172f60",
        "0x84c87814a1f0ab72",
        "0x8cc702081a6439ec",
        "0x90befffa23631e28",
        "0xa4506cebde82bde9",
        "0xbef9a3f7b2c67915",
        "0xc67178f2e372532b",
        "0xca273eceea26619c",
        "0xd186b8c721c0c207",
        "0xeada7dd6cde0eb1e",
        "0xf57d4f7fee6ed178",
        "0x06f067aa72176fba",
        "0x0a637dc5a2c898a6",
        "0x113f9804bef90dae",
        "0x1b710b35131c471b",
        "0x28db77f523047d84",
        "0x32caab7b40c72493",
        "0x3c9ebe0a15c9bebc",
        "0x431d67c49c100d4c",
        "0x4cc5d4becb3e42b6",
        "0x597f299cfc657e2a",
        "0x5fcb6fab3ad6faec",
        "0x6c44198c4a475817",
      ].map((e) => BigInt(e)),
    ),
    u = m[0],
    b = m[1],
    p = new Uint32Array(80),
    _ = new Uint32Array(80);
  class g extends s {
    constructor(e = 64) {
      (super(128, e, 16, !1),
        (this.Ah = 0 | c[0]),
        (this.Al = 0 | c[1]),
        (this.Bh = 0 | c[2]),
        (this.Bl = 0 | c[3]),
        (this.Ch = 0 | c[4]),
        (this.Cl = 0 | c[5]),
        (this.Dh = 0 | c[6]),
        (this.Dl = 0 | c[7]),
        (this.Eh = 0 | c[8]),
        (this.El = 0 | c[9]),
        (this.Fh = 0 | c[10]),
        (this.Fl = 0 | c[11]),
        (this.Gh = 0 | c[12]),
        (this.Gl = 0 | c[13]),
        (this.Hh = 0 | c[14]),
        (this.Hl = 0 | c[15]));
    }
    get() {
      let {
        Ah: e,
        Al: t,
        Bh: i,
        Bl: a,
        Ch: s,
        Cl: n,
        Dh: l,
        Dl: r,
        Eh: c,
        El: o,
        Fh: d,
        Fl: h,
        Gh: x,
        Gl: f,
        Hh: m,
        Hl: u,
      } = this;
      return [e, t, i, a, s, n, l, r, c, o, d, h, x, f, m, u];
    }
    set(e, t, i, a, s, n, l, r, c, o, d, h, x, f, m, u) {
      ((this.Ah = 0 | e),
        (this.Al = 0 | t),
        (this.Bh = 0 | i),
        (this.Bl = 0 | a),
        (this.Ch = 0 | s),
        (this.Cl = 0 | n),
        (this.Dh = 0 | l),
        (this.Dl = 0 | r),
        (this.Eh = 0 | c),
        (this.El = 0 | o),
        (this.Fh = 0 | d),
        (this.Fl = 0 | h),
        (this.Gh = 0 | x),
        (this.Gl = 0 | f),
        (this.Hh = 0 | m),
        (this.Hl = 0 | u));
    }
    process(e, t) {
      for (let i = 0; i < 16; i++, t += 4)
        ((p[i] = e.getUint32(t)), (_[i] = e.getUint32((t += 4))));
      for (let e = 16; e < 80; e++) {
        let t = 0 | p[e - 15],
          i = 0 | _[e - 15],
          a = o.q(t, i, 1) ^ o.q(t, i, 8) ^ o.a(t, i, 7),
          s = o.h(t, i, 1) ^ o.h(t, i, 8) ^ o.I(t, i, 7),
          n = 0 | p[e - 2],
          l = 0 | _[e - 2],
          r = o.q(n, l, 19) ^ o.u(n, l, 61) ^ o.a(n, l, 6),
          c = o.h(n, l, 19) ^ o.N(n, l, 61) ^ o.I(n, l, 6),
          d = o.Z(s, c, _[e - 7], _[e - 16]),
          h = o.l(d, a, r, p[e - 7], p[e - 16]);
        ((p[e] = 0 | h), (_[e] = 0 | d));
      }
      let {
        Ah: i,
        Al: a,
        Bh: s,
        Bl: n,
        Ch: l,
        Cl: r,
        Dh: c,
        Dl: d,
        Eh: h,
        El: x,
        Fh: f,
        Fl: m,
        Gh: g,
        Gl: y,
        Hh: v,
        Hl: j,
      } = this;
      for (let e = 0; e < 80; e++) {
        let t = o.q(h, x, 14) ^ o.q(h, x, 18) ^ o.u(h, x, 41),
          k = o.h(h, x, 14) ^ o.h(h, x, 18) ^ o.N(h, x, 41),
          w = (h & f) ^ (~h & g),
          N = (x & m) ^ (~x & y),
          C = o.c(j, k, N, b[e], _[e]),
          A = o.p(C, v, t, w, u[e], p[e]),
          F = 0 | C,
          E = o.q(i, a, 28) ^ o.u(i, a, 34) ^ o.u(i, a, 39),
          S = o.h(i, a, 28) ^ o.N(i, a, 34) ^ o.N(i, a, 39),
          I = (i & s) ^ (i & l) ^ (s & l),
          B = (a & n) ^ (a & r) ^ (n & r);
        ((v = 0 | g),
          (j = 0 | y),
          (g = 0 | f),
          (y = 0 | m),
          (f = 0 | h),
          (m = 0 | x),
          ({ h: h, l: x } = o.s(0 | c, 0 | d, 0 | A, 0 | F)),
          (c = 0 | l),
          (d = 0 | r),
          (l = 0 | s),
          (r = 0 | n),
          (s = 0 | i),
          (n = 0 | a));
        let D = o.d(F, S, B);
        ((i = o.H(D, A, E, I)), (a = 0 | D));
      }
      (({ h: i, l: a } = o.s(0 | this.Ah, 0 | this.Al, 0 | i, 0 | a)),
        ({ h: s, l: n } = o.s(0 | this.Bh, 0 | this.Bl, 0 | s, 0 | n)),
        ({ h: l, l: r } = o.s(0 | this.Ch, 0 | this.Cl, 0 | l, 0 | r)),
        ({ h: c, l: d } = o.s(0 | this.Dh, 0 | this.Dl, 0 | c, 0 | d)),
        ({ h: h, l: x } = o.s(0 | this.Eh, 0 | this.El, 0 | h, 0 | x)),
        ({ h: f, l: m } = o.s(0 | this.Fh, 0 | this.Fl, 0 | f, 0 | m)),
        ({ h: g, l: y } = o.s(0 | this.Gh, 0 | this.Gl, 0 | g, 0 | y)),
        ({ h: v, l: j } = o.s(0 | this.Hh, 0 | this.Hl, 0 | v, 0 | j)),
        this.set(i, a, s, n, l, r, c, d, h, x, f, m, g, y, v, j));
    }
    roundClean() {
      (0, t.f)(p, _);
    }
    destroy() {
      ((0, t.f)(this.buffer),
        this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
    }
  }
  class y extends g {
    constructor() {
      (super(48),
        (this.Ah = 0 | r[0]),
        (this.Al = 0 | r[1]),
        (this.Bh = 0 | r[2]),
        (this.Bl = 0 | r[3]),
        (this.Ch = 0 | r[4]),
        (this.Cl = 0 | r[5]),
        (this.Dh = 0 | r[6]),
        (this.Dl = 0 | r[7]),
        (this.Eh = 0 | r[8]),
        (this.El = 0 | r[9]),
        (this.Fh = 0 | r[10]),
        (this.Fl = 0 | r[11]),
        (this.Gh = 0 | r[12]),
        (this.Gl = 0 | r[13]),
        (this.Hh = 0 | r[14]),
        (this.Hl = 0 | r[15]));
    }
  }
  let v = (0, t.O)(() => new x()),
    j = (0, t.O)(() => new f()),
    k = (0, t.O)(() => new g()),
    w = (0, t.O)(() => new y());
  e.s(
    ["h", 0, f, "i", 0, x, "z", 0, j, "E", 0, v, "u", 0, w, "s", 0, k],
    837474,
  );
};
