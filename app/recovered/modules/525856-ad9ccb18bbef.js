// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(352386),
    o = e.i(178061),
    i = e.i(933185),
    a = e.i(748117),
    n = e.i(852104);
  e.s([
    "u",
    0,
    function (e) {
      let {
          tokenPrice: t,
          isTokenPriceLoading: l,
          tokenPriceError: c,
        } = ((e) => {
          let {
              showFiatPrices: n,
              getUsdTokenPrice: t,
              chains: l,
            } = (0, a.u)(),
            [c, d] = (0, r.useState)(!0),
            [s, v] = (0, r.useState)(void 0),
            [p, u] = (0, r.useState)(void 0);
          return (
            (0, r.useEffect)(() => {
              e ||= i.U;
              let r = (0, o.i)(l).find((r) => r.id === Number(e));
              (async () => {
                if (n) {
                  if (!r)
                    return (
                      d(!1),
                      void v(
                        Error(`Unable to fetch token price on chain id ${e}`),
                      )
                    );
                  try {
                    d(!0);
                    let e = await t(r);
                    e
                      ? u(e)
                      : v(
                          Error(
                            `Unable to fetch token price on chain id ${r.id}`,
                          ),
                        );
                  } catch (e) {
                    v(e);
                  } finally {
                    d(!1);
                  }
                } else d(!1);
              })();
            }, [e]),
            { tokenPrice: p, isTokenPriceLoading: c, tokenPriceError: s }
          );
        })("solana" === e ? -1 : e),
        {
          solPrice: d,
          isSolPriceLoading: s,
          solPriceError: v,
        } = (0, n.u)({ enabled: "solana" === e });
      return "solana" === e
        ? { tokenPrice: d, isTokenPriceLoading: s, tokenPriceError: v }
        : { tokenPrice: t, isTokenPriceLoading: l, tokenPriceError: c };
    },
  ]);
};
