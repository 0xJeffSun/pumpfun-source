// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(78436),
    r = e.i(634103),
    a = e.i(811005);
  let i = (e, t) => {
      let r = { ...e };
      for (let [e, a] of Object.entries(t)) null != a && (r[e] = a);
      return r;
    },
    n = (e, t) => {
      if (!e) return t;
      let r = { ...e };
      for (let a of Object.keys(t)) {
        let n = t[a],
          l = e[a];
        r[a] = n && l ? i(l, n) : n;
      }
      return r;
    },
    l = (e, t) => {
      let r;
      for (let a of Object.keys(t)) {
        let i = e[a],
          n = t[a];
        if (!i || !n) continue;
        let l = {};
        for (let [e, t] of Object.entries(n))
          null != t && (null === i[e] || void 0 === i[e]) && (l[e] = t);
        0 !== Object.keys(l).length && ((r ??= {})[a] = l);
      }
      return r;
    },
    s = (0, t.$)()(
      (0, r.u)((e, t) => {
        let r = (0, a.H)({
          merge: n,
          onFlush: (t) =>
            e((e) => {
              let r = { ...e.marketActivity };
              for (let [a, i] of t) r[a] = n(e.marketActivity[a], i);
              return { marketActivity: r };
            }),
        });
        return {
          marketActivity: {},
          setMarketActivity: (e) => {
            for (let [t, a] of Object.entries(e)) r.set(t, a);
          },
          seedMarketActivity: (e) => {
            let { marketActivity: a } = t();
            for (let [t, i] of Object.entries(e)) {
              let e = r.peek(t),
                s = e ? n(a[t], e) : a[t];
              if (!s) {
                r.set(t, i);
                continue;
              }
              let o = l(s, i);
              o && r.set(t, o);
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
      s.getState().setMarketActivity(e);
    },
    "c",
    0,
    (e) => {
      s.getState().seedMarketActivity(e);
    },
    "f",
    0,
    s,
  ]);
};
