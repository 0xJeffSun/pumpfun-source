// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(812768),
    n = e.i(820984),
    r = e.i(955871),
    i = e.i(415809),
    l = e.i(514287),
    a = e.i(759257);
  let s = async (e) => {
      try {
        let t = await e.clone().json();
        return (
          "object" == typeof t &&
          null !== t &&
          "status" in t &&
          "computing" === t.status
        );
      } catch {
        return !1;
      }
    },
    o = {
      limit: 3,
      methods: ["get"],
      statusCodes: [502, 503],
      afterStatusCodes: [503],
      maxRetryAfter: 15e3,
      shouldRetry: async ({ error: e, retryCount: n }) =>
        e instanceof t.f && 503 === e.response.status
          ? !!(n <= 3 && (await s(e.response))) && void 0
          : n <= 1 && void 0,
    },
    u = n.z
      .object({
        period: r.z.enum(["1d", "1w", "1m", "all"]),
        points: i.z.array(
          n.z.object({ time: l.z.number(), value: l.z.number() }),
        ),
      })
      .passthrough(),
    c = async ({ user: e, period: t, signal: n }) => {
      let r = await (0, a.j)({ timeout: 3e4, retry: o, signal: n })(
        "GET /portfolio-summary/chart",
        { query: { user: e, period: t } },
      );
      return (u.parse(r), r);
    };
  e.s([
    "f",
    0,
    {
      wallet: (e, t) => ["portfolioChart", e, t],
      walletPrefix: (e) => ["portfolioChart", e],
    },
    "z",
    0,
    c,
  ]);
};
