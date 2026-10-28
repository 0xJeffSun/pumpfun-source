// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(352386),
    o = r.i(178061),
    i = r.i(933185),
    a = r.i(748117),
    n = r.i(852104);
  r.s([
    "u",
    0,
    function (r) {
      let {
          tokenPrice: t,
          isTokenPriceLoading: l,
          tokenPriceError: c,
        } = ((r) => {
          let {
              showFiatPrices: n,
              getUsdTokenPrice: t,
              chains: l,
            } = (0, a.u)(),
            [c, d] = (0, e.useState)(!0),
            [s, v] = (0, e.useState)(void 0),
            [p, u] = (0, e.useState)(void 0);
          return (
            (0, e.useEffect)(() => {
              r ||= i.U;
              let e = (0, o.i)(l).find((e) => e.id === Number(r));
              (async () => {
                if (n) {
                  if (!e)
                    return (
                      d(!1),
                      void v(
                        Error(`Unable to fetch token price on chain id ${r}`),
                      )
                    );
                  try {
                    d(!0);
                    let r = await t(e);
                    r
                      ? u(r)
                      : v(
                          Error(
                            `Unable to fetch token price on chain id ${e.id}`,
                          ),
                        );
                  } catch (r) {
                    v(r);
                  } finally {
                    d(!1);
                  }
                } else d(!1);
              })();
            }, [r]),
            { tokenPrice: p, isTokenPriceLoading: c, tokenPriceError: s }
          );
        })("solana" === r ? -1 : r),
        {
          solPrice: d,
          isSolPriceLoading: s,
          solPriceError: v,
        } = (0, n.u)({ enabled: "solana" === r });
      return "solana" === r
        ? { tokenPrice: d, isTokenPriceLoading: s, tokenPriceError: v }
        : { tokenPrice: t, isTokenPriceLoading: l, tokenPriceError: c };
    },
  ]);
};
