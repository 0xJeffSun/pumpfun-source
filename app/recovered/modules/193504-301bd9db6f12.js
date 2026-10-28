// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(889451),
    i = e.i(538794);
  function l(e) {
    return {
      calloutId: e.calloutId,
      thesis: e.note?.trim() ?? "",
      createdAtMs: e.createdAt,
      peakMultiple: (0, i.p)(e),
      marketCapUsd: e.marketCap > 0 ? e.marketCap : null,
    };
  }
  e.s([
    "D",
    0,
    function (e) {
      let { summary: i, holder: a, callout: s, avgEntryMcapUsd: n } = e,
        r = i?.netPnlUsd;
      if (null == i || null == r || !Number.isFinite(r)) return null;
      let o = i.spentUsd;
      return {
        mint: e.mint,
        chainId: e.chainId ?? e.coin?.chain_id ?? null,
        coin: e.coin ?? null,
        coinName: e.coinName ?? null,
        coinSymbol: e.coinSymbol ?? null,
        coinImageUri: e.coinImageUri ?? null,
        pnlUsd: r,
        pnlPct:
          i.displayPct ??
          (0, t.i)(r, {
            amountBoughtUsd: o,
            receiptBasisUsd: i.receiptBasisUsd,
            costBasisUsd: i.costBasisUsd,
            isExited: i.isExited,
          }),
        investedUsd: o,
        avgEntryPriceUsd: i.avgEntryPriceUsd,
        avgEntryMcapUsd: n ?? void 0,
        isClosed: i.isClosed,
        holder: a,
        callout: s ? l(s) : null,
      };
    },
    "Z",
    0,
    l,
  ]);
};
