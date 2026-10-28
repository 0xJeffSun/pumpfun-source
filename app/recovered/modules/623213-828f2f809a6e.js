// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(565530),
    n = e.i(178061),
    r = e.i(352386),
    i = e.i(858042),
    a = e.i(933185),
    o = e.i(582355),
    s = e.i(748117),
    l = e.i(636447);
  let c = (0, r.createContext)(void 0),
    f = () => (0, r.useContext)(c);
  function d(e, t, n, ...r) {
    for (let i of e.current[t][n]) i(...r);
  }
  function u() {
    let e = f();
    return (t, n, ...r) => d(e, t, n, ...r);
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
    w = {
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
    c,
    "U",
    0,
    w,
    "a",
    0,
    u,
    "b",
    0,
    ({
      address: e,
      appConfig: n,
      fundWalletConfig: r,
      methodScreen: i,
      chainIdOverride: a,
      comingFromSendTransactionScreen: o = !1,
      onComplete: s,
      onError: l,
    }) => {
      let c, f;
      if (!n.fundingConfig) throw Error("Wallet funding is not enabled");
      let d = g(n.fundingConfig.options);
      if (d.length < 1) throw Error("Wallet funding is not enabled");
      c =
        a ||
        (r?.chain
          ? r.chain.id
          : h(n.fundingConfig.defaultRecommendedCurrency.chain));
      let u = n.chains.find((e) => e.id === c);
      if (!u)
        throw new t.P(`Funding chain ${c} is not in PrivyProvider chains list`);
      let p = r?.amount ?? n.fundingConfig.defaultRecommendedAmount,
        m = !1;
      function y() {
        if (!c) return;
        let e = w[c];
        (d.find((e) => "wallets" === e.method) &&
          !e &&
          console.warn(
            "Attempting to fund with USDC on chain where USDC address is not known. Funding via external wallet will be disabled.",
          ),
          (f = e),
          (m = !0));
      }
      r && "asset" in r
        ? "USDC" === r.asset
          ? y()
          : "string" != typeof r.asset &&
            "erc20" in r.asset &&
            (m = (f = r.asset.erc20) === w[u.id])
        : "USDC" === n.fundingConfig.defaultRecommendedCurrency.asset && y();
      let v = r?.defaultFundingMethod;
      return {
        chainType: "ethereum",
        address: e,
        amount: p,
        chain: u,
        erc20Address: f,
        erc20ContractInfo: m ? { symbol: "USDC", decimals: 6 } : void 0,
        isUSDC: m,
        methodScreen: i,
        supportedOptions: d,
        comingFromSendTransactionScreen: o,
        defaultFundingMethod: v,
        usingDefaultFundingMethod: !!v,
        preferredCardProvider: r?.card?.preferredProvider,
        crossChainBridgingEnabled:
          n.fundingConfig.crossChainBridgingEnabled ?? !1,
        solanaChain: "solana:mainnet",
        uiConfig: r && "uiConfig" in r ? r.uiConfig : void 0,
        externalSolanaFundingScreen: null,
        onComplete: s ?? (() => {}),
        onError: l ?? (() => {}),
      };
    },
    "c",
    0,
    h,
    "d",
    0,
    function () {
      let { user: e, getAccessToken: n } = (0, a.u)(),
        { walletProxy: c, openModal: f, client: d } = (0, s.u)(),
        { setModalData: u } = (0, l.u)(),
        h = (0, a.a)();
      return (0, r.useMemo)(
        () => ({
          exportWallet: (r) =>
            new Promise(async (s, l) => {
              if (!e)
                return void l(
                  Error(
                    "User must be authenticated before exporting their Privy wallet",
                  ),
                );
              r && "target" in r && r && (r = void 0);
              let g = r?.address ? (0, a.k)(e, r.address) : (0, a.l)(e);
              if (!g)
                return void l(new t.P("User must have an embedded wallet."));
              let w = g.address,
                { entropyId: m, entropyIdVerifier: y } = (0, o.g)(e, g),
                v = (0, a.c)(g);
              if (!w)
                return void l(
                  Error(
                    "User does not have an HD Ethereum wallet. To export an imported wallet, pass the `address` of the wallet to `exportWallet`.",
                  ),
                );
              if (!(0, i.f)(w))
                return void l(Error("Must provide a valid Ethereum address."));
              let b = {
                recoveryMethod: g.recoveryMethod,
                connectingWalletAddress: g.address,
                isUnifiedWallet: v,
                entropyId: m,
                entropyIdVerifier: y,
                onCompleteNavigateTo: "EmbeddedWalletKeyExportScreen",
                onFailure: l,
                shouldForceMFA: !0,
              };
              (await n()) && c
                ? p(g)
                  ? (u({
                      keyExport: {
                        appId: h.id,
                        appClientId: h.appClientId,
                        origin: d.apiUrl,
                        address: g.address,
                        entropyId: m,
                        entropyIdVerifier: y,
                        hdWalletIndex: g.walletIndex,
                        chainType: g.chainType,
                        walletId: g.id,
                        isUnifiedWallet: v,
                        imported: g.imported,
                        onSuccess: s,
                        onFailure: l,
                        showBackButton: r?.showBackButton,
                      },
                      connectWallet: b,
                    }),
                    f("EmbeddedWalletConnectingScreen"))
                  : l(
                      Error(
                        `Export is not supported for ${g.chainType} wallets`,
                      ),
                    )
                : l(Error("Must have valid access token."));
            }),
        }),
        [e, n, c, f, d, u, h],
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
      let { authenticated: e, user: n } = (0, a.u)(),
        {
          openModal: i,
          inProgressAuthFlowRef: o,
          inProgressLoginOrLinkMethodRef: l,
        } = (0, s.u)(),
        c = u();
      return {
        update: (0, r.useCallback)(() => {
          if (!e)
            throw (
              c("linkAccount", "onError", t.a.MUST_BE_AUTHENTICATED, {
                linkMethod: "email",
              }),
              new t.P("User must be authenticated before linking an account.")
            );
          if (!n?.email)
            throw new t.P(
              "User does not have an email linked to their account.",
            );
          ((o.current = "update"),
            (l.current = "email"),
            i("UpdateEmailScreen"));
        }, [e, c, o, l, i, n]),
      };
    },
    "i",
    0,
    p,
    "j",
    0,
    () => {
      let { authenticated: e, user: n } = (0, a.u)(),
        {
          openModal: i,
          inProgressAuthFlowRef: o,
          inProgressLoginOrLinkMethodRef: l,
        } = (0, s.u)(),
        c = u();
      return {
        update: (0, r.useCallback)(() => {
          if (!e)
            throw (
              c("linkAccount", "onError", t.a.MUST_BE_AUTHENTICATED, {
                linkMethod: "sms",
              }),
              new t.P("User must be authenticated before linking an account.")
            );
          if (!n?.phone)
            throw new t.P(
              "User does not have a phone number linked to their account.",
            );
          ((o.current = "update"), (l.current = "sms"), i("UpdatePhoneScreen"));
        }, [e, c, o, l, i, n]),
      };
    },
    "k",
    0,
    function ({
      address: e,
      fundWalletConfig: t,
      appConfig: n,
      comingFromSendTransactionScreen: r,
      externalSolanaFundingScreen: i,
      methodScreen: a,
    }) {
      if (!n.fundingConfig) throw Error("Wallet funding is not enabled");
      let o = g(n.fundingConfig.options);
      if (o.length < 1) throw Error("Wallet funding is not enabled");
      if ("USDC" === t?.asset && "solana:testnet" === t?.chain)
        throw Error("USDC funding is not supported on the Solana testnet");
      let s = t?.amount ?? n.fundingConfig.defaultRecommendedAmount,
        l = t?.defaultFundingMethod;
      return {
        chainType: "solana",
        address: e,
        supportedOptions: o,
        amount: s,
        isUSDC: "USDC" === t?.asset,
        methodScreen: a,
        comingFromSendTransactionScreen: r,
        chain: t?.chain || "solana:mainnet",
        crossChainBridgingEnabled:
          n.fundingConfig.crossChainBridgingEnabled ?? !1,
        defaultFundingMethod: l,
        preferredCardProvider: t?.card?.preferredProvider,
        usingDefaultFundingMethod: !!l,
        uiConfig: t?.uiConfig,
        externalSolanaFundingScreen: i,
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
      let n = f().current[e];
      return (0, r.useEffect)(() => {
        for (let [r, i] of Object.entries(t))
          (Object.prototype.hasOwnProperty.call(n, r) ||
            console.warn(`Invalid event type "${r}" for action "${e}"`),
            n[r]?.push(i));
        return () => {
          for (let [r, i] of Object.entries(t))
            (Object.prototype.hasOwnProperty.call(n, r) ||
              console.warn(`Invalid event type "${r}" for action "${e}"`),
              (n[r] = n[r]?.filter((e) => e !== i)));
        };
      }, [t]);
    },
  ]);
};
