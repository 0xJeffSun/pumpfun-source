// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (e.i(149502), Object.defineProperty(n, "__esModule", { value: !0 }));
  var r = {
    default: function () {
      return _;
    },
    defaultHead: function () {
      return c;
    },
  };
  for (var i in r) Object.defineProperty(n, i, { enumerable: !0, get: r[i] });
  let o = e.r(836437),
    s = e.r(56421),
    l = e.r(732486),
    a = s._(e.r(352386)),
    u = o._(e.r(596442)),
    d = e.r(724243);
  function c() {
    return [
      (0, l.jsx)("meta", { charSet: "utf-8" }, "charset"),
      (0, l.jsx)(
        "meta",
        { name: "viewport", content: "width=device-width" },
        "viewport",
      ),
    ];
  }
  function f(e, t) {
    return "string" == typeof t || "number" == typeof t
      ? e
      : t.type === a.default.Fragment
        ? e.concat(
            a.default.Children.toArray(t.props.children).reduce(
              (e, t) =>
                "string" == typeof t || "number" == typeof t ? e : e.concat(t),
              [],
            ),
          )
        : e.concat(t);
  }
  let m = ["name", "httpEquiv", "charSet", "itemProp"];
  function E(e) {
    let t, n, r, i;
    return e
      .reduce(f, [])
      .reverse()
      .concat(c().reverse())
      .filter(
        ((t = new Set()),
        (n = new Set()),
        (r = new Set()),
        (i = {}),
        (e) => {
          let o = !0,
            s = !1;
          if (e.key && "number" != typeof e.key && e.key.indexOf("$") > 0) {
            s = !0;
            let n = e.key.slice(e.key.indexOf("$") + 1);
            t.has(n) ? (o = !1) : t.add(n);
          }
          switch (e.type) {
            case "title":
            case "base":
              n.has(e.type) ? (o = !1) : n.add(e.type);
              break;
            case "meta":
              for (let t = 0, n = m.length; t < n; t++) {
                let n = m[t];
                if (e.props.hasOwnProperty(n))
                  if ("charSet" === n) r.has(n) ? (o = !1) : r.add(n);
                  else {
                    let t = e.props[n],
                      r = i[n] || new Set();
                    ("name" !== n || !s) && r.has(t)
                      ? (o = !1)
                      : (r.add(t), (i[n] = r));
                  }
              }
          }
          return o;
        }),
      )
      .reverse()
      .map((e, t) => {
        let n = e.key || t;
        return a.default.cloneElement(e, { key: n });
      });
  }
  let _ = function ({ children: e }) {
    let t = (0, a.useContext)(d.HeadManagerContext);
    return (0, l.jsx)(u.default, {
      reduceComponentsToState: E,
      headManager: t,
      children: e,
    });
  };
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
