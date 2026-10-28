// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(34771),
    i = t.i(854022),
    s = t.i(813968),
    r = t.i(181613),
    n = t.i(269005);
  let a = {
    test: (0, n.E)("hsl", "hue"),
    parse: (0, n.J)("hue", "saturation", "lightness"),
    transform: ({ hue: t, saturation: e, lightness: n, alpha: a = 1 }) =>
      "hsla(" +
      Math.round(t) +
      ", " +
      s.U.transform((0, r.f)(e)) +
      ", " +
      s.U.transform((0, r.f)(n)) +
      ", " +
      (0, r.f)(i._.transform(a)) +
      ")",
  };
  t.s(["f", 0, a], 108027);
  var o = t.i(328076);
  let l = {
    test: (t) => o.f.test(t) || e.f.test(t) || a.test(t),
    parse: (t) =>
      o.f.test(t) ? o.f.parse(t) : a.test(t) ? a.parse(t) : e.f.parse(t),
    transform: (t) =>
      "string" == typeof t
        ? t
        : t.hasOwnProperty("red")
          ? o.f.transform(t)
          : a.transform(t),
    getAnimatableNone: (t) => {
      let e = l.parse(t);
      return ((e.alpha = 0), l.transform(e));
    },
  };
  t.s(["f", 0, l], 970080);
  let h =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
  var u = t.i(968301);
  let f = "number",
    d = "color",
    p =
      /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
  function c(t) {
    let e = t.toString(),
      i = [],
      s = { color: [], number: [], var: [] },
      r = [],
      n = 0,
      a = e
        .replace(
          p,
          (t) => (
            l.test(t)
              ? (s.color.push(n), r.push(d), i.push(l.parse(t)))
              : t.startsWith("var(")
                ? (s.var.push(n), r.push("var"), i.push(t))
                : (s.number.push(n), r.push(f), i.push(parseFloat(t))),
            ++n,
            "${}"
          ),
        )
        .split("${}");
    return { values: i, split: a, indexes: s, types: r };
  }
  function m({ split: t, types: e }) {
    let i = t.length;
    return (s) => {
      let n = "";
      for (let a = 0; a < i; a++)
        if (((n += t[a]), void 0 !== s[a])) {
          let t = e[a];
          t === f
            ? (n += (0, r.f)(s[a]))
            : t === d
              ? (n += l.transform(s[a]))
              : (n += s[a]);
        }
      return n;
    };
  }
  t.s(
    [
      "L",
      0,
      c,
      "u",
      0,
      {
        test: function (t) {
          return (
            isNaN(t) &&
            "string" == typeof t &&
            (t.match(u.f)?.length || 0) + (t.match(h)?.length || 0) > 0
          );
        },
        parse: function (t) {
          return c(t).values;
        },
        createTransformer: function (t) {
          return m(c(t));
        },
        getAnimatableNone: function (t) {
          let e = c(t);
          return m(e)(
            e.values.map((t, i) =>
              ((t, e) =>
                "number" == typeof t
                  ? e?.trim().endsWith("/")
                    ? t
                    : 0
                  : "number" == typeof t
                    ? 0
                    : l.test(t)
                      ? l.getAnimatableNone(t)
                      : t)(t, e.split[i]),
            ),
          );
        },
      },
    ],
    49997,
  );
};
