// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(496194),
    a = e.i(499868),
    i = e.i(451993),
    s = e.i(748117);
  e.s([
    "u",
    0,
    function ({ rpcConfig: e, appId: r, address: o, chain: l }) {
      let { chains: d } = (0, s.u)(),
        [c, u] = (0, t.useState)(0n),
        [p, m] = (0, t.useState)(!1),
        y = (0, t.useMemo)(() => {
          let t = l || d[0];
          if (t)
            return (0, n.f)({
              chain: l,
              transport: (0, a.f)((0, i.a)(t, e, r)),
            });
        }, [l, e, r]),
        f = (0, t.useCallback)(async () => {
          if (!o || !y) return;
          m(!0);
          let e = await y.getBalance({ address: o }).catch(console.error);
          return e ? (u(e), m(!1), e) : void 0;
        }, [y, o, u]);
      return (
        (0, t.useEffect)(() => {
          f().catch(console.error);
        }, []),
        { balance: c, isLoading: p, reloadBalance: f }
      );
    },
  ]);
};
