// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(565530),
    r = e.i(178061),
    n = e.i(352386),
    a = e.i(858042),
    i = e.i(933185),
    o = e.i(582355),
    s = e.i(748117),
    f = e.i(636447);
  let l = (0, n.createContext)(void 0),
    c = () => (0, n.useContext)(l);
  function d(e, t, r, ...n) {
    for (let a of e.current[t][r]) a(...n);
  }
  function u() {
    let e = c();
    return (t, r, ...n) => d(e, t, r, ...n);
  }
  function p(e) {
    return ["ethereum", "solana"].includes(e.chainType);
  }
  function h(e) {
    let t = e.replace("eip155:", "");
    if (t) return parseInt(t);
    throw Error("Chain ID not compatible with CAIP-2 format.");
  }
  let g = (e) =>
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
      [r.q.id]: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      [r.P.id]: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
      [r.S.id]: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
      [r.O.id]: "0x5fd84259d66Cd46123540766Be93DFE6D43130D7",
      [r.y.id]: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
      [r.z.id]: "0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582",
      [r.j.id]: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      [r.N.id]: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
      [r.M.id]: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
      [r.w.id]: "0x5425890298aed601595a70ab815c96711a31bc65",
      [r.g.id]: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      [r.D.id]: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
      [r.e.id]: "0xb88339CB7199b77E23DB6E890353E22632Ba630f",
      [r.k.id]: "0x754704Bc059F8C67012fEd69BC8A327a5aafb603",
    };
  e.s([
    "P",
    0,
    l,
    "U",
    0,
    m,
    "a",
    0,
    u,
    "b",
    0,
    ({
      address: e,
      appConfig: r,
      fundWalletConfig: n,
      methodScreen: a,
      chainIdOverride: i,
      comingFromSendTransactionScreen: o = !1,
      onComplete: s,
      onError: f,
    }) => {
      let l, c;
      if (!r.fundingConfig) throw Error("Wallet funding is not enabled");
      let d = g(r.fundingConfig.options);
      if (d.length < 1) throw Error("Wallet funding is not enabled");
      l =
        i ||
        (n?.chain
          ? n.chain.id
          : h(r.fundingConfig.defaultRecommendedCurrency.chain));
      let u = r.chains.find((e) => e.id === l);
      if (!u)
        throw new t.P(`Funding chain ${l} is not in PrivyProvider chains list`);
      let p = n?.amount ?? r.fundingConfig.defaultRecommendedAmount,
        y = !1;
      function v() {
        if (!l) return;
        let e = m[l];
        (d.find((e) => "wallets" === e.method) &&
          !e &&
          console.warn(
            "Attempting to fund with USDC on chain where USDC address is not known. Funding via external wallet will be disabled.",
          ),
          (c = e),
          (y = !0));
      }
      n && "asset" in n
        ? "USDC" === n.asset
          ? v()
          : "string" != typeof n.asset &&
            "erc20" in n.asset &&
            (y = (c = n.asset.erc20) === m[u.id])
        : "USDC" === r.fundingConfig.defaultRecommendedCurrency.asset && v();
      let E = n?.defaultFundingMethod;
      return {
        chainType: "ethereum",
        address: e,
        amount: p,
        chain: u,
        erc20Address: c,
        erc20ContractInfo: y ? { symbol: "USDC", decimals: 6 } : void 0,
        isUSDC: y,
        methodScreen: a,
        supportedOptions: d,
        comingFromSendTransactionScreen: o,
        defaultFundingMethod: E,
        usingDefaultFundingMethod: !!E,
        preferredCardProvider: n?.card?.preferredProvider,
        crossChainBridgingEnabled:
          r.fundingConfig.crossChainBridgingEnabled ?? !1,
        solanaChain: "solana:mainnet",
        uiConfig: n && "uiConfig" in n ? n.uiConfig : void 0,
        externalSolanaFundingScreen: null,
        onComplete: s ?? (() => {}),
        onError: f ?? (() => {}),
      };
    },
    "c",
    0,
    h,
    "d",
    0,
    function () {
      let { user: e, getAccessToken: r } = (0, i.u)(),
        { walletProxy: l, openModal: c, client: d } = (0, s.u)(),
        { setModalData: u } = (0, f.u)(),
        h = (0, i.a)();
      return (0, n.useMemo)(
        () => ({
          exportWallet: (n) =>
            new Promise(async (s, f) => {
              if (!e)
                return void f(
                  Error(
                    "User must be authenticated before exporting their Privy wallet",
                  ),
                );
              n && "target" in n && n && (n = void 0);
              let g = n?.address ? (0, i.k)(e, n.address) : (0, i.l)(e);
              if (!g)
                return void f(new t.P("User must have an embedded wallet."));
              let m = g.address,
                { entropyId: y, entropyIdVerifier: v } = (0, o.g)(e, g),
                E = (0, i.c)(g);
              if (!m)
                return void f(
                  Error(
                    "User does not have an HD Ethereum wallet. To export an imported wallet, pass the `address` of the wallet to `exportWallet`.",
                  ),
                );
              if (!(0, a.f)(m))
                return void f(Error("Must provide a valid Ethereum address."));
              let w = {
                recoveryMethod: g.recoveryMethod,
                connectingWalletAddress: g.address,
                isUnifiedWallet: E,
                entropyId: y,
                entropyIdVerifier: v,
                onCompleteNavigateTo: "EmbeddedWalletKeyExportScreen",
                onFailure: f,
                shouldForceMFA: !0,
              };
              (await r()) && l
                ? p(g)
                  ? (u({
                      keyExport: {
                        appId: h.id,
                        appClientId: h.appClientId,
                        origin: d.apiUrl,
                        address: g.address,
                        entropyId: y,
                        entropyIdVerifier: v,
                        hdWalletIndex: g.walletIndex,
                        chainType: g.chainType,
                        walletId: g.id,
                        isUnifiedWallet: E,
                        imported: g.imported,
                        onSuccess: s,
                        onFailure: f,
                        showBackButton: n?.showBackButton,
                      },
                      connectWallet: w,
                    }),
                    c("EmbeddedWalletConnectingScreen"))
                  : f(
                      Error(
                        `Export is not supported for ${g.chainType} wallets`,
                      ),
                    )
                : f(Error("Must have valid access token."));
            }),
        }),
        [e, r, l, c, d, u, h],
      );
    },
    "e",
    0,
    d,
    "f",
    0,
    g,
    "g",
    0,
    () => {
      let { client: e, setUser: t } = (0, s.u)();
      return {
        unlink: (0, n.useCallback)(
          async ({ address: r }) => {
            let n;
            return (
              t(
                (n = r.startsWith("0x")
                  ? await e.unlinkEthereumWallet(r)
                  : await e.unlinkSolanaWallet(r)),
              ),
              n
            );
          },
          [e, t],
        ),
      };
    },
    "h",
    0,
    () => {
      let { authenticated: e, user: r } = (0, i.u)(),
        {
          openModal: a,
          inProgressAuthFlowRef: o,
          inProgressLoginOrLinkMethodRef: f,
        } = (0, s.u)(),
        l = u();
      return {
        update: (0, n.useCallback)(() => {
          if (!e)
            throw (
              l("linkAccount", "onError", t.a.MUST_BE_AUTHENTICATED, {
                linkMethod: "email",
              }),
              new t.P("User must be authenticated before linking an account.")
            );
          if (!r?.email)
            throw new t.P(
              "User does not have an email linked to their account.",
            );
          ((o.current = "update"),
            (f.current = "email"),
            a("UpdateEmailScreen"));
        }, [e, l, o, f, a, r]),
      };
    },
    "i",
    0,
    p,
    "j",
    0,
    () => {
      let { authenticated: e, user: r } = (0, i.u)(),
        {
          openModal: a,
          inProgressAuthFlowRef: o,
          inProgressLoginOrLinkMethodRef: f,
        } = (0, s.u)(),
        l = u();
      return {
        update: (0, n.useCallback)(() => {
          if (!e)
            throw (
              l("linkAccount", "onError", t.a.MUST_BE_AUTHENTICATED, {
                linkMethod: "sms",
              }),
              new t.P("User must be authenticated before linking an account.")
            );
          if (!r?.phone)
            throw new t.P(
              "User does not have a phone number linked to their account.",
            );
          ((o.current = "update"), (f.current = "sms"), a("UpdatePhoneScreen"));
        }, [e, l, o, f, a, r]),
      };
    },
    "k",
    0,
    function ({
      address: e,
      fundWalletConfig: t,
      appConfig: r,
      comingFromSendTransactionScreen: n,
      externalSolanaFundingScreen: a,
      methodScreen: i,
    }) {
      if (!r.fundingConfig) throw Error("Wallet funding is not enabled");
      let o = g(r.fundingConfig.options);
      if (o.length < 1) throw Error("Wallet funding is not enabled");
      if ("USDC" === t?.asset && "solana:testnet" === t?.chain)
        throw Error("USDC funding is not supported on the Solana testnet");
      let s = t?.amount ?? r.fundingConfig.defaultRecommendedAmount,
        f = t?.defaultFundingMethod;
      return {
        chainType: "solana",
        address: e,
        supportedOptions: o,
        amount: s,
        isUSDC: "USDC" === t?.asset,
        methodScreen: i,
        comingFromSendTransactionScreen: n,
        chain: t?.chain || "solana:mainnet",
        crossChainBridgingEnabled:
          r.fundingConfig.crossChainBridgingEnabled ?? !1,
        defaultFundingMethod: f,
        preferredCardProvider: t?.card?.preferredProvider,
        usingDefaultFundingMethod: !!f,
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
      let r = c().current[e];
      return (0, n.useEffect)(() => {
        for (let [n, a] of Object.entries(t))
          (Object.prototype.hasOwnProperty.call(r, n) ||
            console.warn(`Invalid event type "${n}" for action "${e}"`),
            r[n]?.push(a));
        return () => {
          for (let [n, a] of Object.entries(t))
            (Object.prototype.hasOwnProperty.call(r, n) ||
              console.warn(`Invalid event type "${n}" for action "${e}"`),
              (r[n] = r[n]?.filter((e) => e !== a)));
        };
      }, [t]);
    },
  ]);
};
