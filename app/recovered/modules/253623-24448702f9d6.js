// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(541710),
    r = e.i(646908);
  let i = [
      "ethereum",
      "base",
      "bsc",
      "hyperevm",
      "monad",
      "ink",
      "robinhood",
      "arc",
      "megaeth",
      "xlayer",
      "polygon",
      "arbitrum",
    ],
    l = (e, t) =>
      "wallet" === e.type &&
      "privy" === e.walletClientType &&
      e.chainType === t &&
      "address" in e &&
      "string" == typeof e.address,
    o = (e) =>
      (e?.linkedAccounts ?? [])
        .filter((e) => l(e, "ethereum"))
        .map((e) => e.address),
    n = (e, t) =>
      (e?.linkedAccounts ?? []).some((e) => l(e, "solana") && e.address === t),
    s = (e, t) => e.toLowerCase() === t.toLowerCase(),
    a = /^[0-9a-f]{64}$/,
    c = (e) => `${e.slice(0, 6)}...${e.slice(-4)}`,
    d = /^[0-9a-f]{64}$/,
    u = /^0x[0-9a-f]{40}$/;
  e.s([
    "C",
    0,
    (e) => {
      let l = (({
          solanaAddress: e,
          mappedEvmAddress: r,
          privyUser: l,
          connection: a,
          exposure: c,
        }) => {
          if (!e) return [];
          let d = n(l, e),
            u = [
              {
                id: `solana:${e}`,
                kind: "solana",
                chainSlug: "solana",
                address: e,
                externalWalletName:
                  "external" === a.kind ? (a.walletName ?? null) : null,
                exportable: d,
              },
            ];
          if (void 0 === r) return u;
          let f = d ? o(l) : [],
            p = r ?? f[0] ?? null;
          if (null === p) return u;
          let m = f.find((e) => s(e, p)) ?? null,
            h = m ?? p;
          for (let e of i.filter((e) => (0, t.F)(e, c)))
            u.push({
              id: `${e}:${h.toLowerCase()}`,
              kind: "evm",
              chainSlug: e,
              address: h,
              externalWalletName: null,
              exportable: null !== m,
            });
          for (let e of f)
            s(e, h) ||
              u.push({
                id: `evm:${e.toLowerCase()}`,
                kind: "evm",
                chainSlug: "evm",
                address: e,
                externalWalletName: null,
                exportable: !0,
              });
          return u;
        })(e),
        { tonAddress: a, exposure: c } = e;
      return 0 !== l.length && a && (0, t.F)(r.z, c)
        ? [
            ...l,
            {
              id: `ton:${a}`,
              kind: "ton",
              chainSlug: r.z,
              address: a,
              externalWalletName: null,
              exportable: !1,
            },
          ]
        : l;
    },
    "D",
    0,
    (e) =>
      "string" == typeof e && (0, r.R)(e) && (e.includes(".") || a.test(e)),
    "M",
    0,
    o,
    "t",
    0,
    n,
    "J",
    0,
    c,
    "j",
    0,
    (e, t, i = c) =>
      (0, r._)(t)
        ? (0, r.f)(e)
        : (0, r.B)(t)
          ? d.test(e)
            ? `${e.slice(0, 4)}…${e.slice(-4)}`
            : u.test(e)
              ? `${e.slice(0, 6)}…${e.slice(-4)}`
              : e
          : i(e),
  ]);
};
