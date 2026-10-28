// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  function e({ top: t, left: i, right: s, bottom: n }) {
    return { x: { min: i, max: s }, y: { min: t, max: n } };
  }
  function i(t, e) {
    if (!e) return t;
    let i = e({ x: t.left, y: t.top }),
      s = e({ x: t.right, y: t.bottom });
    return { top: i.y, left: i.x, bottom: s.y, right: s.x };
  }
  t.s(
    [
      "X",
      0,
      e,
      "I",
      0,
      function ({ x: t, y: e }) {
        return { top: e.min, right: t.max, bottom: e.max, left: t.min };
      },
      "K",
      0,
      i,
    ],
    805020,
  );
  var s = t.i(341330);
  function n(t) {
    return void 0 === t || 1 === t;
  }
  function r({ scale: t, scaleX: e, scaleY: i }) {
    return !n(t) || !n(e) || !n(i);
  }
  function o(t) {
    return (
      r(t) ||
      a(t) ||
      t.z ||
      t.rotate ||
      t.rotateX ||
      t.rotateY ||
      t.skewX ||
      t.skewY
    );
  }
  function a(t) {
    var e, i;
    return ((e = t.x) && "0%" !== e) || ((i = t.y) && "0%" !== i);
  }
  function l(t, e, i) {
    return i + e * (t - i);
  }
  function h(t, e, i, s, n) {
    return (void 0 !== n && (t = l(t, n, s)), l(t, i, s) + e);
  }
  function u(t, e = 0, i = 1, s, n) {
    ((t.min = h(t.min, e, i, s, n)), (t.max = h(t.max, e, i, s, n)));
  }
  function d(t, { x: e, y: i }) {
    (u(t.x, e.translate, e.scale, e.originPoint),
      u(t.y, i.translate, i.scale, i.originPoint));
  }
  function c(t, e) {
    ((t.min += e), (t.max += e));
  }
  function p(t, e, i, n, r = 0.5) {
    let o = (0, s.f)(t.min, t.max, r);
    u(t, e, i, o, n);
  }
  function m(t, e) {
    return "string" == typeof t ? (parseFloat(t) / 100) * (e.max - e.min) : t;
  }
  function f(t, e, i) {
    let s = i ?? t;
    (p(t.x, m(e.x, s.x), e.scaleX, e.scale, e.originX),
      p(t.y, m(e.y, s.y), e.scaleY, e.scale, e.originY));
  }
  function y(t, s) {
    return e(i(t.getBoundingClientRect(), s));
  }
  (t.s(["k", 0, a, "N", 0, r, "u", 0, o], 767052),
    t.s(
      [
        "z",
        0,
        d,
        "w",
        0,
        function (t, e, i, s = !1) {
          let n,
            r,
            a = i.length;
          if (a) {
            e.x = e.y = 1;
            for (let l = 0; l < a; l++) {
              r = (n = i[l]).projectionDelta;
              let { visualElement: a } = n.options;
              (!a || !a.props.style || "contents" !== a.props.style.display) &&
                (s &&
                  n.options.layoutScroll &&
                  n.scroll &&
                  n !== n.root &&
                  (c(t.x, -n.scroll.offset.x), c(t.y, -n.scroll.offset.y)),
                r && ((e.x *= r.x.scale), (e.y *= r.y.scale), d(t, r)),
                s &&
                  o(n.latestValues) &&
                  f(t, n.latestValues, n.layout?.layoutBox));
            }
            (e.x < 1.0000000000001 && e.x > 0.999999999999 && (e.x = 1),
              e.y < 1.0000000000001 && e.y > 0.999999999999 && (e.y = 1));
          }
        },
        "_",
        0,
        l,
        "k",
        0,
        f,
        "i",
        0,
        c,
      ],
      174302,
    ),
    t.s(
      [
        "r",
        0,
        function (t, e, i) {
          let s = y(t, i),
            { scroll: n } = e;
          return (n && (c(s.x, n.offset.x), c(s.y, n.offset.y)), s);
        },
        "I",
        0,
        y,
      ],
      609846,
    ));
};
