// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    n = e.i(896342),
    i = e.i(618119),
    r = e.i(203941),
    s = e.i(486813),
    o = e.i(192098),
    a = e.i(526317);
  let l = 1500,
    d = 18e4;
  class u extends Error {
    intentId;
    lastIntent;
    lastStatus;
    constructor(e, t) {
      (super(`Bridge intent ${e} did not settle in time`),
        (this.name = "BridgeIntentTimeoutError"),
        (this.intentId = e),
        void 0 !== t && (this.lastIntent = t),
        (this.lastStatus = t?.status));
    }
  }
  let c = (e) => (e instanceof Error ? e.message : String(e));
  class _ {
    source = "poll";
    wake;
    pending = !1;
    settledIntent;
    resolveSettled;
    settled;
    constructor() {
      this.settled = new Promise((e) => {
        this.resolveSettled = e;
      });
    }
    settle(e) {
      this.settledIntent ||
        ((this.settledIntent = e),
        (this.source = "push"),
        this.resolveSettled?.(e),
        this.fire());
    }
    eventSettled() {
      return this.settledIntent;
    }
    wait(e) {
      return this.pending
        ? ((this.pending = !1), (this.source = "push"), Promise.resolve())
        : new Promise((t) => {
            let n = setTimeout(() => {
              ((this.wake = void 0), (this.source = "poll"), t());
            }, e);
            this.wake = () => {
              (clearTimeout(n),
                (this.wake = void 0),
                (this.source = "push"),
                t());
            };
          });
    }
    fire() {
      this.wake ? this.wake() : ((this.pending = !0), (this.source = "push"));
    }
    interrupt() {
      this.wake?.();
    }
  }
  let m = /^\d+$/,
    p = (e) => {
      if ("string" != typeof e || !m.test(e)) return;
      let t = Number(e);
      return Number.isSafeInteger(t) ? t : void 0;
    },
    f = (e, t) =>
      ((0, a.w)(e.status) && !(0, a.w)(t.status)) ||
      ((0, o.U)(e) && !(0, o.U)(t)),
    g = async ({ intentId: e, fromEvent: n, lookup: i, reread: r }) => {
      let o;
      try {
        ((o = await i), f(n, o) && (o = await r()));
      } catch (i) {
        t.y.warn("[bridgeIntentPoll] event_settle_reconcile_failed", {
          intent_id: e,
          event_status: n.status,
          error: c(i),
        });
        return;
      }
      if (f(n, o))
        return void t.y.warn("[bridgeIntentPoll] event_settle_row_behind", {
          intent_id: e,
          event_status: n.status,
          row_status: o.status,
        });
      let l = (0, a.w)(n.status) && (0, a.w)(o.status) && o.status !== n.status,
        d =
          null != n.amount_out &&
          null != o.amount_out &&
          n.amount_out !== o.amount_out;
      if (l || d) {
        let i = {
          intent_id: e,
          event_status: n.status,
          row_status: o.status,
          event_amount_out: n.amount_out ?? void 0,
          row_amount_out: o.amount_out ?? void 0,
        };
        (t.y.warn("[bridgeIntentPoll] event_settle_diverged", i),
          (0, s.f)({
            error: Error(
              `bridge event settle diverged: event ${n.status} vs row ${o.status}`,
            ),
            operation: "event-settle-diverged",
            context: i,
          }));
        return;
      }
      t.y.info("[bridgeIntentPoll] event_settle_reconciled", {
        intent_id: e,
        event_status: n.status,
        row_status: o.status,
      });
    },
    y = async ({
      intentId: e,
      direction: s,
      payoutDenomination: m,
      feed: f,
      settleFromEvent: y = !0,
      signal: h,
      onIntent: v,
      intervalMs: w = l,
      timeoutMs: b = d,
      closeFeed: I = !0,
      until: k,
    }) => {
      let x,
        S,
        A,
        P = performance.now(),
        E = new _(),
        B =
          void 0 === f
            ? ((0, r.o)() ?? (0, i.r)())
            : null === f || f.live?.() !== !1
              ? f
              : (f.close(), (0, r.o)() ?? (0, i.r)()),
        F = B !== f,
        M = (e) =>
          (0, o.N)({ intent: e, direction: s, payoutDenomination: m }) ||
          (void 0 !== k && k(e)),
        $ = 0;
      B?.listen((n) => {
        if (!(0, a.C)(n.intent_id, e)) return;
        $ += 1;
        let i = n.fail_reason ?? void 0,
          r = `${n.status}|${i ?? ""}`;
        r !== x &&
          ((x = r),
          t.y.info("[bridgeIntentPoll] push_event", {
            intent_id: e,
            intent_status: n.status,
            fail_reason: i,
            seq: n.seq,
            provisional: n.provisional ?? void 0,
          }));
        let s = void 0 !== n.seq && void 0 !== S && n.seq <= S;
        if ((void 0 === n.seq || s || (S = n.seq), y && !s)) {
          let t = ((e, t) => {
            if (
              ("buy" !== e.direction && "sell" !== e.direction) ||
              "number" != typeof e.evm_chain_id ||
              !e.evm_token ||
              !e.amount_in
            )
              return;
            let n = p(e.fee),
              i = p(e.skim_quoted);
            if (void 0 === n || void 0 === i) return;
            let r = e.ts ?? new Date().toISOString();
            return {
              intent_id: t,
              direction: e.direction,
              status: e.status,
              evm_chain_id: e.evm_chain_id,
              evm_token: e.evm_token,
              amount_in: e.amount_in,
              fee: n,
              skim: i,
              min_out: "0",
              matched_in: e.matched_in ?? null,
              amount_out: e.amount_out ?? null,
              deposit_tx: e.deposit_tx ?? null,
              swap_tx: e.settle_tx ?? null,
              payout_tx: e.payout_tx ?? null,
              payout_asset: e.payout_asset ?? null,
              payout_amount: e.payout_amount ?? null,
              fail_reason: e.fail_reason ?? null,
              attempts: 0,
              created_at: r,
              updated_at: r,
              steps: [],
            };
          })(n, e);
          if (
            t &&
            M(t) &&
            ((e) => {
              if ("completed" !== e.status) return !0;
              if ("string" != typeof e.amount_out || 0 === e.amount_out.length)
                return !1;
              if ("sell" !== e.direction) return !0;
              let t =
                  "string" == typeof e.payout_asset &&
                  e.payout_asset.length > 0 &&
                  "string" == typeof e.payout_amount &&
                  e.payout_amount.length > 0,
                n = "string" == typeof e.payout_tx && e.payout_tx.length > 0;
              return t || n;
            })(t)
          )
            return void E.settle(t);
        }
        E.fire();
      });
      let T = () => E.interrupt();
      h?.addEventListener("abort", T, { once: !0 });
      let D = () => {
          (h?.removeEventListener("abort", T), (I || F) && B?.close());
        },
        R = () => {
          if (h?.aborted)
            throw (
              h.reason ??
              new DOMException("The bridge wait was aborted", "AbortError")
            );
        },
        z = (i, r, s, a) => (
          i.status !== a && v?.(i, "push"),
          t.y.info("[bridgeIntentPoll] settled", {
            intent_id: e,
            intent_status: i.status,
            fail_reason: i.fail_reason ?? void 0,
            refused: (0, o.U)(i),
            via: "push",
            settled_from: "event",
            polls: s,
          }),
          g({
            intentId: e,
            fromEvent: i,
            lookup: r,
            reread: () => (0, n.M)(e, { signal: h }),
          }),
          { intent: i, polls: s, settledFrom: "event" }
        ),
        C = async () => {
          let i,
            r = Date.now() + b,
            s = 0,
            a = 0;
          for (;;) {
            R();
            let l = E.eventSettled();
            if (l) return z(l, (0, n.M)(e, { signal: h }), a, i?.status);
            a += 1;
            let d = (0, n.M)(e, { signal: h }),
              _ = await Promise.race([
                d.then(
                  (e) => ({ kind: "row", row: e }),
                  (e) => ({ kind: "error", error: e }),
                ),
                E.settled.then((e) => ({ kind: "event", fromEvent: e })),
              ]);
            if ("event" === _.kind) return z(_.fromEvent, d, a, i?.status);
            if ("error" === _.kind)
              (R(),
                1 === (s += 1) &&
                  t.y.warn("[bridgeIntentPoll] lookup_failed", {
                    intent_id: e,
                    error: c(_.error),
                  }));
            else {
              let n = _.row;
              if ((n.status !== i?.status && v?.(n, E.source), (i = n), M(n)))
                return (
                  t.y.info("[bridgeIntentPoll] settled", {
                    intent_id: e,
                    intent_status: n.status,
                    fail_reason: n.fail_reason ?? void 0,
                    refused: (0, o.U)(n),
                    via: E.source,
                    settled_from: "row",
                    polls: a,
                  }),
                  { intent: n, polls: a, settledFrom: "row" }
                );
            }
            if (Date.now() >= r) throw new u(e, i);
            await E.wait(w);
          }
        };
      try {
        A = await C();
      } catch (e) {
        throw (D(), e);
      }
      D();
      let j = B?.socketOpenMs(),
        q = ((e) => {
          if (!(0, o.a)(e)) return;
          let { payout_asset: t, payout_amount: n, payout_tx: i } = e;
          if (
            "string" == typeof t &&
            "string" == typeof n &&
            "string" == typeof i &&
            0 !== i.length
          )
            return { asset: t, amount: n, payoutTx: i };
        })(A.intent);
      return {
        intent: A.intent,
        settledFrom: A.settledFrom,
        polls: A.polls,
        pushes: $,
        waitMs: performance.now() - P,
        via: E.source,
        ...(void 0 === j ? {} : { socketOpenMs: j }),
        ...(void 0 === q ? {} : { provisionalPayout: q }),
      };
    };
  e.s(["F", 0, u, "Q", 0, (e) => e instanceof u, "H", 0, y]);
};
