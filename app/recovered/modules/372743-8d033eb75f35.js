// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(78436),
    a = e.i(634103),
    i = e.i(811005);
  let l = (e, t) => {
      let a = { ...e };
      for (let [e, i] of Object.entries(t)) null != i && (a[e] = i);
      return a;
    },
    r = (e, t) => {
      if (!e) return t;
      let a = { ...e };
      for (let i of Object.keys(t)) {
        let r = t[i],
          n = e[i];
        a[i] = r && n ? l(n, r) : r;
      }
      return a;
    },
    n = (e, t) => {
      let a;
      for (let i of Object.keys(t)) {
        let l = e[i],
          r = t[i];
        if (!l || !r) continue;
        let n = {};
        for (let [e, t] of Object.entries(r))
          null != t && (null === l[e] || void 0 === l[e]) && (n[e] = t);
        0 !== Object.keys(n).length && ((a ??= {})[i] = n);
      }
      return a;
    },
    o = (0, t.$)()(
      (0, a.u)((e, t) => {
        let a = (0, i.H)({
          merge: r,
          onFlush: (t) =>
            e((e) => {
              let a = { ...e.marketActivity };
              for (let [i, l] of t) a[i] = r(e.marketActivity[i], l);
              return { marketActivity: a };
            }),
        });
        return {
          marketActivity: {},
          setMarketActivity: (e) => {
            for (let [t, i] of Object.entries(e)) a.set(t, i);
          },
          seedMarketActivity: (e) => {
            let { marketActivity: i } = t();
            for (let [t, l] of Object.entries(e)) {
              let e = a.peek(t),
                o = e ? r(i[t], e) : i[t];
              if (!o) {
                a.set(t, l);
                continue;
              }
              let s = n(o, l);
              s && a.set(t, s);
            }
          },
          clearMarketActivity: () => {
            (a.clear(), e({ marketActivity: {} }));
          },
        };
      }),
    );
  e.s([
    "u",
    0,
    (e) => {
      o.getState().setMarketActivity(e);
    },
    "c",
    0,
    (e) => {
      o.getState().seedMarketActivity(e);
    },
    "f",
    0,
    o,
  ]);
};
