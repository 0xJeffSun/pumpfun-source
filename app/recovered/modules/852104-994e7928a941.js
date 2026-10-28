// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    i = e.i(748117);
  e.s([
    "u",
    0,
    ({ enabled: e = !0 } = {}) => {
      let { showFiatPrices: a, getUsdPriceForSol: n } = (0, i.u)(),
        [r, o] = (0, t.useState)(!0),
        [s, d] = (0, t.useState)(void 0),
        [l, c] = (0, t.useState)(void 0);
      return (
        (0, t.useEffect)(() => {
          (async () => {
            if (a && e)
              try {
                o(!0);
                let e = await n();
                e ? c(e) : d(Error("Unable to fetch SOL price"));
              } catch (e) {
                d(e);
              } finally {
                o(!1);
              }
            else o(!1);
          })();
        }, []),
        { solPrice: l, isSolPriceLoading: r, solPriceError: s }
      );
    },
  ]);
};
