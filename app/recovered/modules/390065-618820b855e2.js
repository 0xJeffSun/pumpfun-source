// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(352386),
    n = e.i(755793),
    a = e.i(985526);
  let i = () => ({
      [a.N.Advanced]: !1,
      [a.N.Core]: !1,
      [a.N.Unified]: !1,
      [a.N.Multichain]: !1,
    }),
    s = () => {
      let e = i(),
        t = new Set();
      return {
        get: () => e,
        set: (r) => {
          let l;
          if (((l = e), !Object.values(a.N).every((e) => l[e] === r[e])))
            for (let l of ((e = r), t)) l();
        },
        subscribe: (e) => (
          t.add(e),
          () => {
            t.delete(e);
          }
        ),
      };
    },
    u = i(),
    o = () => u,
    c = (0, l.createContext)({ instances: [], store: s() }),
    d = [a.N.Advanced, a.N.Unified];
  function f() {}
  e.s(
    [
      "p",
      0,
      function (e) {
        let u,
          o,
          p,
          m,
          h = (0, r.c)(10),
          { children: b, configs: g, instances: y } = e,
          v = void 0 === y ? d : y;
        (0, n.M)(g);
        let [S] = (0, l.useState)(s);
        (h[0] !== v || h[1] !== S
          ? ((u = () => {
              let e = [],
                t = [],
                r = i();
              for (let e of v) r[e] = (0, n.B)(e) === a.m.CONNECTED;
              S.set(r);
              let l = (0, n.k)((e, t) => {
                  let r = t === a.m.CONNECTED,
                    l = S.get();
                  l[e] !== r && S.set({ ...l, [e]: r });
                }),
                s = ((e, { timeout: t = 2e3 } = {}) => {
                  let r = !1,
                    l = null,
                    n = () => {
                      r ||
                        (l = ((e, t) => {
                          if ("function" == typeof window.requestIdleCallback) {
                            let r = window.requestIdleCallback(e, {
                              timeout: t,
                            });
                            return () => {
                              "function" == typeof window.cancelIdleCallback &&
                                window.cancelIdleCallback(r);
                            };
                          }
                          let r = window.setTimeout(e, 200);
                          return () => window.clearTimeout(r);
                        })(e, t));
                    };
                  return (
                    "complete" === document.readyState
                      ? n()
                      : window.addEventListener("load", n, { once: !0 }),
                    () => {
                      ((r = !0), window.removeEventListener("load", n), l?.());
                    }
                  );
                })(() => {
                  for (let r of v) {
                    let l = (0, n.i)(r, `_WARMUP_${r}_${Date.now()}`, f);
                    (e.push({ instance: r, subId: l }),
                      t.push(
                        setTimeout(() => {
                          (0, n.V)(r, l);
                        }, 100),
                      ));
                  }
                });
              return () => {
                for (let e of (s(), t)) clearTimeout(e);
                for (let { instance: t, subId: r } of e) (0, n.V)(t, r);
                (0, n.t)(l);
              };
            }),
            (o = [v, S]),
            (h[0] = v),
            (h[1] = S),
            (h[2] = u),
            (h[3] = o))
          : ((u = h[2]), (o = h[3])),
          (0, l.useEffect)(u, o),
          h[4] !== v || h[5] !== S
            ? ((p = { instances: v, store: S }),
              (h[4] = v),
              (h[5] = S),
              (h[6] = p))
            : (p = h[6]));
        let x = p;
        return (
          h[7] !== b || h[8] !== x
            ? ((m = (0, t.jsx)(c.Provider, { value: x, children: b })),
              (h[7] = b),
              (h[8] = x),
              (h[9] = m))
            : (m = h[9]),
          m
        );
      },
      "N",
      0,
      () => {
        let e,
          t,
          a,
          i,
          s = (0, r.c)(13),
          { instances: u, store: d } = (0, l.use)(c),
          f = (0, l.useSyncExternalStore)(d.subscribe, d.get, o);
        s[0] !== f
          ? ((e = (e) => f[e] || !1), (s[0] = f), (s[1] = e))
          : (e = s[1]);
        let p = e;
        s[2] !== f || s[3] !== u
          ? ((t = () => u.filter((e) => f[e])),
            (s[2] = f),
            (s[3] = u),
            (s[4] = t))
          : (t = s[4]);
        let m = t;
        s[5] !== m || s[6] !== p
          ? ((a = (e) => {
              for (let t of e) if (p(t)) return t;
              return m()[0] ?? null;
            }),
            (s[5] = m),
            (s[6] = p),
            (s[7] = a))
          : (a = s[7]);
        let h = a;
        return (
          s[8] !== f || s[9] !== m || s[10] !== h || s[11] !== p
            ? ((i = {
                subscribe: n.i,
                unsubscribe: n.V,
                getActiveInstances: m,
                isInstanceActive: p,
                getPreferredInstance: h,
                connectionStates: f,
              }),
              (s[8] = f),
              (s[9] = m),
              (s[10] = h),
              (s[11] = p),
              (s[12] = i))
            : (i = s[12]),
          i
        );
      },
    ],
    390065,
  );
};
