// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(690877),
    r = e.i(606933),
    i = e.i(352386);
  e.i(12692);
  var l = e.i(398902),
    n = e.i(63289),
    a = e.i(464154),
    s = e.i(737384),
    o = e.i(408750),
    d = e.i(595673),
    c = e.i(198825);
  e.s([
    "f",
    0,
    function (e) {
      let {
          mint: u,
          calloutId: m,
          viewerAddress: h,
          surface: f,
          chain: x,
          recommendationId: p,
          recommendationRank: y,
          positionId: v,
        } = e,
        { t: w } = (0, l.f)(),
        b = (0, r.useQueryClient)(),
        g = (0, s.f)(),
        { setShowWallet: j } = (0, c.useConnectWallet)(),
        _ = (0, t.useQuery)({
          queryKey: (0, a.B)(u, m ?? null),
          queryFn: ({ signal: e }) => {
            if (!m) throw Error("calloutId required");
            return (0, o.a)({ mint: u, calloutId: m, signal: e });
          },
          enabled: !1,
          retry: !1,
          structuralSharing: a.s,
        }),
        k = _.data,
        C = (0, i.useRef)(!1),
        N = (0, i.useCallback)(() => {
          !m ||
            C.current ||
            (h
              ? ((C.current = !0),
                (async () => {
                  try {
                    let e = _.data;
                    if (
                      ((e &&
                        (e.hasCommunityThread ||
                          e.communityThreadConfirmedAbsent)) ||
                        (e = (await _.refetch()).data),
                      !e)
                    )
                      return void n.c.error(
                        w("web.callouts.load_callout_failed"),
                      );
                    if (!e.hasCommunityThread)
                      return void (0, n.c)(
                        e.communityThreadConfirmedAbsent
                          ? w("web.callouts.likes_unavailable")
                          : w("web.callouts.likes_load_failed"),
                      );
                    let t = b.getQueryData((0, a.B)(u, m)) ?? e,
                      r = !t.callout.likedByViewer;
                    try {
                      (await g.mutateAsync({
                        mint: u,
                        calloutId: e.callout.calloutId,
                        cacheCalloutId: m,
                        liked: r,
                      }),
                        (0, d.Ui)({
                          mint: u,
                          calloutId: e.callout.calloutId,
                          isLiked: r,
                          surface: f,
                          chain: x,
                          thesisText: t.callout.note ?? void 0,
                          recommendationId: p,
                          recommendationRank: y,
                          positionId: v,
                        }));
                    } catch {
                      n.c.error(w("web.callouts.like_update_failed"));
                    }
                  } finally {
                    C.current = !1;
                  }
                })())
              : j(!0));
        }, [m, u, h, f, x, p, y, v, j, g, _, b, w]);
      return {
        likeCount: k?.hasCommunityThread ? (k.callout.likeCount ?? 0) : null,
        isLiked: k?.callout.likedByViewer ?? !1,
        isBusy: g.isPending || _.isFetching,
        canLike: !!m,
        toggle: N,
      };
    },
  ]);
};
