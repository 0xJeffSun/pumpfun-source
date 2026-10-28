// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(357500),
    r = e.i(646908),
    n = e.i(605587);
  let i = {
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
    i,
    "U",
    0,
    "/chains/solana-logomark.svg",
    "z",
    0,
    (e, a = {}) => {
      let l;
      if ("string" != typeof e) return null;
      let o = e.trim();
      if (!o) return null;
      let s = (0, t.findChain)(o) ?? (0, t.findChain)(o.toLowerCase());
      return s &&
        ((l = s.slug), r.l.includes(l)) &&
        ("solana" !== s.slug || a.includeSolana) &&
        ("ton" !== s.slug || a.includeTon) &&
        ("starknet" !== s.slug || a.includeStarknet) &&
        ("near" !== s.slug || a.includeNear)
        ? {
            src: i[s.slug],
            name: (0, n.n)(s.caip2) ?? s.displayName,
            slug: s.slug,
          }
        : null;
    },
  ]);
};
