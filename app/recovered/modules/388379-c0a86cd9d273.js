// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    n = e.i(574472),
    r = e.i(453706),
    s = e.i(352386);
  e.i(12692);
  var l = e.i(398902),
    a = e.i(574397),
    o = e.i(778836),
    c = e.i(79631),
    d = e.i(861398),
    u = e.i(795663),
    m = e.i(707138),
    p = e.i(434644),
    f = e.i(672287),
    y = e.i(973374),
    h = e.i(889451),
    g = e.i(787639),
    _ = e.i(662093),
    x = e.i(906305),
    b = e.i(266300),
    v = e.i(248208),
    U = e.i(361284);
  let w = (0, r.default)(
    () => e.A(873795).then((e) => e.EvmBalanceFallbackCard),
    { loadableGenerated: { modules: [454470] }, ssr: !1 },
  );
  function P() {
    return !1;
  }
  function j(e) {
    let n,
      r,
      s,
      c,
      d,
      p,
      f,
      h,
      x = (0, i.c)(42),
      {
        coin: b,
        address: v,
        pnl: U,
        summary: w,
        tickPriceUsd: P,
        onRefresh: j,
      } = e,
      { t: S } = (0, l.f)();
    x[0] !== v ? ((n = { solAddress: v }), (x[0] = v), (x[1] = n)) : (n = x[1]);
    let k = (0, u.O)(n),
      N = k.data ?? null;
    x[2] !== b.chain_id || x[3] !== b.mint || x[4] !== N
      ? ((r = { mint: b.mint, chainId: b.chain_id, walletAddress: N }),
        (x[2] = b.chain_id),
        (x[3] = b.mint),
        (x[4] = N),
        (x[5] = r))
      : (r = x[5]);
    let L = (0, m.R)(r),
      T = (0, _.m)(b);
    if (k.isLoading || (N && L.isLoading)) return null;
    let O =
      N && L.data && L.data.balanceRaw > BigInt(0)
        ? Number(L.data.balanceRaw) / 10 ** L.data.decimals
        : null;
    if (null == O) {
      let e,
        i,
        n = U?.amountHeld ?? null,
        r = U?.amountBoughtUsd ?? null;
      return (
        x[6] !== b
          ? ((e = (0, t.jsx)(o.f, {
              coin: b,
              hasPosition: !1,
              positionUsd: null,
            })),
            (x[6] = b),
            (x[7] = e))
          : (e = x[7]),
        x[8] !== b ||
        x[9] !== j ||
        x[10] !== w.displayPct ||
        x[11] !== w.netPnlUsd ||
        x[12] !== w.positionUsd ||
        x[13] !== n ||
        x[14] !== r ||
        x[15] !== e
          ? ((i = (0, t.jsx)(a.J, {
              coin: b,
              positionUsd: w.positionUsd,
              positionTokenAmount: n,
              netPnlUsd: w.netPnlUsd,
              displayPct: w.displayPct,
              spentUsd: r,
              isClosed: !0,
              onRefresh: j,
              tpSlSlot: e,
            })),
            (x[8] = b),
            (x[9] = j),
            (x[10] = w.displayPct),
            (x[11] = w.netPnlUsd),
            (x[12] = w.positionUsd),
            (x[13] = n),
            (x[14] = r),
            (x[15] = e),
            (x[16] = i))
          : (i = x[16]),
        i
      );
    }
    let E = T?.codexSupply;
    x[17] !== b || x[18] !== E || x[19] !== P
      ? ((s = (0, y.s)({ coin: b, livePriceUsd: P, codexSupply: E })),
        (x[17] = b),
        (x[18] = E),
        (x[19] = P),
        (x[20] = s))
      : (s = x[20]);
    let A = s,
      C = A > 0 ? O * A : null,
      M = U?.amountBoughtUsd ?? null;
    return (
      x[21] !== O || x[22] !== b || x[23] !== T
        ? ((c = (0, g.f)(O, (0, _.X)({ coin: b, basis: T }))),
          (x[21] = O),
          (x[22] = b),
          (x[23] = T),
          (x[24] = c))
        : (c = x[24]),
      x[25] !== S
        ? ((d = S("web.coin.position_from_chain_note")),
          (x[25] = S),
          (x[26] = d))
        : (d = x[26]),
      x[27] !== d
        ? ((p = (0, t.jsx)("p", {
            "data-testid": "evm-position-chain-balance-note",
            className: "text-xs text-text-tertiary",
            children: d,
          })),
          (x[27] = d),
          (x[28] = p))
        : (p = x[28]),
      x[29] !== O || x[30] !== C || x[31] !== b
        ? ((f = (0, t.jsx)(o.f, {
            coin: b,
            hasPosition: !0,
            positionUsd: C,
            positionTokens: O,
          })),
          (x[29] = O),
          (x[30] = C),
          (x[31] = b),
          (x[32] = f))
        : (f = x[32]),
      x[33] !== O ||
      x[34] !== C ||
      x[35] !== b ||
      x[36] !== j ||
      x[37] !== M ||
      x[38] !== c ||
      x[39] !== p ||
      x[40] !== f
        ? ((h = (0, t.jsx)(a.J, {
            coin: b,
            positionUsd: C,
            positionTokenAmount: O,
            netPnlUsd: null,
            displayPct: null,
            spentUsd: M,
            supplyShare: c,
            isClosed: !1,
            onRefresh: j,
            embeddedFooter: p,
            tpSlSlot: f,
          })),
          (x[33] = O),
          (x[34] = C),
          (x[35] = b),
          (x[36] = j),
          (x[37] = M),
          (x[38] = c),
          (x[39] = p),
          (x[40] = f),
          (x[41] = h))
        : (h = x[41]),
      h
    );
  }
  e.s([
    "f",
    0,
    function (e) {
      let r,
        l,
        u,
        m,
        y = (0, i.c)(17),
        { coin: _ } = e,
        { address: S } = (0, n.F)();
      y[0] !== _.mint
        ? ((r = [_.mint]), (y[0] = _.mint), (y[1] = r))
        : (r = y[1]);
      let k = !!S;
      y[2] !== S || y[3] !== r || y[4] !== k
        ? ((l = { userId: S, mints: r, enabled: k, refetchIntervalMs: a.a }),
          (y[2] = S),
          (y[3] = r),
          (y[4] = k),
          (y[5] = l))
        : (l = y[5]);
      let { positionFor: N, isLoading: L, refetch: T } = (0, c._)(l),
        O = (0, f.f)(_.mint),
        E = (0, p.f)(_),
        A = N(_.mint),
        C = !!S && A?.servedQuoteRejected === !0;
      y[6] !== S || y[7] !== C
        ? ((u = { address: S, enabled: C }), (y[6] = S), (y[7] = C), (y[8] = u))
        : (u = y[8]);
      let M = (0, d.f)(u),
        K = A?.servedQuoteRejected
          ? (0, x.H)({ holdings: M, mint: _.mint, chainId: A.chainId })
          : null,
        I = (0, s.useSyncExternalStore)(b.$, b.c, P);
      if (!S || L) return null;
      let q = A?.servedQuoteRejected ? null : O,
        F = (0, h.j)(A, q) ?? (0, h.y)(A),
        B =
          F && !F.isClosed && K
            ? {
                ...F,
                positionUsd: K.valueUsd ?? null,
                netPnlUsd: K.pnlUsd,
                displayPct: (0, U.f)(K.pnlPercentage),
              }
            : F;
      if (B?.isClosed)
        return (0, t.jsx)(j, {
          coin: _,
          address: S,
          pnl: A,
          summary: B,
          tickPriceUsd: O,
          onRefresh: T,
        });
      if (B) {
        let e,
          i = A?.amountHeld ?? null,
          n = (i ?? 0) > 0,
          r = null != B.positionUsd && B.positionUsd > 0 ? B.positionUsd : null;
        return (
          y[9] !== i || y[10] !== _ || y[11] !== n || y[12] !== r
            ? ((e = (0, t.jsx)(o.f, {
                coin: _,
                hasPosition: n,
                positionUsd: r,
                positionTokens: i,
              })),
              (y[9] = i),
              (y[10] = _),
              (y[11] = n),
              (y[12] = r),
              (y[13] = e))
            : (e = y[13]),
          (0, t.jsx)(a.J, {
            coin: _,
            positionUsd: B.positionUsd,
            positionTokenAmount: i,
            netPnlUsd: B.netPnlUsd,
            displayPct: B.displayPct,
            spentUsd: A?.amountBoughtUsd ?? null,
            isClosed: B.isClosed,
            soldFraction: B.soldFraction,
            supplyShare: (0, g.f)(i, E),
            onRefresh: T,
            tpSlSlot: e,
          })
        );
      }
      return I
        ? (y[14] !== _ || y[15] !== T
            ? ((m = (0, t.jsx)(v.R, {
                children: (0, t.jsx)(w, { coin: _, onRefresh: T }),
              })),
              (y[14] = _),
              (y[15] = T),
              (y[16] = m))
            : (m = y[16]),
          m)
        : null;
    },
  ]);
};
