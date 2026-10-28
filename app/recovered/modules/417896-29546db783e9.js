// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(944445);
  class r extends t.B {
    constructor(e, r) {
      (super(), (this.finished = !1), (this.destroyed = !1), (0, t.v)(e));
      let n = (0, t.D)(r);
      if (((this.iHash = e.create()), "function" != typeof this.iHash.update))
        throw Error("Expected instance of class which extends utils.Hash");
      ((this.blockLen = this.iHash.blockLen),
        (this.outputLen = this.iHash.outputLen));
      let i = this.blockLen,
        s = new Uint8Array(i);
      s.set(n.length > i ? e.create().update(n).digest() : n);
      for (let e = 0; e < s.length; e++) s[e] ^= 54;
      (this.iHash.update(s), (this.oHash = e.create()));
      for (let e = 0; e < s.length; e++) s[e] ^= 106;
      (this.oHash.update(s), (0, t.f)(s));
    }
    update(e) {
      return ((0, t.s)(this), this.iHash.update(e), this);
    }
    digestInto(e) {
      ((0, t.s)(this),
        (0, t.C)(e, this.outputLen),
        (this.finished = !0),
        this.iHash.digestInto(e),
        this.oHash.update(e),
        this.oHash.digestInto(e),
        this.destroy());
    }
    digest() {
      let e = new Uint8Array(this.oHash.outputLen);
      return (this.digestInto(e), e);
    }
    _cloneInto(e) {
      e || (e = Object.create(Object.getPrototypeOf(this), {}));
      let {
        oHash: t,
        iHash: r,
        finished: n,
        destroyed: i,
        blockLen: s,
        outputLen: a,
      } = this;
      return (
        (e.finished = n),
        (e.destroyed = i),
        (e.blockLen = s),
        (e.outputLen = a),
        (e.oHash = t._cloneInto(e.oHash)),
        (e.iHash = r._cloneInto(e.iHash)),
        e
      );
    }
    clone() {
      return this._cloneInto();
    }
    destroy() {
      ((this.destroyed = !0), this.oHash.destroy(), this.iHash.destroy());
    }
  }
  let n = (e, t, n) => new r(e, t).update(n).digest();
  ((n.create = (e, t) => new r(e, t)), e.s(["f", 0, n]));
};
