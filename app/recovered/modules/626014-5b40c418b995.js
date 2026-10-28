// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(882469),
    n = e.i(944445);
  let r = BigInt(0),
    i = BigInt(1),
    o = BigInt(2),
    s = BigInt(7),
    a = BigInt(256),
    l = BigInt(113),
    u = [],
    c = [],
    f = [];
  for (let e = 0, t = i, n = 1, d = 0; e < 24; e++) {
    (([n, d] = [d, (2 * n + 3 * d) % 5]),
      u.push(2 * (5 * d + n)),
      c.push((((e + 1) * (e + 2)) / 2) % 64));
    let h = r;
    for (let e = 0; e < 7; e++)
      (t = ((t << i) ^ ((t >> s) * l)) % a) & o &&
        (h ^= i << ((i << BigInt(e)) - i));
    f.push(h);
  }
  let d = (0, t.$)(f, !0),
    h = d[0],
    p = d[1],
    g = (e, n, r) => (r > 32 ? (0, t.v)(e, n, r) : (0, t.C)(e, n, r)),
    m = (e, n, r) => (r > 32 ? (0, t.L)(e, n, r) : (0, t.t)(e, n, r));
  class y extends n.B {
    constructor(e, t, r, i = !1, o = 24) {
      if (
        (super(),
        (this.pos = 0),
        (this.posOut = 0),
        (this.finished = !1),
        (this.destroyed = !1),
        (this.enableXOF = !1),
        (this.blockLen = e),
        (this.suffix = t),
        (this.outputLen = r),
        (this.enableXOF = i),
        (this.rounds = o),
        (0, n.N)(r),
        !(0 < e && e < 200))
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
        (function (e, t = 24) {
          let r = new Uint32Array(10);
          for (let n = 24 - t; n < 24; n++) {
            for (let t = 0; t < 10; t++)
              r[t] = e[t] ^ e[t + 10] ^ e[t + 20] ^ e[t + 30] ^ e[t + 40];
            for (let t = 0; t < 10; t += 2) {
              let n = (t + 8) % 10,
                i = (t + 2) % 10,
                o = r[i],
                s = r[i + 1],
                a = g(o, s, 1) ^ r[n],
                l = m(o, s, 1) ^ r[n + 1];
              for (let n = 0; n < 50; n += 10)
                ((e[t + n] ^= a), (e[t + n + 1] ^= l));
            }
            let t = e[2],
              i = e[3];
            for (let n = 0; n < 24; n++) {
              let r = c[n],
                o = g(t, i, r),
                s = m(t, i, r),
                a = u[n];
              ((t = e[a]), (i = e[a + 1]), (e[a] = o), (e[a + 1] = s));
            }
            for (let t = 0; t < 50; t += 10) {
              for (let n = 0; n < 10; n++) r[n] = e[t + n];
              for (let n = 0; n < 10; n++)
                e[t + n] ^= ~r[(n + 2) % 10] & r[(n + 4) % 10];
            }
            ((e[0] ^= h[n]), (e[1] ^= p[n]));
          }
          (0, n.f)(r);
        })(this.state32, this.rounds),
        (0, n.o)(this.state32),
        (this.posOut = 0),
        (this.pos = 0));
    }
    update(e) {
      ((0, n.s)(this), (e = (0, n.D)(e)), (0, n.C)(e));
      let { blockLen: t, state: r } = this,
        i = e.length;
      for (let n = 0; n < i; ) {
        let o = Math.min(t - this.pos, i - n);
        for (let t = 0; t < o; t++) r[this.pos++] ^= e[n++];
        this.pos === t && this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished) return;
      this.finished = !0;
      let { state: e, suffix: t, pos: n, blockLen: r } = this;
      ((e[n] ^= t),
        (128 & t) != 0 && n === r - 1 && this.keccak(),
        (e[r - 1] ^= 128),
        this.keccak());
    }
    writeInto(e) {
      ((0, n.s)(this, !1), (0, n.C)(e), this.finish());
      let t = this.state,
        { blockLen: r } = this;
      for (let n = 0, i = e.length; n < i; ) {
        this.posOut >= r && this.keccak();
        let o = Math.min(r - this.posOut, i - n);
        (e.set(t.subarray(this.posOut, this.posOut + o), n),
          (this.posOut += o),
          (n += o));
      }
      return e;
    }
    xofInto(e) {
      if (!this.enableXOF) throw Error("XOF is not possible for this instance");
      return this.writeInto(e);
    }
    xof(e) {
      return ((0, n.N)(e), this.xofInto(new Uint8Array(e)));
    }
    digestInto(e) {
      if (((0, n.W)(e, this), this.finished))
        throw Error("digest() was already called");
      return (this.writeInto(e), this.destroy(), e);
    }
    digest() {
      return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
      ((this.destroyed = !0), (0, n.f)(this.state));
    }
    _cloneInto(e) {
      let {
        blockLen: t,
        suffix: n,
        outputLen: r,
        rounds: i,
        enableXOF: o,
      } = this;
      return (
        e || (e = new y(t, n, r, o, i)),
        e.state32.set(this.state32),
        (e.pos = this.pos),
        (e.posOut = this.posOut),
        (e.finished = this.finished),
        (e.rounds = i),
        (e.suffix = n),
        (e.outputLen = r),
        (e.enableXOF = o),
        (e.destroyed = this.destroyed),
        e
      );
    }
  }
  let b = (0, n.O)(() => new y(136, 1, 32));
  e.s(["f", 0, b]);
};
