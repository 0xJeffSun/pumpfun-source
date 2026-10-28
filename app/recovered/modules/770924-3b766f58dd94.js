// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(359702);
  (new WeakMap(),
    new WeakMap(),
    Symbol(),
    e.s(
      [
        "I",
        0,
        function (e) {
          let i = (0, t.s)({
            data: Array.from(e || []),
            has(e) {
              return this.data.some((t) => t[0] === e);
            },
            set(e, t) {
              let i = this.data.find((t) => t[0] === e);
              return (i ? (i[1] = t) : this.data.push([e, t]), this);
            },
            get(e) {
              var t;
              return null == (t = this.data.find((t) => t[0] === e))
                ? void 0
                : t[1];
            },
            delete(e) {
              let t = this.data.findIndex((t) => t[0] === e);
              return -1 !== t && (this.data.splice(t, 1), !0);
            },
            clear() {
              this.data.splice(0);
            },
            get size() {
              return this.data.length;
            },
            toJSON() {
              return new Map(this.data);
            },
            forEach(e) {
              this.data.forEach((t) => {
                e(t[1], t[0], this);
              });
            },
            keys() {
              return this.data.map((e) => e[0]).values();
            },
            values() {
              return this.data.map((e) => e[1]).values();
            },
            entries() {
              return new Map(this.data).entries();
            },
            get [Symbol.toStringTag]() {
              return "Map";
            },
            [Symbol.iterator]() {
              return this.entries();
            },
          });
          return (
            Object.defineProperties(i, {
              data: { enumerable: !1 },
              size: { enumerable: !1 },
              toJSON: { enumerable: !1 },
            }),
            Object.seal(i),
            i
          );
        },
        "T",
        0,
        function (e, i, s, r) {
          let a = e[i];
          return (0, t.i)(
            e,
            () => {
              let t = e[i];
              Object.is(a, t) || s((a = t));
            },
            r,
          );
        },
      ],
      770924,
    ));
};
