// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    n = e.i(541710),
    r = e.i(460261),
    i = e.i(526317);
  let a = [4663, 8453, 56, 57073, 5042, 4326, 196, 143, 137],
    o = (e) => null != e && a.includes(e),
    l = (e) => o(e) && null === (0, r.L)(String(e)),
    s = new Set([
      "evm_wallet_missing",
      "evm_signer_not_ready",
      "solana_wallet_missing",
    ]),
    u = {
      needs_claim: "web.trade.relay_error_unauthorized",
      wallet_not_ready: "web.trade.wallet_not_ready",
      price_unknown: "web.trade.relay_error_unavailable",
      bridge_declined: "web.trade.relay_error_no_route",
    },
    d = (e) =>
      e === i.s
        ? "region_restricted"
        : e === i.t
          ? "token_unsellable"
          : "fallback";
  e.s([
    "b",
    0,
    (e, t) => new r.X(t(u[e]), { reason: "BRIDGE_ONLY_REFUSED" }),
    "R",
    0,
    (e) => d((0, i.v)(e) ? e.code : void 0),
    "t",
    0,
    d,
    "x",
    0,
    l,
    "X",
    0,
    (e, t = n.q) => o(e) && (0, n.b)(e, t),
    "W",
    0,
    (e) => {
      t.y.info("[bridgeRouteDecision] bridge_route_decision", e);
    },
    "w",
    0,
    ({
      swapId: e,
      mint: n,
      chainId: a,
      direction: o,
      bridgeCode: l,
      relayError: s,
    }) => {
      l !== i.f ||
        (s instanceof r.X &&
          "NO_SWAP_ROUTES_FOUND" === s.reason &&
          t.y.info("[bridgeRouteDecision] no_route_anywhere", {
            swap_id: e,
            direction: o,
            mint: n,
            chain_id: a,
            bridge_code: l,
            relay_reason: s.reason,
          }));
    },
    "c",
    0,
    ({
      chainId: e,
      userId: r,
      mint: i,
      direction: a,
      gateCode: o,
      exposure: u,
    }) => {
      if (null == e || !l(e)) return null;
      let d = (0, n.b)(e, u)
        ? r && "no_user_id" !== o
          ? void 0 !== o && s.has(o)
            ? "wallet_not_ready"
            : "sol_price_unknown" === o
              ? "price_unknown"
              : "bridge_declined"
          : "needs_claim"
        : "bridge_declined";
      return (
        t.y.info("[bridgeRouteDecision] bridge_only_refused", {
          chain_id: e,
          mint: i,
          direction: a,
          refusal: d,
          gate_code: o,
        }),
        d
      );
    },
  ]);
};
