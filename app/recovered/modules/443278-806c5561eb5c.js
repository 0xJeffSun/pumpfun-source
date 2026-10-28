// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(927035),
    n = e.i(352386),
    r = e.i(640603),
    a = e.i(858959),
    s = e.i(122507),
    o = e.i(385021),
    l = e.i(496194),
    d = e.i(499868),
    c = e.i(421957),
    h = e.i(766409),
    u = e.i(178061),
    p = e.i(727472),
    f = e.i(25047),
    g = e.i(847181),
    x = e.i(918048),
    v = e.i(226439),
    m = e.i(933185),
    y = e.i(565530),
    w = e.i(461687),
    j = e.i(748117),
    C = e.i(636447),
    b = e.i(525856),
    k = e.i(582355),
    S = e.i(112420),
    L = e.i(328033),
    F = e.i(625761),
    I = e.i(679594),
    z = e.i(385937),
    T = e.i(616800),
    E = e.i(328063),
    M = e.i(267058),
    A = e.i(336291),
    B = e.i(451993),
    N = e.i(580129);
  (e.i(252494), e.i(785373), e.i(768820), e.i(535391));
  let P = {
    component: () => {
      let {
          rpcConfig: e,
          appId: P,
          closePrivyModal: V,
          createAnalyticsEvent: _,
        } = (0, j.u)(),
        { navigate: $, setModalData: U, data: H } = (0, C.u)(),
        D = (0, m.a)(),
        { wallets: W } = (0, k.u)(),
        [O, R] = (0, n.useState)(!1),
        [q, G] = (0, n.useState)(0n),
        [Z, X] = (0, n.useState)(!1),
        [Y, K] = (0, n.useState)(null),
        [Q, J] = (0, n.useState)(null),
        [ee, et] = (0, n.useState)([]),
        [ei, en] = (0, n.useState)(0),
        [er, ea] = (0, n.useState)([]),
        [es, eo] = (0, n.useState)(!1),
        [el, ed] = (0, n.useState)(!1),
        [ec, eh] = (0, n.useState)(!1),
        [eu, ep] = (0, n.useState)(!1),
        [ef, eg] = (0, n.useState)(),
        [ex, ev] = (0, n.useState)();
      if (!H?.funding || "ethereum" !== H.funding.chainType)
        throw Error("Invalid funding data");
      let { erc20ContractInfo: em, chain: ey, connectedWallet: ew } = H.funding,
        ej = H.funding.address,
        eC = H.funding.erc20Address,
        [eb, ek] = (0, n.useState)(H.funding.amount);
      (0, n.useEffect)(() => {
        eC && !em && K(Error("Unable to fetch token details"));
      }, []);
      let eS = !!eC && !!em,
        eL = eS ? BigInt(parseFloat(eb) * 10 ** em.decimals) : (0, r.f)(eb),
        eF = ("ethereum" === ew?.type ? ew : void 0) ?? W[0],
        eI = (0, w.k)(eF?.walletClientType || "unknown"),
        ez = eI?.name || "wallet",
        [eT, eE] = (0, n.useState)(null);
      (0, n.useEffect)(() => {
        (async () => {
          if (!eF) return;
          let e = await eF.getEthereumProvider();
          eE(
            (0, a.f)({ account: eF.address, transport: (0, s.f)(e) }).extend(
              o.f,
            ),
          );
        })().catch(console.error);
      }, [eF]);
      let [eM, eA] = (0, n.useState)(0n);
      (0, n.useEffect)(() => {
        (0, l.f)({ chain: ey, transport: (0, d.f)((0, B.a)(ey, e, P)) })
          .getBalance({ address: ej })
          .then(eA)
          .catch(console.error);
      }, []);
      let [eB, eN] = (0, n.useState)(0n);
      (0, n.useEffect)(() => {
        eS &&
          (0, M.g)({
            chain: ey,
            address: ej,
            appId: P,
            rpcConfig: e,
            erc20Address: eC,
          })
            .then((e) => eN(e.balance))
            .catch(console.error);
      }, []);
      let { tokenPrice: eP } = (0, b.u)(ey.id),
        [eV, e_] = (0, n.useState)({
          to: ej,
          chain: ey,
          value: eL,
          data: void 0,
        });
      ((0, n.useEffect)(() => {
        (async () => {
          let t, i;
          if (!eT || !eF || es || ec) return;
          eo(!0);
          let n = (0, l.f)({
            chain: eV.chain,
            transport: (0, d.f)((0, B.a)(eV.chain, e, P)),
          });
          if (eS && !eV.data)
            return (await n
              .simulateContract({
                address: eC,
                chain: eV.chain,
                abi: S.E,
                functionName: "transfer",
                args: [ej, eL],
                account: eF.address,
              })
              .catch((e) => {
                if (
                  "ContractFunctionZeroDataError" === e?.cause?.name ||
                  e?.message?.includes("returned no data")
                )
                  return n
                    .simulateContract({
                      address: eC,
                      chain: eV.chain,
                      abi: S.a,
                      functionName: "transfer",
                      args: [ej, eL],
                      account: eF.address,
                    })
                    .catch((e) => {
                      console.warn(
                        "Simulated token transfer failed with error, fetching bridge options.",
                        e,
                      );
                    });
                console.warn(
                  "Simulated token transfer failed with error, fetching bridge options.",
                  e,
                );
              }))
              ? (eo(!1),
                void e_({
                  to: eC,
                  chain: eV.chain,
                  data: (0, c.f)({
                    abi: S.E,
                    functionName: "transfer",
                    args: [ej, eL],
                  }),
                  value: "0x0",
                }))
              : (eo(!1), void X(!0));
          try {
            t = await n.prepareTransactionRequest({
              account: eF.address,
              to: eV.to,
              chain: eV.chain,
              data: eV.data,
              value: BigInt(eV.value ?? 0),
            });
          } catch (e) {
            if ((console.error(e), ee.length > 1))
              J(e.shortMessage ?? "Something went wrong");
            else if (el && 0 === ee.length)
              return void K(
                new y.P(
                  `Wallet ${(0, A.c)(eF.address)} does not have enough funds.`,
                  void 0,
                  y.a.INSUFFICIENT_BALANCE,
                ),
              );
          }
          if (!t) return (eo(!1), void X(!0));
          ("eip1559" === t.type || "eip4844" === t.type || "eip7702" === t.type
            ? void 0 !== t.gasPrice && delete t.gasPrice
            : ("legacy" === t.type || "eip2930" === t.type) &&
              (void 0 !== t.maxFeePerGas && delete t.maxFeePerGas,
              void 0 !== t.maxPriorityFeePerGas &&
                delete t.maxPriorityFeePerGas),
            eo(!1),
            eh(!0),
            R(!0),
            G(t.gas));
          try {
            await eT.switchChain({ id: eV.chain.id });
          } catch (e) {
            (await eT.addChain({ chain: eV.chain }),
              await eT.switchChain({ id: eV.chain.id }));
          }
          try {
            i = await eT.sendTransaction(t);
          } catch (e) {
            if ((console.error(e), "TransactionExecutionError" === e.name))
              if (ee.length < 1) {
                let t = e.shortMessage;
                ((e.shortMessage.includes("rejected the request") ||
                  e.details.includes("rejected the request")) &&
                  (t = "User rejected the request."),
                  K(new y.P(t, void 0, y.a.TRANSACTION_FAILURE)));
              } else J(e.shortMessage ?? "Something went wrong");
          }
          if (i) {
            if ((await eT.waitForTransactionReceipt({ hash: i }), eh(!1), el)) {
              if (er.length > 0) {
                let [e, ...t] = er;
                if (!e) return;
                return (ea(t), void e_(e));
              }
              return (eg(i), void ev("pending"));
            }
            (ep(!0),
              U((0, T.q)(H, "completed", i, eF?.walletClientType, eS, em, ey)),
              _({
                eventName: I.O,
                payload: {
                  provider: "external",
                  status: "success",
                  txHash: i,
                  address: eF.address,
                  chainId: eV.chain.id,
                  chainType: "ethereum",
                  value: eV.value
                    ? (0, h.f)(BigInt(eV.value), em?.decimals ?? 18)
                    : void 0,
                  token: em?.symbol ?? eC ?? "ETH",
                  destinationAddress: ej,
                  destinationChainId: ey.id,
                  destinationChainType: "ethereum",
                  destinationValue: eL
                    ? (0, h.f)(eL, em?.decimals ?? 18)
                    : void 0,
                  destinationToken: em?.symbol ?? eC ?? ey.nativeCurrency.name,
                },
              }));
          } else eh(!1);
        })().catch(console.error);
      }, [eT, eV]),
        (0, n.useEffect)(() => {
          (async () => {
            if (!Z || !eT || !eF) return;
            let t = (0, u.i)(D.chains).filter(
              (e) => e.id !== ey.id && !!e.testnet == !!ey.testnet,
            );
            eS && t.unshift(ey);
            let i = await (0, E.g)({
                chains: t,
                address: eF.address,
                appId: P,
                rpcConfig: e,
              }),
              n = eS
                ? i.filter((e) => e.balance > 0n)
                : i.filter((e) => e.balance > eL),
              r = eS && i.every((e) => 0n === e.balance);
            if (n.length < 1)
              return void K(
                new y.P(
                  r
                    ? `Wallet ${(0, A.c)(eF.address)} doesn't have enough funds to cover gas fees. Top up your wallet and try again.`
                    : `Wallet ${(0, A.c)(eF.address)} does not have enough funds.`,
                  void 0,
                  y.a.INSUFFICIENT_BALANCE,
                ),
              );
            n.sort((e, t) =>
              Number(
                eS
                  ? (t.erc20Balance ?? 0n) - (e.erc20Balance ?? 0n)
                  : t.balance - e.balance,
              ),
            );
            let a = n.flatMap((e) => {
                let t = [
                  {
                    ...e,
                    isErc20Quote: !1,
                    isTestnet: !!ey.testnet,
                    input: (0, z.t)({
                      appId: P,
                      amount: eL.toString(),
                      user: eF.address,
                      recipient: ej,
                      destinationChainId: ey.id,
                      destinationCurrency: eC,
                      originChainId: e.chain.id,
                    }),
                  },
                ];
                return (
                  eS &&
                    eC &&
                    (e.erc20Balance ?? 0n) > 0n &&
                    t.push({
                      ...e,
                      isErc20Quote: !0,
                      isTestnet: !!ey.testnet,
                      input: (0, z.t)({
                        appId: P,
                        amount: eL.toString(),
                        user: eF.address,
                        recipient: ej,
                        destinationChainId: ey.id,
                        destinationCurrency: eC,
                        originChainId: e.chain.id,
                        originCurrency: e.erc20Address,
                      }),
                    }),
                  t
                );
              }),
              s = (
                await Promise.allSettled(
                  a.map(async (e) => ({ ...e, quote: await (0, z.g)(e) })),
                )
              )
                .filter((e) => "fulfilled" === e.status)
                .map((e) => e.value);
            if (s.length < 1)
              return void K(
                new y.P(
                  `Wallet ${(0, A.c)(eF.address)} does not have enough funds.`,
                  void 0,
                  y.a.INSUFFICIENT_BALANCE,
                ),
              );
            let o = s
              .map((e) => ({
                bridgeTx: (0, z.a)(e.quote),
                allTxSteps: (0, z.d)(e.quote),
                balance: e.balance,
                chain: e.chain,
                erc20Balance: e.erc20Balance,
                isErc20Quote: e.isErc20Quote,
              }))
              .filter((e) => !!e.bridgeTx);
            if (o.length > 1) return void et(o);
            let l = o[0];
            if (!l)
              return void K(
                new y.P(
                  `Wallet ${(0, A.c)(eF.address)} does not have enough funds.`,
                  void 0,
                  y.a.INSUFFICIENT_BALANCE,
                ),
              );
            let [d, ...c] = l.allTxSteps ?? [l.bridgeTx];
            d
              ? (ed(!0),
                ea(c.map((e) => ({ ...e, chain: l.chain }))),
                e_({ data: d.data, to: d.to, value: d.value, chain: l.chain }))
              : K(
                  new y.P(
                    `Wallet ${(0, A.c)(eF.address)} does not have enough funds.`,
                    void 0,
                    y.a.INSUFFICIENT_BALANCE,
                  ),
                );
          })().catch(console.error);
        }, [Z]),
        (0, z.u)({
          transactionHash: ef,
          isTestnet: !!ey.testnet,
          bridgingStatus: ex,
          setBridgingStatus: ev,
          onSuccess({ transactionHash: e }) {
            (ed(!1),
              ep(!0),
              U((0, T.q)(H, "completed", e, eF?.walletClientType, eS, em, ey)),
              _({
                eventName: I.O,
                payload: {
                  provider: "external",
                  status: "success",
                  txHash: e,
                  address: eF?.address,
                  chainId: eV.chain.id,
                  chainType: "ethereum",
                  value: eV.value
                    ? (0, h.f)(BigInt(eV.value), em?.decimals ?? 18)
                    : void 0,
                  token: em?.symbol ?? eC ?? "ETH",
                  destinationAddress: ej,
                  destinationChainId: ey.id,
                  destinationChainType: "ethereum",
                  destinationValue: eL
                    ? (0, h.f)(eL, em?.decimals ?? 18)
                    : void 0,
                  destinationToken: em?.symbol ?? eC ?? ey.nativeCurrency.name,
                },
              }));
          },
          onFailure({ error: e }) {
            (ed(!1), K(e));
          },
        }),
        (0, n.useEffect)(() => {
          Y &&
            (U({
              funding: H?.funding,
              solanaFundingData: H?.solanaFundingData,
              sendTransaction: H?.sendTransaction,
              errorModalData: {
                error: Y,
                previousScreen: "TransferFromWalletScreen",
              },
            }),
            $("ErrorScreen", !1));
        }, [Y]));
      let e$ = !eS && eP ? (0, F.c)(eb ?? "0", eP) : void 0,
        eU = eS ? q : (0, F.s)([q, eL]),
        eH = eU && eP ? (0, F.a)(eU, eP) : void 0,
        eD = eU
          ? (0, F.g)(
              eU,
              H?.funding?.erc20Address
                ? H?.funding?.erc20ContractInfo?.symbol || "ETH"
                : H?.funding?.chain.nativeCurrency.symbol || "ETH",
            )
          : void 0,
        eW = q && eP ? (0, F.a)(q, eP) : void 0,
        eO = q ? (0, F.g)(q, ey?.nativeCurrency?.symbol || "ETH") : void 0;
      if (
        ((0, n.useEffect)(() => {
          if (!eu) return;
          let e = setTimeout(V, m.X);
          return () => clearTimeout(e);
        }, [eu]),
        eu)
      )
        return (0, t.jsxs)(t.Fragment, {
          children: [
            (0, t.jsx)(x.t, {}),
            (0, t.jsx)(p.b, {}),
            (0, t.jsxs)(p.c, {
              children: [
                (0, t.jsx)(i.f, {
                  color: "var(--privy-color-success)",
                  width: "64px",
                  height: "64px",
                }),
                (0, t.jsx)(g.C, {
                  title: "Success!",
                  description: `You’ve successfully added ${eb} ${eS ? em.symbol : ey.nativeCurrency.symbol} to your ${D.name} wallet. It may take a minute before the funds are available to use.`,
                }),
              ],
            }),
            (0, t.jsx)(p.R, {}),
            (0, t.jsx)(f.B, {}),
          ],
        });
      let eR = eS
          ? `${(0, L.f)({ amount: eB, decimals: em.decimals })}  ${em.symbol}`
          : (0, F.g)(eM, ey.nativeCurrency.symbol, 3, !0),
        eq = ee[ei];
      return ee.length > 1 && eq
        ? (0, t.jsx)(E.B, {
            displayName: ez,
            configuredFundingChain: ey,
            formattedBalance: eR,
            fundingAmount: eb,
            fundingCurrency: eS ? em.symbol : ey.nativeCurrency.symbol,
            fundingAmountInUsd: e$,
            options: ee,
            selectedOption: eq,
            isPreparing: es,
            isSubmitting: ec,
            addressToFund: ej,
            fundingWalletAddress: eF?.address || "",
            errorMessage: Q,
            onSubmit: () => {
              if (H.funding?.amount === eb) {
                let [e, ...t] = eq.allTxSteps ?? [eq.bridgeTx];
                if (!e) return;
                return (
                  ed(!0),
                  ea(t.map((e) => ({ ...e, chain: eq.chain }))),
                  void e_({
                    to: e.to,
                    data: e.data,
                    value: e.value,
                    chain: eq.chain,
                  })
                );
              }
              (async function () {
                if (eF && eq)
                  try {
                    let e = await (0, z.g)({
                        isTestnet: !!ey.testnet,
                        input: (0, z.t)({
                          appId: P,
                          amount: eL.toString(),
                          user: eF.address,
                          recipient: ej,
                          destinationChainId: ey.id,
                          destinationCurrency: eC,
                          originChainId: eq.chain.id,
                        }),
                      }),
                      [t, ...i] = (0, z.d)(e);
                    if (!t) throw Error("Invalid transaction request");
                    (ed(!0),
                      ea(i.map((e) => ({ ...e, chain: eq.chain }))),
                      e_({
                        data: t.data,
                        to: t.to,
                        value: t.value,
                        chain: eq.chain,
                      }));
                  } catch (e) {
                    (console.error(e),
                      K(
                        new y.P(
                          "Unable to fetch quotes for bridging",
                          e,
                          y.a.INSUFFICIENT_BALANCE,
                        ),
                      ));
                  }
              })().catch(console.error);
            },
            onSelect: (e) => {
              e !== ei && (J(null), en(e));
            },
            onAmountChange: ek,
          })
        : O && q && eF && H?.funding
          ? (0, t.jsx)(N.T, {
              walletClientType: eF?.walletClientType || "unknown",
              displayName: ez,
              addressToFund: ej,
              isBridging: el,
              isErc20Flow: eS,
              totalPriceInUsd: eH,
              totalPriceInNativeCurrency: eD,
              gasPriceInUsd: eW,
              gasPriceInNativeCurrency: eO,
              chainId: ey.id,
              chainName: ey.name,
            })
          : (0, t.jsxs)(t.Fragment, {
              children: [
                (0, t.jsx)(x.t, {}),
                (0, t.jsx)(v.N, {}),
                (0, t.jsx)("div", { style: { marginTop: "1rem" } }),
                (0, t.jsx)(f.B, {}),
              ],
            });
    },
  };
  e.s(["AwaitingExternalEthereumTransferScreen", 0, P, "default", 0, P]);
};
