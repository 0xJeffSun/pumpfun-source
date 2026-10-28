// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.internalApiPlatformRoutes = void 0));
  let o = e.r(876543),
    n = e.r(503617),
    s = e.r(183184),
    a = e.r(142683),
    i = { 503: !0 };
  r.internalApiPlatformRoutes = (0, s.defineRoutes)({
    "GET /internal/api-platform/applications": {
      summary:
        "Internal: review queue, orgs by status (newest first, cursor paged) or status=all (bounded overview: 25 per status, merged newest first, no cursor); q looks an org up by id, name or email across every status",
      query: o.z.object({
        status: o.z
          .enum(["applied", "approved", "suspended", "closed", "all"])
          .optional()
          .describe(
            "Default applied. all = every status partition read once (25 each), merged newest first, next_cursor null, partial when a partition had more; the per-status tabs paginate. Ignored when q is set",
          ),
        q: o.z
          .string()
          .max(100)
          .optional()
          .describe(
            "An org id (exact: one direct read, any status) or a case-insensitive name / email substring matched across every status; status is ignored",
          ),
        cursor: a.cursorQuery.describe(
          "Opaque page cursor from the previous page of a single status; ignored with status=all or q",
        ),
      }),
      response: o.z.object({
        orgs: o.z.array(a.adminOrgRow),
        next_cursor: o.z
          .string()
          .nullable()
          .describe("null on the last page, and always with status=all or q"),
        partial: o.z
          .boolean()
          .optional()
          .describe(
            "status=all or a substring q only: true when some status partition had more rows than the bounded read returned (25 for all, 200 per status for q); absent on a paged single-status read",
          ),
      }),
      emits: ["API_ORG_NOT_FOUND"],
      errors: i,
    },
    "GET /internal/api-platform/orgs/{orgId}": {
      summary: "Internal: org detail with its newest application and every key",
      params: o.z.object({ orgId: a.uuid }),
      response: o.z.object({
        org: a.adminOrgRow,
        application: a.applicationView,
        keys: o.z.array(a.keyRow),
      }),
      emits: ["API_ORG_NOT_FOUND"],
      errors: i,
    },
    "POST /internal/api-platform/orgs/{orgId}/approve": {
      summary:
        "Internal: approve an applied (or re-admit a suspended) org: status approved; the pending application is decided",
      params: o.z.object({ orgId: a.uuid }),
      body: o.z
        .object({ note: o.z.string().trim().max(1e3).optional() })
        .optional(),
      response: o.z.object({ org: a.adminOrgRow }),
      emits: ["API_ORG_NOT_FOUND"],
      errors: i,
    },
    "POST /internal/api-platform/orgs/{orgId}/reject": {
      summary:
        "Internal: reject an org: status closed with a note to the applicant",
      params: o.z.object({ orgId: a.uuid }),
      body: o.z.object({ note: o.z.string().trim().min(1).max(1e3) }),
      response: o.z.object({ org: a.adminOrgRow }),
      emits: ["API_ORG_NOT_FOUND"],
      errors: i,
    },
    "POST /internal/api-platform/orgs/{orgId}/suspend": {
      summary:
        "Internal: suspend an org: status suspended, every key’s verdict tombstoned; approve re-admits it",
      params: o.z.object({ orgId: a.uuid }),
      body: o.z.object({ reason: o.z.string().trim().min(1).max(1e3) }),
      response: o.z.object({
        org: a.adminOrgRow,
        keys_invalidated: o.z.number().int(),
      }),
      emits: ["API_ORG_NOT_FOUND"],
      errors: i,
    },
    "PATCH /internal/api-platform/keys/{keyId}": {
      summary:
        "Internal: edit a key's scopes and limits (0 = kill switch); the verdict is tombstoned in the same request",
      params: o.z.object({ keyId: a.uuid }),
      body: o.z.object({
        scopes: o.z
          .array(a.apiScope)
          .min(1)
          .max(n.API_SCOPES.length)
          .refine((e) => new Set(e).size === e.length, {
            message: "scopes must be unique",
          })
          .optional(),
        rps_burst: o.z.number().int().min(0).max(100).optional(),
        daily_limit: o.z.number().int().min(0).max(1e7).optional(),
        reason: o.z
          .string()
          .trim()
          .max(500)
          .optional()
          .describe("Recorded on the audit row"),
      }),
      response: a.keyRow,
      emits: ["API_KEY_NOT_FOUND"],
      errors: i,
    },
    "POST /internal/api-platform/orgs/{orgId}/revoke-all": {
      summary:
        "Internal: revoke every active or rotating key of the org; verdicts tombstoned in the same request",
      params: o.z.object({ orgId: a.uuid }),
      body: o.z.object({ reason: o.z.string().trim().min(1).max(1e3) }),
      response: o.z.object({ org_id: a.uuid, revoked: o.z.number().int() }),
      emits: ["API_ORG_NOT_FOUND"],
      errors: i,
    },
    "GET /internal/api-platform/orgs/{orgId}/usage": {
      summary:
        "Internal: org usage, per-key totals and the summed series; 24h/30d from Redis, 90d from BigQuery behind apiPlatformUsageHistory",
      params: o.z.object({ orgId: a.uuid }),
      query: o.z.object({ range: o.z.enum(["24h", "30d", "90d"]) }),
      response: a.orgUsageResponse,
      emits: ["API_ORG_NOT_FOUND"],
      errors: i,
    },
    "GET /internal/api-platform/audit": {
      summary:
        "Internal: an org's audit log, newest first, cursor-paged (25 per page)",
      query: o.z.object({ orgId: a.uuid, cursor: a.cursorQuery }),
      response: o.z.object({
        entries: o.z.array(a.auditRow),
        next_cursor: o.z.string().nullable(),
      }),
      emits: ["API_ORG_NOT_FOUND"],
      errors: i,
    },
  });
};
