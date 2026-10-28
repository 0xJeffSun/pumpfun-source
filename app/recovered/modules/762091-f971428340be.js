// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  function n(t) {
    if (!t || t < 1)
      throw Error("BitMatrix size must be defined and greater than 0");
    ((this.size = t),
      (this.data = new Uint8Array(t * t)),
      (this.reservedBit = new Uint8Array(t * t)));
  }
  ((n.prototype.set = function (t, e, r, n) {
    let o = t * this.size + e;
    ((this.data[o] = r), n && (this.reservedBit[o] = !0));
  }),
    (n.prototype.get = function (t, e) {
      return this.data[t * this.size + e];
    }),
    (n.prototype.xor = function (t, e, r) {
      this.data[t * this.size + e] ^= r;
    }),
    (n.prototype.isReserved = function (t, e) {
      return this.reservedBit[t * this.size + e];
    }),
    (e.exports = n));
};
