// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    i = e.i(584229),
    n = e.i(139271);
  let r = 75,
    s = ["template_expired", "order_rejected", "hl_rejected"],
    o = ({
      solanaWallet: e,
      evmWallet: t,
      coin: i,
      sizeCoins: n,
      side: r,
      slippageBps: s,
      withdrawOut: o,
    }) =>
      JSON.stringify([
        e,
        t.toLowerCase(),
        i,
        String(Number(n)),
        r,
        s ?? null,
        o ?? null,
      ]),
    a = new Map(),
    l = 0,
    u = (e) => {
      for (let t of a.values()) if (t.key === e) return t;
      return null;
    },
    d = (e, t = Date.now()) => t - e.builtAt > 6e4,
    c = (e, t, i = r) =>
      null !== e.markPx &&
      e.markPx > 0 &&
      null != t &&
      t > 0 &&
      1e4 * Math.abs(t / e.markPx - 1) > i,
    p = (e, { sizeCoins: t, markPx: i, now: n = Date.now() }) => {
      if (0 === a.size) return { miss: "none" };
      let r = u(e);
      return null === r ||
        (void 0 !== r.positionSize &&
          String(Number(r.positionSize)) !== String(Number(t)))
        ? { miss: "key" }
        : r.consumed
          ? { miss: "consumed" }
          : d(r, n)
            ? { miss: "stale" }
            : c(r, i)
              ? { miss: "price" }
              : ((r.consumed = !0), { hit: r });
    };
  e.s(
    [
      "q",
      0,
      s,
      "_",
      0,
      1e3,
      "X",
      0,
      () => l,
      "$",
      0,
      u,
      "p",
      0,
      o,
      "i",
      0,
      c,
      "c",
      0,
      d,
      "U",
      0,
      p,
      "A",
      0,
      () => {
        ((l += 1), a.clear());
      },
      "O",
      0,
      (e) => {
        e.epoch === l && a.set(e.coin, e);
      },
    ],
    155630,
  );
  var m = e.i(118245),
    f = e.i(923427);
  let h = "perp_close",
    w = (e, t) => {
      let i = (0, f.M)(e, t);
      return { key: t, releaseKey: i, resumeLoops: (0, f.U)() };
    },
    g = (e, t, i) => (0, f.w)(e, t, i);
  e.s(["T", 0, h, "U", 0, "perp_open", "f", 0, g, "z", 0, w], 816213);
  var _ = e.i(751228),
    y = e.i(577696),
    v = e.i(239867),
    k = e.i(835436),
    b = e.i(967936),
    S = e.i(931464);
  let P = new Set(["set_referrer", "open_fallback"]),
    x = (e) => P.has(e),
    R = (e) =>
      e.actions
        .filter((e) => "ready" === e.status)
        .map((e) => ({
          kind: e.kind,
          typedData: e.typedData,
          template: e.template,
        })),
    A = ({ sent: e, tradeError: i }) => {
      let n = e.results.find(
        (e) => "set_referrer" === e.kind && "error" === e.status,
      );
      n &&
        t.y.warn("[perpActionBatch] referrer_refused", {
          reason: n.error?.reason,
          message: n.error?.message,
        });
      let r = e.results.find(
        (e) => "open_fallback" === e.kind && "error" === e.status,
      );
      r &&
        t.y.info("[perpActionBatch] fallback_copy_refused", {
          reason: r.error?.reason,
          message: r.error?.message,
        });
      let s = e.results.find((e) => "error" === e.status && !x(e.kind)),
        o = e.results.find((e) => "skipped" === e.status && !x(e.kind)),
        a =
          s ??
          (o
            ? {
                ...o,
                status: "error",
                error: {
                  reason: "skipped",
                  retryable: !1,
                  message: `${o.kind} was skipped after an earlier refusal`,
                },
              }
            : void 0);
      if (!a) return;
      let l = e.results.flatMap((e, t) =>
        "ok" === e.status
          ? [
              {
                index: t,
                kind: e.kind,
                ...(void 0 === e.oid ? {} : { oid: e.oid }),
              },
            ]
          : [],
      );
      throw (
        i.updateContext({
          actionKind: a.kind,
          actionError: a.error?.message,
          serverReason: a.error?.reason,
        }),
        i.attachLandedActions(l),
        i.fatal({
          reason: (({ failed: e, landed: t }) => {
            let i = e.error?.reason;
            return "hl_outcome_unknown" === i
              ? "perp_outcome_unknown"
              : "set_tpsl" === e.kind && t.some((e) => "cancel" === e.kind)
                ? "perp_tpsl_cancelled_not_set"
                : "notional_too_small" === i
                  ? "perp_below_min_order"
                  : "perp_action_rejected";
          })({ failed: a, landed: l }),
          cause: Error(a.error?.message ?? `${a.kind} was rejected`),
        }),
        i
      );
    },
    C = async ({
      build: e,
      deps: i,
      tradeError: n,
      onSigning: r,
      onSending: s,
    }) => {
      let o,
        a = R(e);
      if (0 === a.length)
        throw (
          n.fatal({
            reason: "perp_action_rejected",
            cause: Error("perp-actions-build returned no ready action"),
          }),
          n
        );
      r();
      let l = await (0, S.f)({
        payloads: a,
        account: i.evmWallet,
        signTypedData: i.signTypedData,
        tradeError: n,
      });
      (s(), (0, b.W)(i.signal));
      try {
        o = await i.api.perpActionsSend({
          request: { evm_wallet: i.evmWallet, signed: l },
          signal: i.signal,
        });
      } catch (e) {
        if ((n.updateContext({ actionKind: a[0]?.kind }), (0, b.c)(e)))
          throw (n.fatal({ reason: "perp_outcome_unknown", cause: e }), n);
        throw (0, k.j)({
          error: e,
          carrier: n,
          fallback: (0, k.X)({ error: e, refused: "perp_action_rejected" }),
        });
      }
      return (
        t.y.info("[perpActionBatch] actions_sent", {
          evm_wallet: i.evmWallet,
          kinds: a.map((e) => e.kind).join(","),
          statuses: o.results.map((e) => e.status).join(","),
          stopped_at: o.stoppedAt,
        }),
        A({ sent: o, tradeError: n }),
        o
      );
    };
  e.s(["i", 0, A, "n", 0, x, "D", 0, R, "y", 0, C], 366487);
  var U = e.i(261784),
    q = e.i(574148),
    I = e.i(781311),
    M = e.i(266837);
  let O = (e) => {
      let t = e.actions.find((e) => "close" === e.kind),
        i = t?.summary.size;
      return "string" == typeof i ? i : void 0;
    },
    W = async ({ hold: e, lane: t }, i) => {
      let n,
        r = () => p(e.key, { sizeCoins: t.sizeCoins, markPx: t.markPx }),
        s = r();
      if (void 0 === s.hit && ("none" === s.miss || "key" === s.miss)) {
        let t = await g(h, e.key, 1e3);
        t.waited && ((n = t.waitedMs), t.kept && (s = r()));
      }
      return (e.releaseKey(), void 0 === s.hit)
        ? ((i.current = { outcome: s.miss, waitMs: n }), null)
        : ((i.current = {
            outcome: void 0 === n ? "hit" : "inflight_hit",
            ageMs: Date.now() - s.hit.signedAt,
            waitMs: n,
          }),
          s.hit);
    },
    B = (e) =>
      e instanceof k.I
        ? e.errorContext.serverReason
        : e instanceof y.b
          ? e.reason
          : void 0,
    E = async ({ requestId: e, deps: t }) => {
      try {
        return (
          await (0, U.I)({
            requestId: e,
            evmWallet: t.evmWallet,
            until: (e) => "success" === e.status,
            signal: t.signal,
            fetchStatus: t.api.fetchPerpRelayStatus,
            longPoll: !0,
            leg: "payout",
          }),
          !0
        );
      } catch (e) {
        if ((0, b.c)(e)) throw e;
        return !1;
      }
    },
    F = async ({
      hit: e,
      params: i,
      deps: n,
      report: r,
      tradeError: o,
      stopwatch: a,
      recordOwed: l,
      trace: u,
    }) => {
      let { evmWallet: d, api: c, signal: p } = n,
        m = performance.now(),
        f = l ? (0, I.N)(n, i.coin, i.denominationOut) : void 0,
        h =
          void 0 !== e.withdraw &&
          e.withdraw.denominationOut === i.denominationOut
            ? e.withdraw
            : void 0;
      r("sending_close");
      let w = new k.I();
      w.updateContext({ ...o.errorContext, actionKind: "close" });
      try {
        (0, b.W)(p);
        let r = await c.perpActionsSend({
            request: {
              evm_wallet: d,
              signed: e.signed,
              ...(void 0 === h
                ? {}
                : {
                    withdraw: {
                      templates: h.templates,
                      signatures: h.signatures,
                    },
                  }),
            },
            signal: p,
          }),
          s = void 0 === h ? void 0 : (r.withdraw?.status ?? "absent");
        void 0 !== s &&
          void 0 !== u.current &&
          (u.current = { ...u.current, withdraw: s });
        let l = r.results.map((e) => e.status).join(",");
        (t.y.info("[perpCloseFlow] presigned_close_sent", {
          evm_wallet: d,
          coin: i.coin,
          statuses: l,
          presign_age_ms: u.current?.ageMs,
          withdraw_status: s,
        }),
          void 0 !== h &&
            t.y.info("[perpCloseFlow] spot_model_close_sent", {
              evm_wallet: d,
              coin: i.coin,
              request_id: r.withdraw?.requestId,
              withdraw_status: s,
              amount_usdc: h.amountUsdc,
            }));
        let g =
          void 0 !== h && r.withdraw?.status === "sent"
            ? {
                requestId: r.withdraw.requestId,
                outAmount: h.outAmount,
                swapId: h.swapId,
              }
            : void 0;
        if (
          !r.results.some((e) => "close" === e.kind && "ok" === e.status) &&
          void 0 !== g
        ) {
          if (!(await E({ requestId: g.requestId, deps: n })))
            throw (
              t.y.warn("[perpCloseFlow] close_unconfirmed_by_payout", {
                evm_wallet: d,
                coin: i.coin,
                request_id: g.requestId,
                statuses: l,
              }),
              o.updateContext({ actionKind: "close" }),
              o.fatal({
                reason: "perp_outcome_unknown",
                cause: Error(
                  "the close's answer named no fill and its payout never landed",
                ),
              }),
              o
            );
          return (
            t.y.info("[perpCloseFlow] close_settled_by_payout", {
              evm_wallet: d,
              coin: i.coin,
              request_id: g.requestId,
              statuses: l,
            }),
            a.mark({ key: "timeToActionsMs", since: m }),
            { sent: r, owedSeq: f, settledByPayout: !0, preSentPayout: g }
          );
        }
        return (
          A({ sent: r, tradeError: w }),
          a.mark({ key: "timeToActionsMs", since: m }),
          { sent: r, owedSeq: f, settledByPayout: !1, preSentPayout: g }
        );
      } catch (r) {
        if (
          (void 0 !== h &&
            void 0 !== u.current &&
            void 0 === u.current.withdraw &&
            (u.current = { ...u.current, withdraw: "request_failed" }),
          (0, b.c)(r))
        )
          throw (
            (0, I.G)(n, f, "unknown"),
            o.updateContext({ actionKind: "close" }),
            o.fatal({ reason: "perp_outcome_unknown", cause: r }),
            o
          );
        let e = B(r);
        if (void 0 !== e && s.includes(e))
          return (
            (0, I.G)(n, f, "not_filled"),
            t.y.info("[perpCloseFlow] presign_fallback", {
              evm_wallet: d,
              coin: i.coin,
              reason: e,
            }),
            void 0 !== u.current &&
              (u.current = { ...u.current, fallback: !0 }),
            null
          );
        throw (
          (0, I.G)(n, f, j(r)),
          (0, k.j)({
            error: r,
            carrier: o,
            fallback: (0, k.X)({ error: r, refused: "perp_action_rejected" }),
          })
        );
      }
    },
    z = async ({ deps: e, coin: t }) => {
      try {
        let i = (
          await e.api.perpActionsBuild({
            request: {
              evm_wallet: e.evmWallet,
              actions: [{ kind: "close", coin: t }],
            },
            signal: e.signal,
          })
        ).actions.find((e) => "close" === e.kind);
        if (void 0 === i) return "unknown";
        if ("skipped" === i.status)
          return /no_position|not_found|no position/i.test(i.skipReason ?? "")
            ? "gone"
            : "unknown";
        let n =
          (0, b.s)(i.summary, "position_size") ?? (0, b.s)(i.summary, "size");
        if (void 0 === n) return "unknown";
        return Number(n) > 0 ? "remains" : "gone";
      } catch (e) {
        if ((0, b.c)(e)) throw e;
        return /no_position/i.test(B(e) ?? "") ? "gone" : "unknown";
      }
    },
    $ = async ({
      params: e,
      deps: i,
      report: n,
      tradeError: r,
      stopwatch: s,
      recordOwed: o,
      presign: a,
      presignTrace: l,
    }) => {
      let u,
        d,
        c,
        { evmWallet: p, api: m, signal: f } = i;
      if (void 0 !== a) {
        let u = await W(a, l);
        if (null !== u) {
          let a = await F({
            hit: u,
            params: e,
            deps: i,
            report: n,
            tradeError: r,
            stopwatch: s,
            recordOwed: o,
            trace: l,
          });
          if (null !== a) {
            let n;
            try {
              n = await D({
                sent: a.sent,
                requestedSize: u.requestedSize ?? O(u.build),
                owedSeq: a.owedSeq,
                params: e,
                deps: i,
                tradeError: r,
                presignTrace: l,
                settledByPayout: a.settledByPayout,
                notionalFallback: u.withdraw?.closeNotionalUsdc,
              });
            } catch (n) {
              throw (
                void 0 !== a.preSentPayout &&
                  (({ preSent: e, params: i, deps: n }) => {
                    let r = {
                      evm_wallet: n.evmWallet,
                      coin: i.coin,
                      request_id: e.requestId,
                      spot_model: !0,
                    };
                    (0, U.I)({
                      requestId: e.requestId,
                      evmWallet: n.evmWallet,
                      until: (e) => e.terminal,
                      longPoll: !0,
                      leg: "payout",
                      fetchStatus: n.api.fetchPerpRelayStatus,
                    }).then(
                      (e) => {
                        t.y.warn(
                          "[perpCloseFlow] spot_model_payout_after_short_close",
                          {
                            ...r,
                            status: e.status,
                            fail_reason: e.failReason,
                            payout: (0, v.h)(e),
                          },
                        );
                      },
                      (e) => {
                        t.y.warn(
                          "[perpCloseFlow] spot_model_payout_after_short_close",
                          {
                            ...r,
                            status:
                              e instanceof U.x
                                ? e.status.status
                                : e instanceof U.Y
                                  ? "unresolved"
                                  : "unreadable",
                            fail_reason:
                              e instanceof U.x ? e.status.failReason : void 0,
                          },
                        );
                      },
                    );
                  })({ preSent: a.preSentPayout, params: e, deps: i }),
                n
              );
            }
            return { ...n, preSentPayout: a.preSentPayout };
          }
        }
      }
      n("building_close");
      let h = performance.now();
      try {
        u = await m.perpActionsBuild({
          request: {
            evm_wallet: p,
            actions: [
              {
                kind: "close",
                coin: e.coin,
                slippage_bps: e.slippageBps,
                ...(void 0 === e.sizeUsd ? {} : { size_usd: e.sizeUsd }),
              },
            ],
          },
          signal: f,
        });
      } catch (e) {
        if ((0, b.c)(e)) throw e;
        throw (
          r.updateContext({ actionKind: "close" }),
          (0, k.j)({ error: e, carrier: r })
        );
      }
      s.mark({ key: "timeToBuildMs", since: h });
      let w = performance.now(),
        g = w;
      try {
        c = await C({
          build: u,
          deps: i,
          tradeError: r,
          onSigning: () => n("signing_close"),
          onSending: () => {
            (s.mark({ key: "timeToSignMs", since: w }),
              (g = performance.now()),
              o && (d = (0, I.N)(i, e.coin, e.denominationOut)),
              n("sending_close"));
          },
        });
      } catch (e) {
        throw ((0, I.G)(i, d, j(e)), e);
      }
      return (
        s.mark({ key: "timeToActionsMs", since: g }),
        D({
          sent: c,
          requestedSize: O(u),
          owedSeq: d,
          params: e,
          deps: i,
          tradeError: r,
          presignTrace: void 0,
        })
      );
    },
    D = async ({
      sent: e,
      requestedSize: i,
      owedSeq: r,
      params: s,
      deps: o,
      tradeError: a,
      presignTrace: l,
      settledByPayout: u = !1,
      notionalFallback: d,
    }) => {
      let { evmWallet: c } = o,
        p = e.results.find((e) => "close" === e.kind),
        m = p?.filled?.totalSz;
      if (u) {
        let i = (0, n.o)(p?.filled) ?? d;
        return (
          (0, I.G)(o, r, "filled", { closeNotionalUsdc: i }),
          t.y.info("[perpCloseFlow] position_closed", {
            evm_wallet: c,
            coin: s.coin,
            oid: p?.oid,
            filled_sz: m,
            settled_by_payout: !0,
            close_notional_usdc: i,
          }),
          { results: e.results, owedSeq: r, closeNotionalUsdc: i }
        );
      }
      let f = void 0 === m || (0, b.p)({ requestedSize: i, filledSize: m }),
        h = l?.current;
      if (void 0 !== l && void 0 !== h && void 0 !== m)
        if (f) {
          let e = performance.now(),
            n = await z({ deps: o, coin: s.coin });
          ((l.current = {
            ...h,
            confirm: "checked",
            confirmResult: n,
            confirmMs: Math.round((0, b.v)(e)),
          }),
            t.y.info("[perpCloseFlow] presign_fill_checked", {
              evm_wallet: c,
              coin: s.coin,
              requested_sz: i,
              filled_sz: m,
              position: n,
            }),
            (f = "gone" !== n));
        } else l.current = { ...h, confirm: "skipped_full" };
      if (f)
        throw (
          (0, I.G)(o, r, void 0 === m ? "not_filled" : "partial"),
          a.updateContext({ actionKind: "close" }),
          t.y.warn("[perpCloseFlow] close_partial", {
            evm_wallet: c,
            coin: s.coin,
            requested_sz: i,
            filled_sz: m,
          }),
          a.fatal({
            reason: "perp_close_partial",
            cause: Error(`close filled ${m ?? "0"} of ${i ?? "?"} ${s.coin}`),
          }),
          a
        );
      let w = (0, n.o)(p?.filled) ?? d;
      return (
        (0, I.G)(o, r, "filled", { closeNotionalUsdc: w }),
        t.y.info("[perpCloseFlow] position_closed", {
          evm_wallet: c,
          coin: s.coin,
          oid: p?.oid,
          filled_sz: m,
          avg_px: p?.filled?.avgPx,
          close_notional_usdc: w,
        }),
        { results: e.results, owedSeq: r, closeNotionalUsdc: w }
      );
    },
    j = (e) =>
      e instanceof k.I && "perp_outcome_unknown" === e.reason
        ? "unknown"
        : "not_filled",
    T = async ({ fill: e, followOn: r, onQuoted: s }) => {
      let o,
        a,
        { params: l, deps: u } = e,
        d = performance.now(),
        c = e.recordOwed ? (0, I.L)(u) : void 0,
        p = new k.I();
      p.updateContext({ evmWallet: u.evmWallet, coin: l.coin });
      let m = (0, b.h)({
          flow: "close_payout",
          tradeError: p,
          onStage: e.onStage,
        }),
        f = (0, b.B)(),
        h = {};
      try {
        let t = e.preSentPayout;
        e.preSentPayout = void 0;
        let i =
            void 0 === t
              ? (0, _.A)(e.bridgeRail)
              : { rail: "bridge", swapId: t.swapId },
          a =
            void 0 === i || void 0 !== t
              ? void 0
              : (0, n.g)([
                  e.closeNotionalUsdc,
                  e.recordOwed ? (0, I.m)(u, c, e.owedSeq) : void 0,
                ]),
          d = await (0, M.E)({
            params: {
              denominationOut: l.denominationOut,
              ...i,
              closeNotionalUsdc: a,
            },
            preSent: t,
            deps: { ...u, signal: void 0 },
            report: m,
            tradeError: p,
            stopwatch: f,
            fastSign: e.fastSign,
            trace: h,
            followOn: r,
            onQuoted: s,
          });
        o = {
          status: "withdrawn",
          requestId: d.requestId,
          outAmount: d.outAmount,
          denominationOut: d.denominationOut,
          rail: d.rail,
        };
      } catch (e) {
        ((o = {
          status: "failed",
          reason: (a = (0, k.j)({ error: e, carrier: p })).reason ?? "unknown",
          requestId: a.errorContext.requestId,
          serverReason: a.errorContext.serverReason,
          rail: h.rail,
        }),
          t.y.warn("[perpCloseFlow] withdraw_after_close_failed", {
            evm_wallet: u.evmWallet,
            coin: l.coin,
            request_id: a.errorContext.requestId,
            stage: a.errorContext.stage,
            reason: a.reason,
            error: (0, i.A)(a.originalError),
          }));
      }
      return (
        (0, I.I)({
          deps: u,
          covered: c,
          payout: o,
          denominationOut: l.denominationOut,
          resumed: !0 === e.resumed,
        }),
        (0, b.E)({
          flow: "close_payout",
          outcome: "withdrawn" === o.status ? "ok" : "error",
          requestId: o.requestId,
          evmWallet: u.evmWallet,
          coin: l.coin,
          denomination: l.denominationOut,
          stage: a?.errorContext.stage,
          reason: a?.reason,
          relayStatus: a?.errorContext.relayStatus,
          timings: f.timings(),
          payoutFastSign: h.payoutFastSign,
          rail: h.rail,
          railRequested: h.railRequested,
          railFallbackReason: h.railFallbackReason,
          payoutAsset: h.payoutAsset,
          sendAttempts: h.sendAttempts,
          spotModel: h.spotModel,
          payoutBuildFirstWaitMs: e.trace.buildFirstWaitMs,
          totalMs: (0, b.v)(d),
          ...(e.resumed ? { payoutResumed: !0 } : {}),
        }),
        o
      );
    },
    L = { status: "failed", reason: "unknown" },
    N = ({ params: e, deps: t, run: i }) => {
      let n = () => void 0,
        r = new Promise((e) => {
          n = e;
        }),
        s = (0, q.P)({
          evmWallet: t.evmWallet,
          solanaWallet: t.solanaWallet,
          kind: "close_payout",
          coin: e.coin,
          run: (e) => i(e, n),
          recover: () => L,
        });
      return (s.then(() => n(void 0)), { quoted: r, settled: s });
    },
    K = async ({
      params: e,
      deps: i,
      onStage: n,
      onPayoutStage: r,
      recordOwed: s = !1,
      payoutFastSign: a = !1,
      payoutBuildFirst: l = !1,
      presign: u,
      bridgeRail: d = !1,
    }) => {
      let c,
        p,
        f = new k.I();
      f.updateContext({ evmWallet: i.evmWallet, coin: e.coin });
      let g = (0, b.h)({ flow: "close", tradeError: f, onStage: n }),
        _ = (0, b.B)(),
        y = performance.now();
      await (0, q.t)(i.evmWallet, { maxMs: q.Z });
      let v = (({ params: e, deps: t }) => {
          let i = () => void 0,
            n = new Promise((e) => {
              i = e;
            });
          return {
            attempt: N({
              params: e,
              deps: t,
              run: async (e, t) => {
                let i = await n;
                return void 0 === i
                  ? L
                  : T({ fill: i, followOn: e, onQuoted: t });
              },
            }),
            release: i,
          };
        })({ params: e, deps: i }),
        S = {};
      void 0 === e.sizeUsd &&
        (void 0 === u
          ? (S.current = { outcome: "disabled" })
          : (c = {
              hold: w(
                h,
                o({
                  solanaWallet: i.solanaWallet,
                  evmWallet: i.evmWallet,
                  coin: e.coin,
                  sizeCoins: u.sizeCoins,
                  side: u.side,
                  slippageBps: e.slippageBps,
                  withdrawOut: u.withdrawOut,
                }),
              ),
              lane: u,
            }));
      try {
        p = await $({
          params: e,
          deps: i,
          report: g,
          tradeError: f,
          stopwatch: _,
          recordOwed: s,
          presign: c,
          presignTrace: S,
        });
      } catch (n) {
        if (
          (c?.hold.releaseKey(),
          c?.hold.resumeLoops(),
          (0, m.x)(),
          v.release(void 0),
          await v.attempt.settled,
          (0, b.c)(n))
        )
          throw n;
        let t = (0, k.j)({ error: n, carrier: f });
        throw (
          (0, b.E)({
            flow: "close",
            outcome: "error",
            evmWallet: i.evmWallet,
            coin: e.coin,
            denomination: e.denominationOut,
            stage: t.errorContext.stage,
            reason: t.reason,
            actionKind: t.errorContext.actionKind,
            timings: _.timings(),
            presign: S.current,
            spotModel: S.current?.withdraw !== void 0,
            totalMs: (0, b.v)(y),
          }),
          t
        );
      }
      (c?.hold.releaseKey(),
        c?.hold.resumeLoops(),
        (0, m.x)(),
        g("done"),
        (0, b.E)({
          flow: "close",
          outcome: "ok",
          evmWallet: i.evmWallet,
          coin: e.coin,
          denomination: e.denominationOut,
          timings: _.timings(),
          presign: S.current,
          spotModel: S.current?.withdraw !== void 0,
          totalMs: (0, b.v)(y),
        }));
      let P = {
        params: e,
        deps: i,
        onStage: r,
        recordOwed: s,
        fastSign: a,
        trace: {},
        bridgeRail: d,
        owedSeq: p.owedSeq,
        closeNotionalUsdc: p.closeNotionalUsdc,
        preSentPayout: p.preSentPayout,
      };
      if ((v.release(P), l)) {
        let e = performance.now();
        (await new Promise((e) => setTimeout(e, 0)),
          (P.trace.buildFirstWaitMs = (0, b.v)(e)));
      }
      return {
        closed: !0,
        results: p.results,
        denominationOut: e.denominationOut,
        payout: v.attempt,
        retryPayout: () => (
          t.y.info("[perpCloseFlow] payout_retry", {
            evm_wallet: i.evmWallet,
            coin: e.coin,
          }),
          N({
            params: e,
            deps: i,
            run: (e, t) =>
              T({ fill: { ...P, onStage: void 0 }, followOn: e, onQuoted: t }),
          })
        ),
      };
    };
  e.s(
    [
      "a",
      0,
      ({
        coin: e,
        denominationOut: t,
        deps: i,
        payoutFastSign: n = !1,
        bridgeRail: r = !1,
      }) => {
        let s = { coin: e, denominationOut: t },
          o = {
            params: s,
            deps: i,
            onStage: void 0,
            recordOwed: !0,
            fastSign: n,
            trace: {},
            resumed: !0,
            bridgeRail: r,
          };
        return N({
          params: s,
          deps: i,
          run: (e, t) => T({ fill: o, followOn: e, onQuoted: t }),
        });
      },
      "H",
      0,
      K,
    ],
    316069,
  );
};
