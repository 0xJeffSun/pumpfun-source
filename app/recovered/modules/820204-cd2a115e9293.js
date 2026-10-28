// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.mutesRoutes = void 0));
  let o = e.r(876543);
  r.mutesRoutes = (0, e.r(183184).defineRoutes)({
    "POST /mutes/{userId}": {
      summary: "Mute a user, hiding them from your For You feed",
      params: o.z.object({
        userId: o.z.string().describe("A cc profile UUID or a wallet address"),
      }),
      response: o.z.object({
        mutedAt: o.z
          .string()
          .nullable()
          .describe("ISO-8601 timestamp of the mute edge"),
      }),
    },
    "DELETE /mutes/{userId}": {
      summary: "Unmute a user",
      params: o.z.object({
        userId: o.z.string().describe("A cc profile UUID or a wallet address"),
      }),
      response: o.z.void(),
    },
    "GET /mutes": {
      summary: "List the users you have muted, newest first",
      response: o.z.object({ userIds: o.z.array(o.z.string()) }),
    },
  });
};
