// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  e.exports = function (t, e) {
    for (var r = -1, n = null == t ? 0 : t.length, o = 0, i = []; ++r < n; ) {
      var a = t[r];
      e(a, r, t) && (i[o++] = a);
    }
    return i;
  };
};
