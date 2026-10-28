// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(440848),
    o = t.r(91739),
    i = t.r(858954);
  e.exports = function (t, e, r, a, u, c) {
    var l = 1 & r,
      s = t.length,
      f = e.length;
    if (s != f && !(l && f > s)) return !1;
    var p = c.get(t),
      d = c.get(e);
    if (p && d) return p == e && d == t;
    var h = -1,
      y = !0,
      v = 2 & r ? new n() : void 0;
    for (c.set(t, e), c.set(e, t); ++h < s; ) {
      var m = t[h],
        b = e[h];
      if (a) var g = l ? a(b, m, h, e, t, c) : a(m, b, h, t, e, c);
      if (void 0 !== g) {
        if (g) continue;
        y = !1;
        break;
      }
      if (v) {
        if (
          !o(e, function (t, e) {
            if (!i(v, e) && (m === t || u(m, t, r, a, c))) return v.push(e);
          })
        ) {
          y = !1;
          break;
        }
      } else if (!(m === b || u(m, b, r, a, c))) {
        y = !1;
        break;
      }
    }
    return (c.delete(t), c.delete(e), y);
  };
};
