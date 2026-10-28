// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  let a, n;
  var o = Object.create,
    i = Object.defineProperty,
    l = Object.getOwnPropertyDescriptor,
    s = Object.getOwnPropertyNames,
    u = Object.getPrototypeOf,
    c = Object.prototype.hasOwnProperty,
    p = (e, t, r, a) => {
      if ((t && "object" == typeof t) || "function" == typeof t)
        for (let n of s(t))
          c.call(e, n) ||
            n === r ||
            i(e, n, {
              get: () => t[n],
              enumerable: !(a = l(t, n)) || a.enumerable,
            });
      return e;
    },
    y = {},
    d = { default: () => P };
  for (var h in d) i(y, h, { get: d[h], enumerable: !0 });
  t.exports = p(i({}, "__esModule", { value: !0 }), y);
  var f =
      ((n = null != (a = e.r(211793)) ? o(u(a)) : {}),
      p(
        a && a.__esModule ? n : i(n, "default", { value: a, enumerable: !0 }),
        a,
      )),
    m = e.r(763222);
  let b = f.default[f.default.length - 1];
  var P = (0, m.createReactPlayer)(f.default, b);
};
