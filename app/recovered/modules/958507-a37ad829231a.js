// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(86868);
  function t(e) {
    return e.moderator;
  }
  e.s(["f", 0, () => !!(0, r.U)(t)], 958507);
  var s = e.i(944410),
    n = e.i(690877),
    o = e.i(812768),
    a = e.i(54567);
  e.s(
    [
      "f",
      0,
      (e) => {
        let t = (0, r.U)((e) => e.setModerator),
          i = (0, s.useLivestreamApiClient)();
        return (0, n.useQuery)({
          queryKey: ["is-moderator"],
          queryFn: async () => {
            a.logger.debug(
              "[useIsModeratorQuery] Attempting to fetch moderator details",
            );
            try {
              let e = await i.get("human-moderation/is-moderator").json();
              return (
                a.logger.debug("[useIsModeratorQuery] Fetch successful", {
                  isModerator: e?.isModerator,
                  moderator: e?.moderator,
                }),
                t(e?.isModerator ? e.moderator : null),
                e
              );
            } catch (r) {
              if (r instanceof o.f && 401 === r.response.status)
                return (t(null), null);
              let e = r instanceof Error ? r.message : String(r);
              throw (
                a.logger.error("[useIsModeratorQuery] Fetch failed", {
                  error: e,
                }),
                t(null),
                r
              );
            }
          },
          ...e,
        });
      },
    ],
    132788,
  );
};
