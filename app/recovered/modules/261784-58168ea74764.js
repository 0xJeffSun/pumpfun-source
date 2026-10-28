// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    r = e.i(613677),
    i = e.i(342463),
    a = e.i(297865),
    s = e.i(584229),
    n = e.i(577696),
    o = e.i(239867),
    d = e.i(22675),
    l = e.i(342652),
    u = e.i(967936);
  let p = "transactions/send",
    _ = 400,
    c = 2e4,
    m = 6e4,
    w = (e) => (e < 1e4 ? 500 : 2e3),
    g = ({ signedTransaction: e, signal: t }) =>
      (0, l.b)(
        p,
        { transaction: (0, d.r)(e), non_trade_tx: !0 },
        { retryLimit: 0, timeoutMs: 6e4, signal: t },
      ),
    h = r.z.object({
      signature: i.z.string(),
      confirmed: a.z.boolean().optional(),
      succeeded: a.z.boolean().optional(),
      error: i.z.string().nullish(),
      reason: i.z.string().nullish(),
    }),
    f = r.z.object({ error: i.z.string().optional() }),
    y = (e) => void 0 === e || e >= 500;
  class b extends Error {
    status;
    constructor(e) {
      (super(`Relay leg ended as ${e.status}`),
        (this.name = "PerpRelayTerminalError"),
        (this.status = e));
    }
  }
  class v extends Error {
    requestId;
    lastStatus;
    lastResult;
    constructor({ requestId: e, lastResult: t }) {
      (super(`Relay request ${e} did not settle in time`),
        (this.name = "PerpRelayTimeoutError"),
        (this.requestId = e),
        (this.lastStatus = t?.status),
        (this.lastResult = t));
    }
  }
  let z = (e) => "refund" === e.status || "failure" === e.status,
    k = (e) =>
      (e instanceof n.b &&
        (400 === e.status || 422 === e.status) &&
        "no_session" !== e.reason) ||
      (e instanceof Error && /unknown field/i.test(e.message)),
    x = (e) => e instanceof n.b && "no_session" === e.reason,
    q = (e) =>
      e instanceof n.b &&
      void 0 !== e.status &&
      e.status >= 400 &&
      e.status < 500 &&
      429 !== e.status,
    A = async ({
      requestId: e,
      evmWallet: r,
      until: i,
      pollDelayMs: a = w,
      timeoutMs: d = m,
      signal: l,
      onStatus: p,
      fetchStatus: _ = o.i,
      longPoll: c = !1,
      leg: g,
    }) => {
      let h,
        f = Date.now(),
        y = f + d,
        A = 0,
        S = 0,
        E = c;
      for (;;) {
        let o;
        if (l?.aborted) throw (0, u.j)();
        S += 1;
        let d = Date.now(),
          c = E ? Math.max(0, Math.min(8e3, y - d)) : void 0,
          m = !1;
        try {
          o =
            void 0 === c
              ? await _({
                  request: { request_id: e, evm_wallet: r },
                  signal: l,
                })
              : await _({
                  request: {
                    request_id: e,
                    evm_wallet: r,
                    wait_ms: c,
                    ...(void 0 === g ? {} : { leg: g }),
                  },
                  signal: l,
                  timeoutMs: c + 3e3,
                });
        } catch (r) {
          if ((0, u.c)(r)) throw r;
          if (void 0 !== c && k(r))
            ((E = !1),
              (m = !0),
              t.y.warn("[perpDepositSend] relay_status_long_poll_refused", {
                request_id: e,
                http_status: r instanceof n.b ? r.status : void 0,
                error: (0, s.A)(r),
              }));
          else if (q(r) && !(void 0 !== c && x(r))) throw r;
          else
            1 === (A += 1) &&
              t.y.warn("[perpDepositSend] relay_status_lookup_failed", {
                request_id: e,
                error: (0, s.A)(r),
              });
        }
        if (void 0 !== o) {
          if (
            ((o.status !== h?.status || o.funded !== h?.funded) && p?.(o),
            (h = o),
            i(o))
          )
            return (
              t.y.info("[perpDepositSend] relay_status_settled", {
                request_id: e,
                status: o.status,
                funded: o.funded,
                polls: S,
              }),
              o
            );
          if (z(o)) throw new b(o);
          let r = Date.now() - d;
          m = void 0 !== c && r >= a(d - f);
        }
        let w = Date.now();
        if (w >= y) throw new v({ requestId: e, lastResult: h });
        m || (await (0, u.t)({ ms: a(w - f), signal: l }));
      }
    },
    S = (e) => e.funded || e.inTxHashes.length > 0,
    E = async ({ signedTransaction: e, sendTransaction: t, signal: r }) => {
      let i;
      try {
        i = await t({ signedTransaction: e, signal: r });
      } catch (e) {
        if ((0, u.c)(e)) return { kind: "aborted", error: e };
        return { kind: "failed", error: e, status: void 0 };
      }
      if (i.status < 200 || i.status >= 300)
        return {
          kind: "failed",
          error: Error(
            (({ body: e, status: t }) => {
              let r = f.safeParse(e);
              return r.success && void 0 !== r.data.error
                ? r.data.error
                : `${p} answered ${t}`;
            })({ body: i.body, status: i.status }),
          ),
          status: i.status,
        };
      let a = h.safeParse(i.body);
      return a.success && 0 !== a.data.signature.length
        ? {
            kind: "sent",
            signature: a.data.signature,
            confirmed: a.data.confirmed,
            succeeded: a.data.succeeded,
            error: a.data.error ?? void 0,
          }
        : {
            kind: "failed",
            error: Error("send response missing signature"),
            status: i.status,
          };
    },
    I = async ({
      requestId: e,
      evmWallet: r,
      localSignature: i,
      attempts: a,
      lastError: n,
      logContext: o,
      tradeError: d,
      fetchStatus: l,
      probeTimeoutMs: u,
      signal: p,
    }) => {
      let _;
      t.y.warn("[perpDepositSend] deposit_send_unanswered", {
        ...o,
        attempts: a,
        error: (0, s.A)(n),
      });
      try {
        _ = await A({
          requestId: e,
          evmWallet: r,
          until: S,
          timeoutMs: u,
          fetchStatus: l,
          signal: p,
        });
      } catch (e) {
        if (e instanceof b) _ = e.status;
        else if (e instanceof v)
          throw (
            d.updateContext({ relayStatus: e.lastStatus }),
            d.fatal({ reason: "failed_to_send_transaction", cause: n }),
            d
          );
        else throw (d.fatal({ reason: "perp_outcome_unknown", cause: e }), d);
      }
      return (
        t.y.info("[perpDepositSend] deposit_seen_by_relay", {
          ...o,
          tx_signature: i,
          status: _.status,
          funded: _.funded,
          attempts: a,
        }),
        {
          signature: i,
          confirmed: !1,
          attempts: a,
          error: (0, s.A)(n),
          seenByRelay: !0,
        }
      );
    },
    T = async ({
      signedTransaction: e,
      localSignature: r,
      swapId: i,
      requestId: a,
      evmWallet: n,
      tradeError: d,
      sendTransaction: l = g,
      fetchStatus: p = o.i,
      retryDelayMs: m = _,
      probeTimeoutMs: w = c,
      signal: h,
    }) => {
      let f = { swap_id: i, request_id: a },
        b = (e) => {
          throw (d.fatal({ reason: "perp_outcome_unknown", cause: e }), d);
        };
      (0, u.W)(h);
      let v = 1,
        z = await E({ signedTransaction: e, sendTransaction: l, signal: h });
      if ("aborted" === z.kind) return b(z.error);
      if ("failed" === z.kind && y(z.status)) {
        t.y.warn("[perpDepositSend] deposit_send_retrying", {
          ...f,
          http_status: z.status,
          error: (0, s.A)(z.error),
          attempt: v,
        });
        try {
          await (0, u.t)({ ms: m, signal: h });
        } catch (e) {
          return b(e);
        }
        if (
          ((v = 2),
          "aborted" ===
            (z = await E({
              signedTransaction: e,
              sendTransaction: l,
              signal: h,
            })).kind)
        )
          return b(z.error);
      }
      if ("failed" === z.kind) {
        if (y(z.status))
          return I({
            requestId: a,
            evmWallet: n,
            localSignature: r,
            attempts: v,
            lastError: z.error,
            logContext: f,
            tradeError: d,
            fetchStatus: p,
            probeTimeoutMs: w,
            signal: h,
          });
        throw (
          d.fatal({ reason: "failed_to_send_transaction", cause: z.error }),
          d
        );
      }
      if (!0 === z.confirmed && !1 === z.succeeded)
        throw (
          d.fatal({
            reason: "failed_to_send_transaction",
            cause: Error(z.error ?? "deposit transaction failed on-chain"),
          }),
          d
        );
      let k = !0 === z.confirmed && !0 === z.succeeded;
      return (
        t.y.info("[perpDepositSend] deposit_sent", {
          ...f,
          tx_signature: z.signature,
          confirmed: k,
          attempts: v,
          error: z.error,
        }),
        { signature: z.signature, confirmed: k, attempts: v, error: z.error }
      );
    };
  e.s(["x", 0, b, "Y", 0, v, "U", 0, g, "z", 0, T, "I", 0, A]);
};
