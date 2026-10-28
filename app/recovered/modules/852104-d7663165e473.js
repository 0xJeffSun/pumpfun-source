// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(352386),
    o = e.i(748117);
  e.s([
    "u",
    0,
    ({ enabled: e = !0 } = {}) => {
      let { showFiatPrices: i, getUsdPriceForSol: a } = (0, o.u)(),
        [n, t] = (0, r.useState)(!0),
        [l, c] = (0, r.useState)(void 0),
        [d, s] = (0, r.useState)(void 0);
      return (
        (0, r.useEffect)(() => {
          (async () => {
            if (i && e)
              try {
                t(!0);
                let e = await a();
                e ? s(e) : c(Error("Unable to fetch SOL price"));
              } catch (e) {
                c(e);
              } finally {
                t(!1);
              }
            else t(!1);
          })();
        }, []),
        { solPrice: d, isSolPriceLoading: n, solPriceError: l }
      );
    },
  ]);
};
