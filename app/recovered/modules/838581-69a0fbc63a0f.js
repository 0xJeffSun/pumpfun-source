// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(689391),
    a = e.i(766409),
    i = e.i(625761),
    r = e.i(867599),
    o = e.i(384799),
    s = e.i(336291);
  let c = n.z.span`
  font-size: 14px;
  line-height: 140%;
  display: flex;
  gap: 4px;
  align-items: center;
`,
    l = n.z.span`
  font-size: 12px;
  line-height: 12px;
  color: var(--privy-color-foreground-3);
`,
    d = n.z.span`
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
      let r = (0, i.s)(e),
        o = n ? (0, i.a)(r, n) : void 0,
        s = (0, i.g)(r, a);
      return (0, t.jsx)(c, { children: o || s });
    },
    "P",
    0,
    ({ weiQuantities: e, tokenPrice: n, tokenSymbol: a }) => {
      let r = (0, i.s)(e),
        o = n ? (0, i.a)(r, n) : void 0,
        s = (0, i.g)(r, a);
      return (0, t.jsx)(c, {
        children: o
          ? (0, t.jsxs)(t.Fragment, {
              children: [
                (0, t.jsx)(l, { children: "USD" }),
                "<$0.01" === o
                  ? (0, t.jsxs)(u, {
                      children: [(0, t.jsx)(d, { children: "<" }), "$0.01"],
                    })
                  : o,
              ],
            })
          : s,
      });
    },
    "S",
    0,
    ({
      quantities: e,
      tokenPrice: n,
      tokenSymbol: i = "SOL",
      tokenDecimals: s = 9,
    }) => {
      let l = e.reduce((e, t) => e + t, 0n),
        p = n && "SOL" === i && 9 === s ? (0, r.g)(l, n) : void 0,
        m = "SOL" === i && 9 === s ? (0, o.g)(l) : `${(0, a.f)(l, s)} ${i}`;
      return (0, t.jsx)(c, {
        children: p
          ? (0, t.jsx)(t.Fragment, {
              children:
                "<$0.01" === p
                  ? (0, t.jsxs)(u, {
                      children: [(0, t.jsx)(d, { children: "<" }), "$0.01"],
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
        children: (0, s.c)(e.walletAddress),
      });
    },
  ]);
};
