// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(183249),
    n = e.i(470083),
    i = e.i(613677),
    r = e.i(342463),
    s = e.i(319440),
    o = e.i(637782),
    a = e.i(169119),
    l = e.i(866890),
    d = e.i(727464),
    u = e.i(896342),
    c = e.i(526317);
  let _ = /^\d+$/,
    m = new Set(["swap_deposited", "paying_out", "completed"]),
    p = (e) => "string" == typeof e && _.test(e) && BigInt(e) > BigInt(0),
    f = (e) =>
      "awaiting_user_swap" === e.status &&
      "string" == typeof e.fail_reason &&
      e.fail_reason.length > 0,
    g = (e) => e.split(":")[0]?.trim() ?? e,
    y = (e) => "sell" === e.direction && m.has(e.status) && p(e.matched_in),
    h = (e) =>
      "sell" === e.direction &&
      "paying_out" === e.status &&
      "string" == typeof e.payout_asset &&
      e.payout_asset.length > 0 &&
      p(e.payout_amount);
  e.s(
    [
      "R",
      0,
      g,
      "Q",
      0,
      (e) => "completed" === e.status,
      "a",
      0,
      h,
      "E",
      0,
      y,
      "U",
      0,
      f,
      "N",
      0,
      (e) =>
        (0, c.w)(e.intent.status) ||
        f(e.intent) ||
        (({ intent: e, direction: t, payoutDenomination: n }) =>
          "sell" === t && ("sol" === n ? h(e) : y(e)))(e),
    ],
    192098,
  );
  let v = /^\d+$/;
  class w extends Error {
    constructor(e) {
      (super(e), (this.name = "BridgeTypedDataError"));
    }
  }
  let b = i.z.object({ name: r.z.string(), type: r.z.string() }),
    I = r.z.string().refine((e) => (0, n.f)(e)),
    k = i.z.object({
      domain: i.z.object({
        name: r.z.string().optional(),
        version: r.z.string().optional(),
        chainId: s.z.union([o.z.number(), r.z.string()]).optional(),
        verifyingContract: r.z.string().optional(),
        salt: I.optional(),
      }),
      types: a.z.record(r.z.string(), l.z.array(b)),
      primaryType: r.z.string(),
      message: a.z.record(r.z.string(), d.z.unknown()),
    }),
    x = /^(address|bool|string|bytes\d*|u?int\d*)(\[\d*\])*$/,
    S = (e, t) => e.toLowerCase() === t.toLowerCase(),
    A = new Set([
      "quote_stale",
      "min_out_below_floor",
      "stale_authorization",
      "batch_rejected",
    ]),
    P = new Set(["quote_stale", "min_out_below_floor"]),
    E = 5e3,
    B = 1e3,
    F = (e, t) =>
      new Promise((n, i) => {
        if (t?.aborted) return void i(t.reason);
        let r = setTimeout(() => {
            (t?.removeEventListener("abort", s), n());
          }, e),
          s = () => {
            (clearTimeout(r), i(t?.reason));
          };
        t?.addEventListener("abort", s, { once: !0 });
      }),
    M = async ({
      intentId: e,
      signal: t,
      getIntent: n = u.M,
      pollMs: i = B,
      timeoutMs: r = E,
      now: s = () => performance.now(),
    }) => {
      let o = s() + r;
      for (;;) {
        let r;
        try {
          r = await n(e, { signal: t });
        } catch (e) {
          if (t?.aborted) throw e;
          r = void 0;
        }
        if (void 0 !== r) {
          if ("awaiting_user_swap" !== r.status)
            return { kind: "taken", intent: r };
          if (f(r))
            return { kind: "refused", code: g(r.fail_reason ?? ""), intent: r };
        }
        if (s() >= o) return { kind: "unsent" };
        await F(Math.min(i, Math.max(0, o - s())), t);
      }
    },
    $ = (e) => (null != e && v.test(e) ? BigInt(e) : null),
    T = ({ units: e, settlementAsset: t, settlementUsdPrice: n }) =>
      "usdc" === t
        ? e.toString()
        : !Number.isFinite(n) || n <= 0
          ? "0"
          : String(Math.floor((Number(e) / 1e6 / n) * 1e9)),
    D = {
      balance_changed: "balance_changed",
      held: "bridge_intent_held",
      token_unsellable: "token_unsellable",
    },
    R = {
      slippage: "slippage",
      refused: "bridge_execute_failed",
      unsent: "bridge_execute_failed",
    },
    z = new WeakSet();
  e.s(
    [
      "Z",
      0,
      2,
      "$",
      0,
      P,
      "U",
      0,
      class extends Error {
        outcome;
        reason;
        intentId;
        code;
        status;
        attempts;
        constructor(e, t, n) {
          (super(t),
            (this.name = "BridgeSellExecuteError"),
            (this.outcome = e),
            (this.reason = R[e]),
            (this.intentId = n.intentId),
            (this.code = n.code),
            (this.status = n.status),
            (this.attempts = n.attempts),
            (this.cause = n.cause));
        }
      },
      "d",
      0,
      class extends Error {
        outcome;
        reason;
        intentId;
        constructor(e, t, n = {}) {
          (super(t),
            (this.name = "BridgeSellTerminalError"),
            (this.outcome = e),
            (this.reason = D[e]),
            (this.intentId = n.intentId),
            (this.cause = n.cause));
        }
      },
      "_",
      0,
      (e) => ((e ?? "sol") === "usdc" ? "stable" : "sol"),
      "O",
      0,
      ({
        intentId: e,
        quote: t,
        amountIn: n,
        settlementAsset: i,
        settlementUsdPrice: r,
      }) => {
        let s =
            ((e) => {
              let t = $(e.expected_out);
              if (null === t) return null;
              let n =
                Number.isInteger(e.skim) && e.skim > 0
                  ? BigInt(e.skim)
                  : BigInt(0);
              return t > n ? t - n : BigInt(0);
            })(t) ?? BigInt(0),
          o = $(t.min_out) ?? BigInt(0),
          a =
            Number.isInteger(t.skim) && t.skim > 0 ? BigInt(t.skim) : BigInt(0),
          l = o > a ? o - a : BigInt(0),
          d = Date.parse(t.expires_at);
        return {
          fromAmount: n,
          toAmount: T({ units: s, settlementAsset: i, settlementUsdPrice: r }),
          toAmountMin: T({
            units: l,
            settlementAsset: i,
            settlementUsdPrice: r,
          }),
          toAmountUsd: (Number(s) / 1e6).toString(),
          fees: { protocol: String(t.skim), total: String(t.skim) },
          transactions: [],
          provider: "internal_bridge",
          expiresAt: Number.isFinite(d) ? d : 0,
          quoteId: e,
        };
      },
      "C",
      0,
      ({
        solanaWallet: e,
        evmWallet: t,
        chainId: n,
        mint: i,
        amountAtomic: r,
        slippageBps: s,
        payoutDenomination: o,
      }) => {
        let a = ((e) => {
          if (void 0 !== e && Number.isFinite(e) && !(e <= 0) && !(e >= 1e4))
            return Math.max(Math.floor(e), 300);
        })(s);
        return {
          solana_wallet: e,
          evm_wallet: t,
          direction: "sell",
          evm_chain_id: n,
          evm_token: i,
          amount_in: r.toString(),
          ...(void 0 === a ? {} : { slippage_bps: a }),
          ...("sol" === o ? { payout_denomination: "sol" } : {}),
        };
      },
      "V",
      0,
      (e) => !(0, c.v)(e) || void 0 === e.code,
      "Y",
      0,
      (e) => void 0 !== e && A.has(e),
      "b",
      0,
      (e) => "object" == typeof e && null !== e && z.has(e),
      "W",
      0,
      (e) => ("object" == typeof e && null !== e && z.add(e), e),
      "q",
      0,
      ({ unsigned: e, expectedWallet: n }) => {
        let i, r;
        if (!S(e.wallet, n))
          throw new w("sell intent batch is for a different wallet");
        let s = k.safeParse(e.typed_data);
        if (!s.success)
          throw new w(
            `malformed bridge typed_data: ${s.error.issues.map((e) => e.path.join(".")).join(", ")}`,
          );
        let { domain: o, types: a, primaryType: l, message: d } = s.data;
        if (void 0 !== o.verifyingContract) {
          try {
            i = (0, t.A)(o.verifyingContract);
          } catch {
            throw new w(
              "bridge typed_data verifyingContract is not an address",
            );
          }
          if (!S(i, n))
            throw new w(
              "bridge typed_data verifyingContract is not the seller's wallet",
            );
        }
        if (void 0 !== o.chainId) {
          if (!Number.isSafeInteger((r = Number(o.chainId))) || r <= 0)
            throw new w("bridge typed_data chainId is invalid");
          if (r !== e.chain_id)
            throw new w(
              "bridge typed_data chainId does not match the batch's chain",
            );
        }
        if (!(l in a))
          throw new w(`bridge typed_data primaryType ${l} is not in types`);
        if (!Object.keys(a).every((e) => !x.test(e)))
          throw new w("bridge typed_data names a primitive type as a struct");
        return {
          domain: {
            name: o.name,
            version: o.version,
            chainId: r,
            verifyingContract: i,
            salt: o.salt,
          },
          types: a,
          primaryType: l,
          message: d,
        };
      },
      "S",
      0,
      M,
      "L",
      0,
      (e) => {
        if ("number" != typeof e.yParity)
          throw Error("7702 authorization signature has no yParity");
        return {
          chain_id: e.chainId,
          address: e.address,
          nonce: e.nonce,
          y_parity: e.yParity,
          r: e.r,
          s: e.s,
        };
      },
    ],
    51121,
  );
};
