// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(464649),
    a = e.i(541710),
    i = e.i(646908),
    n = e.i(605587);
  let r = new Set([
    1,
    8453,
    56,
    4663,
    999,
    57073,
    5042,
    a.g,
    a.h,
    a.j,
    a.D,
    143,
  ]);
  e.s(
    [
      "i",
      0,
      0x536f6c4d,
      "L",
      0,
      function (e, t = a.q) {
        return (0, i.L)(e.chain_id)
          ? i.J
          : (0, i._)(e.chain_id)
            ? (0, a.k)(t)
              ? i.W
              : void 0
            : (0, i.B)(e.chain_id) && (0, a.M)(t)
              ? i.d
              : void 0;
      },
      "s",
      0,
      function (e, t = a.q) {
        if (
          (0, i.B)(e.chain_id) ||
          (0, i.L)(e.chain_id) ||
          (0, i._)(e.chain_id)
        )
          return;
        if (!(0, n.N)({ mint: e.mint, chainId: e.chain_id })) return 0x536f6c4d;
        let l = Number((0, n.w)(e.chain_id));
        return r.has(l) && (0, a.b)(l, t) ? l : void 0;
      },
    ],
    362373,
  );
  var l = e.i(21617),
    s = e.i(639374);
  let o = [
      "solana",
      "robinhood",
      "hyperevm",
      "base",
      "bsc",
      "ethereum",
      "arc",
      "megaeth",
      "xlayer",
      "monad",
      "polygon",
      "arbitrum",
      i.Q,
      i.z,
    ],
    d = [...o, i.h],
    u = "perps",
    c = (e, t) => e.filter((e) => e === u || (0, a.F)(e, t)),
    p = {
      ...{
        solana: "Solana",
        ethereum: "Ethereum",
        base: "Base",
        bsc: "BSC",
        robinhood: "Robinhood",
        hyperevm: "HyperEVM",
        arc: "Arc",
        megaeth: "MegaETH",
        xlayer: "X Layer",
        monad: "Monad",
        polygon: "Polygon",
        arbitrum: "Arbitrum",
        near: "NEAR",
        ton: "TON",
      },
      [i.h]: "Starknet",
      [u]: "Hype",
    },
    m = {
      ...Object.fromEntries(o.map((e) => [e, t.T[e]])),
      [i.h]: t.T.starknet,
      [u]: t.T.hyperevm,
    },
    h = {
      ethereum: "1",
      base: "8453",
      bsc: "56",
      robinhood: "4663",
      hyperevm: "999",
      arc: "5042",
      megaeth: "4326",
      xlayer: "196",
      monad: "143",
      polygon: "137",
      arbitrum: "42161",
    },
    f = (e, t = {}) => {
      if (!e?.length || e.includes(i.h)) return {};
      let a = e.includes(u);
      if (a && !1 === t.hype) return {};
      let n = o.filter((t) => e.includes(t));
      if (n.length === o.length)
        return a ? { chains: ["all", "hlcore:mainnet"] } : {};
      let r = n
          .flatMap((e) =>
            "solana" === e
              ? [0x536f6c4d]
              : e === i.Q || e === i.z
                ? []
                : [Number(h[e])],
          )
          .sort((e, t) => e - t),
        s = [];
      return (
        a && s.push(l.g),
        n.includes(i.z) && s.push(i.J),
        n.includes(i.Q) && s.push(i.d),
        {
          ...(r.length > 0 ? { chainIds: r } : {}),
          ...(s.length > 0 ? { chains: s } : {}),
        }
      );
    };
  e.s(
    [
      "B",
      0,
      d,
      "w",
      0,
      o,
      "z",
      0,
      p,
      "S",
      0,
      m,
      "l",
      0,
      u,
      "R",
      0,
      (e) => [...(e.chainIds ?? []), ...(e.chains ?? [])].join(","),
      "a",
      0,
      f,
      "r",
      0,
      (e) =>
        "solana" === e
          ? "solana"
          : e === i.z
            ? i.J
            : e === i.h
              ? i.W
              : e === i.Q
                ? i.d
                : i.H[e],
      "W",
      0,
      c,
      "G",
      0,
      (e, t) => {
        let a = c(o, t),
          i = a.filter((t) => e?.includes(t));
        return 0 === i.length || i.length === a.length ? "all" : i.join(",");
      },
      "s",
      0,
      (e) => (e.includes(",") ? { chains: e.split(",") } : { chain: e }),
      "m",
      0,
      (e) => f("all" === e ? void 0 : [e]),
      "e",
      0,
      (e) => e !== u,
      "N",
      0,
      (e, t) => {
        if ("all" === t) return !0;
        if (t === u) return !0 === e.perp;
        if (e.perp) return !1;
        let a = "string" == typeof e.chainId && (0, i.L)(e.chainId);
        if (t === i.z) return a;
        if (a) return !1;
        let r = "string" == typeof e.chainId && (0, i._)(e.chainId);
        if (t === i.h) return r;
        if (r) return !1;
        let l = "string" == typeof e.chainId && (0, i.B)(e.chainId);
        if (t === i.Q) return l;
        if (l) return !1;
        if ("solana" === t) return (0, s.f)(e.coinMint);
        if ((0, s.f)(e.coinMint)) return !1;
        let o = null == e.chainId ? null : (0, n.w)(String(e.chainId));
        return null !== o && o === h[t];
      },
    ],
    637172,
  );
};
