// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.intercomRoutes = void 0));
  let o = e.r(876543);
  r.intercomRoutes = (0, e.r(183184).defineRoutes)({
    "GET /intercom/hmac": {
      summary:
        "Get the Intercom identity to boot with, and the HMAC minted over it",
      query: o.z.object({
        platform: o.z
          .enum(["mobile", "web"])
          .default("mobile")
          .describe("Client platform requesting the Intercom HMAC"),
        subject: o.z
          .enum(["auto"])
          .optional()
          .describe(
            "Opt into the v2 contract: the server picks the Intercom subject and echoes it as intercom_user_id. Absent = the v1 contract, whose HMAC is minted over the caller wallet",
          ),
      }),
      response: o.z.object({
        hmac_token: o.z
          .string()
          .optional()
          .describe(
            "Intercom identity-verification HMAC token, minted over exactly the intercom_user_id echoed alongside it; omitted together with it when the server has no identity to serve",
          ),
        intercom_user_id: o.z
          .string()
          .optional()
          .describe("The id the HMAC was minted over; send it verbatim"),
      }),
    },
  });
};
