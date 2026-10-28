// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.changelogRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = o.z.object({
      url: o.z
        .string()
        .describe(
          "The card's art on the images CDN; 2:1, at least 1080x540 px. Never changes for an entry — new art is a new URL — so cache it on disk.",
        ),
      width: o.z.number().int().describe("Pixel width of the stored image."),
      height: o.z.number().int().describe("Pixel height of the stored image."),
      color: o.z
        .string()
        .describe(
          "Dominant colour as #rrggbb, sampled at upload, for the card's glow and the wash drawn while the art loads; empty when none was sampled — use a neutral shadow.",
        ),
      blurhash: o.z
        .string()
        .describe(
          "BlurHash (4x3 components) of the art, for the placeholder while it loads. Empty when the art predates it: draw a wash of color instead.",
        ),
    }),
    a = o.z.object({
      id: o.z
        .string()
        .describe(
          "Stable entry id, the dismissal key. Keep one dismissed set per wallet on the device: an edited entry keeps its id, a re-announcement is a new id.",
        ),
      image: s,
      title: o.z
        .string()
        .describe("English title drawn on the card; at most 40 characters."),
      titleTranslations: o.z
        .record(o.z.string(), o.z.string())
        .describe(
          'Localized titles keyed by lowercase app language code ("es", "pt", ...); pick the app language, fall back to `title`.',
        ),
      description: o.z
        .string()
        .describe(
          "English one-line description under the title; at most 80 characters, ellipsize the rest.",
        ),
      descriptionTranslations: o.z
        .record(o.z.string(), o.z.string())
        .describe(
          "Localized descriptions; same keying and fallback rule against `description`.",
        ),
      action: o.z.object({
        type: o.z.literal("deeplink"),
        url: o.z
          .string()
          .describe(
            "The pump:// deep link the card opens, routed like a push tap. Hide the entry when this build cannot route it.",
          ),
        spotlight: o.z
          .string()
          .nullable()
          .describe(
            "The control the app sparkles once the link lands, from the app's spotlight vocabulary (search.screener_settings, account.balance, account.achievements, account.rewards_tab, coin.chart_settings); null for none. Hide the entry when this build does not know the id: a new id ships with the build that has its control. Never set with an ?open= link.",
          ),
      }),
      featureFlag: o.z
        .string()
        .nullable()
        .describe(
          "A LaunchDarkly flag key this build evaluates itself: hide the entry while the flag is off or unknown. Null means unflagged. Platform and app-version targeting never appear here; they have already been applied.",
        ),
    });
  r.changelogRoutes = (0, n.defineRoutes)({
    "GET /changelog": {
      summary:
        "Get the live changelog entries for this client, already targeted by platform and app version",
      query: o.z.object({
        limit: o.z
          .number()
          .int()
          .min(1)
          .max(10)
          .optional()
          .describe("Most entries to return; defaults to 5."),
      }),
      response: o.z.object({
        entries: o.z
          .array(a)
          .describe(
            "The entries this caller should see, front card first (priority, then most recently started). Empty when nothing is live, the caller is not the app, or nothing targets this build — never a 404.",
          ),
      }),
    },
  });
};
