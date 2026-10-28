// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(690877),
    i = e.i(606933),
    l = e.i(352386);
  e.i(12692);
  var r = e.i(398902),
    a = e.i(63289),
    o = e.i(464154),
    n = e.i(968185),
    s = e.i(408750),
    d = e.i(164289),
    c = e.i(198825);
  e.s([
    "f",
    0,
    function (e) {
      let { mint: u, calloutId: m, viewerAddress: p } = e,
        { t: f } = (0, r.f)(),
        h = (0, i.useQueryClient)(),
        I = (0, n.f)(),
        { setShowWallet: x } = (0, c.useConnectWallet)(),
        y = (0, t.useQuery)({
          queryKey: (0, o.B)(u, m ?? null),
          queryFn: ({ signal: e }) => {
            if (!m) throw Error("calloutId required");
            return (0, s.a)({ mint: u, calloutId: m, signal: e });
          },
          enabled: !1,
          retry: !1,
          structuralSharing: o.s,
        }),
        b = y.data,
        g = (0, l.useRef)(!1),
        v = (0, l.useCallback)(async () => {
          let e = y.data;
          return ((e &&
            (e.hasCommunityThread || e.communityThreadConfirmedAbsent)) ||
            (e = (await y.refetch()).data),
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
        }, [y, f]),
        C = (0, l.useCallback)(() => {
          !m ||
            g.current ||
            (p
              ? ((g.current = !0),
                (async () => {
                  try {
                    let e = await v();
                    if (!e) return;
                    let t = h.getQueryData((0, o.B)(u, m)) ?? e;
                    try {
                      await I.mutateAsync({
                        mint: u,
                        calloutId: e.callout.calloutId,
                        cacheCalloutId: m,
                        reposted: !t.callout.repostedByViewer,
                      });
                    } catch (e) {
                      a.c.error(f((0, d.Q)(e)));
                    }
                  } finally {
                    g.current = !1;
                  }
                })())
              : x(!0));
        }, [m, u, p, x, I, v, h, f]),
        w = (0, l.useCallback)(async () => {
          if (!m) return null;
          let e = await v();
          return e?.callout.calloutId ?? null;
        }, [m, v]);
      return {
        repostCount: b?.hasCommunityThread
          ? (b.callout.repostCount ?? 0)
          : null,
        isReposted: b?.callout.repostedByViewer ?? !1,
        isBusy: I.isPending || y.isFetching,
        canRepost: !!m,
        toggle: C,
        resolveQuoteTarget: w,
      };
    },
  ]);
};
