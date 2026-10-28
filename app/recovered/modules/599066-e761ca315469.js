// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(690877),
    a = e.i(606933),
    i = e.i(352386);
  e.i(12692);
  var l = e.i(398902),
    r = e.i(63289),
    n = e.i(464154),
    o = e.i(968185),
    s = e.i(408750),
    d = e.i(164289),
    c = e.i(198825);
  e.s([
    "f",
    0,
    function (e) {
      let { mint: u, calloutId: m, viewerAddress: p } = e,
        { t: h } = (0, l.f)(),
        f = (0, a.useQueryClient)(),
        g = (0, o.f)(),
        { setShowWallet: y } = (0, c.useConnectWallet)(),
        v = (0, t.useQuery)({
          queryKey: (0, n.B)(u, m ?? null),
          queryFn: ({ signal: e }) => {
            if (!m) throw Error("calloutId required");
            return (0, s.a)({ mint: u, calloutId: m, signal: e });
          },
          enabled: !1,
          retry: !1,
          structuralSharing: n.s,
        }),
        b = v.data,
        I = (0, i.useRef)(!1),
        w = (0, i.useCallback)(async () => {
          let e = v.data;
          return ((e &&
            (e.hasCommunityThread || e.communityThreadConfirmedAbsent)) ||
            (e = (await v.refetch()).data),
          e)
            ? e.hasCommunityThread
              ? e
              : ((0, r.c)(
                  e.communityThreadConfirmedAbsent
                    ? h("web.callouts.reposts_unavailable")
                    : h("web.callouts.reposts_load_failed"),
                ),
                null)
            : (r.c.error(h("web.callouts.load_callout_failed")), null);
        }, [v, h]),
        C = (0, i.useCallback)(() => {
          !m ||
            I.current ||
            (p
              ? ((I.current = !0),
                (async () => {
                  try {
                    let e = await w();
                    if (!e) return;
                    let t = f.getQueryData((0, n.B)(u, m)) ?? e;
                    try {
                      await g.mutateAsync({
                        mint: u,
                        calloutId: e.callout.calloutId,
                        cacheCalloutId: m,
                        reposted: !t.callout.repostedByViewer,
                      });
                    } catch (e) {
                      r.c.error(h((0, d.Q)(e)));
                    }
                  } finally {
                    I.current = !1;
                  }
                })())
              : y(!0));
        }, [m, u, p, y, g, w, f, h]),
        k = (0, i.useCallback)(async () => {
          if (!m) return null;
          let e = await w();
          return e?.callout.calloutId ?? null;
        }, [m, w]);
      return {
        repostCount: b?.hasCommunityThread
          ? (b.callout.repostCount ?? 0)
          : null,
        isReposted: b?.callout.repostedByViewer ?? !1,
        isBusy: g.isPending || v.isFetching,
        canRepost: !!m,
        toggle: C,
        resolveQuoteTarget: k,
      };
    },
  ]);
};
