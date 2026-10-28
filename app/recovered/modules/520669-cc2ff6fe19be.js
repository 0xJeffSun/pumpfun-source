// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(402030),
    n = e.i(514287),
    r = e.i(820984),
    i = e.i(758045),
    a = e.i(713643),
    o = e.i(759257);
  let s = n.z.number().nullable().catch(null),
    l = r.z.object({ sol: s, usd: s }).catch(() => ({ sol: null, usd: null })),
    u = t.contract["GET /portfolio-summary"].response.options[0]
      .pick({
        pnl: !0,
        realizedPnl: !0,
        unrealizedPnl: !0,
        percentage: !0,
        totalBuySpend: !0,
        tokenCount: !0,
        totalValueUsd: !0,
      })
      .extend({
        pnl: l,
        realizedPnl: l,
        unrealizedPnl: l,
        percentage: l,
        totalBuySpend: l,
        tokenCount: s,
        totalValueUsd: s,
      }),
    c = r.z.object({
      chain: i.z.string().catch(""),
      mint: i.z.string().min(1),
      amount: n.z.number(),
      priceUsd: n.z.number(),
      valueUsd: n.z.number().catch(0),
      marketCapUsd: n.z.number().nullable().catch(null),
      markUsd: n.z.number().nullable().catch(null).optional(),
    }),
    d = a.z
      .unknown()
      .optional()
      .transform((e) =>
        Array.isArray(e)
          ? e.flatMap((e) => {
              let t = c.safeParse(e);
              return t.success ? [t.data] : [];
            })
          : null,
      ),
    f = r.z.object({
      chain: i.z.string().catch(""),
      mint: i.z.string().min(1),
      reason: i.z.string(),
    }),
    h = r.z.object({
      asOf: s,
      unrepriced: a.z
        .unknown()
        .optional()
        .transform((e) =>
          Array.isArray(e)
            ? e.flatMap((e) => {
                let t = f.safeParse(e);
                return t.success ? [t.data] : [];
              })
            : [],
        ),
    }),
    p = r.z
      .object({
        holdings: d,
        computedAt: s,
        solPriceUsd: s,
        nativeBalanceSol: s,
        reprice: h.nullable().optional().catch(null),
        cache: r.z
          .object({ fresh: a.z.unknown() })
          .nullable()
          .optional()
          .catch(null),
      })
      .transform(({ cache: e, reprice: t, ...n }) => ({
        ...n,
        reprice: t ?? null,
        cacheFresh: e?.fresh === !0,
      })),
    m = {
      wallet: (e, t) => ["portfolioSummary", e, t],
      walletPrefix: (e) => ["portfolioSummary", e],
    },
    g = async ({ user: e, period: t, holdings: n = !1, fresh: r = !1 }) => {
      if (!n && !r) {
        let n = await (0, o.j)()("GET /portfolio-summary", {
          query: { user: e, period: t },
        });
        return u.parse(n);
      }
      let i = {
          user: e,
          period: t,
          ...(n ? { holdings: 1 } : {}),
          ...(r ? { fresh: 1 } : {}),
        },
        a = await (0, o.j)(r ? { credentials: "include" } : void 0)(
          "GET /portfolio-summary",
          { query: i },
        );
      return { ...u.parse(a), ...p.parse(a) };
    },
    y = async (e, t, n) => {
      let r = await g({ user: t, period: n, holdings: !0, fresh: !0 }),
        i = m.wallet(t, n);
      (await e.cancelQueries({ queryKey: i, exact: !0 }), e.setQueryData(i, r));
    };
  e.s(["g", 0, m, "v", 0, g, "f", 0, s, "s", 0, l, "H", 0, y]);
};
