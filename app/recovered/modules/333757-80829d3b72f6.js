// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(707393),
    n = e.i(21617);
  let r = (e) =>
      e.chain === n.g &&
      e.assetClass === n.h &&
      void 0 !== e.perp &&
      null !== e.perp,
    i = (e) => (null != e && e.length > 0 ? e : null),
    a = (e) => {
      if (null == e) return null;
      let t = "number" == typeof e ? e : Number(e);
      return Number.isFinite(t) ? t : null;
    },
    o = (e) => {
      if (null == e) return null;
      let t = String(e);
      return t.length > 0 && Number.isFinite(Number(t)) ? t : null;
    },
    s = (e) => {
      if (null == e) return null;
      if ("number" == typeof e) return Number.isFinite(e) ? e : null;
      let t = Date.parse(e);
      return Number.isFinite(t) ? t : null;
    },
    l = new Set(["crypto", "stocks", "commodities"]),
    u = (e) => {
      if (!e.perp) throw TypeError(`perp read: ${e.mint} has no perp block`);
      return e.perp;
    },
    c = (e) => {
      let r,
        c = u(e),
        d = 100 * (a(c.fundingRateHourly) ?? 0);
      return {
        coin: e.mint,
        displayName: i(e.name) ?? e.mint,
        ticker: i(e.symbol) ?? e.mint,
        imageUri: i(e.image_uri),
        imageBackdrop: (0, t.b)(e.image_backdrop) ? e.image_backdrop : null,
        category: "string" == typeof (r = c.category) && l.has(r) ? r : null,
        markPx: o(c.markPx) ?? "0",
        markAsOf: s(c.asOf),
        change24hPct:
          null === c.priceChange24hBps || void 0 === c.priceChange24hBps
            ? null
            : c.priceChange24hBps / 100,
        maxLeverage: c.maxLeverage,
        szDecimals: c.szDecimals,
        minNotionalUsd: n.l,
        dex: i(c.dex),
        onlyIsolated: c.onlyIsolated,
        isDelisted: c.isDelisted,
        volume24hUsd: a(c.volume24hUsd),
        openInterestUsd: a(c.openInterestUsd),
        fundingRateHourlyPct: d,
        fundingAprPct: 24 * d * 365,
        followedHolders: e.followed_holders ?? null,
      };
    },
    d = (e) => Math.max(1, Math.round(e / 1e4)),
    f = new Set(["unknown", "missing", "active"]),
    h = (e) => {
      if (void 0 === e) return null;
      let t = e.find((e) => e.chain === n.g);
      return t ? (t.valueUsd ?? t.amount) : 0;
    },
    p = new Set(["tp", "sl", "limit"]),
    m = (e, t) => {
      let n = null,
        r = null;
      for (let i of e ?? [])
        i.coin === t &&
          null !== i.triggerPx &&
          ("tp" === i.kind &&
            null === n &&
            (n = { px: i.triggerPx, oid: i.oid }),
          "sl" === i.kind &&
            null === r &&
            (r = { px: i.triggerPx, oid: i.oid }));
      return { tp: n, sl: r };
    };
  e.s([
    "u",
    0,
    r,
    "K",
    0,
    (e) => (r(e) ? c(e) : null),
    "$",
    0,
    (e, t) => {
      let { tp: n, sl: r } = m(e, t);
      return { tpPx: n?.px ?? null, slPx: r?.px ?? null };
    },
    "U",
    0,
    m,
    "e",
    0,
    (e) => ({
      cashUsd: h(e.cash) ?? 0,
      withdrawableUsd: h(e.withdrawable),
      hlAccount: e.hlAccount && f.has(e.hlAccount) ? e.hlAccount : null,
    }),
    "l",
    0,
    (e) =>
      e
        .flatMap((e) => {
          let r = ((e) => {
            let r = e.perp;
            if (!r || e.assetClass !== n.h || (!e.isExited && e.amountHeld > 0))
              return null;
            let l = a(r.marginUsed),
              u = a(e.realizedPnlUsd ?? e.pnlUsd);
            return r.leverageBps <= 0 || null === l || l <= 0 || null === u
              ? null
              : {
                  coin: e.coinMint,
                  displayName: i(e.coin?.name) ?? e.coinMint,
                  ticker: i(e.coin?.symbol) ?? e.coinMint,
                  imageUri: i(e.coin?.imageUri),
                  imageBackdrop: (0, t.b)(e.coin?.imageBackdrop)
                    ? e.coin.imageBackdrop
                    : null,
                  side: "short" === r.side ? "short" : "long",
                  leverage: d(r.leverageBps),
                  realizedPnlUsd: u,
                  realizedPnlPct: a(e.pnlPercentage) ?? (u / l) * 100,
                  entryPx: o(r.entryPx),
                  exitPx: o(r.markPx),
                  openedAt: s(r.openedAt),
                  closedAt: s(r.closedAt),
                };
          })(e);
          return r ? [r] : [];
        })
        .sort((e, t) => (t.closedAt ?? 0) - (e.closedAt ?? 0)),
    "N",
    0,
    (e) => {
      let t = c(e),
        n = u(e);
      return {
        ...t,
        oraclePx: o(n.oraclePx) ?? t.markPx,
        description: i(e.description),
        nextFundingAt: s(n.nextFundingAt),
      };
    },
    "D",
    0,
    c,
    "t",
    0,
    (e) =>
      e.orders.flatMap((e) => {
        let t = e.kind.toLowerCase();
        return p.has(t) && e.coin
          ? [
              {
                coin: e.coin,
                kind: t,
                side: "sell" === e.side.toLowerCase() ? "sell" : "buy",
                oid: String(e.oid),
                triggerPx: o(e.triggerPx),
                limitPx: o(e.limitPx),
                sizeCoins: String(e.size),
                origSizeCoins: String(e.origSize ?? e.size),
                dex: i(e.dex),
                createdAt: s(e.createdAt),
              },
            ]
          : [];
      }),
    "M",
    0,
    (e) =>
      e.flatMap((e) => {
        let r = ((e) => {
          let r,
            a,
            l = e.perp;
          if (!l || e.assetClass !== n.h || e.isExited || e.amountHeld <= 0)
            return null;
          let u = "short" === l.side ? "short" : "long",
            c = l.marginUsed ?? 0;
          return {
            coin: e.coinMint,
            displayName: i(e.coin?.name) ?? e.coinMint,
            ticker: i(e.coin?.symbol) ?? e.coinMint,
            imageUri: i(e.coin?.imageUri),
            imageBackdrop: (0, t.b)(e.coin?.imageBackdrop)
              ? e.coin.imageBackdrop
              : null,
            side: u,
            leverage: d(l.leverageBps),
            sizeCoins: String(e.amountHeld),
            notionalUsd: l.notional ?? e.valueUsd ?? 0,
            marginUsd: c,
            equityUsd: l.equity ?? c,
            entryPx: o(l.entryPx) ?? "0",
            markPx: o(l.markPx) ?? String(e.tokenPriceUsd),
            liquidationPx: o(l.liquidationPx),
            unrealizedPnlUsd:
              ((r = l.entryPx ?? 0),
              (a = l.markPx ?? e.tokenPriceUsd ?? 0),
              r > 0 && a > 0
                ? (a - r) * ("short" === u ? -e.amountHeld : e.amountHeld)
                : (e.pnlUsd ?? 0) - (e.realizedPnlUsd ?? 0)),
            unrealizedPnlPct: l.roeBps / 100,
            fundingSinceOpenUsd: l.fundingSinceOpen ?? 0,
            dex: i(l.dex),
            openedAt: s(l.openedAt),
            stateAsOf: s(l.stateAsOf),
          };
        })(e);
        return r ? [r] : [];
      }),
  ]);
};
