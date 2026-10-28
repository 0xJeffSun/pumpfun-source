// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(911796),
    o = t.r(796847);
  e.exports = function (t, e, r, i) {
    var a = r.length,
      u = a,
      c = !i;
    if (null == t) return !u;
    for (t = Object(t); a--; ) {
      var l = r[a];
      if (c && l[2] ? l[1] !== t[l[0]] : !(l[0] in t)) return !1;
    }
    for (; ++a < u; ) {
      var s = (l = r[a])[0],
        f = t[s],
        p = l[1];
      if (c && l[2]) {
        if (void 0 === f && !(s in t)) return !1;
      } else {
        var d = new n();
        if (i) var h = i(f, p, s, t, e, d);
        if (!(void 0 === h ? o(p, f, 3, i, d) : h)) return !1;
      }
    }
    return !0;
  };
};
