// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(565530),
    n = e.i(178061),
    r = e.i(352386),
    a = e.i(858042),
    i = e.i(933185),
    o = e.i(582355),
    l = e.i(748117),
    s = e.i(636447);
  let d = (0, r.createContext)(void 0),
    u = () => (0, r.useContext)(d);
  function c(e, t, n, ...r) {
    for (let a of e.current[t][n]) a(...r);
  }
  function p() {
    let e = u();
    return (t, n, ...r) => c(e, t, n, ...r);
  }
  function f(e) {
    return ["ethereum", "solana"].includes(e.chainType);
  }
  function g(e) {
    let t = e.replace("eip155:", "");
    if (t) return parseInt(t);
    throw Error("Chain ID not compatible with CAIP-2 format.");
  }
  let h = (e) =>
      e.filter(
        (e) =>
          "wallets" === e.method ||
          ("exchange" === e.method
            ? "coinbase" === e.provider
            : "card" === e.method || "payment-request" === e.method
              ? "coinbase" === e.provider || "moonpay" === e.provider
              : (e.method, !1)),
      ),
    m = {
      [n.q.id]: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      [n.P.id]: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
      [n.S.id]: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
      [n.O.id]: "0x5fd84259d66Cd46123540766Be93DFE6D43130D7",
      [n.y.id]: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
      [n.z.id]: "0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582",
      [n.j.id]: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      [n.N.id]: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
      [n.M.id]: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
      [n.w.id]: "0x5425890298aed601595a70ab815c96711a31bc65",
      [n.g.id]: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      [n.D.id]: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
      [n.e.id]: "0xb88339CB7199b77E23DB6E890353E22632Ba630f",
      [n.k.id]: "0x754704Bc059F8C67012fEd69BC8A327a5aafb603",
    };
  e.s([
    "P",
    0,
    d,
    "U",
    0,
    m,
    "a",
    0,
    p,
    "b",
    0,
    ({
      address: e,
      appConfig: n,
      fundWalletConfig: r,
      methodScreen: a,
      chainIdOverride: i,
      comingFromSendTransactionScreen: o = !1,
      onComplete: l,
      onError: s,
    }) => {
      let d, u;
      if (!n.fundingConfig) throw Error("Wallet funding is not enabled");
      let c = h(n.fundingConfig.options);
      if (c.length < 1) throw Error("Wallet funding is not enabled");
      d =
        i ||
        (r?.chain
          ? r.chain.id
          : g(n.fundingConfig.defaultRecommendedCurrency.chain));
      let p = n.chains.find((e) => e.id === d);
      if (!p)
        throw new t.P(`Funding chain ${d} is not in PrivyProvider chains list`);
      let f = r?.amount ?? n.fundingConfig.defaultRecommendedAmount,
        v = !1;
      function w() {
        if (!d) return;
        let e = m[d];
        (c.find((e) => "wallets" === e.method) &&
          !e &&
          console.warn(
            "Attempting to fund with USDC on chain where USDC address is not known. Funding via external wallet will be disabled.",
          ),
          (u = e),
          (v = !0));
      }
      r && "asset" in r
        ? "USDC" === r.asset
          ? w()
          : "string" != typeof r.asset &&
            "erc20" in r.asset &&
            (v = (u = r.asset.erc20) === m[p.id])
        : "USDC" === n.fundingConfig.defaultRecommendedCurrency.asset && w();
      let E = r?.defaultFundingMethod;
      return {
        chainType: "ethereum",
        address: e,
        amount: f,
        chain: p,
        erc20Address: u,
        erc20ContractInfo: v ? { symbol: "USDC", decimals: 6 } : void 0,
        isUSDC: v,
        methodScreen: a,
        supportedOptions: c,
        comingFromSendTransactionScreen: o,
        defaultFundingMethod: E,
        usingDefaultFundingMethod: !!E,
        preferredCardProvider: r?.card?.preferredProvider,
        crossChainBridgingEnabled:
          n.fundingConfig.crossChainBridgingEnabled ?? !1,
        solanaChain: "solana:mainnet",
        uiConfig: r && "uiConfig" in r ? r.uiConfig : void 0,
        externalSolanaFundingScreen: null,
        onComplete: l ?? (() => {}),
        onError: s ?? (() => {}),
      };
    },
    "c",
    0,
    g,
    "d",
    0,
    function () {
      let { user: e, getAccessToken: n } = (0, i.u)(),
        { walletProxy: d, openModal: u, client: c } = (0, l.u)(),
        { setModalData: p } = (0, s.u)(),
        g = (0, i.a)();
      return (0, r.useMemo)(
        () => ({
          exportWallet: (r) =>
            new Promise(async (l, s) => {
              if (!e)
                return void s(
                  Error(
                    "User must be authenticated before exporting their Privy wallet",
                  ),
                );
              r && "target" in r && r && (r = void 0);
              let h = r?.address ? (0, i.k)(e, r.address) : (0, i.l)(e);
              if (!h)
                return void s(new t.P("User must have an embedded wallet."));
              let m = h.address,
                { entropyId: v, entropyIdVerifier: w } = (0, o.g)(e, h),
                E = (0, i.c)(h);
              if (!m)
                return void s(
                  Error(
                    "User does not have an HD Ethereum wallet. To export an imported wallet, pass the `address` of the wallet to `exportWallet`.",
                  ),
                );
              if (!(0, a.f)(m))
                return void s(Error("Must provide a valid Ethereum address."));
              let y = {
                recoveryMethod: h.recoveryMethod,
                connectingWalletAddress: h.address,
                isUnifiedWallet: E,
                entropyId: v,
                entropyIdVerifier: w,
                onCompleteNavigateTo: "EmbeddedWalletKeyExportScreen",
                onFailure: s,
                shouldForceMFA: !0,
              };
              (await n()) && d
                ? f(h)
                  ? (p({
                      keyExport: {
                        appId: g.id,
                        appClientId: g.appClientId,
                        origin: c.apiUrl,
                        address: h.address,
                        entropyId: v,
                        entropyIdVerifier: w,
                        hdWalletIndex: h.walletIndex,
                        chainType: h.chainType,
                        walletId: h.id,
                        isUnifiedWallet: E,
                        imported: h.imported,
                        onSuccess: l,
                        onFailure: s,
                        showBackButton: r?.showBackButton,
                      },
                      connectWallet: y,
                    }),
                    u("EmbeddedWalletConnectingScreen"))
                  : s(
                      Error(
                        `Export is not supported for ${h.chainType} wallets`,
                      ),
                    )
                : s(Error("Must have valid access token."));
            }),
        }),
        [e, n, d, u, c, p, g],
      );
    },
    "e",
    0,
    c,
    "f",
    0,
    h,
    "g",
    0,
    () => {
      let { client: e, setUser: t } = (0, l.u)();
      return {
        unlink: (0, r.useCallback)(
          async ({ address: n }) => {
            let r;
            return (
              t(
                (r = n.startsWith("0x")
                  ? await e.unlinkEthereumWallet(n)
                  : await e.unlinkSolanaWallet(n)),
              ),
              r
            );
          },
          [e, t],
        ),
      };
    },
    "h",
    0,
    () => {
      let { authenticated: e, user: n } = (0, i.u)(),
        {
          openModal: a,
          inProgressAuthFlowRef: o,
          inProgressLoginOrLinkMethodRef: s,
        } = (0, l.u)(),
        d = p();
      return {
        update: (0, r.useCallback)(() => {
          if (!e)
            throw (
              d("linkAccount", "onError", t.a.MUST_BE_AUTHENTICATED, {
                linkMethod: "email",
              }),
              new t.P("User must be authenticated before linking an account.")
            );
          if (!n?.email)
            throw new t.P(
              "User does not have an email linked to their account.",
            );
          ((o.current = "update"),
            (s.current = "email"),
            a("UpdateEmailScreen"));
        }, [e, d, o, s, a, n]),
      };
    },
    "i",
    0,
    f,
    "j",
    0,
    () => {
      let { authenticated: e, user: n } = (0, i.u)(),
        {
          openModal: a,
          inProgressAuthFlowRef: o,
          inProgressLoginOrLinkMethodRef: s,
        } = (0, l.u)(),
        d = p();
      return {
        update: (0, r.useCallback)(() => {
          if (!e)
            throw (
              d("linkAccount", "onError", t.a.MUST_BE_AUTHENTICATED, {
                linkMethod: "sms",
              }),
              new t.P("User must be authenticated before linking an account.")
            );
          if (!n?.phone)
            throw new t.P(
              "User does not have a phone number linked to their account.",
            );
          ((o.current = "update"), (s.current = "sms"), a("UpdatePhoneScreen"));
        }, [e, d, o, s, a, n]),
      };
    },
    "k",
    0,
    function ({
      address: e,
      fundWalletConfig: t,
      appConfig: n,
      comingFromSendTransactionScreen: r,
      externalSolanaFundingScreen: a,
      methodScreen: i,
    }) {
      if (!n.fundingConfig) throw Error("Wallet funding is not enabled");
      let o = h(n.fundingConfig.options);
      if (o.length < 1) throw Error("Wallet funding is not enabled");
      if ("USDC" === t?.asset && "solana:testnet" === t?.chain)
        throw Error("USDC funding is not supported on the Solana testnet");
      let l = t?.amount ?? n.fundingConfig.defaultRecommendedAmount,
        s = t?.defaultFundingMethod;
      return {
        chainType: "solana",
        address: e,
        supportedOptions: o,
        amount: l,
        isUSDC: "USDC" === t?.asset,
        methodScreen: i,
        comingFromSendTransactionScreen: r,
        chain: t?.chain || "solana:mainnet",
        crossChainBridgingEnabled:
          n.fundingConfig.crossChainBridgingEnabled ?? !1,
        defaultFundingMethod: s,
        preferredCardProvider: t?.card?.preferredProvider,
        usingDefaultFundingMethod: !!s,
        uiConfig: t?.uiConfig,
        externalSolanaFundingScreen: a,
        onComplete: () => {},
        onError: () => {},
      };
    },
    "p",
    0,
    {
      login: { onComplete: [], onError: [] },
      logout: { onSuccess: [] },
      connectWallet: { onSuccess: [], onError: [] },
      connectOrCreateWallet: { onSuccess: [], onError: [] },
      createWallet: { onSuccess: [], onError: [] },
      linkAccount: { onSuccess: [], onError: [] },
      update: { onSuccess: [], onError: [] },
      configureMfa: { onMfaRequired: [] },
      setWalletPassword: { onSuccess: [], onError: [] },
      setWalletRecovery: { onSuccess: [], onError: [] },
      signMessage: { onSuccess: [], onError: [] },
      signTypedData: { onSuccess: [], onError: [] },
      sendTransaction: { onSuccess: [], onError: [] },
      signTransaction: { onSuccess: [], onError: [] },
      accessToken: { onAccessTokenGranted: [], onAccessTokenRemoved: [] },
      oAuthAuthorization: { onOAuthTokenGrant: [] },
      fundWallet: { onUserExited: [] },
      fundSolanaWallet: { onUserExited: [] },
      customAuth: { onAuthenticated: [], onUnauthenticated: [] },
    },
    "u",
    0,
    function (e, t) {
      if (!t) return;
      let n = u().current[e];
      return (0, r.useEffect)(() => {
        for (let [r, a] of Object.entries(t))
          (Object.prototype.hasOwnProperty.call(n, r) ||
            console.warn(`Invalid event type "${r}" for action "${e}"`),
            n[r]?.push(a));
        return () => {
          for (let [r, a] of Object.entries(t))
            (Object.prototype.hasOwnProperty.call(n, r) ||
              console.warn(`Invalid event type "${r}" for action "${e}"`),
              (n[r] = n[r]?.filter((e) => e !== a)));
        };
      }, [t]);
    },
  ]);
};
