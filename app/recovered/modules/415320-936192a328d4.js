// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, r, t) => {
  r.exports = class {
    constructor() {
      ((this.max = 1e3), (this.map = new Map()));
    }
    get(e) {
      let r = this.map.get(e);
      if (void 0 !== r) return (this.map.delete(e), this.map.set(e, r), r);
    }
    delete(e) {
      return this.map.delete(e);
    }
    set(e, r) {
      if (!this.delete(e) && void 0 !== r) {
        if (this.map.size >= this.max) {
          let e = this.map.keys().next().value;
          this.delete(e);
        }
        this.map.set(e, r);
      }
      return this;
    }
  };
};
