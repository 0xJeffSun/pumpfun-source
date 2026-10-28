// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(927035),
    a = e.i(352386),
    n = e.i(858959),
    r = e.i(122507),
    o = e.i(385021),
    s = e.i(496194),
    d = e.i(499868),
    l = e.i(766409),
    c = e.i(178061),
    u = e.i(727472),
    g = e.i(25047),
    f = e.i(847181),
    h = e.i(918048),
    p = e.i(226439),
    v = e.i(933185),
    m = e.i(565530),
    y = e.i(461687),
    x = e.i(748117),
    b = e.i(636447),
    S = e.i(525856),
    w = e.i(582355),
    P = e.i(679594),
    T = e.i(385937),
    C = e.i(616800),
    E = e.i(952707),
    F = e.i(384799),
    I = e.i(328063),
    k = e.i(336291),
    N = e.i(451993),
    U = e.i(580129);
  (e.i(252494), e.i(785373), e.i(768820), e.i(535391));
  let A = {
    component: () => {
      let e = (0, v.a)(),
        {
          rpcConfig: A,
          appId: B,
          closePrivyModal: L,
          createAnalyticsEvent: $,
        } = (0, x.u)(),
        { navigate: j, setModalData: D, data: z } = (0, b.u)(),
        M = (0, v.a)(),
        { wallets: R } = (0, w.u)(),
        [q, H] = (0, a.useState)(null),
        [G, O] = (0, a.useState)(null),
        [W, V] = (0, a.useState)([]),
        [Z, J] = (0, a.useState)(0),
        [Y, K] = (0, a.useState)(!1),
        [Q, X] = (0, a.useState)(!1),
        [_, ee] = (0, a.useState)(!1),
        [et, ei] = (0, a.useState)(!1),
        [ea, en] = (0, a.useState)(),
        [er, eo] = (0, a.useState)();
      if (!z?.funding || "solana" !== z.funding.chainType)
        throw Error("Invalid funding data");
      let { address: es, chain: ed, connectedWallet: el } = z.funding,
        [ec, eu] = (0, a.useState)(z.funding.amount),
        eg = ("ethereum" === el?.type ? el : void 0) ?? R[0],
        ef = (0, y.k)(eg?.walletClientType || "unknown"),
        eh = ef?.name || "wallet",
        [ep, ev] = (0, a.useState)(null);
      (0, a.useEffect)(() => {
        (async () => {
          if (!eg) return;
          let e = await eg.getEthereumProvider();
          ev(
            (0, n.f)({ account: eg.address, transport: (0, r.f)(e) }).extend(
              o.f,
            ),
          );
        })().catch(console.error);
      }, [eg]);
      let [em, ey] = (0, a.useState)(0n),
        ex = (0, F.g)(em);
      (0, a.useEffect)(() => {
        let t = e.solanaRpcs[ed];
        t
          ? (0, C.p)({ rpc: t.rpc, address: es })
              .then((e) => ey(BigInt(e)))
              .catch(console.error)
          : console.warn("Unable to load solana rpc, skipping balance");
      }, []);
      let [eb, eS] = (0, a.useState)(),
        { tokenPrice: ew } = (0, S.u)("solana"),
        { fundingAmountInBaseUnit: eP, fundingAmountInUsd: eT } = (0, F.a)({
          amount: ec,
          fee: 0n,
          tokenPrice: ew,
          isUsdc: z.funding.isUSDC,
        });
      if (
        ((0, a.useEffect)(() => {
          (async () => {
            if (!ep || !eg) return;
            let e = ["solana:testnet", "solana:devnet"].includes(ed);
            e && console.warn("Solana testnets are not supported for bridging");
            let t = (0, c.i)(M.chains).filter(({ testnet: t }) => !!t === e),
              i = (
                await (0, I.g)({
                  chains: t,
                  address: eg.address,
                  appId: B,
                  rpcConfig: A,
                })
              ).filter((e) => e.balance > 0n);
            if (i.length < 1)
              return void H(
                new m.P(
                  `Wallet ${(0, k.c)(eg.address)} does not have enough funds.`,
                  void 0,
                  m.a.INSUFFICIENT_BALANCE,
                ),
              );
            i.sort((e, t) => Number(t.balance - e.balance));
            let a = (
              await Promise.allSettled(
                i.map(async (e) => ({
                  ...e,
                  quote: await (0, T.g)({
                    isTestnet: !1,
                    input: (0, T.t)({
                      appId: B,
                      amount: eP.toString(),
                      user: eg.address,
                      recipient: es,
                      destinationChainId: T.c,
                      destinationCurrency: T.b,
                      originChainId: e.chain.id,
                    }),
                  }),
                })),
              )
            )
              .filter((e) => "fulfilled" === e.status)
              .map((e) => e.value);
            if (a.length < 1)
              return void H(
                new m.P(
                  `Unable to fetch quotes for bridging. Wallet ${(0, k.c)(eg.address)} does not have enough funds.`,
                  void 0,
                  m.a.INSUFFICIENT_BALANCE,
                ),
              );
            let n = a
              .map(({ quote: e, balance: t, chain: i }) => ({
                bridgeTx: (0, T.a)(e),
                balance: t,
                chain: i,
                isErc20Quote: !1,
              }))
              .filter(({ bridgeTx: e }) => !!e);
            if (n.length > 1) return void V(n);
            let r = n.at(0);
            r
              ? (X(!0),
                eS({
                  data: r.bridgeTx.data,
                  to: r.bridgeTx.to,
                  value: r.bridgeTx.value,
                  chain: r.chain,
                }))
              : H(
                  new m.P(
                    `Unable to select bridge option from quotes. Wallet ${(0, k.c)(eg.address)} does not have enough funds.`,
                    void 0,
                    m.a.INSUFFICIENT_BALANCE,
                  ),
                );
          })().catch(console.error);
        }, [ep]),
        (0, a.useEffect)(() => {
          (async () => {
            let e, t;
            if (!ep || !eg || Y || _ || !eb) return;
            K(!0);
            let i = (0, s.f)({
              chain: eb.chain,
              transport: (0, d.f)((0, N.a)(eb.chain, A, B)),
            });
            try {
              e = await i.prepareTransactionRequest({
                account: eg.address,
                to: eb.to,
                chain: eb.chain,
                data: eb.data,
                value: BigInt(eb.value ?? 0),
              });
            } catch (e) {
              (console.error(e),
                W.length > 1 && O(e.shortMessage ?? "Something went wrong"));
            }
            if (e) {
              ("eip1559" === e.type ||
              "eip4844" === e.type ||
              "eip7702" === e.type
                ? void 0 !== e.gasPrice && delete e.gasPrice
                : ("legacy" === e.type || "eip2930" === e.type) &&
                  (void 0 !== e.maxFeePerGas && delete e.maxFeePerGas,
                  void 0 !== e.maxPriorityFeePerGas &&
                    delete e.maxPriorityFeePerGas),
                K(!1),
                ee(!0));
              try {
                await ep.switchChain({ id: eb.chain.id });
              } catch (e) {
                (await ep.addChain({ chain: eb.chain }),
                  await ep.switchChain({ id: eb.chain.id }));
              }
              try {
                t = await ep.sendTransaction(e);
              } catch (e) {
                (console.error(e),
                  "TransactionExecutionError" === e.name &&
                    (W.length < 1
                      ? H(
                          new m.P(
                            e.shortMessage,
                            void 0,
                            m.a.TRANSACTION_FAILURE,
                          ),
                        )
                      : O(e.shortMessage ?? "Something went wrong")));
              }
              if (t)
                return (
                  await ep.waitForTransactionReceipt({ hash: t }),
                  Q
                    ? (eo("pending"), void en(t))
                    : (ee(!1),
                      ei(!0),
                      void $({
                        eventName: P.O,
                        payload: {
                          provider: "external",
                          status: "success",
                          txHash: t,
                          address: eg.address,
                          chainId: eb.chain.id,
                          chainType: "ethereum",
                          value: eb.value
                            ? (0, l.f)(BigInt(eb.value), 18)
                            : void 0,
                          token: "ETH",
                          destination: es,
                          destinationClusterName: "mainnet-beta",
                          destinationChainType: "solana",
                          destinationValue: (0, l.f)(eP, 9),
                          destinationToken: "SOL",
                        },
                      }))
                );
              ee(!1);
            } else K(!1);
          })().catch(console.error);
        }, [ep, eb]),
        (0, T.u)({
          transactionHash: ea,
          isTestnet: !1,
          bridgingStatus: er,
          setBridgingStatus: eo,
          onSuccess({ transactionHash: e }) {
            (X(!1),
              ei(!0),
              $({
                eventName: P.O,
                payload: {
                  provider: "external",
                  status: "success",
                  txHash: e,
                  address: eg?.address,
                  chainId: eb?.chain.id,
                  chainType: "ethereum",
                  value: eb?.value ? (0, l.f)(BigInt(eb.value), 18) : void 0,
                  token: "ETH",
                  destination: es,
                  destinationClusterName: "mainnet-beta",
                  destinationChainType: "solana",
                  destinationValue: (0, l.f)(eP, 9),
                  destinationToken: "SOL",
                },
              }));
          },
          onFailure({ error: e }) {
            (X(!1), H(e));
          },
        }),
        (0, a.useEffect)(() => {
          q &&
            (D({
              funding: z?.funding,
              solanaFundingData: z?.solanaFundingData,
              sendTransaction: z?.sendTransaction,
              errorModalData: {
                error: q,
                previousScreen: "TransferFromWalletScreen",
              },
            }),
            j("ErrorScreen", !1));
        }, [q]),
        (0, a.useEffect)(() => {
          if (!et) return;
          let e = setTimeout(L, v.X);
          return () => clearTimeout(e);
        }, [et]),
        et)
      )
        return (0, t.jsxs)(t.Fragment, {
          children: [
            (0, t.jsx)(h.t, {}),
            (0, t.jsx)(u.b, {}),
            (0, t.jsxs)(u.c, {
              children: [
                (0, t.jsx)(i.f, {
                  color: "var(--privy-color-success)",
                  width: "64px",
                  height: "64px",
                }),
                (0, t.jsx)(f.C, {
                  title: "Success!",
                  description: `You’ve successfully added ${ec} SOL to your ${M.name} wallet. It may take a minute before the funds are available to use.`,
                }),
              ],
            }),
            (0, t.jsx)(u.R, {}),
            (0, t.jsx)(g.B, {}),
          ],
        });
      let eC = W[Z];
      return W.length > 1 && eC
        ? (0, t.jsx)(I.B, {
            displayName: eh,
            configuredFundingChain: ed,
            formattedBalance: ex,
            fundingAmount: ec,
            fundingCurrency: "SOL",
            fundingAmountInUsd: eT,
            options: W,
            selectedOption: eC,
            isPreparing: Y,
            isSubmitting: _,
            addressToFund: es,
            fundingWalletAddress: eg?.address || "",
            errorMessage: G,
            onSubmit: () => {
              z.funding?.amount !== ec
                ? (async function () {
                    if (eg && eC)
                      try {
                        let e = await (0, T.g)({
                            isTestnet: !1,
                            input: (0, T.t)({
                              appId: B,
                              amount: eP.toString(),
                              user: eg.address,
                              recipient: es,
                              destinationChainId: T.c,
                              destinationCurrency: T.b,
                              originChainId: eC.chain.id,
                            }),
                          }),
                          t = (0, T.a)(e);
                        if (!t) throw Error("Invalid transaction request");
                        (X(!0),
                          eS({
                            data: t.data,
                            to: t.to,
                            value: t.value,
                            chain: eC.chain,
                          }));
                      } catch (e) {
                        (console.error(e),
                          H(
                            new m.P(
                              "Unable to fetch quotes for bridging",
                              e,
                              m.a.INSUFFICIENT_BALANCE,
                            ),
                          ));
                      }
                  })().catch(console.error)
                : eS({
                    to: eC.bridgeTx.to,
                    data: eC.bridgeTx.data,
                    value: eC.bridgeTx.value,
                    chain: eC.chain,
                  });
            },
            onSelect: (e) => {
              e !== Z && (O(null), J(e));
            },
            onAmountChange: eu,
          })
        : _ && eg
          ? (0, t.jsx)(U.T, {
              walletClientType: eg?.walletClientType || "unknown",
              displayName: eh,
              addressToFund: es,
              isBridging: Q,
              isErc20Flow: !1,
              chainId: "solana",
              chainName: (0, E.g)(ed),
              totalPriceInUsd: void 0,
              totalPriceInNativeCurrency: void 0,
              gasPriceInUsd: void 0,
              gasPriceInNativeCurrency: void 0,
            })
          : (0, t.jsxs)(t.Fragment, {
              children: [
                (0, t.jsx)(h.t, {}),
                (0, t.jsx)(p.N, {}),
                (0, t.jsx)("div", { style: { marginTop: "1rem" } }),
                (0, t.jsx)(g.B, {}),
              ],
            });
    },
  };
  e.s(["AwaitingEvmToSolBridgingScreen", 0, A, "default", 0, A]);
};
