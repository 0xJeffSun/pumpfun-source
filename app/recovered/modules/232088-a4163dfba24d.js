// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(6205),
    o = t.r(410090),
    i = t.r(778116),
    a = t.r(860059),
    u = t.r(784800),
    c = t.r(812232);
  e.exports = function (t, e, r) {
    e = n(e, t);
    for (var l = -1, s = e.length, f = !1; ++l < s; ) {
      var p = c(e[l]);
      if (!(f = null != t && r(t, p))) break;
      t = t[p];
    }
    return f || ++l != s
      ? f
      : !!(s = null == t ? 0 : t.length) && u(s) && a(p, s) && (i(t) || o(t));
  };
};
