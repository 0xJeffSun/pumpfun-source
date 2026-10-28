// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    l = e.i(78436),
    n = e.i(733089);
  let i = (e, t) => {
    let l = e;
    for (let [n, i] of Object.entries(t)) {
      let t = e[n];
      void 0 === t || i in l || (l === e && (l = { ...e }), (l[i] = t));
    }
    return l;
  };
  e.s(["f", 0, i], 79386);
  let a = {},
    r = [],
    s = (e, t, l, n, i, a) =>
      l === a &&
      (t === i || (t.length === i.length && t.every((e, t) => e === i[t]))) &&
      ((e, t) => {
        if (e === t) return !0;
        let l = Object.keys(e);
        return (
          l.length === Object.keys(t).length && l.every((l) => e[l] === t[l])
        );
      })(e, n),
    o = (e) => ({
      mint: e,
      viewerIdentity: null,
      devIdentity: null,
      kolByWallet: a,
      kolWallets: r,
      followingByWallet: a,
      followingWallets: r,
      verifiedByWallet: a,
      verifiedWallets: r,
      trackedByWallet: a,
      evmAddressByWallet: a,
      loading: { kol: !1, following: !1, verified: !1, mapping: !1 },
    }),
    d = (0, l.$)()((e) => ({
      ...o(null),
      initForMint: (t) => e((e) => (e.mint === t ? e : o(t))),
      setViewer: (t) =>
        e((e) => (e.viewerIdentity === t ? e : { viewerIdentity: t })),
      setDev: (t) => e((e) => (e.devIdentity === t ? e : { devIdentity: t })),
      setKol: ({ byWallet: t, wallets: l, loading: n }) =>
        e((e) =>
          s(e.kolByWallet, e.kolWallets, e.loading.kol, t, l, n)
            ? e
            : {
                kolByWallet: t,
                kolWallets: l,
                loading: { ...e.loading, kol: n },
              },
        ),
      setFollowing: ({ byWallet: t, wallets: l, loading: n }) =>
        e((e) =>
          s(
            e.followingByWallet,
            e.followingWallets,
            e.loading.following,
            t,
            l,
            n,
          )
            ? e
            : {
                followingByWallet: t,
                followingWallets: l,
                loading: { ...e.loading, following: n },
              },
        ),
      setVerified: ({ byWallet: t, wallets: l, loading: n }) =>
        e((e) =>
          s(e.verifiedByWallet, e.verifiedWallets, e.loading.verified, t, l, n)
            ? e
            : {
                verifiedByWallet: t,
                verifiedWallets: l,
                loading: { ...e.loading, verified: n },
              },
        ),
      setTracked: (t) =>
        e(() => {
          let e = {};
          for (let l of t)
            l.trackedWalletAddress && (e[l.trackedWalletAddress] = l);
          return { trackedByWallet: e };
        }),
      setEvmAliases: ({ evmAddressByWallet: t, loading: l }) =>
        e((e) => ({
          evmAddressByWallet: t,
          loading: { ...e.loading, mapping: l },
        })),
    })),
    u = (e) => {
      let t = {};
      for (let l of Object.keys(e)) t[(0, n.P)(l)] = !0;
      return t;
    },
    c = (e) => {
      let t = e.evmAddressByWallet,
        l = i(e.kolByWallet, t),
        a = i(e.followingByWallet, t),
        r = i(e.verifiedByWallet, t),
        s = i(e.trackedByWallet, t),
        o = e.viewerIdentity ? (t[e.viewerIdentity] ?? e.viewerIdentity) : null,
        d = e.devIdentity ? (t[e.devIdentity] ?? e.devIdentity) : null,
        c = {},
        m = (e) => {
          for (let [t, l] of Object.entries(e))
            (l.username || l.profileImage) &&
              (c[t] = {
                ...c[t],
                username: l.username ?? c[t]?.username,
                profileImage: l.profileImage ?? c[t]?.profileImage,
              });
        };
      (m(r), m(a));
      let f = u(a),
        p = u(r),
        h = u(s),
        g = o ? (0, n.P)(o) : null,
        x = e.viewerIdentity ? (0, n.P)(e.viewerIdentity) : null,
        b = d ? (0, n.P)(d) : null,
        y = e.devIdentity ? (0, n.P)(e.devIdentity) : null;
      return {
        mint: e.mint,
        viewerActor: o,
        devActor: d,
        kolByWallet: l,
        kolWallets: e.kolWallets,
        followingByWallet: a,
        followingWallets: e.followingWallets,
        verifiedByWallet: r,
        verifiedWallets: e.verifiedWallets,
        trackedByWallet: s,
        identityByWallet: c,
        evmAddressByWallet: t,
        loading: e.loading,
        classify: (e) => {
          if (!e) return [];
          let t = (0, n.P)(e),
            l = [];
          return (
            (t === g || t === x) && l.push("you"),
            (t === b || t === y) && l.push("dev"),
            h[t] && l.push("tracked"),
            f[t] && l.push("following"),
            p[t] && l.push("verified"),
            (0, n.O)(l)
          );
        },
        identityOf: (e) => (e ? (c[e] ?? c[(0, n.P)(e)] ?? null) : null),
      };
    },
    m = c(o(null));
  e.s(
    [
      "Z",
      0,
      (e) => {
        let l = d();
        return (0, t.useMemo)(() => (l.mint === e ? c(l) : m), [l, e]);
      },
      "M",
      0,
      d,
    ],
    793121,
  );
};
