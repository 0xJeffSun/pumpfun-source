// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    n = e.i(896342),
    r = e.i(618119),
    i = e.i(203941),
    s = e.i(486813),
    o = e.i(192098),
    a = e.i(526317);
  let l = 1500,
    u = 18e4;
  class d extends Error {
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
  class f {
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
    _ = (e, t) =>
      ((0, a.w)(e.status) && !(0, a.w)(t.status)) ||
      ((0, o.U)(e) && !(0, o.U)(t)),
    g = async ({ intentId: e, fromEvent: n, lookup: r, reread: i }) => {
      let o;
      try {
        ((o = await r), _(n, o) && (o = await i()));
      } catch (r) {
        t.y.warn("[bridgeIntentPoll] event_settle_reconcile_failed", {
          intent_id: e,
          event_status: n.status,
          error: c(r),
        });
        return;
      }
      if (_(n, o))
        return void t.y.warn("[bridgeIntentPoll] event_settle_row_behind", {
          intent_id: e,
          event_status: n.status,
          row_status: o.status,
        });
      let l = (0, a.w)(n.status) && (0, a.w)(o.status) && o.status !== n.status,
        u =
          null != n.amount_out &&
          null != o.amount_out &&
          n.amount_out !== o.amount_out;
      if (l || u) {
        let r = {
          intent_id: e,
          event_status: n.status,
          row_status: o.status,
          event_amount_out: n.amount_out ?? void 0,
          row_amount_out: o.amount_out ?? void 0,
        };
        (t.y.warn("[bridgeIntentPoll] event_settle_diverged", r),
          (0, s.f)({
            error: Error(
              `bridge event settle diverged: event ${n.status} vs row ${o.status}`,
            ),
            operation: "event-settle-diverged",
            context: r,
          }));
        return;
      }
      t.y.info("[bridgeIntentPoll] event_settle_reconciled", {
        intent_id: e,
        event_status: n.status,
        row_status: o.status,
      });
    },
    h = async ({
      intentId: e,
      direction: s,
      payoutDenomination: m,
      feed: _,
      settleFromEvent: h = !0,
      signal: v,
      onIntent: y,
      intervalMs: w = l,
      timeoutMs: b = u,
      closeFeed: I = !0,
      until: k,
    }) => {
      let x,
        S,
        A,
        E = performance.now(),
        R = new f(),
        M =
          void 0 === _
            ? ((0, i.o)() ?? (0, r.r)())
            : null === _ || _.live?.() !== !1
              ? _
              : (_.close(), (0, i.o)() ?? (0, r.r)()),
        P = M !== _,
        D = (e) =>
          (0, o.N)({ intent: e, direction: s, payoutDenomination: m }) ||
          (void 0 !== k && k(e)),
        T = 0;
      M?.listen((n) => {
        if (!(0, a.C)(n.intent_id, e)) return;
        T += 1;
        let r = n.fail_reason ?? void 0,
          i = `${n.status}|${r ?? ""}`;
        i !== x &&
          ((x = i),
          t.y.info("[bridgeIntentPoll] push_event", {
            intent_id: e,
            intent_status: n.status,
            fail_reason: r,
            seq: n.seq,
            provisional: n.provisional ?? void 0,
          }));
        let s = void 0 !== n.seq && void 0 !== S && n.seq <= S;
        if ((void 0 === n.seq || s || (S = n.seq), h && !s)) {
          let t = ((e, t) => {
            if (
              ("buy" !== e.direction && "sell" !== e.direction) ||
              "number" != typeof e.evm_chain_id ||
              !e.evm_token ||
              !e.amount_in
            )
              return;
            let n = p(e.fee),
              r = p(e.skim_quoted);
            if (void 0 === n || void 0 === r) return;
            let i = e.ts ?? new Date().toISOString();
            return {
              intent_id: t,
              direction: e.direction,
              status: e.status,
              evm_chain_id: e.evm_chain_id,
              evm_token: e.evm_token,
              amount_in: e.amount_in,
              fee: n,
              skim: r,
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
              created_at: i,
              updated_at: i,
              steps: [],
            };
          })(n, e);
          if (
            t &&
            D(t) &&
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
            return void R.settle(t);
        }
        R.fire();
      });
      let $ = () => R.interrupt();
      v?.addEventListener("abort", $, { once: !0 });
      let F = () => {
          (v?.removeEventListener("abort", $), (I || P) && M?.close());
        },
        q = () => {
          if (v?.aborted)
            throw (
              v.reason ??
              new DOMException("The bridge wait was aborted", "AbortError")
            );
        },
        B = (r, i, s, a) => (
          r.status !== a && y?.(r, "push"),
          t.y.info("[bridgeIntentPoll] settled", {
            intent_id: e,
            intent_status: r.status,
            fail_reason: r.fail_reason ?? void 0,
            refused: (0, o.U)(r),
            via: "push",
            settled_from: "event",
            polls: s,
          }),
          g({
            intentId: e,
            fromEvent: r,
            lookup: i,
            reread: () => (0, n.M)(e, { signal: v }),
          }),
          { intent: r, polls: s, settledFrom: "event" }
        ),
        C = async () => {
          let r,
            i = Date.now() + b,
            s = 0,
            a = 0;
          for (;;) {
            q();
            let l = R.eventSettled();
            if (l) return B(l, (0, n.M)(e, { signal: v }), a, r?.status);
            a += 1;
            let u = (0, n.M)(e, { signal: v }),
              f = await Promise.race([
                u.then(
                  (e) => ({ kind: "row", row: e }),
                  (e) => ({ kind: "error", error: e }),
                ),
                R.settled.then((e) => ({ kind: "event", fromEvent: e })),
              ]);
            if ("event" === f.kind) return B(f.fromEvent, u, a, r?.status);
            if ("error" === f.kind)
              (q(),
                1 === (s += 1) &&
                  t.y.warn("[bridgeIntentPoll] lookup_failed", {
                    intent_id: e,
                    error: c(f.error),
                  }));
            else {
              let n = f.row;
              if ((n.status !== r?.status && y?.(n, R.source), (r = n), D(n)))
                return (
                  t.y.info("[bridgeIntentPoll] settled", {
                    intent_id: e,
                    intent_status: n.status,
                    fail_reason: n.fail_reason ?? void 0,
                    refused: (0, o.U)(n),
                    via: R.source,
                    settled_from: "row",
                    polls: a,
                  }),
                  { intent: n, polls: a, settledFrom: "row" }
                );
            }
            if (Date.now() >= i) throw new d(e, r);
            await R.wait(w);
          }
        };
      try {
        A = await C();
      } catch (e) {
        throw (F(), e);
      }
      F();
      let L = M?.socketOpenMs(),
        N = ((e) => {
          if (!(0, o.a)(e)) return;
          let { payout_asset: t, payout_amount: n, payout_tx: r } = e;
          if (
            "string" == typeof t &&
            "string" == typeof n &&
            "string" == typeof r &&
            0 !== r.length
          )
            return { asset: t, amount: n, payoutTx: r };
        })(A.intent);
      return {
        intent: A.intent,
        settledFrom: A.settledFrom,
        polls: A.polls,
        pushes: T,
        waitMs: performance.now() - E,
        via: R.source,
        ...(void 0 === L ? {} : { socketOpenMs: L }),
        ...(void 0 === N ? {} : { provisionalPayout: N }),
      };
    };
  e.s(["F", 0, d, "Q", 0, (e) => e instanceof d, "H", 0, h]);
};
