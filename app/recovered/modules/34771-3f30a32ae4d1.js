// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(853624),
    i = t.i(854022);
  let s = (t) => Math.round(1e5 * t) / 1e5;
  t.s(["f", 0, s], 181613);
  let r = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
  t.s(["f", 0, r], 968301);
  let n =
      /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
    a = (t, e) => (i) =>
      !!(
        ("string" == typeof i && n.test(i) && i.startsWith(t)) ||
        (e && null != i && Object.prototype.hasOwnProperty.call(i, e))
      ),
    o = (t, e, i) => (s) => {
      if ("string" != typeof s) return s;
      let [n, a, o, l] = s.match(r);
      return {
        [t]: parseFloat(n),
        [e]: parseFloat(a),
        [i]: parseFloat(o),
        alpha: void 0 !== l ? parseFloat(l) : 1,
      };
    };
  t.s(["E", 0, a, "J", 0, o], 269005);
  let l = { ...i.H, transform: (t) => Math.round((0, e.f)(0, 255, t)) },
    h = {
      test: a("rgb", "red"),
      parse: o("red", "green", "blue"),
      transform: ({ red: t, green: e, blue: r, alpha: n = 1 }) =>
        "rgba(" +
        l.transform(t) +
        ", " +
        l.transform(e) +
        ", " +
        l.transform(r) +
        ", " +
        s(i._.transform(n)) +
        ")",
    };
  t.s(["f", 0, h], 328076);
  let u = {
    test: a("#"),
    parse: function (t) {
      let e = "",
        i = "",
        s = "",
        r = "";
      return (
        t.length > 5
          ? ((e = t.substring(1, 3)),
            (i = t.substring(3, 5)),
            (s = t.substring(5, 7)),
            (r = t.substring(7, 9)))
          : ((e = t.substring(1, 2)),
            (i = t.substring(2, 3)),
            (s = t.substring(3, 4)),
            (r = t.substring(4, 5)),
            (e += e),
            (i += i),
            (s += s),
            (r += r)),
        {
          red: parseInt(e, 16),
          green: parseInt(i, 16),
          blue: parseInt(s, 16),
          alpha: r ? parseInt(r, 16) / 255 : 1,
        }
      );
    },
    transform: h.transform,
  };
  t.s(["f", 0, u], 34771);
};
