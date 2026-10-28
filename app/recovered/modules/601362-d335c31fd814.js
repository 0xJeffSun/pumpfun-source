// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(105836),
    o = t.r(351263);
  e.exports = function t(e, r, i, a, u) {
    var c = -1,
      l = e.length;
    for (i || (i = o), u || (u = []); ++c < l; ) {
      var s = e[c];
      r > 0 && i(s)
        ? r > 1
          ? t(s, r - 1, i, a, u)
          : n(u, s)
        : a || (u[u.length] = s);
    }
    return u;
  };
};
