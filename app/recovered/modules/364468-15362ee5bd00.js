// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(690877),
    l = e.i(735821),
    a = e.i(621624),
    i = e.i(559015),
    n = e.i(154703),
    s = e.i(639374);
  let o = (e) => {
      let t = e.callout,
        r = t?.thesis?.trim();
      if (!t || !r || null === t.calloutId || !(0, s.f)(e.coinMint))
        return null;
      let l = (0, i.h)(e.followedHolders, e.username);
      return {
        key: `cid:${t.calloutId}`,
        calloutId: t.calloutId,
        coinMint: e.coinMint,
        userId: e.walletAddress,
        multiple: t.multiple ?? 0,
        marketCapUsd: t.calledOutAtMcap ?? void 0,
        createdAt: (0, n.l)(t.calloutTimestamp),
        username: e.username || void 0,
        xUsername: e.xUsername ?? void 0,
        profileImage: e.profileImage ?? void 0,
        note: r,
        ...(t.mediaUrl ? { mediaUrl: t.mediaUrl } : {}),
        ...(0, a.P)(t),
        updates: (0, n.v)({
          updates: t.updates,
          mint: e.coinMint,
          calloutId: t.calloutId,
        }),
        updateCount: (0, n.s)({
          updates: t.updates,
          updateCount: t.updateCount,
        }),
        ...(l?.holders.length ? { followedHolders: l } : {}),
        isViewer: e.isViewer,
        viewerFollows: e.viewerFollows,
      };
    },
    d = () => {},
    c = [],
    u = (e) => {
      let { includeFollowedHolders: t, period: r } = e;
      return {
        queryKey: ["callouts", "top-feed", r, t],
        queryFn: ({ signal: e }) =>
          (0, l.F)({ period: r, includeFollowedHolders: t, signal: e }),
        staleTime: 3e5,
        retry: 3,
      };
    };
  e.s(
    [
      "H",
      0,
      (e, t = {}) => {
        let { includeFollowedHolders: r = !1 } = t;
        return e.prefetchQuery(
          u({ includeFollowedHolders: r, period: "daily" }),
        );
      },
      "y",
      0,
      (e) => {
        let l,
          a,
          i,
          n,
          s,
          m,
          f,
          p = (0, t.c)(16);
        if (p[0] !== e) {
          let {
            enabled: t,
            includeFollowedHolders: n,
            period: s,
          } = void 0 === e ? {} : e;
          ((l = void 0 === t || t),
            (i = r.useQuery),
            (a = u({
              includeFollowedHolders: void 0 !== n && n,
              period: void 0 === s ? "daily" : s,
            })),
            (p[0] = e),
            (p[1] = l),
            (p[2] = a),
            (p[3] = i));
        } else ((l = p[1]), (a = p[2]), (i = p[3]));
        p[4] !== l || p[5] !== a
          ? ((n = { ...a, enabled: l, refetchOnWindowFocus: !0 }),
            (p[4] = l),
            (p[5] = a),
            (p[6] = n))
          : (n = p[6]);
        let h = i(n);
        if (p[7] !== h.data?.entries) {
          let e = new Set();
          for (let t of ((s = []), h.data?.entries ?? [])) {
            let r = o(t);
            !r || e.has(r.key) || (e.add(r.key), s.push(r));
          }
          ((p[7] = h.data?.entries), (p[8] = s));
        } else s = p[8];
        let v = s,
          b = l && h.isPending,
          g =
            h.isError && 0 === v.length ? "Could not load top callouts" : null;
        return (
          p[9] !== h
            ? ((m = () => void h.refetch()), (p[9] = h), (p[10] = m))
            : (m = p[10]),
          p[11] !== v || p[12] !== b || p[13] !== g || p[14] !== m
            ? ((f = {
                callouts: v,
                isLoadingHistory: b,
                error: g,
                pendingNewCount: 0,
                pendingPreview: c,
                showNewCallouts: d,
                hasNextPage: !1,
                isFetchingNextPage: !1,
                fetchNextPage: d,
                refetch: m,
              }),
              (p[11] = v),
              (p[12] = b),
              (p[13] = g),
              (p[14] = m),
              (p[15] = f))
            : (f = p[15]),
          f
        );
      },
    ],
    364468,
  );
};
