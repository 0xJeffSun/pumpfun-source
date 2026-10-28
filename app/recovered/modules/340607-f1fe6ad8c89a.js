// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  (e.i(149502),
    e.s([
      "f",
      0,
      class {
        constructor() {
          ((this.elementsSet = new Set()), (this.idMap = new Map()));
        }
        add(e, t) {
          let n = this.idMap.get(e);
          n !== t &&
            (void 0 !== n && this.elementsSet.delete(n),
            this.elementsSet.add(t),
            this.idMap.set(e, t));
        }
        delete(e) {
          let t = this.idMap.get(e);
          t && (this.elementsSet.delete(t), this.idMap.delete(e));
        }
        hasElement(e) {
          return this.elementsSet.has(e);
        }
        hasMatchingElement(e) {
          for (let t of this.elementsSet) if (e(t)) return !0;
          return !1;
        }
        getById(e) {
          return this.idMap.get(e);
        }
        entries() {
          return this.idMap.entries();
        }
        elements() {
          return this.elementsSet.values();
        }
        get size() {
          return this.idMap.size;
        }
      },
    ]));
};
