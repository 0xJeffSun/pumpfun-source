// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(613677),
    n = e.i(637782),
    r = e.i(297865),
    s = e.i(342463),
    a = e.i(866890),
    i = e.i(418096),
    o = e.i(169119),
    l = e.i(727464),
    c = e.i(609926),
    u = e.i(313017),
    d = e.i(503630),
    m = e.i(992829),
    p = e.i(22675),
    f = e.i(371047),
    g = e.i(233404),
    _ = e.i(25572);
  let b = ({ transactions: e, prep_transaction: t, transaction: n }) =>
      e?.length === 2
        ? { prep: e[0], main: e[1] }
        : e?.length === 1
          ? { prep: void 0, main: e[0] }
          : { prep: t, main: n },
    h = t.z.object({
      required_atomic: n.z.number().optional(),
      gas_reserve_atomic: n.z.number().optional(),
      account_rent_atomic: n.z.number().optional(),
      ata_creations: n.z.number().optional(),
      user_volume_accumulator_needed: r.z.boolean().optional(),
      input_balance_atomic: n.z.number().optional(),
    }),
    w = t.z.object({
      transaction: s.z.string(),
      prep_transaction: s.z.string().optional(),
      transactions: a.z
        .array(s.z.string())
        .nullish()
        .catch(void 0),
      venue: i.z.enum(["bonding_curve", "pump_swap", "jupiter"]),
      amount_out: t.z.object({ ui: n.z.number(), atomic: n.z.number() }),
      min_amount_out: t.z.object({ ui: n.z.number(), atomic: n.z.number() }),
      slippage_bps: n.z.number(),
      insufficient_funds: r.z.boolean(),
      price_impact: n.z.number().nullish(),
      network_fees: n.z.number().int().nonnegative().nullish(),
      network_fee_denomination: i.z.enum(["sol", "usdc"]).nullish(),
      clamped_amount_in: n.z.number().optional(),
      transfer_fee_bps: n.z.number().int().nonnegative().nullish(),
      route: s.z.string().nullish(),
      options_for_send: o.z.record(s.z.string(), l.z.unknown()).nullish(),
      partial_sign: r.z.boolean().default(!1),
      tip_lamports: n.z
        .number()
        .int()
        .nonnegative()
        .nullish()
        .catch(void 0),
      user_states: h.nullish().catch(void 0),
      referral_fee: t.z
        .object({ kind: i.z.enum(["protocol", "referrer"]) })
        .nullish()
        .catch(null),
    }),
    y = (e) =>
      e
        ? {
            requiredAtomic: e.required_atomic,
            gasReserveAtomic: e.gas_reserve_atomic,
            accountRentAtomic: e.account_rent_atomic,
            ataCreations: e.ata_creations,
            userVolumeAccumulatorNeeded: e.user_volume_accumulator_needed,
            inputBalanceAtomic: e.input_balance_atomic,
          }
        : void 0,
    j = (e) => {
      let t;
      if (null === e) return null;
      let n = e.trim();
      if (!n) return null;
      try {
        t = JSON.parse(n);
      } catch {
        return n;
      }
      if (!t || "object" != typeof t) return n;
      let r = t;
      return "string" == typeof r.message
        ? r.message
        : Array.isArray(r.message)
          ? r.message.join(", ")
          : "string" == typeof r.error
            ? r.error
            : n;
    },
    v = { reasonCode: null, retryable: void 0 },
    x = (e) => {
      let t;
      if (null === e) return v;
      try {
        t = JSON.parse(e);
      } catch {
        return v;
      }
      if (!t || "object" != typeof t) return v;
      let n = t.data;
      if (!n || "object" != typeof n) return v;
      let { reason: r, retryable: s } = n;
      return {
        reasonCode: "string" == typeof r ? r : null,
        retryable: "boolean" == typeof s ? s : void 0,
      };
    },
    k = (e) => {
      let t = e.match(
        /^\S+ unexpected response: status \d+[^{]*(\{[\s\S]*\})\s*$/,
      );
      if (!t) return e;
      let n = j(t[1]);
      return n && n !== t[1] ? n : e;
    };
  async function S(e, t = {}) {
    let { signal: n, retries: r = 1 } = t,
      s = (0, d.t)().replace(/\/+$/, ""),
      a = `${s}/transactions/swap-build`,
      i = (0, _.n)(e.user),
      o = "network error";
    for (let t = 0; t <= r; t++) {
      let s, l, d, _;
      t > 0 && (await new Promise((e) => setTimeout(e, 600 * 2 ** (t - 1))));
      try {
        s = await fetch(a, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(0, f.c)(),
            ...(0, u.z)(),
          },
          body: JSON.stringify(
            (0, g.Y)({ ...e, ...i, has_support_for_sending_options: !0 }),
          ),
          signal: n ?? AbortSignal.timeout(6e4),
        });
      } catch (e) {
        if (n?.aborted) throw e;
        o = e instanceof Error ? e.message : "network error";
        continue;
      }
      if (!s.ok) {
        let e = await s.text().catch(() => null),
          n = j(e);
        if (n === c.R) return { kind: "insufficient_funds" };
        let { reasonCode: a, retryable: i } = x(e),
          l = (0, m.D)({ status: s.status, message: n, reasonCode: a }),
          u = n ? k(n) : `request failed (${s.status})`;
        if ("unauthenticated" === l)
          return { kind: "unauthenticated", message: u };
        if ((0, m.n)(l)) return { kind: "expected", reason: l, message: u };
        if (s.status >= 500 && !1 !== i && t < r) {
          o = u;
          continue;
        }
        return { kind: "error", message: u, status: s.status };
      }
      try {
        l = await s.json();
      } catch {
        return { kind: "error", message: "invalid JSON response" };
      }
      let h = w.safeParse(l);
      if (!h.success)
        return { kind: "error", message: "unexpected response shape" };
      if (h.data.insufficient_funds)
        return {
          kind: "insufficient_funds",
          userStates: y(h.data.user_states),
        };
      let v = b(h.data);
      try {
        ((d = (0, p.m)(v.main)), (_ = v.prep ? (0, p.m)(v.prep) : void 0));
      } catch {
        return { kind: "error", message: "could not decode built transaction" };
      }
      let S =
        null != h.data.network_fees && null != h.data.network_fee_denomination
          ? {
              atomicAmount: h.data.network_fees,
              denomination: h.data.network_fee_denomination,
            }
          : null;
      return {
        kind: "ok",
        data: {
          transaction: d,
          prepTransaction: _,
          venue: h.data.venue,
          amountOut: {
            ui: h.data.amount_out.ui,
            atomic: h.data.amount_out.atomic,
          },
          minAmountOut: {
            ui: h.data.min_amount_out.ui,
            atomic: h.data.min_amount_out.atomic,
          },
          slippageBps: h.data.slippage_bps,
          priceImpact: h.data.price_impact ?? null,
          networkFee: S,
          clampedAmountIn: h.data.clamped_amount_in,
          transferFeeBps: h.data.transfer_fee_bps ?? null,
          tipLamports: h.data.tip_lamports ?? null,
          userStates: y(h.data.user_states),
          route: h.data.route ?? void 0,
          optionsForSend: h.data.options_for_send ?? void 0,
          partialSign: h.data.partial_sign,
          referralFeeKind: h.data.referral_fee?.kind ?? null,
        },
      };
    }
    return { kind: "error", message: o };
  }
  e.s(
    [
      "y",
      0,
      S,
      "d",
      0,
      (e) => (e <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(e) : e.toString()),
    ],
    349417,
  );
  var z = e.i(445242),
    $ = e.i(426091),
    A = e.i(78436),
    I = e.i(634103);
  let O = (0, A.$)()(
    (0, I.V)(
      (e, t) => ({
        wallets: [],
        recordFailure: (n) => {
          let r = n?.trim().toLowerCase();
          !r || t().wallets.includes(r) || e({ wallets: [...t().wallets, r] });
        },
      }),
      {
        name: "wallet-sponsored-signing",
        version: 1,
        migrate: () => ({ wallets: [] }),
        storage: (0, I.j)(() => localStorage),
        partialize: (e) => ({ wallets: e.wallets }),
      },
    ),
  );
  function T(e) {
    return e.wallets;
  }
  e.s(
    [
      "R",
      0,
      () => {
        O.getState().recordFailure((0, $.Y)());
      },
      "o",
      0,
      () => {
        let e,
          t = (0, z.c)(2),
          n = O(T);
        if (0 === n.length) return !1;
        if (t[0] !== n) {
          let r = (0, $.Y)()?.trim().toLowerCase();
          ((e = !!r && n.includes(r)), (t[0] = n), (t[1] = e));
        } else e = t[1];
        return e;
      },
    ],
    102250,
  );
};
