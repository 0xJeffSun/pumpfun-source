// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(944445);
  function r(e, t, r) {
    return (e & t) ^ (~e & r);
  }
  function n(e, t, r) {
    return (e & t) ^ (e & r) ^ (t & r);
  }
  class i extends t.B {
    constructor(e, r, n, i) {
      (super(),
        (this.finished = !1),
        (this.length = 0),
        (this.pos = 0),
        (this.destroyed = !1),
        (this.blockLen = e),
        (this.outputLen = r),
        (this.padOffset = n),
        (this.isLE = i),
        (this.buffer = new Uint8Array(e)),
        (this.view = (0, t.y)(this.buffer)));
    }
    update(e) {
      ((0, t.s)(this), (e = (0, t.D)(e)), (0, t.C)(e));
      let { view: r, buffer: n, blockLen: i } = this,
        s = e.length;
      for (let a = 0; a < s; ) {
        let o = Math.min(i - this.pos, s - a);
        if (o === i) {
          let r = (0, t.y)(e);
          for (; i <= s - a; a += i) this.process(r, a);
          continue;
        }
        (n.set(e.subarray(a, a + o), this.pos),
          (this.pos += o),
          (a += o),
          this.pos === i && (this.process(r, 0), (this.pos = 0)));
      }
      return ((this.length += e.length), this.roundClean(), this);
    }
    digestInto(e) {
      ((0, t.s)(this), (0, t.W)(e, this), (this.finished = !0));
      let { buffer: r, view: n, blockLen: i, isLE: s } = this,
        { pos: a } = this;
      ((r[a++] = 128),
        (0, t.f)(this.buffer.subarray(a)),
        this.padOffset > i - a && (this.process(n, 0), (a = 0)));
      for (let e = a; e < i; e++) r[e] = 0;
      (!(function (e, t, r, n) {
        if ("function" == typeof e.setBigUint64) return e.setBigUint64(t, r, n);
        let i = BigInt(32),
          s = BigInt(0xffffffff),
          a = Number((r >> i) & s),
          o = Number(r & s),
          u = 4 * !!n,
          c = 4 * !n;
        (e.setUint32(t + u, a, n), e.setUint32(t + c, o, n));
      })(n, i - 8, BigInt(8 * this.length), s),
        this.process(n, 0));
      let o = (0, t.y)(e),
        u = this.outputLen;
      if (u % 4) throw Error("_sha2: outputLen should be aligned to 32bit");
      let c = u / 4,
        l = this.get();
      if (c > l.length) throw Error("_sha2: outputLen bigger than state");
      for (let e = 0; e < c; e++) o.setUint32(4 * e, l[e], s);
    }
    digest() {
      let { buffer: e, outputLen: t } = this;
      this.digestInto(e);
      let r = e.slice(0, t);
      return (this.destroy(), r);
    }
    _cloneInto(e) {
      (e || (e = new this.constructor()), e.set(...this.get()));
      let {
        blockLen: t,
        buffer: r,
        length: n,
        finished: i,
        destroyed: s,
        pos: a,
      } = this;
      return (
        (e.destroyed = s),
        (e.finished = i),
        (e.length = n),
        (e.pos = a),
        n % t && e.buffer.set(r),
        e
      );
    }
    clone() {
      return this._cloneInto();
    }
  }
  let s = Uint32Array.from([
      0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c,
      0x1f83d9ab, 0x5be0cd19,
    ]),
    a = Uint32Array.from([
      0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939, 0xffc00b31, 0x68581511,
      0x64f98fa7, 0xbefa4fa4,
    ]),
    o = Uint32Array.from([
      0xcbbb9d5d, 0xc1059ed8, 0x629a292a, 0x367cd507, 0x9159015a, 0x3070dd17,
      0x152fecd8, 0xf70e5939, 0x67332667, 0xffc00b31, 0x8eb44a87, 0x68581511,
      0xdb0c2e0d, 0x64f98fa7, 0x47b5481d, 0xbefa4fa4,
    ]),
    u = Uint32Array.from([
      0x6a09e667, 0xf3bcc908, 0xbb67ae85, 0x84caa73b, 0x3c6ef372, 0xfe94f82b,
      0xa54ff53a, 0x5f1d36f1, 0x510e527f, 0xade682d1, 0x9b05688c, 0x2b3e6c1f,
      0x1f83d9ab, 0xfb41bd6b, 0x5be0cd19, 0x137e2179,
    ]);
  e.s(
    [
      "F",
      0,
      r,
      "u",
      0,
      i,
      "O",
      0,
      n,
      "h",
      0,
      a,
      "n",
      0,
      s,
      "D",
      0,
      o,
      "s",
      0,
      u,
    ],
    853197,
  );
  var c = e.i(882469);
  let l = Uint32Array.from([
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
    f = new Uint32Array(64);
  class d extends i {
    constructor(e = 32) {
      (super(64, e, 8, !1),
        (this.A = 0 | s[0]),
        (this.B = 0 | s[1]),
        (this.C = 0 | s[2]),
        (this.D = 0 | s[3]),
        (this.E = 0 | s[4]),
        (this.F = 0 | s[5]),
        (this.G = 0 | s[6]),
        (this.H = 0 | s[7]));
    }
    get() {
      let { A: e, B: t, C: r, D: n, E: i, F: s, G: a, H: o } = this;
      return [e, t, r, n, i, s, a, o];
    }
    set(e, t, r, n, i, s, a, o) {
      ((this.A = 0 | e),
        (this.B = 0 | t),
        (this.C = 0 | r),
        (this.D = 0 | n),
        (this.E = 0 | i),
        (this.F = 0 | s),
        (this.G = 0 | a),
        (this.H = 0 | o));
    }
    process(e, i) {
      for (let t = 0; t < 16; t++, i += 4) f[t] = e.getUint32(i, !1);
      for (let e = 16; e < 64; e++) {
        let r = f[e - 15],
          n = f[e - 2],
          i = (0, t.M)(r, 7) ^ (0, t.M)(r, 18) ^ (r >>> 3),
          s = (0, t.M)(n, 17) ^ (0, t.M)(n, 19) ^ (n >>> 10);
        f[e] = (s + f[e - 7] + i + f[e - 16]) | 0;
      }
      let { A: s, B: a, C: o, D: u, E: c, F: d, G: h, H: p } = this;
      for (let e = 0; e < 64; e++) {
        let i =
            (p +
              ((0, t.M)(c, 6) ^ (0, t.M)(c, 11) ^ (0, t.M)(c, 25)) +
              r(c, d, h) +
              l[e] +
              f[e]) |
            0,
          b =
            (((0, t.M)(s, 2) ^ (0, t.M)(s, 13) ^ (0, t.M)(s, 22)) +
              n(s, a, o)) |
            0;
        ((p = h),
          (h = d),
          (d = c),
          (c = (u + i) | 0),
          (u = o),
          (o = a),
          (a = s),
          (s = (i + b) | 0));
      }
      ((s = (s + this.A) | 0),
        (a = (a + this.B) | 0),
        (o = (o + this.C) | 0),
        (u = (u + this.D) | 0),
        (c = (c + this.E) | 0),
        (d = (d + this.F) | 0),
        (h = (h + this.G) | 0),
        (p = (p + this.H) | 0),
        this.set(s, a, o, u, c, d, h, p));
    }
    roundClean() {
      (0, t.f)(f);
    }
    destroy() {
      (this.set(0, 0, 0, 0, 0, 0, 0, 0), (0, t.f)(this.buffer));
    }
  }
  class h extends d {
    constructor() {
      (super(28),
        (this.A = 0 | a[0]),
        (this.B = 0 | a[1]),
        (this.C = 0 | a[2]),
        (this.D = 0 | a[3]),
        (this.E = 0 | a[4]),
        (this.F = 0 | a[5]),
        (this.G = 0 | a[6]),
        (this.H = 0 | a[7]));
    }
  }
  let p = c.$(
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
    b = p[0],
    y = p[1],
    m = new Uint32Array(80),
    x = new Uint32Array(80);
  class g extends i {
    constructor(e = 64) {
      (super(128, e, 16, !1),
        (this.Ah = 0 | u[0]),
        (this.Al = 0 | u[1]),
        (this.Bh = 0 | u[2]),
        (this.Bl = 0 | u[3]),
        (this.Ch = 0 | u[4]),
        (this.Cl = 0 | u[5]),
        (this.Dh = 0 | u[6]),
        (this.Dl = 0 | u[7]),
        (this.Eh = 0 | u[8]),
        (this.El = 0 | u[9]),
        (this.Fh = 0 | u[10]),
        (this.Fl = 0 | u[11]),
        (this.Gh = 0 | u[12]),
        (this.Gl = 0 | u[13]),
        (this.Hh = 0 | u[14]),
        (this.Hl = 0 | u[15]));
    }
    get() {
      let {
        Ah: e,
        Al: t,
        Bh: r,
        Bl: n,
        Ch: i,
        Cl: s,
        Dh: a,
        Dl: o,
        Eh: u,
        El: c,
        Fh: l,
        Fl: f,
        Gh: d,
        Gl: h,
        Hh: p,
        Hl: b,
      } = this;
      return [e, t, r, n, i, s, a, o, u, c, l, f, d, h, p, b];
    }
    set(e, t, r, n, i, s, a, o, u, c, l, f, d, h, p, b) {
      ((this.Ah = 0 | e),
        (this.Al = 0 | t),
        (this.Bh = 0 | r),
        (this.Bl = 0 | n),
        (this.Ch = 0 | i),
        (this.Cl = 0 | s),
        (this.Dh = 0 | a),
        (this.Dl = 0 | o),
        (this.Eh = 0 | u),
        (this.El = 0 | c),
        (this.Fh = 0 | l),
        (this.Fl = 0 | f),
        (this.Gh = 0 | d),
        (this.Gl = 0 | h),
        (this.Hh = 0 | p),
        (this.Hl = 0 | b));
    }
    process(e, t) {
      for (let r = 0; r < 16; r++, t += 4)
        ((m[r] = e.getUint32(t)), (x[r] = e.getUint32((t += 4))));
      for (let e = 16; e < 80; e++) {
        let t = 0 | m[e - 15],
          r = 0 | x[e - 15],
          n = c.q(t, r, 1) ^ c.q(t, r, 8) ^ c.a(t, r, 7),
          i = c.h(t, r, 1) ^ c.h(t, r, 8) ^ c.I(t, r, 7),
          s = 0 | m[e - 2],
          a = 0 | x[e - 2],
          o = c.q(s, a, 19) ^ c.u(s, a, 61) ^ c.a(s, a, 6),
          u = c.h(s, a, 19) ^ c.N(s, a, 61) ^ c.I(s, a, 6),
          l = c.Z(i, u, x[e - 7], x[e - 16]),
          f = c.l(l, n, o, m[e - 7], m[e - 16]);
        ((m[e] = 0 | f), (x[e] = 0 | l));
      }
      let {
        Ah: r,
        Al: n,
        Bh: i,
        Bl: s,
        Ch: a,
        Cl: o,
        Dh: u,
        Dl: l,
        Eh: f,
        El: d,
        Fh: h,
        Fl: p,
        Gh: g,
        Gl: v,
        Hh: w,
        Hl: $,
      } = this;
      for (let e = 0; e < 80; e++) {
        let t = c.q(f, d, 14) ^ c.q(f, d, 18) ^ c.u(f, d, 41),
          A = c.h(f, d, 14) ^ c.h(f, d, 18) ^ c.N(f, d, 41),
          I = (f & h) ^ (~f & g),
          E = (d & p) ^ (~d & v),
          M = c.c($, A, E, y[e], x[e]),
          B = c.p(M, w, t, I, b[e], m[e]),
          P = 0 | M,
          O = c.q(r, n, 28) ^ c.u(r, n, 34) ^ c.u(r, n, 39),
          S = c.h(r, n, 28) ^ c.N(r, n, 34) ^ c.N(r, n, 39),
          k = (r & i) ^ (r & a) ^ (i & a),
          U = (n & s) ^ (n & o) ^ (s & o);
        ((w = 0 | g),
          ($ = 0 | v),
          (g = 0 | h),
          (v = 0 | p),
          (h = 0 | f),
          (p = 0 | d),
          ({ h: f, l: d } = c.s(0 | u, 0 | l, 0 | B, 0 | P)),
          (u = 0 | a),
          (l = 0 | o),
          (a = 0 | i),
          (o = 0 | s),
          (i = 0 | r),
          (s = 0 | n));
        let N = c.d(P, S, U);
        ((r = c.H(N, B, O, k)), (n = 0 | N));
      }
      (({ h: r, l: n } = c.s(0 | this.Ah, 0 | this.Al, 0 | r, 0 | n)),
        ({ h: i, l: s } = c.s(0 | this.Bh, 0 | this.Bl, 0 | i, 0 | s)),
        ({ h: a, l: o } = c.s(0 | this.Ch, 0 | this.Cl, 0 | a, 0 | o)),
        ({ h: u, l: l } = c.s(0 | this.Dh, 0 | this.Dl, 0 | u, 0 | l)),
        ({ h: f, l: d } = c.s(0 | this.Eh, 0 | this.El, 0 | f, 0 | d)),
        ({ h: h, l: p } = c.s(0 | this.Fh, 0 | this.Fl, 0 | h, 0 | p)),
        ({ h: g, l: v } = c.s(0 | this.Gh, 0 | this.Gl, 0 | g, 0 | v)),
        ({ h: w, l: $ } = c.s(0 | this.Hh, 0 | this.Hl, 0 | w, 0 | $)),
        this.set(r, n, i, s, a, o, u, l, f, d, h, p, g, v, w, $));
    }
    roundClean() {
      (0, t.f)(m, x);
    }
    destroy() {
      ((0, t.f)(this.buffer),
        this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
    }
  }
  class v extends g {
    constructor() {
      (super(48),
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
  }
  let w = (0, t.O)(() => new d()),
    $ = (0, t.O)(() => new h()),
    A = (0, t.O)(() => new g()),
    I = (0, t.O)(() => new v());
  e.s(
    ["h", 0, h, "i", 0, d, "z", 0, $, "E", 0, w, "u", 0, I, "s", 0, A],
    837474,
  );
};
