// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, i) => {
  let r = t.r(902729),
    o = t.r(598670);
  function n(t) {
    ((this.mode = o.BYTE),
      "string" == typeof t && (t = r(t)),
      (this.data = new Uint8Array(t)));
  }
  ((n.getBitsLength = function (t) {
    return 8 * t;
  }),
    (n.prototype.getLength = function () {
      return this.data.length;
    }),
    (n.prototype.getBitsLength = function () {
      return n.getBitsLength(this.data.length);
    }),
    (n.prototype.write = function (t) {
      for (let e = 0, i = this.data.length; e < i; e++) t.put(this.data[e], 8);
    }),
    (e.exports = n));
};
