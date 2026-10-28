// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(867480),
    n = e.i(574472),
    i = e.i(516755),
    l = e.i(732486),
    a = e.i(453706),
    o = e.i(352386),
    s = e.i(266300),
    u = e.i(248208);
  let d = (0, a.default)(() => e.A(264808).then((e) => e.PrivyReader), {
    loadableGenerated: { modules: [748123] },
    ssr: !1,
  });
  function c() {
    let e,
      r,
      n,
      i = (0, t.c)(6),
      a = (0, o.useSyncExternalStore)(s.$, s.c, p),
      [c, f] = (0, o.useState)(null);
    i[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((e = (e) => f(e)), (i[0] = e))
      : (e = i[0]);
    let m = e;
    return (
      i[1] !== a
        ? ((r = a
            ? (0, l.jsx)(u.R, { children: (0, l.jsx)(d, { onChange: m }) })
            : null),
          (i[1] = a),
          (i[2] = r))
        : (r = i[2]),
      i[3] !== c || i[4] !== r
        ? ((n = { snapshot: c, reader: r }), (i[3] = c), (i[4] = r), (i[5] = n))
        : (n = i[5]),
      n
    );
  }
  function p() {
    return !1;
  }
  e.s(["f", 0, c], 880227);
  var f = e.i(952366),
    m = e.i(300898),
    g = e.i(779642);
  e.s(
    [
      "f",
      0,
      function () {
        let e,
          l,
          a,
          o,
          s = (0, t.c)(20),
          { address: u, shouldUsePrivy: d } = (0, n.F)(),
          { publicKey: p, wallet: h } = (0, i.P)(),
          { snapshot: y, reader: _ } = c(),
          { recentAuthMethod: v, recentAuthMethodReady: w } = (0, f.Z)(),
          b = y?.user ?? null;
        s[0] !== u || s[1] !== b
          ? ((e = !!u && !!b && (0, r.H)({ user: b, walletAddress: u })),
            (s[0] = u),
            (s[1] = b),
            (s[2] = e))
          : (e = s[2]);
        let k = e;
        s[3] !== k || s[4] !== b
          ? ((l = !!b && !k && (0, g.d)(b.id)),
            (s[3] = k),
            (s[4] = b),
            (s[5] = l))
          : (l = s[5]);
        let A = l;
        (y?.authenticated, y?.ready);
        let x = d || (!!y?.authenticated && !A),
          S = !!y?.ready;
        if (
          s[6] !== u ||
          s[7] !== k ||
          s[8] !== b ||
          s[9] !== p ||
          s[10] !== v ||
          s[11] !== w ||
          s[12] !== x ||
          s[13] !== S ||
          s[14] !== h
        )
          ((a = (0, m.a)({
            sessionAddress: u,
            privyAuthenticated: x,
            privySessionActive: k,
            privyReady: S,
            privyAuthAccounts: b ? (0, r.E)(b) : null,
            privyChains: b ? (0, r.d)(b) : null,
            adapterAddress: p?.toBase58() ?? null,
            ...(h?.adapter.name ? { adapterName: h.adapter.name } : {}),
            ...(h?.adapter.icon ? { adapterIcon: h.adapter.icon } : {}),
            rememberedWalletName: v?.kind === "wallet" ? v.name : null,
            rememberedProvider: v
              ? "email" === v.kind
                ? "email"
                : "oauth" === v.kind
                  ? v.provider
                  : null
              : null,
            storageRead: w,
          })),
            (s[6] = u),
            (s[7] = k),
            (s[8] = b),
            (s[9] = p),
            (s[10] = v),
            (s[11] = w),
            (s[12] = x),
            (s[13] = S),
            (s[14] = h),
            (s[15] = a));
        else a = s[15];
        let E = a;
        return (
          s[16] !== E || s[17] !== k || s[18] !== _
            ? ((o = { method: E, reader: _, ownsSessionWallet: k }),
              (s[16] = E),
              (s[17] = k),
              (s[18] = _),
              (s[19] = o))
            : (o = s[19]),
          o
        );
      },
    ],
    21384,
  );
};
