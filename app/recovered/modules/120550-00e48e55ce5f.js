// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(914048),
    o = t.r(952164),
    i = t.r(682437);
  e.exports = function (t) {
    return function (e, r, a) {
      return (
        a && "number" != typeof a && o(e, r, a) && (r = a = void 0),
        (e = i(e)),
        void 0 === r ? ((r = e), (e = 0)) : (r = i(r)),
        (a = void 0 === a ? (e < r ? 1 : -1) : i(a)),
        n(e, r, a, t)
      );
    };
  };
};
