// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  function n() {
    ((this.buffer = []), (this.length = 0));
  }
  ((n.prototype = {
    get: function (t) {
      let e = Math.floor(t / 8);
      return ((this.buffer[e] >>> (7 - (t % 8))) & 1) == 1;
    },
    put: function (t, e) {
      for (let r = 0; r < e; r++) this.putBit(((t >>> (e - r - 1)) & 1) == 1);
    },
    getLengthInBits: function () {
      return this.length;
    },
    putBit: function (t) {
      let e = Math.floor(this.length / 8);
      (this.buffer.length <= e && this.buffer.push(0),
        t && (this.buffer[e] |= 128 >>> this.length % 8),
        this.length++);
    },
  }),
    (e.exports = n));
};
