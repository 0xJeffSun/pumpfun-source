// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  let n = t.r(310413);
  function o(t) {
    ((this.mode = n.BYTE),
      "string" == typeof t
        ? (this.data = new TextEncoder().encode(t))
        : (this.data = new Uint8Array(t)));
  }
  ((o.getBitsLength = function (t) {
    return 8 * t;
  }),
    (o.prototype.getLength = function () {
      return this.data.length;
    }),
    (o.prototype.getBitsLength = function () {
      return o.getBitsLength(this.data.length);
    }),
    (o.prototype.write = function (t) {
      for (let e = 0, r = this.data.length; e < r; e++) t.put(this.data[e], 8);
    }),
    (e.exports = o));
};
