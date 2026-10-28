// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.articlesRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = o.z.object({
      headline: o.z.string(),
      preview: o.z.string(),
      content: o.z.string(),
      publishedAt: o.z.string(),
    });
  r.articlesRoutes = (0, n.defineRoutes)({
    "GET /articles/latest": {
      summary: "Get the latest article for a mint and locale",
      query: o.z.object({
        mint: o.z.string().min(1),
        locale: o.z.string().min(1),
      }),
      response: s,
    },
    "GET /articles/list": {
      summary: "List published articles for a locale",
      query: o.z.object({
        locale: o.z.string().min(1),
        page: o.z.number().int().min(1).optional(),
        pageSize: o.z.number().int().min(1).max(100).optional(),
      }),
      response: o.z.object({
        data: o.z.array(
          o.z.object({
            id: o.z.number(),
            mint: o.z.string(),
            headline: o.z.string(),
            preview: o.z.string(),
            publishedAt: o.z.string(),
          }),
        ),
        meta: o.z.object({
          page: o.z.number(),
          pageSize: o.z.number(),
          pageCount: o.z.number(),
          total: o.z.number(),
        }),
      }),
    },
    "GET /articles/{id}": {
      summary: "Get an article by id and locale",
      params: o.z.object({ id: o.z.number().int() }),
      query: o.z.object({ locale: o.z.string().min(1) }),
      response: s,
    },
    "POST /articles/cms-webhook": {
      summary: "Handle a Strapi CMS content-change webhook",
      body: o.z.object({
        event: o.z.string().optional(),
        model: o.z.string().optional(),
        uid: o.z.string().optional(),
        entry: o.z
          .object({
            id: o.z.number().optional(),
            documentId: o.z.string().optional(),
            mint: o.z.string().optional(),
          })
          .optional(),
      }),
      response: o.z.object({ success: o.z.literal(!0) }),
    },
  });
};
