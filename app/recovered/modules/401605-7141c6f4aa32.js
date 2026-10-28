// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(728141),
    r = t.i(574472),
    a = t.i(959719),
    i = t.i(971370),
    n = t.i(352386);
  t.i(12692);
  var o = t.i(398902),
    s = t.i(63289),
    u = t.i(704604),
    c = t.i(789087),
    l = t.i(275799),
    d = t.i(426091),
    h = t.i(609926),
    p = t.i(777887),
    w = t.i(466931),
    f = t.i(545177),
    g = t.i(252911),
    m = t.i(349417),
    y = t.i(679925),
    T = t.i(480133),
    k = t.i(51954),
    $ = t.i(102250);
  class R extends Error {
    prepSignature;
    stockSymbol;
    constructor(t, e) {
      (super(t),
        (this.name = "StockQuoteCreateAfterPrepError"),
        (this.prepSignature = e.prepSignature),
        (this.stockSymbol = e.stockSymbol));
    }
  }
  async function b({
    wallet: t,
    connection: e,
    clientServerUrl: r,
    mint: a,
    mintKeypair: i,
    isVanityAddress: n,
    name: o,
    symbol: s,
    uri: u,
    creator: c,
    user: l,
    amountIn: E,
    denomination: H,
    quoteMint: U,
    slippageBps: A,
    prepSwapSymbol: P,
    mayhemMode: v,
    holderReward: S,
    creatorFeeBps: x,
    multiHop: O,
  }) {
    let { signTransaction: q } = t;
    if (!q) throw Error("wallet cannot sign transactions");
    let j = await (0, m.y)(
      {
        mint: a.toBase58(),
        amount_in: (0, m.d)(BigInt(E.toString())),
        side: "buy",
        denomination: H,
        user: l.toBase58(),
        slippage_bps: A,
        venue_hint: "pump",
        is_coin_creation: !0,
        name: o,
        symbol: s,
        uri: u,
        quote_mint: U,
        creator: c.toBase58(),
        is_mayhem_mode: v,
        is_holder_reward: S,
        creator_fee_bps: x,
        is_free_coin_creation: !1,
        mint_signed_by_client: !0,
        multi_hop: O || void 0,
      },
      { retries: 1 },
    );
    if ("insufficient_funds" === j.kind) throw Error(h.R);
    if ("ok" !== j.kind) throw Error(j.message);
    let { prepTransaction: C, route: z, optionsForSend: B } = j.data,
      J = { route: z, options: B },
      I = j.data.transaction;
    n
      ? (I = await (0, y.k)(r, {
          serializedTx: (0, T.Z)(I),
          mint: a.toBase58(),
          isFreeCoinCreation: !1,
        }))
      : I.sign([i]);
    let M = C ? [C, I] : [I],
      N = M.map(g.U),
      D = await (0, p._)(async () =>
        t.signAllTransactions
          ? t.signAllTransactions(M)
          : Promise.all(M.map((t) => q(t))),
      ),
      F = D[D.length - 1],
      G = { kind: "intact" };
    try {
      ((0, g.a)(N[N.length - 1], F),
        D.length > 1 && (G = (0, g._)(N[0], D[0])));
    } catch (t) {
      if (!(t instanceof g.e)) throw t;
      throw (
        (0, $.R)(),
        Error(
          `your wallet altered the create transaction before signing it (${t.kinds.join(", ")}); nothing was sent`,
        )
      );
    }
    "rebuilt-unsigned" === G.kind &&
      (0, w.l)({
        error: Error(
          "wallet rebuilt the unsigned create preparation transaction",
        ),
        feature: "coin-creation",
        operation: "server-built-create-sign",
        context: {
          mint: a.toBase58(),
          denomination: H,
          quoteMint: U,
          prepSwapSymbol: P,
          walletName: (0, d.Y)(),
          messageMutation: G.report.kinds.join(","),
          messageMutationSummary: G.report.summary,
        },
      });
    let K = (0, T.w)(F);
    if (1 === D.length) {
      let t = await (0, f.s)(F, J),
        r = performance.now();
      return {
        mint: a,
        signature: K,
        confirmTxPromise: (async () => {
          if ("error" === t.kind) throw Error(t.message);
          return (await _(t.data, e, "create transaction"), { err: null });
        })(),
        signedTimestamp: r,
      };
    }
    let L = D[0],
      V = (0, T.w)(L),
      Q = P ? `swap into ${P}` : "create preparation transaction";
    if ("rebuilt-unsigned" === G.kind) {
      let t = await k.f
        .getState()
        .sendSignedTransaction({ signedTx: L, frontRunningProtection: !1 });
      if (!t) throw Error(`could not broadcast the ${Q} — please try again`);
      let r = await t.confirmTxPromise.then(
        () => null,
        (t) => (t instanceof Error ? t.message : String(t)),
      );
      if (null !== r) {
        let t;
        try {
          t = await (0, f._)({ signature: V, confirmed: !1, succeeded: !1 }, e);
        } catch {
          throw Error(`${Q} reverted on-chain: ${r}`);
        }
        if (!t)
          throw Error(
            `${Q} was not confirmed; check the explorer before retrying`,
          );
      }
    } else {
      let t = await (0, f.s)(L, J);
      await _(
        "error" === t.kind
          ? { signature: V, confirmed: !1, succeeded: !1, error: t.message }
          : t.data,
        e,
        Q,
      );
    }
    let W = (t) =>
        new R(t, { prepSignature: V, stockSymbol: P ?? H.toUpperCase() }),
      Y = await e
        .isBlockhashValid(F.message.recentBlockhash)
        .then((t) => t.value)
        .catch(() => !0),
      X = performance.now();
    if (!Y)
      return {
        mint: a,
        signature: K,
        confirmTxPromise: Promise.reject(
          W("the create transaction expired while the swap confirmed"),
        ),
        signedTimestamp: X,
        prepSignature: V,
      };
    let Z = await (0, f.s)(F, J);
    return {
      mint: a,
      signature: K,
      confirmTxPromise: (async () => {
        if ("error" === Z.kind) throw W(Z.message);
        try {
          await _(Z.data, e, "create transaction");
        } catch (t) {
          throw W(t instanceof Error ? t.message : String(t));
        }
        return { err: null };
      })(),
      signedTimestamp: X,
      prepSignature: V,
    };
  }
  async function _(t, e, r) {
    let a;
    if (t.confirmed) {
      if (!t.succeeded)
        throw Error(t.reason ?? t.error ?? `${r} reverted on-chain`);
      return;
    }
    try {
      a = await (0, f._)(t, e);
    } catch {
      throw Error(`${r} reverted on-chain`);
    }
    if (!a)
      throw Error(
        [t.error, `${r} was not confirmed; check the explorer before retrying`]
          .filter(Boolean)
          .join(": "),
      );
  }
  t.s(["c", 0, 0, "n", 0, 200, "u", 0, R, "d", 0, 1e3, "s", 0, b], 921514);
  var E = t.i(601743),
    H = t.i(701082),
    U = t.i(918120),
    A = t.i(737698),
    P = t.i(619290),
    v = t.i(575281),
    S = t.i(293434),
    x = t.i(378873),
    O = t.i(370787);
  async function q(t, r) {
    let a = (0, S.f)(t.map((t) => t.shareBps)),
      n = (await (0, O.c)(t.map((t, e) => ({ charityId: t.id, weight: a[e] }))))
        .id,
      o = new i.PublicKey(n);
    return {
      donationFeePda: (0, e.v)(r, o),
      configIdPubkey: o,
      shareBpsTotal: t.reduce((t, e) => t + e.shareBps, 0),
    };
  }
  async function j(t) {
    let r,
      {
        walletPublicKey: i,
        mint: n,
        recipients: o,
        quoteMint: s,
        quoteTokenProgram: u,
        connection: c,
      } = t,
      l = o.map((t) =>
        "wallet" === t.kind && t.isTokenizedAgent
          ? { ...t, address: (0, A.K)(n)[0] }
          : t,
      );
    (0, x.p)(l);
    let d = l.filter((t) => "wallet" === t.kind && t.shareBps > 0),
      h = l.filter((t) => "charity" === t.kind && t.shareBps > 0);
    h.length > 0 && (r = await q(h, n));
    let p = [],
      w = [],
      f = [
        ...d.map((t) => ({ address: t.address, shareBps: t.shareBps })),
        ...(r
          ? [{ address: r.donationFeePda, shareBps: r.shareBpsTotal }]
          : []),
      ],
      g = await e.A.createFeeSharingConfig({ creator: i, mint: n, pool: null });
    if ((w.push({ address: i, shareBps: 1e4 }), p.push(g), r)) {
      let t = await e.A.createDonationFeePda({
        coinCreator: i,
        mint: n,
        configId: r.configIdPubkey,
        quoteMint: s,
      });
      p.push(t);
    }
    if (
      w.length !== f.length ||
      w.some((t, e) => {
        let r = f[e];
        return (
          !r ||
          t.address.toBase58() !== r.address.toBase58() ||
          t.shareBps !== r.shareBps
        );
      })
    ) {
      if (!s.equals(a.w)) {
        let t = (0, e.k)(n),
          r = [(0, e.r)(t), (0, e.Z)(t), ...w.map((t) => t.address)],
          a = r.map((t) => (0, v.h)(s, t, !0, u)),
          o = await c.getMultipleAccountsInfo(a);
        for (let t = 0; t < a.length; t++)
          o[t] || p.push((0, P.f)(i, a[t], r[t], s, u));
      }
      let t = await e.A.updateFeeSharesV2({
        authority: i,
        mint: n,
        currentShareholders: w.map((t) => t.address),
        newShareholders: f,
        quoteTokenProgram: u,
        quoteMint: s,
      });
      p.push(t);
    }
    return p;
  }
  var C = t.i(503630),
    z = t.i(641947);
  t.i(753134);
  var B = t.i(43074),
    J = t.i(595673),
    I = t.i(548127),
    M = t.i(443618),
    N = t.i(655397),
    D = t.i(30181);
  async function F(t) {
    try {
      let e = (0, D.K)({ clientServerUrl: t }, { throwHttpErrors: !1 }),
        r = await e("GET /vanity/random-mint-public-key");
      return new i.PublicKey(r.pubkey);
    } catch (t) {
      return (console.error(`Failed to fetch a vanity key: ${t}`), null);
    }
  }
  async function G({
    clientServerUrl: t,
    reservedMint: e,
    reservedMintKeypair: r,
    isVanityMint: a,
  }) {
    if (e) {
      let t = i.Keypair.generate(),
        n = a ?? !0;
      return (
        !n && r && (t = r),
        { mint: e, mintKeypair: t, isVanityAddress: n }
      );
    }
    let n = i.Keypair.generate(),
      o = await F(t);
    return o
      ? { mint: o, mintKeypair: n, isVanityAddress: !0 }
      : { mint: n.publicKey, mintKeypair: n, isVanityAddress: !1 };
  }
  async function K({
    connection: t,
    payer: e,
    instructions: r,
    defaultUnits: a,
    unitsScaleFactor: n,
    priorityLevel: o,
    addressLookupTableAccounts: s,
    frontRunningProtection: u = !1,
  }) {
    let c = new i.VersionedTransaction(
        new i.TransactionMessage({
          payerKey: e,
          recentBlockhash: "11111111111111111111111111111111",
          instructions: [
            i.ComputeBudgetProgram.setComputeUnitLimit({ units: 14e5 }),
            i.ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 1 }),
            ...r,
          ],
        }).compileToV0Message(s),
      ),
      [l, d] = await Promise.all([
        (0, y.g)(t, c, a, { throwOnSimulationError: !1 }),
        (0, y.s)(t, c, o),
      ]);
    return [
      (0, y.U)({
        units: Math.min(Math.floor(l * n), 14e5),
        frontRunningProtection: u,
      }),
      i.ComputeBudgetProgram.setComputeUnitPrice({ microLamports: d }),
      ...r,
    ];
  }
  (t.s(["b", 0, F, "Y", 0, G], 684182),
    t.s(
      [
        "f",
        0,
        function () {
          let { t } = (0, o.f)(),
            { wallet: d } = (0, r.F)(),
            { priorityLevel: h } = (0, H.f)(),
            { tipAmount: p } = (0, U.f)(),
            w = (0, k.f)((t) => t.connection),
            f = (0, k.f)((t) => t.global.global?.decodedAccount ?? null),
            { signAndSendVersionedTx: g } = (0, E.f)(),
            m = (0, c.i)((t) => t.isMayhemEnabled),
            $ = (0, l.g)((t) => t.pair);
          return {
            signSendCreateBuyTx: (0, n.useCallback)(
              async ({
                name: r,
                symbol: n,
                uri: o,
                creator: c,
                user: k,
                amount: _,
                solAmount: E,
                mayhemMode: H,
                preResolvedMint: U,
                feeDistribution: A,
                creatorFeeBps: P,
                holderReward: v = !1,
              }) => {
                let S, x, O, q;
                if (!f || !d) return;
                let D = (0, C.R)(),
                  L = H ?? m;
                if ((0, l.Q)($) || void 0 !== P || v) {
                  let e = (0, l._)($);
                  if ("stock" === $.kind && !e) return;
                  let i = U ?? (await G({ clientServerUrl: D })),
                    s = await b({
                      wallet: d,
                      connection: w,
                      clientServerUrl: D,
                      mint: i.mint,
                      mintKeypair: i.mintKeypair,
                      isVanityAddress: i.isVanityAddress,
                      name: r,
                      symbol: n,
                      uri: o,
                      creator: c,
                      user: k,
                      amountIn: E,
                      denomination: "usdc" === $.kind ? "usdc" : "sol",
                      quoteMint: e
                        ? e.mint
                        : ("usdc" === $.kind ? (0, N.p)() : a.w).toBase58(),
                      slippageBps: e ? 200 : 1e3 * ("usdc" === $.kind),
                      prepSwapSymbol: e?.symbol,
                      mayhemMode: !e && L,
                      holderReward: v,
                      creatorFeeBps: P,
                      multiHop: "pump" === $.kind,
                    });
                  return e
                    ? {
                        ...s,
                        confirmTxPromise: s.confirmTxPromise.catch((r) => {
                          throw r instanceof R
                            ? new R(
                                t("web.create.pair_stock_swap_only", {
                                  symbol: e.symbol,
                                  detail: r.message,
                                }),
                                {
                                  prepSignature: r.prepSignature,
                                  stockSymbol: r.stockSymbol,
                                },
                              )
                            : r;
                        }),
                      }
                    : s;
                }
                let V = i.Keypair.generate(),
                  Q = !0;
                if (U)
                  ((S = U.mint), (V = U.mintKeypair), (Q = U.isVanityAddress));
                else if (A?.reservedMint)
                  ((S = A.reservedMint),
                    (Q = A.isVanityMint) ||
                      !A.reservedMintKeypair ||
                      (V = A.reservedMintKeypair));
                else {
                  let t = await F(D);
                  t ? (S = t) : ((S = V.publicKey), (Q = !1));
                }
                let W =
                    A?.recipientsSnapshot ??
                    A?.queryClient.getQueryData([
                      "creator-reward-recipients",
                      S.toBase58(),
                    ]) ??
                    [],
                  Y = !!(A && (0, u.D)(W, A.creatorWallet)),
                  X = Y && z.A,
                  Z = "usdc" === $.kind ? (0, N.p)() : a.w,
                  tt = await e.A.createV2AndBuyV2Instructions({
                    global: f,
                    mint: S,
                    name: r,
                    symbol: n,
                    uri: o,
                    creator: c,
                    user: k,
                    amount: _,
                    quoteAmount: E,
                    mayhemMode: L,
                    quoteTokenProgram: a.z,
                    quoteMint: Z,
                  }),
                  te = I.v + I.i,
                  tr = await w.getAddressLookupTable(
                    new i.PublicKey(
                      "Hyif6eWb8x88RVrvjPfabsgRYnwkVnyByEXTVTXbUcyP",
                    ),
                  ),
                  ta = tr.value ? [tr.value] : [],
                  ti = await K({
                    connection: w,
                    payer: k,
                    instructions: tt,
                    defaultUnits: te,
                    unitsScaleFactor: I.g + 0.05,
                    priorityLevel: h,
                    addressLookupTableAccounts: ta,
                    frontRunningProtection: X,
                  }),
                  tn = await (0, M.w)(w);
                if (!tn)
                  throw (
                    console.error(
                      "[useFrontendCreateCoin] No blockhash available for transaction",
                    ),
                    Error("No blockhash available")
                  );
                let to = new i.VersionedTransaction(
                  new i.TransactionMessage({
                    payerKey: k,
                    recentBlockhash: tn.blockhash,
                    instructions: ti,
                  }).compileToV0Message(ta),
                );
                if (
                  (Q
                    ? (to = await (0, y.k)(D, {
                        serializedTx: (0, T.Z)(to),
                        mint: S.toString(),
                        isFreeCoinCreation: !1,
                      }))
                    : to.sign([V]),
                  !Y)
                ) {
                  let t = await g({ transaction: to, defaultUnits: te });
                  if (!t) return;
                  return { mint: S, ...t };
                }
                if (!d.signTransaction) return;
                try {
                  x = await j({
                    walletPublicKey: k,
                    mint: S,
                    recipients: W,
                    quoteMint: Z,
                    quoteTokenProgram: a.z,
                    connection: w,
                  });
                } catch (t) {
                  throw (
                    console.error(
                      "[useFrontendCreateCoin] Failed to build fee-sharing instructions",
                      t,
                    ),
                    t instanceof Error
                      ? t
                      : Error("Failed to build fee-sharing instructions")
                  );
                }
                let ts = I.o + 12e4,
                  tu = (t) => {
                    let e = X
                      ? (0, y.u)(x, ts, !0, p, k)
                      : [
                          i.ComputeBudgetProgram.setComputeUnitLimit({
                            units: ts,
                          }),
                          i.ComputeBudgetProgram.setComputeUnitPrice({
                            microLamports: Math.floor(1e12 / ts),
                          }),
                          ...x,
                        ];
                    return new i.VersionedTransaction(
                      new i.TransactionMessage({
                        payerKey: k,
                        recentBlockhash: t,
                        instructions: e,
                      }).compileToV0Message(ta),
                    );
                  };
                if (X) {
                  let t = tu(tn.blockhash),
                    [e, r] = d.signAllTransactions
                      ? await d.signAllTransactions([to, t])
                      : [
                          await d.signTransaction(to),
                          await d.signTransaction(t),
                        ],
                    a = performance.now(),
                    i = (0, T.w)(e),
                    n = {
                      blockhash: tn.blockhash,
                      lastValidBlockHeight: tn.lastValidBlockHeight,
                    },
                    o = await (0, y.x)([e, r]);
                  if (!o.ok) throw Error(o.message);
                  let s = w
                    .confirmTransaction({ signature: i, ...n }, "processed")
                    .then((t) => {
                      if (t.value.err) throw (0, B.d)(t.value.err, e);
                      return t.value;
                    });
                  return {
                    mint: S,
                    signature: i,
                    confirmTxPromise: s,
                    signedTimestamp: a,
                  };
                }
                let tc = tu(tn.blockhash);
                if (d.signAllTransactions) {
                  let [t, e] = await d.signAllTransactions([to, tc]);
                  ((O = t), (q = e));
                } else ((O = await d.signTransaction(to)), (q = null));
                let tl = performance.now(),
                  td = (0, T.w)(O);
                await w.sendTransaction(O, {
                  skipPreflight: !0,
                  maxRetries: 0,
                });
                let th = await w.confirmTransaction(
                  {
                    signature: td,
                    blockhash: tn.blockhash,
                    lastValidBlockHeight: tn.lastValidBlockHeight,
                  },
                  "processed",
                );
                if (th.value.err) throw (0, B.d)(th.value.err, O);
                let tp = {
                    mint: S,
                    signature: td,
                    confirmTxPromise: Promise.resolve(th.value),
                    signedTimestamp: tl,
                  },
                  tw = async (t, e) => {
                    let r = (0, T.w)(t);
                    await w.sendTransaction(t, {
                      skipPreflight: !0,
                      maxRetries: 0,
                    });
                    let a = w
                      .confirmTransaction(
                        {
                          signature: r,
                          blockhash: e.blockhash,
                          lastValidBlockHeight: e.lastValidBlockHeight,
                        },
                        "processed",
                      )
                      .then((e) => {
                        if (e.value.err) throw (0, B.d)(e.value.err, t);
                        return e.value;
                      });
                    return { sig: r, promise: a };
                  };
                try {
                  if (q)
                    try {
                      let { promise: t } = await tw(q, tn);
                      return (await t, tp);
                    } catch (t) {
                      if (
                        !(
                          t instanceof
                            i.TransactionExpiredBlockheightExceededError ||
                          t instanceof i.TransactionExpiredTimeoutError
                        )
                      )
                        throw t;
                    }
                  let t = await (0, M.w)(w);
                  if (!t)
                    throw Error("no blockhash available for fee-sharing tx");
                  let e = await d.signTransaction(tu(t.blockhash)),
                    r = await tw(e, t);
                  return (await r.promise, tp);
                } catch (r) {
                  var tf;
                  let e;
                  return (
                    console.error(
                      "[useFrontendCreateCoin]",
                      (e = t("web.create.fee_sharing_failed_description", {
                        signature: td,
                        detail: (tf =
                          r instanceof Error ? r.message : String(r)),
                      })),
                    ),
                    s.c.error(t("web.create.fee_sharing_failed_title"), {
                      description: e,
                    }),
                    (0, J.$X)({
                      isFree: !1,
                      tokensBought: _.toNumber(),
                      solPaid: E.toNumber(),
                      isMayhemMode: L,
                      error: `fee-sharing setup failed: ${tf}`,
                      signature: td,
                      feeSharing: !0,
                    }),
                    tp
                  );
                }
              },
              [d, f, w, h, m, $, g, p, t],
            ),
          };
        },
      ],
      401605,
    ));
};
