// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(464154),
    l = e.i(621624);
  e.s([
    "f",
    0,
    function (e) {
      let o,
        i,
        a,
        n,
        s = (0, t.c)(25),
        { mint: c, calloutId: d, embedded: u } = e;
      s[0] !== d || s[1] !== c
        ? ((o = { mint: c, calloutId: d, enabled: !1 }),
          (s[0] = d),
          (s[1] = c),
          (s[2] = o))
        : (o = s[2]);
      let { callout: m, hasCommunityThread: p } = (0, r.u)(o);
      if (s[3] !== m || s[4] !== u.likeCount || s[5] !== u.likedByViewer) {
        let e;
        (s[7] !== m
          ? ((e = m && { count: m.likeCount, byViewer: m.likedByViewer }),
            (s[7] = m),
            (s[8] = e))
          : (e = s[8]),
          (i = (0, l.i)({ count: u.likeCount, byViewer: u.likedByViewer }, e)),
          (s[3] = m),
          (s[4] = u.likeCount),
          (s[5] = u.likedByViewer),
          (s[6] = i));
      } else i = s[6];
      let b = m?.likedByViewer ?? u.likedByViewer ?? !1,
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
          (a = (0, l.i)(
            { count: u.repostCount, byViewer: u.repostedByViewer },
            e,
          )),
          (s[9] = m),
          (s[10] = u.repostCount),
          (s[11] = u.repostedByViewer),
          (s[12] = a));
      } else a = s[12];
      let y = m?.repostedByViewer ?? u.repostedByViewer ?? !1,
        f = u.viewCount ?? m?.viewCount ?? null,
        g = m?.mediaUrl ?? void 0,
        v = m?.caller?.twitterUrl,
        x = p ? m?.calloutId : d;
      return (
        s[15] !== i ||
        s[16] !== b ||
        s[17] !== h ||
        s[18] !== a ||
        s[19] !== y ||
        s[20] !== f ||
        s[21] !== g ||
        s[22] !== v ||
        s[23] !== x
          ? ((n = {
              likeCount: i,
              likedByViewer: b,
              replyCount: h,
              repostCount: a,
              repostedByViewer: y,
              viewCount: f,
              mediaUrl: g,
              twitterUrl: v,
              threadCalloutId: x,
            }),
            (s[15] = i),
            (s[16] = b),
            (s[17] = h),
            (s[18] = a),
            (s[19] = y),
            (s[20] = f),
            (s[21] = g),
            (s[22] = v),
            (s[23] = x),
            (s[24] = n))
          : (n = s[24]),
        n
      );
    },
  ]);
};
