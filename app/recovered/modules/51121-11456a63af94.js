// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(183249),
    n = e.i(470083),
    r = e.i(613677),
    i = e.i(342463),
    s = e.i(319440),
    o = e.i(637782),
    a = e.i(169119),
    l = e.i(866890),
    u = e.i(727464),
    d = e.i(896342),
    c = e.i(526317);
  let f = /^\d+$/,
    m = new Set(["swap_deposited", "paying_out", "completed"]),
    p = (e) => "string" == typeof e && f.test(e) && BigInt(e) > BigInt(0),
    _ = (e) =>
      "awaiting_user_swap" === e.status &&
      "string" == typeof e.fail_reason &&
      e.fail_reason.length > 0,
    g = (e) => e.split(":")[0]?.trim() ?? e,
    h = (e) => "sell" === e.direction && m.has(e.status) && p(e.matched_in),
    v = (e) =>
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
      v,
      "E",
      0,
      h,
      "U",
      0,
      _,
      "N",
      0,
      (e) =>
        (0, c.w)(e.intent.status) ||
        _(e.intent) ||
        (({ intent: e, direction: t, payoutDenomination: n }) =>
          "sell" === t && ("sol" === n ? v(e) : h(e)))(e),
    ],
    192098,
  );
  let y = /^\d+$/;
  class w extends Error {
    constructor(e) {
      (super(e), (this.name = "BridgeTypedDataError"));
    }
  }
  let b = r.z.object({ name: i.z.string(), type: i.z.string() }),
    I = i.z.string().refine((e) => (0, n.f)(e)),
    k = r.z.object({
      domain: r.z.object({
        name: i.z.string().optional(),
        version: i.z.string().optional(),
        chainId: s.z.union([o.z.number(), i.z.string()]).optional(),
        verifyingContract: i.z.string().optional(),
        salt: I.optional(),
      }),
      types: a.z.record(i.z.string(), l.z.array(b)),
      primaryType: i.z.string(),
      message: a.z.record(i.z.string(), u.z.unknown()),
    }),
    x = /^(address|bool|string|bytes\d*|u?int\d*)(\[\d*\])*$/,
    S = (e, t) => e.toLowerCase() === t.toLowerCase(),
    A = new Set([
      "quote_stale",
      "min_out_below_floor",
      "stale_authorization",
      "batch_rejected",
    ]),
    E = new Set(["quote_stale", "min_out_below_floor"]),
    R = 5e3,
    M = 1e3,
    P = (e, t) =>
      new Promise((n, r) => {
        if (t?.aborted) return void r(t.reason);
        let i = setTimeout(() => {
            (t?.removeEventListener("abort", s), n());
          }, e),
          s = () => {
            (clearTimeout(i), r(t?.reason));
          };
        t?.addEventListener("abort", s, { once: !0 });
      }),
    D = async ({
      intentId: e,
      signal: t,
      getIntent: n = d.M,
      pollMs: r = M,
      timeoutMs: i = R,
      now: s = () => performance.now(),
    }) => {
      let o = s() + i;
      for (;;) {
        let i;
        try {
          i = await n(e, { signal: t });
        } catch (e) {
          if (t?.aborted) throw e;
          i = void 0;
        }
        if (void 0 !== i) {
          if ("awaiting_user_swap" !== i.status)
            return { kind: "taken", intent: i };
          if (_(i))
            return { kind: "refused", code: g(i.fail_reason ?? ""), intent: i };
        }
        if (s() >= o) return { kind: "unsent" };
        await P(Math.min(r, Math.max(0, o - s())), t);
      }
    },
    T = (e) => (null != e && y.test(e) ? BigInt(e) : null),
    $ = ({ units: e, settlementAsset: t, settlementUsdPrice: n }) =>
      "usdc" === t
        ? e.toString()
        : !Number.isFinite(n) || n <= 0
          ? "0"
          : String(Math.floor((Number(e) / 1e6 / n) * 1e9)),
    F = {
      balance_changed: "balance_changed",
      held: "bridge_intent_held",
      token_unsellable: "token_unsellable",
    },
    q = {
      slippage: "slippage",
      refused: "bridge_execute_failed",
      unsent: "bridge_execute_failed",
    },
    B = new WeakSet();
  e.s(
    [
      "Z",
      0,
      2,
      "$",
      0,
      E,
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
            (this.reason = q[e]),
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
            (this.reason = F[e]),
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
        settlementAsset: r,
        settlementUsdPrice: i,
      }) => {
        let s =
            ((e) => {
              let t = T(e.expected_out);
              if (null === t) return null;
              let n =
                Number.isInteger(e.skim) && e.skim > 0
                  ? BigInt(e.skim)
                  : BigInt(0);
              return t > n ? t - n : BigInt(0);
            })(t) ?? BigInt(0),
          o = T(t.min_out) ?? BigInt(0),
          a =
            Number.isInteger(t.skim) && t.skim > 0 ? BigInt(t.skim) : BigInt(0),
          l = o > a ? o - a : BigInt(0),
          u = Date.parse(t.expires_at);
        return {
          fromAmount: n,
          toAmount: $({ units: s, settlementAsset: r, settlementUsdPrice: i }),
          toAmountMin: $({
            units: l,
            settlementAsset: r,
            settlementUsdPrice: i,
          }),
          toAmountUsd: (Number(s) / 1e6).toString(),
          fees: { protocol: String(t.skim), total: String(t.skim) },
          transactions: [],
          provider: "internal_bridge",
          expiresAt: Number.isFinite(u) ? u : 0,
          quoteId: e,
        };
      },
      "C",
      0,
      ({
        solanaWallet: e,
        evmWallet: t,
        chainId: n,
        mint: r,
        amountAtomic: i,
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
          evm_token: r,
          amount_in: i.toString(),
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
      (e) => "object" == typeof e && null !== e && B.has(e),
      "W",
      0,
      (e) => ("object" == typeof e && null !== e && B.add(e), e),
      "q",
      0,
      ({ unsigned: e, expectedWallet: n }) => {
        let r, i;
        if (!S(e.wallet, n))
          throw new w("sell intent batch is for a different wallet");
        let s = k.safeParse(e.typed_data);
        if (!s.success)
          throw new w(
            `malformed bridge typed_data: ${s.error.issues.map((e) => e.path.join(".")).join(", ")}`,
          );
        let { domain: o, types: a, primaryType: l, message: u } = s.data;
        if (void 0 !== o.verifyingContract) {
          try {
            r = (0, t.A)(o.verifyingContract);
          } catch {
            throw new w(
              "bridge typed_data verifyingContract is not an address",
            );
          }
          if (!S(r, n))
            throw new w(
              "bridge typed_data verifyingContract is not the seller's wallet",
            );
        }
        if (void 0 !== o.chainId) {
          if (!Number.isSafeInteger((i = Number(o.chainId))) || i <= 0)
            throw new w("bridge typed_data chainId is invalid");
          if (i !== e.chain_id)
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
            chainId: i,
            verifyingContract: r,
            salt: o.salt,
          },
          types: a,
          primaryType: l,
          message: u,
        };
      },
      "S",
      0,
      D,
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
