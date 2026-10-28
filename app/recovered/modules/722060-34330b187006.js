// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var i = e.i(732486),
    t = e.i(352386),
    r = e.i(995040),
    n = e.i(727472),
    o = e.i(25047),
    a = e.i(918048),
    d = e.i(226439),
    l = e.i(850876),
    c = e.i(636447),
    s = e.i(525856),
    u = e.i(625761),
    p = e.i(813693);
  (e.i(252494), e.i(785373));
  let f = {
    component: () => {
      let { data: e, setModalData: f } = (0, c.u)(),
        g = e?.funding,
        x = "solana" === g.chainType,
        h = (0, t.useRef)(null),
        { tokenPrice: v } = (0, s.u)(x ? "solana" : g.chain.id),
        m = x ? void 0 : g,
        y = !(!m?.erc20Address || m?.erc20ContractInfo),
        b = x
          ? g.isUSDC
            ? "USDC"
            : "SOL"
          : g.erc20Address
            ? g.erc20ContractInfo?.symbol
            : g.chain.nativeCurrency.symbol || "ETH",
        z = parseFloat(g.amount),
        S = !isNaN(z) && z > 0,
        k = v ? (0, u.c)(g.amount, v) : void 0;
      return (0, i.jsxs)(i.Fragment, {
        children: [
          (0, i.jsx)(a.t, {}),
          (0, i.jsx)(l.T, { children: "Confirm or edit amount" }),
          (0, i.jsxs)(n.F, {
            style: { marginTop: "32px" },
            children: [
              (0, i.jsx)(p.F, {
                children: y
                  ? (0, i.jsx)(d.N, { size: "50px" })
                  : (0, i.jsxs)(i.Fragment, {
                      children: [
                        (0, i.jsxs)(p.a, {
                          onClick: () => h.current?.focus(),
                          children: [
                            (0, i.jsx)(p.g, {
                              ref: h,
                              value: g.amount,
                              onChange: (i) => {
                                let t = i.target.value;
                                /^[0-9.]*$/.test(t) &&
                                  t.split(".").length - 1 <= 1 &&
                                  f({
                                    ...e,
                                    funding: { ...g, amount: t },
                                    solanaFundingData: e?.solanaFundingData
                                      ? { ...e.solanaFundingData, amount: t }
                                      : void 0,
                                  });
                              },
                            }),
                            (0, i.jsx)(p.c, { children: b }),
                          ],
                        }),
                        !m?.erc20Address &&
                          !(x && g.isUSDC) &&
                          (0, i.jsx)(p.d, {
                            children: k && S ? `${k} USD` : "",
                          }),
                      ],
                    }),
              }),
              (0, i.jsx)(r.b, {
                style: { marginTop: "1rem" },
                disabled: !S,
                onClick: g.onContinueWithExternalWallet,
                children: "Continue",
              }),
            ],
          }),
          (0, i.jsx)(o.B, {}),
        ],
      });
    },
  };
  e.s(["FundingAmountEditScreen", 0, f, "default", 0, f]);
};
