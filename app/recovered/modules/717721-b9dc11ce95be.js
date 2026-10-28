// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.videosRoutes = void 0));
  let o = e.r(876543);
  r.videosRoutes = (0, e.r(183184).defineRoutes)({
    "GET /videos/get-signed-url": {
      summary: "Get a presigned upload URL for a video",
      query: o.z.object({ extension: o.z.string() }),
      response: o.z.object({
        filename: o.z.string().describe("Generated object filename"),
        url: o.z
          .object({
            url: o.z.string(),
            fields: o.z.record(o.z.string(), o.z.string()),
          })
          .describe("S3 presigned POST payload (url and required form fields)"),
      }),
    },
  });
};
