// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.domainCode =
      r.codeMeta =
      r.isErrorCode =
      r.ERROR_CODES =
      r.privyLoginProvider =
      r.ERROR_CODE_PATTERN =
        void 0));
  let o = e.r(876543);
  r.ERROR_CODE_PATTERN = /^[A-Z][A-Z0-9_]+$/;
  let n = o.z.object({
      code: o.z
        .string()
        .optional()
        .describe(
          "cc's lowercase rejection prefix; never sent since the posts writes left (0.321.0), kept optional so shipped clients' schemas still parse",
        ),
    }),
    s = o.z.object({
      walletId: o.z
        .string()
        .describe("The Privy wallet id the export asked for"),
      chainType: o.z
        .enum(["solana", "ethereum"])
        .describe("The chain the export asked for"),
    }),
    a = o.z.object({
      retryAfterMs: o.z
        .number()
        .int()
        .nonnegative()
        .describe("Milliseconds until a new request is accepted"),
      retryAt: o.z.string().describe("ISO timestamp the cooldown ends"),
    }),
    i = o.z.object({
      requiredScope: o.z
        .string()
        .describe("The API scope the route needs and the key does not hold"),
    }),
    l = o.z.object({
      retryAfterMs: o.z
        .number()
        .int()
        .nonnegative()
        .describe("Milliseconds until the bucket admits a request again"),
      limit: o.z
        .number()
        .int()
        .nonnegative()
        .describe(
          "The ceiling that refused: the 60-second bucket (60 x the key's per-second rate), the daily limit, the per-IP failed-auth budget, or the per-IP lookup budget",
        ),
      window: o.z
        .enum(["burst", "day", "auth", "lookup"])
        .describe(
          "Which ceiling refused: burst (the per-key 60-second bucket), day (the per-key UTC daily limit), auth (per-IP failed authentications, charged on failed outcomes only), lookup (per-IP budget of uncached key lookups)",
        ),
    }),
    d = o.z.object({
      retryAfterMs: o.z
        .number()
        .int()
        .nonnegative()
        .describe("Milliseconds until a new code may be requested"),
    }),
    c = o.z.object({
      version: o.z
        .string()
        .nullable()
        .describe(
          "The current API terms version the org must accept; null when no terms version is configured (issuance blocked for everyone)",
        ),
    }),
    u = o.z.object({
      min: o.z.number().int().describe("Smallest accepted grace_hours (1)"),
      max: o.z
        .number()
        .int()
        .describe("Largest accepted grace_hours (168 = 7 d)"),
    }),
    h =
      "Legacy lowercase discriminator, deprecated: branch on `error` (docs/route-deprecations.md)";
  r.privyLoginProvider = o.z.enum([
    "google",
    "apple",
    "twitter",
    "email",
    "privy",
  ]);
  let m = o.z.object({ code: o.z.literal("wallet_not_allowed").describe(h) }),
    p = o.z.object({
      code: o.z.literal("privy_account_exists").describe(h),
      provider: r.privyLoginProvider,
    }),
    b = o.z.object({
      code: o.z.literal("privy_identity_token_expired").describe(h),
    }),
    g = o.z.object({
      code: o.z.literal("privy_identity_token_invalid").describe(h),
    }),
    w = o.z.object({
      provider: r.privyLoginProvider.describe(
        "The login method of the Privy account that already owns the wallet (`privy` when Privy could not name it)",
      ),
      privyUserId: o.z
        .string()
        .regex(/^did:privy:[A-Za-z0-9]{1,64}$/)
        .optional()
        .describe(
          "The owning Privy user, when known. A client linking to that same user treats the import as already done (resume); any other owner is the login to sign in with instead",
        ),
    }),
    y = o.z.object({
      mfaMethods: o.z
        .array(o.z.string())
        .describe(
          "The MFA method types enrolled on the Privy user (`totp`, `sms`, `passkey`, ...; `email` is Privy's login factor and is never listed)",
        ),
    }),
    f = o.z.object({
      chainType: o.z
        .enum(["solana", "ethereum"])
        .describe("The chain whose wallet slot this Privy user already fills"),
    }),
    z = o.z.object({
      chainType: o.z
        .enum(["solana", "ethereum"])
        .describe(
          "The chain of the address that already belongs to a pump identity",
        ),
    });
  ((r.ERROR_CODES = {
    ACCOUNT_EXISTS: {
      status: 409,
      owner: "auth",
      summary:
        "The wallet already has an account; sign in through POST /auth/login with the same signed body",
      actionable: !0,
      retryable: "never",
    },
    ACCOUNT_NOT_FOUND: {
      status: 404,
      owner: "auth",
      summary:
        "No account for this wallet and login never creates one; register through POST /auth/register with the same signed body",
      actionable: !0,
      retryable: "never",
    },
    ACTING_USER_INVALID: {
      status: 400,
      owner: "groups",
      summary: "The acting-as user id is not one the caller may act as",
      actionable: !1,
      retryable: "never",
    },
    ACTIVE_OWNER: {
      status: 409,
      owner: "groups",
      summary:
        "The active owner must transfer the group or delete it before leaving",
      actionable: !0,
      retryable: "never",
    },
    ALREADY_EXISTS: {
      status: 409,
      owner: "groups",
      summary:
        "The group username is taken, or the invitee is already an active member",
      actionable: !0,
      retryable: "never",
    },
    ALREADY_IN_GROUP: {
      status: 409,
      owner: "groups",
      summary: "The user is already in the maximum number of groups",
      actionable: !0,
      retryable: "never",
    },
    API_KEY_REQUIRED: {
      status: 401,
      owner: "api-platform",
      summary:
        "The keyed API host got no credential: send Authorization: Bearer <key> or x-api-key: <key>",
      actionable: !0,
      retryable: "never",
    },
    API_KEY_INVALID: {
      status: 401,
      owner: "api-platform",
      summary:
        "The credential is not a well-formed pf_live_ key (prefix, length, charset or checksum) or no key record exists for it",
      actionable: !0,
      retryable: "never",
    },
    API_KEY_REVOKED: {
      status: 403,
      owner: "api-platform",
      summary:
        "The key was revoked (by its owner or by the pump.fun team); issue a new key in the developer console",
      actionable: !0,
      retryable: "never",
    },
    API_ORG_SUSPENDED: {
      status: 403,
      owner: "api-platform",
      summary:
        "The key's org is suspended or closed, so none of its keys is served; contact developers@pump.fun",
      actionable: !1,
      retryable: "never",
    },
    API_ORG_NOT_APPROVED: {
      status: 403,
      owner: "api-platform",
      summary:
        "The key's org application has not been approved yet (or a key is requested before approval)",
      actionable: !1,
      retryable: "after",
    },
    API_SCOPE_FORBIDDEN: {
      status: 403,
      owner: "api-platform",
      summary:
        "The key does not hold the API scope this route needs; `requiredScope` names it",
      actionable: !0,
      retryable: "never",
      data: i,
    },
    API_REGION_RESTRICTED: {
      status: 403,
      owner: "api-platform",
      summary:
        "The Developer API is not available in the region the request came from (the same regional availability as pump.fun); the body names no country",
      actionable: !1,
      retryable: "never",
    },
    API_KEY_RATE_LIMITED: {
      status: 429,
      owner: "api-platform",
      summary:
        "A key ceiling refused: the per-key burst bucket, the UTC daily limit (a limit of 0 means the key is paused; contact developers@pump.fun), the per-IP failed-auth throttle, or the per-IP lookup budget; retry after `retryAfterMs`",
      actionable: !1,
      retryable: "after",
      data: l,
    },
    API_CREDENTIAL_NOT_ALLOWED: {
      status: 400,
      owner: "api-platform",
      summary:
        "A session credential (cookie or user JWT) was sent to the keyed API host, or a pf_live_ key to the first-party host; each host accepts only its own credential kind",
      actionable: !0,
      retryable: "never",
    },
    API_USER_REQUIRED: {
      status: 400,
      owner: "api-platform",
      summary:
        "The route serves the signed-in user when `user` is omitted, but an API key is never a session: send `user=<wallet or username>` when calling with an API key",
      actionable: !0,
      retryable: "never",
    },
    API_PLATFORM_ACCOUNT_REQUIRED: {
      status: 403,
      owner: "api-platform",
      summary:
        "The developer console needs a session with a cc user id claim (a pre-claim wallet-only token has no account to own an org)",
      actionable: !0,
      retryable: "never",
    },
    API_ORG_NOT_FOUND: {
      status: 404,
      owner: "api-platform",
      summary:
        "The session owns no developer org yet (apply first), or no org has that id",
      actionable: !0,
      retryable: "never",
    },
    API_ORG_EXISTS: {
      status: 409,
      owner: "api-platform",
      summary: "The session already owns a developer org; one org per owner",
      actionable: !1,
      retryable: "never",
    },
    API_APPLY_CONSOLE_REQUIRED: {
      status: 403,
      owner: "api-platform",
      summary:
        "Applications are accepted only through the developer console (developers.pump.fun): the request carried no valid x-pump-console-assertion while the server-side gate is configured",
      actionable: !0,
      retryable: "never",
    },
    API_EMAIL_NOT_VERIFIED: {
      status: 403,
      owner: "api-platform",
      summary:
        "The org's contact email is not verified yet; request and confirm the one-time code first",
      actionable: !0,
      retryable: "never",
    },
    API_EMAIL_CODE_INVALID: {
      status: 400,
      owner: "api-platform",
      summary:
        "The one-time code is wrong, expired, or its attempt budget is spent; request a new code",
      actionable: !0,
      retryable: "never",
    },
    API_EMAIL_CODE_COOLDOWN: {
      status: 429,
      owner: "api-platform",
      summary:
        "A code was sent recently (the 60 s resend lock) or the org's daily send cap is reached (API_EMAIL_CODE_DAILY_LIMIT per UTC day); either way a new code may be requested after `retryAfterMs`",
      actionable: !1,
      retryable: "after",
      data: d,
    },
    API_TERMS_NOT_ACCEPTED: {
      status: 403,
      owner: "api-platform",
      summary:
        "Key issuance needs the current API terms accepted by the org owner; `version` is the version to accept (null = no terms configured, issuance blocked)",
      actionable: !0,
      retryable: "never",
      data: c,
    },
    API_KEY_LIMIT_REACHED: {
      status: 409,
      owner: "api-platform",
      summary:
        "The org holds the maximum number of active keys; revoke one before creating or rotating",
      actionable: !0,
      retryable: "never",
    },
    API_KEY_NOT_FOUND: {
      status: 404,
      owner: "api-platform",
      summary:
        "No key with that id in the caller's org (a key of another org answers the same 404)",
      actionable: !1,
      retryable: "never",
    },
    API_KEY_ROTATING: {
      status: 409,
      owner: "api-platform",
      summary:
        "The key is already the rotated-from side of a rotation (status rotating, served until grace_until); rotate its successor instead",
      actionable: !0,
      retryable: "never",
    },
    API_KEY_GRACE_INVALID: {
      status: 400,
      owner: "api-platform",
      summary:
        "grace_hours must be an integer between `min` and `max` hours (1 h .. 7 d)",
      actionable: !0,
      retryable: "never",
      data: u,
    },
    ATTEMPT_LIMIT: {
      status: 429,
      owner: "callout",
      summary: "The caller's callout attempt budget is spent",
      actionable: !1,
      retryable: "after",
    },
    BLOCKED_BY_AUTHOR: {
      status: 403,
      owner: "callout",
      summary:
        "The author of the thread has blocked the caller from replying in it",
      actionable: !1,
      retryable: "never",
    },
    CALLOUT_MODERATED: {
      status: 404,
      owner: "callout",
      summary: "Moderation removed the callout being replied to",
      actionable: !1,
      retryable: "never",
    },
    CALLOUT_NOT_FOUND: {
      status: 404,
      owner: "callout",
      summary: "No callout with that id: deleted, hidden, or never existed",
      actionable: !1,
      retryable: "never",
    },
    COIN_BLOCKED: {
      status: 403,
      owner: "coins",
      summary:
        "The coin's token-trust security verdict is blocked everywhere (scope all): the coin exists but is not served and must not be traded (coinSecurityVerdictBlockedError; off = a plain 404 / null)",
      actionable: !1,
      retryable: "never",
      data: o.z.object({
        mint: o.z
          .string()
          .describe(
            "The coin as coin-service keys it. EVM mints are EIP-55 checksummed on the wire (TASK-5732); lowercase is the identity form backends key by",
          ),
        security_verdict: o.z
          .object({
            verdict: o.z.string().describe('Always "blocked" on this code'),
            scope: o.z
              .string()
              .describe(
                'Always "all" on this code: a discovery-only block is still served on direct surfaces',
              ),
            reasons: o.z
              .array(o.z.string())
              .describe(
                "token-trust reason slugs; render through the coin_details.scam_warning.reasons.<slug> locale keys, an unknown slug as no bullet",
              ),
            decided_by: o.z
              .string()
              .describe(
                "token-trust resolver tier (blacklist | bypass | vendor | trust | soft | default)",
              ),
            provider: o.z
              .string()
              .describe(
                "Vendor attribution (blockaid | goplus | both | codex | solana-rpc | inhouse | heuristic | none)",
              ),
          })
          .describe("coin-service's token-trust verdict for the coin"),
      }),
    },
    COMPETITION_BANNED: {
      status: 409,
      owner: "competitions",
      summary:
        "Person competition: the caller's board wallet is on the PnL kill list",
      actionable: !1,
      retryable: "never",
    },
    COMPETITION_FULL: {
      status: 409,
      owner: "competitions",
      summary: "The competition has reached its entry cap",
      actionable: !1,
      retryable: "never",
    },
    COMPETITION_HIDDEN: {
      status: 409,
      owner: "competitions",
      summary: "Squad competition: the squad is hidden from the PnL boards",
      actionable: !1,
      retryable: "never",
    },
    COMPETITION_KIND_MISMATCH: {
      status: 409,
      owner: "competitions",
      summary:
        "A groupId was sent for a person competition or omitted for a squad one, or the caller is not a person",
      actionable: !0,
      retryable: "never",
    },
    COMPETITION_NOT_OWNER: {
      status: 409,
      owner: "competitions",
      summary: "Squad competition: only the squad's owner can register it",
      actionable: !0,
      retryable: "never",
    },
    COMPETITION_NO_GROUP: {
      status: 409,
      owner: "competitions",
      summary: "Squad competition: the caller is in no squad",
      actionable: !0,
      retryable: "never",
    },
    COMPETITION_NO_WALLET: {
      status: 409,
      owner: "competitions",
      summary: "Person competition: the caller has no Solana board wallet",
      actionable: !0,
      retryable: "never",
    },
    COMPETITION_REGISTER_BUSY: {
      status: 429,
      owner: "competitions",
      summary:
        "cc is saturated registering this competition; retry after the Retry-After header",
      actionable: !1,
      retryable: "after",
    },
    COMPETITION_REGISTRATION_CLOSED: {
      status: 409,
      owner: "competitions",
      summary: "Registration for this competition has closed",
      actionable: !1,
      retryable: "never",
    },
    COMPETITION_REGISTRATION_NOT_OPEN: {
      status: 409,
      owner: "competitions",
      summary:
        "Registration for this competition has not opened yet (phase upcoming, before registrationOpensAt)",
      actionable: !1,
      retryable: "after",
    },
    COMPETITION_SIZE_ABOVE_MAX: {
      status: 409,
      owner: "competitions",
      summary: "The squad has more active members than the competition allows",
      actionable: !0,
      retryable: "never",
    },
    COMPETITION_SIZE_BELOW_MIN: {
      status: 409,
      owner: "competitions",
      summary:
        "The squad has fewer active members than the competition requires, after leaving out members another entry already counts",
      actionable: !0,
      retryable: "never",
    },
    COOLDOWN: {
      status: 429,
      owner: "shared",
      summary: "A per-user write throttle or spam cooldown refused the write",
      actionable: !1,
      retryable: "after",
      data: n,
    },
    DUPLICATE_CALLOUT: {
      status: 409,
      owner: "callout",
      summary: "The caller already has a live callout on this coin",
      actionable: !1,
      retryable: "never",
    },
    GROUP_ACTOR_REQUIRED: {
      status: 403,
      owner: "groups",
      summary:
        "The mutation must be made as a group, and no acting group was given",
      actionable: !1,
      retryable: "never",
    },
    GROUP_FULL: {
      status: 409,
      owner: "groups",
      summary: "The group has no free seats",
      actionable: !1,
      retryable: "never",
    },
    INSUFFICIENT_BALANCE: {
      status: 403,
      owner: "shared",
      summary: "The caller does not hold enough of the coin to write",
      actionable: !0,
      retryable: "never",
    },
    INVALID_CONTENT: {
      status: 422,
      owner: "shared",
      summary:
        "cc refused the text: empty, moderated, or too many x.com links; 422 because mobile latches 422 as content moderation and renders a bare 400 as a generic toast",
      actionable: !0,
      retryable: "never",
      data: n,
    },
    INVALID_USERNAME: {
      status: 400,
      owner: "groups",
      summary:
        "The requested group username fails cc's charset or length rules",
      actionable: !0,
      retryable: "never",
    },
    LABEL_LIMIT_REACHED: {
      status: 409,
      owner: "wallet-labels",
      summary:
        "The owner holds the maximum number of wallet labels; delete some to free space",
      actionable: !0,
      retryable: "never",
    },
    MARKET_CURSOR_EXPIRED: {
      status: 410,
      owner: "market",
      summary:
        "The cursor points at or past the end of the listings coin-communities holds now (the snapshot moved under it); restart from the first page",
      actionable: !0,
      retryable: "never",
    },
    MAYHEM_NOT_COMPLETED: {
      status: 403,
      owner: "callout",
      summary: "The coin's mayhem run has not completed, so the write is gated",
      actionable: !1,
      retryable: "never",
    },
    MEDIA_EXPIRED: {
      status: 400,
      owner: "callout",
      summary: "The video upload claimed by mediaId expired before it was used",
      actionable: !0,
      retryable: "never",
    },
    MEDIA_NOT_CLEAN: {
      status: 400,
      owner: "callout",
      summary: "The video upload claimed by mediaId has not passed screening",
      actionable: !0,
      retryable: "never",
    },
    MEDIA_NOT_OWNED: {
      status: 400,
      owner: "callout",
      summary: "The video upload claimed by mediaId belongs to another user",
      actionable: !0,
      retryable: "never",
    },
    MEDIA_RATE_LIMITED: {
      status: 429,
      owner: "callout",
      summary:
        "The per-user video upload budget (5 per 10 min, 30 a day) is spent",
      actionable: !1,
      retryable: "after",
    },
    MEDIA_REJECTED: {
      status: 400,
      owner: "shared",
      summary:
        "cc's media pipeline refused the image: type, size, or moderation",
      actionable: !0,
      retryable: "never",
    },
    NOT_AUTHORIZED: {
      status: 403,
      owner: "groups",
      summary: "The caller lacks the group role this mutation needs",
      actionable: !1,
      retryable: "never",
    },
    NOT_GROUP_ADMIN: {
      status: 403,
      owner: "shared",
      summary:
        "The caller is not an admin or owner of the group it is writing as",
      actionable: !1,
      retryable: "never",
      data: n,
    },
    NOT_MUTUAL: {
      status: 403,
      owner: "dms",
      summary: "A DM needs the two users to follow each other",
      actionable: !1,
      retryable: "never",
    },
    NO_ELIGIBLE_WALLET: {
      status: 403,
      owner: "shared",
      summary: "The caller has no linked, non-reserved wallet to write with",
      actionable: !0,
      retryable: "never",
    },
    PARENT_REPLY_NOT_FOUND: {
      status: 404,
      owner: "callout",
      summary:
        "The reply being nested under does not exist: deleted, or posted too recently to have flushed",
      actionable: !1,
      retryable: "never",
    },
    PARTNER_KEY_INVALID: {
      status: 401,
      owner: "mayhem",
      summary:
        "The partner routes are dark on this origin (MAYHEM_PARTNER_ROUTES_ENABLED unset or false), whatever the request carries; the partner key in x-mayhem-partner-key is checked at the edge, never by the origin",
      actionable: !1,
      retryable: "never",
    },
    PARTNER_RATE_LIMITED: {
      status: 429,
      owner: "mayhem",
      summary:
        "The edge's per-partner rate-limiting rule on /mayhem/partner/* refused the request before it reached the origin; retry after the window",
      actionable: !1,
      retryable: "after",
    },
    PORTFOLIO_BUILDING: {
      status: 409,
      owner: "portfolio",
      summary:
        "The wallet's portfolio is still being built and could not be served within the request's time budget; the build keeps running and a poll in a few seconds serves it (TASK-5674)",
      actionable: !1,
      retryable: "after",
    },
    PRICE_UNAVAILABLE: {
      status: 400,
      owner: "callout",
      summary: "cc has no price for the coin, so the callout cannot be minted",
      actionable: !1,
      retryable: "never",
    },
    PRIVY_ACCOUNT_EXISTS: {
      status: 409,
      owner: "auth",
      summary:
        "A non_custodial login for a Privy embedded wallet; sign in through the named provider instead",
      actionable: !0,
      retryable: "never",
      data: p,
    },
    PRIVY_IDENTITY_TOKEN_EXPIRED: {
      status: 401,
      owner: "auth",
      summary:
        "The x-privy-id-token header carries an expired Privy identity token; refresh it and retry",
      actionable: !0,
      retryable: "after",
      data: b,
    },
    PRIVY_IDENTITY_TOKEN_INVALID: {
      status: 401,
      owner: "auth",
      summary:
        "The x-privy-id-token header is missing or fails verification; send a fresh Privy identity token",
      actionable: !0,
      retryable: "never",
      data: g,
    },
    PRIVY_LINK_WALLET_ALREADY_LINKED: {
      status: 409,
      owner: "auth",
      summary:
        "Privy already holds the wallet key being imported (the session wallet, or on import/init and /submit any key Privy refuses as a duplicate); when `privyUserId` names the user being linked the import already happened — resume — otherwise sign in through the named provider instead of linking again",
      actionable: !0,
      retryable: "never",
      data: w,
    },
    PRIVY_LINK_MFA_ENROLLED: {
      status: 409,
      owner: "auth",
      summary:
        "The Privy user has two-factor authentication enabled, so a wallet key cannot be imported into the account through the server API (which Privy does not gate); the user turns two-factor off in the app first",
      actionable: !0,
      retryable: "never",
      data: y,
    },
    PRIVY_SIGNUP_IMPORT_CHAIN_OCCUPIED: {
      status: 409,
      owner: "auth",
      summary:
        "The Privy user already carries a wallet on that chain, so a device-minted key cannot be imported without forking the account; the client keeps the existing wallet",
      actionable: !0,
      retryable: "never",
      data: f,
    },
    PRIVY_SIGNUP_IMPORT_ADDRESS_IN_USE: {
      status: 409,
      owner: "auth",
      summary:
        "The address already belongs to a pump identity (SOL→EVM mapping or reverse), so importing it into a wallet-less Privy user would bypass the link flow; the client must abort",
      actionable: !0,
      retryable: "never",
      data: z,
    },
    PRIVY_EXPORT_WALLET_NOT_OWNED: {
      status: 403,
      owner: "auth",
      summary:
        "The wallet id is not a Privy-managed (embedded or imported) wallet on the requested chain of the Privy user the access token proves, so nothing is exported; the client re-reads the user’s linked accounts and does not retry with the same id",
      actionable: !0,
      retryable: "never",
      data: s,
    },
    PRIVY_EXPORT_MFA_REQUIRED: {
      status: 409,
      owner: "auth",
      summary:
        "The Privy user has two-factor authentication enabled (a non-email mfa_methods entry on the live user, or Privy itself refusing the export for a second factor), which the relay cannot satisfy; the client skips the device copy and keeps signing through Privy",
      actionable: !0,
      retryable: "never",
    },
    PROFILE_NOT_MIRRORED: {
      status: 404,
      owner: "shared",
      summary:
        "The viewer has no coin-communities profile yet: their login's cc user mint was shed (budget) and the JWT carries no userId claim. Clears on the next login or profile save; retry after, do not treat as an outage",
      actionable: !1,
      retryable: "after",
    },
    RATE_LIMITED: {
      status: 429,
      owner: "dms",
      summary: "cc's DM send throttle refused the message",
      actionable: !1,
      retryable: "after",
    },
    REPLY_NOT_FOUND: {
      status: 404,
      owner: "callout",
      summary: "No reply with that id: deleted, hidden, or never existed",
      actionable: !1,
      retryable: "never",
    },
    SELF_REPORT: {
      status: 400,
      owner: "reports",
      summary:
        "The report targets the caller themself, or a callout or reply they authored",
      actionable: !1,
      retryable: "never",
    },
    SPAM_RESTRICTED: {
      status: 429,
      owner: "shared",
      summary:
        "cc's spam restriction refused the write: the account is throttled after recent spam flags, distinct from the per-user write cooldown (COOLDOWN)",
      actionable: !1,
      retryable: "never",
      data: n,
    },
    USER_BANNED: {
      status: 403,
      owner: "shared",
      summary: "cc has banned the account",
      actionable: !1,
      retryable: "never",
    },
    USERNAME_RESERVED: {
      status: 409,
      owner: "shared",
      summary: "The requested username is reserved and cannot be claimed",
      actionable: !0,
      retryable: "never",
    },
    USERNAME_TAKEN: {
      status: 409,
      owner: "shared",
      summary:
        "Another account claimed the requested username between the availability check and the write",
      actionable: !0,
      retryable: "never",
    },
    VIDEO_DISABLED: {
      status: 400,
      owner: "callout",
      summary: "Video callouts are dark on coin-communities (rollout flag off)",
      actionable: !1,
      retryable: "never",
    },
    VOICE_DISABLED: {
      status: 400,
      owner: "callout",
      summary:
        "Voice-note callouts are dark (client-server calloutVoiceUploads or cc coinCommunitiesCalloutVoiceMedia off)",
      actionable: !1,
      retryable: "never",
    },
    UNSUPPORTED_VOICE: {
      status: 400,
      owner: "callout",
      summary:
        "The clip is not a voice note cc accepts: not audio-only AAC, over 120 s, or over 10 MiB",
      actionable: !0,
      retryable: "never",
    },
    WALLET_NOT_ALLOWED: {
      status: 405,
      owner: "auth",
      summary: "The wallet is screened; the method is refused for it",
      actionable: !1,
      retryable: "never",
      data: m,
    },
    REGISTER_THROTTLED: {
      status: 429,
      owner: "auth",
      summary:
        "cc's signup mint budget refused the create (the REGISTER door's emergency brake is on); the session stays claimless until a retry lands",
      actionable: !1,
      retryable: "after",
    },
    NATS_AUTH_DISABLED: {
      status: 404,
      owner: "auth",
      summary:
        "Per-user NATS auth is dark: the server flag natsTokenMint is OFF, or no account signing seed is configured. Keep the static subscriber credentials.",
      actionable: !1,
      retryable: "after",
    },
    NATS_AUTH_USER_SCOPE_REQUIRED: {
      status: 403,
      owner: "auth",
      summary:
        "The session carries no cc user id (pre-claim wallet-only token), so no per-user NATS token can be scoped. Keep the static subscriber credentials.",
      actionable: !1,
      retryable: "never",
    },
    WALLET_LINK_CHALLENGE_EXPIRED: {
      status: 403,
      owner: "auth",
      summary:
        "The v2 proof names no live challenge for the (session wallet, EVM wallet) pair: none was issued by POST /wallet-mapping/challenge, it expired (900 s), a newer one replaced it, or a link already consumed it; the client requests a new challenge and re-signs",
      actionable: !0,
      retryable: "never",
    },
    WALLET_LINK_EVM_OWNED_ELSEWHERE: {
      status: 409,
      owner: "auth",
      summary:
        "The EVM wallet is linked to another account, and the request did not ask to move it (allowRebind) or the move was refused; the user signs in with that account or retries with allowRebind",
      actionable: !0,
      retryable: "never",
    },
    WALLET_LINK_INVALID_SIGNATURE: {
      status: 403,
      owner: "auth",
      summary:
        "The EIP-191 signature does not prove the EVM key consents to linking it to the session's Solana wallet under the named message version (or a v2 proof's nonce/expiry was refused); the client re-signs",
      actionable: !0,
      retryable: "never",
    },
    WALLET_LINK_NO_ACCOUNT: {
      status: 409,
      owner: "auth",
      summary:
        "The session wallet has no account in the user registry yet, so there is no user to link the EVM wallet to; retry after the account exists",
      actionable: !1,
      retryable: "after",
    },
    WALLET_LINK_SOL_ALREADY_LINKED: {
      status: 409,
      owner: "auth",
      summary:
        "The session Solana wallet already has a different canonical EVM wallet and the request did not ask to move it; the client retries with allowRebind to make the proven wallet canonical",
      actionable: !0,
      retryable: "never",
    },
    WALLET_REQUIRED: {
      status: 409,
      owner: "x-link",
      summary:
        "The account has no Solana wallet: the X bio proof needs one, and an unlink would leave X as the last identity anchor",
      actionable: !1,
      retryable: "never",
    },
    X_ACCOUNT_NOT_FOUND: {
      status: 404,
      owner: "x-link",
      summary: "No X account has that handle, or it is suspended",
      actionable: !0,
      retryable: "never",
    },
    X_ALREADY_LINKED: {
      status: 409,
      owner: "x-link",
      summary:
        "The caller already has an X account linked; unlink it first (DELETE /users/me/socials/twitter)",
      actionable: !0,
      retryable: "never",
    },
    X_BIO_WALLET_NOT_FOUND: {
      status: 409,
      owner: "x-link",
      summary:
        "That X account's bio does not contain the caller's Solana wallet address verbatim; add it as plain text (not inside a link) and resubmit",
      actionable: !0,
      retryable: "after",
    },
    X_HANDLE_INVALID: {
      status: 400,
      owner: "x-link",
      summary:
        "The X handle is not 1-15 letters, digits or underscores (a leading @ is allowed)",
      actionable: !0,
      retryable: "never",
    },
    X_HANDLE_TAKEN: {
      status: 409,
      owner: "x-link",
      summary: "That X account is already linked to another profile",
      actionable: !1,
      retryable: "never",
    },
    X_LINK_REQUEST_COOLDOWN: {
      status: 429,
      owner: "x-link",
      summary:
        "One X link request per 7 days per user, whatever its outcome; the remaining wait rides `retryAfterMs` / `retryAt`",
      actionable: !1,
      retryable: "after",
      data: a,
    },
    X_LINK_REQUEST_PENDING: {
      status: 409,
      owner: "x-link",
      summary: "The caller already has a request waiting for review",
      actionable: !1,
      retryable: "never",
    },
  }),
    (r.isErrorCode = (e) =>
      Object.prototype.hasOwnProperty.call(r.ERROR_CODES, e)),
    (r.codeMeta = (e) => ((0, r.isErrorCode)(e) ? r.ERROR_CODES[e] : void 0)),
    (r.domainCode = (e) => {
      if ("object" != typeof e || null === e) return null;
      let { error: t } = e;
      return "string" == typeof t && r.ERROR_CODE_PATTERN.test(t) ? t : null;
    }));
};
