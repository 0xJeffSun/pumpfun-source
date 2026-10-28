// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  let n = t.r(283195);
  function o(t, e) {
    let r = t.a / 255,
      n = e + '="' + t.hex + '"';
    return r < 1 ? n + " " + e + '-opacity="' + r.toFixed(2).slice(1) + '"' : n;
  }
  function i(t, e, r) {
    let n = t + e;
    return (void 0 !== r && (n += " " + r), n);
  }
  r.render = function (t, e, r) {
    let a = n.getOptions(e),
      l = t.modules.size,
      s = t.modules.data,
      u = l + 2 * a.margin,
      f = a.color.light.a
        ? "<path " +
          o(a.color.light, "fill") +
          ' d="M0 0h' +
          u +
          "v" +
          u +
          'H0z"/>'
        : "",
      h =
        "<path " +
        o(a.color.dark, "stroke") +
        ' d="' +
        (function (t, e, r) {
          let n = "",
            o = 0,
            a = !1,
            l = 0;
          for (let s = 0; s < t.length; s++) {
            let u = Math.floor(s % e),
              f = Math.floor(s / e);
            (u || a || (a = !0),
              t[s]
                ? (l++,
                  (s > 0 && u > 0 && t[s - 1]) ||
                    ((n += a ? i("M", u + r, 0.5 + f + r) : i("m", o, 0)),
                    (o = 0),
                    (a = !1)),
                  (u + 1 < e && t[s + 1]) || ((n += i("h", l)), (l = 0)))
                : o++);
          }
          return n;
        })(s, l, a.margin) +
        '"/>',
      c =
        '<svg xmlns="http://www.w3.org/2000/svg" ' +
        (a.width ? 'width="' + a.width + '" height="' + a.width + '" ' : "") +
        ('viewBox="0 0 ' + u + " ") +
        u +
        '" shape-rendering="crispEdges">' +
        f +
        h +
        "</svg>\n";
    return ("function" == typeof r && r(null, c), c);
  };
};
