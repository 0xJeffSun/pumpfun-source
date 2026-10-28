// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(622914);
  e.exports = function (t, e) {
    return function (r, o) {
      if (null == r) return r;
      if (!n(r)) return t(r, o);
      for (
        var i = r.length, a = e ? i : -1, u = Object(r);
        (e ? a-- : ++a < i) && !1 !== o(u[a], a, u);

      );
      return r;
    };
  };
};
