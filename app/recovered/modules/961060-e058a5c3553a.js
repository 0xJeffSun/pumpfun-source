// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  e.exports = function (t) {
    return function (e, r, n) {
      for (var o = -1, i = Object(e), a = n(e), u = a.length; u--; ) {
        var c = a[t ? u : ++o];
        if (!1 === r(i[c], c, i)) break;
      }
      return e;
    };
  };
};
