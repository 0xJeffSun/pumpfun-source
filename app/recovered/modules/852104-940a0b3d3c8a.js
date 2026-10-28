// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(748117);
  e.s([
    "u",
    0,
    ({ enabled: e = !0 } = {}) => {
      let { showFiatPrices: a, getUsdPriceForSol: i } = (0, n.u)(),
        [s, r] = (0, t.useState)(!0),
        [o, l] = (0, t.useState)(void 0),
        [d, c] = (0, t.useState)(void 0);
      return (
        (0, t.useEffect)(() => {
          (async () => {
            if (a && e)
              try {
                r(!0);
                let e = await i();
                e ? c(e) : l(Error("Unable to fetch SOL price"));
              } catch (e) {
                l(e);
              } finally {
                r(!1);
              }
            else r(!1);
          })();
        }, []),
        { solPrice: d, isSolPriceLoading: s, solPriceError: o }
      );
    },
  ]);
};
