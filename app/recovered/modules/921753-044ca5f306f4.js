// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(944410),
    t = e.i(690877),
    s = e.i(54567);
  let n = "is-creator";
  e.s([
    "E",
    0,
    n,
    "d",
    0,
    ({ mintId: e, enabled: o, onSuccess: a, walletAddress: i }) => {
      let d = (0, r.useLivestreamApiClient)();
      return (0, t.useQuery)({
        queryKey: [n, e, i],
        queryFn: async () => {
          let r = new URLSearchParams();
          r.set("mintId", e);
          try {
            let e = await d
              .get(`livestream/is-approved-creator?${r.toString()}`)
              .json();
            return (a?.(e), e);
          } catch (t) {
            let r = t instanceof Error ? t.message : String(t);
            throw (
              s.logger.error("[useIsApprovedCreator] Fetch failed", {
                mintId: e,
                error: r,
              }),
              t
            );
          }
        },
        enabled: o,
        select: (e) => e.isApprovedCreator,
        refetchOnWindowFocus: !1,
      });
    },
  ]);
};
