// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.searchRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(785036),
    a = e.r(540480),
    i = e.r(896727),
    l = o.z.object({
      identifier: o.z
        .string()
        .describe("The caller's identifier string, echoed verbatim"),
      kind: o.z
        .enum(["coin", "user", "squad", "external_wallet", "unknown"])
        .describe(
          "What the identifier is. 'external_wallet' = a well-formed address that no coin and no account claims; 'unknown' = either a shape this route does not route at all, or a verdict a leg could not decide — `definitive` is what tells those two apart",
        ),
      chain: o.z
        .enum(["solana", "evm", "ton", "near", "starknet"])
        .nullable()
        .describe(
          "The chain the identifier belongs to by shape; null when its shape names no chain (a pump.fun user id, or text that is not an address). 'ton' for a friendly TON address. 'near' only while NEAR coin cards are served, and only for a dotted or 64-hex account id: until then it is null. 'starknet' only while Starknet coin cards are served, and only for 0x plus 1 to 64 hex digits that is not a 40-hex EVM address: until then it is null",
        ),
      coin: a.coinDto
        .nullable()
        .describe("The resolved coin; null unless kind is 'coin'"),
      user: i.userRow
        .nullable()
        .describe(
          "The resolved account row; null unless kind is 'user' or 'squad'. Deliberately NOT presence-overlaid (no online/last-seen enrichment): resolve answers a routing question, not a profile render — read the profile routes for a rendered row",
        ),
      resolvedVia: o.z
        .enum([
          "coin_registry",
          "codex_fallback",
          "cc_user",
          "group",
          "trade_api",
        ])
        .nullable()
        .describe(
          "Which lookup answered: 'coin_registry' = the address is an indexed pump.fun coin (mint, bonding curve or pool); 'codex_fallback' = an un-indexed SPL mint on the verified list, its card synthesized from market data; 'cc_user'/'group' = resolved to a pump.fun account or group; 'trade_api' = resolved to a token on a non-Solana chain (TON, NEAR or Starknet). null when nothing matched the identifier",
        ),
      definitive: o.z
        .boolean()
        .describe(
          "true = every lookup that decides this kind answered, so the verdict is the real answer and may be cached. false = at least one of them was unavailable: a provisional verdict that must never be cached as an absence, and that a client should fall back from rather than act on",
        ),
    });
  r.searchRoutes = (0, n.defineRoutes)({
    "GET /search/resolve": (0, s.publicRead)("profiles.read", {
      summary:
        "Classify 1-5 identifiers in one hop: what each one is, which chain it is on, and the coin or account payload",
      query: o.z.object({
        identifiers: o.z
          .array(o.z.string().max(128))
          .min(1)
          .max(5)
          .describe(
            "Comma-separated identifiers (repeated and mixed forms parse identically): a coin address (mint, bonding curve or pool), a Solana wallet, an EVM address, a TON token address, a NEAR or Starknet token address (while coin cards for that chain are served; a 0x plus 40-hex address is always EVM), or a pump.fun user id",
          ),
      }),
      response: o.z.object({
        results: o.z
          .array(l)
          .describe("One entry per requested identifier, in the order sent"),
        degraded: o.z
          .array(
            o.z.enum([
              "coin_upstream",
              "user_upstream",
              "evm_fallback_unavailable",
            ]),
          )
          .describe(
            "Deduped, request-level reasons a leg could not answer; load-bearing, not diagnostics. 'coin_upstream'/'user_upstream' = the coin or account lookup failed or timed out on at least one identifier. 'evm_fallback_unavailable' = an EVM address the coin registry does not claim could not be checked further, so that result's 'external_wallet' is provisional and clients keep their own EVM lookup chain (TASK-5346)",
          ),
      }),
    }),
  });
};
