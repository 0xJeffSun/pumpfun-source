// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(689391),
    a = e.i(766409),
    i = e.i(625761),
    s = e.i(867599),
    r = e.i(384799),
    o = e.i(336291);
  let l = n.z.span`
  font-size: 14px;
  line-height: 140%;
  display: flex;
  gap: 4px;
  align-items: center;
`,
    d = n.z.span`
  font-size: 12px;
  line-height: 12px;
  color: var(--privy-color-foreground-3);
`,
    c = n.z.span`
  font-size: 10px;
`,
    u = n.z.span`
  display: flex;
  align-items: center;
`,
    p = n.z.a`
  &:hover {
    text-decoration: underline;
  }
`;
  e.s([
    "H",
    0,
    ({ weiQuantities: e, tokenPrice: n, tokenSymbol: a }) => {
      let s = (0, i.s)(e),
        r = n ? (0, i.a)(s, n) : void 0,
        o = (0, i.g)(s, a);
      return (0, t.jsx)(l, { children: r || o });
    },
    "P",
    0,
    ({ weiQuantities: e, tokenPrice: n, tokenSymbol: a }) => {
      let s = (0, i.s)(e),
        r = n ? (0, i.a)(s, n) : void 0,
        o = (0, i.g)(s, a);
      return (0, t.jsx)(l, {
        children: r
          ? (0, t.jsxs)(t.Fragment, {
              children: [
                (0, t.jsx)(d, { children: "USD" }),
                "<$0.01" === r
                  ? (0, t.jsxs)(u, {
                      children: [(0, t.jsx)(c, { children: "<" }), "$0.01"],
                    })
                  : r,
              ],
            })
          : o,
      });
    },
    "S",
    0,
    ({
      quantities: e,
      tokenPrice: n,
      tokenSymbol: i = "SOL",
      tokenDecimals: o = 9,
    }) => {
      let d = e.reduce((e, t) => e + t, 0n),
        p = n && "SOL" === i && 9 === o ? (0, s.g)(d, n) : void 0,
        m = "SOL" === i && 9 === o ? (0, r.g)(d) : `${(0, a.f)(d, o)} ${i}`;
      return (0, t.jsx)(l, {
        children: p
          ? (0, t.jsx)(t.Fragment, {
              children:
                "<$0.01" === p
                  ? (0, t.jsxs)(u, {
                      children: [(0, t.jsx)(c, { children: "<" }), "$0.01"],
                    })
                  : p,
            })
          : m,
      });
    },
    "W",
    0,
    (e) => {
      var n, a;
      return (0, t.jsx)(p, {
        href:
          "ethereum" === e.chainType
            ? (0, i.b)(e.chainId, e.walletAddress)
            : ((n = e.walletAddress),
              (a = e.chainId),
              `https://explorer.solana.com/account/${n}?chain=${a}`),
        target: "_blank",
        children: (0, o.c)(e.walletAddress),
      });
    },
  ]);
};
