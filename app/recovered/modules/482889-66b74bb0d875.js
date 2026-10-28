// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.creatorRewardsTosRoutes = void 0));
  let o = e.r(876543);
  r.creatorRewardsTosRoutes = (0, e.r(183184).defineRoutes)({
    "GET /creator-rewards-tos": {
      summary:
        "Whether the authenticated user accepted the creator-rewards ToS (and when)",
      response: o.z.object({
        accepted: o.z.boolean(),
        acceptedAt: o.z.string().nullable(),
      }),
    },
    "POST /creator-rewards-tos/accept": {
      summary:
        "Record the authenticated user's creator-rewards ToS acceptance (idempotent; echoes the original acceptance time)",
      response: o.z.object({
        acceptedAt: o.z.string().nullable(),
        alreadyAccepted: o.z.boolean(),
      }),
    },
  });
};
