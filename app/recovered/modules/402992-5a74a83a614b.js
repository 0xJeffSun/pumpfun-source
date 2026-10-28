// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(402030),
    r = e.i(759257);
  let n = { byWallet: {}, wallets: [], tradesByWallet: {} },
    a = (e) => e.username?.trim() || e.walletAddress.slice(0, 6),
    i = (e, t) => {
      if (null === e || null === t || t <= 0) return 0;
      let r = e / t;
      return Number.isFinite(r) ? r : 0;
    },
    s = (e, t) => ({
      slotIndexId: e.slotIndexId,
      tx: e.tx,
      timestamp: t,
      userAddress: e.walletAddress,
      type: e.isBuy ? "buy" : "sell",
      isBondingCurve: !1,
      priceUSD: String(e.priceUsd ?? i(e.amountUsd, e.baseAmount)),
      priceSOL: String(i(e.amountSol, e.baseAmount)),
      amountUSD: String(e.amountUsd ?? 0),
      amountSOL: String(e.amountSol ?? 0),
    }),
    o = async ({ mint: e, chainId: i, signal: o }) => {
      try {
        let t = await (0, r.j)()(
          "GET /pnl-leaderboard/top-trader-trades/{mint}",
          { params: { mint: e }, query: { chainId: i }, signal: o },
        );
        return ((e) => {
          let t = {},
            r = [];
          for (let n of e.traders) {
            let e = a(n);
            for (let a of [n.walletAddress, ...n.tradingWallets]) {
              let i = a.trim();
              i &&
                !t[i] &&
                ((t[i] = {
                  walletAddress: i,
                  name: e,
                  username: n.username?.trim() || null,
                  profileImage: n.profileImage?.trim() || null,
                  userId: n.userId,
                  bestRank: n.bestRank,
                  isVerified: n.isVerified,
                }),
                r.push(i));
            }
          }
          let n = new Map();
          for (let t of e.trades) {
            let e = t.walletAddress.trim();
            if (!e || !t.timestamp) continue;
            let r = s(t, t.timestamp),
              a = n.get(e);
            a ? a.push(r) : n.set(e, [r]);
          }
          return {
            byWallet: t,
            wallets: r,
            tradesByWallet: Object.fromEntries(n),
          };
        })(t);
      } catch (e) {
        if ((0, t.isContractError)(e) && 404 === e.status) return n;
        throw e;
      }
    };
  e.s(["c", 0, n, "Z", 0, o, "E", 0, s]);
};
