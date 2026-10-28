// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t,
    n,
    a,
    i,
    o,
    r,
    s,
    l,
    c,
    u = e.i(732486),
    d = e.i(927035),
    m = e.i(352386),
    f = e.i(42799),
    A = e.i(995040),
    g = e.i(727472),
    v = e.i(25047),
    h = e.i(847181),
    p = e.i(918048),
    I = e.i(615802),
    S = e.i(226439),
    T = e.i(635164),
    C = e.i(39174);
  function y({ rows: e }) {
    return (0, u.jsx)(C.a, {
      children: e
        .filter((e) => !!e)
        .map((e, t) =>
          null != e.value || e.isLoading
            ? (0, u.jsxs)(
                C.R,
                {
                  children: [
                    (0, u.jsx)(T.L, { children: e.label }),
                    (0, u.jsx)(T.V, {
                      $isLoading: e.isLoading,
                      children: e.value,
                    }),
                  ],
                },
                t,
              )
            : null,
        ),
    });
  }
  var w = e.i(933185),
    b = e.i(565530),
    x = e.i(748117),
    k = e.i(636447),
    W = e.i(731110),
    N = e.i(525856),
    z = e.i(679594),
    L = e.i(153778),
    j = e.i(905100),
    U = e.i(270203),
    P = e.i(887583);
  (e.i(173562), e.i(74812), e.i(970260));
  var F = e.i(825717),
    E = e.i(617712),
    O =
      (((t = O || {})[(t.Uninitialized = 0)] = "Uninitialized"),
      (t[(t.Initialized = 1)] = "Initialized"),
      t),
    M =
      (((n = M || {})[(n.Legacy = 0)] = "Legacy"),
      (n[(n.Current = 1)] = "Current"),
      n),
    B = (((a = B || {})[(a.Nonce = 0)] = "Nonce"), a),
    D =
      (((i = D || {})[(i.CreateAccount = 0)] = "CreateAccount"),
      (i[(i.Assign = 1)] = "Assign"),
      (i[(i.TransferSol = 2)] = "TransferSol"),
      (i[(i.CreateAccountWithSeed = 3)] = "CreateAccountWithSeed"),
      (i[(i.AdvanceNonceAccount = 4)] = "AdvanceNonceAccount"),
      (i[(i.WithdrawNonceAccount = 5)] = "WithdrawNonceAccount"),
      (i[(i.InitializeNonceAccount = 6)] = "InitializeNonceAccount"),
      (i[(i.AuthorizeNonceAccount = 7)] = "AuthorizeNonceAccount"),
      (i[(i.Allocate = 8)] = "Allocate"),
      (i[(i.AllocateWithSeed = 9)] = "AllocateWithSeed"),
      (i[(i.AssignWithSeed = 10)] = "AssignWithSeed"),
      (i[(i.TransferSolWithSeed = 11)] = "TransferSolWithSeed"),
      (i[(i.UpgradeNonceAccount = 12)] = "UpgradeNonceAccount"),
      i);
  function R(e) {
    return !!e && "object" == typeof e && "address" in e && (0, E.n)(e);
  }
  var G = e.i(750505),
    $ = e.i(597188),
    H = e.i(514186),
    V =
      (((o = V || {})[(o.Uninitialized = 0)] = "Uninitialized"),
      (o[(o.Initialized = 1)] = "Initialized"),
      (o[(o.Frozen = 2)] = "Frozen"),
      o),
    Y =
      (((r = Y || {})[(r.MintTokens = 0)] = "MintTokens"),
      (r[(r.FreezeAccount = 1)] = "FreezeAccount"),
      (r[(r.AccountOwner = 2)] = "AccountOwner"),
      (r[(r.CloseAccount = 3)] = "CloseAccount"),
      r),
    J =
      (((s = J || {})[(s.CreateAssociatedToken = 0)] = "CreateAssociatedToken"),
      (s[(s.CreateAssociatedTokenIdempotent = 1)] =
        "CreateAssociatedTokenIdempotent"),
      (s[(s.RecoverNestedAssociatedToken = 2)] =
        "RecoverNestedAssociatedToken"),
      s),
    K =
      (((l = K || {})[(l.Mint = 0)] = "Mint"),
      (l[(l.Token = 1)] = "Token"),
      (l[(l.Multisig = 2)] = "Multisig"),
      l),
    Q =
      (((c = Q || {})[(c.InitializeMint = 0)] = "InitializeMint"),
      (c[(c.InitializeAccount = 1)] = "InitializeAccount"),
      (c[(c.InitializeMultisig = 2)] = "InitializeMultisig"),
      (c[(c.Transfer = 3)] = "Transfer"),
      (c[(c.Approve = 4)] = "Approve"),
      (c[(c.Revoke = 5)] = "Revoke"),
      (c[(c.SetAuthority = 6)] = "SetAuthority"),
      (c[(c.MintTo = 7)] = "MintTo"),
      (c[(c.Burn = 8)] = "Burn"),
      (c[(c.CloseAccount = 9)] = "CloseAccount"),
      (c[(c.FreezeAccount = 10)] = "FreezeAccount"),
      (c[(c.ThawAccount = 11)] = "ThawAccount"),
      (c[(c.TransferChecked = 12)] = "TransferChecked"),
      (c[(c.ApproveChecked = 13)] = "ApproveChecked"),
      (c[(c.MintToChecked = 14)] = "MintToChecked"),
      (c[(c.BurnChecked = 15)] = "BurnChecked"),
      (c[(c.InitializeAccount2 = 16)] = "InitializeAccount2"),
      (c[(c.SyncNative = 17)] = "SyncNative"),
      (c[(c.InitializeAccount3 = 18)] = "InitializeAccount3"),
      (c[(c.InitializeMultisig2 = 19)] = "InitializeMultisig2"),
      (c[(c.InitializeMint2 = 20)] = "InitializeMint2"),
      (c[(c.GetAccountDataSize = 21)] = "GetAccountDataSize"),
      (c[(c.InitializeImmutableOwner = 22)] = "InitializeImmutableOwner"),
      (c[(c.AmountToUiAmount = 23)] = "AmountToUiAmount"),
      (c[(c.UiAmountToAmount = 24)] = "UiAmountToAmount"),
      c);
  function Z(e, t) {
    return (t) => {
      if (!t.value) return Object.freeze({ address: e, role: F.f.READONLY });
      let n = t.isWritable ? F.f.WRITABLE : F.f.READONLY;
      return Object.freeze({
        address: (function (e) {
          if (!e) throw Error("Expected a Address.");
          return "object" == typeof e && "address" in e
            ? e.address
            : Array.isArray(e)
              ? e[0]
              : e;
        })(t.value),
        role: q(t.value) ? (0, F.a)(n) : n,
        ...(q(t.value) ? { signer: t.value } : {}),
      });
    };
  }
  function q(e) {
    return !!e && "object" == typeof e && "address" in e && (0, E.n)(e);
  }
  async function X(e, t = {}) {
    let { programAddress: n = "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL" } =
      t;
    return await (0, P.i)({
      programAddress: n,
      seeds: [
        (0, P.U)().encode(e.owner),
        (0, P.U)().encode(e.tokenProgram),
        (0, P.U)().encode(e.mint),
      ],
    });
  }
  var _ = e.i(683903),
    ee = e.i(338834),
    et = e.i(677558),
    en = e.i(296158),
    ea = e.i(952707),
    ei = e.i(867599),
    eo = e.i(809845);
  function er(e) {
    return BigInt(Math.floor(1e9 * parseFloat(e)));
  }
  function es(e) {
    return +el.format(parseFloat(e.toString()) / 1e9);
  }
  (e.i(252494), e.i(785373));
  let el = Intl.NumberFormat(void 0, { maximumFractionDigits: 8 });
  async function ec({
    tx: e,
    solanaClient: t,
    amount: n,
    asset: a,
    tokenPrice: i,
  }) {
    if (!e) return null;
    if ("SOL" === a && i) {
      let a = er(n),
        o = (0, ei.g)(a, i),
        r = await (0, et.f)({ solanaClient: t, tx: e });
      return {
        amountInUsd: o,
        feeInUsd: i ? (0, ei.g)(r, i) : void 0,
        totalInUsd: (0, ei.g)(a + r, i),
      };
    }
    if ("USDC" === a && i) {
      let a,
        o = "$" + n,
        r = await (0, et.f)({ solanaClient: t, tx: e }),
        s = (a = (parseFloat(r.toString()) / _.L) * i) < 0.01 ? 0 : a;
      return {
        amountInUsd: o,
        feeInUsd: (0, ei.g)(r, i),
        totalInUsd: "$" + (parseFloat(n) + s).toFixed(2),
      };
    }
    if ("SOL" === a) {
      let a = er(n),
        i = await (0, et.f)({ solanaClient: t, tx: e });
      return {
        amountInSol: n + " SOL",
        feeInSol: es(i) + " SOL",
        totalInSol: es(a + i) + " SOL",
      };
    }
    return {
      amountInUsdc: n + " USDC",
      feeInSol: es(await (0, et.f)({ solanaClient: t, tx: e })) + " SOL",
    };
  }
  let eu = {
    component: function () {
      let e = (0, w.a)(),
        { closePrivyModal: t, createAnalyticsEvent: n } = (0, x.u)(),
        { data: a, setModalData: i, navigate: o } = (0, k.u)(),
        { wallets: r } = (0, W.o)(),
        [s, l] = (0, m.useState)("preparing"),
        [c, T] = (0, m.useState)(),
        [C, P] = (0, m.useState)(),
        [O, M] = (0, m.useState)();
      if (!a?.solanaFundingData) throw Error("Funding config is missing");
      if (!a.solanaFundingData.sourceWalletData)
        throw Error("Funding config is missing source wallet data");
      let {
          amount: B,
          asset: D,
          chain: V,
          sourceWalletData: Y,
          destinationAddress: J,
          afterSuccessScreen: K,
        } = a.solanaFundingData,
        Q = r.find(
          (e) =>
            e.address === Y.address &&
            (0, eo.t)(Y.walletClientType) === (0, eo.t)(e.standardWallet.name),
        ),
        q = (0, W.q)()(V),
        { tokenPrice: es, isTokenPriceLoading: el } = (0, N.u)("solana");
      return (
        (0, m.useEffect)(() => {
          if ("preparing" !== s || el || !Q) return;
          let e = "SOL" === D ? er(B) : BigInt(Math.floor(1e6 * parseFloat(B)));
          (P({ amount: ("SOL" === D && es ? (0, ei.g)(e, es) : B) ?? B }),
            ("SOL" === D
              ? (async function ({
                  solanaClient: e,
                  source: t,
                  destination: n,
                  amountInLamports: a,
                }) {
                  let { value: i } = await e.rpc.getLatestBlockhash().send(),
                    o = { address: t },
                    r = (0, G.f)(
                      (0, $.T)({ version: 0 }),
                      (e) => (0, E.I)(o, e),
                      (e) => (0, $.l)(i, e),
                      (e) => {
                        var t;
                        let i, r, s, l;
                        return (0, $.N)(
                          ((i = void 0 ?? "11111111111111111111111111111111"),
                          (r = {
                            source: {
                              value:
                                (t = { amount: a, source: o, destination: n })
                                  .source ?? null,
                              isWritable: !0,
                            },
                            destination: {
                              value: t.destination ?? null,
                              isWritable: !0,
                            },
                          }),
                          (s = { ...t }),
                          {
                            accounts: [
                              (l = (e) => {
                                if (!e.value) return;
                                let t = e.isWritable
                                  ? F.f.WRITABLE
                                  : F.f.READONLY;
                                return Object.freeze({
                                  address: (function (e) {
                                    if (!e) throw Error("Expected a Address.");
                                    return "object" == typeof e &&
                                      "address" in e
                                      ? e.address
                                      : Array.isArray(e)
                                        ? e[0]
                                        : e;
                                  })(e.value),
                                  role: R(e.value) ? (0, F.a)(t) : t,
                                  ...(R(e.value) ? { signer: e.value } : {}),
                                });
                              })(r.source),
                              l(r.destination),
                            ],
                            programAddress: i,
                            data: (0, U.P)(
                              (0, L.n)([
                                ["discriminator", (0, j.H)()],
                                ["amount", (0, j.f)()],
                              ]),
                              (e) => ({ ...e, discriminator: 2 }),
                            ).encode(s),
                          }),
                          e,
                        );
                      },
                      (e) => (0, H.O)(e),
                    );
                  return new Uint8Array((0, H.H)().encode(r));
                })({
                  solanaClient: q,
                  source: Q.address,
                  destination: J,
                  amountInLamports: e,
                })
              : (async function ({
                  solanaClient: e,
                  source: t,
                  destination: n,
                  amountInBaseUnits: a,
                }) {
                  var i;
                  let o,
                    r,
                    s,
                    l = (0, ee.g)(e.chain),
                    { value: c } = await e.rpc.getLatestBlockhash().send(),
                    u = { address: t },
                    [d] = await X({ mint: l, owner: t, tokenProgram: _.T }),
                    [m] = await X({ mint: l, owner: n, tokenProgram: _.T }),
                    [f, A] = await Promise.all([
                      e.rpc
                        .getAccountInfo(d, {
                          commitment: "confirmed",
                          encoding: "jsonParsed",
                        })
                        .send()
                        .catch(() => null),
                      e.rpc
                        .getAccountInfo(m, {
                          commitment: "confirmed",
                          encoding: "jsonParsed",
                        })
                        .send()
                        .catch(() => null),
                    ]);
                  if (!f?.value)
                    throw Error(
                      `Source token account does not exist for address: ${t}`,
                    );
                  let g =
                      ((o =
                        void 0 ??
                        "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"),
                      (r = {
                        payer: {
                          value:
                            (i = { payer: u, ata: m, owner: n, mint: l })
                              .payer ?? null,
                          isWritable: !0,
                        },
                        ata: { value: i.ata ?? null, isWritable: !0 },
                        owner: { value: i.owner ?? null, isWritable: !1 },
                        mint: { value: i.mint ?? null, isWritable: !1 },
                        systemProgram: {
                          value: i.systemProgram ?? null,
                          isWritable: !1,
                        },
                        tokenProgram: {
                          value: i.tokenProgram ?? null,
                          isWritable: !1,
                        },
                      }).tokenProgram.value ||
                        (r.tokenProgram.value =
                          "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
                      r.systemProgram.value ||
                        (r.systemProgram.value =
                          "11111111111111111111111111111111"),
                      {
                        accounts: [
                          (s = Z(o))(r.payer),
                          s(r.ata),
                          s(r.owner),
                          s(r.mint),
                          s(r.systemProgram),
                          s(r.tokenProgram),
                        ],
                        programAddress: o,
                        data: (0, U.P)(
                          (0, L.n)([["discriminator", (0, j.c)()]]),
                          (e) => ({ ...e, discriminator: 1 }),
                        ).encode({}),
                      }),
                    v = (0, G.f)(
                      (0, $.T)({ version: 0 }),
                      (e) => (0, E.I)(u, e),
                      (e) => (0, $.l)(c, e),
                      (e) => (A?.value ? e : (0, $.N)(g, e)),
                      (e) => {
                        var t;
                        let n, i, o, r, s;
                        return (0, $.N)(
                          ((n =
                            void 0 ??
                            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
                          (i = {
                            source: {
                              value:
                                (t = {
                                  source: d,
                                  destination: m,
                                  authority: u,
                                  amount: a,
                                }).source ?? null,
                              isWritable: !0,
                            },
                            destination: {
                              value: t.destination ?? null,
                              isWritable: !0,
                            },
                            authority: {
                              value: t.authority ?? null,
                              isWritable: !1,
                            },
                          }),
                          (r = ((o = { ...t }).multiSigners ?? []).map((e) => ({
                            address: e.address,
                            role: F.f.READONLY_SIGNER,
                            signer: e,
                          }))),
                          {
                            accounts: [
                              (s = Z(n))(i.source),
                              s(i.destination),
                              s(i.authority),
                              ...r,
                            ],
                            programAddress: n,
                            data: (0, U.P)(
                              (0, L.n)([
                                ["discriminator", (0, j.c)()],
                                ["amount", (0, j.f)()],
                              ]),
                              (e) => ({ ...e, discriminator: 3 }),
                            ).encode(o),
                          }),
                          e,
                        );
                      },
                      (e) => (0, H.O)(e),
                    );
                  return new Uint8Array((0, H.H)().encode(v));
                })({
                  solanaClient: q,
                  source: Q.address,
                  destination: J,
                  amountInBaseUnits: e,
                })
            )
              .then(T)
              .catch((e) => {
                (l("error"), M(e));
              }));
        }, [s, B, D, V, Q, J, el, es]),
        (0, m.useEffect)(() => {
          "preparing" === s &&
            c &&
            ec({ tx: c, solanaClient: q, amount: B, asset: D, tokenPrice: es })
              .then((e) => {
                (l("loaded"),
                  P({
                    amount:
                      e?.amountInUsd ?? e?.amountInUsdc ?? e?.amountInSol ?? B,
                    fee: e?.feeInUsd ?? e?.feeInSol,
                    total: e?.totalInUsd ?? e?.totalInSol,
                  }));
              })
              .catch((e) => {
                (l("error"), M(e));
              });
        }, [c, B, D, s, es]),
        (0, m.useEffect)(() => {
          "error" === s &&
            O &&
            (i({
              errorModalData: {
                error: O,
                previousScreen: "FundSolWalletWithExternalSolanaWallet",
              },
              solanaFundingData: a.solanaFundingData,
            }),
            o("ErrorScreen", !1));
        }, [s, o]),
        (0, m.useEffect)(() => {
          if ("success" !== s) return;
          let e = setTimeout(K ? () => o(K) : t, w.X);
          return () => clearTimeout(e);
        }, [s]),
        (0, u.jsxs)(
          u.Fragment,
          "success" === s
            ? {
                children: [
                  (0, u.jsx)(p.t, {}),
                  (0, u.jsx)(g.b, {}),
                  (0, u.jsxs)(g.c, {
                    children: [
                      (0, u.jsx)(d.f, {
                        color: "var(--privy-color-success)",
                        width: "64px",
                        height: "64px",
                      }),
                      (0, u.jsx)(h.C, {
                        title: "Success!",
                        description: `You’ve successfully added ${B} ${D} to your ${e.name} wallet. It may take a minute before the funds are available to use.`,
                      }),
                    ],
                  }),
                  (0, u.jsx)(g.R, {}),
                  (0, u.jsx)(v.B, {}),
                ],
              }
            : "preparing" === s || "loaded" === s || "sending" === s
              ? {
                  children: [
                    (0, u.jsx)(p.t, {}),
                    (0, u.jsx)(g.e, {
                      style: { marginTop: "16px" },
                      children: (0, u.jsx)(I.I, {
                        icon: Q?.standardWallet.icon,
                        name: Q?.standardWallet.name,
                      }),
                    }),
                    (0, u.jsx)(h.C, {
                      style: { marginTop: "8px", marginBottom: "12px" },
                      title:
                        "sending" === s && Q
                          ? `Confirming with ${Q.standardWallet.name}`
                          : "Confirm transaction",
                    }),
                    (0, u.jsx)(y, {
                      rows: [
                        { label: "Source", value: (0, f.f)(Y.address) },
                        { label: "Destination", value: (0, f.f)(J) },
                        { label: "Network", value: (0, ea.g)(V) },
                        {
                          label: "Amount",
                          value: C?.amount,
                          isLoading: "preparing" === s,
                        },
                        {
                          label: "Estimated fee",
                          value: C?.fee,
                          isLoading: "preparing" === s,
                        },
                        {
                          label: "Total",
                          value: C?.total,
                          isLoading: "preparing" === s,
                        },
                      ],
                    }),
                    (0, u.jsx)(A.P, {
                      style: { marginTop: "1rem" },
                      loading: "preparing" === s || "sending" === s,
                      onClick: function () {
                        "loaded" === s &&
                          c &&
                          Q &&
                          (l("sending"),
                          (async function ({
                            transaction: e,
                            chain: t,
                            sourceWallet: n,
                            solanaClient: a,
                          }) {
                            let { hasFunds: i } = await (0, et.s)({
                              solanaClient: a,
                              tx: e,
                            });
                            if (!i)
                              throw new b.P(
                                `Wallet ${(0, f.f)(n.address)} does not have enough funds.`,
                                void 0,
                                b.a.INSUFFICIENT_BALANCE,
                              );
                            let o = (0, en.g)(
                              (
                                await n
                                  .signAndSendTransaction({
                                    transaction: e,
                                    chain: t,
                                  })
                                  .catch((e) => {
                                    throw new b.P(
                                      "Transaction was rejected by the user",
                                      e,
                                      b.a.TRANSACTION_FAILURE,
                                    );
                                  })
                              ).signature,
                            );
                            return (
                              await (0, W.x)({
                                rpcSubscriptions: a.rpcSubscriptions,
                                signature: o,
                                timeout: 2e4,
                              }),
                              o
                            );
                          })({
                            solanaClient: q,
                            transaction: c,
                            chain: V,
                            sourceWallet: Q,
                          })
                            .then((e) => {
                              (l("success"),
                                n({
                                  eventName: z.O,
                                  payload: {
                                    provider: "external",
                                    status: "success",
                                    txHash: e,
                                    address: Q.address,
                                    value: B,
                                    chainType: "solana",
                                    clusterName: V,
                                    token: D,
                                    destinationAddress: J,
                                    destinationValue: B,
                                    destinationChainType: "solana",
                                    destinationClusterName: V,
                                    destinationToken: D,
                                  },
                                }));
                            })
                            .catch((e) => {
                              (l("error"), M(e));
                            }));
                      },
                      children: "Confirm",
                    }),
                    (0, u.jsx)(v.B, {}),
                  ],
                }
              : {
                  children: [
                    (0, u.jsx)(p.t, {}),
                    (0, u.jsx)(S.N, {}),
                    (0, u.jsx)("div", { style: { marginTop: "1rem" } }),
                    (0, u.jsx)(v.B, {}),
                  ],
                },
        )
      );
    },
  };
  e.s(
    ["FundSolWalletWithExternalSolanaWallet", 0, eu, "default", 0, eu],
    168655,
  );
};
