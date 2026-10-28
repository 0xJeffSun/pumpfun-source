// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.achievementsRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(785036),
    a = o.z.object({
      id: o.z
        .string()
        .describe(
          "Stable catalog slug; doubles as the artwork path segment and the client i18n key.",
        ),
      family: o.z
        .string()
        .describe(
          "Track family. An open string, not an enum: clients must render an unrecognised family from display data alone, in a generic bucket.",
        ),
      tier: o.z
        .number()
        .describe(
          "1-based tier within the family's track; 0 for untiered badges.",
        ),
      name: o.z.string(),
      description: o.z.string(),
      imageUrl: o.z
        .string()
        .describe(
          "Absolute badge artwork URL. An unresolvable artwork renders a placeholder, never a hidden badge.",
        ),
      hiddenUntilEarned: o.z
        .boolean()
        .describe(
          "Hidden from catalog browsing until the viewer has earned it.",
        ),
      metric: o.z
        .string()
        .nullable()
        .describe(
          "Metric slug this achievement is evaluated on; null for rules that are not a single-metric threshold.",
        ),
      threshold: o.z
        .number()
        .nullable()
        .describe(
          "Display-only unlock threshold in the metric's own unit; null for non-threshold rules. The server-side rule stays authoritative.",
        ),
      sortOrder: o.z
        .number()
        .describe(
          "Position in the profile badge row and catalog listings (ascending).",
        ),
    });
  r.achievementsRoutes = (0, n.defineRoutes)({
    "GET /achievements/catalog": {
      summary: "The full achievement catalog: definitions and display metadata",
      response: o.z.object({
        catalogVersion: o.z
          .string()
          .describe(
            "Content hash of the compiled catalog; changes only on deploy. Empty when the catalog could not be reached and no snapshot was retained.",
          ),
        achievements: o.z
          .array(a)
          .describe(
            "All non-retired achievement definitions, in catalog sort order.",
          ),
      }),
    },
    "POST /achievements/overlays": (0, s.publicRead)("profiles.read", {
      summary: "Top badge ids for a batch of avatars",
      body: o.z.object({
        ids: o.z
          .array(o.z.string().max(64))
          .min(1)
          .max(100)
          .describe(
            "Wallet addresses (Solana base58 or EVM 0x) or user ids (UUID), disambiguated by format.",
          ),
      }),
      response: o.z
        .record(o.z.string(), o.z.array(o.z.string()))
        .describe(
          "Map of the requested id (wallet or user id) to its badge ids; ids with no unlocks are an empty array.",
        ),
    }),
  });
};
