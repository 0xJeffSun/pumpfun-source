// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(178061),
    a = e.i(933185),
    i = e.i(748117),
    s = e.i(852104);
  e.s([
    "u",
    0,
    function (e) {
      let {
          tokenPrice: r,
          isTokenPriceLoading: o,
          tokenPriceError: l,
        } = ((e) => {
          let {
              showFiatPrices: s,
              getUsdTokenPrice: r,
              chains: o,
            } = (0, i.u)(),
            [l, d] = (0, t.useState)(!0),
            [c, u] = (0, t.useState)(void 0),
            [p, m] = (0, t.useState)(void 0);
          return (
            (0, t.useEffect)(() => {
              e ||= a.U;
              let t = (0, n.i)(o).find((t) => t.id === Number(e));
              (async () => {
                if (s) {
                  if (!t)
                    return (
                      d(!1),
                      void u(
                        Error(`Unable to fetch token price on chain id ${e}`),
                      )
                    );
                  try {
                    d(!0);
                    let e = await r(t);
                    e
                      ? m(e)
                      : u(
                          Error(
                            `Unable to fetch token price on chain id ${t.id}`,
                          ),
                        );
                  } catch (e) {
                    u(e);
                  } finally {
                    d(!1);
                  }
                } else d(!1);
              })();
            }, [e]),
            { tokenPrice: p, isTokenPriceLoading: l, tokenPriceError: c }
          );
        })("solana" === e ? -1 : e),
        {
          solPrice: d,
          isSolPriceLoading: c,
          solPriceError: u,
        } = (0, s.u)({ enabled: "solana" === e });
      return "solana" === e
        ? { tokenPrice: d, isTokenPriceLoading: c, tokenPriceError: u }
        : { tokenPrice: r, isTokenPriceLoading: o, tokenPriceError: l };
    },
  ]);
};
