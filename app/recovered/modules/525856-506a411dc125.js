// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    i = e.i(178061),
    a = e.i(933185),
    n = e.i(748117),
    r = e.i(852104);
  e.s([
    "u",
    0,
    function (e) {
      let {
          tokenPrice: o,
          isTokenPriceLoading: s,
          tokenPriceError: d,
        } = ((e) => {
          let {
              showFiatPrices: r,
              getUsdTokenPrice: o,
              chains: s,
            } = (0, n.u)(),
            [d, l] = (0, t.useState)(!0),
            [c, u] = (0, t.useState)(void 0),
            [g, f] = (0, t.useState)(void 0);
          return (
            (0, t.useEffect)(() => {
              e ||= a.U;
              let t = (0, i.i)(s).find((t) => t.id === Number(e));
              (async () => {
                if (r) {
                  if (!t)
                    return (
                      l(!1),
                      void u(
                        Error(`Unable to fetch token price on chain id ${e}`),
                      )
                    );
                  try {
                    l(!0);
                    let e = await o(t);
                    e
                      ? f(e)
                      : u(
                          Error(
                            `Unable to fetch token price on chain id ${t.id}`,
                          ),
                        );
                  } catch (e) {
                    u(e);
                  } finally {
                    l(!1);
                  }
                } else l(!1);
              })();
            }, [e]),
            { tokenPrice: g, isTokenPriceLoading: d, tokenPriceError: c }
          );
        })("solana" === e ? -1 : e),
        {
          solPrice: l,
          isSolPriceLoading: c,
          solPriceError: u,
        } = (0, r.u)({ enabled: "solana" === e });
      return "solana" === e
        ? { tokenPrice: l, isTokenPriceLoading: c, tokenPriceError: u }
        : { tokenPrice: o, isTokenPriceLoading: s, tokenPriceError: d };
    },
  ]);
};
