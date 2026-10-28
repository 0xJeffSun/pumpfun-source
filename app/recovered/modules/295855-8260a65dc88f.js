// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(322315),
    n = e.i(254010),
    s = e.i(574472),
    l = e.i(3771),
    r = e.i(541710),
    a = e.i(605587),
    o = e.i(639374);
  let u = (e) => {
    let u,
      d,
      c,
      m = (0, t.c)(21),
      { mint: _, chainId: h } = e,
      g = (0, n.k)(i.D.WEB_BLOCKCHAIN_LIMIT_ORDERS, !1),
      { address: p, shouldUsePrivy: b, userId: f } = (0, s.F)(),
      z = (0, r.l)();
    m[0] !== h || m[1] !== _
      ? ((u = (({ mint: e, chainId: t }) =>
          e
            ? (0, o.f)(e)
              ? "solana"
              : (0, a.N)({ mint: e, chainId: t })
                ? "evm"
                : null
            : null)({ mint: _, chainId: h })),
        (m[0] = h),
        (m[1] = _),
        (m[2] = u))
      : (u = m[2]);
    let w = u;
    if (!g) {
      let e;
      return (
        m[3] !== w
          ? ((e = { state: "flag_off", chain: w }), (m[3] = w), (m[4] = e))
          : (e = m[4]),
        e
      );
    }
    if (null === w) {
      let e;
      return (
        m[5] !== w
          ? ((e = { state: "unsupported_chain", chain: w }),
            (m[5] = w),
            (m[6] = e))
          : (e = m[6]),
        e
      );
    }
    if ("solana" === w) {
      let e;
      if (!p) {
        let e;
        return (
          m[7] !== w
            ? ((e = { state: "signed_out", chain: w }), (m[7] = w), (m[8] = e))
            : (e = m[8]),
          e
        );
      }
      return (
        m[9] !== w
          ? ((e = { state: "enabled", chain: w }), (m[9] = w), (m[10] = e))
          : (e = m[10]),
        e
      );
    }
    if (
      !(0, l.f)(
        null !== (c = (0, a.w)(h)) && /^\d+$/.test(c) ? Number(c) : null,
        z,
      )
    ) {
      let e;
      return (
        m[11] !== w
          ? ((e = { state: "unsupported_chain", chain: w }),
            (m[11] = w),
            (m[12] = e))
          : (e = m[12]),
        e
      );
    }
    if (!p) {
      let e;
      return (
        m[13] !== w
          ? ((e = { state: "signed_out", chain: w }), (m[13] = w), (m[14] = e))
          : (e = m[14]),
        e
      );
    }
    if (!b) {
      let e;
      return (
        m[15] !== w
          ? ((e = { state: "needs_privy", chain: w }), (m[15] = w), (m[16] = e))
          : (e = m[16]),
        e
      );
    }
    if (!f) {
      let e;
      return (
        m[17] !== w
          ? ((e = { state: "needs_user_id", chain: w }),
            (m[17] = w),
            (m[18] = e))
          : (e = m[18]),
        e
      );
    }
    return (
      m[19] !== w
        ? ((d = { state: "enabled", chain: w }), (m[19] = w), (m[20] = d))
        : (d = m[20]),
      d
    );
  };
  e.s([
    "n",
    0,
    (e) => {
      let i,
        n = (0, t.c)(2);
      n[0] !== e ? ((i = { mint: e }), (n[0] = e), (n[1] = i)) : (i = n[1]);
      let s = u(i);
      return "solana" === s.chain && "enabled" === s.state;
    },
    "H",
    0,
    u,
  ]);
};
