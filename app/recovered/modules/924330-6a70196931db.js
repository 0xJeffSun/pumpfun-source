// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  t.exports = function (e, t, r, n) {
    var o = r ? r.call(n, e, t) : void 0;
    if (void 0 !== o) return !!o;
    if (e === t) return !0;
    if ("object" != typeof e || !e || "object" != typeof t || !t) return !1;
    var s = Object.keys(e),
      a = Object.keys(t);
    if (s.length !== a.length) return !1;
    for (
      var i = Object.prototype.hasOwnProperty.bind(t), c = 0;
      c < s.length;
      c++
    ) {
      var u = s[c];
      if (!i(u)) return !1;
      var l = e[u],
        f = t[u];
      if (
        !1 === (o = r ? r.call(n, l, f, u) : void 0) ||
        (void 0 === o && l !== f)
      )
        return !1;
    }
    return !0;
  };
};
