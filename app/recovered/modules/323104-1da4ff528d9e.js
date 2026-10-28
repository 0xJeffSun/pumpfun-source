// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(352386);
  let a = n.forwardRef(function ({ title: e, titleId: t, ...a }, i) {
      return n.createElement(
        "svg",
        Object.assign(
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            "aria-hidden": "true",
            "data-slot": "icon",
            ref: i,
            "aria-labelledby": t,
          },
          a,
        ),
        e ? n.createElement("title", { id: t }, e) : null,
        n.createElement("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z",
        }),
      );
    }),
    i = n.forwardRef(function ({ title: e, titleId: t, ...a }, i) {
      return n.createElement(
        "svg",
        Object.assign(
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            "aria-hidden": "true",
            "data-slot": "icon",
            ref: i,
            "aria-labelledby": t,
          },
          a,
        ),
        e ? n.createElement("title", { id: t }, e) : null,
        n.createElement("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z",
        }),
        n.createElement("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z",
        }),
      );
    });
  var r = e.i(14723),
    o = e.i(389238),
    d = e.i(25047),
    l = e.i(918048),
    s = e.i(746549),
    c = e.i(176862),
    u = e.i(885650),
    h = e.i(578960),
    p = e.i(933185),
    f = e.i(461687),
    g = e.i(711807),
    m = e.i(748117),
    v = e.i(636447),
    y = e.i(582355),
    x = e.i(480705),
    w = e.i(406292),
    b = e.i(178061),
    M = e.i(42799),
    C = e.i(852714),
    F = e.i(565530),
    j = e.i(947537),
    k = e.i(315430),
    S = e.i(813693);
  (e.i(252494), e.i(785373), e.i(768820));
  let z = {
      [b.q.id]: "ethereum",
      [b.j.id]: "base",
      [b.S.id]: "optimism",
      [b.y.id]: "polygon",
      [b.g.id]: "arbitrum",
      [b.M.id]: "avacchain",
      [b.k.id]: "monad",
    },
    A = (e, t, n, a, i, r) =>
      new Promise(async (o, d) => {
        let l = (0, C.f)();
        if (!l) return void d(Error("Unable to initialize flow"));
        let s =
            "ethereum" === t.chainType
              ? (function (e) {
                  let t = z[e];
                  if (!t)
                    throw new F.P(
                      `Unsupported chainId: ${e} for Coinbase Onramp`,
                    );
                  return t;
                })(t.chain.id)
              : "solana",
          c = t.isUSDC
            ? "USDC"
            : "ethereum" === t.chainType
              ? (0, M.n)(t.chain.id, "native-currency")
              : "SOL",
          u = await e.initCoinbaseOnRamp({
            addresses: [{ address: t.address, blockchains: [s] }],
            assets: [c],
          }),
          { url: h } = (0, M.m)({
            appId: e.getAppId(),
            input: u,
            amount: t.amount,
            blockchain: s,
            asset: c,
            experience: r,
          });
        l.location = h.toString();
        let p = { ...i?.funding, showAlternateFundingMethod: !0 };
        (t.usingDefaultFundingMethod && (p.usingDefaultFundingMethod = !1),
          n({
            funding: p,
            solanaFundingData: i?.solanaFundingData,
            coinbaseOnrampStatus: { popup: l },
          }),
          a("CoinbaseOnrampStatusScreen"),
          e.createAnalyticsEvent({
            eventName: "sdk_fiat_on_ramp_started",
            payload: {
              provider: "coinbase-onramp",
              value: t.amount,
              chainType: t.chainType,
              chainId: "ethereum" === t.chainType ? t.chain.id : t.chain,
            },
          }),
          setTimeout(() => {
            n({
              funding: p,
              solanaFundingData: i?.solanaFundingData,
              coinbaseOnrampStatus: {
                partnerUserId: u.partner_user_id,
                popup: l,
              },
            });
          }, 5e3),
          o());
      }),
    W = async (e, t, n, a, i, r, o, d) => {
      let l = (0, C.f)();
      if (!l) throw Error("Unable to initialize flow");
      let s =
          "ethereum" === t.chainType
            ? (0, M.a)(t.chain.id, a)
            : t.isUSDC
              ? "USDC_SOL"
              : "SOL",
        { signedUrl: c, externalTransactionId: u } =
          await e.signMoonpayOnRampUrl({
            address: t.address,
            useSandbox: n.fundingMethodConfig.moonpay.useSandbox ?? !1,
            config: {
              uiConfig: {
                accentColor: n.appearance.palette.accent,
                theme: n.appearance.palette.colorScheme,
              },
              paymentMethod: d,
              currencyCode: s,
              quoteCurrencyAmount: (0, j.a)(t.amount),
            },
          });
      (e.createAnalyticsEvent({
        eventName: "sdk_fiat_on_ramp_started",
        payload: {
          provider: "moonpay",
          value: t.amount,
          chainType: t.chainType,
          chainId: "ethereum" === t.chainType ? t.chain.id : t.chain,
        },
      }),
        (l.location = c));
      let h = { ...o?.funding, showAlternateFundingMethod: !0 };
      (t.usingDefaultFundingMethod && (h.usingDefaultFundingMethod = !1),
        i({
          moonpayStatus: {},
          funding: h,
          solanaFundingData: o?.solanaFundingData,
        }),
        r("MoonpayStatusScreen"),
        setTimeout(() => {
          i({
            moonpayStatus: { externalTransactionId: u },
            funding: h,
            solanaFundingData: o?.solanaFundingData,
          });
        }, 8e3));
    },
    D = {
      component: () => {
        let { wallets: e } = (0, y.u)(),
          { connectors: b } = (0, m.u)(),
          C = b.filter(f.d).flatMap((e) => e.wallets),
          { navigate: F, data: j, setModalData: z } = (0, v.u)(),
          { client: D } = (0, m.u)(),
          T = (0, p.a)(),
          E = j?.funding,
          L = (0, g.u)(g.i),
          I = (0, g.u)(g.a),
          O = "solana" === E.chainType,
          _ = O ? void 0 : E,
          Z = (0, n.useMemo)(
            () =>
              ((e, t, n, a, i, r) => {
                let o,
                  d,
                  l = "solana" === n.chainType,
                  s = l ? void 0 : n,
                  c = n.isUSDC
                    ? "USDC"
                    : s?.erc20Address
                      ? void 0
                      : "native-currency",
                  u = !!l || (c && (0, M.O)(Number(n.chain.id), c)),
                  h = !!l || (c && (0, M.z)(Number(n.chain.id), c)),
                  p = [];
                for (let o of (n.preferredCardProvider &&
                  n.supportedOptions.sort((e) =>
                    e.provider === n.preferredCardProvider ? -1 : 1,
                  ),
                n.supportedOptions))
                  ("card" === o.method &&
                    "coinbase" === o.provider &&
                    h &&
                    p.push(() => A(t, n, a, i, r, "buy")),
                    "card" === o.method &&
                      "moonpay" === o.provider &&
                      u &&
                      c &&
                      p.push(() =>
                        W(t, n, e, c, a, i, r, "credit_debit_card"),
                      ));
                for (let e of n.supportedOptions)
                  "exchange" === e.method &&
                    "coinbase" === e.provider &&
                    h &&
                    (o = () => A(t, n, a, i, r, "buy"));
                for (let e of r?.funding?.supportedOptions ?? [])
                  "wallets" === e.method &&
                    (d = () => i("TransferFromWalletScreen"));
                return {
                  onFundWithCard: p,
                  onFundWithExchange: o,
                  onFundWithWallet: d,
                };
              })(T, D, E, z, F, j),
            [T, D, E, j, z, F],
          ),
          B = O
            ? C.find(({ address: e }) => e === E.address)
            : e.find(({ address: e }) => (0, o.A)(e) === (0, o.A)(E.address)),
          P = (0, f.k)(B?.walletClientType || "unknown"),
          R = P?.name || "wallet",
          U = B && "privy" !== B.walletClientType ? R : T.name,
          H = (0, n.useMemo)(
            () =>
              E.uiConfig?.landing?.title
                ? E.uiConfig?.landing?.title
                : `Add funds to your ${U?.toLowerCase().endsWith("wallet") ? U : U + " wallet"}`,
            [E.uiConfig?.landing?.title, U],
          );
        ((0, n.useEffect)(() => {
          if (E?.defaultFundingMethod && E.usingDefaultFundingMethod)
            switch (
              (z({
                funding: { ...E, usingDefaultFundingMethod: !1 },
                solanaFundingData: j?.solanaFundingData,
              }),
              E?.defaultFundingMethod)
            ) {
              case "card":
                Z.onFundWithCard[0] && Z.onFundWithCard[0]();
                break;
              case "exchange":
                Z.onFundWithExchange && Z.onFundWithExchange();
                break;
              case "wallet":
                Z.onFundWithWallet && Z.onFundWithWallet();
                break;
              case "manual":
                F("ManualTransferScreen");
            }
        }, []),
          (0, n.useEffect)(() => {
            _?.erc20Address &&
              !_.erc20ContractInfo &&
              (0, w.g)({
                address: _.erc20Address,
                chain: _.chain,
                rpcConfig: T.rpcConfig,
                privyAppId: T.id,
              })
                .then((e) => {
                  z({
                    ...j,
                    funding: {
                      ..._,
                      erc20ContractInfo: e
                        ? { symbol: e.symbol, decimals: e.decimals }
                        : void 0,
                    },
                  });
                })
                .catch(console.error);
          }, [_?.erc20Address, _?.chain]));
        let $ = !(!_?.erc20Address || _?.erc20ContractInfo);
        return (0, t.jsxs)(t.Fragment, {
          children: [
            (0, t.jsx)(l.t, {}),
            (0, t.jsx)("h3", { children: H }),
            (0, t.jsxs)(S.e, {
              children: [
                E.errorMessage &&
                  (0, t.jsx)(s.E, {
                    theme: T.appearance.palette.colorScheme,
                    children: E.errorMessage,
                  }),
                Z.onFundWithCard?.[0] &&
                  (0, t.jsxs)(k.L, {
                    disabled: $,
                    onClick: Z.onFundWithCard[0],
                    children: [
                      (0, t.jsx)(S.I, {
                        children: (0, t.jsx)(a, { style: { width: 24 } }),
                      }),
                      "Pay with card",
                      L
                        ? (0, t.jsx)(u.A, {
                            style: {
                              marginLeft: "auto",
                              maxWidth: "100%",
                              width: "auto",
                              height: "0.875rem",
                            },
                          })
                        : I
                          ? (0, t.jsx)(h.G, {
                              style: {
                                marginLeft: "auto",
                                maxWidth: "100%",
                                width: "auto",
                                height: "0.875rem",
                              },
                            })
                          : null,
                    ],
                  }),
                Z.onFundWithExchange &&
                  (0, t.jsxs)(k.L, {
                    disabled: $,
                    onClick: Z.onFundWithExchange,
                    children: [
                      (0, t.jsx)(S.I, {
                        children: (0, t.jsx)(r.f, { style: { width: 24 } }),
                      }),
                      "Transfer from an exchange",
                    ],
                  }),
                Z.onFundWithWallet &&
                  (0, t.jsxs)(k.L, {
                    disabled: $,
                    onClick: Z.onFundWithWallet,
                    children: [
                      (0, t.jsx)(S.I, {
                        children: (0, t.jsx)(x.W, { style: { width: 24 } }),
                      }),
                      "Transfer from wallet",
                    ],
                  }),
                (0, t.jsxs)(k.L, {
                  disabled: $,
                  onClick: () => F("ManualTransferScreen"),
                  children: [
                    (0, t.jsx)(S.I, {
                      children: (0, t.jsx)(i, { style: { width: 24 } }),
                    }),
                    "Receive funds",
                  ],
                }),
                E?.showAlternateFundingMethod &&
                  Z.onFundWithCard?.[1] &&
                  (0, t.jsxs)(c.I, {
                    theme: T.appearance.palette.colorScheme,
                    children: [
                      "Having trouble or facing location restrictions?",
                      " ",
                      (0, t.jsx)(S.f, {
                        onClick: Z.onFundWithCard[1],
                        children: "Try a different provider.",
                      }),
                    ],
                  }),
              ],
            }),
            (0, t.jsx)(d.B, {}),
          ],
        });
      },
    };
  e.s(["FundingMethodSelectionScreen", 0, D, "default", 0, D], 323104);
};
