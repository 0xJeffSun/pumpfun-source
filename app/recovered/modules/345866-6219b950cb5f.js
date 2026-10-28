// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(25200),
    o = t.r(953349);
  e.exports = function (t) {
    for (var e = o(t), r = e.length; r--; ) {
      var i = e[r],
        a = t[i];
      e[r] = [i, a, n(a)];
    }
    return e;
  };
};
