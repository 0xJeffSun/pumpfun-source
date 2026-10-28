// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(357500),
    n = e.i(641947),
    r = e.i(646908),
    i = e.i(605587);
  let a = n.A ? "" : "?cluster=devnet",
    o = "https://nearblocks.io",
    s = "https://voyager.online",
    l = (e) => (0, r._)(e) || e === r.h,
    u = (e, t) => ("string" == typeof e && e.startsWith("0x")) || (0, i.g)(t),
    c = (e) => {
      if ("string" != typeof e) return null;
      let n = (0, t.findChainBySlug)(e.trim().toLowerCase());
      return n && null != n.evmChainId ? n.explorerUrl : null;
    },
    d = (e) => (0, r.L)(e) || e === r.z,
    f = (e, t) => {
      if (d(t)) return `https://tonviewer.com/${e}`;
      if ("near:mainnet" === t) return `${o}/address/${e}`;
      if (l(t)) return `${s}/contract/${e}`;
      let n = c(t);
      return n
        ? `${n}/address/${e}`
        : u(e, t)
          ? `${(0, i.m)(t)}/address/${e}`
          : `https://solscan.io/account/${e}${a}`;
    };
  e.s([
    "B",
    0,
    f,
    "z",
    0,
    (e, t) =>
      "near:mainnet" === t
        ? `${o}/tokens/${e}`
        : l(t)
          ? `${s}/token/${e}`
          : f(e, t),
    "X",
    0,
    (e, t) => {
      if (d(t)) return `https://tonviewer.com/transaction/${e}`;
      if ("near:mainnet" === t) return `${o}/txns/${e}`;
      if (l(t)) return `${s}/tx/${e}`;
      let n = c(t);
      return n
        ? `${n}/tx/${e}`
        : u(e, t)
          ? `${(0, i.m)(t)}/tx/${e}`
          : `https://solscan.io/tx/${e}${a}`;
    },
  ]);
};
