// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.userTradesRoutes = r.userTradeCoin = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(785036),
    a = e.r(983689),
    i = e.r(4171),
    l = o.z.object({
      tx: o.z
        .string()
        .describe(
          "Transaction signature — not unique by itself: each fill of a multi-fill transaction is its own row",
        ),
      isBuy: o.z.boolean(),
      timestamp: o.z.string().nullable(),
      amountUsd: o.z.number().nullable(),
      baseAmount: o.z.number().nullable(),
      priceUsd: o.z.number().nullable(),
      mint: o.z.string(),
      chainId: o.z
        .number()
        .nullable()
        .describe(
          "Codex network id; 0 on a HyperCore or ton:-239 row, null on a near:mainnet row: key the token identity by (mint, chain) when it is null",
        ),
      chain: o.z
        .string()
        .optional()
        .describe(
          "CAIP-2 chain of a lane row: starknet:SN_MAIN on a Starknet row (chainId 0) once mints narrowing is live, near:mainnet on every NEAR row (chainId null, mint the token account id verbatim); key the token identity by (mint, chain). Absent on every other row",
        ),
      walletAddress: o.z.string(),
      userId: o.z
        .string()
        .nullable()
        .describe(
          "Null when the wallet resolves to no cc account (raw-wallet requests can serve unregistered wallets)",
        ),
      slotIndexId: o.z
        .string()
        .describe(
          "26-digit zero-padded chain-ordered id — the row's stable identity and same-second tiebreak",
        ),
      amountSol: o.z
        .number()
        .nullable()
        .describe(
          "SOL notional of the fill, or on transfer rows baseAmount x the transfer-minute SOL mark; null when the source carries none",
        ),
      kind: o.z
        .enum(["trade", "transfer"])
        .optional()
        .describe(
          "Present only on filtered (?types=...) requests: 'transfer' = ledger transfer leg valued at the transfer-minute mark, 'trade' = swap fill",
        ),
      collectibleLeg: a.collectibleLeg.optional(),
      collectible: a.collectibleDto
        .optional()
        .describe(
          "Card legs only (collectibleLeg set): the card block; absent on every token row and when the card lookup misses",
        ),
    }),
    d = o.z.object({
      userId: o.z.string(),
      userName: o.z.string(),
      profileImage: o.z.string().nullable(),
      walletAddress: o.z.string().nullable(),
      isVerified: o.z.boolean(),
      verifiedBadgeVisible: o.z
        .boolean()
        .describe(
          "Badge rendering hint beside isVerified: show the checkmark only when both are true",
        ),
    });
  ((r.userTradeCoin = o.z.object({
    mint: o.z.string(),
    chainId: o.z
      .number()
      .nullable()
      .describe(
        "Codex network id; 0 on a HyperCore or ton:-239 row, null on a near:mainnet row: key the token identity by (mint, chain) when it is null",
      ),
    chain: o.z
      .string()
      .optional()
      .describe(
        "starknet:SN_MAIN on a Starknet coin (chainId 0), near:mainnet on a NEAR coin (chainId null), joined to trades by (mint, chain); absent on every other coin",
      ),
    name: o.z.string().nullable(),
    symbol: o.z.string().nullable(),
    image: o.z.string().nullable(),
  })),
    (r.userTradesRoutes = (0, n.defineRoutes)({
      "GET /user-trades/{id}": (0, s.publicRead)("positions.read", {
        summary:
          "One page of an account's trades, newest first — id is a wallet, a user id, or a squad (group) id; a user id serves the union of its CANONICAL wallets (SVM and EVM), a squad the union of its active members' trades. mint narrows to one token (the position-sheet shape). types (CSV of trades|transfers) interleaves ledger transfer legs valued at the transfer-minute mark (amountUsd/priceUsd/amountSol each null independently when that leg is unpriced, never 0), each row then carrying kind; omitted = trades only, today's exact shape. chain=near:mainnet serves the id's NEAR account's swaps, every coin or mint's, rows chainId null and chain near:mainnet (a 400 while the NEAR trades lane is dark). Response header X-Degraded: trades-source = cc's trade lane or the ledger tail failed and rows may be missing (nextCursor null, or v4:<sid> so the next page retries the tail); X-Degraded: trades-stale = a mint page served from its last complete copy, at most 120 s old, while a slow or degraded rebuild runs on.",
        params: o.z.object({ id: o.z.string() }),
        query: o.z.object({
          mint: o.z
            .string()
            .optional()
            .describe(
              "Restrict to one token's trades (the position-sheet shape); omitted serves all mints",
            ),
          chainId: o.z
            .number()
            .int()
            .optional()
            .describe(
              "Codex network id; omitted serves every covered chain (SVM and EVM: a raw wallet serves its own family, a user id the union of its CANONICAL wallets (SVM and EVM), a squad id the union of its active members' wallets)",
            ),
          mints: o.z
            .string()
            .optional()
            .describe(
              "chain=starknet:SN_MAIN only, once mints narrowing is live: one Starknet address (0x + 1 to 64 hex digits, any case, or starknet:SN_MAIN:<0x address>) narrows the page to that coin; more than one entry or a malformed one is a 400. Ignored on every other read",
            ),
          chain: o.z
            .string()
            .optional()
            .describe(
              "ton:-239 (TON mainnet): serves the id's derived TON wallet's swaps on mint (the 48-char bounceable EQ form, required); a non-SVM id serves the empty page. starknet:SN_MAIN (Starknet mainnet): serves the id's swaps across every coin, the id itself a Starknet address (0x + 1 to 64 hex digits, any case; any other id is a 400, no user or squad id), mint is a 400; rows carry tx, mint and walletAddress as 0x + 64 lowercase hex. Either chain: keyed by chain alone (chainId is a 400), trades only (types=transfers is a 400), rows chainId 0 with amountSol null; coins is empty on ton:-239, and on starknet:SN_MAIN before mints narrowing is live (key a row's coin by (mint, chain)). Once Starknet mints narrowing is live, mints narrows to one coin, rows and coins carry chain starknet:SN_MAIN and coins carry the Starknet coin card. near:mainnet (a 400 while the NEAR trades lane is dark): id is a Solana wallet (its derived 64-hex implicit account is read) or a raw NEAR account id (dotted, including the 48-64 char *.omft.near bridge form, or 64-hex; served verbatim, never case-folded); mint is optional, a NEAR token account id when present (dotted, 64-hex or a 2-31 char top-level name; a 0x eth-implicit id or uppercase is a 400) (the position-sheet shape); keyed by chain alone (chainId is a 400), trades only (types=transfers is a 400), rows chainId null and chain near:mainnet with amountSol null, coins carrying chain near:mainnet and the NEAR coin card; any other id serves the empty page. On every chain trades may be empty while nextCursor is non-null (a bounded window of the wallet's trades is scanned per page): keep paging until nextCursor is null",
            ),
          cursor: o.z
            .string()
            .optional()
            .describe(
              "Opaque keyset cursor from the previous page's nextCursor",
            ),
          limit: o.z
            .number()
            .int()
            .min(1)
            .max(200)
            .optional()
            .describe("Rows per page; cc serves 50 when omitted"),
          types: o.z
            .array(o.z.enum(["trades", "transfers"]))
            .max(2)
            .optional()
            .describe(
              "Comma-separated row kinds on the wire; omitted = trades only, and rows carry kind only when this is set",
            ),
        }),
        response: o.z.object({
          trades: o.z.array(l).describe("Newest first"),
          traders: o.z
            .array(d)
            .describe(
              "Distinct trader profiles behind this page's rows (a person request carries at most one)",
            ),
          coins: o.z
            .array(r.userTradeCoin)
            .describe(
              "Token identity for this page's rows: one entry per distinct (mint, chainId), joined to trades by both (a near:mainnet coin carries chain near:mainnet with chainId null, joined by (mint, chain), identity from the NEAR coin card; a starknet:SN_MAIN coin carries chain, identity from the Starknet coin card); a mint-scoped page served from the profile-service ledger tail carries that mint's identity from the tail page itself, every other mint comes from coin-service, where a lookup miss omits the entry and a degraded lookup serves nothing for it; a mint the security verdict hides is omitted, and a degraded verdict read serves no tail entry",
            ),
          nextCursor: o.z
            .string()
            .nullable()
            .describe("null when there are no more results"),
        }),
        errors: {
          429: i.userRateLimitError.describe(
            "A request with no mint whose types contain transfers, over its per-IP budget (20 per minute, burst 40); Retry-After carries the wait. A mint-scoped request is never counted",
          ),
        },
      }),
    })));
};
