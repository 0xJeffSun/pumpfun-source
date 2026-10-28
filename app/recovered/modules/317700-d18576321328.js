// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.walletMappingRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(4171);
  r.walletMappingRoutes = (0, n.defineRoutes)({
    "POST /wallet-mapping/challenge": {
      summary:
        "Issue the single-use v2 link message the EVM key signs (EIP-191) before POST /wallet-mapping/link with messageVersion 2. The Solana side is always the session wallet; re-issuing for the same pair replaces the outstanding challenge.",
      body: o.z.object({
        evmAddress: o.z
          .string()
          .regex(/^0x[0-9a-fA-F]{40}$/)
          .describe("The EVM wallet the challenge binds to the session wallet"),
      }),
      response: o.z.object({
        solAddress: o.z
          .string()
          .describe("The session wallet the message names"),
        evmAddress: o.z.string().describe("The EVM wallet, lowercased"),
        message: o.z
          .string()
          .describe(
            "The exact bytes to sign: the v1 link message plus Version/Audience/Nonce/Expires lines (ASCII, \\n-joined, no trailing newline)",
          ),
        nonce: o.z
          .string()
          .describe("The single-use challenge nonce; send it verbatim on link"),
        expiresAt: o.z
          .string()
          .describe(
            "ISO timestamp the message expires at (900 s); send it verbatim on link, it is part of the signed bytes",
          ),
        messageVersion: o.z.literal(2),
      }),
      errors: {
        400: (0, s.nestError)("Bad Request").describe(
          "A malformed EVM address",
        ),
        429: s.userRateLimitError,
        503: !0,
      },
    },
    "POST /wallet-mapping/link": {
      summary:
        "Link an EVM wallet to the caller's account, proven by an EIP-191 signature from the EVM key. The Solana side is always the session wallet.",
      body: o.z.object({
        evmAddress: o.z
          .string()
          .regex(/^0x[0-9a-fA-F]{40}$/)
          .describe("The EVM wallet to link (any casing)"),
        signature: o.z
          .string()
          .regex(/^0x[0-9a-fA-F]{130}$/)
          .describe(
            "0x-prefixed 65-byte EIP-191 signature by `evmAddress` over the link message `messageVersion` selects, naming the session's Solana wallet",
          ),
        messageVersion: o.z
          .union([o.z.literal(1), o.z.literal(2)])
          .optional()
          .describe(
            "Link message version the signature covers: 1 (default) = the nonce-less v1 message; 2 = v1 plus the Version/Audience/Nonce/Expires lines",
          ),
        nonce: o.z
          .string()
          .max(64)
          .optional()
          .describe(
            "The nonce POST /wallet-mapping/challenge issued for this pair, verbatim; required when messageVersion is 2 and consumed by a successful link",
          ),
        expiresAt: o.z
          .string()
          .max(64)
          .regex(/(?:Z|[+-]\d{2}:?\d{2})$/)
          .optional()
          .describe(
            "ISO timestamp the v2 message expires at, verbatim as signed, ending in Z or a numeric UTC offset; required when messageVersion is 2",
          ),
        allowRebind: o.z
          .boolean()
          .optional()
          .describe(
            "Move the EVM wallet from the account that holds it now (default false)",
          ),
      }),
      response: o.z.object({
        solAddress: o.z.string().describe("The session wallet the link names"),
        evmAddress: o.z.string().describe("The linked EVM wallet, lowercased"),
        result: o.z
          .enum(["imported", "already_linked", "moved"])
          .describe(
            "imported: newly linked; already_linked: the link already existed; moved: taken over from another account (allowRebind)",
          ),
      }),
      emits: [
        "WALLET_LINK_NO_ACCOUNT",
        "WALLET_LINK_EVM_OWNED_ELSEWHERE",
        "WALLET_LINK_INVALID_SIGNATURE",
        "WALLET_LINK_SOL_ALREADY_LINKED",
        "WALLET_LINK_CHALLENGE_EXPIRED",
        "WALLET_NOT_ALLOWED",
      ],
      errors: {
        400: (0, s.nestError)("Bad Request").describe(
          "The body failed validation (a zone-less expiresAt, a malformed address) or cc refused the proof shape as malformed",
        ),
        429: s.userRateLimitError,
        503: !0,
      },
    },
  });
};
