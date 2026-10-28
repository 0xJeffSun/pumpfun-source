// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(21617);
  e.s(
    [
      "f",
      0,
      (e, i) => {
        let n = Number.isFinite(e) && e >= 1 ? e : 1,
          r = t.p + i / 1e5;
        return (t.l * (1 + n * r)) / n;
      },
    ],
    225499,
  );
  var i = e.i(613677),
    n = e.i(342463),
    r = e.i(297865),
    s = e.i(637782);
  class o extends Error {
    status;
    reason;
    retryable;
    minimumUsd;
    constructor(e = {}) {
      (super(e.message ?? e.reason ?? "Hyperliquid perps request failed"),
        (this.name = "PerpApiError"),
        (this.status = e.status),
        (this.reason = e.reason),
        (this.retryable =
          e.retryable ??
          (void 0 === e.status || e.status >= 500 || 429 === e.status)),
        (this.minimumUsd = e.minimumUsd));
    }
  }
  let a = i.z.object({
    error: n.z.string().optional(),
    data: i.z
      .object({
        reason: n.z.string().optional(),
        retryable: r.z.boolean().optional(),
        minimum_usd: s.z.number().optional(),
      })
      .optional(),
  });
  e.s(
    [
      "b",
      0,
      o,
      "q",
      0,
      ({ error: e, fallbackMessage: t }) =>
        new o({ retryable: !0, message: e instanceof Error ? e.message : t }),
      "C",
      0,
      ({ status: e, body: t, fallbackMessage: i }) => {
        let n,
          r = a.safeParse(t),
          s = r.success ? r.data : void 0;
        return new o({
          status: e,
          reason: s?.data?.reason,
          retryable: s?.data?.retryable,
          minimumUsd:
            void 0 !== (n = s?.data?.minimum_usd) && Number.isFinite(n) && n > 0
              ? n
              : void 0,
          message: s?.error ?? `${i} (${e})`,
        });
      },
    ],
    577696,
  );
};
