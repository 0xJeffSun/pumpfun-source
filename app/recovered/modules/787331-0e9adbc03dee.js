// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(878524),
    o = t.r(864564),
    i = t.r(868922),
    a = Math.max,
    u = Math.min;
  e.exports = function (t, e, r) {
    var c,
      l,
      s,
      f,
      p,
      d,
      h = 0,
      y = !1,
      v = !1,
      m = !0;
    if ("function" != typeof t) throw TypeError("Expected a function");
    function b(e) {
      var r = c,
        n = l;
      return ((c = l = void 0), (h = e), (f = t.apply(n, r)));
    }
    function g(t) {
      var r = t - d,
        n = t - h;
      return void 0 === d || r >= e || r < 0 || (v && n >= s);
    }
    function x() {
      var t,
        r,
        n,
        i = o();
      if (g(i)) return O(i);
      p = setTimeout(
        x,
        ((t = i - d), (r = i - h), (n = e - t), v ? u(n, s - r) : n),
      );
    }
    function O(t) {
      return ((p = void 0), m && c) ? b(t) : ((c = l = void 0), f);
    }
    function w() {
      var t,
        r = o(),
        n = g(r);
      if (((c = arguments), (l = this), (d = r), n)) {
        if (void 0 === p)
          return ((h = t = d), (p = setTimeout(x, e)), y ? b(t) : f);
        if (v) return (clearTimeout(p), (p = setTimeout(x, e)), b(d));
      }
      return (void 0 === p && (p = setTimeout(x, e)), f);
    }
    return (
      (e = i(e) || 0),
      n(r) &&
        ((y = !!r.leading),
        (s = (v = "maxWait" in r) ? a(i(r.maxWait) || 0, e) : s),
        (m = "trailing" in r ? !!r.trailing : m)),
      (w.cancel = function () {
        (void 0 !== p && clearTimeout(p), (h = 0), (c = d = l = p = void 0));
      }),
      (w.flush = function () {
        return void 0 === p ? f : O(o());
      }),
      w
    );
  };
};
