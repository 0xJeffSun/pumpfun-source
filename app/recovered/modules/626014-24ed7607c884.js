// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(882469),
    n = t.i(944445);
  let i = BigInt(0),
    s = BigInt(1),
    r = BigInt(2),
    o = BigInt(7),
    a = BigInt(256),
    u = BigInt(113),
    p = [],
    l = [],
    h = [];
  for (let t = 0, e = s, n = 1, f = 0; t < 24; t++) {
    (([n, f] = [f, (2 * n + 3 * f) % 5]),
      p.push(2 * (5 * f + n)),
      l.push((((t + 1) * (t + 2)) / 2) % 64));
    let c = i;
    for (let t = 0; t < 7; t++)
      (e = ((e << s) ^ ((e >> o) * u)) % a) & r &&
        (c ^= s << ((s << BigInt(t)) - s));
    h.push(c);
  }
  let f = (0, e.$)(h, !0),
    c = f[0],
    y = f[1],
    d = (t, n, i) => (i > 32 ? (0, e.v)(t, n, i) : (0, e.C)(t, n, i)),
    g = (t, n, i) => (i > 32 ? (0, e.L)(t, n, i) : (0, e.t)(t, n, i));
  class m extends n.B {
    constructor(t, e, i, s = !1, r = 24) {
      if (
        (super(),
        (this.pos = 0),
        (this.posOut = 0),
        (this.finished = !1),
        (this.destroyed = !1),
        (this.enableXOF = !1),
        (this.blockLen = t),
        (this.suffix = e),
        (this.outputLen = i),
        (this.enableXOF = s),
        (this.rounds = r),
        (0, n.N)(i),
        !(0 < t && t < 200))
      )
        throw Error("only keccak-f1600 function is supported");
      ((this.state = new Uint8Array(200)),
        (this.state32 = (0, n.b)(this.state)));
    }
    clone() {
      return this._cloneInto();
    }
    keccak() {
      ((0, n.o)(this.state32),
        (function (t, e = 24) {
          let i = new Uint32Array(10);
          for (let n = 24 - e; n < 24; n++) {
            for (let e = 0; e < 10; e++)
              i[e] = t[e] ^ t[e + 10] ^ t[e + 20] ^ t[e + 30] ^ t[e + 40];
            for (let e = 0; e < 10; e += 2) {
              let n = (e + 8) % 10,
                s = (e + 2) % 10,
                r = i[s],
                o = i[s + 1],
                a = d(r, o, 1) ^ i[n],
                u = g(r, o, 1) ^ i[n + 1];
              for (let n = 0; n < 50; n += 10)
                ((t[e + n] ^= a), (t[e + n + 1] ^= u));
            }
            let e = t[2],
              s = t[3];
            for (let n = 0; n < 24; n++) {
              let i = l[n],
                r = d(e, s, i),
                o = g(e, s, i),
                a = p[n];
              ((e = t[a]), (s = t[a + 1]), (t[a] = r), (t[a + 1] = o));
            }
            for (let e = 0; e < 50; e += 10) {
              for (let n = 0; n < 10; n++) i[n] = t[e + n];
              for (let n = 0; n < 10; n++)
                t[e + n] ^= ~i[(n + 2) % 10] & i[(n + 4) % 10];
            }
            ((t[0] ^= c[n]), (t[1] ^= y[n]));
          }
          (0, n.f)(i);
        })(this.state32, this.rounds),
        (0, n.o)(this.state32),
        (this.posOut = 0),
        (this.pos = 0));
    }
    update(t) {
      ((0, n.s)(this), (t = (0, n.D)(t)), (0, n.C)(t));
      let { blockLen: e, state: i } = this,
        s = t.length;
      for (let n = 0; n < s; ) {
        let r = Math.min(e - this.pos, s - n);
        for (let e = 0; e < r; e++) i[this.pos++] ^= t[n++];
        this.pos === e && this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished) return;
      this.finished = !0;
      let { state: t, suffix: e, pos: n, blockLen: i } = this;
      ((t[n] ^= e),
        (128 & e) != 0 && n === i - 1 && this.keccak(),
        (t[i - 1] ^= 128),
        this.keccak());
    }
    writeInto(t) {
      ((0, n.s)(this, !1), (0, n.C)(t), this.finish());
      let e = this.state,
        { blockLen: i } = this;
      for (let n = 0, s = t.length; n < s; ) {
        this.posOut >= i && this.keccak();
        let r = Math.min(i - this.posOut, s - n);
        (t.set(e.subarray(this.posOut, this.posOut + r), n),
          (this.posOut += r),
          (n += r));
      }
      return t;
    }
    xofInto(t) {
      if (!this.enableXOF) throw Error("XOF is not possible for this instance");
      return this.writeInto(t);
    }
    xof(t) {
      return ((0, n.N)(t), this.xofInto(new Uint8Array(t)));
    }
    digestInto(t) {
      if (((0, n.W)(t, this), this.finished))
        throw Error("digest() was already called");
      return (this.writeInto(t), this.destroy(), t);
    }
    digest() {
      return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
      ((this.destroyed = !0), (0, n.f)(this.state));
    }
    _cloneInto(t) {
      let {
        blockLen: e,
        suffix: n,
        outputLen: i,
        rounds: s,
        enableXOF: r,
      } = this;
      return (
        t || (t = new m(e, n, i, r, s)),
        t.state32.set(this.state32),
        (t.pos = this.pos),
        (t.posOut = this.posOut),
        (t.finished = this.finished),
        (t.rounds = s),
        (t.suffix = n),
        (t.outputLen = i),
        (t.enableXOF = r),
        (t.destroyed = this.destroyed),
        t
      );
    }
  }
  let b = (0, n.O)(() => new m(136, 1, 32));
  t.s(["f", 0, b]);
};
