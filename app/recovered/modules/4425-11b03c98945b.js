// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386);
  function l() {
    return "u" < typeof IntersectionObserver;
  }
  e.s([
    "f",
    0,
    function (e, a) {
      let i,
        n,
        s,
        o = (0, t.c)(6);
      o[0] !== a
        ? ((i = void 0 === a ? {} : a), (o[0] = a), (o[1] = i))
        : (i = o[1]);
      let { enabled: d } = i,
        c = void 0 === d || d,
        [u, m] = (0, r.useState)(l);
      return (
        o[2] !== c || o[3] !== e
          ? ((n = () => {
              let t = e.current;
              if (!c || !t || "u" < typeof IntersectionObserver)
                return void m("u" < typeof IntersectionObserver);
              let r = new IntersectionObserver((e) => {
                let t = e[e.length - 1];
                t && m(t.isIntersecting);
              });
              return (r.observe(t), () => r.disconnect());
            }),
            (s = [e, c]),
            (o[2] = c),
            (o[3] = e),
            (o[4] = n),
            (o[5] = s))
          : ((n = o[4]), (s = o[5])),
        (0, r.useEffect)(n, s),
        u
      );
    },
  ]);
};
