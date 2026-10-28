// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, i) => {
  function r(t) {
    if (!t || t < 1)
      throw Error("BitMatrix size must be defined and greater than 0");
    ((this.size = t),
      (this.data = new Uint8Array(t * t)),
      (this.reservedBit = new Uint8Array(t * t)));
  }
  ((r.prototype.set = function (t, e, i, r) {
    let o = t * this.size + e;
    ((this.data[o] = i), r && (this.reservedBit[o] = !0));
  }),
    (r.prototype.get = function (t, e) {
      return this.data[t * this.size + e];
    }),
    (r.prototype.xor = function (t, e, i) {
      this.data[t * this.size + e] ^= i;
    }),
    (r.prototype.isReserved = function (t, e) {
      return this.reservedBit[t * this.size + e];
    }),
    (e.exports = r));
};
