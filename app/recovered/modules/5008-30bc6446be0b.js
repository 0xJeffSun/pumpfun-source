// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(316433);
  e.exports = function (t, e, r) {
    for (
      var o = -1, i = t.criteria, a = e.criteria, u = i.length, c = r.length;
      ++o < u;

    ) {
      var l = n(i[o], a[o]);
      if (l) {
        if (o >= c) return l;
        return l * ("desc" == r[o] ? -1 : 1);
      }
    }
    return t.index - e.index;
  };
};
