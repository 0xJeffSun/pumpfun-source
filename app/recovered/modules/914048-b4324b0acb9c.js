// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = Math.ceil,
    o = Math.max;
  e.exports = function (t, e, r, i) {
    for (var a = -1, u = o(n((e - t) / (r || 1)), 0), c = Array(u); u--; )
      ((c[i ? u : ++a] = t), (t += r));
    return c;
  };
};
