// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    o = e.i(689391),
    i = e.i(766409),
    a = e.i(625761),
    n = e.i(867599),
    t = e.i(384799),
    l = e.i(336291);
  let c = o.z.span`
  font-size: 14px;
  line-height: 140%;
  display: flex;
  gap: 4px;
  align-items: center;
`,
    d = o.z.span`
  font-size: 12px;
  line-height: 12px;
  color: var(--privy-color-foreground-3);
`,
    s = o.z.span`
  font-size: 10px;
`,
    v = o.z.span`
  display: flex;
  align-items: center;
`,
    p = o.z.a`
  &:hover {
    text-decoration: underline;
  }
`;
  e.s([
    "H",
    0,
    ({ weiQuantities: e, tokenPrice: o, tokenSymbol: i }) => {
      let n = (0, a.s)(e),
        t = o ? (0, a.a)(n, o) : void 0,
        l = (0, a.g)(n, i);
      return (0, r.jsx)(c, { children: t || l });
    },
    "P",
    0,
    ({ weiQuantities: e, tokenPrice: o, tokenSymbol: i }) => {
      let n = (0, a.s)(e),
        t = o ? (0, a.a)(n, o) : void 0,
        l = (0, a.g)(n, i);
      return (0, r.jsx)(c, {
        children: t
          ? (0, r.jsxs)(r.Fragment, {
              children: [
                (0, r.jsx)(d, { children: "USD" }),
                "<$0.01" === t
                  ? (0, r.jsxs)(v, {
                      children: [(0, r.jsx)(s, { children: "<" }), "$0.01"],
                    })
                  : t,
              ],
            })
          : l,
      });
    },
    "S",
    0,
    ({
      quantities: e,
      tokenPrice: o,
      tokenSymbol: a = "SOL",
      tokenDecimals: l = 9,
    }) => {
      let d = e.reduce((e, r) => e + r, 0n),
        p = o && "SOL" === a && 9 === l ? (0, n.g)(d, o) : void 0,
        u = "SOL" === a && 9 === l ? (0, t.g)(d) : `${(0, i.f)(d, l)} ${a}`;
      return (0, r.jsx)(c, {
        children: p
          ? (0, r.jsx)(r.Fragment, {
              children:
                "<$0.01" === p
                  ? (0, r.jsxs)(v, {
                      children: [(0, r.jsx)(s, { children: "<" }), "$0.01"],
                    })
                  : p,
            })
          : u,
      });
    },
    "W",
    0,
    (e) => {
      var o, i;
      return (0, r.jsx)(p, {
        href:
          "ethereum" === e.chainType
            ? (0, a.b)(e.chainId, e.walletAddress)
            : ((o = e.walletAddress),
              (i = e.chainId),
              `https://explorer.solana.com/account/${o}?chain=${i}`),
        target: "_blank",
        children: (0, l.c)(e.walletAddress),
      });
    },
  ]);
};
