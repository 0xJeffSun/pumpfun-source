// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(601362),
    o = t.r(546339),
    i = t.r(406518),
    a = t.r(952164);
  e.exports = i(function (t, e) {
    if (null == t) return [];
    var r = e.length;
    return (
      r > 1 && a(t, e[0], e[1])
        ? (e = [])
        : r > 2 && a(e[0], e[1], e[2]) && (e = [e[0]]),
      o(t, n(e, 1), [])
    );
  });
};
