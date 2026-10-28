// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(692558);
  e.exports = function (t, e, r) {
    for (var o = -1, i = t.length; ++o < i; ) {
      var a = t[o],
        u = e(a);
      if (null != u && (void 0 === c ? u == u && !n(u) : r(u, c)))
        var c = u,
          l = a;
    }
    return l;
  };
};
