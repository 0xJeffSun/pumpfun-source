// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(464649),
    r = e.i(541710),
    n = e.i(646908),
    i = e.i(605587);
  let a = new Set([
    1,
    8453,
    56,
    4663,
    999,
    57073,
    5042,
    r.g,
    r.h,
    r.j,
    r.D,
    143,
  ]);
  e.s(
    [
      "i",
      0,
      0x536f6c4d,
      "L",
      0,
      function (e, t = r.q) {
        return (0, n.L)(e.chain_id)
          ? n.J
          : (0, n._)(e.chain_id)
            ? (0, r.k)(t)
              ? n.W
              : void 0
            : (0, n.B)(e.chain_id) && (0, r.M)(t)
              ? n.d
              : void 0;
      },
      "s",
      0,
      function (e, t = r.q) {
        if (
          (0, n.B)(e.chain_id) ||
          (0, n.L)(e.chain_id) ||
          (0, n._)(e.chain_id)
        )
          return;
        if (!(0, i.N)({ mint: e.mint, chainId: e.chain_id })) return 0x536f6c4d;
        let l = Number((0, i.w)(e.chain_id));
        return a.has(l) && (0, r.b)(l, t) ? l : void 0;
      },
    ],
    362373,
  );
  var l = e.i(21617),
    o = e.i(639374);
  let s = [
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
      n.Q,
      n.z,
    ],
    d = [...s, n.h],
    u = "perps",
    c = (e, t) => e.filter((e) => e === u || (0, r.F)(e, t)),
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
      [n.h]: "Starknet",
      [u]: "Hype",
    },
    m = {
      ...Object.fromEntries(s.map((e) => [e, t.T[e]])),
      [n.h]: t.T.starknet,
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
      if (!e?.length || e.includes(n.h)) return {};
      let r = e.includes(u);
      if (r && !1 === t.hype) return {};
      let i = s.filter((t) => e.includes(t));
      if (i.length === s.length)
        return r ? { chains: ["all", "hlcore:mainnet"] } : {};
      let a = i
          .flatMap((e) =>
            "solana" === e
              ? [0x536f6c4d]
              : e === n.Q || e === n.z
                ? []
                : [Number(h[e])],
          )
          .sort((e, t) => e - t),
        o = [];
      return (
        r && o.push(l.g),
        i.includes(n.z) && o.push(n.J),
        i.includes(n.Q) && o.push(n.d),
        {
          ...(a.length > 0 ? { chainIds: a } : {}),
          ...(o.length > 0 ? { chains: o } : {}),
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
      s,
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
          : e === n.z
            ? n.J
            : e === n.h
              ? n.W
              : e === n.Q
                ? n.d
                : n.H[e],
      "W",
      0,
      c,
      "G",
      0,
      (e, t) => {
        let r = c(s, t),
          n = r.filter((t) => e?.includes(t));
        return 0 === n.length || n.length === r.length ? "all" : n.join(",");
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
        let r = "string" == typeof e.chainId && (0, n.L)(e.chainId);
        if (t === n.z) return r;
        if (r) return !1;
        let a = "string" == typeof e.chainId && (0, n._)(e.chainId);
        if (t === n.h) return a;
        if (a) return !1;
        let l = "string" == typeof e.chainId && (0, n.B)(e.chainId);
        if (t === n.Q) return l;
        if (l) return !1;
        if ("solana" === t) return (0, o.f)(e.coinMint);
        if ((0, o.f)(e.coinMint)) return !1;
        let s = null == e.chainId ? null : (0, i.w)(String(e.chainId));
        return null !== s && s === h[t];
      },
    ],
    637172,
  );
};
