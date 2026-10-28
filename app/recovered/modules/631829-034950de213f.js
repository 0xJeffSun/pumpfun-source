// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(328042),
    o = t.r(739914),
    i = t.r(450956),
    a = t.r(105729),
    u = t.r(140048),
    c = t.r(711432),
    l = n ? n.prototype : void 0,
    s = l ? l.valueOf : void 0;
  e.exports = function (t, e, r, n, l, f, p) {
    switch (r) {
      case "[object DataView]":
        if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset) break;
        ((t = t.buffer), (e = e.buffer));
      case "[object ArrayBuffer]":
        if (t.byteLength != e.byteLength || !f(new o(t), new o(e))) break;
        return !0;
      case "[object Boolean]":
      case "[object Date]":
      case "[object Number]":
        return i(+t, +e);
      case "[object Error]":
        return t.name == e.name && t.message == e.message;
      case "[object RegExp]":
      case "[object String]":
        return t == e + "";
      case "[object Map]":
        var d = u;
      case "[object Set]":
        var h = 1 & n;
        if ((d || (d = c), t.size != e.size && !h)) break;
        var y = p.get(t);
        if (y) return y == e;
        ((n |= 2), p.set(t, e));
        var v = a(d(t), d(e), n, l, f, p);
        return (p.delete(t), v);
      case "[object Symbol]":
        if (s) return s.call(t) == s.call(e);
    }
    return !1;
  };
};
