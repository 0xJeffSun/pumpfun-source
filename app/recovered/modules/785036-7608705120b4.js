// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.publicRead = r.KEYED_ROUTE_CODES = void 0),
    (r.KEYED_ROUTE_CODES = [
      "API_CREDENTIAL_NOT_ALLOWED",
      "API_KEY_INVALID",
      "API_KEY_RATE_LIMITED",
      "API_KEY_REQUIRED",
      "API_KEY_REVOKED",
      "API_ORG_NOT_APPROVED",
      "API_ORG_SUSPENDED",
      "API_REGION_RESTRICTED",
      "API_SCOPE_FORBIDDEN",
    ]),
    (r.publicRead = (e, t) => ({
      ...t,
      emits: [
        ...r.KEYED_ROUTE_CODES,
        ...(t.emits ?? []).filter((e) => !r.KEYED_ROUTE_CODES.includes(e)),
      ],
      visibility: "public",
      scope: e,
    })));
};
