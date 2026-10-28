// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.developerRoutes =
      r.cursorQuery =
      r.orgUsageResponse =
      r.auditRow =
      r.adminOrgRow =
      r.keyRow =
      r.applicationView =
      r.apiScope =
      r.uuid =
        void 0));
  let o = e.r(876543),
    n = e.r(503617),
    s = e.r(183184);
  r.uuid = o.z.string().uuid();
  let a = o.z.string().describe("ISO 8601 timestamp");
  r.apiScope = o.z.enum(n.API_SCOPES);
  let i = o.z
      .enum(["applied", "approved", "suspended", "closed"])
      .describe(
        "applied = awaiting ops review; approved = may hold keys; suspended / closed = no key is served",
      ),
    l = o.z.object({
      org_id: r.uuid,
      name: o.z.string(),
      contact_email: o.z.string(),
      email_verified_at: a
        .nullable()
        .describe("null until the one-time code is confirmed"),
      use_case: o.z.string(),
      website: o.z
        .string()
        .nullable()
        .describe("Optional product URL from the application"),
      requested_scopes: o.z
        .array(r.apiScope)
        .nullable()
        .describe(
          "The scopes the applicant asked for; informational for ops (keys start on the default grant)",
        ),
      status: i,
      terms_version: o.z
        .string()
        .nullable()
        .describe("The API terms version the owner accepted; null = none yet"),
      terms_accepted_at: a.nullable(),
      terms_current: o.z
        .boolean()
        .describe(
          "Whether terms_version equals the configured current version (false when no version is configured)",
        ),
      created_at: a,
    });
  r.applicationView = o.z
    .object({
      decision: o.z
        .enum(["pending", "approved", "rejected"])
        .describe("pending until ops approve or reject"),
      note: o.z
        .string()
        .nullable()
        .describe("Ops' note to the applicant (shown on the status band)"),
      decided_at: a.nullable(),
    })
    .nullable()
    .describe("The newest application; null when none was ever submitted");
  let d = o.z.object({ org: l, application: r.applicationView }),
    c = o.z
      .enum(["active", "rotating", "revoked"])
      .describe(
        "active = served and counted against max_keys; rotating = the old key of a rotation, served until grace_until and not counted; revoked = refused",
      );
  r.keyRow = o.z.object({
    key_id: r.uuid,
    name: o.z.string(),
    key_prefix: o.z
      .string()
      .describe(
        "The first 12 characters of the key (pf_live_ + 4), for display",
      ),
    key_last4: o.z.string().describe("The last 4 characters of the key"),
    scopes: o.z.array(r.apiScope),
    rps_burst: o.z
      .number()
      .int()
      .describe(
        "Sustained requests per second; the burst bucket is 60 x rps_burst. 0 = ops kill switch",
      ),
    daily_limit: o.z
      .number()
      .int()
      .describe("Requests per UTC day. 0 = ops kill switch"),
    status: c,
    created_at: a,
    last_used_at: a
      .nullable()
      .describe("Sampled (at most once per 5 min); null until first use"),
    revoked_at: a
      .nullable()
      .describe(
        "When revoked; for a key retired by its rotation grace window this is grace_until",
      ),
    rotated_from: r.uuid
      .nullable()
      .describe("The key this one was rotated from, when issued by rotate"),
    grace_until: a
      .nullable()
      .describe(
        "For status rotating: the instant the key stops being served; null otherwise",
      ),
  });
  let u = o.z.object({
      keys: o.z
        .array(r.keyRow)
        .describe("Oldest first, rotating and revoked keys included"),
      active_keys: o.z
        .number()
        .int()
        .describe("Keys with status active (rotating keys are not counted)"),
      max_keys: o.z
        .number()
        .int()
        .describe("API_KEYS_PER_ORG_MAX, on active keys"),
    }),
    h = o.z.object({
      key: o.z
        .string()
        .describe(
          "The plaintext key, returned exactly once; never retrievable again",
        ),
      key_row: r.keyRow,
    }),
    m = h.extend({
      old_key: r.keyRow.describe(
        "The rotated-from key as it now stands: status rotating, grace_until = when it stops being served",
      ),
    }),
    p = {
      ok: o.z.number().int(),
      limited: o.z.number().int(),
      err: o.z.number().int(),
      refused: o.z.number().int(),
    },
    b = o.z.object({
      t: a.describe("Bucket start (per minute for 24h, per hour for 30d)"),
      ...p,
    }),
    g = o.z.object({
      route: o.z
        .string()
        .describe("The contract route key, e.g. 'GET /users/{id}'"),
      count: o.z.number().int(),
    }),
    w = o.z.object({
      keyId: r.uuid,
      range: o.z.enum(["24h", "30d"]),
      generatedAt: a,
      dailyLimit: o.z.number().int(),
      todayUsed: o.z
        .number()
        .int()
        .describe("Requests this UTC day, all classes"),
      todayRemaining: o.z
        .number()
        .int()
        .describe("max(dailyLimit - todayUsed, 0)"),
      series: o.z.array(b),
      topRoutes: o.z.array(g).describe("Last 7 days, top 10"),
      source: o.z.literal("redis"),
    }),
    y = o.z.object({
      version: o.z
        .string()
        .nullable()
        .describe(
          "The current API terms version (API_TERMS_VERSION); null = none configured: no acceptance is required and key issuance is not gated on terms",
        ),
      text: o.z.string().describe("The current terms text (Markdown)"),
      accepted: o.z
        .object({ version: o.z.string(), accepted_at: a })
        .nullable()
        .describe("The owner's recorded acceptance; null when none or no org"),
      current: o.z
        .boolean()
        .describe(
          "Whether the recorded acceptance matches the current version",
        ),
    });
  ((r.adminOrgRow = l.extend({
    owner_cc_user_id: o.z.string(),
    owner_login_email: o.z
      .string()
      .nullable()
      .describe(
        "The developer-console sign-in email the latest apply asserted (x-pump-console-assertion); null when the org applied while the gate was dormant",
      ),
    key_count: o.z
      .number()
      .int()
      .describe("Keys with status active (what the cap counts)"),
    rotating_count: o.z
      .number()
      .int()
      .describe("Keys with status rotating (served until their grace_until)"),
  })),
    (r.auditRow = o.z.object({
      id: r.uuid,
      ts: a,
      actor: o.z
        .string()
        .describe(
          "Who acted, per actor_kind: the owner’s cc user id, the operator’s email (x-actor-email on the internal door), or system",
        ),
      actor_kind: o.z
        .enum(["owner", "operator", "system"])
        .describe(
          "owner = the org owner through the console; operator = an ops operator through the internal door; system = automation (rotation grace expiry)",
        ),
      action: o.z.enum([
        "org.apply",
        "org.email_verify_requested",
        "org.email_verified",
        "org.terms_accepted",
        "org.approve",
        "org.reject",
        "org.suspend",
        "org.revoke_all",
        "key.create",
        "key.rotate",
        "key.revoke",
        "key.update_limits",
        "key.browser_origin_warn",
      ]),
      org_id: r.uuid,
      key_id: r.uuid.nullable(),
      reason: o.z.string().nullable(),
    })));
  let f = o.z.object({ keyId: r.uuid, name: o.z.string(), status: c, ...p });
  ((r.orgUsageResponse = o.z.object({
    orgId: r.uuid,
    range: o.z.enum(["24h", "30d", "90d"]),
    generatedAt: a,
    keys: o.z.array(f).describe("Per-key totals over the range"),
    series: o.z.array(b),
    topRoutes: o.z.array(g),
    source: o.z
      .enum(["redis", "bigquery"])
      .describe(
        "redis for 24h/30d (and for a truncated 90d); bigquery for a 90d served from the warehouse",
      ),
    loaded: o.z
      .boolean()
      .describe(
        "false when the 90d history is dark (apiPlatformUsageHistory off); the rows are then empty. A 90d the warehouse could not serve in time is loaded:true from Redis with truncated:true instead",
      ),
    truncated: o.z
      .boolean()
      .optional()
      .describe(
        "90d only: true when BigQuery was unconfigured, timed out (2 s) or failed and the rows are the Redis 30d window (series per hour, source redis); absent otherwise",
      ),
  })),
    (r.cursorQuery = o.z
      .string()
      .max(1024)
      .optional()
      .describe(
        "Opaque page cursor from the previous page; omit for the first page",
      )));
  let z = ["API_PLATFORM_ACCOUNT_REQUIRED", "API_ORG_NOT_FOUND"];
  r.developerRoutes = (0, s.defineRoutes)({
    "GET /developer/org": {
      summary: "The session owner's developer org and its newest application",
      response: d,
      emits: z,
    },
    "POST /developer/org/apply": {
      summary:
        "Apply for a developer org (status applied; ops approve or reject in the review queue)",
      body: o.z.object({
        name: o.z.string().trim().min(1).max(64),
        contact_email: o.z.string().trim().toLowerCase().email().max(254),
        use_case: o.z.string().trim().min(10).max(2e3),
        website: o.z
          .string()
          .trim()
          .max(200)
          .regex(/^https?:\/\/\S+$/)
          .optional()
          .describe("Optional product URL (http or https)"),
        requested_scopes: o.z
          .array(r.apiScope)
          .min(1)
          .max(n.API_SCOPES.length)
          .refine((e) => new Set(e).size === e.length, {
            message: "scopes must be unique",
          })
          .optional()
          .describe(
            "The scopes the applicant asks for (informational for ops)",
          ),
      }),
      response: d,
      emits: [
        "API_PLATFORM_ACCOUNT_REQUIRED",
        "API_ORG_EXISTS",
        "API_APPLY_CONSOLE_REQUIRED",
      ],
    },
    "POST /developer/org/email/verify/request": {
      summary:
        "Send a 6-digit one-time code to the contact email (60 s resend lock, 600 s validity, 5 attempts)",
      response: o.z.object({
        sent: o.z.literal(!0),
        expires_at: a,
        resend_available_at: a,
      }),
      emits: [...z, "API_EMAIL_CODE_COOLDOWN"],
      errors: { 503: !0 },
    },
    "POST /developer/org/email/verify/confirm": {
      summary: "Confirm the one-time code and mark the contact email verified",
      body: o.z.object({ code: o.z.string().regex(/^\d{6}$/) }),
      response: o.z.object({ verified: o.z.literal(!0), email_verified_at: a }),
      emits: [...z, "API_EMAIL_CODE_INVALID"],
      errors: { 503: !0 },
    },
    "GET /developer/keys": {
      summary:
        "List the org's keys (prefix + last 4, scopes, limits, status, last use)",
      response: u,
      emits: z,
    },
    "POST /developer/keys": {
      summary:
        "Create a named key; the plaintext is returned once. Needs an approved org, a verified email, the current terms accepted, and a free slot",
      body: o.z.object({
        name: o.z.string().trim().min(1).max(64),
        scopes: o.z
          .array(r.apiScope)
          .min(1)
          .max(n.API_SCOPES.length)
          .refine((e) => new Set(e).size === e.length, {
            message: "scopes must be unique",
          })
          .optional()
          .describe(
            "Subset of the default grant (every scope but moderation.read); omitted = the default grant. moderation.read is granted by ops only",
          ),
      }),
      response: h,
      emits: [
        ...z,
        "API_ORG_NOT_APPROVED",
        "API_ORG_SUSPENDED",
        "API_EMAIL_NOT_VERIFIED",
        "API_TERMS_NOT_ACCEPTED",
        "API_KEY_LIMIT_REACHED",
      ],
    },
    "POST /developer/keys/{keyId}/rotate": {
      summary:
        "Issue a sibling key (same name, scopes and limits; rotated_from set); the old key becomes rotating, is served until grace_until (default 24 h), then treated as revoked. Always allowed at the key cap",
      params: o.z.object({ keyId: r.uuid }),
      body: o.z
        .object({
          grace_hours: o.z
            .number()
            .optional()
            .describe(
              "Hours the rotated-from key keeps being served: an integer, 1 h .. 7 d (default 24); anything else is 400 API_KEY_GRACE_INVALID {min, max}",
            ),
        })
        .optional(),
      response: m,
      emits: [
        ...z,
        "API_KEY_NOT_FOUND",
        "API_KEY_ROTATING",
        "API_KEY_REVOKED",
        "API_KEY_GRACE_INVALID",
        "API_ORG_NOT_APPROVED",
        "API_ORG_SUSPENDED",
        "API_EMAIL_NOT_VERIFIED",
        "API_TERMS_NOT_ACCEPTED",
      ],
    },
    "DELETE /developer/keys/{keyId}": {
      summary:
        "Revoke a key (idempotent); the data plane refuses it on the next request (verdict tombstoned in the same request)",
      params: o.z.object({ keyId: r.uuid }),
      response: o.z.object({
        key_id: r.uuid,
        status: o.z.literal("revoked"),
        revoked_at: a,
      }),
      emits: [...z, "API_KEY_NOT_FOUND"],
    },
    "GET /developer/keys/{keyId}/usage": {
      summary:
        "A key's usage from the Redis counters: 24h per minute or 30d per hour",
      params: o.z.object({ keyId: r.uuid }),
      query: o.z.object({ range: o.z.enum(["24h", "30d"]) }),
      response: w,
      emits: [...z, "API_KEY_NOT_FOUND"],
      errors: { 503: !0 },
    },
    "GET /developer/terms": {
      summary:
        "The current API terms text and version, with the caller’s acceptance state",
      response: y,
      emits: ["API_PLATFORM_ACCOUNT_REQUIRED"],
    },
    "POST /developer/terms/accept": {
      summary:
        "Record acceptance of the current API terms version (version, acceptor, time, IP)",
      body: o.z.object({ version: o.z.string().trim().min(1).max(64) }),
      response: o.z.object({
        terms_version: o.z.string(),
        terms_accepted_at: a,
      }),
      emits: [...z, "API_TERMS_NOT_ACCEPTED"],
    },
  });
};
