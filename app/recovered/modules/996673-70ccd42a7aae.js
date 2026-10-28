// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.natsAuthRoutes = void 0));
  let o = e.r(876543);
  r.natsAuthRoutes = (0, e.r(183184).defineRoutes)({
    "POST /nats/token": {
      summary:
        "Mint a 1h bearer user JWT for the CORE NATS cluster (SEC-1908 per-user auth), scoped by the auth-callout worker to the caller: dm.user.<uid>, followingFeed.user.<uid>, alertsFeed.user.<uid>.*, positions.<wallet> and account_balance_change.<wallet>.* for the session wallet plus the linked EVM wallet, and the public subject families. Present it as the CONNECT auth_token — nats.ws `authenticator: tokenAuthenticator(() => jwt)` — NOT jwtAuthenticator/`jwt`: nats-server runs in config mode and discards the CONNECT jwt field before the auth callout sees it (server/client.go processConnect), so a jwtAuthenticator connect is rejected as no_credentials. Bearer, no seed; re-mint at 50 min. Dark behind the server flag natsTokenMint: 404 NATS_AUTH_DISABLED while OFF or while no signing seed is configured. Any 4xx/5xx = keep using the static subscriber credentials for this connection.",
      response: o.z.object({
        jwt: o.z
          .string()
          .describe("ed25519-nkey bearer user JWT; opaque to the client"),
        expiresAt: o.z.number().describe("Unix seconds"),
        servers: o.z
          .string()
          .describe(
            "The CORE cluster websocket URL this token is for, e.g. wss://prod-v2.nats.realtime.pump.fun",
          ),
      }),
      emits: ["NATS_AUTH_DISABLED", "NATS_AUTH_USER_SCOPE_REQUIRED"],
    },
  });
};
