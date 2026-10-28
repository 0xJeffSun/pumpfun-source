// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.authRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(525364),
    a = {
      405: o.z
        .object({
          code: o.z.literal("wallet_not_allowed"),
          message: o.z.string(),
        })
        .describe("The wallet is screened; the method is refused for it"),
      409: o.z
        .object({
          code: o.z.literal("privy_account_exists"),
          provider: s.privyLoginProvider,
          message: o.z.string(),
        })
        .describe(
          "A non_custodial login for a Privy embedded wallet; sign in through the named provider instead",
        ),
    },
    i = ["WALLET_NOT_ALLOWED", "PRIVY_ACCOUNT_EXISTS", "ACCOUNT_NOT_FOUND"],
    l = o.z.object({
      address: o.z.string(),
      userId: o.z
        .string()
        .optional()
        .describe(
          "cc registry UUID; absent forever on pre-claim tokens and fresh wallets with no cc user yet",
        ),
      roles: o.z.array(o.z.string()).optional(),
      permissions: o.z
        .array(o.z.string())
        .optional()
        .describe(
          "Sorted pump.* permission slugs the session holds; absent means the server had no answer (cc unreachable, or a pre-permissions token) and the roles claim decides",
        ),
      authTime: o.z
        .number()
        .optional()
        .describe(
          "Epoch-seconds start of the session lineage; carried unchanged through /auth/switch-wallet re-mints",
        ),
      iat: o.z
        .number()
        .optional()
        .describe("Epoch seconds, stamped by jsonwebtoken"),
      exp: o.z
        .number()
        .optional()
        .describe("Epoch seconds, stamped by jsonwebtoken"),
    }),
    d = o.z.object({
      access_token: o.z.string().describe("The signed session JWT"),
    }),
    c = o.z
      .union([d, l])
      .describe(
        "rawJwt: true returns the signed token itself; otherwise the token is set as the auth_token cookie and the body is its decoded payload",
      ),
    u = o.z.object({
      signature: o.z.string().max(88),
      timestamp: o.z.number(),
      address: o.z.string().max(44),
      transaction: o.z
        .union([
          o.z.string(),
          o.z.array(o.z.number().int().min(0).max(255)).min(1),
        ])
        .optional(),
      authType: o.z.enum(["privy", "non_custodial"]).optional(),
      deviceId: o.z
        .string()
        .max(128)
        .optional()
        .describe(
          "Reinstall-stable device id the mobile app anchors in the keychain; a dedup key, not a trust signal",
        ),
      evmAddress: o.z
        .string()
        .regex(/^0x[a-fA-F0-9]{40}$/)
        .optional(),
      evmSignature: o.z
        .string()
        .regex(/^0x[a-fA-F0-9]{130}$/)
        .optional()
        .describe(
          "65-byte EIP-191 signature over the canonical link message, 0x hex",
        ),
      solSignature: o.z
        .string()
        .regex(/^[1-9A-HJ-NP-Za-km-z]{64,120}$/)
        .optional()
        .describe(
          "64-byte ed25519 signature by `address` over the same link message, base58",
        ),
    }),
    h = o.z.object({ success: o.z.boolean() }),
    m = o.z.object({ isAllowed: o.z.boolean() }),
    p = o.z.object({
      livestreams: o.z.boolean(),
      all: o.z.boolean(),
      perps: o.z
        .boolean()
        .describe(
          "True when perps are unavailable in the caller jurisdiction (pump Terms §30B.2: the US and its territories, Ontario, the UK, Cuba, Iran, North Korea, Syria, Russia, Belarus, and Crimea, Sevastopol, Donetsk and Luhansk); the app shows perps read-only. An unknown country is true; a failed lookup follows the fail-closed posture. Ontario and the Ukrainian regions read Cloudflare cf-region-code, so they are only told apart while the zone sends it",
        ),
      bridge: o.z
        .boolean()
        .describe(
          "True when the caller jurisdiction may not trade Robinhood stock tokens through pump's internal bridge: the 27 EU member states, Iceland, Liechtenstein and Norway, and the EU territories Cloudflare reports under their own codes (GF GP MQ RE YT MF AX). Whole countries only. The value is a country verdict and names no token: the app pairs it with its own Robinhood stock check and routes those trades through Relay. Other tokens are unaffected. An unknown country is true; a failed lookup follows the fail-closed posture; `all` implies it",
        ),
    }),
    b = o.z.string().describe("cc user id (UUID) or base58 wallet address"),
    { signature: g, timestamp: w, address: y, ...f } = u.shape,
    z = o.z.object({
      signature: g,
      timestamp: w,
      address: y,
      rawJwt: o.z.boolean().optional(),
      ...f,
    });
  r.authRoutes = (0, n.defineRoutes)({
    "POST /auth/login": {
      summary:
        "Authenticate and issue a session token (superseded by /auth/login/token and /auth/login/session)",
      body: z,
      response: c.describe(
        "rawJwt: true returns the signed token itself; otherwise the token is set as the auth_token cookie and the body is its decoded payload. Superseded by POST /auth/login/token and POST /auth/login/session, one arm each (TASK-5156)",
      ),
      emits: i,
      errors: a,
    },
    "POST /auth/login/token": {
      summary: "Authenticate and return the session token as a bearer token",
      body: u,
      response: d.describe(
        "The signed session JWT; no auth_token cookie is set. Same refusals as POST /auth/login",
      ),
      emits: i,
      errors: a,
    },
    "POST /auth/login/session": {
      summary: "Authenticate and establish the auth_token cookie session",
      body: u,
      response: l.describe(
        "The decoded payload of the token written to the auth_token cookie; the request needs an Origin header (400 without). Same refusals as POST /auth/login",
      ),
      emits: i,
      errors: a,
    },
    "GET /auth/my-profile": {
      summary: "Get the current session profile",
      response: l,
    },
    "POST /auth/switch-wallet": {
      summary: "Re-scope the session to another linked wallet (flagged)",
      body: o.z.object({
        address: o.z
          .string()
          .regex(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/)
          .describe(
            "Base58 SVM address to make the active wallet; a user id or EVM address is rejected",
          ),
        rawJwt: o.z
          .boolean()
          .optional()
          .describe("Return { access_token } instead of the decoded payload"),
      }),
      response: c,
    },
    "POST /auth/register": {
      summary:
        "Create the account for a proven wallet and issue its session token",
      body: z.describe(
        "The POST /auth/login body: the same signed challenge is accepted here, so a login refused with ACCOUNT_NOT_FOUND is re-sent as-is",
      ),
      response: c.describe(
        "The new session, carrying userId. rawJwt: true returns the signed token itself; otherwise the token is set as the auth_token cookie and the body is its decoded payload. Same 405 / 409 refusals as POST /auth/login",
      ),
      emits: ["ACCOUNT_EXISTS", "REGISTER_THROTTLED", ...i],
    },
    "GET /auth/is-valid-jurisdiction": {
      summary: "Check if the caller jurisdiction is allowed",
      response: m,
    },
    "GET /auth/disabled-features": {
      summary: "Get disabled features for the caller",
      response: p,
    },
    "POST /auth/logout": {
      summary: "Clear the session cookie and revoke the session",
      response: h,
    },
    "POST /auth/add-admin": {
      summary: "Grant an admin role",
      body: o.z.object({
        address: b,
        name: o.z
          .string()
          .nullable()
          .optional()
          .describe(
            "Display name to record; absent, null or empty leaves the stored name untouched",
          ),
        addAsLivestreamModerator: o.z.boolean(),
      }),
      response: h,
    },
    "DELETE /auth/admins/{address}": {
      summary: "Revoke an admin role",
      params: o.z.object({ address: b }),
      body: o.z.object({ removeAsLivestreamModerator: o.z.boolean() }),
      response: h,
    },
  });
};
