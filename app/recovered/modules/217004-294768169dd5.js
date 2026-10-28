// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(464154),
    a = e.i(621624);
  e.s([
    "f",
    0,
    function (e) {
      let l,
        r,
        n,
        o,
        s = (0, t.c)(25),
        { mint: d, calloutId: c, embedded: u } = e;
      s[0] !== c || s[1] !== d
        ? ((l = { mint: d, calloutId: c, enabled: !1 }),
          (s[0] = c),
          (s[1] = d),
          (s[2] = l))
        : (l = s[2]);
      let { callout: m, hasCommunityThread: f } = (0, i.u)(l);
      if (s[3] !== m || s[4] !== u.likeCount || s[5] !== u.likedByViewer) {
        let e;
        (s[7] !== m
          ? ((e = m && { count: m.likeCount, byViewer: m.likedByViewer }),
            (s[7] = m),
            (s[8] = e))
          : (e = s[8]),
          (r = (0, a.i)({ count: u.likeCount, byViewer: u.likedByViewer }, e)),
          (s[3] = m),
          (s[4] = u.likeCount),
          (s[5] = u.likedByViewer),
          (s[6] = r));
      } else r = s[6];
      let p = m?.likedByViewer ?? u.likedByViewer ?? !1,
        h = u.replyCount ?? m?.replyCount ?? null;
      if (
        s[9] !== m ||
        s[10] !== u.repostCount ||
        s[11] !== u.repostedByViewer
      ) {
        let e;
        (s[13] !== m
          ? ((e = m && { count: m.repostCount, byViewer: m.repostedByViewer }),
            (s[13] = m),
            (s[14] = e))
          : (e = s[14]),
          (n = (0, a.i)(
            { count: u.repostCount, byViewer: u.repostedByViewer },
            e,
          )),
          (s[9] = m),
          (s[10] = u.repostCount),
          (s[11] = u.repostedByViewer),
          (s[12] = n));
      } else n = s[12];
      let b = m?.repostedByViewer ?? u.repostedByViewer ?? !1,
        y = u.viewCount ?? m?.viewCount ?? null,
        x = m?.mediaUrl ?? void 0,
        v = m?.caller?.twitterUrl,
        g = f ? m?.calloutId : c;
      return (
        s[15] !== r ||
        s[16] !== p ||
        s[17] !== h ||
        s[18] !== n ||
        s[19] !== b ||
        s[20] !== y ||
        s[21] !== x ||
        s[22] !== v ||
        s[23] !== g
          ? ((o = {
              likeCount: r,
              likedByViewer: p,
              replyCount: h,
              repostCount: n,
              repostedByViewer: b,
              viewCount: y,
              mediaUrl: x,
              twitterUrl: v,
              threadCalloutId: g,
            }),
            (s[15] = r),
            (s[16] = p),
            (s[17] = h),
            (s[18] = n),
            (s[19] = b),
            (s[20] = y),
            (s[21] = x),
            (s[22] = v),
            (s[23] = g),
            (s[24] = o))
          : (o = s[24]),
        o
      );
    },
  ]);
};
