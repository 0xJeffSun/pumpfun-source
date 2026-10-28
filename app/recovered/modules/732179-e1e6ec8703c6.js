// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(229286),
    o = t.r(345866),
    i = t.r(290457);
  e.exports = function (t) {
    var e = o(t);
    return 1 == e.length && e[0][2]
      ? i(e[0][0], e[0][1])
      : function (r) {
          return r === t || n(r, t, e);
        };
  };
};
