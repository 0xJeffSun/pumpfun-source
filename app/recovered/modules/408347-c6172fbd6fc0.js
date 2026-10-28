// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(440848),
    o = t.r(584058),
    i = t.r(215282),
    a = t.r(858954),
    u = t.r(742027),
    c = t.r(711432);
  e.exports = function (t, e, r) {
    var l = -1,
      s = o,
      f = t.length,
      p = !0,
      d = [],
      h = d;
    if (r) ((p = !1), (s = i));
    else if (f >= 200) {
      var y = e ? null : u(t);
      if (y) return c(y);
      ((p = !1), (s = a), (h = new n()));
    } else h = e ? [] : d;
    e: for (; ++l < f; ) {
      var v = t[l],
        m = e ? e(v) : v;
      if (((v = r || 0 !== v ? v : 0), p && m == m)) {
        for (var b = h.length; b--; ) if (h[b] === m) continue e;
        (e && h.push(m), d.push(v));
      } else s(h, m, r) || (h !== d && h.push(m), d.push(v));
    }
    return d;
  };
};
