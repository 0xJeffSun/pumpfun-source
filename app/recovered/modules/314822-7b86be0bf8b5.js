// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, f) => {
  var r;
  function i(e) {
    this.rand = e;
  }
  if (
    ((t.exports = function (e) {
      return (r || (r = new i(null)), r.generate(e));
    }),
    (t.exports.Rand = i),
    (i.prototype.generate = function (e) {
      return this._rand(e);
    }),
    (i.prototype._rand = function (e) {
      if (this.rand.getBytes) return this.rand.getBytes(e);
      for (var t = new Uint8Array(e), f = 0; f < t.length; f++)
        t[f] = this.rand.getByte();
      return t;
    }),
    "object" == typeof self)
  )
    self.crypto && self.crypto.getRandomValues
      ? (i.prototype._rand = function (e) {
          var t = new Uint8Array(e);
          return (self.crypto.getRandomValues(t), t);
        })
      : self.msCrypto && self.msCrypto.getRandomValues
        ? (i.prototype._rand = function (e) {
            var t = new Uint8Array(e);
            return (self.msCrypto.getRandomValues(t), t);
          })
        : "object" == typeof window &&
          (i.prototype._rand = function () {
            throw Error("Not implemented yet");
          });
  else
    try {
      var d = {};
      if ("function" != typeof d.randomBytes) throw Error("Not supported");
      i.prototype._rand = function (e) {
        return d.randomBytes(e);
      };
    } catch (e) {}
};
