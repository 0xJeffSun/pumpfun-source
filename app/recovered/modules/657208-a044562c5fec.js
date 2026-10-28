// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, a) => {
  function l() {
    ((this.buffer = []), (this.length = 0));
  }
  ((l.prototype = {
    get: function (e) {
      var t = Math.floor(e / 8);
      return ((this.buffer[t] >>> (7 - (e % 8))) & 1) == 1;
    },
    put: function (e, t) {
      for (var a = 0; a < t; a++) this.putBit(((e >>> (t - a - 1)) & 1) == 1);
    },
    getLengthInBits: function () {
      return this.length;
    },
    putBit: function (e) {
      var t = Math.floor(this.length / 8);
      (this.buffer.length <= t && this.buffer.push(0),
        e && (this.buffer[t] |= 128 >>> this.length % 8),
        this.length++);
    },
  }),
    (t.exports = l));
};
