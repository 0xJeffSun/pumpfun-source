// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, n, t) => {
  (Object.defineProperty(t, "__esModule", { value: !0 }),
    (t.InternalFieldList = void 0),
    (t.InternalFieldList = class {
      constructor(e, n) {
        ((this._fields = e), (this._normalizer = n));
      }
      findJsonName(e) {
        if (!this.jsonNames) {
          let e = {};
          for (let n of this.list()) e[n.jsonName] = e[n.name] = n;
          this.jsonNames = e;
        }
        return this.jsonNames[e];
      }
      find(e) {
        if (!this.numbers) {
          let e = {};
          for (let n of this.list()) e[n.no] = n;
          this.numbers = e;
        }
        return this.numbers[e];
      }
      list() {
        return (
          this.all || (this.all = this._normalizer(this._fields)),
          this.all
        );
      }
      byNumber() {
        return (
          this.numbersAsc ||
            (this.numbersAsc = this.list()
              .concat()
              .sort((e, n) => e.no - n.no)),
          this.numbersAsc
        );
      }
      byMember() {
        if (!this.members) {
          let e;
          this.members = [];
          let n = this.members;
          for (let t of this.list())
            t.oneof ? t.oneof !== e && ((e = t.oneof), n.push(e)) : n.push(t);
        }
        return this.members;
      }
    }));
};
