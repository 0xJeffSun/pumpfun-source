// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(352386),
    o = r.i(496194),
    i = r.i(499868),
    a = r.i(451993),
    t = r.i(748117);
  r.s([
    "u",
    0,
    function ({ rpcConfig: r, appId: n, address: l, chain: c }) {
      let { chains: s } = (0, t.u)(),
        [d, u] = (0, e.useState)(0n),
        [v, p] = (0, e.useState)(!1),
        h = (0, e.useMemo)(() => {
          let e = c || s[0];
          if (e)
            return (0, o.f)({
              chain: c,
              transport: (0, i.f)((0, a.a)(e, r, n)),
            });
        }, [c, r, n]),
        g = (0, e.useCallback)(async () => {
          if (!l || !h) return;
          p(!0);
          let r = await h.getBalance({ address: l }).catch(console.error);
          return r ? (u(r), p(!1), r) : void 0;
        }, [h, l, u]);
      return (
        (0, e.useEffect)(() => {
          g().catch(console.error);
        }, []),
        { balance: d, isLoading: v, reloadBalance: g }
      );
    },
  ]);
};
