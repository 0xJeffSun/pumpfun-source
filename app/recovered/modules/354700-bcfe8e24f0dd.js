// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  var n = t.r(22766),
    o = t.r(764138),
    i = t.r(13715),
    a = t.r(292408),
    u = t.r(843031),
    c = t.r(416907),
    l = t.r(908829),
    s = "[object Map]",
    f = "[object Promise]",
    p = "[object Set]",
    d = "[object WeakMap]",
    h = "[object DataView]",
    y = l(n),
    v = l(o),
    m = l(i),
    b = l(a),
    g = l(u),
    x = c;
  (((n && x(new n(new ArrayBuffer(1))) != h) ||
    (o && x(new o()) != s) ||
    (i && x(i.resolve()) != f) ||
    (a && x(new a()) != p) ||
    (u && x(new u()) != d)) &&
    (x = function (t) {
      var e = c(t),
        r = "[object Object]" == e ? t.constructor : void 0,
        n = r ? l(r) : "";
      if (n)
        switch (n) {
          case y:
            return h;
          case v:
            return s;
          case m:
            return f;
          case b:
            return p;
          case g:
            return d;
        }
      return e;
    }),
    (e.exports = x));
};
