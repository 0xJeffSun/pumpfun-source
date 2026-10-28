// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.appBannerRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = o.z.object({
      id: o.z
        .string()
        .describe(
          "Per-incident dismissal key. Clients persist one dismissal per id on the device: a new id re-surfaces the banner for users who dismissed the previous one.",
        ),
      title: o.z
        .string()
        .describe(
          "Optional short headline for the collapsed strip; empty means none — show `message` in its place.",
        ),
      message: o.z
        .string()
        .describe(
          "The full text and the untranslated fallback, revealed on expansion. Never empty while a banner is live.",
        ),
      titleTranslations: o.z
        .record(o.z.string(), o.z.string())
        .describe(
          'Localized titles keyed by lowercase app language code ("es", "pt", ...); pick the app language, fall back to `title`.',
        ),
      messageTranslations: o.z
        .record(o.z.string(), o.z.string())
        .describe(
          "Localized messages keyed by lowercase app language code; same fallback rule against `message`. This is the LaunchDarkly payload's `translations`.",
        ),
      severity: o.z
        .enum(["red", "yellow", "grey"])
        .describe("Warning-icon colour; treat anything unrecognized as grey."),
    });
  r.appBannerRoutes = (0, n.defineRoutes)({
    "GET /app-banner": {
      summary: "Get the in-app announcement banner, if one is live",
      response: o.z.object({
        banner: s
          .nullable()
          .describe(
            "The live banner, or null when nothing should show — the steady state.",
          ),
      }),
    },
  });
};
