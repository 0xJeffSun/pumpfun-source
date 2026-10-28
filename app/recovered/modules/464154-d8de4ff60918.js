// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(213618),
    l = e.i(690877),
    a = e.i(606933),
    n = e.i(349879),
    i = e.i(408750),
    s = e.i(605587);
  let o = (e, t) => ["callouts", "detail", e, t],
    u = (e, t) => !(t instanceof i.D) && e < 2;
  function d(e, t) {
    if (
      e?.hasCommunityThread &&
      !t.hasCommunityThread &&
      !t.communityThreadConfirmedAbsent
    )
      return e;
    if (e && t.hasCommunityThread) {
      let l =
          "boolean" == typeof e.callout.likedByViewer &&
          void 0 === t.callout.likedByViewer,
        a =
          "boolean" == typeof e.callout.repostedByViewer &&
          void 0 === t.callout.repostedByViewer;
      if (l || a)
        return (0, r.B)(e, {
          ...t,
          callout: {
            ...t.callout,
            ...(l ? { likedByViewer: e.callout.likedByViewer } : {}),
            ...(a ? { repostedByViewer: e.callout.repostedByViewer } : {}),
          },
        });
    }
    return (0, r.B)(e, t);
  }
  e.s([
    "B",
    0,
    o,
    "C",
    0,
    ({ mint: e, calloutId: t }) => ({
      queryKey: o(e, t),
      queryFn: ({ signal: r }) =>
        (0, i.a)({ mint: e, calloutId: t, signal: r }),
      staleTime: 15e3,
      gcTime: 3e5,
      retry: u,
    }),
    "s",
    0,
    d,
    "u",
    0,
    function (e) {
      let r,
        c,
        m,
        f,
        p,
        h = (0, t.c)(23),
        { mint: y, calloutId: g, enabled: x } = e,
        I = (0, a.useQueryClient)();
      h[0] !== g || h[1] !== y || h[2] !== I
        ? ((r = () =>
            y && g
              ? ((e, t, r) => {
                  for (let [, l] of e.getQueriesData({ queryKey: n.A }))
                    for (let e of l?.pages ?? []) {
                      let l = e.callouts.find(
                        (e) => e.calloutId === r && (0, s.I)(e.coinMint, t),
                      );
                      if (l) return { callout: l, hasCommunityThread: !1 };
                    }
                })(I, y, g)
              : void 0),
          (h[0] = g),
          (h[1] = y),
          (h[2] = I),
          (h[3] = r))
        : (r = h[3]);
      let v = r,
        w = (void 0 === x || x) && !!y && !!g,
        b = y ?? null,
        A = g ?? null;
      (h[4] !== b || h[5] !== A
        ? ((c = o(b, A)), (h[4] = b), (h[5] = A), (h[6] = c))
        : (c = h[6]),
        h[7] !== g || h[8] !== y
          ? ((m = (e) => {
              let { signal: t } = e;
              if (!y || !g) throw Error("mint and calloutId required");
              return (0, i.a)({ mint: y, calloutId: g, signal: t });
            }),
            (h[7] = g),
            (h[8] = y),
            (h[9] = m))
          : (m = h[9]),
        h[10] !== v || h[11] !== w || h[12] !== c || h[13] !== m
          ? ((f = {
              enabled: w,
              queryKey: c,
              queryFn: m,
              placeholderData: v,
              staleTime: 15e3,
              gcTime: 3e5,
              refetchOnWindowFocus: !1,
              structuralSharing: d,
              retry: u,
            }),
            (h[10] = v),
            (h[11] = w),
            (h[12] = c),
            (h[13] = m),
            (h[14] = f))
          : (f = h[14]));
      let N = (0, l.useQuery)(f),
        k = N.data?.callout,
        C = N.data?.hasCommunityThread ?? !1,
        E = N.error instanceof i.D;
      return (
        h[15] !== N.error ||
        h[16] !== N.isError ||
        h[17] !== N.isLoading ||
        h[18] !== N.refetch ||
        h[19] !== E ||
        h[20] !== k ||
        h[21] !== C
          ? ((p = {
              callout: k,
              hasCommunityThread: C,
              isLoading: N.isLoading,
              isError: N.isError,
              isNotFound: E,
              error: N.error,
              refetch: N.refetch,
            }),
            (h[15] = N.error),
            (h[16] = N.isError),
            (h[17] = N.isLoading),
            (h[18] = N.refetch),
            (h[19] = E),
            (h[20] = k),
            (h[21] = C),
            (h[22] = p))
          : (p = h[22]),
        p
      );
    },
  ]);
};
