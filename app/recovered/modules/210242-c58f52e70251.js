// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  let e = ["top", "right", "bottom", "left"],
    r = e.reduce((t, e) => t.concat(e, e + "-start", e + "-end"), []),
    o = Math.min,
    n = Math.max,
    i = Math.round,
    s = Math.floor,
    a = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function l(t) {
    return t.split("-")[0];
  }
  function u(t) {
    return t.split("-")[1];
  }
  function c(t) {
    return "x" === t ? "y" : "x";
  }
  function f(t) {
    return "y" === t ? "height" : "width";
  }
  function h(t) {
    let e = t[0];
    return "t" === e || "b" === e ? "y" : "x";
  }
  function p(t) {
    return c(h(t));
  }
  function d(t) {
    return t.includes("start")
      ? t.replace("start", "end")
      : t.replace("end", "start");
  }
  let y = ["left", "right"],
    m = ["right", "left"],
    g = ["top", "bottom"],
    b = ["bottom", "top"];
  function w(t) {
    let e = l(t);
    return a[e] + t.slice(e.length);
  }
  t.s([
    "O",
    0,
    function (t, e, r) {
      return n(t, o(e, r));
    },
    "I",
    0,
    (t) => ({ x: t, y: t }),
    "h",
    0,
    function (t, e) {
      return "function" == typeof t ? t(e) : t;
    },
    "w",
    0,
    s,
    "R",
    0,
    u,
    "i",
    0,
    p,
    "N",
    0,
    function (t, e, r) {
      void 0 === r && (r = !1);
      let o = u(t),
        n = p(t),
        i = f(n),
        s =
          "x" === n
            ? o === (r ? "end" : "start")
              ? "right"
              : "left"
            : "start" === o
              ? "bottom"
              : "top";
      return (e.reference[i] > e.floating[i] && (s = w(s)), [s, w(s)]);
    },
    "T",
    0,
    f,
    "P",
    0,
    function (t) {
      let e = w(t);
      return [d(t), e, d(e)];
    },
    "o",
    0,
    d,
    "J",
    0,
    c,
    "K",
    0,
    function (t, e, r, o) {
      let n = u(t),
        i = (function (t, e, r) {
          switch (t) {
            case "top":
            case "bottom":
              if (r) return e ? m : y;
              return e ? y : m;
            case "left":
            case "right":
              return e ? g : b;
            default:
              return [];
          }
        })(l(t), "start" === r, o);
      return (
        n && ((i = i.map((t) => t + "-" + n)), e && (i = i.concat(i.map(d)))),
        i
      );
    },
    "t",
    0,
    w,
    "j",
    0,
    function (t) {
      var e, r, o, n;
      return "number" != typeof t
        ? {
            top: null != (e = t.top) ? e : 0,
            right: null != (r = t.right) ? r : 0,
            bottom: null != (o = t.bottom) ? o : 0,
            left: null != (n = t.left) ? n : 0,
          }
        : { top: t, right: t, bottom: t, left: t };
    },
    "m",
    0,
    l,
    "$",
    0,
    h,
    "y",
    0,
    n,
    "u",
    0,
    o,
    "Z",
    0,
    r,
    "_",
    0,
    function (t) {
      let { x: e, y: r, width: o, height: n } = t;
      return {
        width: o,
        height: n,
        top: r,
        left: e,
        right: e + o,
        bottom: r + n,
        x: e,
        y: r,
      };
    },
    "H",
    0,
    i,
    "M",
    0,
    e,
  ]);
};
