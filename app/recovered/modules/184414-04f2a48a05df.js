// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(865799),
    o = Math.max;
  e.exports = function (t, e, r) {
    return (
      (e = o(void 0 === e ? t.length - 1 : e, 0)),
      function () {
        for (
          var i = arguments, a = -1, u = o(i.length - e, 0), c = Array(u);
          ++a < u;

        )
          c[a] = i[e + a];
        a = -1;
        for (var l = Array(e + 1); ++a < e; ) l[a] = i[a];
        return ((l[e] = r(c)), n(t, this, l));
      }
    );
  };
};
