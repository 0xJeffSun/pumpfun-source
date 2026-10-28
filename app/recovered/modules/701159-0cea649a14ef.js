// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(690877),
    r = e.i(606933),
    l = e.i(352386);
  e.i(12692);
  var o = e.i(398902),
    i = e.i(63289),
    a = e.i(464154),
    n = e.i(737384),
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
          surface: b,
          chain: h,
          recommendationId: y,
          recommendationRank: f,
          positionId: g,
        } = e,
        { t: v } = (0, o.f)(),
        x = (0, r.useQueryClient)(),
        w = (0, n.f)(),
        { setShowWallet: C } = (0, d.useConnectWallet)(),
        k = (0, t.useQuery)({
          queryKey: (0, a.B)(u, m ?? null),
          queryFn: ({ signal: e }) => {
            if (!m) throw Error("calloutId required");
            return (0, s.a)({ mint: u, calloutId: m, signal: e });
          },
          enabled: !1,
          retry: !1,
          structuralSharing: a.s,
        }),
        S = k.data,
        N = (0, l.useRef)(!1),
        P = (0, l.useCallback)(() => {
          !m ||
            N.current ||
            (p
              ? ((N.current = !0),
                (async () => {
                  try {
                    let e = k.data;
                    if (
                      ((e &&
                        (e.hasCommunityThread ||
                          e.communityThreadConfirmedAbsent)) ||
                        (e = (await k.refetch()).data),
                      !e)
                    )
                      return void i.c.error(
                        v("web.callouts.load_callout_failed"),
                      );
                    if (!e.hasCommunityThread)
                      return void (0, i.c)(
                        e.communityThreadConfirmedAbsent
                          ? v("web.callouts.likes_unavailable")
                          : v("web.callouts.likes_load_failed"),
                      );
                    let t = x.getQueryData((0, a.B)(u, m)) ?? e,
                      r = !t.callout.likedByViewer;
                    try {
                      (await w.mutateAsync({
                        mint: u,
                        calloutId: e.callout.calloutId,
                        cacheCalloutId: m,
                        liked: r,
                      }),
                        (0, c.Ui)({
                          mint: u,
                          calloutId: e.callout.calloutId,
                          isLiked: r,
                          surface: b,
                          chain: h,
                          thesisText: t.callout.note ?? void 0,
                          recommendationId: y,
                          recommendationRank: f,
                          positionId: g,
                        }));
                    } catch {
                      i.c.error(v("web.callouts.like_update_failed"));
                    }
                  } finally {
                    N.current = !1;
                  }
                })())
              : C(!0));
        }, [m, u, p, b, h, y, f, g, C, w, k, x, v]);
      return {
        likeCount: S?.hasCommunityThread ? (S.callout.likeCount ?? 0) : null,
        isLiked: S?.callout.likedByViewer ?? !1,
        isBusy: w.isPending || k.isFetching,
        canLike: !!m,
        toggle: P,
      };
    },
  ]);
};
