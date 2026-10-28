// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.calloutTranslationRoutes = void 0));
  let o = e.r(876543);
  r.calloutTranslationRoutes = (0, e.r(183184).defineRoutes)({
    "GET /callouts/{calloutId}/translation": {
      summary: "Translate a callout's content into the caller's locale",
      params: o.z.object({ calloutId: o.z.string() }),
      query: o.z.object({
        locale: o.z
          .string()
          .max(64)
          .optional()
          .describe(
            'Bare catalog code from the 36-locale allowlist ("no" aliased to "nb"); absent falls back to the Accept-Language header',
          ),
      }),
      response: o.z.object({
        translatedContent: o.z
          .string()
          .describe(
            "The callout content in the resolved locale (unchanged when the source is already in it)",
          ),
        sourceLocale: o.z
          .string()
          .optional()
          .describe(
            "Detected source language, when the translator reports one; omitted otherwise",
          ),
        cached: o.z
          .boolean()
          .describe(
            "True = served from cc's cache (warm); false = this request translated (cold, 1-3s)",
          ),
        contentHash: o.z
          .string()
          .describe(
            "Hash of the source content — stable until the callout is edited",
          ),
      }),
    },
  });
};
