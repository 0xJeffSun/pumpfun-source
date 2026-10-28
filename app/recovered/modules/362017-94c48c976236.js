// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.blocksRoutes = void 0));
  let o = e.r(876543);
  r.blocksRoutes = (0, e.r(183184).defineRoutes)({
    "POST /blocks/{userId}": {
      summary: "Block a user: they can no longer reply in your callout threads",
      params: o.z.object({
        userId: o.z
          .string()
          .describe(
            "A cc profile UUID or a base58 wallet address; any other shape is 400",
          ),
      }),
      response: o.z.object({
        blockedAt: o.z
          .string()
          .nullable()
          .describe(
            "ISO-8601 timestamp of the block edge; a repeat block returns the original",
          ),
      }),
    },
    "DELETE /blocks/{userId}": {
      summary: "Unblock a user",
      params: o.z.object({
        userId: o.z
          .string()
          .describe(
            "A cc profile UUID or a base58 wallet address; any other shape is 400",
          ),
      }),
      response: o.z.void(),
    },
    "GET /blocks": {
      summary: "List the users you have blocked, newest first",
      response: o.z.object({ userIds: o.z.array(o.z.string()) }),
    },
  });
};
