// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    i = e.i(541710),
    n = e.i(460261),
    s = e.i(526317);
  let l = [4663, 8453, 56, 57073, 5042, 4326, 196, 143, 137],
    r = (e) => null != e && l.includes(e),
    a = (e) => r(e) && null === (0, n.L)(String(e)),
    o = new Set([
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
      e === s.s
        ? "region_restricted"
        : e === s.t
          ? "token_unsellable"
          : "fallback";
  e.s([
    "b",
    0,
    (e, t) => new n.X(t(u[e]), { reason: "BRIDGE_ONLY_REFUSED" }),
    "R",
    0,
    (e) => d((0, s.v)(e) ? e.code : void 0),
    "t",
    0,
    d,
    "x",
    0,
    a,
    "X",
    0,
    (e, t = i.q) => r(e) && (0, i.b)(e, t),
    "W",
    0,
    (e) => {
      t.y.info("[bridgeRouteDecision] bridge_route_decision", e);
    },
    "w",
    0,
    ({
      swapId: e,
      mint: i,
      chainId: l,
      direction: r,
      bridgeCode: a,
      relayError: o,
    }) => {
      a !== s.f ||
        (o instanceof n.X &&
          "NO_SWAP_ROUTES_FOUND" === o.reason &&
          t.y.info("[bridgeRouteDecision] no_route_anywhere", {
            swap_id: e,
            direction: r,
            mint: i,
            chain_id: l,
            bridge_code: a,
            relay_reason: o.reason,
          }));
    },
    "c",
    0,
    ({
      chainId: e,
      userId: n,
      mint: s,
      direction: l,
      gateCode: r,
      exposure: u,
    }) => {
      if (null == e || !a(e)) return null;
      let d = (0, i.b)(e, u)
        ? n && "no_user_id" !== r
          ? void 0 !== r && o.has(r)
            ? "wallet_not_ready"
            : "sol_price_unknown" === r
              ? "price_unknown"
              : "bridge_declined"
          : "needs_claim"
        : "bridge_declined";
      return (
        t.y.info("[bridgeRouteDecision] bridge_only_refused", {
          chain_id: e,
          mint: s,
          direction: l,
          refusal: d,
          gate_code: r,
        }),
        d
      );
    },
  ]);
};
