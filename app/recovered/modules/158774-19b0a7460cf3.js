// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(817416),
    o = t.r(792520),
    i = t.r(349966),
    a = t.r(649884),
    u = t.r(884711);
  function c(t) {
    var e = -1,
      r = null == t ? 0 : t.length;
    for (this.clear(); ++e < r; ) {
      var n = t[e];
      this.set(n[0], n[1]);
    }
  }
  ((c.prototype.clear = n),
    (c.prototype.delete = o),
    (c.prototype.get = i),
    (c.prototype.has = a),
    (c.prototype.set = u),
    (e.exports = c));
};
