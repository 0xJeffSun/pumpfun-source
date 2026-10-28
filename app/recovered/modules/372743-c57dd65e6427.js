// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(78436),
    r = e.i(634103),
    n = e.i(811005);
  let l = (e, t) => {
      let r = { ...e };
      for (let [e, n] of Object.entries(t)) null != n && (r[e] = n);
      return r;
    },
    i = (e, t) => {
      if (!e) return t;
      let r = { ...e };
      for (let n of Object.keys(t)) {
        let i = t[n],
          u = e[n];
        r[n] = i && u ? l(u, i) : i;
      }
      return r;
    },
    u = (e, t) => {
      let r;
      for (let n of Object.keys(t)) {
        let l = e[n],
          i = t[n];
        if (!l || !i) continue;
        let u = {};
        for (let [e, t] of Object.entries(i))
          null != t && (null === l[e] || void 0 === l[e]) && (u[e] = t);
        0 !== Object.keys(u).length && ((r ??= {})[n] = u);
      }
      return r;
    },
    a = (0, t.$)()(
      (0, r.u)((e, t) => {
        let r = (0, n.H)({
          merge: i,
          onFlush: (t) =>
            e((e) => {
              let r = { ...e.marketActivity };
              for (let [n, l] of t) r[n] = i(e.marketActivity[n], l);
              return { marketActivity: r };
            }),
        });
        return {
          marketActivity: {},
          setMarketActivity: (e) => {
            for (let [t, n] of Object.entries(e)) r.set(t, n);
          },
          seedMarketActivity: (e) => {
            let { marketActivity: n } = t();
            for (let [t, l] of Object.entries(e)) {
              let e = r.peek(t),
                a = e ? i(n[t], e) : n[t];
              if (!a) {
                r.set(t, l);
                continue;
              }
              let s = u(a, l);
              s && r.set(t, s);
            }
          },
          clearMarketActivity: () => {
            (r.clear(), e({ marketActivity: {} }));
          },
        };
      }),
    );
  e.s([
    "u",
    0,
    (e) => {
      a.getState().setMarketActivity(e);
    },
    "c",
    0,
    (e) => {
      a.getState().seedMarketActivity(e);
    },
    "f",
    0,
    a,
  ]);
};
