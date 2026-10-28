// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var i = e.i(352386),
    t = e.i(178061),
    r = e.i(933185),
    n = e.i(748117),
    o = e.i(852104);
  e.s([
    "u",
    0,
    function (e) {
      let {
          tokenPrice: a,
          isTokenPriceLoading: d,
          tokenPriceError: l,
        } = ((e) => {
          let {
              showFiatPrices: o,
              getUsdTokenPrice: a,
              chains: d,
            } = (0, n.u)(),
            [l, c] = (0, i.useState)(!0),
            [s, u] = (0, i.useState)(void 0),
            [p, f] = (0, i.useState)(void 0);
          return (
            (0, i.useEffect)(() => {
              e ||= r.U;
              let i = (0, t.i)(d).find((i) => i.id === Number(e));
              (async () => {
                if (o) {
                  if (!i)
                    return (
                      c(!1),
                      void u(
                        Error(`Unable to fetch token price on chain id ${e}`),
                      )
                    );
                  try {
                    c(!0);
                    let e = await a(i);
                    e
                      ? f(e)
                      : u(
                          Error(
                            `Unable to fetch token price on chain id ${i.id}`,
                          ),
                        );
                  } catch (e) {
                    u(e);
                  } finally {
                    c(!1);
                  }
                } else c(!1);
              })();
            }, [e]),
            { tokenPrice: p, isTokenPriceLoading: l, tokenPriceError: s }
          );
        })("solana" === e ? -1 : e),
        {
          solPrice: c,
          isSolPriceLoading: s,
          solPriceError: u,
        } = (0, o.u)({ enabled: "solana" === e });
      return "solana" === e
        ? { tokenPrice: c, isTokenPriceLoading: s, tokenPriceError: u }
        : { tokenPrice: a, isTokenPriceLoading: d, tokenPriceError: l };
    },
  ]);
};
