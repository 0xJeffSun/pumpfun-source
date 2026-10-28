// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(78436),
    r = e.i(634103),
    i = e.i(811005);
  let l = (e, t) => {
      let r = { ...e };
      for (let [e, i] of Object.entries(t)) null != i && (r[e] = i);
      return r;
    },
    a = (e, t) => {
      if (!e) return t;
      let r = { ...e };
      for (let i of Object.keys(t)) {
        let a = t[i],
          n = e[i];
        r[i] = a && n ? l(n, a) : a;
      }
      return r;
    },
    n = (e, t) => {
      let r;
      for (let i of Object.keys(t)) {
        let l = e[i],
          a = t[i];
        if (!l || !a) continue;
        let n = {};
        for (let [e, t] of Object.entries(a))
          null != t && (null === l[e] || void 0 === l[e]) && (n[e] = t);
        0 !== Object.keys(n).length && ((r ??= {})[i] = n);
      }
      return r;
    },
    o = (0, t.$)()(
      (0, r.u)((e, t) => {
        let r = (0, i.H)({
          merge: a,
          onFlush: (t) =>
            e((e) => {
              let r = { ...e.marketActivity };
              for (let [i, l] of t) r[i] = a(e.marketActivity[i], l);
              return { marketActivity: r };
            }),
        });
        return {
          marketActivity: {},
          setMarketActivity: (e) => {
            for (let [t, i] of Object.entries(e)) r.set(t, i);
          },
          seedMarketActivity: (e) => {
            let { marketActivity: i } = t();
            for (let [t, l] of Object.entries(e)) {
              let e = r.peek(t),
                o = e ? a(i[t], e) : i[t];
              if (!o) {
                r.set(t, l);
                continue;
              }
              let s = n(o, l);
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
