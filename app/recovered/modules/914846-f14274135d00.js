// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(916110),
    o = t.r(622914);
  e.exports = function (t, e) {
    var r = -1,
      i = o(t) ? Array(t.length) : [];
    return (
      n(t, function (t, n, o) {
        i[++r] = e(t, n, o);
      }),
      i
    );
  };
};
