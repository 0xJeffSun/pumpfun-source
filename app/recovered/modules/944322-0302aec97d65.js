// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(745018),
    r = e.i(63289),
    i = e.i(914139),
    s = e.i(506486),
    o = e.i(910222),
    a = e.i(605587),
    l = e.i(90832);
  async function u(e, n) {
    let {
      toastId: i,
      side: u,
      symbol: d,
      chainId: c,
      chainName: f,
      coin: m,
      tokenAmountUi: p,
      convert: _,
    } = e;
    (0, s.$)(m);
    let g = null != p && Number.isFinite(p) && p > 0 ? (0, l.p)(p) : void 0,
      h = (0, t.jsx)(s.X, {
        render: (e) =>
          (0, t.jsx)(t.Fragment, {
            children: _
              ? (0, o.I)({ t: e, convert: _ })
              : (0, o.s)({ t: e, side: u, symbol: d, amount: g }),
          }),
      });
    r.c.loading(h, { id: i });
    let v = setTimeout(() => {
      let e = f ?? (0, a.n)(c);
      r.c.loading(h, {
        id: i,
        description: (0, t.jsx)(s.X, {
          render: (n) =>
            (0, t.jsx)(t.Fragment, {
              children: (0, o.h)({ t: n, chainName: e }),
            }),
        }),
      });
    }, 3e3);
    try {
      return await n();
    } finally {
      clearTimeout(v);
    }
  }
  e.s(
    [
      "P",
      0,
      function ({
        type: e,
        symbol: a,
        mint: u,
        coin: d,
        tokenAmountUi: c,
        solAmountUi: f,
        settlementSymbol: m = "SOL",
        signature: p,
        replaceToastId: _,
        buyCalloutCta: g,
        convert: h,
      }) {
        void 0 !== _ && r.c.dismiss(_);
        let v = "buy" === e,
          y = (0, l.p)(c);
        r.c.custom(
          (c) =>
            (0, t.jsx)(s.X, {
              render: (_) =>
                (0, t.jsx)(s.O, {
                  tone: (0, s.R)(e),
                  side: e,
                  mint: u,
                  coin: d,
                  testId: "trade-success-toast",
                  ariaLabel: _("web.toasts.trade_confirmed_aria"),
                  onDismiss: () => r.c.dismiss(c),
                  glyph: (0, t.jsx)(n.y$, {}),
                  title: h
                    ? (0, o.b)({ t: _, convert: h })
                    : (0, o.o)({ t: _, side: e, amount: y, symbol: a }),
                  subtitle:
                    "USDC" === m
                      ? `${(0, l.p)(f, 2)} USDC`
                      : (0, t.jsx)(s.H, {
                          label: `${(0, l.m)(f)} SOL`,
                          solUi: f,
                        }),
                  durationMs: 6e3,
                  action:
                    v && g
                      ? (0, t.jsx)(i.f, { ...g, onActed: () => r.c.dismiss(c) })
                      : p
                        ? (0, t.jsx)(s.v, { signature: p })
                        : void 0,
                }),
            }),
          { duration: 6e3 },
        );
      },
      "S",
      0,
      u,
    ],
    944322,
  );
  var d = e.i(254667),
    c = e.i(324548),
    f = e.i(691542),
    m = e.i(486813);
  let p = 5e3,
    _ = 18e5,
    g = (e) => (e instanceof Error ? e.message : String(e));
  e.s(
    [
      "f",
      0,
      ({
        intentId: e,
        direction: t,
        payoutDenomination: n,
        onOutcome: r,
        intervalMs: i = p,
        timeoutMs: s = _,
      }) => {
        let o = new AbortController(),
          a = Date.now(),
          l = { intent_id: e, direction: t };
        return (
          (async () => {
            let u;
            try {
              u = (
                await (0, f.H)({
                  intentId: e,
                  direction: t,
                  payoutDenomination: n,
                  signal: o.signal,
                  settleFromEvent: !1,
                  intervalMs: i,
                  timeoutMs: s,
                })
              ).intent;
            } catch (t) {
              if (o.signal.aborted)
                return void d.y.info(
                  "[bridgePendingWatch] bridge_intent_watch_cancelled",
                  { ...l, watched_for_ms: Date.now() - a },
                );
              if (t instanceof f.F) {
                let e = {
                  ...l,
                  last_status: t.lastStatus ?? null,
                  watched_for_ms: Date.now() - a,
                };
                (d.y.warn(
                  "[bridgePendingWatch] bridge_intent_watch_expired",
                  e,
                ),
                  (0, m.f)({
                    error: t,
                    operation: "pending-watch-expired",
                    context: e,
                  }));
                return;
              }
              let e = { ...l, error: g(t), watched_for_ms: Date.now() - a };
              (d.y.error("[bridgePendingWatch] bridge_intent_watch_failed", e),
                (0, m.f)({
                  error: t,
                  operation: "pending-watch-failed",
                  context: e,
                }));
              return;
            }
            d.y.info("[bridgePendingWatch] bridge_intent_recovered", {
              ...l,
              intent_status: u.status,
              fail_reason: u.fail_reason ?? null,
              watched_for_ms: Date.now() - a,
            });
            try {
              r({ outcome: (0, c.Z)(u), intent: u });
            } catch (e) {
              d.y.error("[bridgePendingWatch] on_outcome_failed", {
                ...l,
                intent_status: u.status,
                error: g(e),
              });
            }
          })(),
          () => o.abort()
        );
      },
    ],
    553942,
  );
  var h = e.i(357500),
    v = e.i(584229),
    y = e.i(595673),
    w = e.i(374589),
    b = e.i(84976);
  class I extends Error {
    status;
    failReason;
    details;
    executedViaApiService;
    signatures;
    constructor(e, t) {
      (super(e),
        (this.name = "SettlementFailureError"),
        (this.status = t.status),
        (this.failReason = t.failReason),
        (this.details = t.details),
        (this.executedViaApiService = t.executedViaApiService),
        (this.signatures = t.signatures));
    }
  }
  e.s(
    [
      "P",
      0,
      class extends Error {
        requestId;
        constructor(e) {
          (super(
            "Your order is still processing — no need to submit it again. We'll update you when it settles.",
          ),
            (this.name = "RelayConfirmationPendingError"),
            (this.requestId = e));
        }
      },
      "O",
      0,
      I,
      "s",
      0,
      (e) =>
        e instanceof I
          ? {
              settlementStatus: e.status,
              ...(e.failReason && { settlementFailReason: e.failReason }),
              ...(e.details && { settlementDetails: e.details }),
              ...(void 0 !== e.executedViaApiService && {
                transactionsViaApiService: e.executedViaApiService,
              }),
            }
          : {},
      "w",
      0,
      ({
        settlement: e,
        direction: t,
        executedViaApiService: n,
        signatures: r,
        messageOverride: i,
        t: s,
      }) => {
        let o = e.failReason ?? void 0,
          a = e.details,
          l = {
            status: e.status,
            failReason: o,
            details: a,
            executedViaApiService: n,
            signatures: r,
          };
        if (i) return new I(i, l);
        if ("SLIPPAGE" === o)
          return new I(
            s(
              "buy" === t
                ? "web.trade.relay_settlement_slippage_buy"
                : "web.trade.relay_settlement_slippage_sell",
            ),
            l,
          );
        let u = o ?? a;
        return new I(`Swap ${e.status}${u ? ` (${u})` : ""}`, l);
      },
    ],
    431004,
  );
  let k = "relay",
    x = (e) =>
      e
        ? {
            venue: "bridge",
            intent_id: e.intentId,
            settle_from: e.settledFrom,
            settle_wait_ms: e.settleWaitMs,
            settle_polls: e.polls,
            settle_pushes: e.pushes,
            socket_open_ms: e.socketOpenMs,
            funding: e.funding,
            quote_source: e.quoteSource,
            async_quote: e.asyncQuote,
            presigned: e.presigned,
            presign_age_ms: e.presignAgeMs,
            presign_lane: e.presignLane,
          }
        : void 0;
  function S(e) {
    let t = (0, a.w)(e);
    if (t && /^\d+$/.test(t)) {
      let e = (0, h.findChainByEvmChainId)(Number(t));
      if (e) return e.slug;
    }
    return e;
  }
  function A({ atomicAmount: e, solanaAsset: t }) {
    let n = t ?? "sol",
      r = Number(e) / 10 ** (0, b.q)(n);
    return "usdc" === n ? { solAmount: 0, usdAmount: r } : { solAmount: r };
  }
  function E(e) {
    if (e instanceof I)
      return e.failReason
        ? `settlement_${e.status}:${e.failReason}`
        : `settlement_${e.status}`;
    if (e instanceof Error) {
      let { reason: t, code: n } = e;
      return "string" == typeof t && t.length > 0
        ? t
        : "string" == typeof n && n.length > 0
          ? n
          : e.message || "Unknown error";
    }
    return "Unknown error";
  }
  let R = (e) =>
      Array.from(
        new Set(e.filter((e) => "string" == typeof e && e.length > 0)),
      ),
    M = (e, t) => (void 0 === e ? void 0 : Math.max(0, Math.round(t - e))),
    P = (e, t) => {
      try {
        t();
      } catch (t) {
        d.y.warn("[relayTradeAnalytics] failed to record event", {
          event: e,
          error: t instanceof Error ? t.message : String(t),
        });
      }
    };
  e.s(
    [
      "$",
      0,
      "internal_bridge",
      "g",
      0,
      "relay_recovery_watch_expired",
      "H",
      0,
      A,
      "h",
      0,
      E,
      "s",
      0,
      function (e, t) {
        if (e && (0, a.I)(e.mint, t))
          return {
            absolutePosition: e.impression.itemPosition,
            recommendationId: e.impression.rec_id,
            recommendationRank: e.impression.recommendationRank,
            calloutId: e.impression.calloutId,
            isPinned: (0, w.f)(e.impression.sourceElement, e.impression.rec_id),
          };
      },
      "d",
      0,
      function ({
        quoteRequest: e,
        analytics: t,
        error: n,
        executedViaApiService: r,
        signatures: i,
        rum: s,
        provider: o = k,
        bridge: a,
      }) {
        let l = x(a);
        P("codeSwapError", () =>
          (0, y.Sd)({
            rum: {
              error: n,
              ...s,
              ...(l ? { context: { ...l, ...s?.context } } : {}),
            },
            tradeDirection: e.direction,
            mint: e.mint,
            chainId: S(e.chainId),
            error: (0, v.S)(n) ? v.k : E(n),
            errorCode: (0, v.N)(n),
            signatures: R(i ?? []),
            provider: o,
            slippage: String(e.slippageBps / 100),
            blockchainStore: "buy" === e.direction,
            transactionsViaApiService: r,
            screen: t?.screen,
            sourceElement: t?.sourceElement,
          }),
        );
      },
      "A",
      0,
      function ({
        quoteRequest: e,
        analytics: t,
        tokenAmount: n,
        settlementLeg: r,
        signatures: i,
        executedViaApiService: s,
        timing: o,
        settledAt: a,
        provider: l = k,
        bridge: u,
        attribution: c,
      }) {
        let f = "buy" === e.direction,
          m = o && void 0 !== a ? M(o.signedAt, a) : void 0,
          p = o && void 0 !== a ? M(o.startedAt, a) : void 0;
        (u &&
          d.y.info("[relayTradeAnalytics] bridge_swap_success", {
            ...x(u),
            provider: l,
            direction: e.direction,
            mint: e.mint,
            chain_id: S(e.chainId),
            time_to_confirm_ms: m,
            time_to_confirm_end_to_end_ms: p,
          }),
          P("codeSwapSuccess", () =>
            (0, y.V9)({
              tradeDirection: e.direction,
              mint: e.mint,
              chainId: S(e.chainId),
              solAmount: r.solAmount,
              usdAmount: r.usdAmount,
              tokenAmount: n,
              signatures: R(i),
              provider: l,
              isLivestreamActive: t?.isLivestreamActive ?? void 0,
              blockchainStore: f,
              transactionsViaApiService: s,
              timeToConfirm: m,
              timeToConfirmEndToEnd: p,
              screen: t?.screen,
              sourceElement: t?.sourceElement,
              recommendationId: c?.recommendationId,
              recommendationRank: c?.recommendationRank,
              absolutePosition: c?.absolutePosition,
              signals:
                o && void 0 !== a
                  ? {
                      durationMs: p,
                      quoteAgeMs: M(o.quotedAt, a),
                      timeToConfirmMs: m,
                      timeToBuildMs:
                        void 0 === o.quotedAt
                          ? void 0
                          : M(o.startedAt, o.quotedAt),
                    }
                  : void 0,
            }),
          ));
      },
      "f",
      0,
      function ({ quoteRequest: e, analytics: t, attribution: n }) {
        let r = "buy" === e.direction,
          i = r ? A(e) : void 0,
          s =
            r || t?.tokenDecimals === void 0
              ? void 0
              : Number(e.atomicAmount) / 10 ** t.tokenDecimals;
        P("interactTradeCoin", () =>
          (0, y.u_)({
            mint: e.mint,
            tradeDirection: e.direction,
            solAmount: i && void 0 === i.usdAmount ? i.solAmount : void 0,
            usdAmount: i?.usdAmount,
            tokenAmount: s,
            usdMarketCap: t?.usdMarketCap ?? void 0,
            isLivestreamActive: t?.isLivestreamActive ?? void 0,
            absolutePosition: n?.absolutePosition,
            recommendationId: n?.recommendationId,
            recommendationRank: n?.recommendationRank,
            isPinned: n?.isPinned,
            calloutId: n?.calloutId,
            screen: t?.screen,
            sourceElement: t?.sourceElement,
          }),
        );
      },
    ],
    167156,
  );
};
