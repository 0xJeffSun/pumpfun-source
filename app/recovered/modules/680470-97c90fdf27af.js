// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  e.exports = function (t, e, r) {
    var n = -1,
      o = t.length;
    (e < 0 && (e = -e > o ? 0 : o + e),
      (r = r > o ? o : r) < 0 && (r += o),
      (o = e > r ? 0 : (r - e) >>> 0),
      (e >>>= 0));
    for (var i = Array(o); ++n < o; ) i[n] = t[n + e];
    return i;
  };
};
