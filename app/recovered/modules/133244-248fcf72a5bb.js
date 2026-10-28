// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["E", () => o, "_", () => m, "g", () => d]);
  var t = e.i(732486),
    a = e.i(445242),
    i = e.i(369731),
    l = e.i(187807),
    r = e.i(218921),
    s = e.i(918391),
    n = e.i(829010),
    c = e.i(859960);
  let o = 6,
    d = (e) => ({
      mint: e.mint,
      title: e.name ?? e.mint,
      creator: { address: e.creator, username: e.username || void 0 },
      symbol: e.symbol ?? e.mint,
      marketCap: e.usd_market_cap,
      thumbnail: e.thumbnail ?? e.image_uri ?? "",
      ipfsThumbnail: e.image_uri ?? "",
      thumbnailUpdatedAt: e.thumbnail_updated_at,
      avatarUri: e.image_uri ?? "",
      isLive: e.is_currently_live,
      playlistUrl: e.playlist_url ?? void 0,
      viewerCount: e.num_participants,
      coinCreatedTimestamp: e.created_timestamp ?? void 0,
      coin: e,
    }),
    m = (e) => {
      let d,
        m,
        u = (0, a.c)(5),
        { initialData: f } = e;
      u[0] !== f
        ? ((d = { initialData: f }), (u[0] = f), (u[1] = d))
        : (d = u[1]);
      let { data: h, isLoading: x } = (0, c.L)(d);
      if (x) {
        let e;
        return (
          u[2] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = (0, t.jsxs)("div", {
                className: "flex flex-col gap-3 isolate",
                children: [
                  (0, t.jsx)(l.HeroStage, {
                    children: (0, t.jsx)("div", {
                      className: n.F,
                      children: (0, t.jsx)(s.f, {}),
                    }),
                  }),
                  (0, t.jsx)(r.PaginationDotsSkeleton, { count: o }),
                ],
              })),
              (u[2] = e))
            : (e = u[2]),
          e
        );
      }
      return h && 0 !== h.length
        ? (u[3] !== h
            ? ((m = (0, t.jsx)(i.HeroCarousel, { livestreams: h })),
              (u[3] = h),
              (u[4] = m))
            : (m = u[4]),
          m)
        : null;
    };
};
