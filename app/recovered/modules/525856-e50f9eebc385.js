// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(352386),
    o = r.i(178061),
    i = r.i(933185),
    a = r.i(748117),
    t = r.i(852104);
  r.s([
    "u",
    0,
    function (r) {
      let {
          tokenPrice: n,
          isTokenPriceLoading: l,
          tokenPriceError: c,
        } = ((r) => {
          let {
              showFiatPrices: t,
              getUsdTokenPrice: n,
              chains: l,
            } = (0, a.u)(),
            [c, s] = (0, e.useState)(!0),
            [d, v] = (0, e.useState)(void 0),
            [p, u] = (0, e.useState)(void 0);
          return (
            (0, e.useEffect)(() => {
              r ||= i.U;
              let e = (0, o.i)(l).find((e) => e.id === Number(r));
              (async () => {
                if (t) {
                  if (!e)
                    return (
                      s(!1),
                      void v(
                        Error(`Unable to fetch token price on chain id ${r}`),
                      )
                    );
                  try {
                    s(!0);
                    let r = await n(e);
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
                    s(!1);
                  }
                } else s(!1);
              })();
            }, [r]),
            { tokenPrice: p, isTokenPriceLoading: c, tokenPriceError: d }
          );
        })("solana" === r ? -1 : r),
        {
          solPrice: s,
          isSolPriceLoading: d,
          solPriceError: v,
        } = (0, t.u)({ enabled: "solana" === r });
      return "solana" === r
        ? { tokenPrice: s, isTokenPriceLoading: d, tokenPriceError: v }
        : { tokenPrice: n, isTokenPriceLoading: l, tokenPriceError: c };
    },
  ]);
};
