// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    r = e.i(63289),
    n = e.i(707138),
    i = e.i(466931),
    a = e.i(910222),
    o = e.i(460261),
    s = e.i(167156),
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
    let y = (async () => {
      try {
        let c = await (0, o.O)(e);
        if ("ok" !== c.kind || !u.A.has(c.data.status) || !d.has(e)) return;
        !(function (e, u, c) {
          var f, p, y, h;
          let g,
            v,
            w = d.get(e);
          if (!w) return;
          (clearTimeout(w.deadlineTimer),
            clearInterval(w.reconcileTimer),
            d.delete(e),
            m());
          let b = Date.now() - w.startedAt;
          (t.y.info("[relayRecoveryWatch] Relay swap recovered", {
            requestId: e,
            mint: w.context.mint,
            side: w.context.side,
            swap_status: u.status,
            failReason: u.failReason,
            via: c,
            watchedForMs: b,
          }),
            (0, i.B)({
              name: "relay-swap-recovered",
              feature: "trade",
              operation: w.context.side,
              context: {
                requestId: e,
                mint: w.context.mint,
                chainId: w.context.chainId,
                status: u.status,
                failReason: u.failReason ?? void 0,
                recoveredVia: c,
                watchedForMs: b,
              },
            }),
            (function (e, t) {
              let r = e.analytics;
              if (!r) return;
              let n = [
                ...r.originSignatures,
                ...(t.inTxHashes ?? []),
                ...(t.txHashes ?? []),
              ];
              "success" === t.status
                ? (0, s.A)({
                    ...r,
                    signatures: n,
                    settledAt: performance.now(),
                  })
                : (0, s.d)({
                    ...r,
                    error: new l.O(`Swap ${t.status}`, {
                      status: t.status,
                      failReason: t.failReason ?? void 0,
                      details: t.details,
                      executedViaApiService: r.executedViaApiService,
                    }),
                    signatures: n,
                  });
            })(w.context, u),
            (f = w.context),
            (g = "success" === (p = u).status || "refund" === p.status),
            f.convert
              ? (function ({ copy: e, t }, n) {
                  if ("success" === n)
                    return r.c.success((0, a.b)({ t, convert: e }));
                  let i = "refund" === n,
                    o = (0, a.V)({
                      t,
                      convert: e,
                      reason: t(
                        i
                          ? "web.trade.bridge_sell_refunded"
                          : "web.trade.bridge_failed",
                      ),
                    });
                  i
                    ? r.c.info(o.message, { description: o.description })
                    : r.c.error(o.message, { description: o.description });
                })(f.convert, p.status)
              : ((y = f),
                (h = p.status),
                (v = y.coinSymbol.replace(/^\$/, "")),
                "success" === h
                  ? r.c.success(
                      "buy" === y.side
                        ? `Your ${v} order went through — the tokens are in your wallet`
                        : `Your ${v} sale went through — the funds are in your wallet`,
                    )
                  : "refund" === h
                    ? r.c.info(
                        "buy" === y.side
                          ? "Your transaction didn't go through — your funds were returned to your wallet"
                          : `Your ${v} sale didn't go through — your tokens are unchanged`,
                      )
                    : r.c.error(
                        "Your order didn't go through. Check your balance before trying again.",
                      )),
            g &&
              (f.queryClient.invalidateQueries({
                queryKey: (0, n.r)(
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
    return (c.set(e, y), y);
  }
  e.s(
    [
      "f",
      0,
      function ({ requestId: e, context: n }) {
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
                    operation: n.side,
                    context: { requestId: e, mint: n.mint, chainId: n.chainId },
                  }),
                  n.analytics &&
                    (0, s.d)({
                      ...n.analytics,
                      error: Error(s.g),
                      signatures: n.analytics.originSignatures,
                    }),
                  n.convert)
                ) {
                  let { copy: e, t } = n.convert;
                  r.c.error((0, a.I)({ t, convert: e }), {
                    description: t("web.trade.bridge_expired"),
                  });
                } else
                  r.c.error(
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
          context: n,
          startedAt: Date.now(),
          deadlineTimer: o,
          reconcileTimer: l,
        }),
          m(),
          t.y.info("[relayRecoveryWatch] Recovery watch started", {
            requestId: e,
            mint: n.mint,
            side: n.side,
          }));
      },
    ],
    410318,
  );
  let y = new Set(["SLIPPAGE", "TRANSACTION_REVERTED"]),
    h = (e) => {
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
        return "string" == typeof t && y.has(t);
      },
      "G",
      0,
      (e, t) => {
        let r = h(t);
        if (null === r || r === BigInt(0)) return !0;
        let n = h(e);
        return null !== n && n >= r;
      },
      "x",
      0,
      (e) => {
        let t = h(e);
        if (null !== t && t !== BigInt(0)) return e;
      },
    ],
    80126,
  );
};
