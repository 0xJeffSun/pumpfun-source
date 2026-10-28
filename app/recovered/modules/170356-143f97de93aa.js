// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    n = e.i(541710),
    i = e.i(460261),
    a = e.i(526317);
  let r = [4663, 8453, 56, 57073, 5042, 4326, 196, 143, 137],
    s = (e) => null != e && r.includes(e),
    l = (e) => s(e) && null === (0, i.L)(String(e)),
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
      e === a.s
        ? "region_restricted"
        : e === a.t
          ? "token_unsellable"
          : "fallback";
  e.s([
    "b",
    0,
    (e, t) => new i.X(t(u[e]), { reason: "BRIDGE_ONLY_REFUSED" }),
    "R",
    0,
    (e) => d((0, a.v)(e) ? e.code : void 0),
    "t",
    0,
    d,
    "x",
    0,
    l,
    "X",
    0,
    (e, t = n.q) => s(e) && (0, n.b)(e, t),
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
      chainId: r,
      direction: s,
      bridgeCode: l,
      relayError: o,
    }) => {
      l !== a.f ||
        (o instanceof i.X &&
          "NO_SWAP_ROUTES_FOUND" === o.reason &&
          t.y.info("[bridgeRouteDecision] no_route_anywhere", {
            swap_id: e,
            direction: s,
            mint: n,
            chain_id: r,
            bridge_code: l,
            relay_reason: o.reason,
          }));
    },
    "c",
    0,
    ({
      chainId: e,
      userId: i,
      mint: a,
      direction: r,
      gateCode: s,
      exposure: u,
    }) => {
      if (null == e || !l(e)) return null;
      let d = (0, n.b)(e, u)
        ? i && "no_user_id" !== s
          ? void 0 !== s && o.has(s)
            ? "wallet_not_ready"
            : "sol_price_unknown" === s
              ? "price_unknown"
              : "bridge_declined"
          : "needs_claim"
        : "bridge_declined";
      return (
        t.y.info("[bridgeRouteDecision] bridge_only_refused", {
          chain_id: e,
          mint: a,
          direction: r,
          refusal: d,
          gate_code: s,
        }),
        d
      );
    },
  ]);
};
