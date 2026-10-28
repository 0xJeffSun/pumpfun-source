// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    r = e.i(584229),
    i = e.i(118245),
    a = e.i(751228),
    s = e.i(577696),
    n = e.i(239867),
    o = e.i(835436),
    d = e.i(261784),
    l = e.i(967936),
    u = e.i(574148),
    p = e.i(931464);
  let _ = { nonceMapping: "relay_nonce_mapping", sendAsset: "hl_send_asset" },
    c = [1e3, 2e3],
    m = (e, t, r) => {
      let i = e.findIndex((e) => e.kind === r);
      return -1 === i ? void 0 : t[i]?.signature;
    },
    w = (e) => ("bridge" === e.rail && void 0 !== e.swapId ? "bridge" : void 0),
    g = async ({
      rail: e,
      request: i,
      requestId: a,
      deps: n,
      tradeError: d,
    }) => {
      let { api: u, signal: p, evmWallet: _ } = n,
        m = 0;
      for (;;) {
        m += 1;
        try {
          return {
            result: await u.perpWithdrawSend({ request: i, signal: p }),
            attempts: m,
          };
        } catch (i) {
          if ((0, l.c)(i))
            throw (d.fatal({ reason: "perp_outcome_unknown", cause: i }), d);
          if ("bridge" === e && i instanceof s.b) {
            if ("payout_in_progress" === i.reason)
              return (
                t.y.info("[perpWithdrawFlow] withdraw_send_in_progress", {
                  request_id: a,
                  evm_wallet: _,
                  attempt: m,
                  reason: i.reason,
                  unconfirmed: !1,
                }),
                { result: void 0, attempts: m }
              );
            if (i.retryable) {
              let e = c[m - 1];
              if (void 0 !== e) {
                (t.y.warn("[perpWithdrawFlow] withdraw_send_retry", {
                  request_id: a,
                  evm_wallet: _,
                  attempt: m,
                  http_status: i.status,
                  reason: i.reason ?? "network",
                  error: (0, r.A)(i),
                }),
                  await (0, l.t)({ ms: e, signal: p }));
                continue;
              }
              return (
                t.y.warn("[perpWithdrawFlow] withdraw_send_in_progress", {
                  request_id: a,
                  evm_wallet: _,
                  attempt: m,
                  http_status: i.status,
                  reason: i.reason ?? "network",
                  unconfirmed: !0,
                }),
                { result: void 0, attempts: m }
              );
            }
          }
          throw (0, o.j)({
            error: i,
            carrier: d,
            fallback: (0, o.X)({
              error: i,
              refused: "failed_to_send_transaction",
            }),
          });
        }
      }
    },
    h = async ({
      requestId: e,
      quotedOutAmount: r,
      rail: i,
      params: a,
      deps: s,
      report: u,
      tradeError: p,
      stopwatch: _,
      trace: c,
    }) => {
      let m,
        { evmWallet: w, api: g, signal: h } = s;
      u("awaiting_settlement");
      let f = performance.now();
      try {
        m = await (0, d.I)({
          requestId: e,
          evmWallet: w,
          until: (e) => "success" === e.status,
          signal: h,
          fetchStatus: g.fetchPerpRelayStatus,
          longPoll: !0,
          leg: "payout",
          onStatus: (r) => {
            t.y.info("[perpWithdrawFlow] relay_status", {
              request_id: e,
              status: r.status,
              terminal: r.terminal,
            });
          },
        });
      } catch (e) {
        if ((0, l.c)(e)) throw e;
        if (e instanceof d.x)
          throw (
            p.updateContext({ relayStatus: e.status.status }),
            p.fatal({ reason: "failed_to_confirm_transaction", cause: e }),
            p
          );
        if (e instanceof d.Y)
          throw (
            p.updateContext({ relayStatus: e.lastStatus }),
            p.fatal({ reason: "perp_withdraw_pending", cause: e }),
            p
          );
        throw (0, o.j)({
          error: e,
          carrier: p,
          fallback: "failed_to_confirm_transaction",
        });
      }
      _.mark({ key: "timeToFundedMs", since: f });
      let y = (0, n.h)(m);
      return (
        void 0 !== y &&
          y.denominationOut !== a.denominationOut &&
          t.y.info("[perpWithdrawFlow] payout_asset_switched", {
            request_id: e,
            evm_wallet: w,
            requested: a.denominationOut,
            delivered: y.denominationOut,
          }),
        void 0 !== c && (c.payoutAsset = y?.denominationOut),
        u("done"),
        {
          requestId: e,
          outAmount: y?.outAmount ?? r,
          denominationOut: y?.denominationOut ?? a.denominationOut,
          rail: i,
        }
      );
    },
    f = async ({
      params: e,
      deps: r,
      report: i,
      tradeError: s,
      stopwatch: n,
      fastSign: d = !1,
      trace: c,
      followOn: f,
      onQuoted: y,
      preSent: b,
    }) => {
      let v,
        z,
        {
          evmWallet: k,
          solanaWallet: x,
          signTypedData: q,
          api: A,
          signal: S,
        } = r;
      if ((await (0, u.t)(k, { maxMs: u.Z, before: f?.seq }), void 0 !== b))
        return (
          void 0 !== c &&
            ((c.railRequested = "bridge"),
            (c.rail = "bridge"),
            (c.spotModel = !0)),
          s.updateContext({ requestId: b.requestId }),
          y?.(b.outAmount),
          f?.markHlDone(),
          h({
            requestId: b.requestId,
            quotedOutAmount: b.outAmount,
            rail: "bridge",
            params: e,
            deps: r,
            report: i,
            tradeError: s,
            stopwatch: n,
            trace: c,
          })
        );
      i("building_withdraw");
      let E = performance.now(),
        I = w(e);
      void 0 !== c && (c.railRequested = I);
      try {
        v = await A.perpWithdrawBuild({
          request: (({ params: e, evmWallet: t, solanaWallet: r }) => ({
            evm_wallet: t,
            user: r,
            amount: e.amountUsd,
            denomination_out: e.denominationOut,
            ...("bridge" === w(e)
              ? {
                  rail: "bridge",
                  swap_id: e.swapId,
                  ...(void 0 === e.closeNotionalUsdc
                    ? {}
                    : { close_notional_usdc: e.closeNotionalUsdc }),
                }
              : {}),
          }))({ params: e, evmWallet: k, solanaWallet: x }),
          signal: S,
        });
      } catch (e) {
        if ((0, l.c)(e)) throw e;
        throw (0, o.j)({ error: e, carrier: s });
      }
      n.mark({ key: "timeToBuildMs", since: E });
      let T = (0, a.W)(v.rail);
      (void 0 !== c &&
        ((c.rail = T), (c.railFallbackReason = v.railFallbackReason)),
        "bridge" === I &&
          "bridge" !== T &&
          t.y.info("[perpWithdrawFlow] rail_fallback", {
            request_id: v.requestId,
            evm_wallet: k,
            reason: v.railFallbackReason,
          }),
        y?.(v.outAmount),
        s.updateContext({ requestId: v.requestId }),
        i("signing_withdraw"));
      let C = performance.now(),
        M = [
          ...(void 0 === (z = v).nonceMapping
            ? []
            : [
                {
                  kind: _.nonceMapping,
                  typedData: z.nonceMapping.typedData,
                  template: z.template,
                },
              ]),
          {
            kind: _.sendAsset,
            typedData: z.sendAsset.typedData,
            template: z.template,
          },
        ],
        U =
          d &&
          M.length > 1 &&
          void 0 !== r.signTypedDataBatch &&
          r.signsSilently?.() === !0;
      U && void 0 !== c && (c.payoutFastSign = !0);
      let j = await (0, p.f)({
        payloads: M,
        account: k,
        signTypedData: q,
        ...(U
          ? { concurrent: !0, signTypedDataBatch: r.signTypedDataBatch }
          : {}),
        tradeError: s,
      });
      n.mark({ key: "timeToSignMs", since: C });
      let D = m(M, j, _.sendAsset),
        R = m(M, j, _.nonceMapping);
      if (void 0 === D)
        throw (
          s.fatal({
            reason: "failed_to_sign_transaction",
            cause: Error("the withdraw signed no sendAsset"),
          }),
          s
        );
      i("sending_withdraw");
      let F = performance.now();
      (0, l.W)(S);
      let O = {
          template: v.template,
          send_asset_signature: D,
          ...(void 0 === R ? {} : { nonce_mapping_signature: R }),
        },
        P = await g({
          rail: T,
          request: O,
          requestId: v.requestId,
          deps: r,
          tradeError: s,
        });
      return (
        void 0 !== c && (c.sendAttempts = P.attempts),
        void 0 !== P.result &&
          t.y.info("[perpWithdrawFlow] withdraw_sent", {
            request_id: P.result.requestId,
            hl_status: P.result.hlStatus,
            evm_wallet: k,
            amount_usdc: v.amountUsdc,
            denomination_out: e.denominationOut,
            rail: P.result.rail ?? T,
            attempts: P.attempts,
          }),
        f?.markHlDone(),
        n.mark({ key: "timeToActionsMs", since: F }),
        h({
          requestId: v.requestId,
          quotedOutAmount: v.outAmount,
          rail: T,
          params: e,
          deps: r,
          report: i,
          tradeError: s,
          stopwatch: n,
          trace: c,
        })
      );
    },
    y = async ({ params: e, deps: t, onStage: r, fastSign: a = !1 }) => {
      let s = new o.I();
      s.updateContext({ evmWallet: t.evmWallet });
      let n = (0, l.h)({ flow: "withdraw", tradeError: s, onStage: r }),
        d = (0, l.B)(),
        u = performance.now(),
        p = {};
      try {
        let r = await f({
          params: e,
          deps: t,
          report: n,
          tradeError: s,
          stopwatch: d,
          fastSign: a,
          trace: p,
        });
        return (
          (0, l.E)({
            flow: "withdraw",
            outcome: "ok",
            requestId: r.requestId,
            evmWallet: t.evmWallet,
            timings: d.timings(),
            payoutFastSign: p.payoutFastSign,
            rail: p.rail,
            railRequested: p.railRequested,
            railFallbackReason: p.railFallbackReason,
            payoutAsset: p.payoutAsset,
            sendAttempts: p.sendAttempts,
            totalMs: (0, l.v)(u),
          }),
          r
        );
      } catch (r) {
        if ((0, l.c)(r)) throw r;
        let e = (0, o.j)({ error: r, carrier: s });
        throw (
          (0, l.E)({
            flow: "withdraw",
            outcome: "error",
            requestId: e.errorContext.requestId,
            evmWallet: t.evmWallet,
            stage: e.errorContext.stage,
            reason: e.reason,
            actionKind: e.errorContext.actionKind,
            relayStatus: e.errorContext.relayStatus,
            timings: d.timings(),
            payoutFastSign: p.payoutFastSign,
            rail: p.rail,
            railRequested: p.railRequested,
            railFallbackReason: p.railFallbackReason,
            payoutAsset: p.payoutAsset,
            sendAttempts: p.sendAttempts,
            totalMs: (0, l.v)(u),
          }),
          e
        );
      } finally {
        (0, i.x)();
      }
    };
  e.s(["U", 0, _, "M", 0, y, "E", 0, f], 266837);
  var b = e.i(38279),
    v = e.i(768359),
    z = e.i(119452),
    k = e.i(385916),
    x = e.i(361308);
  e.s(
    [
      "f",
      0,
      ({ queryClient: e, solanaWallet: t }) => {
        if (t) {
          for (let r of [
            x.f.root,
            v.m.subject(t),
            b.Q.BALANCE_SUMMARY(t),
            b.Q.USDC_TOKEN_BALANCE(t),
          ])
            e.invalidateQueries({ queryKey: r });
          ((0, k.f)(e, t), (0, z.K)(e, t));
        }
      },
    ],
    617938,
  );
};
