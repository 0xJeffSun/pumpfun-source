// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(690877),
    i = e.i(606933),
    l = e.i(352386);
  e.i(12692);
  var r = e.i(398902),
    a = e.i(63289),
    n = e.i(464154),
    o = e.i(968185),
    s = e.i(408750),
    d = e.i(164289),
    u = e.i(198825);
  e.s([
    "f",
    0,
    function (e) {
      let { mint: c, calloutId: m, viewerAddress: p } = e,
        { t: f } = (0, r.f)(),
        I = (0, i.useQueryClient)(),
        h = (0, o.f)(),
        { setShowWallet: y } = (0, u.useConnectWallet)(),
        g = (0, t.useQuery)({
          queryKey: (0, n.B)(c, m ?? null),
          queryFn: ({ signal: e }) => {
            if (!m) throw Error("calloutId required");
            return (0, s.a)({ mint: c, calloutId: m, signal: e });
          },
          enabled: !1,
          retry: !1,
          structuralSharing: n.s,
        }),
        x = g.data,
        v = (0, l.useRef)(!1),
        b = (0, l.useCallback)(async () => {
          let e = g.data;
          return ((e &&
            (e.hasCommunityThread || e.communityThreadConfirmedAbsent)) ||
            (e = (await g.refetch()).data),
          e)
            ? e.hasCommunityThread
              ? e
              : ((0, a.c)(
                  e.communityThreadConfirmedAbsent
                    ? f("web.callouts.reposts_unavailable")
                    : f("web.callouts.reposts_load_failed"),
                ),
                null)
            : (a.c.error(f("web.callouts.load_callout_failed")), null);
        }, [g, f]),
        C = (0, l.useCallback)(() => {
          !m ||
            v.current ||
            (p
              ? ((v.current = !0),
                (async () => {
                  try {
                    let e = await b();
                    if (!e) return;
                    let t = I.getQueryData((0, n.B)(c, m)) ?? e;
                    try {
                      await h.mutateAsync({
                        mint: c,
                        calloutId: e.callout.calloutId,
                        cacheCalloutId: m,
                        reposted: !t.callout.repostedByViewer,
                      });
                    } catch (e) {
                      a.c.error(f((0, d.Q)(e)));
                    }
                  } finally {
                    v.current = !1;
                  }
                })())
              : y(!0));
        }, [m, c, p, y, h, b, I, f]),
        w = (0, l.useCallback)(async () => {
          if (!m) return null;
          let e = await b();
          return e?.callout.calloutId ?? null;
        }, [m, b]);
      return {
        repostCount: x?.hasCommunityThread
          ? (x.callout.repostCount ?? 0)
          : null,
        isReposted: x?.callout.repostedByViewer ?? !1,
        isBusy: h.isPending || g.isFetching,
        canRepost: !!m,
        toggle: C,
        resolveQuoteTarget: w,
      };
    },
  ]);
};
