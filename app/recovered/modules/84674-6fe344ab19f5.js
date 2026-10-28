// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(357500),
    n = e.i(641947),
    r = e.i(646908),
    i = e.i(605587);
  let l = n.A ? "" : "?cluster=devnet",
    a = "https://nearblocks.io",
    s = "https://voyager.online",
    o = (e) => (0, r._)(e) || e === r.h,
    u = (e, t) => ("string" == typeof e && e.startsWith("0x")) || (0, i.g)(t),
    c = (e) => {
      if ("string" != typeof e) return null;
      let n = (0, t.findChainBySlug)(e.trim().toLowerCase());
      return n && null != n.evmChainId ? n.explorerUrl : null;
    },
    d = (e) => (0, r.L)(e) || e === r.z,
    m = (e, t) => {
      if (d(t)) return `https://tonviewer.com/${e}`;
      if ("near:mainnet" === t) return `${a}/address/${e}`;
      if (o(t)) return `${s}/contract/${e}`;
      let n = c(t);
      return n
        ? `${n}/address/${e}`
        : u(e, t)
          ? `${(0, i.m)(t)}/address/${e}`
          : `https://solscan.io/account/${e}${l}`;
    };
  e.s([
    "B",
    0,
    m,
    "z",
    0,
    (e, t) =>
      "near:mainnet" === t
        ? `${a}/tokens/${e}`
        : o(t)
          ? `${s}/token/${e}`
          : m(e, t),
    "X",
    0,
    (e, t) => {
      if (d(t)) return `https://tonviewer.com/transaction/${e}`;
      if ("near:mainnet" === t) return `${a}/txns/${e}`;
      if (o(t)) return `${s}/tx/${e}`;
      let n = c(t);
      return n
        ? `${n}/tx/${e}`
        : u(e, t)
          ? `${(0, i.m)(t)}/tx/${e}`
          : `https://solscan.io/tx/${e}${l}`;
    },
  ]);
};
