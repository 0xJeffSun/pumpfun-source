// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(745018),
    i = e.i(63289),
    r = e.i(914139),
    s = e.i(506486),
    o = e.i(910222),
    a = e.i(605587),
    l = e.i(90832);
  async function d(e, n) {
    let {
      toastId: r,
      side: d,
      symbol: u,
      chainId: c,
      chainName: _,
      coin: m,
      tokenAmountUi: p,
      convert: f,
    } = e;
    (0, s.$)(m);
    let g = null != p && Number.isFinite(p) && p > 0 ? (0, l.p)(p) : void 0,
      y = (0, t.jsx)(s.X, {
        render: (e) =>
          (0, t.jsx)(t.Fragment, {
            children: f
              ? (0, o.I)({ t: e, convert: f })
              : (0, o.s)({ t: e, side: d, symbol: u, amount: g }),
          }),
      });
    i.c.loading(y, { id: r });
    let h = setTimeout(() => {
      let e = _ ?? (0, a.n)(c);
      i.c.loading(y, {
        id: r,
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
      clearTimeout(h);
    }
  }
  e.s(
    [
      "P",
      0,
      function ({
        type: e,
        symbol: a,
        mint: d,
        coin: u,
        tokenAmountUi: c,
        solAmountUi: _,
        settlementSymbol: m = "SOL",
        signature: p,
        replaceToastId: f,
        buyCalloutCta: g,
        convert: y,
      }) {
        void 0 !== f && i.c.dismiss(f);
        let h = "buy" === e,
          v = (0, l.p)(c);
        i.c.custom(
          (c) =>
            (0, t.jsx)(s.X, {
              render: (f) =>
                (0, t.jsx)(s.O, {
                  tone: (0, s.R)(e),
                  side: e,
                  mint: d,
                  coin: u,
                  testId: "trade-success-toast",
                  ariaLabel: f("web.toasts.trade_confirmed_aria"),
                  onDismiss: () => i.c.dismiss(c),
                  glyph: (0, t.jsx)(n.y$, {}),
                  title: y
                    ? (0, o.b)({ t: f, convert: y })
                    : (0, o.o)({ t: f, side: e, amount: v, symbol: a }),
                  subtitle:
                    "USDC" === m
                      ? `${(0, l.p)(_, 2)} USDC`
                      : (0, t.jsx)(s.H, {
                          label: `${(0, l.m)(_)} SOL`,
                          solUi: _,
                        }),
                  durationMs: 6e3,
                  action:
                    h && g
                      ? (0, t.jsx)(r.f, { ...g, onActed: () => i.c.dismiss(c) })
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
      d,
    ],
    944322,
  );
  var u = e.i(254667),
    c = e.i(324548),
    _ = e.i(691542),
    m = e.i(486813);
  let p = 5e3,
    f = 18e5,
    g = (e) => (e instanceof Error ? e.message : String(e));
  e.s(
    [
      "f",
      0,
      ({
        intentId: e,
        direction: t,
        payoutDenomination: n,
        onOutcome: i,
        intervalMs: r = p,
        timeoutMs: s = f,
      }) => {
        let o = new AbortController(),
          a = Date.now(),
          l = { intent_id: e, direction: t };
        return (
          (async () => {
            let d;
            try {
              d = (
                await (0, _.H)({
                  intentId: e,
                  direction: t,
                  payoutDenomination: n,
                  signal: o.signal,
                  settleFromEvent: !1,
                  intervalMs: r,
                  timeoutMs: s,
                })
              ).intent;
            } catch (t) {
              if (o.signal.aborted)
                return void u.y.info(
                  "[bridgePendingWatch] bridge_intent_watch_cancelled",
                  { ...l, watched_for_ms: Date.now() - a },
                );
              if (t instanceof _.F) {
                let e = {
                  ...l,
                  last_status: t.lastStatus ?? null,
                  watched_for_ms: Date.now() - a,
                };
                (u.y.warn(
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
              (u.y.error("[bridgePendingWatch] bridge_intent_watch_failed", e),
                (0, m.f)({
                  error: t,
                  operation: "pending-watch-failed",
                  context: e,
                }));
              return;
            }
            u.y.info("[bridgePendingWatch] bridge_intent_recovered", {
              ...l,
              intent_status: d.status,
              fail_reason: d.fail_reason ?? null,
              watched_for_ms: Date.now() - a,
            });
            try {
              i({ outcome: (0, c.Z)(d), intent: d });
            } catch (e) {
              u.y.error("[bridgePendingWatch] on_outcome_failed", {
                ...l,
                intent_status: d.status,
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
  var y = e.i(357500),
    h = e.i(584229),
    v = e.i(595673),
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
        signatures: i,
        messageOverride: r,
        t: s,
      }) => {
        let o = e.failReason ?? void 0,
          a = e.details,
          l = {
            status: e.status,
            failReason: o,
            details: a,
            executedViaApiService: n,
            signatures: i,
          };
        if (r) return new I(r, l);
        if ("SLIPPAGE" === o)
          return new I(
            s(
              "buy" === t
                ? "web.trade.relay_settlement_slippage_buy"
                : "web.trade.relay_settlement_slippage_sell",
            ),
            l,
          );
        let d = o ?? a;
        return new I(`Swap ${e.status}${d ? ` (${d})` : ""}`, l);
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
      let e = (0, y.findChainByEvmChainId)(Number(t));
      if (e) return e.slug;
    }
    return e;
  }
  function A({ atomicAmount: e, solanaAsset: t }) {
    let n = t ?? "sol",
      i = Number(e) / 10 ** (0, b.q)(n);
    return "usdc" === n ? { solAmount: 0, usdAmount: i } : { solAmount: i };
  }
  function P(e) {
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
  let E = (e) =>
      Array.from(
        new Set(e.filter((e) => "string" == typeof e && e.length > 0)),
      ),
    B = (e, t) => (void 0 === e ? void 0 : Math.max(0, Math.round(t - e))),
    F = (e, t) => {
      try {
        t();
      } catch (t) {
        u.y.warn("[relayTradeAnalytics] failed to record event", {
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
      P,
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
        executedViaApiService: i,
        signatures: r,
        rum: s,
        provider: o = k,
        bridge: a,
      }) {
        let l = x(a);
        F("codeSwapError", () =>
          (0, v.Sd)({
            rum: {
              error: n,
              ...s,
              ...(l ? { context: { ...l, ...s?.context } } : {}),
            },
            tradeDirection: e.direction,
            mint: e.mint,
            chainId: S(e.chainId),
            error: (0, h.S)(n) ? h.k : P(n),
            errorCode: (0, h.N)(n),
            signatures: E(r ?? []),
            provider: o,
            slippage: String(e.slippageBps / 100),
            blockchainStore: "buy" === e.direction,
            transactionsViaApiService: i,
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
        settlementLeg: i,
        signatures: r,
        executedViaApiService: s,
        timing: o,
        settledAt: a,
        provider: l = k,
        bridge: d,
        attribution: c,
      }) {
        let _ = "buy" === e.direction,
          m = o && void 0 !== a ? B(o.signedAt, a) : void 0,
          p = o && void 0 !== a ? B(o.startedAt, a) : void 0;
        (d &&
          u.y.info("[relayTradeAnalytics] bridge_swap_success", {
            ...x(d),
            provider: l,
            direction: e.direction,
            mint: e.mint,
            chain_id: S(e.chainId),
            time_to_confirm_ms: m,
            time_to_confirm_end_to_end_ms: p,
          }),
          F("codeSwapSuccess", () =>
            (0, v.V9)({
              tradeDirection: e.direction,
              mint: e.mint,
              chainId: S(e.chainId),
              solAmount: i.solAmount,
              usdAmount: i.usdAmount,
              tokenAmount: n,
              signatures: E(r),
              provider: l,
              isLivestreamActive: t?.isLivestreamActive ?? void 0,
              blockchainStore: _,
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
                      quoteAgeMs: B(o.quotedAt, a),
                      timeToConfirmMs: m,
                      timeToBuildMs:
                        void 0 === o.quotedAt
                          ? void 0
                          : B(o.startedAt, o.quotedAt),
                    }
                  : void 0,
            }),
          ));
      },
      "f",
      0,
      function ({ quoteRequest: e, analytics: t, attribution: n }) {
        let i = "buy" === e.direction,
          r = i ? A(e) : void 0,
          s =
            i || t?.tokenDecimals === void 0
              ? void 0
              : Number(e.atomicAmount) / 10 ** t.tokenDecimals;
        F("interactTradeCoin", () =>
          (0, v.u_)({
            mint: e.mint,
            tradeDirection: e.direction,
            solAmount: r && void 0 === r.usdAmount ? r.solAmount : void 0,
            usdAmount: r?.usdAmount,
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
