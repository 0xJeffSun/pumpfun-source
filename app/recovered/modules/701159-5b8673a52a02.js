// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(690877),
    r = e.i(606933),
    i = e.i(352386);
  e.i(12692);
  var l = e.i(398902),
    a = e.i(63289),
    n = e.i(464154),
    o = e.i(737384),
    s = e.i(408750),
    c = e.i(595673),
    d = e.i(198825);
  e.s([
    "f",
    0,
    function (e) {
      let {
          mint: u,
          calloutId: m,
          viewerAddress: p,
          surface: h,
          chain: f,
          recommendationId: y,
          recommendationRank: b,
          positionId: v,
        } = e,
        { t: g } = (0, l.f)(),
        x = (0, r.useQueryClient)(),
        C = (0, o.f)(),
        { setShowWallet: k } = (0, d.useConnectWallet)(),
        w = (0, t.useQuery)({
          queryKey: (0, n.B)(u, m ?? null),
          queryFn: ({ signal: e }) => {
            if (!m) throw Error("calloutId required");
            return (0, s.a)({ mint: u, calloutId: m, signal: e });
          },
          enabled: !1,
          retry: !1,
          structuralSharing: n.s,
        }),
        S = w.data,
        _ = (0, i.useRef)(!1),
        P = (0, i.useCallback)(() => {
          !m ||
            _.current ||
            (p
              ? ((_.current = !0),
                (async () => {
                  try {
                    let e = w.data;
                    if (
                      ((e &&
                        (e.hasCommunityThread ||
                          e.communityThreadConfirmedAbsent)) ||
                        (e = (await w.refetch()).data),
                      !e)
                    )
                      return void a.c.error(
                        g("web.callouts.load_callout_failed"),
                      );
                    if (!e.hasCommunityThread)
                      return void (0, a.c)(
                        e.communityThreadConfirmedAbsent
                          ? g("web.callouts.likes_unavailable")
                          : g("web.callouts.likes_load_failed"),
                      );
                    let t = x.getQueryData((0, n.B)(u, m)) ?? e,
                      r = !t.callout.likedByViewer;
                    try {
                      (await C.mutateAsync({
                        mint: u,
                        calloutId: e.callout.calloutId,
                        cacheCalloutId: m,
                        liked: r,
                      }),
                        (0, c.Ui)({
                          mint: u,
                          calloutId: e.callout.calloutId,
                          isLiked: r,
                          surface: h,
                          chain: f,
                          thesisText: t.callout.note ?? void 0,
                          recommendationId: y,
                          recommendationRank: b,
                          positionId: v,
                        }));
                    } catch {
                      a.c.error(g("web.callouts.like_update_failed"));
                    }
                  } finally {
                    _.current = !1;
                  }
                })())
              : k(!0));
        }, [m, u, p, h, f, y, b, v, k, C, w, x, g]);
      return {
        likeCount: S?.hasCommunityThread ? (S.callout.likeCount ?? 0) : null,
        isLiked: S?.callout.likedByViewer ?? !1,
        isBusy: C.isPending || w.isFetching,
        canLike: !!m,
        toggle: P,
      };
    },
  ]);
};
