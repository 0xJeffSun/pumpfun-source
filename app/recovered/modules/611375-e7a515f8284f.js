// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var n = e.i(732486),
    t = e.i(352386),
    a = e.i(25047),
    l = e.i(995040),
    i = e.i(847181),
    o = e.i(918048),
    r = e.i(615802),
    c = e.i(23915),
    s = e.i(205212),
    d = e.i(933185),
    p = e.i(461687),
    u = e.i(748117),
    h = e.i(636447),
    y = e.i(582355),
    g = e.i(368868),
    f = e.i(768820),
    m = e.i(689391),
    w = e.i(336291),
    x = e.i(616800),
    v = e.i(315430),
    T = e.i(813693);
  (e.i(252494), e.i(785373), e.i(535391));
  let C = ({
      provider: e,
      displayName: a,
      logo: l,
      connectOnly: i,
      connector: o,
    }) => {
      let c,
        { navigate: s, setModalData: d } = (0, h.u)(),
        { connectWallet: y, walletConnectionStatus: g } = (0, u.u)(),
        m = (0, v.h)(),
        [T, C] = (0, t.useState)(!1),
        $ = "wallet_connect_v2" === o.connectorType ? e : o.walletClientType,
        [_, k] = (0, t.useState)(!1);
      (0, t.useEffect)(() => {
        _ &&
          ("connected" === g?.status || g?.connectError) &&
          (s(i ? "ConnectOnlyStatusScreen" : "ConnectionStatusScreen"), k(!1));
      }, [_, g]);
      let z = (0, p.k)(e),
        W = window.matchMedia("(display-mode: standalone)").matches,
        O = (0, p.b)({ connectorType: o.connectorType, walletClientType: $ });
      c =
        O && O.chainTypes.includes(o.chainType)
          ? () => {
              O.isInstalled ||
              ("solana" === o.chainType && "isInstalled" in o && o.isInstalled)
                ? (y(o, $),
                  s(i ? "ConnectOnlyStatusScreen" : "ConnectionStatusScreen"))
                : (0, p.l)({ isMobile: f.isMobile, walletConfig: O })
                  ? (d((n) => ({
                      ...n,
                      externalConnectWallet: {
                        ...n?.externalConnectWallet,
                        preSelectedWalletId: e,
                        walletChainType:
                          "solana" === o.chainType
                            ? "solana-only"
                            : "ethereum-only",
                      },
                    })),
                    s(
                      i
                        ? "ConnectOnlyLandingScreen"
                        : "AuthenticateWithWalletScreen",
                    ))
                  : f.isMobile
                    ? (d({
                        installWalletModalData: {
                          walletConfig: O,
                          chainType: o.chainType,
                          connectOnly: i,
                        },
                      }),
                      s("WalletInterstitialScreen"))
                    : (d({
                        installWalletModalData: {
                          walletConfig: O,
                          chainType: o.chainType,
                          connectOnly: i,
                        },
                      }),
                      s("InstallWalletScreen"));
            }
          : "coinbase_wallet" !== o.connectorType ||
              "eoaOnly" !== o.coinbaseWalletConfig.preference?.options ||
              !f.isMobile ||
              W ||
              (0, w.q)()
            ? () => {
                if (!(0, x.r)(window.navigator.userAgent) || event?.isTrusted) {
                  if ("mobile_wallet_adapter" === o.walletClientType)
                    return (y(o, $), void k(!0));
                  (y(o, $),
                    i
                      ? "wallet_connect_v2" === o.connectorType
                        ? (d((e) => ({
                            ...e,
                            externalConnectWallet: {
                              ...e?.externalConnectWallet,
                              preSelectedWalletId: "wallet_connect_qr",
                            },
                          })),
                          s("ConnectOnlyLandingScreen"))
                        : s("ConnectOnlyStatusScreen")
                      : s("ConnectionStatusScreen"));
                }
              }
            : () => {
                window.location.href = `https://go.cb-w.com/dapp?cb_url=${encodeURI(window.location.href)}`;
              };
      let M = a || z?.metadata?.shortName || z?.name || o.walletClientType;
      return (0, n.jsxs)(b, {
        onClick: () => {
          T || (C(!0), setTimeout(() => C(!1), 2e3), c());
        },
        disabled: T,
        children: [
          (0, n.jsx)(r.I, { icon: l || z?.image_url?.md, name: M }),
          (0, n.jsx)("span", { children: M }),
          (0, n.jsxs)(S, {
            id: "chip-container",
            children: [
              m?.walletClientType === $ && m?.chainType === o.chainType
                ? (0, n.jsx)(j, { color: "gray", children: "Recent" })
                : (0, n.jsx)("span", {
                    id: "connect-text",
                    children: "Connect",
                  }),
              "solana" === o.chainType &&
                (0, n.jsx)(j, { color: "gray", children: "Solana" }),
            ],
          }),
        ],
      });
    },
    b = (0, m.z)(v.L)`
  /* Wallet name text color */
  > span {
    color: var(--privy-color-foreground);
  }

  /* Show "Connect" on hover */
  > #chip-container > #connect-text {
    font-weight: 500;
    color: var(--privy-color-accent);
    opacity: 0;
    transition: opacity 0.1s ease-out;
  }

  :hover > #chip-container > #connect-text {
    opacity: 1;
  }

  @media (max-width: 440px) {
    > #chip-container > #connect-text {
      display: none;
    }
  }
`,
    j = (0, m.z)(c.C)`
  margin-left: auto;
`,
    S = m.z.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-left: auto;
