// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(239145),
    o = t.r(555902),
    i = t.r(860839),
    a = t.r(914846),
    u = t.r(529478),
    c = t.r(585466),
    l = t.r(5008),
    s = t.r(240046),
    f = t.r(778116);
  e.exports = function (t, e, r) {
    e = e.length
      ? n(e, function (t) {
          return f(t)
            ? function (e) {
                return o(e, 1 === t.length ? t[0] : t);
              }
            : t;
        })
      : [s];
    var p = -1;
    return (
      (e = n(e, c(i))),
      u(
        a(t, function (t, r, o) {
          return {
            criteria: n(e, function (e) {
              return e(t);
            }),
            index: ++p,
            value: t,
          };
        }),
        function (t, e) {
          return l(t, e, r);
        },
      )
    );
  };
};
