// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(964355);
  var t = e.i(904282),
    l = e.i(350764),
    r = e.i(907953);
  function n(e) {
    return "number" == typeof e ? e : parseFloat(e);
  }
  var i = e.i(352386),
    a = e.i(144685),
    s = e.i(459705),
    o = e.i(144629);
  e.s(
    [
      "f",
      0,
      function (e, c = {}) {
        return (function (e, c = {}) {
          let { isStatic: d } = (0, i.useContext)(a.f),
            u = () => ((0, l.f)(e) ? e.get() : e);
          if (d) return (0, o.f)(u);
          let m = (0, s.f)(u());
          return (
            (0, i.useInsertionEffect)(
              () =>
                (function (e, i, a = {}) {
                  let s,
                    o = e.get(),
                    c = null,
                    d = o,
                    u =
                      "string" == typeof o ? o.replace(/[\d.-]/g, "") : void 0,
                    m = () => {
                      (c && (c.stop(), (c = null)), (e.animation = void 0));
                    },
                    f = () => {
                      ((() => {
                        let l = n(e.get()),
                          r = n(d);
                        if (l === r) return m();
                        let i = c ? c.getGeneratorVelocity() : e.getVelocity();
                        (m(),
                          (c = new t.f({
                            keyframes: [l, r],
                            velocity: i,
                            type: "spring",
                            restDelta: 0.001,
                            restSpeed: 0.01,
                            ...a,
                            onUpdate: s,
                          })));
                      })(),
                        (e.animation = c ?? void 0),
                        e.events.animationStart?.notify(),
                        c?.then(() => {
                          ((e.animation = void 0),
                            e.events.animationComplete?.notify());
                        }));
                    };
                  if (
                    (e.attach((e, t) => {
                      ((d = e),
                        (s = (e) => {
                          var l, r;
                          return t(((l = e), (r = u) ? l + r : l));
                        }),
                        r.y.postRender(f));
                    }, m),
                    (0, l.f)(i))
                  ) {
                    let t = !0 === a.skipInitialAnimation,
                      l = i.on("change", (l) => {
                        var r, n, i, a;
                        t
                          ? ((t = !1),
                            e.jump(((r = l), (n = u) ? r + n : r), !1))
                          : e.set(((i = l), (a = u) ? i + a : i));
                      }),
                      r = e.on("destroy", l);
                    return () => {
                      (l(), r());
                    };
                  }
                  return m;
                })(m, e, c),
              [m, JSON.stringify(c)],
            ),
            m
          );
        })(e, { type: "spring", ...c });
      },
    ],
    786006,
  );
};
