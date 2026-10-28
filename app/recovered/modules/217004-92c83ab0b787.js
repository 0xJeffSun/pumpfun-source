// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(464154),
    l = e.i(621624);
  e.s([
    "f",
    0,
    function (e) {
      let i,
        a,
        n,
        s,
        o = (0, t.c)(25),
        { mint: d, calloutId: u, embedded: c } = e;
      o[0] !== u || o[1] !== d
        ? ((i = { mint: d, calloutId: u, enabled: !1 }),
          (o[0] = u),
          (o[1] = d),
          (o[2] = i))
        : (i = o[2]);
      let { callout: m, hasCommunityThread: p } = (0, r.u)(i);
      if (o[3] !== m || o[4] !== c.likeCount || o[5] !== c.likedByViewer) {
        let e;
        (o[7] !== m
          ? ((e = m && { count: m.likeCount, byViewer: m.likedByViewer }),
            (o[7] = m),
            (o[8] = e))
          : (e = o[8]),
          (a = (0, l.i)({ count: c.likeCount, byViewer: c.likedByViewer }, e)),
          (o[3] = m),
          (o[4] = c.likeCount),
          (o[5] = c.likedByViewer),
          (o[6] = a));
      } else a = o[6];
      let h = m?.likedByViewer ?? c.likedByViewer ?? !1,
        f = c.replyCount ?? m?.replyCount ?? null;
      if (
        o[9] !== m ||
        o[10] !== c.repostCount ||
        o[11] !== c.repostedByViewer
      ) {
        let e;
        (o[13] !== m
          ? ((e = m && { count: m.repostCount, byViewer: m.repostedByViewer }),
            (o[13] = m),
            (o[14] = e))
          : (e = o[14]),
          (n = (0, l.i)(
            { count: c.repostCount, byViewer: c.repostedByViewer },
            e,
          )),
          (o[9] = m),
          (o[10] = c.repostCount),
          (o[11] = c.repostedByViewer),
          (o[12] = n));
      } else n = o[12];
      let g = m?.repostedByViewer ?? c.repostedByViewer ?? !1,
        y = c.viewCount ?? m?.viewCount ?? null,
        b = m?.mediaUrl ?? void 0,
        v = m?.caller?.twitterUrl,
        w = p ? m?.calloutId : u;
      return (
        o[15] !== a ||
        o[16] !== h ||
        o[17] !== f ||
        o[18] !== n ||
        o[19] !== g ||
        o[20] !== y ||
        o[21] !== b ||
        o[22] !== v ||
        o[23] !== w
          ? ((s = {
              likeCount: a,
              likedByViewer: h,
              replyCount: f,
              repostCount: n,
              repostedByViewer: g,
              viewCount: y,
              mediaUrl: b,
              twitterUrl: v,
              threadCalloutId: w,
            }),
            (o[15] = a),
            (o[16] = h),
            (o[17] = f),
            (o[18] = n),
            (o[19] = g),
            (o[20] = y),
            (o[21] = b),
            (o[22] = v),
            (o[23] = w),
            (o[24] = s))
          : (s = o[24]),
        s
      );
    },
  ]);
};
