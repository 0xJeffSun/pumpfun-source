// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(690877),
    i = e.i(606933),
    l = e.i(352386);
  e.i(12692);
  var r = e.i(398902),
    a = e.i(63289),
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
          surface: y,
          chain: h,
          recommendationId: p,
          recommendationRank: x,
          positionId: b,
        } = e,
        { t: v } = (0, r.f)(),
        g = (0, i.useQueryClient)(),
        C = (0, o.f)(),
        { setShowWallet: w } = (0, c.useConnectWallet)(),
        k = (0, t.useQuery)({
          queryKey: (0, n.B)(u, m ?? null),
          queryFn: ({ signal: e }) => {
            if (!m) throw Error("calloutId required");
            return (0, s.a)({ mint: u, calloutId: m, signal: e });
          },
          enabled: !1,
          retry: !1,
          structuralSharing: n.s,
        }),
        _ = k.data,
        j = (0, l.useRef)(!1),
        A = (0, l.useCallback)(() => {
          !m ||
            j.current ||
            (f
              ? ((j.current = !0),
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
                      return void a.c.error(
                        v("web.callouts.load_callout_failed"),
                      );
                    if (!e.hasCommunityThread)
                      return void (0, a.c)(
                        e.communityThreadConfirmedAbsent
                          ? v("web.callouts.likes_unavailable")
                          : v("web.callouts.likes_load_failed"),
                      );
                    let t = g.getQueryData((0, n.B)(u, m)) ?? e,
                      i = !t.callout.likedByViewer;
                    try {
                      (await C.mutateAsync({
                        mint: u,
                        calloutId: e.callout.calloutId,
                        cacheCalloutId: m,
                        liked: i,
                      }),
                        (0, d.Ui)({
                          mint: u,
                          calloutId: e.callout.calloutId,
                          isLiked: i,
                          surface: y,
                          chain: h,
                          thesisText: t.callout.note ?? void 0,
                          recommendationId: p,
                          recommendationRank: x,
                          positionId: b,
                        }));
                    } catch {
                      a.c.error(v("web.callouts.like_update_failed"));
                    }
                  } finally {
                    j.current = !1;
                  }
                })())
              : w(!0));
        }, [m, u, f, y, h, p, x, b, w, C, k, g, v]);
      return {
        likeCount: _?.hasCommunityThread ? (_.callout.likeCount ?? 0) : null,
        isLiked: _?.callout.likedByViewer ?? !1,
        isBusy: C.isPending || k.isFetching,
        canLike: !!m,
        toggle: A,
      };
    },
  ]);
};
