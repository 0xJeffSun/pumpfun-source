// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var i = e.i(352386),
    t = e.i(748117);
  e.s([
    "u",
    0,
    ({ enabled: e = !0 } = {}) => {
      let { showFiatPrices: r, getUsdPriceForSol: n } = (0, t.u)(),
        [o, a] = (0, i.useState)(!0),
        [d, l] = (0, i.useState)(void 0),
        [c, s] = (0, i.useState)(void 0);
      return (
        (0, i.useEffect)(() => {
          (async () => {
            if (r && e)
              try {
                a(!0);
                let e = await n();
                e ? s(e) : l(Error("Unable to fetch SOL price"));
              } catch (e) {
                l(e);
              } finally {
                a(!1);
              }
            else a(!1);
          })();
        }, []),
        { solPrice: c, isSolPriceLoading: o, solPriceError: d }
      );
    },
  ]);
};
