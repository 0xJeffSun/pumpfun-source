// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(464154),
    i = e.i(621624);
  e.s([
    "f",
    0,
    function (e) {
      let l,
        n,
        a,
        s,
        o = (0, t.c)(25),
        { mint: d, calloutId: c, embedded: u } = e;
      o[0] !== c || o[1] !== d
        ? ((l = { mint: d, calloutId: c, enabled: !1 }),
          (o[0] = c),
          (o[1] = d),
          (o[2] = l))
        : (l = o[2]);
      let { callout: m, hasCommunityThread: h } = (0, r.u)(l);
      if (o[3] !== m || o[4] !== u.likeCount || o[5] !== u.likedByViewer) {
        let e;
        (o[7] !== m
          ? ((e = m && { count: m.likeCount, byViewer: m.likedByViewer }),
            (o[7] = m),
            (o[8] = e))
          : (e = o[8]),
          (n = (0, i.i)({ count: u.likeCount, byViewer: u.likedByViewer }, e)),
          (o[3] = m),
          (o[4] = u.likeCount),
          (o[5] = u.likedByViewer),
          (o[6] = n));
      } else n = o[6];
      let f = m?.likedByViewer ?? u.likedByViewer ?? !1,
        x = u.replyCount ?? m?.replyCount ?? null;
      if (
        o[9] !== m ||
        o[10] !== u.repostCount ||
        o[11] !== u.repostedByViewer
      ) {
        let e;
        (o[13] !== m
          ? ((e = m && { count: m.repostCount, byViewer: m.repostedByViewer }),
            (o[13] = m),
            (o[14] = e))
          : (e = o[14]),
          (a = (0, i.i)(
            { count: u.repostCount, byViewer: u.repostedByViewer },
            e,
          )),
          (o[9] = m),
          (o[10] = u.repostCount),
          (o[11] = u.repostedByViewer),
          (o[12] = a));
      } else a = o[12];
      let p = m?.repostedByViewer ?? u.repostedByViewer ?? !1,
        y = u.viewCount ?? m?.viewCount ?? null,
        v = m?.mediaUrl ?? void 0,
        w = m?.caller?.twitterUrl,
        b = h ? m?.calloutId : c;
      return (
        o[15] !== n ||
        o[16] !== f ||
        o[17] !== x ||
        o[18] !== a ||
        o[19] !== p ||
        o[20] !== y ||
        o[21] !== v ||
        o[22] !== w ||
        o[23] !== b
          ? ((s = {
              likeCount: n,
              likedByViewer: f,
              replyCount: x,
              repostCount: a,
              repostedByViewer: p,
              viewCount: y,
              mediaUrl: v,
              twitterUrl: w,
              threadCalloutId: b,
            }),
            (o[15] = n),
            (o[16] = f),
            (o[17] = x),
            (o[18] = a),
            (o[19] = p),
            (o[20] = y),
            (o[21] = v),
            (o[22] = w),
            (o[23] = b),
            (o[24] = s))
          : (s = o[24]),
        s
      );
    },
  ]);
};
