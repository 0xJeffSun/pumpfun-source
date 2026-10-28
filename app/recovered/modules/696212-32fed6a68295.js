// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(530586),
    o = t.r(888157),
    i = t.r(332556),
    a = t.r(553050);
  e.exports = function (t) {
    return function (e) {
      var r = o((e = a(e))) ? i(e) : void 0,
        u = r ? r[0] : e.charAt(0),
        c = r ? n(r, 1).join("") : e.slice(1);
      return u[t]() + c;
    };
  };
};
