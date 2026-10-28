// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.vanityKeysRoutes = void 0));
  let o = e.r(876543);
  r.vanityKeysRoutes = (0, e.r(183184).defineRoutes)({
    "GET /vanity/random-mint-public-key": {
      summary: "Allocate a random vanity mint public key",
      response: o.z.object({
        pubkey: o.z.string().describe("Allocated vanity mint public key"),
      }),
    },
  });
};
