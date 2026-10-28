// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(352386),
    o = r.i(748117);
  r.s([
    "u",
    0,
    ({ enabled: r = !0 } = {}) => {
      let { showFiatPrices: i, getUsdPriceForSol: a } = (0, o.u)(),
        [t, n] = (0, e.useState)(!0),
        [l, c] = (0, e.useState)(void 0),
        [s, d] = (0, e.useState)(void 0);
      return (
        (0, e.useEffect)(() => {
          (async () => {
            if (i && r)
              try {
                n(!0);
                let r = await a();
                r ? d(r) : c(Error("Unable to fetch SOL price"));
              } catch (r) {
                c(r);
              } finally {
                n(!1);
              }
            else n(!1);
          })();
        }, []),
        { solPrice: s, isSolPriceLoading: t, solPriceError: l }
      );
    },
  ]);
};
