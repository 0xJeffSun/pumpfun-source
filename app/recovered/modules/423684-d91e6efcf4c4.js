// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(911796),
    o = t.r(105729),
    i = t.r(631829),
    a = t.r(966457),
    u = t.r(354700),
    c = t.r(778116),
    l = t.r(432816),
    s = t.r(905330),
    f = "[object Arguments]",
    p = "[object Array]",
    d = "[object Object]",
    h = Object.prototype.hasOwnProperty;
  e.exports = function (t, e, r, y, v, m) {
    var b = c(t),
      g = c(e),
      x = b ? p : u(t),
      O = g ? p : u(e);
    ((x = x == f ? d : x), (O = O == f ? d : O));
    var w = x == d,
      j = O == d,
      S = x == O;
    if (S && l(t)) {
      if (!l(e)) return !1;
      ((b = !0), (w = !1));
    }
    if (S && !w)
      return (
        m || (m = new n()),
        b || s(t) ? o(t, e, r, y, v, m) : i(t, e, x, r, y, v, m)
      );
    if (!(1 & r)) {
      var P = w && h.call(t, "__wrapped__"),
        A = j && h.call(e, "__wrapped__");
      if (P || A) {
        var E = P ? t.value() : t,
          M = A ? e.value() : e;
        return (m || (m = new n()), v(E, M, r, y, m));
      }
    }
    return !!S && (m || (m = new n()), a(t, e, r, y, v, m));
  };
};
