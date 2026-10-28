// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.internalUsersRoutes = void 0));
  let o = e.r(876543);
  r.internalUsersRoutes = (0, e.r(183184).defineRoutes)({
    "POST /internal/users/{address}/invalidate-cache": {
      summary: "Internal: purge a user profile from the cache",
      params: o.z.object({ address: o.z.string() }),
      response: o.z.object({
        success: o.z
          .boolean()
          .describe(
            "Always true — the purge is synchronous and a failure surfaces as a non-2xx.",
          ),
      }),
    },
  });
};
