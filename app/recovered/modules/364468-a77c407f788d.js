// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(690877),
    l = e.i(735821),
    i = e.i(621624),
    a = e.i(559015),
    n = e.i(154703),
    s = e.i(639374);
  let o = (e) => {
      let t = e.callout,
        r = t?.thesis?.trim();
      if (!t || !r || null === t.calloutId || !(0, s.f)(e.coinMint))
        return null;
      let l = (0, a.h)(e.followedHolders, e.username);
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
        ...(0, i.P)(t),
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
    u = [],
    c = (e) => {
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
          c({ includeFollowedHolders: r, period: "daily" }),
        );
      },
      "y",
      0,
      (e) => {
        let l,
          i,
          a,
          n,
          s,
          m,
          p,
          h = (0, t.c)(16);
        if (h[0] !== e) {
          let {
            enabled: t,
            includeFollowedHolders: n,
            period: s,
          } = void 0 === e ? {} : e;
          ((l = void 0 === t || t),
            (a = r.useQuery),
            (i = c({
              includeFollowedHolders: void 0 !== n && n,
              period: void 0 === s ? "daily" : s,
            })),
            (h[0] = e),
            (h[1] = l),
            (h[2] = i),
            (h[3] = a));
        } else ((l = h[1]), (i = h[2]), (a = h[3]));
        h[4] !== l || h[5] !== i
          ? ((n = { ...i, enabled: l, refetchOnWindowFocus: !0 }),
            (h[4] = l),
            (h[5] = i),
            (h[6] = n))
          : (n = h[6]);
        let f = a(n);
        if (h[7] !== f.data?.entries) {
          let e = new Set();
          for (let t of ((s = []), f.data?.entries ?? [])) {
            let r = o(t);
            !r || e.has(r.key) || (e.add(r.key), s.push(r));
          }
          ((h[7] = f.data?.entries), (h[8] = s));
        } else s = h[8];
        let g = s,
          y = l && f.isPending,
          b =
            f.isError && 0 === g.length ? "Could not load top callouts" : null;
        return (
          h[9] !== f
            ? ((m = () => void f.refetch()), (h[9] = f), (h[10] = m))
            : (m = h[10]),
          h[11] !== g || h[12] !== y || h[13] !== b || h[14] !== m
            ? ((p = {
                callouts: g,
                isLoadingHistory: y,
                error: b,
                pendingNewCount: 0,
                pendingPreview: u,
                showNewCallouts: d,
                hasNextPage: !1,
                isFetchingNextPage: !1,
                fetchNextPage: d,
                refetch: m,
              }),
              (h[11] = g),
              (h[12] = y),
              (h[13] = b),
              (h[14] = m),
              (h[15] = p))
            : (p = h[15]),
          p
        );
      },
    ],
    364468,
  );
};
