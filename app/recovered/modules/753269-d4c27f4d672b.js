// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  e.exports = function (t, e, r, n) {
    for (var o = t.length, i = r + (n ? 1 : -1); n ? i-- : ++i < o; )
      if (e(t[i], i, t)) return i;
    return -1;
  };
};
