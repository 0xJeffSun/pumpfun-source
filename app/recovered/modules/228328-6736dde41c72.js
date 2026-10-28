// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.xLinkRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(4171),
    a = o.z.object({
      xUsername: o.z
        .string()
        .describe("X's spelling of the handle, no leading @"),
      requestedAt: o.z
        .string()
        .describe("ISO timestamp the request was queued"),
    });
  r.xLinkRoutes = (0, n.defineRoutes)({
    "POST /users/me/x-link-request": {
      summary:
        "Queue a request to link an X account to the caller's profile. The caller's Solana wallet address must already appear verbatim in that X account's bio; the server verifies it before queueing, and an admin links after re-verifying. One request per 7 days, whatever its outcome.",
      body: o.z.object({
        username: o.z
          .string()
          .max(64)
          .describe(
            "The X handle to link, with or without a leading @ (1-15 letters, digits or underscores)",
          ),
      }),
      response: o.z.object({ pending: a }),
      emits: [
        "X_HANDLE_INVALID",
        "X_ACCOUNT_NOT_FOUND",
        "X_BIO_WALLET_NOT_FOUND",
        "X_ALREADY_LINKED",
        "X_HANDLE_TAKEN",
        "X_LINK_REQUEST_PENDING",
        "X_LINK_REQUEST_COOLDOWN",
        "WALLET_REQUIRED",
        "USER_BANNED",
        "PROFILE_NOT_MIRRORED",
      ],
      errors: { 429: s.userRateLimitError, 503: !0 },
    },
    "GET /users/me/x-link-request": {
      summary:
        "The caller's X-link request state: what the app shows as pending (a queued request, or a rejected one still inside its 7-day cooldown — the user is never told about a rejection), the wallet address the X bio must carry, when they may submit again, and whether intake is open.",
      response: o.z.object({
        pending: a
          .nullable()
          .describe(
            "Null when the user may submit, is linked, or never requested",
          ),
        walletAddress: o.z
          .string()
          .describe(
            "The Solana wallet address the X bio must carry, verbatim; empty when the account has none",
          ),
        cooldownUntil: o.z
          .string()
          .nullable()
          .describe(
            "When the user may submit again (ISO); null when they may submit now",
          ),
        intakeOpen: o.z
          .boolean()
          .describe(
            "False while intake is closed server-side: POST would answer 503",
          ),
      }),
      emits: ["PROFILE_NOT_MIRRORED"],
      errors: { 503: !0 },
    },
    "POST /groups/{groupId}/x-link-request": {
      summary:
        "Queue a request to link an X account to a squad (owner/admin only). Support links it from the admin panel; one request per squad per 7 days, whatever its outcome.",
      params: o.z.object({
        groupId: o.z.string().describe("cc user id (UUID) of the squad"),
      }),
      body: o.z.object({
        username: o.z
          .string()
          .max(64)
          .describe(
            "The X handle to link, with or without a leading @ (1-15 letters, digits or underscores)",
          ),
      }),
      response: o.z.object({ pending: a }),
      emits: [
        "X_HANDLE_INVALID",
        "X_ALREADY_LINKED",
        "X_HANDLE_TAKEN",
        "X_LINK_REQUEST_PENDING",
        "X_LINK_REQUEST_COOLDOWN",
        "WALLET_REQUIRED",
        "USER_BANNED",
        "GROUP_ACTOR_REQUIRED",
        "NOT_AUTHORIZED",
        "ACTING_USER_INVALID",
        "PROFILE_NOT_MIRRORED",
      ],
      errors: { 429: s.userRateLimitError, 503: !0 },
    },
    "GET /groups/{groupId}/x-link-request": {
      summary:
        "A squad's X-link request state (owner/admin only): what the app shows as pending (a queued request, or a rejected one still inside its 7-day cooldown — the member is never told about a rejection), when a member may submit again, and whether intake is open.",
      params: o.z.object({
        groupId: o.z.string().describe("cc user id (UUID) of the squad"),
      }),
      response: o.z.object({
        pending: a
          .nullable()
          .describe(
            "Null when a member may submit, the squad is linked, or none was ever requested",
          ),
        walletAddress: o.z
          .string()
          .describe("Always empty for a squad: it owns no wallet"),
        cooldownUntil: o.z
          .string()
          .nullable()
          .describe(
            "When a member may submit again (ISO); null when they may submit now",
          ),
        intakeOpen: o.z
          .boolean()
          .describe(
            "False while intake is closed server-side: POST would answer 503",
          ),
      }),
      emits: ["NOT_AUTHORIZED", "PROFILE_NOT_MIRRORED"],
      errors: { 503: !0 },
    },
    "DELETE /users/me/socials/twitter": {
      summary:
        "Unlink the caller's X account. Idempotent; refused only when the account has no wallet and X is its last identity anchor.",
      response: o.z.void(),
      emits: ["WALLET_REQUIRED", "PROFILE_NOT_MIRRORED"],
      errors: { 429: s.userRateLimitError, 503: !0 },
    },
  });
};
