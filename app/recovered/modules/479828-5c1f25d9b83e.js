// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(352386);
  let i = ({ clientSideID: r, onStateChange: i }) => {
    let [l, a] = (0, n.useState)(null);
    return ((0, n.useEffect)(() => {
      let t = !1,
        r = () => {
          e.A(887907)
            .then((e) => {
              t || a(() => e.LaunchDarklyRuntime);
            })
            .catch(() => {});
        };
      if ("function" == typeof window.requestIdleCallback) {
        let e = window.requestIdleCallback(r, { timeout: 2e3 });
        return () => {
          ((t = !0), window.cancelIdleCallback?.(e));
        };
      }
      let n = setTimeout(r, 1);
      return () => {
        ((t = !0), clearTimeout(n));
      };
    }, []),
    l)
      ? (0, t.jsx)(l, { clientSideID: r, onStateChange: i })
      : null;
  };
  var l = e.i(272173),
    a = e.i(37116);
  e.s(
    [
      "LaunchDarklyProvider",
      0,
      (e) => {
        let s,
          o,
          u,
          d = (0, r.c)(9),
          { clientSideID: c, children: m } = e,
          [p] = (0, n.useState)(a.createLaunchDarklyClientStore);
        return (
          d[0] !== m
            ? ((s = (0, t.jsx)(l.LaunchDarklyContextSyncProvider, {
                children: m,
              })),
              (d[0] = m),
              (d[1] = s))
            : (s = d[1]),
          d[2] !== c || d[3] !== p.setState
            ? ((o = (0, t.jsx)(i, {
                clientSideID: c,
                onStateChange: p.setState,
              })),
              (d[2] = c),
              (d[3] = p.setState),
              (d[4] = o))
            : (o = d[4]),
          d[5] !== p || d[6] !== s || d[7] !== o
            ? ((u = (0, t.jsxs)(a.LaunchDarklyClientContext.Provider, {
                value: p,
                children: [s, o],
              })),
              (d[5] = p),
              (d[6] = s),
              (d[7] = o),
              (d[8] = u))
            : (u = d[8]),
          u
        );
      },
    ],
    479828,
  );
};
