// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  class e extends Map {
    constructor(t) {
      (super(),
        Object.defineProperty(this, "maxSize", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.maxSize = t));
    }
    get(t) {
      let e = super.get(t);
      return (
        super.has(t) && void 0 !== e && (this.delete(t), super.set(t, e)),
        e
      );
    }
    set(t, e) {
      if ((super.set(t, e), this.maxSize && this.size > this.maxSize)) {
        let t = this.keys().next().value;
        t && this.delete(t);
      }
      return this;
    }
  }
  t.s(["f", 0, e]);
};
