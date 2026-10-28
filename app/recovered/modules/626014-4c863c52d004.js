// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(882469),
    r = e.i(944445);
  let n = BigInt(0),
    i = BigInt(1),
    o = BigInt(2),
    a = BigInt(7),
    s = BigInt(256),
    l = BigInt(113),
    c = [],
    u = [],
    d = [];
  for (let e = 0, t = i, r = 1, h = 0; e < 24; e++) {
    (([r, h] = [h, (2 * r + 3 * h) % 5]),
      c.push(2 * (5 * h + r)),
      u.push((((e + 1) * (e + 2)) / 2) % 64));
    let f = n;
    for (let e = 0; e < 7; e++)
      (t = ((t << i) ^ ((t >> a) * l)) % s) & o &&
        (f ^= i << ((i << BigInt(e)) - i));
    d.push(f);
  }
  let h = (0, t.$)(d, !0),
    f = h[0],
    p = h[1],
    E = (e, r, n) => (n > 32 ? (0, t.v)(e, r, n) : (0, t.C)(e, r, n)),
    y = (e, r, n) => (n > 32 ? (0, t.L)(e, r, n) : (0, t.t)(e, r, n));
  class m extends r.B {
    constructor(e, t, n, i = !1, o = 24) {
      if (
        (super(),
        (this.pos = 0),
        (this.posOut = 0),
        (this.finished = !1),
        (this.destroyed = !1),
        (this.enableXOF = !1),
        (this.blockLen = e),
        (this.suffix = t),
        (this.outputLen = n),
        (this.enableXOF = i),
        (this.rounds = o),
        (0, r.N)(n),
        !(0 < e && e < 200))
      )
        throw Error("only keccak-f1600 function is supported");
      ((this.state = new Uint8Array(200)),
        (this.state32 = (0, r.b)(this.state)));
    }
    clone() {
      return this._cloneInto();
    }
    keccak() {
      ((0, r.o)(this.state32),
        (function (e, t = 24) {
          let n = new Uint32Array(10);
          for (let r = 24 - t; r < 24; r++) {
            for (let t = 0; t < 10; t++)
              n[t] = e[t] ^ e[t + 10] ^ e[t + 20] ^ e[t + 30] ^ e[t + 40];
            for (let t = 0; t < 10; t += 2) {
              let r = (t + 8) % 10,
                i = (t + 2) % 10,
                o = n[i],
                a = n[i + 1],
                s = E(o, a, 1) ^ n[r],
                l = y(o, a, 1) ^ n[r + 1];
              for (let r = 0; r < 50; r += 10)
                ((e[t + r] ^= s), (e[t + r + 1] ^= l));
            }
            let t = e[2],
              i = e[3];
            for (let r = 0; r < 24; r++) {
              let n = u[r],
                o = E(t, i, n),
                a = y(t, i, n),
                s = c[r];
              ((t = e[s]), (i = e[s + 1]), (e[s] = o), (e[s + 1] = a));
            }
            for (let t = 0; t < 50; t += 10) {
              for (let r = 0; r < 10; r++) n[r] = e[t + r];
              for (let r = 0; r < 10; r++)
                e[t + r] ^= ~n[(r + 2) % 10] & n[(r + 4) % 10];
            }
            ((e[0] ^= f[r]), (e[1] ^= p[r]));
          }
          (0, r.f)(n);
        })(this.state32, this.rounds),
        (0, r.o)(this.state32),
        (this.posOut = 0),
        (this.pos = 0));
    }
    update(e) {
      ((0, r.s)(this), (e = (0, r.D)(e)), (0, r.C)(e));
      let { blockLen: t, state: n } = this,
        i = e.length;
      for (let r = 0; r < i; ) {
        let o = Math.min(t - this.pos, i - r);
        for (let t = 0; t < o; t++) n[this.pos++] ^= e[r++];
        this.pos === t && this.keccak();
      }
      return this;
    }
    finish() {
      if (this.finished) return;
      this.finished = !0;
      let { state: e, suffix: t, pos: r, blockLen: n } = this;
      ((e[r] ^= t),
        (128 & t) != 0 && r === n - 1 && this.keccak(),
        (e[n - 1] ^= 128),
        this.keccak());
    }
    writeInto(e) {
      ((0, r.s)(this, !1), (0, r.C)(e), this.finish());
      let t = this.state,
        { blockLen: n } = this;
      for (let r = 0, i = e.length; r < i; ) {
        this.posOut >= n && this.keccak();
        let o = Math.min(n - this.posOut, i - r);
        (e.set(t.subarray(this.posOut, this.posOut + o), r),
          (this.posOut += o),
          (r += o));
      }
      return e;
    }
    xofInto(e) {
      if (!this.enableXOF) throw Error("XOF is not possible for this instance");
      return this.writeInto(e);
    }
    xof(e) {
      return ((0, r.N)(e), this.xofInto(new Uint8Array(e)));
    }
    digestInto(e) {
      if (((0, r.W)(e, this), this.finished))
        throw Error("digest() was already called");
      return (this.writeInto(e), this.destroy(), e);
    }
    digest() {
      return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
      ((this.destroyed = !0), (0, r.f)(this.state));
    }
    _cloneInto(e) {
      let {
        blockLen: t,
        suffix: r,
        outputLen: n,
        rounds: i,
        enableXOF: o,
      } = this;
      return (
        e || (e = new m(t, r, n, o, i)),
        e.state32.set(this.state32),
        (e.pos = this.pos),
        (e.posOut = this.posOut),
        (e.finished = this.finished),
        (e.rounds = i),
        (e.suffix = r),
        (e.outputLen = n),
        (e.enableXOF = o),
        (e.destroyed = this.destroyed),
        e
      );
    }
  }
  let C = (0, r.O)(() => new m(136, 1, 32));
  e.s(["f", 0, C]);
};
