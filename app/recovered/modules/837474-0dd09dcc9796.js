// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(944445);
  function i(e, t, i) {
    return (e & t) ^ (~e & i);
  }
  function s(e, t, i) {
    return (e & t) ^ (e & i) ^ (t & i);
  }
  class a extends t.B {
    constructor(e, i, s, a) {
      (super(),
        (this.finished = !1),
        (this.length = 0),
        (this.pos = 0),
        (this.destroyed = !1),
        (this.blockLen = e),
        (this.outputLen = i),
        (this.padOffset = s),
        (this.isLE = a),
        (this.buffer = new Uint8Array(e)),
        (this.view = (0, t.y)(this.buffer)));
    }
    update(e) {
      ((0, t.s)(this), (e = (0, t.D)(e)), (0, t.C)(e));
      let { view: i, buffer: s, blockLen: a } = this,
        r = e.length;
      for (let n = 0; n < r; ) {
        let l = Math.min(a - this.pos, r - n);
        if (l === a) {
          let i = (0, t.y)(e);
          for (; a <= r - n; n += a) this.process(i, n);
          continue;
        }
        (s.set(e.subarray(n, n + l), this.pos),
          (this.pos += l),
          (n += l),
          this.pos === a && (this.process(i, 0), (this.pos = 0)));
      }
      return ((this.length += e.length), this.roundClean(), this);
    }
    digestInto(e) {
      ((0, t.s)(this), (0, t.W)(e, this), (this.finished = !0));
      let { buffer: i, view: s, blockLen: a, isLE: r } = this,
        { pos: n } = this;
      ((i[n++] = 128),
        (0, t.f)(this.buffer.subarray(n)),
        this.padOffset > a - n && (this.process(s, 0), (n = 0)));
      for (let e = n; e < a; e++) i[e] = 0;
      (!(function (e, t, i, s) {
        if ("function" == typeof e.setBigUint64) return e.setBigUint64(t, i, s);
        let a = BigInt(32),
          r = BigInt(0xffffffff),
          n = Number((i >> a) & r),
          l = Number(i & r),
          o = 4 * !!s,
          c = 4 * !s;
        (e.setUint32(t + o, n, s), e.setUint32(t + c, l, s));
      })(s, a - 8, BigInt(8 * this.length), r),
        this.process(s, 0));
      let l = (0, t.y)(e),
        o = this.outputLen;
      if (o % 4) throw Error("_sha2: outputLen should be aligned to 32bit");
      let c = o / 4,
        d = this.get();
      if (c > d.length) throw Error("_sha2: outputLen bigger than state");
      for (let e = 0; e < c; e++) l.setUint32(4 * e, d[e], r);
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
        length: s,
        finished: a,
        destroyed: r,
        pos: n,
      } = this;
      return (
        (e.destroyed = r),
        (e.finished = a),
        (e.length = s),
        (e.pos = n),
        s % t && e.buffer.set(i),
        e
      );
    }
    clone() {
      return this._cloneInto();
    }
  }
  let r = Uint32Array.from([
      0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c,
      0x1f83d9ab, 0x5be0cd19,
    ]),
    n = Uint32Array.from([
      0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939, 0xffc00b31, 0x68581511,
      0x64f98fa7, 0xbefa4fa4,
    ]),
    l = Uint32Array.from([
      0xcbbb9d5d, 0xc1059ed8, 0x629a292a, 0x367cd507, 0x9159015a, 0x3070dd17,
      0x152fecd8, 0xf70e5939, 0x67332667, 0xffc00b31, 0x8eb44a87, 0x68581511,
      0xdb0c2e0d, 0x64f98fa7, 0x47b5481d, 0xbefa4fa4,
    ]),
    o = Uint32Array.from([
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
      a,
      "O",
      0,
      s,
      "h",
      0,
      n,
      "n",
      0,
      r,
      "D",
      0,
      l,
      "s",
      0,
      o,
    ],
    853197,
  );
  var c = e.i(882469);
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
    x = new Uint32Array(64);
  class h extends a {
    constructor(e = 32) {
      (super(64, e, 8, !1),
        (this.A = 0 | r[0]),
        (this.B = 0 | r[1]),
        (this.C = 0 | r[2]),
        (this.D = 0 | r[3]),
        (this.E = 0 | r[4]),
        (this.F = 0 | r[5]),
        (this.G = 0 | r[6]),
        (this.H = 0 | r[7]));
    }
    get() {
      let { A: e, B: t, C: i, D: s, E: a, F: r, G: n, H: l } = this;
      return [e, t, i, s, a, r, n, l];
    }
    set(e, t, i, s, a, r, n, l) {
      ((this.A = 0 | e),
        (this.B = 0 | t),
        (this.C = 0 | i),
        (this.D = 0 | s),
        (this.E = 0 | a),
        (this.F = 0 | r),
        (this.G = 0 | n),
        (this.H = 0 | l));
    }
    process(e, a) {
      for (let t = 0; t < 16; t++, a += 4) x[t] = e.getUint32(a, !1);
      for (let e = 16; e < 64; e++) {
        let i = x[e - 15],
          s = x[e - 2],
          a = (0, t.M)(i, 7) ^ (0, t.M)(i, 18) ^ (i >>> 3),
          r = (0, t.M)(s, 17) ^ (0, t.M)(s, 19) ^ (s >>> 10);
        x[e] = (r + x[e - 7] + a + x[e - 16]) | 0;
      }
      let { A: r, B: n, C: l, D: o, E: c, F: h, G: u, H: f } = this;
      for (let e = 0; e < 64; e++) {
        let a =
            (f +
              ((0, t.M)(c, 6) ^ (0, t.M)(c, 11) ^ (0, t.M)(c, 25)) +
              i(c, h, u) +
              d[e] +
              x[e]) |
            0,
          b =
            (((0, t.M)(r, 2) ^ (0, t.M)(r, 13) ^ (0, t.M)(r, 22)) +
              s(r, n, l)) |
            0;
        ((f = u),
          (u = h),
          (h = c),
          (c = (o + a) | 0),
          (o = l),
          (l = n),
          (n = r),
          (r = (a + b) | 0));
      }
      ((r = (r + this.A) | 0),
        (n = (n + this.B) | 0),
        (l = (l + this.C) | 0),
        (o = (o + this.D) | 0),
        (c = (c + this.E) | 0),
        (h = (h + this.F) | 0),
        (u = (u + this.G) | 0),
        (f = (f + this.H) | 0),
        this.set(r, n, l, o, c, h, u, f));
    }
    roundClean() {
      (0, t.f)(x);
    }
    destroy() {
      (this.set(0, 0, 0, 0, 0, 0, 0, 0), (0, t.f)(this.buffer));
    }
  }
  class u extends h {
    constructor() {
      (super(28),
        (this.A = 0 | n[0]),
        (this.B = 0 | n[1]),
        (this.C = 0 | n[2]),
        (this.D = 0 | n[3]),
        (this.E = 0 | n[4]),
        (this.F = 0 | n[5]),
        (this.G = 0 | n[6]),
        (this.H = 0 | n[7]));
    }
  }
  let f = c.$(
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
    b = f[0],
    p = f[1],
    m = new Uint32Array(80),
    y = new Uint32Array(80);
  class v extends a {
    constructor(e = 64) {
      (super(128, e, 16, !1),
        (this.Ah = 0 | o[0]),
        (this.Al = 0 | o[1]),
        (this.Bh = 0 | o[2]),
        (this.Bl = 0 | o[3]),
        (this.Ch = 0 | o[4]),
        (this.Cl = 0 | o[5]),
        (this.Dh = 0 | o[6]),
        (this.Dl = 0 | o[7]),
        (this.Eh = 0 | o[8]),
        (this.El = 0 | o[9]),
        (this.Fh = 0 | o[10]),
        (this.Fl = 0 | o[11]),
        (this.Gh = 0 | o[12]),
        (this.Gl = 0 | o[13]),
        (this.Hh = 0 | o[14]),
        (this.Hl = 0 | o[15]));
    }
    get() {
      let {
        Ah: e,
        Al: t,
        Bh: i,
        Bl: s,
        Ch: a,
        Cl: r,
        Dh: n,
        Dl: l,
        Eh: o,
        El: c,
        Fh: d,
        Fl: x,
        Gh: h,
        Gl: u,
        Hh: f,
        Hl: b,
      } = this;
      return [e, t, i, s, a, r, n, l, o, c, d, x, h, u, f, b];
    }
    set(e, t, i, s, a, r, n, l, o, c, d, x, h, u, f, b) {
      ((this.Ah = 0 | e),
        (this.Al = 0 | t),
        (this.Bh = 0 | i),
        (this.Bl = 0 | s),
        (this.Ch = 0 | a),
        (this.Cl = 0 | r),
        (this.Dh = 0 | n),
        (this.Dl = 0 | l),
        (this.Eh = 0 | o),
        (this.El = 0 | c),
        (this.Fh = 0 | d),
        (this.Fl = 0 | x),
        (this.Gh = 0 | h),
        (this.Gl = 0 | u),
        (this.Hh = 0 | f),
        (this.Hl = 0 | b));
    }
    process(e, t) {
      for (let i = 0; i < 16; i++, t += 4)
        ((m[i] = e.getUint32(t)), (y[i] = e.getUint32((t += 4))));
      for (let e = 16; e < 80; e++) {
        let t = 0 | m[e - 15],
          i = 0 | y[e - 15],
          s = c.q(t, i, 1) ^ c.q(t, i, 8) ^ c.a(t, i, 7),
          a = c.h(t, i, 1) ^ c.h(t, i, 8) ^ c.I(t, i, 7),
          r = 0 | m[e - 2],
          n = 0 | y[e - 2],
          l = c.q(r, n, 19) ^ c.u(r, n, 61) ^ c.a(r, n, 6),
          o = c.h(r, n, 19) ^ c.N(r, n, 61) ^ c.I(r, n, 6),
          d = c.Z(a, o, y[e - 7], y[e - 16]),
          x = c.l(d, s, l, m[e - 7], m[e - 16]);
        ((m[e] = 0 | x), (y[e] = 0 | d));
      }
      let {
        Ah: i,
        Al: s,
        Bh: a,
        Bl: r,
        Ch: n,
        Cl: l,
        Dh: o,
        Dl: d,
        Eh: x,
        El: h,
        Fh: u,
        Fl: f,
        Gh: v,
        Gl: g,
        Hh: w,
        Hl: _,
      } = this;
      for (let e = 0; e < 80; e++) {
        let t = c.q(x, h, 14) ^ c.q(x, h, 18) ^ c.u(x, h, 41),
          N = c.h(x, h, 14) ^ c.h(x, h, 18) ^ c.N(x, h, 41),
          A = (x & u) ^ (~x & v),
          I = (h & f) ^ (~h & g),
          k = c.c(_, N, I, p[e], y[e]),
          j = c.p(k, w, t, A, b[e], m[e]),
          S = 0 | k,
          $ = c.q(i, s, 28) ^ c.u(i, s, 34) ^ c.u(i, s, 39),
          C = c.h(i, s, 28) ^ c.N(i, s, 34) ^ c.N(i, s, 39),
          U = (i & a) ^ (i & n) ^ (a & n),
          E = (s & r) ^ (s & l) ^ (r & l);
        ((w = 0 | v),
          (_ = 0 | g),
          (v = 0 | u),
          (g = 0 | f),
          (u = 0 | x),
          (f = 0 | h),
          ({ h: x, l: h } = c.s(0 | o, 0 | d, 0 | j, 0 | S)),
          (o = 0 | n),
          (d = 0 | l),
          (n = 0 | a),
          (l = 0 | r),
          (a = 0 | i),
          (r = 0 | s));
        let F = c.d(S, C, E);
        ((i = c.H(F, j, $, U)), (s = 0 | F));
      }
      (({ h: i, l: s } = c.s(0 | this.Ah, 0 | this.Al, 0 | i, 0 | s)),
        ({ h: a, l: r } = c.s(0 | this.Bh, 0 | this.Bl, 0 | a, 0 | r)),
        ({ h: n, l: l } = c.s(0 | this.Ch, 0 | this.Cl, 0 | n, 0 | l)),
        ({ h: o, l: d } = c.s(0 | this.Dh, 0 | this.Dl, 0 | o, 0 | d)),
        ({ h: x, l: h } = c.s(0 | this.Eh, 0 | this.El, 0 | x, 0 | h)),
        ({ h: u, l: f } = c.s(0 | this.Fh, 0 | this.Fl, 0 | u, 0 | f)),
        ({ h: v, l: g } = c.s(0 | this.Gh, 0 | this.Gl, 0 | v, 0 | g)),
        ({ h: w, l: _ } = c.s(0 | this.Hh, 0 | this.Hl, 0 | w, 0 | _)),
        this.set(i, s, a, r, n, l, o, d, x, h, u, f, v, g, w, _));
    }
    roundClean() {
      (0, t.f)(m, y);
    }
    destroy() {
      ((0, t.f)(this.buffer),
        this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
    }
  }
  class g extends v {
    constructor() {
      (super(48),
        (this.Ah = 0 | l[0]),
        (this.Al = 0 | l[1]),
        (this.Bh = 0 | l[2]),
        (this.Bl = 0 | l[3]),
        (this.Ch = 0 | l[4]),
        (this.Cl = 0 | l[5]),
        (this.Dh = 0 | l[6]),
        (this.Dl = 0 | l[7]),
        (this.Eh = 0 | l[8]),
        (this.El = 0 | l[9]),
        (this.Fh = 0 | l[10]),
        (this.Fl = 0 | l[11]),
        (this.Gh = 0 | l[12]),
        (this.Gl = 0 | l[13]),
        (this.Hh = 0 | l[14]),
        (this.Hl = 0 | l[15]));
    }
  }
  let w = (0, t.O)(() => new h()),
    _ = (0, t.O)(() => new u()),
    N = (0, t.O)(() => new v()),
    A = (0, t.O)(() => new g());
  e.s(
    ["h", 0, u, "i", 0, h, "z", 0, _, "E", 0, w, "u", 0, A, "s", 0, N],
    837474,
  );
};
