// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  e.exports = function (t) {
    var e = -1,
      r = Array(t.size);
    return (
      t.forEach(function (t, n) {
        r[++e] = [n, t];
      }),
      r
    );
  };
};
