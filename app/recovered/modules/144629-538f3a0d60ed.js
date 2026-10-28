// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(572420),
    l = e.i(1807),
    r = e.i(907953),
    n = e.i(826085),
    i = e.i(459705);
  function a(e, t) {
    let l = (0, i.f)(t()),
      a = () => l.set(t());
    return (
      a(),
      (0, n.f)(() => {
        let t = () => r.y.preRender(a, !1, !0),
          l = e.map((e) => e.on("change", t));
        return () => {
          (l.forEach((e) => e()), (0, r.Y)(a));
        };
      }),
      l
    );
  }
  var s = e.i(964355);
  function o(e, t) {
    let r = (0, l.f)(() => []);
    return a(e, () => {
      r.length = 0;
      let l = e.length;
      for (let t = 0; t < l; t++) r[t] = e[t].get();
      return t(r);
    });
  }
  e.s(
    [
      "f",
      0,
      function e(r, n, i, c) {
        if ("function" == typeof r) {
          let e;
          return (
            (s.I.current = []),
            r(),
            (e = a(s.I.current, r)),
            (s.I.current = void 0),
            e
          );
        }
        if (void 0 !== i && !Array.isArray(i) && "function" != typeof n) {
          var d = r,
            u = n,
            m = i,
            f = c;
          let t = (0, l.f)(() => Object.keys(m)),
            a = (0, l.f)(() => ({}));
          for (let l of t) a[l] = e(d, u, m[l], f);
          return a;
        }
        let x = "function" == typeof n ? n : (0, t.f)(n, i, c),
          h = Array.isArray(r) ? o(r, x) : o([r], ([e]) => x(e)),
          p = Array.isArray(r) ? void 0 : r.accelerate;
        return (
          p &&
            !p.isTransformed &&
            "function" != typeof n &&
            Array.isArray(i) &&
            c?.clamp !== !1 &&
            (h.accelerate = {
              ...p,
              times: n,
              keyframes: i,
              isTransformed: !0,
              ...(c?.ease ? { ease: c.ease } : {}),
            }),
          h
        );
      },
    ],
    144629,
  );
};
