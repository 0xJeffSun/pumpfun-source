// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(124144),
    o = Object.prototype.hasOwnProperty;
  e.exports = function (t, e, r, i, a, u) {
    var c = 1 & r,
      l = n(t),
      s = l.length;
    if (s != n(e).length && !c) return !1;
    for (var f = s; f--; ) {
      var p = l[f];
      if (!(c ? p in e : o.call(e, p))) return !1;
    }
    var d = u.get(t),
      h = u.get(e);
    if (d && h) return d == e && h == t;
    var y = !0;
    (u.set(t, e), u.set(e, t));
    for (var v = c; ++f < s; ) {
      var m = t[(p = l[f])],
        b = e[p];
      if (i) var g = c ? i(b, m, p, e, t, u) : i(m, b, p, t, e, u);
      if (!(void 0 === g ? m === b || a(m, b, r, i, u) : g)) {
        y = !1;
        break;
      }
      v || (v = "constructor" == p);
    }
    if (y && !v) {
      var x = t.constructor,
        O = e.constructor;
      x != O &&
        "constructor" in t &&
        "constructor" in e &&
        !(
          "function" == typeof x &&
          x instanceof x &&
          "function" == typeof O &&
          O instanceof O
        ) &&
        (y = !1);
    }
    return (u.delete(t), u.delete(e), y);
  };
};
