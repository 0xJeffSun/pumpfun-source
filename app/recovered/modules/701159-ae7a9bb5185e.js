// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(690877),
    r = e.i(606933),
    l = e.i(352386);
  e.i(12692);
  var i = e.i(398902),
    a = e.i(63289),
    n = e.i(464154),
    s = e.i(737384),
    o = e.i(408750),
    d = e.i(595673),
    u = e.i(198825);
  e.s([
    "f",
    0,
    function (e) {
      let {
          mint: c,
          calloutId: m,
          viewerAddress: p,
          surface: h,
          chain: f,
          recommendationId: g,
          recommendationRank: y,
          positionId: b,
        } = e,
        { t: v } = (0, i.f)(),
        w = (0, r.useQueryClient)(),
        x = (0, s.f)(),
        { setShowWallet: C } = (0, u.useConnectWallet)(),
        I = (0, t.useQuery)({
          queryKey: (0, n.B)(c, m ?? null),
          queryFn: ({ signal: e }) => {
            if (!m) throw Error("calloutId required");
            return (0, o.a)({ mint: c, calloutId: m, signal: e });
          },
          enabled: !1,
          retry: !1,
          structuralSharing: n.s,
        }),
        A = I.data,
        k = (0, l.useRef)(!1),
        _ = (0, l.useCallback)(() => {
          !m ||
            k.current ||
            (p
              ? ((k.current = !0),
                (async () => {
                  try {
                    let e = I.data;
                    if (
                      ((e &&
                        (e.hasCommunityThread ||
                          e.communityThreadConfirmedAbsent)) ||
                        (e = (await I.refetch()).data),
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
                    let t = w.getQueryData((0, n.B)(c, m)) ?? e,
                      r = !t.callout.likedByViewer;
                    try {
                      (await x.mutateAsync({
                        mint: c,
                        calloutId: e.callout.calloutId,
                        cacheCalloutId: m,
                        liked: r,
                      }),
                        (0, d.Ui)({
                          mint: c,
                          calloutId: e.callout.calloutId,
                          isLiked: r,
                          surface: h,
                          chain: f,
                          thesisText: t.callout.note ?? void 0,
                          recommendationId: g,
                          recommendationRank: y,
                          positionId: b,
                        }));
                    } catch {
                      a.c.error(v("web.callouts.like_update_failed"));
                    }
                  } finally {
                    k.current = !1;
                  }
                })())
              : C(!0));
        }, [m, c, p, h, f, g, y, b, C, x, I, w, v]);
      return {
        likeCount: A?.hasCommunityThread ? (A.callout.likeCount ?? 0) : null,
        isLiked: A?.callout.likedByViewer ?? !1,
        isBusy: x.isPending || I.isFetching,
        canLike: !!m,
        toggle: _,
      };
    },
  ]);
};
