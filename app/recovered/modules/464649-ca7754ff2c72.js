// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(357500),
    a = e.i(646908),
    i = e.i(605587);
  let n = {
    solana: "/chains/solana.svg",
    ethereum: "/chains/eth.png",
    base: "/chains/base.png",
    bsc: "/chains/bsc.png",
    monad: "/chains/monad.png",
    robinhood: "/chains/robinhood.png",
    hyperevm: "/chains/hyperevm.png",
    ink: "/chains/ink.png",
    arc: "/chains/arc.png",
    megaeth: "/chains/megaeth.png",
    ton: "/chains/ton.png",
    xlayer: "/chains/xlayer.png",
    polygon: "/chains/polygon.png",
    arbitrum: "/chains/arbitrum.png",
    starknet: "/chains/starknet.png",
    near: "/chains/near.png",
  };
  e.s([
    "T",
    0,
    n,
    "U",
    0,
    "/chains/solana-logomark.svg",
    "z",
    0,
    (e, r = {}) => {
      let l;
      if ("string" != typeof e) return null;
      let s = e.trim();
      if (!s) return null;
      let o = (0, t.findChain)(s) ?? (0, t.findChain)(s.toLowerCase());
      return o &&
        ((l = o.slug), a.l.includes(l)) &&
        ("solana" !== o.slug || r.includeSolana) &&
        ("ton" !== o.slug || r.includeTon) &&
        ("starknet" !== o.slug || r.includeStarknet) &&
        ("near" !== o.slug || r.includeNear)
        ? {
            src: n[o.slug],
            name: (0, i.n)(o.caip2) ?? o.displayName,
            slug: o.slug,
          }
        : null;
    },
  ]);
};
