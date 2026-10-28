// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.walletScreeningRoutes = void 0));
  let o = e.r(876543);
  r.walletScreeningRoutes = (0, e.r(183184).defineRoutes)({
    "GET /check/{address}": {
      summary: "Screen a wallet address against the blocklist",
      params: o.z.object({
        address: o.z
          .string()
          .describe(
            "Solana base58 or EVM 0x, or a NEAR account id beside chain=near; the address is proxied in the caller original form",
          ),
      }),
      query: o.z.object({
        chain: o.z
          .enum(["near"])
          .optional()
          .describe(
            "near: screen the address as a NEAR account id, the chain claimed to compliance-service; served while uapiNearPositions is live, else a NEAR id is refused 400 and other addresses screen as without it. Omitted: the chain is auto-detected",
          ),
      }),
      response: o.z.object({
        statusCode: o.z
          .number()
          .int()
          .describe(
            "200 when the wallet is allowed, 405 when it is blocked; the response body carries it, the HTTP status stays 200",
          ),
        message: o.z.string(),
        address: o.z.string(),
      }),
    },
  });
};
