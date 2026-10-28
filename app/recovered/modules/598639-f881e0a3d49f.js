// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, i) => {
  let r = t.r(298352);
  function o(t, e) {
    let i = t.a / 255,
      r = e + '="' + t.hex + '"';
    return i < 1 ? r + " " + e + '-opacity="' + i.toFixed(2).slice(1) + '"' : r;
  }
  function n(t, e, i) {
    let r = t + e;
    return (void 0 !== i && (r += " " + i), r);
  }
  i.render = function (t, e, i) {
    let a = r.getOptions(e),
      s = t.modules.size,
      l = t.modules.data,
      c = s + 2 * a.margin,
      u = a.color.light.a
        ? "<path " +
          o(a.color.light, "fill") +
          ' d="M0 0h' +
          c +
          "v" +
          c +
          'H0z"/>'
        : "",
      d =
        "<path " +
        o(a.color.dark, "stroke") +
        ' d="' +
        (function (t, e, i) {
          let r = "",
            o = 0,
            a = !1,
            s = 0;
          for (let l = 0; l < t.length; l++) {
            let c = Math.floor(l % e),
              u = Math.floor(l / e);
            (c || a || (a = !0),
              t[l]
                ? (s++,
                  (l > 0 && c > 0 && t[l - 1]) ||
                    ((r += a ? n("M", c + i, 0.5 + u + i) : n("m", o, 0)),
                    (o = 0),
                    (a = !1)),
                  (c + 1 < e && t[l + 1]) || ((r += n("h", s)), (s = 0)))
                : o++);
          }
          return r;
        })(l, s, a.margin) +
        '"/>',
      h =
        '<svg xmlns="http://www.w3.org/2000/svg" ' +
        (a.width ? 'width="' + a.width + '" height="' + a.width + '" ' : "") +
        ('viewBox="0 0 ' + c + " ") +
        c +
        '" shape-rendering="crispEdges">' +
        u +
        d +
        "</svg>\n";
    return ("function" == typeof i && i(null, h), h);
  };
};
