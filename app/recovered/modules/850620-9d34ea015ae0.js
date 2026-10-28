// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.profilesRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(785036),
    a = e.r(890664),
    i = o.z.object({
      ids: o.z
        .array(o.z.string().max(64))
        .min(1)
        .max(200)
        .describe(
          "Wallet addresses (Solana base58 or EVM 0x) or user ids (UUID), disambiguated by format.",
        ),
    });
  r.profilesRoutes = (0, n.defineRoutes)({
    "POST /profiles/verified": (0, s.publicRead)("profiles.read", {
      summary:
        "Verified (KOL/influencer badge) status for a list of wallets or user ids",
      body: i,
      response: o.z
        .record(o.z.string(), o.z.boolean())
        .describe(
          "Requested id -> whether the verified checkmark renders (isVerified AND verifiedBadgeVisible); ids with no user, and verified users whose badge an admin hid, are false",
        ),
    }),
    "POST /profiles/generated-media": (0, s.publicRead)("profiles.read", {
      summary:
        "Verified badge plus generated share media (PnL loop, replay intro) for a list of wallets or user ids",
      body: i,
      response: o.z.record(
        o.z.string(),
        o.z
          .object({
            isVerified: o.z.boolean(),
            verifiedBadgeVisible: o.z
              .boolean()
              .describe(
                "Badge rendering hint beside isVerified: show the checkmark only when both are true; true for ids with no user",
              ),
            unseen: o.z
              .boolean()
              .optional()
              .describe(
                "Owner-only: present on the authenticated caller's own entry when it carries media; true until POST /profiles/generated-media/seen acknowledges it. Absent on every other entry.",
              ),
          })
          .extend(a.normalizedGeneratedMedia.partial().shape),
      ),
    }),
    "POST /profiles/generated-media/seen": {
      summary:
        "Acknowledge the caller's generated media (clears `unseen` on their own generated-media entry). Once per row: idempotent, and a later re-render of the same holder does not re-arm it.",
      response: o.z.object({
        marked: o.z
          .boolean()
          .describe(
            "True when this call acknowledged the clip; false when it already was, is not ready yet, or the caller has no generated media.",
          ),
      }),
    },
    "GET /profiles/verified": (0, s.publicRead)("profiles.read", {
      summary:
        "The ten top daily PnL leaders (the onboarding follow suggestions)",
      response: o.z.array(a.normalizedProfile),
    }),
  });
};
