// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  class t extends Map {
    constructor(e) {
      (super(),
        Object.defineProperty(this, "maxSize", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.maxSize = e));
    }
    get(e) {
      let t = super.get(e);
      return (super.has(e) && (super.delete(e), super.set(e, t)), t);
    }
    set(e, t) {
      if (
        (super.has(e) && super.delete(e),
        super.set(e, t),
        this.maxSize && this.size > this.maxSize)
      ) {
        let e = super.keys().next().value;
        void 0 !== e && super.delete(e);
      }
      return this;
    }
  }
  e.s(["f", 0, t]);
};
