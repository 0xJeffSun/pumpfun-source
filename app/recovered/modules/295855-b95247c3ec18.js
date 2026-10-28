// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(322315),
    r = e.i(254010),
    i = e.i(574472),
    a = e.i(3771),
    o = e.i(541710),
    l = e.i(605587),
    s = e.i(639374);
  let u = (e) => {
    let u,
      d,
      c,
      f = (0, t.c)(21),
      { mint: h, chainId: m } = e,
      g = (0, r.k)(n.D.WEB_BLOCKCHAIN_LIMIT_ORDERS, !1),
      { address: p, shouldUsePrivy: b, userId: w } = (0, i.F)(),
      _ = (0, o.l)();
    f[0] !== m || f[1] !== h
      ? ((u = (({ mint: e, chainId: t }) =>
          e
            ? (0, s.f)(e)
              ? "solana"
              : (0, l.N)({ mint: e, chainId: t })
                ? "evm"
                : null
            : null)({ mint: h, chainId: m })),
        (f[0] = m),
        (f[1] = h),
        (f[2] = u))
      : (u = f[2]);
    let y = u;
    if (!g) {
      let e;
      return (
        f[3] !== y
          ? ((e = { state: "flag_off", chain: y }), (f[3] = y), (f[4] = e))
          : (e = f[4]),
        e
      );
    }
    if (null === y) {
      let e;
      return (
        f[5] !== y
          ? ((e = { state: "unsupported_chain", chain: y }),
            (f[5] = y),
            (f[6] = e))
          : (e = f[6]),
        e
      );
    }
    if ("solana" === y) {
      let e;
      if (!p) {
        let e;
        return (
          f[7] !== y
            ? ((e = { state: "signed_out", chain: y }), (f[7] = y), (f[8] = e))
            : (e = f[8]),
          e
        );
      }
      return (
        f[9] !== y
          ? ((e = { state: "enabled", chain: y }), (f[9] = y), (f[10] = e))
          : (e = f[10]),
        e
      );
    }
    if (
      !(0, a.f)(
        null !== (c = (0, l.w)(m)) && /^\d+$/.test(c) ? Number(c) : null,
        _,
      )
    ) {
      let e;
      return (
        f[11] !== y
          ? ((e = { state: "unsupported_chain", chain: y }),
            (f[11] = y),
            (f[12] = e))
          : (e = f[12]),
        e
      );
    }
    if (!p) {
      let e;
      return (
        f[13] !== y
          ? ((e = { state: "signed_out", chain: y }), (f[13] = y), (f[14] = e))
          : (e = f[14]),
        e
      );
    }
    if (!b) {
      let e;
      return (
        f[15] !== y
          ? ((e = { state: "needs_privy", chain: y }), (f[15] = y), (f[16] = e))
          : (e = f[16]),
        e
      );
    }
    if (!w) {
      let e;
      return (
        f[17] !== y
          ? ((e = { state: "needs_user_id", chain: y }),
            (f[17] = y),
            (f[18] = e))
          : (e = f[18]),
        e
      );
    }
    return (
      f[19] !== y
        ? ((d = { state: "enabled", chain: y }), (f[19] = y), (f[20] = d))
        : (d = f[20]),
      d
    );
  };
  e.s([
    "n",
    0,
    (e) => {
      let n,
        r = (0, t.c)(2);
      r[0] !== e ? ((n = { mint: e }), (r[0] = e), (r[1] = n)) : (n = r[1]);
      let i = u(n);
      return "solana" === i.chain && "enabled" === i.state;
    },
    "H",
    0,
    u,
  ]);
};
