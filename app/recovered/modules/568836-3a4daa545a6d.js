// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(352386),
    i = r.i(766409),
    a = r.i(42799),
    t = r.i(995040),
    n = r.i(727472),
    l = r.i(25047),
    c = r.i(594022),
    s = r.i(918048),
    d = r.i(176862),
    u = r.i(205212),
    v = r.i(850876),
    p = r.i(440527),
    h = r.i(933185),
    g = r.i(461687),
    f = r.i(748117),
    m = r.i(636447),
    b = r.i(505049),
    x = r.i(582355),
    y = r.i(679594),
    w = r.i(616800),
    k = r.i(952707),
    j = r.i(338834),
    C = r.i(384799),
    z = r.i(267058),
    S = r.i(336291);
  (r.i(698870), r.i(252494), r.i(785373), r.i(768820), r.i(535391));
  let $ = {
      component: () => {
        let { wallets: r } = (0, x.u)(),
          { connectors: $ } = (0, f.u)(),
          F = $.filter(g.d).flatMap((r) => r.wallets),
          { data: T, setModalData: B, navigate: A, lastScreen: E } = (0, m.u)(),
          {
            rpcConfig: L,
            appId: Z,
            createAnalyticsEvent: D,
            closePrivyModal: P,
          } = (0, f.u)(),
          N = (0, h.a)(),
          [U, _] = (0, o.useState)(void 0),
          [V, I] = (0, o.useState)(!1),
          O = T?.funding,
          { reloadBalance: W } = (0, b.u)({
            rpcConfig: L,
            appId: Z,
            address: "ethereum" === O.chainType ? O.address : void 0,
            chain: "ethereum" === O.chainType ? O.chain : void 0,
          }),
          H = "solana" === O.chainType,
          q = H
            ? O.isUSDC
              ? "USDC"
              : "SOL"
            : O.erc20Address
              ? O.erc20ContractInfo?.symbol
              : O.chain.nativeCurrency.symbol,
          R = H
            ? F.find(({ address: r }) => r === O.address)
            : r.find(({ address: r }) => (0, S.c)(r) === (0, S.c)(O.address));
        if (!O)
          return (
            B({
              errorModalData: {
                error: Error("Couldn't find funding config"),
                previousScreen: E || "FundingMethodSelectionScreen",
              },
              funding: T?.funding,
              solanaFundingData: T?.solanaFundingData,
              sendTransaction: T?.sendTransaction,
            }),
            A("ErrorScreen"),
            (0, e.jsx)(e.Fragment, {})
          );
        (0, o.useEffect)(() => {
          let r = H
              ? async function () {
                  if ("solana" !== O.chainType) return;
                  let r = N.solanaRpcs[O.chain];
                  r
                    ? (O.isUSDC
                        ? (async function ({
                            rpc: r,
                            address: e,
                            mintAddress: o,
                          }) {
                            let i = await r
                                .getTokenAccountsByOwner(
                                  e,
                                  { mint: o },
                                  {
                                    encoding: "jsonParsed",
                                    commitment: "confirmed",
                                  },
                                )
                                .send(),
                              a = i.value[0]?.account;
                            return a
                              ? BigInt(a.data.parsed.info.tokenAmount.amount)
                              : 0n;
                          })({
                            rpc: r.rpc,
                            address: O.address,
                            mintAddress: (0, j.g)(O.chain),
                          })
                        : (0, w.p)({ rpc: r.rpc, address: O.address })
                      ).then((r) => {
                        let e = BigInt(r);
                        (U &&
                          e > U &&
                          (I(!0),
                          D({
                            eventName: y.O,
                            payload: {
                              provider: "manual",
                              status: "success",
                              chainType: "solana",
                              address: R?.address,
                              value: O.isUSDC
                                ? (0, i.f)(e - U, 6)
                                : (0, i.f)(e - U, 9),
                              token: O.isUSDC ? "USDC" : "SOL",
                            },
                          })),
                          _(e));
                      })
                    : console.warn(
                        "Unable to load solana rpc, skipping balance",
                      );
                }
              : async function () {
                  "ethereum" === O.chainType &&
                    (async () => {
                      if (!O.erc20Address) return (await W()) ?? BigInt(0);
                      {
                        let { balance: r } = await (0, z.g)({
                          chain: O.chain,
                          address: O.address,
                          erc20Address: O.erc20Address,
                          rpcConfig: L,
                          appId: Z,
                        });
                        return r;
                      }
                    })()
                      .then((r) => {
                        (U &&
                          r > U &&
                          (I(!0),
                          D({
                            eventName: y.O,
                            payload: {
                              provider: "manual",
                              status: "success",
                              chainType: "ethereum",
                              address: R?.address,
                              chainId: O.chain.id,
                              value: (0, i.f)(
                                r - U,
                                O.erc20ContractInfo?.decimals ?? 18,
                              ),
                              token:
                                O.erc20ContractInfo?.symbol ??
                                O.erc20Address ??
                                "ETH",
                            },
                          })),
                          _(r));
                      })
                      .catch(() => _(void 0));
                },
            e = setInterval(r, 2e3);
          return (r(), () => clearInterval(e));
        }, [U]);
        let Q = (0, o.useMemo)(
            () =>
              null == U
                ? ""
                : O.isUSDC
                  ? (0, a.e)({ amount: U, decimals: 6 })
                  : H
                    ? (0, C.g)(U, 3, !0, !0)
                    : null != O.erc20ContractInfo?.decimals
                      ? (0, a.e)({
                          amount: U,
                          decimals: O.erc20ContractInfo.decimals,
                        })
                      : (0, a.w)({ wei: U }),
            [U, H, O],
          ),
          G = "ethereum" === O.chainType ? O.chain.name : (0, k.g)(O.chain),
          J = (0, o.useMemo)(
            () =>
              "" === O.uiConfig?.receiveFundsTitle
                ? null
                : (0, e.jsx)(v.T, {
                    children:
                      O.uiConfig?.receiveFundsTitle ??
                      `Receive ${O.amount} ${q ?? ""}`.trim(),
                  }),
            [O.uiConfig?.receiveFundsTitle, O.amount, q],
          ),
          Y = (0, o.useMemo)(
            () =>
              "" === O.uiConfig?.receiveFundsSubtitle
                ? null
                : (0, e.jsx)(u.S, {
                    children:
                      O.uiConfig?.receiveFundsSubtitle ??
                      `Scan this code or copy your wallet address to receive funds on ${G}.`,
                  }),
            [O.uiConfig?.receiveFundsSubtitle, G],
          ),
          K =
            "solana" === O.chainType && O.isUSDC && (0, j.g)(O.chain)
              ? `?spl-token=${(0, j.g)(O.chain)}`
              : "";
        return (0, e.jsxs)(e.Fragment, {
          children: [
            (0, e.jsx)(s.t, {}),
            J,
            Y,
            (0, e.jsxs)(n.F, {
              style: { gap: "1rem", margin: J || Y ? "1rem 0" : "0" },
              children: [
                (0, e.jsx)(c.Q, {
                  url: `${O.chainType}:${O.address}${K}`,
                  size: 200,
                  squareLogoElement: M,
                }),
                (0, e.jsxs)(d.I, {
                  theme: N.appearance.palette.colorScheme,
                  children: ["Make sure to send funds on ", G, "."],
                }),
                (0, e.jsx)(p.W, {
                  title: "Your wallet",
                  errMsg: void 0,
                  showCopyButton: !0,
                  balance: `${Q} ${q}`,
                  address: O.address,
                }),
                V &&
                  (0, e.jsx)(t.P, {
                    onClick: () =>
                      P({ shouldCallAuthOnSuccess: !1, isSuccess: !0 }),
                    children: "Continue",
                  }),
              ],
            }),
            (0, e.jsx)(l.B, {}),
          ],
        });
      },
    },
    M = ({ ...r }) => (0, e.jsx)(w.B, { color: "black", ...r });
  r.s(["ManualTransferScreen", 0, $, "default", 0, $]);
};
