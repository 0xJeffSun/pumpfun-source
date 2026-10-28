// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(748117);
  e.s([
    "u",
    0,
    ({ enabled: e = !0 } = {}) => {
      let { showFiatPrices: a, getUsdPriceForSol: r } = (0, n.u)(),
        [i, o] = (0, t.useState)(!0),
        [s, c] = (0, t.useState)(void 0),
        [l, d] = (0, t.useState)(void 0);
      return (
        (0, t.useEffect)(() => {
          (async () => {
            if (a && e)
              try {
                o(!0);
                let e = await r();
                e ? d(e) : c(Error("Unable to fetch SOL price"));
              } catch (e) {
                c(e);
              } finally {
                o(!1);
              }
            else o(!1);
          })();
        }, []),
        { solPrice: l, isSolPriceLoading: i, solPriceError: s }
      );
    },
  ]);
};
