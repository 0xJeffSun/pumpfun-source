// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386);
  function a(e) {
    return e.isIntersecting;
  }
  function i() {
    return "u" < typeof IntersectionObserver;
  }
  e.s([
    "f",
    0,
    function (e, n) {
      let l,
        s,
        o,
        d = (0, t.c)(7);
      d[0] !== n
        ? ((l = void 0 === n ? {} : n), (d[0] = n), (d[1] = l))
        : (l = d[1]);
      let { rootMargin: u } = l,
        c = void 0 === u ? "200px 0px" : u,
        [m, p] = (0, r.useState)(i);
      return (
        d[2] !== e || d[3] !== c || d[4] !== m
          ? ((s = () => {
              if (m) return;
              let t = e.current;
              if (!t) return;
              let r = new IntersectionObserver(
                (e) => {
                  e.some(a) && (r.disconnect(), p(!0));
                },
                { rootMargin: c },
              );
              return (r.observe(t), () => r.disconnect());
            }),
            (o = [e, m, c]),
            (d[2] = e),
            (d[3] = c),
            (d[4] = m),
            (d[5] = s),
            (d[6] = o))
          : ((s = d[5]), (o = d[6])),
        (0, r.useEffect)(s, o),
        m
      );
    },
  ]);
};
