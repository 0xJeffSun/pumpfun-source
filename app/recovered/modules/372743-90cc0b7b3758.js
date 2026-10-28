// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(78436),
    i = e.i(634103),
    l = e.i(811005);
  let r = (e, t) => {
      let i = { ...e };
      for (let [e, l] of Object.entries(t)) null != l && (i[e] = l);
      return i;
    },
    a = (e, t) => {
      if (!e) return t;
      let i = { ...e };
      for (let l of Object.keys(t)) {
        let a = t[l],
          n = e[l];
        i[l] = a && n ? r(n, a) : a;
      }
      return i;
    },
    n = (e, t) => {
      let i;
      for (let l of Object.keys(t)) {
        let r = e[l],
          a = t[l];
        if (!r || !a) continue;
        let n = {};
        for (let [e, t] of Object.entries(a))
          null != t && (null === r[e] || void 0 === r[e]) && (n[e] = t);
        0 !== Object.keys(n).length && ((i ??= {})[l] = n);
      }
      return i;
    },
    o = (0, t.$)()(
      (0, i.u)((e, t) => {
        let i = (0, l.H)({
          merge: a,
          onFlush: (t) =>
            e((e) => {
              let i = { ...e.marketActivity };
              for (let [l, r] of t) i[l] = a(e.marketActivity[l], r);
              return { marketActivity: i };
            }),
        });
        return {
          marketActivity: {},
          setMarketActivity: (e) => {
            for (let [t, l] of Object.entries(e)) i.set(t, l);
          },
          seedMarketActivity: (e) => {
            let { marketActivity: l } = t();
            for (let [t, r] of Object.entries(e)) {
              let e = i.peek(t),
                o = e ? a(l[t], e) : l[t];
              if (!o) {
                i.set(t, r);
                continue;
              }
              let s = n(o, r);
              s && i.set(t, s);
            }
          },
          clearMarketActivity: () => {
            (i.clear(), e({ marketActivity: {} }));
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
