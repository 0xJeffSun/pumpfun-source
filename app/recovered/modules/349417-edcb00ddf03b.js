// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(613677),
    n = e.i(637782),
    r = e.i(297865),
    i = e.i(342463),
    a = e.i(866890),
    s = e.i(418096),
    l = e.i(169119),
    o = e.i(727464),
    u = e.i(609926),
    c = e.i(313017),
    d = e.i(503630),
    m = e.i(992829),
    f = e.i(22675),
    p = e.i(371047),
    g = e.i(233404),
    h = e.i(25572);
  let v = ({ transactions: e, prep_transaction: t, transaction: n }) =>
      e?.length === 2
        ? { prep: e[0], main: e[1] }
        : e?.length === 1
          ? { prep: void 0, main: e[0] }
          : { prep: t, main: n },
    b = t.z.object({
      required_atomic: n.z.number().optional(),
      gas_reserve_atomic: n.z.number().optional(),
      account_rent_atomic: n.z.number().optional(),
      ata_creations: n.z.number().optional(),
      user_volume_accumulator_needed: r.z.boolean().optional(),
      input_balance_atomic: n.z.number().optional(),
    }),
    y = t.z.object({
      transaction: i.z.string(),
      prep_transaction: i.z.string().optional(),
      transactions: a.z
        .array(i.z.string())
        .nullish()
        .catch(void 0),
      venue: s.z.enum(["bonding_curve", "pump_swap", "jupiter"]),
      amount_out: t.z.object({ ui: n.z.number(), atomic: n.z.number() }),
      min_amount_out: t.z.object({ ui: n.z.number(), atomic: n.z.number() }),
      slippage_bps: n.z.number(),
      insufficient_funds: r.z.boolean(),
      price_impact: n.z.number().nullish(),
      network_fees: n.z.number().int().nonnegative().nullish(),
      network_fee_denomination: s.z.enum(["sol", "usdc"]).nullish(),
      clamped_amount_in: n.z.number().optional(),
      transfer_fee_bps: n.z.number().int().nonnegative().nullish(),
      route: i.z.string().nullish(),
      options_for_send: l.z.record(i.z.string(), o.z.unknown()).nullish(),
      partial_sign: r.z.boolean().default(!1),
      tip_lamports: n.z
        .number()
        .int()
        .nonnegative()
        .nullish()
        .catch(void 0),
      user_states: b.nullish().catch(void 0),
      referral_fee: t.z
        .object({ kind: s.z.enum(["protocol", "referrer"]) })
        .nullish()
        .catch(null),
    }),
    _ = (e) =>
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
    w = (e) => {
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
    x = { reasonCode: null, retryable: void 0 },
    S = (e) => {
      let t;
      if (null === e) return x;
      try {
        t = JSON.parse(e);
      } catch {
        return x;
      }
      if (!t || "object" != typeof t) return x;
      let n = t.data;
      if (!n || "object" != typeof n) return x;
      let { reason: r, retryable: i } = n;
      return {
        reasonCode: "string" == typeof r ? r : null,
        retryable: "boolean" == typeof i ? i : void 0,
      };
    },
    A = (e) => {
      let t = e.match(
        /^\S+ unexpected response: status \d+[^{]*(\{[\s\S]*\})\s*$/,
      );
      if (!t) return e;
      let n = w(t[1]);
      return n && n !== t[1] ? n : e;
    };
  async function k(e, t = {}) {
    let { signal: n, retries: r = 1 } = t,
      i = (0, d.t)().replace(/\/+$/, ""),
      a = `${i}/transactions/swap-build`,
      s = (0, h.n)(e.user),
      l = "network error";
    for (let t = 0; t <= r; t++) {
      let i, o, d, h;
      t > 0 && (await new Promise((e) => setTimeout(e, 600 * 2 ** (t - 1))));
      try {
        i = await fetch(a, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(0, p.c)(),
            ...(0, c.z)(),
          },
          body: JSON.stringify(
            (0, g.Y)({ ...e, ...s, has_support_for_sending_options: !0 }),
          ),
          signal: n ?? AbortSignal.timeout(6e4),
        });
      } catch (e) {
        if (n?.aborted) throw e;
        l = e instanceof Error ? e.message : "network error";
        continue;
      }
      if (!i.ok) {
        let e = await i.text().catch(() => null),
          n = w(e);
        if (n === u.R) return { kind: "insufficient_funds" };
        let { reasonCode: a, retryable: s } = S(e),
          o = (0, m.D)({ status: i.status, message: n, reasonCode: a }),
          c = n ? A(n) : `request failed (${i.status})`;
        if ("unauthenticated" === o)
          return { kind: "unauthenticated", message: c };
        if ((0, m.n)(o)) return { kind: "expected", reason: o, message: c };
        if (i.status >= 500 && !1 !== s && t < r) {
          l = c;
          continue;
        }
        return { kind: "error", message: c, status: i.status };
      }
      try {
        o = await i.json();
      } catch {
        return { kind: "error", message: "invalid JSON response" };
      }
      let b = y.safeParse(o);
      if (!b.success)
        return { kind: "error", message: "unexpected response shape" };
      if (b.data.insufficient_funds)
        return {
          kind: "insufficient_funds",
          userStates: _(b.data.user_states),
        };
      let x = v(b.data);
      try {
        ((d = (0, f.m)(x.main)), (h = x.prep ? (0, f.m)(x.prep) : void 0));
      } catch {
        return { kind: "error", message: "could not decode built transaction" };
      }
      let k =
        null != b.data.network_fees && null != b.data.network_fee_denomination
          ? {
              atomicAmount: b.data.network_fees,
              denomination: b.data.network_fee_denomination,
            }
          : null;
      return {
        kind: "ok",
        data: {
          transaction: d,
          prepTransaction: h,
          venue: b.data.venue,
          amountOut: {
            ui: b.data.amount_out.ui,
            atomic: b.data.amount_out.atomic,
          },
          minAmountOut: {
            ui: b.data.min_amount_out.ui,
            atomic: b.data.min_amount_out.atomic,
          },
          slippageBps: b.data.slippage_bps,
          priceImpact: b.data.price_impact ?? null,
          networkFee: k,
          clampedAmountIn: b.data.clamped_amount_in,
          transferFeeBps: b.data.transfer_fee_bps ?? null,
          tipLamports: b.data.tip_lamports ?? null,
          userStates: _(b.data.user_states),
          route: b.data.route ?? void 0,
          optionsForSend: b.data.options_for_send ?? void 0,
          partialSign: b.data.partial_sign,
          referralFeeKind: b.data.referral_fee?.kind ?? null,
        },
      };
    }
    return { kind: "error", message: l };
  }
  e.s(
    [
      "y",
      0,
      k,
      "d",
      0,
      (e) => (e <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(e) : e.toString()),
    ],
    349417,
  );
  var j = e.i(445242),
    I = e.i(426091),
    B = e.i(78436),
    E = e.i(634103);
  let $ = (0, B.$)()(
    (0, E.V)(
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
        storage: (0, E.j)(() => localStorage),
        partialize: (e) => ({ wallets: e.wallets }),
      },
    ),
  );
  function N(e) {
    return e.wallets;
  }
  e.s(
    [
      "R",
      0,
      () => {
        $.getState().recordFailure((0, I.Y)());
      },
      "o",
      0,
      () => {
        let e,
          t = (0, j.c)(2),
          n = $(N);
        if (0 === n.length) return !1;
        if (t[0] !== n) {
          let r = (0, I.Y)()?.trim().toLowerCase();
          ((e = !!r && n.includes(r)), (t[0] = n), (t[1] = e));
        } else e = t[1];
        return e;
      },
    ],
    102250,
  );
};
