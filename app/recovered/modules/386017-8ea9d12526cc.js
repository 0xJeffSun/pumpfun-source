// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    a = e.i(352386);
  function i(e) {
    return e.isIntersecting;
  }
  function l() {
    return "u" < typeof IntersectionObserver;
  }
  e.s([
    "f",
    0,
    function (e, r) {
      let n,
        o,
        s,
        d = (0, t.c)(7);
      d[0] !== r
        ? ((n = void 0 === r ? {} : r), (d[0] = r), (d[1] = n))
        : (n = d[1]);
      let { rootMargin: c } = n,
        u = void 0 === c ? "200px 0px" : c,
        [m, p] = (0, a.useState)(l);
      return (
        d[2] !== e || d[3] !== u || d[4] !== m
          ? ((o = () => {
              if (m) return;
              let t = e.current;
              if (!t) return;
              let a = new IntersectionObserver(
                (e) => {
                  e.some(i) && (a.disconnect(), p(!0));
                },
                { rootMargin: u },
              );
              return (a.observe(t), () => a.disconnect());
            }),
            (s = [e, m, u]),
            (d[2] = e),
            (d[3] = u),
            (d[4] = m),
            (d[5] = o),
            (d[6] = s))
          : ((o = d[5]), (s = d[6])),
        (0, a.useEffect)(o, s),
        m
      );
    },
  ]);
};
