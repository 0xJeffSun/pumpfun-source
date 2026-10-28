// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(944410),
    n = e.i(761459),
    i = e.i(38279),
    s = e.i(146742),
    a = e.i(314197),
    o = e.i(711902),
    l = e.i(310717);
  function u(e) {
    return e.nextCursor ?? void 0;
  }
  e.s([
    "f",
    0,
    (e) => {
      let d,
        c,
        f = (0, t.c)(28),
        {
          q: m,
          creatorAddress: p,
          coinAddress: w,
          rewardMints: g,
          status: b,
          phase: h,
          expiresAtGte: v,
          expiresAtLte: y,
          rewardTotalUsdGte: x,
          rewardTotalUsdLte: S,
          likeCountGte: N,
          submissionCountGte: E,
          creatorXFollowerCountGte: j,
          includeBanned: I,
          sort: R,
          order: A,
          lat: _,
          lng: L,
          radiusKm: T,
          limit: O,
          facets: D,
          enabled: M,
        } = void 0 === e ? {} : e,
        P = void 0 === O ? 24 : O,
        k = void 0 === M || M,
        U = (0, r.useLivestreamApiClient)(),
        C = (0, a.f)(),
        F = (0, s.G)(R, C),
        B = C ? j : void 0,
        G = (0, l.f)(m),
        $ =
          null != _ &&
          null != L &&
          null != T &&
          Number.isFinite(_) &&
          Number.isFinite(L) &&
          Number.isFinite(T),
        K = i.Q.BOUNTY_PUBLIC_LIST_V2_INFINITE({
          q: G,
          creatorAddress: p,
          coinAddress: w,
          rewardMints: g,
          status: b,
          phase: h,
          sort: F,
          order: A,
          limit: P,
          expiresAtGte: v,
          expiresAtLte: y,
          rewardTotalUsdGte: x,
          rewardTotalUsdLte: S,
          likeCountGte: N,
          submissionCountGte: E,
          creatorXFollowerCountGte: B,
          includeBanned: I,
          facets: D,
          ...($ ? { lat: _, lng: L, radiusKm: T } : {}),
        });
      return (
        f[0] !== U ||
        f[1] !== G ||
        f[2] !== w ||
        f[3] !== p ||
        f[4] !== B ||
        f[5] !== v ||
        f[6] !== y ||
        f[7] !== D ||
        f[8] !== $ ||
        f[9] !== I ||
        f[10] !== _ ||
        f[11] !== N ||
        f[12] !== P ||
        f[13] !== L ||
        f[14] !== A ||
        f[15] !== h ||
        f[16] !== T ||
        f[17] !== g ||
        f[18] !== x ||
        f[19] !== S ||
        f[20] !== F ||
        f[21] !== b ||
        f[22] !== E
          ? ((d = async (e) => {
              let { pageParam: t } = e,
                r = {};
              (G && G.length > 0 && (r.q = G),
                p && (r.creatorAddress = p),
                w && (r.coinAddress = w),
                g && g.length > 0 && (r.rewardMints = g.join(",")),
                b && (r.status = b),
                h && (r.phase = h),
                v && (r.expiresAtGte = v),
                y && (r.expiresAtLte = y),
                null != x && (r.rewardTotalUsdGte = String(x)),
                null != S && (r.rewardTotalUsdLte = String(S)),
                null != N && (r.likeCountGte = String(N)),
                null != E && (r.submissionCountGte = String(E)),
                null != B && (r.creatorXFollowerCountGte = String(B)),
                I && (r.includeBanned = "true"),
                F && (r.sort = F),
                A && (r.order = A),
                $ &&
                  ((r.lat = String(_)),
                  (r.lng = String(L)),
                  (r.radiusKm = String(T))),
                (r.limit = String(P)),
                D && null == t && (r.facets = "true"),
                null != t && "" !== t && (r.cursor = t));
              let n = await U.get("bounties/v2/tasks", {
                searchParams: r,
              }).json();
              return o.L.parse(n);
            }),
            (f[0] = U),
            (f[1] = G),
            (f[2] = w),
            (f[3] = p),
            (f[4] = B),
            (f[5] = v),
            (f[6] = y),
            (f[7] = D),
            (f[8] = $),
            (f[9] = I),
            (f[10] = _),
            (f[11] = N),
            (f[12] = P),
            (f[13] = L),
            (f[14] = A),
            (f[15] = h),
            (f[16] = T),
            (f[17] = g),
            (f[18] = x),
            (f[19] = S),
            (f[20] = F),
            (f[21] = b),
            (f[22] = E),
            (f[23] = d))
          : (d = f[23]),
        f[24] !== k || f[25] !== K || f[26] !== d
          ? ((c = {
              enabled: k,
              queryKey: K,
              initialPageParam: void 0,
              queryFn: d,
              getNextPageParam: u,
            }),
            (f[24] = k),
            (f[25] = K),
            (f[26] = d),
            (f[27] = c))
          : (c = f[27]),
        (0, n.useInfiniteQuery)(c)
      );
    },
  ]);
};
