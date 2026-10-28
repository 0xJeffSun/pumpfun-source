// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  e.exports = function (t, e) {
    for (var r = -1, n = null == t ? 0 : t.length, o = Array(n); ++r < n; )
      o[r] = e(t[r], r, t);
    return o;
  };
};
