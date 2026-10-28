// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(690877),
    i = e.i(606933),
    a = e.i(352386);
  e.i(12692);
  var l = e.i(398902),
    r = e.i(63289),
    n = e.i(464154),
    o = e.i(737384),
    s = e.i(408750),
    d = e.i(595673),
    c = e.i(198825);
  e.s([
    "f",
    0,
    function (e) {
      let {
          mint: u,
          calloutId: m,
          viewerAddress: f,
          surface: p,
          chain: h,
          recommendationId: b,
          recommendationRank: y,
          positionId: x,
        } = e,
        { t: v } = (0, l.f)(),
        g = (0, i.useQueryClient)(),
        w = (0, o.f)(),
        { setShowWallet: k } = (0, c.useConnectWallet)(),
        C = (0, t.useQuery)({
          queryKey: (0, n.B)(u, m ?? null),
          queryFn: ({ signal: e }) => {
            if (!m) throw Error("calloutId required");
            return (0, s.a)({ mint: u, calloutId: m, signal: e });
          },
          enabled: !1,
          retry: !1,
          structuralSharing: n.s,
        }),
        N = C.data,
        j = (0, a.useRef)(!1),
        I = (0, a.useCallback)(() => {
          !m ||
            j.current ||
            (f
              ? ((j.current = !0),
                (async () => {
                  try {
                    let e = C.data;
                    if (
                      ((e &&
                        (e.hasCommunityThread ||
                          e.communityThreadConfirmedAbsent)) ||
                        (e = (await C.refetch()).data),
                      !e)
                    )
                      return void r.c.error(
                        v("web.callouts.load_callout_failed"),
                      );
                    if (!e.hasCommunityThread)
                      return void (0, r.c)(
                        e.communityThreadConfirmedAbsent
                          ? v("web.callouts.likes_unavailable")
                          : v("web.callouts.likes_load_failed"),
                      );
                    let t = g.getQueryData((0, n.B)(u, m)) ?? e,
                      i = !t.callout.likedByViewer;
                    try {
                      (await w.mutateAsync({
                        mint: u,
                        calloutId: e.callout.calloutId,
                        cacheCalloutId: m,
                        liked: i,
                      }),
                        (0, d.Ui)({
                          mint: u,
                          calloutId: e.callout.calloutId,
                          isLiked: i,
                          surface: p,
                          chain: h,
                          thesisText: t.callout.note ?? void 0,
                          recommendationId: b,
                          recommendationRank: y,
                          positionId: x,
                        }));
                    } catch {
                      r.c.error(v("web.callouts.like_update_failed"));
                    }
                  } finally {
                    j.current = !1;
                  }
                })())
              : k(!0));
        }, [m, u, f, p, h, b, y, x, k, w, C, g, v]);
      return {
        likeCount: N?.hasCommunityThread ? (N.callout.likeCount ?? 0) : null,
        isLiked: N?.callout.likedByViewer ?? !1,
        isBusy: w.isPending || C.isFetching,
        canLike: !!m,
        toggle: I,
      };
    },
  ]);
};
