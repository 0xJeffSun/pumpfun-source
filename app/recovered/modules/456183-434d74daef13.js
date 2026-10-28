// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    r = e.i(466931),
    n = e.i(460261);
  e.s([
    "D",
    0,
    0x2f3fb341,
    "h",
    0,
    (e) => {
      fetch(`${n.r}/deposit-notify`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(e),
        signal: AbortSignal.timeout(15e3),
      })
        .then(async (r) => {
          if (!r.ok) throw Error(`deposit-notify failed (${r.status})`);
          t.y.info("[notifyRelayDeposit] Deposit reported", {
            requestId: e.requestId,
            chainId: e.chainId,
            txHash: e.txHash,
          });
        })
        .catch((n) => {
          (t.y.warn("[notifyRelayDeposit] Failed to report deposit", {
            requestId: e.requestId,
            chainId: e.chainId,
            txHash: e.txHash,
            error: n instanceof Error ? n.message : String(n),
          }),
            (0, r.l)({
              error: n,
              feature: "trade",
              operation: "relay-deposit-notify",
              context: { requestId: e.requestId, chainId: e.chainId },
            }));
        });
    },
  ]);
};
