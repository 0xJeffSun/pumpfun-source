// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(464154),
    l = e.i(621624);
  e.s([
    "f",
    0,
    function (e) {
      let r,
        a,
        n,
        o,
        s = (0, t.c)(25),
        { mint: d, calloutId: c, embedded: u } = e;
      s[0] !== c || s[1] !== d
        ? ((r = { mint: d, calloutId: c, enabled: !1 }),
          (s[0] = c),
          (s[1] = d),
          (s[2] = r))
        : (r = s[2]);
      let { callout: m, hasCommunityThread: f } = (0, i.u)(r);
      if (s[3] !== m || s[4] !== u.likeCount || s[5] !== u.likedByViewer) {
        let e;
        (s[7] !== m
          ? ((e = m && { count: m.likeCount, byViewer: m.likedByViewer }),
            (s[7] = m),
            (s[8] = e))
          : (e = s[8]),
          (a = (0, l.i)({ count: u.likeCount, byViewer: u.likedByViewer }, e)),
          (s[3] = m),
          (s[4] = u.likeCount),
          (s[5] = u.likedByViewer),
          (s[6] = a));
      } else a = s[6];
      let y = m?.likedByViewer ?? u.likedByViewer ?? !1,
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
          (n = (0, l.i)(
            { count: u.repostCount, byViewer: u.repostedByViewer },
            e,
          )),
          (s[9] = m),
          (s[10] = u.repostCount),
          (s[11] = u.repostedByViewer),
          (s[12] = n));
      } else n = s[12];
      let p = m?.repostedByViewer ?? u.repostedByViewer ?? !1,
        x = u.viewCount ?? m?.viewCount ?? null,
        b = m?.mediaUrl ?? void 0,
        v = m?.caller?.twitterUrl,
        g = f ? m?.calloutId : c;
      return (
        s[15] !== a ||
        s[16] !== y ||
        s[17] !== h ||
        s[18] !== n ||
        s[19] !== p ||
        s[20] !== x ||
        s[21] !== b ||
        s[22] !== v ||
        s[23] !== g
          ? ((o = {
              likeCount: a,
              likedByViewer: y,
              replyCount: h,
              repostCount: n,
              repostedByViewer: p,
              viewCount: x,
              mediaUrl: b,
              twitterUrl: v,
              threadCalloutId: g,
            }),
            (s[15] = a),
            (s[16] = y),
            (s[17] = h),
            (s[18] = n),
            (s[19] = p),
            (s[20] = x),
            (s[21] = b),
            (s[22] = v),
            (s[23] = g),
            (s[24] = o))
          : (o = s[24]),
        o
      );
    },
  ]);
};
