// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(526080);
  e.i(927878);
  var n = e.i(527260),
    r = e.i(789793),
    i = e.i(605587);
  let l = new Set(["pump", "pump_amm"]),
    a = (e) => "number" == typeof e && Number.isFinite(e) && e > 0,
    o = (e) => void 0 !== e.board_program && l.has(e.board_program);
  e.s([
    "W",
    0,
    ({ coin: e, row: r, basis: l, supply: s }) => {
      let u =
        !s || (0, t.u)(e)
          ? e
          : {
              ...e,
              total_supply: s.totalSupply,
              base_decimals: s.baseDecimals,
            };
      if (
        !(
          (0, i.N)({ mint: e.mint, chainId: e.chain_id }) ||
          a(r?.priceUsd) ||
          (0, t.u)(u) ||
          o(e)
        )
      )
        return null;
      let c = (0, n.f)({ coin: u, row: r, basis: l });
      return c > 0 ? c : null;
    },
    "j",
    0,
    (e) =>
      !Number.isFinite(e) || e <= 0
        ? "$0"
        : e >= 1
          ? new Intl.NumberFormat("en-US", {
              currency: "USD",
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
              style: "currency",
            }).format(e)
          : `$${new Intl.NumberFormat("en-US", { maximumSignificantDigits: 4, minimumSignificantDigits: 1, useGrouping: !1 }).format(e)}`,
    "K",
    0,
    a,
    "D",
    0,
    (e) =>
      !(0, i.N)({ mint: e.mint, chainId: e.chain_id }) && !(0, t.u)(e) && !o(e),
    "r",
    0,
    (e) =>
      !Number.isFinite(e) || e <= 0
        ? e
        : e >= 1
          ? Math.round(100 * e) / 100
          : (0, r.f)(e, 4),
  ]);
};
