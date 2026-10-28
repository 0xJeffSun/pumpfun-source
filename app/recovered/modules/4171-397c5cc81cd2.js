// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.contractErrorBody =
      r.userRateLimitError =
      r.nestError =
      r.errorEnvelope =
        void 0));
  let o = e.r(876543);
  ((r.errorEnvelope = o.z.object({
    statusCode: o.z.number().int(),
    timestamp: o.z.string(),
    path: o.z.string(),
  })),
    (r.nestError = (e) =>
      o.z.object({
        error: o.z.literal(e),
        message: o.z.union([o.z.string(), o.z.array(o.z.string())]),
      })),
    (r.userRateLimitError = o.z.object({
      statusCode: o.z.literal(429),
      message: o.z.string(),
      retryAfterMs: o.z.number(),
    })),
    (r.contractErrorBody = o.z
      .object({
        statusCode: o.z.number().int(),
        timestamp: o.z.string().optional(),
        path: o.z.string().optional(),
        error: o.z
          .string()
          .optional()
          .describe(
            "A Nest reason phrase, or a registry code when it matches ERROR_CODE_PATTERN",
          ),
        message: o.z.union([o.z.string(), o.z.array(o.z.string())]).optional(),
      })
      .describe(
        "Every field but statusCode is optional: the shape a client gets for an undeclared status, an unknown code, or a body no declared arm parses",
      )));
};
