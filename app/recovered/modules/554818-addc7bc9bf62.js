// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, i) => {
  function r() {
    ((this.buffer = []), (this.length = 0));
  }
  ((r.prototype = {
    get: function (t) {
      let e = Math.floor(t / 8);
      return ((this.buffer[e] >>> (7 - (t % 8))) & 1) == 1;
    },
    put: function (t, e) {
      for (let i = 0; i < e; i++) this.putBit(((t >>> (e - i - 1)) & 1) == 1);
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
    (e.exports = r));
};
