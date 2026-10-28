// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    n = e.i(439587),
    r = e.i(574472),
    s = e.i(458310),
    l = e.i(352386);
  e.i(12692);
  var a = e.i(398902),
    o = e.i(63289),
    c = e.i(526080),
    d = e.i(436983),
    u = e.i(244501),
    m = e.i(34011),
    p = e.i(924631),
    f = e.i(167958);
  e.i(70833);
  var y = e.i(328242),
    h = e.i(66961),
    g = e.i(144050),
    _ = e.i(695705),
    x = e.i(214618);
  function b(e) {
    o.c.error((0, x.f)(e instanceof Error ? e.message : String(e)));
  }
  var v = e.i(132838),
    U = e.i(606933),
    w = e.i(777887),
    P = e.i(426091),
    j = e.i(971370),
    S = e.i(635234);
  class k extends Error {
    requiredSol;
    constructor(e, t) {
      (super(e),
        (this.name = "InsufficientSolForOrderError"),
        (this.requiredSol = t?.requiredSol));
    }
  }
  let N = new Set([429, 500, 502, 503, 504]),
    L = (e) => {
      if (!(e instanceof S.Z))
        return e instanceof TypeError
          ? { retry: !0, reason: "network" }
          : { retry: !1 };
      let t = e.data;
      return void 0 !== t
        ? !0 === t.retryable
          ? { retry: !0, reason: t.reason ?? "retryable" }
          : { retry: !1 }
        : 400 === e.status && "nonce account not found" === e.message
          ? { retry: !0, reason: "legacy_nonce_not_found" }
          : N.has(e.status)
            ? { retry: !0, reason: `transport_${e.status}` }
            : { retry: !1 };
    };
  var T = e.i(466931),
    O = e.i(252911),
    E = e.i(22675),
    A = e.i(54567),
    C = e.i(449597);
  let M = (e, t, i, n) => {
      (0, T.l)({
        error: i,
        feature: "limit-orders",
        operation: e,
        context: {
          mint: t.mint,
          orderType: t.orderType,
          walletName: (0, P.Y)(),
          ...n,
        },
      });
    },
    K = async (e, t, i) => {
      let { connection: n, signTransaction: r } = t,
        s = new j.PublicKey(e.user),
        l = i.publicKey.toBase58();
      try {
        let t = await n.getBalance(i.publicKey, "confirmed");
        if (t <= 0) return;
        let { blockhash: a, lastValidBlockHeight: o } =
            await n.getLatestBlockhash(),
          c = new j.TransactionMessage({
            payerKey: s,
            recentBlockhash: a,
            instructions: [
              j.SystemProgram.nonceWithdraw({
                noncePubkey: i.publicKey,
                authorizedPubkey: s,
                toPubkey: s,
                lamports: t,
              }),
            ],
          }).compileToV0Message(),
          d = await r(new j.VersionedTransaction(c)),
          u = await n.sendRawTransaction(d.serialize(), { skipPreflight: !1 });
        (await n.confirmTransaction(
          { signature: u, blockhash: a, lastValidBlockHeight: o },
          "confirmed",
        ),
          A.logger.info("[createLimitOrder] nonce_rent_reclaimed", {
            mint: e.mint,
            nonceAccount: l,
            lamports: t,
          }));
      } catch (t) {
        (A.logger.warn("[createLimitOrder] nonce_rent_reclaim_failed", {
          mint: e.mint,
          nonceAccount: l,
          error: t,
        }),
          M("nonce-rent-reclaim", e, t, { nonceAccount: l }));
      }
    };
  async function I(e, t) {
    let i,
      { connection: n, signTransaction: r } = t,
      s = new j.PublicKey(e.user),
      l = j.Keypair.generate(),
      a = l.publicKey.toBase58(),
      o = null,
      c = !1;
    try {
      let e = await n.getMinimumBalanceForRentExemption(j.NONCE_ACCOUNT_LENGTH),
        { blockhash: t, lastValidBlockHeight: a } =
          await n.getLatestBlockhash(),
        d = j.SystemProgram.createNonceAccount({
          fromPubkey: s,
          noncePubkey: l.publicKey,
          authorizedPubkey: s,
          lamports: e,
        }).instructions,
        u = new j.TransactionMessage({
          payerKey: s,
          recentBlockhash: t,
          instructions: d,
        }).compileToV0Message(),
        m = new j.VersionedTransaction(u);
      m.sign([l]);
      let p = await r(m);
      ((i = await n.sendRawTransaction(p.serialize(), { skipPreflight: !1 })),
        (c = !0));
      let f = await n.confirmTransaction(
        { signature: i, blockhash: t, lastValidBlockHeight: a },
        "confirmed",
      );
      if (f.value.err)
        throw Error(
          `Nonce account creation failed on-chain: ${JSON.stringify(f.value.err)}`,
        );
      o = q(f);
    } catch (r) {
      let i;
      (A.logger.error("[createLimitOrder] nonce_create_failed", {
        mint: e.mint,
        nonceAccount: a,
        error: r,
      }),
        M("nonce-create", e, r, { nonceAccount: a }),
        c && (await K(e, t, l)));
      let n = r instanceof Error ? r.message : String(r);
      if (
        (i = n.toLowerCase()).includes("insufficient lamports") ||
        i.includes("insufficient funds for rent") ||
        i.includes("insufficientfundsforrent") ||
        i.includes("no record of a prior credit") ||
        i.includes("debit an account")
      )
        throw new k(n);
      throw r;
    }
    return (
      A.logger.info("[createLimitOrder] nonce_account_created", {
        mint: e.mint,
        nonceAccount: a,
        slot: o,
      }),
      { nonceKeypair: l, nonceLandedSlot: o }
    );
  }
  let q = (e) => {
      let t = e.context?.slot;
      return "number" == typeof t && Number.isFinite(t) && t > 0 ? t : null;
    },
    F = [500, 1e3, 1500],
    B = F.length + 1,
    R = (e) => new Promise((t) => setTimeout(t, e)),
    $ = (e) => e instanceof S.Z && e.data?.reason === "nonce_landed_slot_ahead";
  async function z(e, t) {
    let i = Date.now(),
      n = e,
      r = 1;
    for (;;) {
      let e;
      try {
        return await (0, S.A)(n);
      } catch (t) {
        e = t;
      }
      if (null != n.nonceLandedSlot && r < B && $(e)) {
        (A.logger.warn("[createLimitOrder] swap_build_limit_slot_dropped", {
          mint: t.mint,
          nonceAccount: t.nonceAccount,
          attempt: r,
          nonceLandedSlot: n.nonceLandedSlot,
        }),
          (n = { ...n, nonceLandedSlot: null }),
          (r += 1));
        continue;
      }
      let s = L(e),
        l = F[r - 1],
        a = Date.now() - i,
        o = r < B && void 0 !== l && a + l < 7e3;
      if (!s.retry || !o)
        throw (
          A.logger.error("[createLimitOrder] swap_build_limit_failed", {
            mint: t.mint,
            nonceAccount: t.nonceAccount,
            error: e,
            status: e instanceof S.Z ? e.status : void 0,
            reason: e instanceof S.Z ? e.data?.reason : void 0,
            attempts: r,
          }),
          e
        );
      (A.logger.warn("[createLimitOrder] swap_build_limit_retry", {
        mint: t.mint,
        nonceAccount: t.nonceAccount,
        attempt: r,
        reason: s.reason,
        status: e instanceof S.Z ? e.status : void 0,
        waitMs: l,
        elapsedMs: a,
      }),
        await R(l),
        (r += 1));
    }
  }
  async function D(e, t) {
    let i,
      n,
      r,
      { signTransaction: s } = t,
      { nonceKeypair: l, nonceLandedSlot: a } =
        void 0 !== e.nonceKeypair
          ? {
              nonceKeypair: e.nonceKeypair,
              nonceLandedSlot: e.nonceLandedSlot ?? null,
            }
          : await I({ user: e.user, mint: e.mint }, t),
      o = l.publicKey.toBase58();
    try {
      i = await z(
        {
          user: e.user,
          mint: e.mint,
          quoteMint: (0, C.T)(),
          orderType: e.orderType,
          amountInAtoms: e.amountInAtomic,
          triggerMcapUsd: String(e.triggerMcapUsd),
          nonceAccount: o,
          nonceLandedSlot: a,
        },
        { mint: e.mint, nonceAccount: o },
      );
    } catch (i) {
      throw (
        M("swap-build-limit", e, i, { nonceAccount: o }),
        await K(e, t, l),
        i
      );
    }
    let c = (0, E.m)(i.transaction),
      d = (0, O.U)(c);
    try {
      ((n = await s(c)), (0, O.a)(d, n));
    } catch (r) {
      A.logger.error("[createLimitOrder] order_sign_failed", {
        mint: e.mint,
        orderId: i.order_id,
        error: r,
      });
      let n =
        r instanceof O.e
          ? {
              messageMutation: r.kinds.join(","),
              messageMutationSummary:
                r instanceof O.s ? r.report.summary : void 0,
            }
          : void 0;
      throw (
        M("order-sign", e, r, { orderId: i.order_id, ...n }),
        await K(e, t, l),
        r
      );
    }
    try {
      r = await (0, S.v)({ transaction: (0, E.r)(n) });
    } catch (n) {
      throw (
        A.logger.error("[createLimitOrder] send_limit_failed", {
          mint: e.mint,
          orderId: i.order_id,
          error: n,
        }),
        M("send-limit", e, n, { orderId: i.order_id }),
        n instanceof S.Z &&
        n.status >= 400 &&
        n.status < 500 &&
        408 !== n.status &&
        429 !== n.status
          ? await K(e, t, l)
          : A.logger.warn(
              "[createLimitOrder] send_limit_ambiguous_nonce_kept",
              { mint: e.mint, orderId: i.order_id, nonceAccount: o },
            ),
        n
      );
    }
    return (
      A.logger.info("[createLimitOrder] stored", {
        mint: e.mint,
        orderId: r.order_id,
        status: r.status,
      }),
      r
    );
  }
  var G = e.i(440072);
  let Q = ({ signerAddress: e, sessionAddress: t, mint: i }) => {
    if (e === t) return;
    let n = Error("Signing wallet does not match the session identity");
    throw (
      (0, T.l)({
        error: n,
        feature: "limit-orders",
        operation: "wallet-identity-mismatch",
        context: { signerAddress: e, sessionAddress: t, mint: i },
      }),
      n
    );
  };
  function W(e, t) {
    A.logger.error("[useCreateLimitOrderMutation] create_failed", {
      mint: t.mint,
      error: e,
    });
  }
  var H = e.i(416200);
  let V = (e) => (e instanceof Error ? e.message : String(e)),
    Z = (e) => {
      let t = V(e);
      return {
        status: "unchanged",
        error: t,
        cause: e instanceof Error ? e : Error(t),
      };
    };
  async function J(e, t) {
    let i,
      n,
      r,
      { previousOrderId: s, ...l } = e;
    try {
      i = await I({ user: e.user, mint: e.mint }, t);
    } catch (e) {
      return Z(e);
    }
    let { nonceKeypair: a, nonceLandedSlot: o } = i;
    try {
      n = await (0, H.C)({ mint: e.mint, orderId: s, user: e.user });
    } catch (i) {
      return (await K({ user: e.user, mint: e.mint }, t, a), Z(i));
    }
    try {
      r = (await D({ ...l, nonceKeypair: a, nonceLandedSlot: o }, t)).order_id;
    } catch (i) {
      let t = V(i);
      return (
        A.logger.error("[editLimitOrder] recreate_failed", {
          mint: e.mint,
          previousOrderId: s,
          nonceAccount: a.publicKey.toBase58(),
          error: t,
        }),
        { status: "cancelled_only", error: t }
      );
    }
    let c = await (0, H.d)({ mint: e.mint, orderId: s, user: e.user }, n, t);
    return (
      A.logger.info("[editLimitOrder] edited", {
        mint: e.mint,
        previousOrderId: s,
        orderId: r,
        nonceCloseSubmitted: c,
      }),
      { status: "edited", orderId: r, nonceCloseSubmitted: c }
    );
  }
  var X = e.i(198825),
    Y = e.i(630208),
    ee = e.i(511078),
    et = e.i(927608);
  e.i(267146);
  var ei = e.i(540805),
    en = e.i(890088),
    er = e.i(762193);
  let es = async ({ connection: e, user: t, mint: i, nonceCount: n }) => {
      let r, s;
      if (n <= 0)
        return { status: "covered", balanceLamports: 0, requiredLamports: 0 };
      try {
        [r, s] = await (0, er.k)({
          promise: Promise.all([
            e.getBalance(new j.PublicKey(t), "confirmed"),
            e.getMinimumBalanceForRentExemption(j.NONCE_ACCOUNT_LENGTH),
          ]),
          ms: 15e3,
          label: "the TP/SL SOL pre-check",
        });
      } catch (t) {
        let e = t instanceof Error ? t.message : String(t);
        return (
          A.logger.warn("[createLimitOrder] nonce_precheck_unavailable", {
            mint: i,
            nonceCount: n,
            reason: e,
          }),
          { status: "unavailable", reason: e }
        );
      }
      if (!Number.isFinite(r) || !Number.isFinite(s))
        return (
          A.logger.warn("[createLimitOrder] nonce_precheck_unavailable", {
            mint: i,
            nonceCount: n,
            reason: "balance_unavailable",
          }),
          { status: "unavailable", reason: "balance_unavailable" }
        );
      let l = (({ nonceRentLamports: e, nonceCount: t }) =>
        t <= 0 ? 0 : t * (e + 1e4) + 890880)({
        nonceRentLamports: s,
        nonceCount: n,
      });
      return r >= l
        ? { status: "covered", balanceLamports: r, requiredLamports: l }
        : (A.logger.warn("[createLimitOrder] nonce_precheck_insufficient_sol", {
            mint: i,
            nonceCount: n,
            requiredLamports: l,
            balanceLamports: r,
          }),
          {
            status: "short",
            balanceLamports: r,
            requiredLamports: l,
            shortfallLamports: l - r,
            requiredSol: Math.ceil(l / 1e5) / 1e4,
          });
    },
    el = async (e) => {
      let t = await es(e);
      if ("short" === t.status)
        throw new k(
          `insufficient SOL for ${e.nonceCount} nonce account(s): balance ${t.balanceLamports} lamports, required ${t.requiredLamports}`,
          { requiredSol: t.requiredSol },
        );
    };
  var ea = e.i(886403),
    eo = e.i(148885);
  let ec = (e) =>
    null != e.cap && e.gate
      ? null == e.activeOrder
        ? { action: "create", orderType: e.orderType, cap: e.cap }
        : e.isEdit
          ? {
              action: "edit",
              orderType: e.orderType,
              cap: e.cap,
              activeOrder: e.activeOrder,
            }
          : null
      : null;
  async function ed(e, t) {
    let i = !1,
      {
        mint: n,
        assertSolCoversNonces: r,
        createLimitOrder: s,
        editLimitOrder: l,
      } = e;
    A.logger.info("[tpSlPersist] save_begin", {
      mint: n,
      tpGate: +!!t.mcapGates.createTakeProfit,
      slGate: +!!t.mcapGates.createStopLoss,
      tpEdit: +!!t.editTakeProfit,
      slEdit: +!!t.editStopLoss,
    });
    let a = [
      ec({
        orderType: "take_profit",
        cap: t.tpCap,
        gate: t.mcapGates.createTakeProfit,
        activeOrder: t.activeTakeProfitOrder,
        isEdit: t.editTakeProfit,
      }),
      ec({
        orderType: "stop_loss",
        cap: t.slCap,
        gate: t.mcapGates.createStopLoss,
        activeOrder: t.activeStopLossOrder,
        isEdit: t.editStopLoss,
      }),
    ].filter((e) => null !== e);
    for (let e of (a.length > 0 && (await r(a.length)), a)) {
      if ("create" === e.action) {
        (A.logger.info("[tpSlPersist] create_order", {
          mint: n,
          orderType: e.orderType,
        }),
          await s({ orderType: e.orderType, triggerMcapUsd: e.cap }),
          (i = !0));
        continue;
      }
      A.logger.info("[tpSlPersist] edit_order", {
        mint: n,
        orderType: e.orderType,
        previousOrderId: e.activeOrder.orderId,
      });
      let t = await l({
        orderType: e.orderType,
        triggerMcapUsd: e.cap,
        previousOrderId: e.activeOrder.orderId,
      });
      if ("unchanged" === t.status) throw t.cause;
      if ("cancelled_only" === t.status)
        return (
          A.logger.error("[tpSlPersist] edit_cancelled_only", {
            mint: n,
            orderType: e.orderType,
            previousOrderId: e.activeOrder.orderId,
            error: t.error,
          }),
          {
            didPersist: i,
            cancelledOnlyLeg: e.orderType,
            cancelledOnlyError: t.error,
          }
        );
      i = !0;
    }
    return (
      A.logger.info("[tpSlPersist] save_done", { mint: n, didPersist: +!!i }),
      { didPersist: i, cancelledOnlyLeg: null, cancelledOnlyError: null }
    );
  }
  var eu = e.i(683079),
    em = e.i(159709),
    ep = e.i(575514),
    ef = e.i(653805),
    ey = e.i(933256);
  function eh() {}
  function eg() {}
  function e_() {}
  e.s(
    [
      "f",
      0,
      (e) => {
        let P,
          j,
          S,
          N,
          L,
          T,
          E,
          A,
          C,
          M,
          K,
          I,
          q,
          F,
          B,
          R,
          $,
          z,
          H,
          V,
          Z,
          er,
          es,
          ec,
          ex,
          eb,
          ev,
          eU,
          ew,
          eP,
          ej,
          eS,
          ek,
          eN,
          eL,
          eT,
          eO,
          eE,
          eA,
          eC = (0, i.c)(174),
          { coin: eM, open: eK, onOpenChange: eI } = e,
          { t: eq, i18n: eF } = (0, a.f)(),
          { address: eB } = (0, r.F)(),
          eR = eM.mint,
          e$ = (0, ef.J)(eR),
          ez = null != e$ && e$ > 0 ? e$ : (eM.usd_market_cap ?? 0),
          {
            tokenBalance: eD,
            mintAccount: eG,
            isHydrated: eQ,
          } = (0, y.G)(eR, eM.token_program, eM.quote_mint, eM.pool_address),
          eW = eG?.decimals ?? eM.base_decimals ?? 6,
          eH = eQ ? (0, ey.f)(eD, eW) : null,
          eV = null != eH && eH > 0,
          eZ = (0, c.B)(eM),
          eJ =
            null != eH && ez > 0 && Number.isFinite(eZ) && eZ > 0
              ? (ez / eZ) * eH
              : null;
        eC[0] !== eJ
          ? ((P = (0, em.t)(eJ)), (eC[0] = eJ), (eC[1] = P))
          : (P = eC[1]);
        let eX = P;
        eC[2] !== eF
          ? ((j = (e) =>
              (0, en.R)(eF.language, {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(e)),
            (eC[2] = eF),
            (eC[3] = j))
          : (j = eC[3]);
        let eY = j;
        eC[4] !== eY || eC[5] !== ez
          ? ((S = { kind: "tp", liveMcapUsd: ez, formatWholeUsd: eY }),
            (eC[4] = eY),
            (eC[5] = ez),
            (eC[6] = S))
          : (S = eC[6]);
        let e1 = (0, ee.f)(S);
        eC[7] !== eY || eC[8] !== ez
          ? ((N = { kind: "sl", liveMcapUsd: ez, formatWholeUsd: eY }),
            (eC[7] = eY),
            (eC[8] = ez),
            (eC[9] = N))
          : (N = eC[9]);
        let e0 = (0, ee.f)(N),
          e2 = eB ?? void 0;
        eC[10] !== eR || eC[11] !== eK || eC[12] !== e2
          ? ((L = { user: e2, mint: eR, enabled: eK }),
            (eC[10] = eR),
            (eC[11] = eK),
            (eC[12] = e2),
            (eC[13] = L))
          : (L = eC[13]);
        let e3 = (0, Y.f)(L),
          { takeProfit: e4, stopLoss: e5 } = (0, _.W)(e3.data ?? []),
          e6 = (() => {
            let e,
              t,
              n,
              s,
              l = (0, i.c)(9),
              a = (0, U.useQueryClient)(),
              { wallet: o } = (0, r.F)(),
              { connection: c } = (0, h.f)();
            return (
              l[0] === Symbol.for("react.memo_cache_sentinel")
                ? ((e = ["limit-orders", "create"]), (l[0] = e))
                : (e = l[0]),
              l[1] !== c || l[2] !== o
                ? ((t = (e) => {
                    if (!o) throw Error("Wallet not connected");
                    return (
                      Q({
                        signerAddress: o.publicKey?.toBase58(),
                        sessionAddress: e.user,
                        mint: e.mint,
                      }),
                      D(e, {
                        connection: c,
                        signTransaction: (e) =>
                          (0, w._)(() => o.signTransaction(e)),
                      })
                    );
                  }),
                  (l[1] = c),
                  (l[2] = o),
                  (l[3] = t))
                : (t = l[3]),
              l[4] !== a
                ? ((n = (e, t) => {
                    (a.invalidateQueries({ queryKey: G.f.byUser(t.user) }),
                      a.invalidateQueries({
                        queryKey: G.f.byUserAndMint(t.user, t.mint),
                      }));
                  }),
                  (l[4] = a),
                  (l[5] = n))
                : (n = l[5]),
              l[6] !== t || l[7] !== n
                ? ((s = {
                    mutationKey: e,
                    mutationFn: t,
                    onError: W,
                    onSuccess: n,
                  }),
                  (l[6] = t),
                  (l[7] = n),
                  (l[8] = s))
                : (s = l[8]),
              (0, v.f)(s)
            );
          })(),
          e8 = (() => {
            let e,
              t,
              n,
              s,
              l = (0, i.c)(9),
              a = (0, U.useQueryClient)(),
              { wallet: o } = (0, r.F)(),
              { connection: c } = (0, h.f)();
            return (
              l[0] === Symbol.for("react.memo_cache_sentinel")
                ? ((e = ["limit-orders", "edit"]), (l[0] = e))
                : (e = l[0]),
              l[1] !== c || l[2] !== o
                ? ((t = (e) => {
                    if (!o) throw Error("Wallet not connected");
                    return (
                      Q({
                        signerAddress: o.publicKey?.toBase58(),
                        sessionAddress: e.user,
                        mint: e.mint,
                      }),
                      J(e, {
                        connection: c,
                        signTransaction: (e) =>
                          (0, w._)(() => o.signTransaction(e)),
                      })
                    );
                  }),
                  (l[1] = c),
                  (l[2] = o),
                  (l[3] = t))
                : (t = l[3]),
              l[4] !== a
                ? ((n = (e, t, i) => {
                    (a.invalidateQueries({ queryKey: G.f.byUser(i.user) }),
                      a.invalidateQueries({
                        queryKey: G.f.byUserAndMint(i.user, i.mint),
                      }));
                  }),
                  (l[4] = a),
                  (l[5] = n))
                : (n = l[5]),
              l[6] !== t || l[7] !== n
                ? ((s = { mutationKey: e, mutationFn: t, onSettled: n }),
                  (l[6] = t),
                  (l[7] = n),
                  (l[8] = s))
                : (s = l[8]),
              (0, v.f)(s)
            );
          })(),
          e7 = (0, g.f)(),
          { connection: e9 } = (0, h.f)(),
          te = (() => {
            let e,
              t = (0, i.c)(3),
              { t: n } = (0, a.f)(),
              { setShowDeposit: r } = (0, X.useConnectWallet)();
            return (
              t[0] !== r || t[1] !== n
                ? ((e = (e) => {
                    o.c.error(n("notifications.toast.insufficient_sol.title"), {
                      id: "tp-sl-insufficient-sol",
                      duration: 7e3,
                      description:
                        null != e.requiredSol
                          ? n(
                              "notifications.toast.insufficient_funds.description_with_amount",
                              { amount: e.requiredSol },
                            )
                          : n(
                              "notifications.toast.insufficient_sol.description",
                            ),
                      action: {
                        label: n(
                          "web.notifications.toast.insufficient_sol.deposit",
                        ),
                        onClick: () => r(!0),
                      },
                    });
                  }),
                  (t[0] = r),
                  (t[1] = n),
                  (t[2] = e))
                : (e = t[2]),
              e
            );
          })(),
          [tt, ti] = (0, l.useState)(!1),
          tn = (e) => {
            if (null == eH) return null;
            let t = (0, eo.W)(e?.quantityAtomic, eW);
            return (0, ea.q)(null == t ? void 0 : String(t), eH);
          },
          tr = tn(e4),
          ts = tn(e5);
        eC[14] !== e4 || eC[15] !== tr || eC[16] !== e1
          ? ((T = { order: e4, draft: e1, coveragePercent: tr }),
            (eC[14] = e4),
            (eC[15] = tr),
            (eC[16] = e1),
            (eC[17] = T))
          : (T = eC[17]);
        let { baseline: tl, isEditable: ta, isEditDirty: to } = (0, et.f)(T);
        eC[18] !== e5 || eC[19] !== ts || eC[20] !== e0
          ? ((E = { order: e5, draft: e0, coveragePercent: ts }),
            (eC[18] = e5),
            (eC[19] = ts),
            (eC[20] = e0),
            (eC[21] = E))
          : (E = eC[21]);
        let { baseline: tc, isEditable: td, isEditDirty: tu } = (0, et.f)(E);
        (eC[22] !== e7
          ? ((A = (e) => e7.mutateAsync(e)), (eC[22] = e7), (eC[23] = A))
          : (A = eC[23]),
          eC[24] !== e3
            ? ((C = () => e3.refetch()), (eC[24] = e3), (eC[25] = C))
            : (C = eC[25]),
          eC[26] !== e5 ||
          eC[27] !== e4 ||
          eC[28] !== eB ||
          eC[29] !== e0.reset ||
          eC[30] !== C ||
          eC[31] !== A ||
          eC[32] !== e1.reset
            ? ((M = {
                walletAddress: eB,
                cancelLimitOrder: A,
                refetchMintLimitOrders: C,
                activeTakeProfitOrder: e4,
                activeStopLossOrder: e5,
                clearTakeProfitInput: e1.reset,
                clearStopLossInput: e0.reset,
              }),
              (eC[26] = e5),
              (eC[27] = e4),
              (eC[28] = eB),
              (eC[29] = e0.reset),
              (eC[30] = C),
              (eC[31] = A),
              (eC[32] = e1.reset),
              (eC[33] = M))
            : (M = eC[33]));
        let {
          cancelConfirmLeg: tm,
          setCancelConfirmLeg: tp,
          pendingCancelLeg: tf,
          handleConfirmCancelLeg: ty,
        } = ((e) => {
          let t,
            n,
            r,
            s = (0, i.c)(16),
            {
              walletAddress: c,
              cancelLimitOrder: d,
              refetchMintLimitOrders: u,
              activeTakeProfitOrder: m,
              activeStopLossOrder: p,
              clearTakeProfitInput: f,
              clearStopLossInput: y,
            } = e,
            { t: h } = (0, a.f)(),
            [g, x] = (0, l.useState)(null),
            [v, U] = (0, l.useState)(null);
          s[0] !== d || s[1] !== u || s[2] !== h || s[3] !== c
            ? ((t = (e, t, i) => {
                if (null != t && null != c) {
                  if ((0, _.D)(t.status))
                    return void o.c.info(
                      h("coin_details.manage_orders.executing_locked_note"),
                    );
                  (U(e),
                    d({ mint: t.mint, orderId: t.orderId, user: c })
                      .then(async (e) => {
                        (await u(),
                          i(),
                          e.nonceCloseSubmitted
                            ? o.c.success(
                                h(
                                  "coin_details.add_tp_sl_cancel_order_success",
                                ),
                              )
                            : o.c.info(
                                h("coin_details.cancel_order_rent_pending"),
                              ));
                      })
                      .catch(b)
                      .finally(() => {
                        U(null);
                      }));
                }
              }),
              (s[0] = d),
              (s[1] = u),
              (s[2] = h),
              (s[3] = c),
              (s[4] = t))
            : (t = s[4]);
          let w = t;
          s[5] !== p ||
          s[6] !== m ||
          s[7] !== w ||
          s[8] !== g ||
          s[9] !== y ||
          s[10] !== f
            ? ((n = () => {
                (x(null),
                  "tp" === g ? w("tp", m, f) : "sl" === g && w("sl", p, y));
              }),
              (s[5] = p),
              (s[6] = m),
              (s[7] = w),
              (s[8] = g),
              (s[9] = y),
              (s[10] = f),
              (s[11] = n))
            : (n = s[11]);
          let P = n;
          return (
            s[12] !== g || s[13] !== P || s[14] !== v
              ? ((r = {
                  cancelConfirmLeg: g,
                  setCancelConfirmLeg: x,
                  pendingCancelLeg: v,
                  handleConfirmCancelLeg: P,
                }),
                (s[12] = g),
                (s[13] = P),
                (s[14] = v),
                (s[15] = r))
              : (r = s[15]),
            r
          );
        })(M);
        eC[34] !== e5 ||
        eC[35] !== e4 ||
        eC[36] !== tu ||
        eC[37] !== to ||
        eC[38] !== ez ||
        eC[39] !== e0.mcapUsd ||
        eC[40] !== e0.sellPercent ||
        eC[41] !== e1.mcapUsd ||
        eC[42] !== e1.sellPercent
          ? ((K = (0, em.V)(
              {
                mcapUsd: e1.mcapUsd,
                sellPercent: e1.sellPercent,
                hasActiveOrder: null != e4,
                isEditDirty: to,
              },
              {
                mcapUsd: e0.mcapUsd,
                sellPercent: e0.sellPercent,
                hasActiveOrder: null != e5,
                isEditDirty: tu,
              },
            )),
            (I = (0, em.A)(
              e1.mcapUsd,
              e0.mcapUsd,
              ez,
              K.isTakeProfitActionable,
              K.isStopLossActionable,
            )),
            (eC[34] = e5),
            (eC[35] = e4),
            (eC[36] = tu),
            (eC[37] = to),
            (eC[38] = ez),
            (eC[39] = e0.mcapUsd),
            (eC[40] = e0.sellPercent),
            (eC[41] = e1.mcapUsd),
            (eC[42] = e1.sellPercent),
            (eC[43] = K),
            (eC[44] = I))
          : ((K = eC[43]), (I = eC[44]));
        let th = I,
          tg = +!!K.isTakeProfitActionable + +!!K.isStopLossActionable,
          t_ =
            +("create" === K.takeProfitAction) +
            +("create" === K.stopLossAction),
          tx = tg - t_;
        eC[45] !== K.isStopLossActionable ||
        eC[46] !== K.isTakeProfitActionable ||
        eC[47] !== K.stopLossAction ||
        eC[48] !== K.takeProfitAction ||
        eC[49] !== tg ||
        eC[50] !== e5 ||
        eC[51] !== e4 ||
        eC[52] !== eB ||
        eC[53] !== e9 ||
        eC[54] !== e6 ||
        eC[55] !== e8 ||
        eC[56] !== eV ||
        eC[57] !== eQ ||
        eC[58] !== tt ||
        eC[59] !== th.gates ||
        eC[60] !== th.hasError ||
        eC[61] !== ez ||
        eC[62] !== eR ||
        eC[63] !== e3 ||
        eC[64] !== eI ||
        eC[65] !== ti ||
        eC[66] !== te ||
        eC[67] !== e0 ||
        eC[68] !== tc ||
        eC[69] !== eq ||
        eC[70] !== eD ||
        eC[71] !== e1 ||
        eC[72] !== tl
          ? ((q = async () => {
              let e;
              if (tt || null == eB || e3.isPending || e3.isError || !eQ) return;
              if (!eV)
                return void o.c.error(
                  eq("coin_details.add_tp_sl_error_no_position"),
                );
              if (ez <= 0)
                return void o.c.error(
                  eq("coin_details.add_tp_sl_error_coin_loading"),
                );
              if ((e1.revealError(), e0.revealError(), th.hasError && 0 === tg))
                return;
              ti(!0);
              let t = eD.toString(),
                i = {
                  tpCap: K.isTakeProfitActionable ? e1.mcapUsd : null,
                  slCap: K.isStopLossActionable ? e0.mcapUsd : null,
                  mcapGates: th.gates,
                  activeTakeProfitOrder: e4,
                  activeStopLossOrder: e5,
                  editTakeProfit: "edit" === K.takeProfitAction,
                  editStopLoss: "edit" === K.stopLossAction,
                };
              try {
                e = await ed(
                  {
                    mint: eR,
                    assertSolCoversNonces: (e) =>
                      el({ connection: e9, user: eB, mint: eR, nonceCount: e }),
                    createLimitOrder: (e) => {
                      let { orderType: i, triggerMcapUsd: n } = e,
                        r =
                          "take_profit" === i ? e1.sellPercent : e0.sellPercent;
                      return e6.mutateAsync({
                        user: eB,
                        mint: eR,
                        orderType: i,
                        amountInAtomic: (0, eu.f)(t, r),
                        triggerMcapUsd: n,
                      });
                    },
                    editLimitOrder: (e) => {
                      let i,
                        n,
                        r,
                        s,
                        {
                          orderType: l,
                          triggerMcapUsd: a,
                          previousOrderId: o,
                        } = e,
                        c = "take_profit" === l,
                        d =
                          ((i = c ? e4 : e5),
                          (n = c ? tl : tc),
                          (r = c ? e1.sellPercent : e0.sellPercent),
                          (s = t),
                          null != i && null != n && r === n.sellPercent
                            ? (i.quantityAtomic ?? null)
                            : (0, eu.f)(s, r));
                      if (null == d)
                        throw Error(
                          eq("coin_details.add_tp_sl_error_coin_loading"),
                        );
                      return e8.mutateAsync({
                        user: eB,
                        mint: eR,
                        orderType: l,
                        amountInAtomic: d,
                        triggerMcapUsd: a,
                        previousOrderId: o,
                      });
                    },
                  },
                  i,
                );
              } catch (e) {
                (await e3.refetch().catch(eh),
                  e instanceof k
                    ? te(e)
                    : o.c.error(
                        (({ error: e, t }) =>
                          e instanceof O.e
                            ? t("web.coin.limit_orders_wallet_rebuilt_order")
                            : (0, x.f)(
                                e instanceof Error ? e.message : String(e),
                              ))({ error: e, t: eq }),
                      ),
                  ti(!1));
                return;
              }
              if (null !== e.cancelledOnlyLeg) {
                (o.c.error(
                  "take_profit" === e.cancelledOnlyLeg
                    ? eq("coin_details.add_tp_sl_edit_cancelled_only_tp")
                    : eq("coin_details.add_tp_sl_edit_cancelled_only_sl"),
                ),
                  await e3.refetch().catch(eg),
                  ti(!1));
                return;
              }
              (await e3.refetch().catch(e_),
                e.didPersist &&
                  o.c.success(eq("coin_details.add_tp_sl_success")),
                th.hasError || (e1.reset(), e0.reset(), eI(!1)),
                ti(!1));
            }),
            (eC[45] = K.isStopLossActionable),
            (eC[46] = K.isTakeProfitActionable),
            (eC[47] = K.stopLossAction),
            (eC[48] = K.takeProfitAction),
            (eC[49] = tg),
            (eC[50] = e5),
            (eC[51] = e4),
            (eC[52] = eB),
            (eC[53] = e9),
            (eC[54] = e6),
            (eC[55] = e8),
            (eC[56] = eV),
            (eC[57] = eQ),
            (eC[58] = tt),
            (eC[59] = th.gates),
            (eC[60] = th.hasError),
            (eC[61] = ez),
            (eC[62] = eR),
            (eC[63] = e3),
            (eC[64] = eI),
            (eC[65] = ti),
            (eC[66] = te),
            (eC[67] = e0),
            (eC[68] = tc),
            (eC[69] = eq),
            (eC[70] = eD),
            (eC[71] = e1),
            (eC[72] = tl),
            (eC[73] = q))
          : (q = eC[73]);
        let tb = q,
          tv = "tp" === tm ? e4 : "sl" === tm ? e5 : void 0;
        (eC[74] !== eM.symbol || eC[75] !== eq
          ? ((F = eM.symbol
              ? eq("coin_details.add_tp_sl_sheet_title_for_symbol", {
                  symbol: eM.symbol,
                })
              : eq("coin_details.add_tp_sl_sheet_title")),
            (eC[74] = eM.symbol),
            (eC[75] = eq),
            (eC[76] = F))
          : (F = eC[76]),
          eC[77] !== eB || eC[78] !== eq
            ? ((B = eB
                ? (0, t.jsx)(s.default, {
                    href: "/orders",
                    className: "transition-colors hover:text-text-primary",
                    children: eq("web.orders.manage_orders_title"),
                  })
                : void 0),
              (eC[77] = eB),
              (eC[78] = eq),
              (eC[79] = B))
            : (B = eC[79]),
          eC[80] !== eM
            ? ((R = (0, t.jsx)(m.CoinAvatar, {
                coin: eM,
                size: 28,
                hideCorner: !0,
              })),
              (eC[80] = eM),
              (eC[81] = R))
            : (R = eC[81]));
        let tU = eM.name || eM.symbol || "—";
        eC[82] !== tU
          ? (($ = (0, t.jsx)("p", {
              className:
                "truncate text-[13px] font-medium leading-4 text-text-primary",
              children: tU,
            })),
            (eC[82] = tU),
            (eC[83] = $))
          : ($ = eC[83]);
        let tw = eM.symbol || "—";
        (eC[84] !== tw
          ? ((z = (0, t.jsx)("p", {
              className: "shrink-0 text-[11px] leading-4 text-text-quaternary",
              children: tw,
            })),
            (eC[84] = tw),
            (eC[85] = z))
          : (z = eC[85]),
          eC[86] !== $ || eC[87] !== z
            ? ((H = (0, t.jsxs)("div", {
                className: "flex min-w-0 flex-1 items-baseline gap-1.5",
                children: [$, z],
              })),
              (eC[86] = $),
              (eC[87] = z),
              (eC[88] = H))
            : (H = eC[88]),
          eC[89] !== R || eC[90] !== H
            ? ((V = (0, t.jsxs)("div", {
                className: "flex min-w-0 flex-1 items-center gap-2",
                children: [R, H],
              })),
              (eC[89] = R),
              (eC[90] = H),
              (eC[91] = V))
            : (V = eC[91]),
          eC[92] !== ez
            ? ((Z = ez > 0 ? (0, ei.l)(ez) : "—"), (eC[92] = ez), (eC[93] = Z))
            : (Z = eC[93]),
          eC[94] !== Z
            ? ((er = (0, t.jsx)("span", {
                className:
                  "text-[13px] font-medium leading-4 text-text-primary",
                children: Z,
              })),
              (eC[94] = Z),
              (eC[95] = er))
            : (er = eC[95]),
          eC[96] !== eq
            ? ((es = eq("common.market_cap_short")),
              (eC[96] = eq),
              (eC[97] = es))
            : (es = eC[97]),
          eC[98] !== es
            ? ((ec = (0, t.jsx)("span", {
                className: "text-[11px] leading-4 text-text-quaternary",
                children: es,
              })),
              (eC[98] = es),
              (eC[99] = ec))
            : (ec = eC[99]),
          eC[100] !== er || eC[101] !== ec
            ? ((ex = (0, t.jsxs)("div", {
                className: "flex shrink-0 items-baseline gap-1 tabular-nums",
                children: [er, ec],
              })),
              (eC[100] = er),
              (eC[101] = ec),
              (eC[102] = ex))
            : (ex = eC[102]),
          eC[103] !== V || eC[104] !== ex
            ? ((eb = (0, t.jsxs)("div", {
                className: "flex h-8 items-center justify-between gap-3",
                children: [V, ex],
              })),
              (eC[103] = V),
              (eC[104] = ex),
              (eC[105] = eb))
            : (eb = eC[105]),
          eC[106] === Symbol.for("react.memo_cache_sentinel")
            ? ((ev = (0, t.jsx)(f.a, {})), (eC[106] = ev))
            : (ev = eC[106]));
        let tP = e4 ?? null,
          tj = "tp" === tf;
        eC[107] !== tp
          ? ((eU = () => tp("tp")), (eC[107] = tp), (eC[108] = eU))
          : (eU = eC[108]);
        let tS = th.takeProfitFailsMinimum && e1.isErrorRevealed;
        (eC[109] !== tt ||
        eC[110] !== ta ||
        eC[111] !== ez ||
        eC[112] !== eX ||
        eC[113] !== eW ||
        eC[114] !== tP ||
        eC[115] !== tj ||
        eC[116] !== eU ||
        eC[117] !== tS ||
        eC[118] !== eH ||
        eC[119] !== e1
          ? ((ew = (0, t.jsx)(u.f, {
              draft: e1,
              liveMcapUsd: ez,
              activeOrder: tP,
              isEditable: ta,
              tokenBalanceUi: eH,
              mintDecimals: eW,
              minSellPercent: eX,
              isCancelPending: tj,
              isBusy: tt,
              onRequestCancel: eU,
              showValidationError: tS,
            })),
            (eC[109] = tt),
            (eC[110] = ta),
            (eC[111] = ez),
            (eC[112] = eX),
            (eC[113] = eW),
            (eC[114] = tP),
            (eC[115] = tj),
            (eC[116] = eU),
            (eC[117] = tS),
            (eC[118] = eH),
            (eC[119] = e1),
            (eC[120] = ew))
          : (ew = eC[120]),
          eC[121] === Symbol.for("react.memo_cache_sentinel")
            ? ((eP = (0, t.jsx)(f.a, {})), (eC[121] = eP))
            : (eP = eC[121]));
        let tk = e5 ?? null,
          tN = "sl" === tf;
        eC[122] !== tp
          ? ((ej = () => tp("sl")), (eC[122] = tp), (eC[123] = ej))
          : (ej = eC[123]);
        let tL = th.stopLossExceedsMaximum && e0.isErrorRevealed;
        (eC[124] !== tt ||
        eC[125] !== td ||
        eC[126] !== ez ||
        eC[127] !== eX ||
        eC[128] !== eW ||
        eC[129] !== e0 ||
        eC[130] !== tk ||
        eC[131] !== tN ||
        eC[132] !== ej ||
        eC[133] !== tL ||
        eC[134] !== eH
          ? ((eS = (0, t.jsx)(u.f, {
              draft: e0,
              liveMcapUsd: ez,
              activeOrder: tk,
              isEditable: td,
              tokenBalanceUi: eH,
              mintDecimals: eW,
              minSellPercent: eX,
              isCancelPending: tN,
              isBusy: tt,
              onRequestCancel: ej,
              showValidationError: tL,
            })),
            (eC[124] = tt),
            (eC[125] = td),
            (eC[126] = ez),
            (eC[127] = eX),
            (eC[128] = eW),
            (eC[129] = e0),
            (eC[130] = tk),
            (eC[131] = tN),
            (eC[132] = ej),
            (eC[133] = tL),
            (eC[134] = eH),
            (eC[135] = eS))
          : (eS = eC[135]),
          eC[136] !== eb || eC[137] !== ew || eC[138] !== eS
            ? ((ek = (0, t.jsxs)(f.K, {
                className: "flex flex-col gap-3",
                children: [eb, ev, ew, eP, eS],
              })),
              (eC[136] = eb),
              (eC[137] = ew),
              (eC[138] = eS),
              (eC[139] = ek))
            : (ek = eC[139]),
          eC[140] !== tg ||
          eC[141] !== e5 ||
          eC[142] !== e4 ||
          eC[143] !== t_ ||
          eC[144] !== tx ||
          eC[145] !== tb ||
          eC[146] !== eQ ||
          eC[147] !== tt ||
          eC[148] !== e3.isError ||
          eC[149] !== e3.isPending ||
          eC[150] !== eq
            ? ((eN =
                tg > 0 || tt
                  ? (0, t.jsx)(f.c, {
                      children: (0, t.jsx)(n.K, {
                        size: f.$,
                        isFullWidth: !0,
                        isLoading: tt,
                        isDisabled: tt || !eQ || e3.isPending || e3.isError,
                        onClick: () => void tb(),
                        children: (0, ep.f)(
                          eq,
                          t_,
                          tx,
                          null != e4 || null != e5,
                        ),
                      }),
                    })
                  : null),
              (eC[140] = tg),
              (eC[141] = e5),
              (eC[142] = e4),
              (eC[143] = t_),
              (eC[144] = tx),
              (eC[145] = tb),
              (eC[146] = eQ),
              (eC[147] = tt),
              (eC[148] = e3.isError),
              (eC[149] = e3.isPending),
              (eC[150] = eq),
              (eC[151] = eN))
            : (eN = eC[151]),
          eC[152] !== eI ||
          eC[153] !== eK ||
          eC[154] !== F ||
          eC[155] !== B ||
          eC[156] !== ek ||
          eC[157] !== eN
            ? ((eL = (0, t.jsxs)(f.N, {
                open: eK,
                onOpenChange: eI,
                density: "terminal",
                size: "md",
                title: F,
                aside: B,
                "data-testid": "add-tp-sl-dialog",
                children: [ek, eN],
              })),
              (eC[152] = eI),
              (eC[153] = eK),
              (eC[154] = F),
              (eC[155] = B),
              (eC[156] = ek),
              (eC[157] = eN),
              (eC[158] = eL))
            : (eL = eC[158]));
        let tT = null != tm;
        return (
          eC[159] !== tp
            ? ((eT = (e) => {
                e || tp(null);
              }),
              (eC[159] = tp),
              (eC[160] = eT))
            : (eT = eC[160]),
          eC[161] !== tm ||
          eC[162] !== tv ||
          eC[163] !== eM.mint ||
          eC[164] !== eM.symbol
            ? ((eO = tv
                ? {
                    orderType: "sl" === tm ? "stop_loss" : "take_profit",
                    quantity: tv.quantity,
                    symbol: eM.symbol ?? (0, p.e)(eM.mint),
                    triggerMcapUsd: tv.triggerMcapUsd ?? null,
                    avgEntryMcapUsd: null,
                  }
                : null),
              (eC[161] = tm),
              (eC[162] = tv),
              (eC[163] = eM.mint),
              (eC[164] = eM.symbol),
              (eC[165] = eO))
            : (eO = eC[165]),
          eC[166] !== ty || eC[167] !== tT || eC[168] !== eT || eC[169] !== eO
            ? ((eE = (0, t.jsx)(d.f, {
                open: tT,
                onOpenChange: eT,
                onConfirm: ty,
                summary: eO,
              })),
              (eC[166] = ty),
              (eC[167] = tT),
              (eC[168] = eT),
              (eC[169] = eO),
              (eC[170] = eE))
            : (eE = eC[170]),
          eC[171] !== eL || eC[172] !== eE
            ? ((eA = (0, t.jsxs)(t.Fragment, { children: [eL, eE] })),
              (eC[171] = eL),
              (eC[172] = eE),
              (eC[173] = eA))
            : (eA = eC[173]),
          eA
        );
      },
    ],
    262110,
  );
};
