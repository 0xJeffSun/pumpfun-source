// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(80400),
    n = e.i(526658),
    r = e.i(895453),
    i = e.i(194672),
    o = e.i(709549),
    s = e.i(91623),
    u = e.i(393386),
    a = e.i(305918),
    l = e.i(750671),
    c = e.i(775975);
  let d = {};
  e.s([
    "f",
    0,
    function (e) {
      let f = e.map((e) => {
        var f;
        return (
          d[e] ||
            (d[e] =
              ((f = e),
              new n.S((e) => {
                let n = r.P[f];
                return (
                  (r.P[f] = (...d) => {
                    n.apply(console, d);
                    let p = (0, l.c)("console error");
                    (0, i.G)(() => {
                      e.notify(
                        (function (e, n, i) {
                          let d = e
                            .map((e) => {
                              var n;
                              return "string" == typeof (n = e)
                                ? (0, o.f)(n)
                                : (0, t.b)(n)
                                  ? (0, l.t)((0, a.E)(n))
                                  : (0, s.x)((0, o.f)(n), void 0, 2);
                            })
                            .join(" ");
                          if (n === r.T.error) {
                            let r = e.find(t.b),
                              o = (0, t.K)({
                                originalError: r,
                                handlingStack: i,
                                startClocks: (0, c.o)(),
                                source: u.f.CONSOLE,
                                handling: "handled",
                                nonErrorPrefix: "Provided",
                                useFallbackStack: !1,
                              });
                            return (
                              (o.message = d),
                              { api: n, message: d, handlingStack: i, error: o }
                            );
                          }
                          return {
                            api: n,
                            message: d,
                            error: void 0,
                            handlingStack: i,
                          };
                        })(d, f, p),
                      );
                    });
                  }),
                  () => {
                    r.P[f] = n;
                  }
                );
              }))),
          d[e]
        );
      });
      return (0, n.R)(...f);
    },
  ]);
};
