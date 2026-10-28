// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(s) => {
  "use strict";
  var t = s.i(732486),
    a = s.i(445242),
    m = s.i(574397),
    l = s.i(778836),
    i = s.i(707138),
    e = s.i(107956),
    c = s.i(672287),
    u = s.i(973374),
    n = s.i(787639),
    h = s.i(662093);
  s.s([
    "EvmBalanceFallbackCard",
    0,
    function (s) {
      let b,
        k,
        j,
        p,
        r,
        o = (0, a.c)(24),
        { coin: v, onRefresh: P } = s,
        { evmWalletAddress: f } = (0, e.f)(),
        d = (0, c.f)(v.mint);
      o[0] !== v.chain_id || o[1] !== v.mint || o[2] !== f
        ? ((b = { mint: v.mint, chainId: v.chain_id, walletAddress: f }),
          (o[0] = v.chain_id),
          (o[1] = v.mint),
          (o[2] = f),
          (o[3] = b))
        : (b = o[3]);
      let y = (0, i.R)(b),
        w = (0, h.m)(v),
        g =
          y.data && y.data.balanceRaw > BigInt(0)
            ? Number(y.data.balanceRaw) / 10 ** y.data.decimals
            : null;
      if (null == g) return null;
      let z = w?.codexSupply;
      o[4] !== v || o[5] !== d || o[6] !== z
        ? ((k = (0, u.s)({ coin: v, livePriceUsd: d, codexSupply: z })),
          (o[4] = v),
          (o[5] = d),
          (o[6] = z),
          (o[7] = k))
        : (k = o[7]);
      let q = k,
        _ = q > 0 ? g * q : null;
      o[8] !== g || o[9] !== v || o[10] !== w
        ? ((j = (0, n.f)(g, (0, h.X)({ coin: v, basis: w }))),
          (o[8] = g),
          (o[9] = v),
          (o[10] = w),
          (o[11] = j))
        : (j = o[11]);
      let x = g > 0;
      return (
        o[12] !== g || o[13] !== v || o[14] !== _ || o[15] !== x
          ? ((p = (0, t.jsx)(l.f, {
              coin: v,
              hasPosition: x,
              positionUsd: _,
              positionTokens: g,
            })),
            (o[12] = g),
            (o[13] = v),
            (o[14] = _),
            (o[15] = x),
            (o[16] = p))
          : (p = o[16]),
        o[17] !== g ||
        o[18] !== v ||
        o[19] !== P ||
        o[20] !== _ ||
        o[21] !== j ||
        o[22] !== p
          ? ((r = (0, t.jsx)(m.J, {
              coin: v,
              positionUsd: _,
              positionTokenAmount: g,
              netPnlUsd: null,
              displayPct: null,
              spentUsd: null,
              supplyShare: j,
              isClosed: !1,
              onRefresh: P,
              tpSlSlot: p,
            })),
            (o[17] = g),
            (o[18] = v),
            (o[19] = P),
            (o[20] = _),
            (o[21] = j),
            (o[22] = p),
            (o[23] = r))
          : (r = o[23]),
        r
      );
    },
  ]);
};
