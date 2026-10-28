// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.reportsRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = o.z.enum(["user", "coin", "callout", "reply"]),
    a = o.z.enum([
      "scam_or_impersonation",
      "illegal_content",
      "csam",
      "harassment_or_hate",
      "sexual_or_graphic",
      "self_harm",
      "spam",
      "other",
      "misleading_financial_claims",
    ]);
  r.reportsRoutes = (0, n.defineRoutes)({
    "POST /reports": {
      summary:
        'Report a coin, a user, a callout or a reply with one or more reasons (reason, or reasons which wins when both are sent). One report per reporter per target: a repeat returns the existing report with created=false. details is required when the reasons include "other" (max 1000 chars).',
      body: o.z
        .object({
          targetKind: s,
          targetId: o.z
            .string()
            .regex(/^\S{1,128}$/)
            .describe(
              "Coin mint, user id / wallet address, callout id or reply id.",
            ),
          reason: a
            .optional()
            .describe(
              "Single reason. At least one of reason / reasons is required (400 otherwise); reasons wins when both are sent.",
            ),
          reasons: o.z
            .array(a)
            .min(1)
            .max(9)
            .refine((e) => new Set(e).size === e.length, {
              message: "reasons must be unique",
            })
            .optional()
            .describe(
              "One or more distinct reasons; replaces reason when sent. At least one of reason / reasons is required (400 otherwise).",
            ),
          details: o.z
            .string()
            .max(1e3)
            .optional()
            .describe(
              'Free text; required (non-blank) when the effective reasons (reasons, else reason) include "other".',
            ),
        })
        .refine(({ reason: e, reasons: t }) => void 0 !== e || void 0 !== t, {
          path: ["reason"],
          message: "reason or reasons is required",
        })
        .refine(
          ({ reason: e, reasons: t, details: r }) =>
            !(t ?? [e]).includes("other") || (void 0 !== r && /\S/.test(r)),
          {
            path: ["details"],
            message: "details is required when the reasons include other",
          },
        ),
      response: o.z.object({ reportId: o.z.string(), created: o.z.boolean() }),
      emits: ["SELF_REPORT"],
    },
  });
};
