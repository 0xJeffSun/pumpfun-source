// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    n = e.i(466931),
    r = e.i(460261);
  e.s([
    "D",
    0,
    0x2f3fb341,
    "h",
    0,
    (e) => {
      fetch(`${r.r}/deposit-notify`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(e),
        signal: AbortSignal.timeout(15e3),
      })
        .then(async (n) => {
          if (!n.ok) throw Error(`deposit-notify failed (${n.status})`);
          t.y.info("[notifyRelayDeposit] Deposit reported", {
            requestId: e.requestId,
            chainId: e.chainId,
            txHash: e.txHash,
          });
        })
        .catch((r) => {
          (t.y.warn("[notifyRelayDeposit] Failed to report deposit", {
            requestId: e.requestId,
            chainId: e.chainId,
            txHash: e.txHash,
            error: r instanceof Error ? r.message : String(r),
          }),
            (0, n.l)({
              error: r,
              feature: "trade",
              operation: "relay-deposit-notify",
              context: { requestId: e.requestId, chainId: e.chainId },
            }));
        });
    },
  ]);
};
