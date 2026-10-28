// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(92615),
    n = e.i(732612),
    r = e.i(430186),
    i = e.i(493798);
  let o = 0.1 * 0.1;
  function l(e, t, n, r, i, o) {
    return r >= t != o >= t && e <= ((i - n) * (t - r)) / (o - r) + n;
  }
  function s(e, t, n, r, i, o, s, u, a, c) {
    let f = !1;
    return (
      l(e, t, n, r, i, o) && (f = !f),
      l(e, t, i, o, s, u) && (f = !f),
      l(e, t, s, u, a, c) && (f = !f),
      l(e, t, a, c, n, r) && (f = !f),
      f
    );
  }
  function u(e, t, n, r, i, o) {
    let l = Math.min(n, i),
      s = Math.max(n, i),
      u = Math.min(r, o),
      a = Math.max(r, o);
    return e >= l && e <= s && t >= u && t <= a;
  }
  e.s([
    "f",
    0,
    function (e = {}) {
      let { blockPointerEvents: l = !1 } = e,
        a = new n.U(),
        c = ({
          x: e,
          y: n,
          placement: l,
          elements: c,
          onClose: f,
          nodeId: d,
          tree: p,
        }) => {
          let g = l?.split("-")[0],
            h = !1,
            m = null,
            v = null,
            y = "u" > typeof performance ? performance.now() : 0;
          return function (l) {
            a.clear();
            let b = c.domReference,
              w = c.floating;
            if (!b || !w || null == g || null == e || null == n) return;
            let { clientX: E, clientY: x } = l,
              R = (0, r.Z)(l),
              S = "mouseleave" === l.type,
              T = (0, r.I)(w, R),
              C = (0, r.I)(b, R);
            if (T && ((h = !0), !S)) return;
            if (C && ((h = !1), !S)) {
              h = !0;
              return;
            }
            if (S && (0, t.m)(l.relatedTarget) && (0, r.I)(w, l.relatedTarget))
              return;
            function k() {
              return !!(p && (0, i.Q)(p.nodesRef.current, d).length > 0);
            }
            function O() {
              k() || (a.clear(), f());
            }
            if (k()) return;
            let I = b.getBoundingClientRect(),
              P = w.getBoundingClientRect(),
              M = e > P.right - P.width / 2,
              A = n > P.bottom - P.height / 2,
              L = P.width > I.width,
              $ = P.height > I.height,
              D = (L ? I : P).left,
              H = (L ? I : P).right,
              W = ($ ? I : P).top,
              B = ($ ? I : P).bottom;
            if (
              ("top" === g && n >= I.bottom - 1) ||
              ("bottom" === g && n <= I.top + 1) ||
              ("left" === g && e >= I.right - 1) ||
              ("right" === g && e <= I.left + 1)
            )
              return void O();
            let N = !1;
            switch (g) {
              case "top":
                N = u(E, x, D, I.top + 1, H, P.bottom - 1);
                break;
              case "bottom":
                N = u(E, x, D, P.top + 1, H, I.bottom - 1);
                break;
              case "left":
                N = u(E, x, P.right - 1, B, I.left + 1, W);
                break;
              case "right":
                N = u(E, x, I.right - 1, B, P.left + 1, W);
            }
            if (N) return;
            if (
              (h &&
                (!(E >= I.x) ||
                  !(E <= I.x + I.width) ||
                  !(x >= I.y) ||
                  !(x <= I.y + I.height))) ||
              (!S &&
                (function (e, t) {
                  let n = performance.now(),
                    r = n - y;
                  if (null === m || null === v || 0 === r)
                    return ((m = e), (v = t), (y = n), !1);
                  let i = e - m,
                    l = t - v;
                  return ((m = e), (v = t), (y = n), i * i + l * l < r * r * o);
                })(E, x))
            )
              return void O();
            let j = !1;
            switch (g) {
              case "top": {
                let t = L ? 0.25 : 2,
                  r = n + 0.5 + 1,
                  i = M || L ? P.bottom - 0.5 : P.top,
                  o = M ? (L ? P.bottom - 0.5 : P.top) : P.bottom - 0.5;
                j = s(
                  E,
                  x,
                  L || M ? e + t : e - t,
                  r,
                  L ? e - t : M ? e + t : e - t,
                  r,
                  P.left,
                  i,
                  P.right,
                  o,
                );
                break;
              }
              case "bottom": {
                let t = L ? 0.25 : 2,
                  r = n - 0.5,
                  i = M || L ? P.top + 0.5 : P.bottom,
                  o = M ? (L ? P.top + 0.5 : P.bottom) : P.top + 0.5;
                j = s(
                  E,
                  x,
                  L || M ? e + t : e - t,
                  r,
                  L ? e - t : M ? e + t : e - t,
                  r,
                  P.left,
                  i,
                  P.right,
                  o,
                );
                break;
              }
              case "left": {
                let t = $ ? 0.25 : 2,
                  r = e + 0.5 + 1,
                  i = A || $ ? P.right - 0.5 : P.left,
                  o = A ? ($ ? P.right - 0.5 : P.left) : P.right - 0.5;
                j = s(
                  E,
                  x,
                  i,
                  P.top,
                  o,
                  P.bottom,
                  r,
                  $ || A ? n + t : n - t,
                  r,
                  $ ? n - t : A ? n + t : n - t,
                );
                break;
              }
              case "right": {
                let t = $ ? 0.25 : 2,
                  r = e - 0.5,
                  i = A || $ ? P.left + 0.5 : P.right,
                  o = A ? ($ ? P.left + 0.5 : P.right) : P.left + 0.5;
                j = s(
                  E,
                  x,
                  r,
                  $ || A ? n + t : n - t,
                  r,
                  $ ? n - t : A ? n + t : n - t,
                  i,
                  P.top,
                  o,
                  P.bottom,
                );
              }
            }
            j ? h || a.start(40, O) : O();
          };
        };
      return ((c.__options = { blockPointerEvents: l }), c);
    },
  ]);
};
