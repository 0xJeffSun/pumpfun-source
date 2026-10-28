// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = {
      color: void 0,
      size: void 0,
      className: void 0,
      style: void 0,
      attr: void 0,
    },
    n = t.default.createContext && t.default.createContext(r),
    o = function () {
      return (o =
        Object.assign ||
        function (e) {
          for (var t, r = 1, n = arguments.length; r < n; r++)
            for (var o in (t = arguments[r]))
              Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
          return e;
        }).apply(this, arguments);
    },
    i = function (e, t) {
      var r = {};
      for (var n in e)
        Object.prototype.hasOwnProperty.call(e, n) &&
          0 > t.indexOf(n) &&
          (r[n] = e[n]);
      if (null != e && "function" == typeof Object.getOwnPropertySymbols)
        for (var o = 0, n = Object.getOwnPropertySymbols(e); o < n.length; o++)
          0 > t.indexOf(n[o]) &&
            Object.prototype.propertyIsEnumerable.call(e, n[o]) &&
            (r[n[o]] = e[n[o]]);
      return r;
    };
  function a(e) {
    var a = function (r) {
      var n,
        a = e.attr,
        s = e.size,
        l = e.title,
        d = i(e, ["attr", "size", "title"]),
        u = s || r.size || "1em";
      return (
        r.className && (n = r.className),
        e.className && (n = (n ? n + " " : "") + e.className),
        t.default.createElement(
          "svg",
          o(
            { stroke: "currentColor", fill: "currentColor", strokeWidth: "0" },
            r.attr,
            a,
            d,
            {
              className: n,
              style: o(o({ color: e.color || r.color }, r.style), e.style),
              height: u,
              width: u,
              xmlns: "http://www.w3.org/2000/svg",
            },
          ),
          l && t.default.createElement("title", null, l),
          e.children,
        )
      );
    };
    return void 0 !== n
      ? t.default.createElement(n.Consumer, null, function (e) {
          return a(e);
        })
      : a(r);
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        return function (r) {
          return t.default.createElement(
            a,
            o({ attr: o({}, e.attr) }, r),
            (function e(r) {
              return (
                r &&
                r.map(function (r, n) {
                  return t.default.createElement(
                    r.tag,
                    o({ key: n }, r.attr),
                    e(r.child),
                  );
                })
              );
            })(e.child),
          );
        };
      },
    ],
    274518,
  );
};
