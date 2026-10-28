// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    n = e.i(63289),
    r = e.i(707138),
    i = e.i(466931),
    s = e.i(910222),
    o = e.i(460261),
    a = e.i(167156),
    l = e.i(431004),
    u = e.i(871544);
  let d = new Map(),
    c = new Map(),
    f = () => {
      if ("visible" === document.visibilityState)
        for (let e of Array.from(d.keys())) p(e, "visibility");
    },
    m = () => {
      "u" > typeof document &&
        (d.size > 0
          ? document.addEventListener("visibilitychange", f)
          : document.removeEventListener("visibilitychange", f));
    };
  function p(e, f) {
    if (!d.has(e)) return Promise.resolve();
    let p = c.get(e);
    if (p) return p;
    let _ = (async () => {
      try {
        let c = await (0, o.O)(e);
        if ("ok" !== c.kind || !u.A.has(c.data.status) || !d.has(e)) return;
        !(function (e, u, c) {
          var f, p, _, g;
          let h,
            v,
            y = d.get(e);
          if (!y) return;
          (clearTimeout(y.deadlineTimer),
            clearInterval(y.reconcileTimer),
            d.delete(e),
            m());
          let w = Date.now() - y.startedAt;
          (t.y.info("[relayRecoveryWatch] Relay swap recovered", {
            requestId: e,
            mint: y.context.mint,
            side: y.context.side,
            swap_status: u.status,
            failReason: u.failReason,
            via: c,
            watchedForMs: w,
          }),
            (0, i.B)({
              name: "relay-swap-recovered",
              feature: "trade",
              operation: y.context.side,
              context: {
                requestId: e,
                mint: y.context.mint,
                chainId: y.context.chainId,
                status: u.status,
                failReason: u.failReason ?? void 0,
                recoveredVia: c,
                watchedForMs: w,
              },
            }),
            (function (e, t) {
              let n = e.analytics;
              if (!n) return;
              let r = [
                ...n.originSignatures,
                ...(t.inTxHashes ?? []),
                ...(t.txHashes ?? []),
              ];
              "success" === t.status
                ? (0, a.A)({
                    ...n,
                    signatures: r,
                    settledAt: performance.now(),
                  })
                : (0, a.d)({
                    ...n,
                    error: new l.O(`Swap ${t.status}`, {
                      status: t.status,
                      failReason: t.failReason ?? void 0,
                      details: t.details,
                      executedViaApiService: n.executedViaApiService,
                    }),
                    signatures: r,
                  });
            })(y.context, u),
            (f = y.context),
            (h = "success" === (p = u).status || "refund" === p.status),
            f.convert
              ? (function ({ copy: e, t }, r) {
                  if ("success" === r)
                    return n.c.success((0, s.b)({ t, convert: e }));
                  let i = "refund" === r,
                    o = (0, s.V)({
                      t,
                      convert: e,
                      reason: t(
                        i
                          ? "web.trade.bridge_sell_refunded"
                          : "web.trade.bridge_failed",
                      ),
                    });
                  i
                    ? n.c.info(o.message, { description: o.description })
                    : n.c.error(o.message, { description: o.description });
                })(f.convert, p.status)
              : ((_ = f),
                (g = p.status),
                (v = _.coinSymbol.replace(/^\$/, "")),
                "success" === g
                  ? n.c.success(
                      "buy" === _.side
                        ? `Your ${v} order went through — the tokens are in your wallet`
                        : `Your ${v} sale went through — the funds are in your wallet`,
                    )
                  : "refund" === g
                    ? n.c.info(
                        "buy" === _.side
                          ? "Your transaction didn't go through — your funds were returned to your wallet"
                          : `Your ${v} sale didn't go through — your tokens are unchanged`,
                      )
                    : n.c.error(
                        "Your order didn't go through. Check your balance before trying again.",
                      )),
            h &&
              (f.queryClient.invalidateQueries({
                queryKey: (0, r.r)(
                  f.mint,
                  (0, o.b)(f.chainId),
                  f.evmWalletAddress,
                ),
              }),
              f.convert?.onSettled()));
        })(e, c.data, f);
      } finally {
        c.delete(e);
      }
    })();
    return (c.set(e, _), _);
  }
  e.s(
    [
      "f",
      0,
      function ({ requestId: e, context: r }) {
        if (d.has(e)) return;
        let o = setTimeout(() => {
            (async () => {
              await p(e, "deadline").catch(() => {});
              let o = d.get(e);
              if (o) {
                var l;
                let u;
                if (
                  (t.y.warn(
                    "[relayRecoveryWatch] Recovery watch expired without settlement",
                    {
                      requestId: e,
                      mint: o.context.mint,
                      side: o.context.side,
                      watchedForMs: Date.now() - o.startedAt,
                    },
                  ),
                  (0, i.B)({
                    name: "relay-recovery-watch-expired",
                    feature: "trade",
                    operation: r.side,
                    context: { requestId: e, mint: r.mint, chainId: r.chainId },
                  }),
                  r.analytics &&
                    (0, a.d)({
                      ...r.analytics,
                      error: Error(a.g),
                      signatures: r.analytics.originSignatures,
                    }),
                  r.convert)
                ) {
                  let { copy: e, t } = r.convert;
                  n.c.error((0, s.I)({ t, convert: e }), {
                    description: t("web.trade.bridge_expired"),
                  });
                } else
                  n.c.error(
                    "We couldn't confirm your order. Check your balance before submitting it again.",
                  );
                ((l = e),
                  (u = d.get(l)) &&
                    (clearTimeout(u.deadlineTimer),
                    clearInterval(u.reconcileTimer),
                    d.delete(l),
                    m()));
              }
            })();
          }, 6e5),
          l = setInterval(() => {
            p(e, "interval");
          }, 6e4);
        (d.set(e, {
          requestId: e,
          context: r,
          startedAt: Date.now(),
          deadlineTimer: o,
          reconcileTimer: l,
        }),
          m(),
          t.y.info("[relayRecoveryWatch] Recovery watch started", {
            requestId: e,
            mint: r.mint,
            side: r.side,
          }));
      },
    ],
    410318,
  );
  let _ = new Set(["SLIPPAGE", "TRANSACTION_REVERTED"]),
    g = (e) => {
      if ("string" != typeof e || 0 === e.length) return null;
      try {
        return BigInt(e);
      } catch {
        return null;
      }
    };
  e.s(
    [
      "B",
      0,
      {
        buy: "The price moved and your order didn't go through — nothing was spent. Try again at the current price.",
        sell: "The price moved and your order didn't go through — you still have your coins. Try again at the current price.",
      },
      "y",
      0,
      (e) => {
        if (!(e instanceof l.O) || "failure" !== e.status) return !1;
        let t = e.failReason;
        return "string" == typeof t && _.has(t);
      },
      "G",
      0,
      (e, t) => {
        let n = g(t);
        if (null === n || n === BigInt(0)) return !0;
        let r = g(e);
        return null !== r && r >= n;
      },
      "x",
      0,
      (e) => {
        let t = g(e);
        if (null !== t && t !== BigInt(0)) return e;
      },
    ],
    80126,
  );
};
