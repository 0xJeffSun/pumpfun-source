// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, r, s) => {
  var t = /^\s+|\s+$/g,
    o = /^[-+]0x[0-9a-f]+$/i,
    a = /^0b[01]+$/i,
    n = /^0o[0-7]+$/i,
    i = parseInt,
    c = e.g && e.g.Object === Object && e.g,
    d = "object" == typeof self && self && self.Object === Object && self,
    l = c || d || Function("return this")(),
    u = Object.prototype.toString,
    y = Math.max,
    f = Math.min,
    B = function () {
      return l.Date.now();
    };
  function g(e) {
    var r = typeof e;
    return !!e && ("object" == r || "function" == r);
  }
  function p(e) {
    if ("number" == typeof e) return e;
    if (
      "symbol" == typeof (r = e) ||
      (r && "object" == typeof r && "[object Symbol]" == u.call(r))
    )
      return 0 / 0;
    if (g(e)) {
      var r,
        s = "function" == typeof e.valueOf ? e.valueOf() : e;
      e = g(s) ? s + "" : s;
    }
    if ("string" != typeof e) return 0 === e ? e : +e;
    e = e.replace(t, "");
    var c = a.test(e);
    return c || n.test(e) ? i(e.slice(2), c ? 2 : 8) : o.test(e) ? 0 / 0 : +e;
  }
  r.exports = function (e, r, s) {
    var t,
      o,
      a,
      n,
      i,
      c,
      d = 0,
      l = !1,
      u = !1,
      m = !0;
    if ("function" != typeof e) throw TypeError("Expected a function");
    function h(r) {
      var s = t,
        a = o;
      return ((t = o = void 0), (d = r), (n = e.apply(a, s)));
    }
    function w(e) {
      var s = e - c,
        t = e - d;
      return void 0 === c || s >= r || s < 0 || (u && t >= a);
    }
    function v() {
      var e,
        s,
        t,
        o = B();
      if (w(o)) return b(o);
      i = setTimeout(
        v,
        ((e = o - c), (s = o - d), (t = r - e), u ? f(t, a - s) : t),
      );
    }
    function b(e) {
      return ((i = void 0), m && t) ? h(e) : ((t = o = void 0), n);
    }
    function H() {
      var e,
        s = B(),
        a = w(s);
      if (((t = arguments), (o = this), (c = s), a)) {
        if (void 0 === i)
          return ((d = e = c), (i = setTimeout(v, r)), l ? h(e) : n);
        if (u) return ((i = setTimeout(v, r)), h(c));
      }
      return (void 0 === i && (i = setTimeout(v, r)), n);
    }
    return (
      (r = p(r) || 0),
      g(s) &&
        ((l = !!s.leading),
        (a = (u = "maxWait" in s) ? y(p(s.maxWait) || 0, r) : a),
        (m = "trailing" in s ? !!s.trailing : m)),
      (H.cancel = function () {
        (void 0 !== i && clearTimeout(i), (d = 0), (t = c = o = i = void 0));
      }),
      (H.flush = function () {
        return void 0 === i ? n : b(B());
      }),
      H
    );
  };
};
