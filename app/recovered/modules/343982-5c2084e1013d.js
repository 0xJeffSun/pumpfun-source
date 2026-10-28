// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(860839),
    o = t.r(622914),
    i = t.r(953349);
  e.exports = function (t) {
    return function (e, r, a) {
      var u = Object(e);
      if (!o(e)) {
        var c = n(r, 3);
        ((e = i(e)),
          (r = function (t) {
            return c(u[t], t, u);
          }));
      }
      var l = t(e, r, a);
      return l > -1 ? u[c ? e[l] : l] : void 0;
    };
  };
};
