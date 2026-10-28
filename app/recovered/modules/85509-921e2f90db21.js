// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.presenceRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = o.z.object({
      sharesLastActive: o.z
        .boolean()
        .describe(
          "Whether the caller's last-active time is shared with others. Default true; when false the caller reads as inactive to everyone.",
        ),
    });
  r.presenceRoutes = (0, n.defineRoutes)({
    "GET /presence/settings": {
      summary: "The caller's presence settings (owner-only)",
      response: s,
    },
    "PATCH /presence/settings": {
      summary:
        "Update the caller's presence settings (partial: omitted fields keep their stored value). Echoes the post-write state.",
      body: o.z.object({
        sharesLastActive: o.z
          .boolean()
          .optional()
          .describe(
            "false stops sharing and erases the current last-active stamp; true resumes sharing on the next request. Omitted keeps the stored value.",
          ),
      }),
      response: s,
    },
  });
};
