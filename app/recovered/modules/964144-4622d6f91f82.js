// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(352386),
    a = e.i(496194),
    i = e.i(499868),
    s = e.i(703114),
    r = e.i(38935),
    o = e.i(990834),
    l = e.i(156732),
    d = e.i(42799),
    c = e.i(950268),
    u = e.i(933185),
    p = e.i(809845),
    m = e.i(748117),
    y = e.i(636447),
    f = e.i(525856),
    h = e.i(505049),
    g = e.i(406292),
    b = e.i(328033),
    v = e.i(625761),
    x = e.i(336291),
    T = e.i(451993),
    k = e.i(91488),
    w = e.i(689391),
    I = e.i(25047),
    S = e.i(995040),
    j = e.i(549125),
    E = e.i(494982),
    P = e.i(727472),
    C = e.i(847181),
    F = e.i(315430),
    M = e.i(909486),
    N = e.i(112420),
    A = e.i(827432);
  (e.i(252494), e.i(785373), e.i(768820), e.i(535391));
  let z = [
      {
        constant: !0,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        payable: !1,
        stateMutability: "view",
        type: "function",
      },
    ],
    $ = w.z.div`
  display: flex;
  flex-direction: column;
  min-height: 72px;
`;
  var _ = ({ onBack: e, details: n }) =>
    (0, t.jsxs)($, {
      children: [
        (0, t.jsx)(S.M, { backFn: e }),
        (0, t.jsx)(j.D, { data: n }),
        (0, t.jsx)(I.B, {}),
      ],
    });
  let B = ({
      txn: e,
      receipt: n,
      transactionInfo: a,
      onClose: i,
      tokenPrice: r,
      tokenSymbol: o,
      receiptHeader: l,
      receiptDescription: d,
    }) =>
      (0, t.jsxs)(t.Fragment, {
        children: [
          (0, t.jsx)(S.M, { onClose: i }),
          (0, t.jsx)(C.S, {
            title: l ?? "Transaction complete!",
            description: d ?? "You're all set.",
          }),
          (0, t.jsx)(M.T, {
            tokenPrice: r,
            from: n.from,
            to: n.to,
            gas: (({ gasUsed: e, effectiveGasPrice: t }) => {
              if (e && t)
                try {
                  return (0, s.g)(e * t);
                } catch (e) {
                  return;
                }
            })(n),
            txn: e,
            transactionInfo: a,
            tokenSymbol: o,
          }),
          (0, t.jsx)(F.G, {}),
          (0, t.jsx)(D, { loading: !1, onClick: i, children: "All Done" }),
          (0, t.jsx)(P.R, {}),
          (0, t.jsx)(I.B, {}),
        ],
      }),
    D = (0, w.z)(S.P)`
  && {
    margin-top: 24px;
  }
  transition:
    color 350ms ease,
    background-color 350ms ease;
`,
    L = [
      {
        constant: !1,
        inputs: [
          { name: "_salt", type: "bytes32" },
          { name: "_initializer", type: "bytes" },
        ],
        name: "deployAccount",
        outputs: [{ name: "", type: "bool" }],
        payable: !1,
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    U = [
      { name: "from", type: "address" },
      { name: "param2", type: "address" },
      { name: "param3", type: "bytes" },
      { name: "param4", type: "tuple", components: [] },
      {
        type: "tuple",
        components: [
          { name: "param5", type: "address" },
          { name: "param6", type: "uint256" },
          { name: "param7", type: "uint256" },
          { name: "encodedInitData", type: "bytes" },
        ],
      },
    ],
    O = [
      {
        constant: !1,
        inputs: [
          { name: "spender", type: "address" },
          { name: "value", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ name: "", type: "bool" }],
        payable: !1,
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    R = [
      {
        inputs: [
          { name: "to", type: "address" },
          { name: "amount", type: "uint256" },
          { name: "memo", type: "bytes32" },
        ],
        name: "transferWithMemo",
        outputs: [{ name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    q = [
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "to", type: "address" }],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "to", type: "address" }],
        name: "mint",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "quantity", type: "uint256" },
          { internalType: "bytes", name: "data", type: "bytes" },
        ],
        name: "mint",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "quantity", type: "uint256" },
          { internalType: "bytes", name: "data", type: "bytes" },
        ],
        name: "mint",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
          { internalType: "uint256[]", name: "quantities", type: "uint256[]" },
          { internalType: "bytes", name: "data", type: "bytes" },
        ],
        name: "mintBatch",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
          { internalType: "uint256[]", name: "quantities", type: "uint256[]" },
          { internalType: "bytes", name: "data", type: "bytes" },
        ],
        name: "mintBatch",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "quantity", type: "uint256" },
        ],
        name: "mint",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "quantity", type: "uint256" },
        ],
        name: "mint",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "to", type: "address" }],
        name: "safeMint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "to", type: "address" }],
        name: "safeMint",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "string", name: "uri", type: "string" },
        ],
        name: "safeMint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "string", name: "uri", type: "string" },
        ],
        name: "safeMint",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "safeMint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "safeMint",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "string", name: "uri", type: "string" },
        ],
        name: "safeMint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "string", name: "uri", type: "string" },
        ],
        name: "safeMint",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "batchMint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "batchMint",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    V = [
      {
        constant: !1,
        inputs: [
          { name: "_from", type: "address" },
          { name: "_to", type: "address" },
          { name: "_tokenId", type: "uint256" },
        ],
        name: "safeTransferFrom",
        outputs: [{ name: "", type: "bool" }],
        payable: !1,
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    W = [
      {
        constant: !1,
        inputs: [
          { name: "_operator", type: "address" },
          { name: "_approved", type: "bool" },
        ],
        name: "setApprovalForAll",
        outputs: [{ name: "", type: "bool" }],
        payable: !1,
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    G = [
      {
        constant: !1,
        inputs: [
          { name: "_from", type: "address" },
          { name: "_to", type: "address" },
          { name: "_tokenId", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ name: "", type: "bool" }],
        payable: !1,
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    H = [
      {
        constant: !1,
        inputs: [
          { name: "_from", type: "address" },
          { name: "_to", type: "address" },
          { name: "_tokenIds", type: "uint256[]" },
          { name: "_amounts", type: "uint256[]" },
          { name: "_data", type: "bytes" },
        ],
        name: "safeBatchTransferFrom",
        outputs: [{ name: "", type: "bool" }],
        payable: !1,
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    Q = [
      {
        constant: !1,
        inputs: [
          { name: "_from", type: "address" },
          { name: "_to", type: "address" },
          { name: "_tokenId", type: "uint256" },
          { name: "_amount", type: "uint256" },
          { name: "_data", type: "bytes" },
        ],
        name: "safeTransferFrom",
        outputs: [{ name: "", type: "bool" }],
        payable: !1,
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    Z = (e, t) => {
      let n = J(O, e);
      if (n)
        return {
          action: "approve",
          functionName: "approve",
          isErc20Ish: !0,
          isNFTIsh: !1,
          spender: n.args[0],
          amount: n.args[1],
        };
      let a = J(N.E, e);
      if (a)
        return {
          action: "transfer",
          functionName: "transfer",
          isErc20Ish: !0,
          isNFTIsh: !1,
          transferTo: a.args[0],
          amount: a.args[1],
        };
      let i = J(R, e);
      if (i)
        return {
          action: "transfer",
          functionName: "transferWithMemo",
          isErc20Ish: !0,
          isNFTIsh: !1,
          transferTo: i.args[0],
          amount: i.args[1],
        };
      if (!t)
        return {
          action: "transaction",
          functionName: "",
          isErc20Ish: !1,
          isNFTIsh: !1,
        };
      let s = J(L, e);
      if (s && "string" == typeof s.args[1]) {
        let e = Y(s.args[1]);
        if (e && e[4].encodedInitData) return Z(e[4].encodedInitData, t);
      }
      let r = J(W, e);
      if (r)
        return {
          action: "approve",
          functionName: "setApprovalForAll",
          isNFTIsh: !0,
          isErc20Ish: !1,
          operator: r.args[0],
          approved: r.args[1],
        };
      let o = J(G, e);
      if (o)
        return {
          action: "transfer",
          functionName: "transferFrom",
          isNFTIsh: !0,
          isErc20Ish: !1,
          transferFrom: o.args[0],
          transferTo: o.args[1],
          tokenId: o.args[2],
        };
      let l = J(V, e);
      if (l)
        return {
          action: "transfer",
          functionName: "safeTransferFrom",
          isNFTIsh: !0,
          isErc20Ish: !1,
          transferFrom: l.args[0],
          transferTo: l.args[1],
          tokenId: l.args[2],
        };
      let d = J(Q, e);
      if (d)
        return {
          action: "transfer",
          functionName: "safeTransferFrom",
          isNFTIsh: !0,
          isErc20Ish: !1,
          transferFrom: d.args[0],
          transferTo: d.args[1],
          tokenId: d.args[2],
          amount: d.args[3],
        };
      let c = J(H, e);
      if (c)
        return {
          action: "batch transfer",
          functionName: "safeBatchTransferFrom",
          isNFTIsh: !0,
          isErc20Ish: !1,
          transferFrom: c.args[0],
          transferTo: c.args[1],
          tokenIds: c.args[2],
          amounts: c.args[3],
        };
      let u = J(q, e);
      return u
        ? {
            action: "mint",
            functionName: u.functionName,
            isNFTIsh: !0,
            isErc20Ish: !1,
            args: u.args,
          }
        : { action: "transaction", isErc20Ish: !1, isNFTIsh: !1 };
    },
    J = (e, t) => {
      try {
        let n = (0, r.f)({ abi: e, data: t });
        return { functionName: n.functionName, args: n.args || [] };
      } catch (e) {
        return null;
      }
    },
    Y = (e) => {
      try {
        if ("string" == typeof e) return (0, o.f)(U, `0x${e.slice(10)}`);
      } catch (e) {
        return null;
      }
    },
    K = (e) => `${parseFloat(e).toFixed(2)}`,
    X = new p.P(
      new p.e(
        "There was an issue preparing your transaction",
        d.X.E32603_DEFAULT_INTERNAL_ERROR.eipCode,
      ),
    ),
    ee = (e, t) =>
      e?.sendTransaction
        ? "transactionRequest" in e.sendTransaction
          ? e.sendTransaction.transactionRequest
          : e.sendTransaction.transactionRequests[t]
        : void 0,
    et = {
      component: () => {
        let {
            data: e,
            onUserCloseViaDialogOrKeybindRef: s,
            setModalData: r,
            navigate: o,
          } = (0, y.u)(),
          {
            client: w,
            rpcConfig: I,
            chains: S,
            closePrivyModal: j,
            walletProxy: P,
            showFiatPrices: C,
          } = (0, m.u)(),
          { user: F } = (0, u.u)(),
          M = (0, u.a)(),
          [N, $] = (0, n.useState)(0),
          [D, L] = (0, n.useState)(0),
          [U, O] = (0, n.useState)(ee(e, N)),
          [R, q] = (0, n.useState)(null),
          [V, W] = (0, n.useState)(),
          [G, H] = (0, n.useState)(!1),
          [Q, J] = (0, n.useState)(null),
          [Y, et] = (0, n.useState)(null),
          [en, ea] = (0, n.useState)(null),
          [ei, es] = (0, n.useState)(void 0),
          [er, eo] = (0, n.useState)(void 0),
          [el, ed] = (0, n.useState)(!1),
          [ec, eu] = (0, n.useState)(!1),
          [ep, em] = (0, n.useState)([]),
          [ey, ef] = (0, n.useState)([]),
          [eh, eg] = (0, n.useState)("uninitiated"),
          [eb, ev] = (0, n.useState)(void 0);
        if (!U || !e?.sendTransaction || !e?.sendTransaction)
          return (0, t.jsx)(k.ErrorScreenView, {
            error: Error("Invalid transaction request"),
            allowlistConfig: M.allowlistConfig,
            onRetry: () => {
              (e?.sendTransaction?.onFailure(X),
                j({ shouldCallAuthOnSuccess: !1 }));
            },
          });
        let { transactingWalletAddress: ex } = e.sendTransaction,
          eT = (0, n.useMemo)(
            () => S.find((e) => Number(e.id) === Number(U.chainId)),
            [U.chainId],
          ),
          ek = eT?.nativeCurrency.symbol ?? "ETH",
          ew = (0, n.useMemo)(
            () => Z(U.data, !!M.embeddedWallets.extendedCalldataDecoding),
            [U.data],
          ),
          { action: eI, isErc20Ish: eS, isNFTIsh: ej, functionName: eE } = ew,
          { toAddress: eP, tokenAddress: eC } = (0, n.useMemo)(
            () => ({
              toAddress: ew.isErc20Ish ? ew.transferTo : (U.to ?? void 0),
              tokenAddress: ew.isErc20Ish ? U.to : void 0,
            }),
            [ew],
          );
        (0, n.useEffect)(() => {
          U.to &&
            eT &&
            eS &&
            (0, g.g)({
              address: U.to,
              chain: eT,
              rpcConfig: M.rpcConfig,
              privyAppId: M.id,
            })
              .then(q)
              .catch(console.error);
        }, [U.to, eT]);
        let { tokenPrice: eF, isTokenPriceLoading: eM } = (0, f.u)(U.chainId),
          { balance: eN } = (0, h.u)({
            rpcConfig: M.rpcConfig,
            appId: M.id,
            address: ex,
            chain: eT,
          }),
          eA = (function ({
            rpcConfig: e,
            appId: t,
            address: s,
            chain: r,
            tokenInfo: o,
          }) {
            let { chains: l } = (0, m.u)(),
              [c, u] = (0, n.useState)(null),
              [p, y] = (0, n.useState)(!1),
              f = (0, n.useMemo)(() => {
                let n = r || l[0];
                if (n)
                  return (0, a.f)({
                    chain: r,
                    transport: (0, i.f)((0, d.L)(n, e, t)),
                  });
              }, [r, e, t]),
              h = (0, n.useCallback)(async () => {
                if (s && f && o.address)
                  try {
                    return (
                      y(!0),
                      await f.readContract({
                        address: o.address,
                        abi: z,
                        functionName: "balanceOf",
                        args: [s],
                      })
                    );
                  } catch (e) {
                    console.error(e);
                  } finally {
                    y(!1);
                  }
              }, [f, s, o?.address, r]);
            return (
              (0, n.useEffect)(() => {
                h().then((e) => null != e && u(e));
              }, [h]),
              {
                balance: c,
                isLoading: p && null == c,
                formattedBalance: (0, d.e)({
                  amount: c ?? BigInt(0),
                  decimals: o.decimals,
                }),
              }
            );
          })({
            rpcConfig: M.rpcConfig,
            appId: M.id,
            address: ex,
            tokenInfo: { address: eC || "", decimals: R?.decimals ?? 18 },
            chain: eT,
          }),
          ez = (0, n.useMemo)(
            () => (0, T.g)(Number(U.chainId), S, I, { appId: M.id }),
            [U.chainId, I],
          ),
          e$ = ((e, t, a, i) => {
            let [s, r] = (0, n.useState)(null),
              { walletProxy: o } = (0, m.u)();
            return (
              (0, n.useEffect)(() => {
                (s && r(null),
                  (async () => {
                    if (!o || !t) return null;
                    let n = [],
                      s = !0,
                      r = await (0, A.d)(e, a, t, i).catch(
                        (t) => (
                          (t.message &&
                            t.message.includes(
                              "Insufficient balance for transaction",
                            )) ||
                          (t.message &&
                            t.message.includes(
                              "Insufficient funds for gas * price + value",
                            )) ||
                          (t.details &&
                            t.details.includes("insufficient funds")) ||
                          (t.details &&
                            t.details.includes(
                              "gas required exceeds allowance",
                            ))
                            ? (s = !1)
                            : n.push(t),
                          e
                        ),
                      );
                    return {
                      tx: r,
                      totalGasEstimate: r.gas,
                      hasFunds: s,
                      errors: n,
                    };
                  })().then(r));
              }, [e]),
              s
            );
          })(U, ex, ez, e?.sendTransaction?.prepareTransactionRequest);
        ((0, n.useEffect)(() => {
          O(ee(e, N));
        }, [N]),
          (0, n.useEffect)(() => {
            e.sendTransaction?.getIsSponsored
              ? e.sendTransaction.getIsSponsored().then(W).catch(console.error)
              : W(!1);
          }, [e.sendTransaction.getIsSponsored]));
        let e_ = () => {
          if (!G)
            return (
              Q
                ? e?.sendTransaction?.onSuccess({ hash: Q })
                : en || e$?.errors[0]
                  ? e?.sendTransaction?.onFailure(en ?? e$?.errors[0] ?? X)
                  : e?.sendTransaction?.onFailure(
                      new p.P(
                        new p.e(
                          "The user rejected the request",
                          d.X.E4001_USER_REJECTED_REQUEST.eipCode,
                        ),
                      ),
                    ),
              j({ shouldCallAuthOnSuccess: !1 })
            );
        };
        s.current = e_;
        let eB = !!(e.funding && e.funding.supportedOptions.length > 0),
          eD = (0, v.g)(BigInt(e$?.totalGasEstimate ?? 0n), ek),
          eL =
            C && eF ? (0, v.a)(BigInt(e$?.totalGasEstimate ?? 0n), eF) : void 0,
          eU = (0, v.g)(eN ?? 0n, ek, void 0, !0),
          eO = C && eF ? (0, v.a)(eN ?? 0n, eF) : void 0,
          eR =
            R && !eA.isLoading && eS && "approve" !== eI
              ? `${eA.formattedBalance} ${R.symbol}`
              : void 0,
          eq = e.sendTransaction?.uiOptions?.transactionInfo?.title;
        eq ||
          (eq =
            "approve" === eI
              ? eS
                ? "Confirm address"
                : "Confirm action"
              : `Approve ${eI}`);
        let eV = (0, n.useMemo)(() => {
            if (e.sendTransaction?.uiOptions?.description)
              return e.sendTransaction?.uiOptions?.description;
            if ("approve" === eI && "setApprovalForAll" === eE && ew.approved) {
              let e = (0, t.jsx)(c.A, {
                address: ew.operator || "",
                url: eT?.blockExplorers?.default?.url,
              });
              return (0, t.jsxs)(t.Fragment, {
                children: [
                  M.name,
                  " would like your permission for ",
                  e,
                  " to transfer tokens on your behalf.",
                ],
              });
            }
            if (
              "approve" === eI &&
              "setApprovalForAll" === eE &&
              !ew.approved
            ) {
              let e = (0, t.jsx)(c.A, {
                address: ew.operator || "",
                url: eT?.blockExplorers?.default?.url,
              });
              return (0, t.jsxs)(t.Fragment, {
                children: [
                  M.name,
                  " would like your permission to revoke permissions of ",
                  e,
                  " from transferring tokens on your behalf.",
                ],
              });
            }
            return (eS && "approve" === eI) || (eS && "approve" === eI)
              ? `${M.name} would like your permission for ${(0, x.c)(ew.spender)} to spend tokens on your behalf.`
              : `${M.name} wants your permission to approve the following transaction.`;
          }, [M.name, eS, ew, e.sendTransaction?.uiOptions.description, eE]),
          eW = e.sendTransaction?.uiOptions?.transactionInfo?.contractInfo
            ?.imgUrl
            ? (0, t.jsx)("img", {
                src: e.sendTransaction.uiOptions.transactionInfo.contractInfo
                  .imgUrl,
                alt: e.sendTransaction.uiOptions.transactionInfo.contractInfo
                  .imgAltText,
              })
            : null,
          eG = !(!e$ || e$.errors[0] || e$.hasFunds || !1 !== V),
          eH = eG && eB,
          eQ = eH
            ? "Add funds"
            : e.sendTransaction?.uiOptions?.buttonText ||
              (N < D ? "Continue" : "Approve");
        if (
          ((0, n.useEffect)(() => {
            e.sendTransaction?.scanTransaction &&
              M.embeddedWallets.transactionScanning.enabled &&
              "uninitiated" === eh &&
              (eg("in progress"),
              e.sendTransaction
                .scanTransaction()
                .then((e) => {
                  (((e) => {
                    if (!e) throw Error("Transaction scan failed");
                    if (
                      ("Success" === e.validation.status &&
                        ("Benign" === e.validation.result_type
                          ? eo("safe")
                          : "Warning" === e.validation.result_type
                            ? eo("warn")
                            : "Malicious" === e.validation.result_type &&
                              (eo("error"), eu(!0))),
                      "Success" !== e.simulation.status)
                    )
                      throw Error("Simulation failed");
                    {
                      es(e.simulation.params);
                      let { assetsIn: t, assetsOut: n } = (function (e, t) {
                        let n = [],
                          a = new Map();
                        if (e) {
                          for (let t of e)
                            if (t.in[0]) {
                              let e;
                              ((e =
                                "ERC721" === t.asset.type ||
                                "approve_for_all" === t.in[0].value
                                  ? {
                                      id: `nft:${t.asset.name}`,
                                      nftName: t.asset.name,
                                      nftCount: t.in.length,
                                    }
                                  : {
                                      id: `token:${t.asset.type}:${t.asset.symbol}:${t.asset.name}`,
                                      iconUrl: t.asset.logo_url,
                                      value: t.in[0].value,
                                      symbol: t.asset.symbol,
                                      usdValue: t.in[0].usd_price
                                        ? K(t.in[0].usd_price)
                                        : void 0,
                                      decimals: t.asset.decimals,
                                    }),
                                n.push(e));
                            } else if (t.out[0]?.value) {
                              let e;
                              ((e =
                                "ERC721" === t.asset.type ||
                                "approve_for_all" === t.out[0].value
                                  ? {
                                      id: `nft:${t.asset.name}`,
                                      nftName: t.asset.name,
                                    }
                                  : {
                                      id: `token:${t.asset.type}:${t.asset.symbol}:${t.asset.name}`,
                                      iconUrl: t.asset.logo_url,
                                      value: t.out[0].value,
                                      symbol: t.asset.symbol,
                                      usdValue: t.out[0].usd_price
                                        ? K(t.out[0].usd_price)
                                        : void 0,
                                      decimals: t.asset.decimals,
                                    }),
                                a.has(e.id) || a.set(e.id, e));
                            }
                        }
                        for (let e of t)
                          for (let t of Object.keys(e.spenders)) {
                            let n;
                            ((n =
                              "ERC721" === e.asset.type ||
                              "approve_for_all" === e.spenders[t]?.value
                                ? {
                                    id: `nft:${e.asset.name}`,
                                    nftName: e.asset.name,
                                  }
                                : {
                                    id: `token:${e.asset.type}:${e.asset.symbol}:${e.asset.name}`,
                                    iconUrl: e.asset.logo_url,
                                    value: e.spenders[t]?.value,
                                    symbol: e.asset.symbol,
                                    usdValue: e.spenders[t]?.usd_price
                                      ? K(e.spenders[t]?.usd_price)
                                      : void 0,
                                    decimals: e.asset.decimals,
                                  }),
                              a.has(n.id) || a.set(n.id, n));
                          }
                        return {
                          assetsIn: n,
                          assetsOut: Array.from(a.values()),
                        };
                      })(e.simulation.assets_diffs, e.simulation.exposures);
                      if (0 === n.length && 0 === t.length)
                        throw Error("No tokens found");
                      (em(n), ef(t));
                    }
                  })(e),
                    eg("completed"));
                })
                .catch(() => eg("failed")));
          }, [!!e.sendTransaction?.scanTransaction]),
          (0, n.useEffect)(() => {
            (e.sendTransaction?.scanTransaction && "failed" !== eh) ||
              ((t, n, a) => {
                if (
                  (L(
                    e?.sendTransaction
                      ? "transactionRequest" in e.sendTransaction
                        ? 0
                        : e.sendTransaction.transactionRequests.length - 1
                      : 0,
                  ),
                  n.isErc20Ish && n.amount && a)
                ) {
                  let e = (0, b.f)({ amount: n.amount, decimals: a.decimals });
                  (ev(e),
                    em([
                      { value: e, symbol: a?.symbol, decimals: a?.decimals },
                    ]));
                } else if (t.value) {
                  let e = BigInt(t.value),
                    n = eF ? (0, v.a)(e, eF) : void 0;
                  em(
                    C && n
                      ? [{ value: n }]
                      : [
                          {
                            value: (0, v.p)(e),
                            symbol: ek,
                            decimals: 18,
                            usdValue: n,
                          },
                        ],
                  );
                } else
                  em(
                    C
                      ? [{ value: "$0" }]
                      : [{ value: "0", symbol: ek, decimals: 18 }],
                  );
              })(e$?.tx ?? U, ew, R);
          }, [U, e$?.tx, ew, R, eh]),
          Y)
        )
          return (0, t.jsx)(B, {
            txn: e$?.tx ?? U,
            onClose: e_,
            receipt: Y,
            transactionInfo: e.sendTransaction?.uiOptions.transactionInfo,
            tokenPrice: eF,
            tokenSymbol: ek,
            receiptHeader: e.sendTransaction?.uiOptions.successHeader,
            receiptDescription: e.sendTransaction?.uiOptions.successDescription,
          });
        if (en)
          return (0, t.jsx)(E.T, {
            transactionError: en,
            transactionHash: Q ?? void 0,
            chainType: "ethereum",
            chainId: e$?.tx.chainId ?? U.chainId,
            onClose: e_,
            onRetry: ({ resetNonce: e }) => {
              ea(null);
              let t = { ...(e$?.tx ?? U) };
              (e && (t.nonce = void 0), O(t));
            },
          });
        let eZ =
          0 !== D && "number" == typeof N && 0 !== N
            ? () => {
                $(N - 1);
              }
            : void 0;
        return el && ei
          ? (0, t.jsx)(_, { details: ei, onBack: () => ed(!1) })
          : (0, t.jsx)(E.S, {
              transactionIndex: N,
              onBack: eZ,
              maxIndex: D,
              disabled: (eG && !eB) || ec,
              isSubmitting: G,
              submitError: en,
              isPreparing: !e$,
              isTokenPriceLoading: eM,
              isTokenContractInfoLoading: !ej && !R,
              prepareError: e$?.errors[0],
              symbol: R?.symbol,
              chain: eT,
              img: eW,
              title: eq,
              subtitle: eV,
              txValue: U.value,
              fee: eL ?? eD,
              isSponsored: V,
              from: ex ?? "",
              to: eP,
              tokenAddress: eC ?? void 0,
              network: M.chains.find((e) => e.id === U.chainId)?.name ?? "",
              transactionDetails: { ...ew, formattedAmount: eb },
              cta: eQ,
              missingFunds: eG,
              action: eI,
              balance: eR ?? eO ?? eU,
              onClose: e_,
              onClick: eH
                ? async () => {
                    if (!ex) return;
                    if (!eB) throw Error("Funding wallet is not enabled");
                    let t = "FundingMethodSelectionScreen";
                    (r({
                      ...e,
                      funding: {
                        ...e.funding,
                        methodScreen: t,
                        chainType: "ethereum",
                        amount: (0, l.f)(
                          BigInt(e$?.tx.value ?? 0) +
                            BigInt(e$?.totalGasEstimate?.toString() ?? 0),
                        ),
                        chain: eT,
                      },
                      solanaFundingData: e?.solanaFundingData,
                    }),
                      o(t));
                  }
                : async () => {
                    if (N < D) $(N + 1);
                    else {
                      H(!0);
                      try {
                        let t = await w.getAccessToken();
                        if (G || !t || !P || !F) return;
                        let n = await e.sendTransaction.onConfirm({
                          transactionRequest: e$?.tx ?? U,
                        });
                        if ((J(n), e.sendTransaction?.signOnly))
                          return (
                            await new Promise((e) => setTimeout(e, u.Q)),
                            e?.sendTransaction?.onSuccess({ hash: n }),
                            j({ shouldCallAuthOnSuccess: !1 })
                          );
                        let a = await ez.waitForTransactionReceipt({ hash: n });
                        if ("reverted" === a.status)
                          throw Error("Transaction failed");
                        et(a);
                      } catch (e) {
                        (console.warn({ transaction: e$?.tx ?? U, error: e }),
                          ea(e));
                      } finally {
                        H(!1);
                      }
                    }
                  },
              validation: er,
              hasScanDetails: !!ei,
              setIsScanDetailsOpen: ed,
              preventMaliciousTransaction: ec,
              setPreventMaliciousTransaction: eu,
              tokensSent: ep,
              tokensReceived: ey,
              isScanning: "in progress" === eh,
              isCancellable: e.sendTransaction?.uiOptions?.isCancellable ?? !1,
              functionName: eE,
            });
      },
    };
  e.s(["SendTransactionScreen", 0, et, "default", 0, et]);
};