`,
    $ = ["coinbase_wallet", "base_account"],
    _ = [
      "metamask",
      "okx_wallet",
      "rainbow",
      "uniswap",
      "bybit_wallet",
      "ronin_wallet",
      "haha_wallet",
      "uniswap_extension",
      "zerion",
      "rabby_wallet",
      "cryptocom",
      "binance",
      "kraken_wallet",
      "robinhood_wallet",
    ],
    k = ["safe"],
    z = ["phantom", "backpack", "solflare", "jupiter", "universal_profile"],
    W = {
      component: () => {
        let e,
          { connectors: r } = (0, u.u)(),
          { setModalData: c, data: f, navigate: m } = (0, h.u)(),
          w = (0, d.a)(),
          { wallets: x } = (0, y.u)(),
          T = r.filter(p.d).flatMap((e) => e.wallets),
          [b, j] = (0, t.useState)("default"),
          S = "solana" === f?.funding?.chainType,
          W = !!f?.funding?.crossChainBridgingEnabled;
        e =
          "ethereum" === f?.funding?.chainType
            ? f.funding.erc20Address && !f.funding.isUSDC
              ? "ethereum-only"
              : W && !f.funding.chain.testnet
                ? "ethereum-and-solana"
                : "ethereum-only"
            : W && !f.funding?.isUSDC
              ? "ethereum-and-solana"
              : "solana-only";
        let M = x.filter((e) => "privy" !== e.walletClientType),
          F = M.map((e) => e.walletClientType),
          D = T.filter((e) => "privy" !== e.walletClientType),
          B = D.map((e) => e.walletClientType),
          L = [],
          E = { ...f.funding };
        E.usingDefaultFundingMethod && (E.usingDefaultFundingMethod = !1);
        let A = ({ wallet: e, walletChainType: n }) => {
          (c({
            ...f,
            funding: {
              ...E,
              connectedWallet: e,
              onContinueWithExternalWallet: () =>
                m(
                  N({
                    destChainType: S ? "solana" : "ethereum",
                    sourceChainType: n,
                  }),
                ),
            },
            solanaFundingData: f?.solanaFundingData
              ? {
                  ...f.solanaFundingData,
                  sourceWalletData: {
                    address: e.address,
                    walletClientType: e.walletClientType,
                  },
                }
              : void 0,
          }),
            m("FundingAmountEditScreen"));
        };
        ("solana-only" !== e &&
          L.push(
            ...M.map((e, t) =>
              (0, n.jsx)(
                O,
                {
                  onClick: () => A({ wallet: e, walletChainType: "ethereum" }),
                  icon: e.meta.icon,
                  name: e.meta.name,
                  chainType: e.type,
                },
                t,
              ),
            ),
          ),
          "ethereum-only" !== e &&
            L.push(
              ...D.map((e, t) =>
                (0, n.jsx)(
                  O,
                  {
                    onClick: () => A({ wallet: e, walletChainType: "solana" }),
                    icon: e.meta.icon,
                    name: e.meta.name,
                    chainType: e.type,
                  },
                  t,
                ),
              ),
            ),
          L.push(
            ...(({
              walletList: e,
              walletChainType: t,
              connectors: a,
              connectOnly: l,
              ignore: i,
              walletConnectEnabled: o,
              forceWallet: r,
            }) => {
              let c = [],
                s = [],
                d = [],
                p = a.filter((e) =>
                  "ethereum-only" === t
                    ? "ethereum" === e.chainType
                    : "solana-only" !== t || "solana" === e.chainType,
                ),
                u = p.find((e) => "wallet_connect_v2" === e.connectorType);
              for (let [a, h] of (r ? [r.wallet] : e).entries()) {
                if ("detected_ethereum_wallets" === h)
                  for (let [e, t] of p
                    .filter(
                      ({
                        chainType: e,
                        connectorType: n,
                        walletClientType: t,
                      }) =>
                        "solana" !== e &&
                        ("uniswap_wallet_extension" === t ||
                        "uniswap_extension" === t
                          ? !i.includes("uniswap")
                          : "crypto.com_wallet_extension" === t ||
                              "crypto.com_onchain" === t
                            ? !i.includes("cryptocom")
                            : "injected" === n && !i.includes(t)),
                    )
                    .entries()) {
                    let {
                      walletClientType: i,
                      walletBranding: o,
                      chainType: r,
                    } = t;
                    ("unknown" === i ? s : c).push(
                      (0, n.jsx)(
                        C,
                        {
                          connectOnly: l,
                          provider: i,
                          logo: o.icon,
                          displayName: o.name,
                          connector: t,
                        },
                        `${a}-${h}-${i}-${r}-${e}`,
                      ),
                    );
                  }
                if ("detected_solana_wallets" === h)
                  for (let [e, o] of p
                    .filter(({ chainType: e, walletClientType: n }) => {
                      if ("solana" === e)
                        return "ethereum-only" !== t && !i.includes(n);
                    })
                    .entries()) {
                    let {
                      walletClientType: t,
                      walletBranding: i,
                      chainType: r,
                    } = o;
                    ("unknown" === t ? s : c).push(
                      (0, n.jsx)(
                        C,
                        {
                          connectOnly: l,
                          provider: t,
                          logo: i.icon,
                          displayName: i.name,
                          connector: o,
                        },
                        `${a}-${h}-${t}-${r}-${e}`,
                      ),
                    );
                  }
                if (z.includes(h)) {
                  let e = p.find(
                    (e) =>
                      ("injected" === e.connectorType &&
                        e.walletClientType === h) ||
                      e.connectorType === h,
                  );
                  if (
                    (e &&
                      c.push(
                        (0, n.jsx)(
                          C,
                          { connectOnly: l, provider: h, connector: e },
                          `${a}-${h}`,
                        ),
                      ),
                    "solana-only" === t || "ethereum-and-solana" === t)
                  ) {
                    let e = p.find(
                      ({ chainType: e, walletClientType: n }) =>
                        "solana" === e && n === h,
                    );
                    e &&
                      c.push(
                        (0, n.jsx)(
                          C,
                          { connectOnly: l, provider: h, connector: e },
                          `${h}-solana`,
                        ),
                      );
                  }
                } else if (_.includes(h)) {
                  let e = p.find((e) =>
                    "uniswap" === h
                      ? "uniswap_wallet_extension" === e.walletClientType ||
                        "uniswap_extension" === e.walletClientType
                      : "cryptocom" === h
                        ? "crypto.com_wallet_extension" ===
                            e.walletClientType ||
                          "crypto.com_onchain" === e.walletClientType
                        : "injected" === e.connectorType &&
                          e.walletClientType === h,
                  );
                  if (
                    (o && !e && (e = u),
                    e &&
                      c.push(
                        (0, n.jsx)(
                          C,
                          {
                            connectOnly: l,
                            provider: h,
                            connector: e,
                            logo:
                              "injected" === e.connectorType
                                ? e.walletBranding.icon
                                : void 0,
                            displayName:
                              "injected" === e.connectorType
                                ? e.walletBranding.name
                                : void 0,
                          },
                          `${a}-${h}`,
                        ),
                      ),
                    "solana-only" === t || "ethereum-and-solana" === t)
                  ) {
                    let e = p.find(
                      ({ chainType: e, walletClientType: n }) =>
                        "solana" === e && n === h,
                    );
                    e &&
                      c.push(
                        (0, n.jsx)(
                          C,
                          { connectOnly: l, provider: h, connector: e },
                          `${h}-solana`,
                        ),
                      );
                  }
                } else if ($.includes(h)) {
                  let e = p.find(({ connectorType: e }) => e === h);
                  e &&
                    c.push(
                      (0, n.jsx)(
                        C,
                        {
                          connectOnly: l,
                          provider: h,
                          connector: e,
                          displayName: e.walletBranding.name,
                          logo: e.walletBranding.icon,
                        },
                        `${a}-${h}`,
                      ),
                    );
                } else if (k.includes(h))
                  u &&
                    d.push(
                      (0, n.jsx)(
                        C,
                        { connectOnly: l, provider: h, connector: u },
                        `${a}-${h}`,
                      ),
                    );
                else if ("wallet_connect" === h)
                  u &&
                    d.push(
                      (0, n.jsx)(
                        C,
                        {
                          connectOnly: l,
                          provider: h,
                          connector: u,
                          logo: u.walletBranding.icon,
                          displayName: "WalletConnect",
                        },
                        `${a}-${h}`,
                      ),
                    );
                else if (h === r?.wallet) {
                  let t =
                      "ethereum" === r.chainType &&
                      e.includes("detected_ethereum_wallets"),
                    i =
                      "solana" === r.chainType &&
                      e.includes("detected_solana_wallets");
                  if (t || i) {
                    let e = p.find(({ walletClientType: e }) => e === h);
                    e &&
                      c.push(
                        (0, n.jsx)(
                          C,
                          {
                            connectOnly: l,
                            provider: h,
                            displayName: e.walletBranding?.name,
                            logo: e.walletBranding?.icon,
                            connector: e,
                          },
                          `${a}-${h}`,
                        ),
                      );
                  }
                }
              }
              return [...s, ...c, ...d];
            })({
              walletList: w.appearance.walletList.filter(
                (e) =>
                  !M.some((n) => n.walletClientType === e) &&
                  !D.some((n) => n.walletClientType === e),
              ),
              walletChainType: e,
              connectors: r,
              connectOnly: !0,
              ignore: [...w.appearance.walletList, ...F, ...B],
              walletConnectEnabled: w.externalWallets.walletConnect.enabled,
            }),
          ));
        let I = (0, n.jsx)(g.W, {
            text: "More wallets",
            onClick: () => j("overflow"),
          }),
          N = ({ sourceChainType: e, destChainType: n }) =>
            "ethereum" === e && "solana" === n
              ? "AwaitingEvmToSolBridgingScreen"
              : "ethereum" === e && "ethereum" === n
                ? "AwaitingExternalEthereumTransferScreen"
                : "solana" === e && "ethereum" === n
                  ? "AwaitingSolToEvmBridgingScreen"
                  : E.externalSolanaFundingScreen;
        return (
          (0, t.useEffect)(() => {
            c({
              ...f,
              externalConnectWallet: {
                onCompleteNavigateTo: ({
                  address: e,
                  walletClientType: n,
                  walletChainType: t,
                }) => {
                  let a = t ?? "ethereum",
                    l =
                      "ethereum" === a
                        ? M.find(
                            (t) => t.address === e && t.walletClientType === n,
                          )
                        : D.find(
                            (t) => t.address === e && t.walletClientType === n,
                          );
                  return (
                    c({
                      ...f,
                      funding: {
                        ...E,
                        connectedWallet: l,
                        onContinueWithExternalWallet: () => {
                          m(
                            N({
                              destChainType: S ? "solana" : "ethereum",
                              sourceChainType: a,
                            }),
                          );
                        },
                      },
                      solanaFundingData: f?.solanaFundingData
                        ? {
                            ...f.solanaFundingData,
                            sourceWalletData: {
                              address: e || "",
                              walletClientType: n || "",
                            },
                          }
                        : void 0,
                    }),
                    "FundingAmountEditScreen"
                  );
                },
              },
            });
          }, []),
          (0, n.jsxs)(
            n.Fragment,
            "overflow" === b
              ? {
                  children: [
                    (0, n.jsx)(l.M, { backFn: () => j("default") }, "header"),
                    (0, n.jsxs)(v.p, {
                      children: [
                        (0, n.jsx)(s.S, {
                          style: {
                            color: "var(--privy-color-foreground-3)",
                            textAlign: "left",
                          },
                          children: "More wallets",
                        }),
                        L,
                      ],
                    }),
                    (0, n.jsx)(a.B, {}),
                  ],
                }
              : {
                  children: [
                    (0, n.jsx)(o.t, {}),
                    (0, n.jsx)(i.C, {
                      title: "Transfer from wallet",
                      description:
                        "Connect a wallet to deposit funds or send funds manually to your wallet address.",
                    }),
                    (0, n.jsxs)(v.p, {
                      children: [
                        L.length > 4 ? L.slice(0, 3) : L,
                        L.length > 4 && I,
                      ],
                    }),
                    (0, n.jsx)(a.B, {}),
                  ],
                },
          )
        );
      },
    },
    O = ({ onClick: e, icon: t, name: a, chainType: l }) =>
      (0, n.jsxs)(v.L, {
        onClick: e,
        children: [
          (0, n.jsx)(T.I, {
            style: { width: 20 },
            children: (0, n.jsx)(r.I, { icon: t, name: a }),
          }),
          a,
          (0, n.jsx)(c.C, {
            color: "gray",
            style: { marginLeft: "auto" },
            children: "Connected",
          }),
          "solana" === l &&
            (0, n.jsx)(c.C, { color: "gray", children: "Solana" }),
        ],
      });
  e.s(["TransferFromWalletScreen", 0, W, "default", 0, W]);
};
