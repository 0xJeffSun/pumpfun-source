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
        a,
        n,
        o,
        s = (0, t.c)(25),
        { mint: c, calloutId: d, embedded: u } = e;
      s[0] !== d || s[1] !== c
        ? ((l = { mint: c, calloutId: d, enabled: !1 }),
          (s[0] = d),
          (s[1] = c),
          (s[2] = l))
        : (l = s[2]);
      let { callout: m, hasCommunityThread: p } = (0, r.u)(l);
      if (s[3] !== m || s[4] !== u.likeCount || s[5] !== u.likedByViewer) {
        let e;
        (s[7] !== m
          ? ((e = m && { count: m.likeCount, byViewer: m.likedByViewer }),
            (s[7] = m),
            (s[8] = e))
          : (e = s[8]),
          (a = (0, i.i)({ count: u.likeCount, byViewer: u.likedByViewer }, e)),
          (s[3] = m),
          (s[4] = u.likeCount),
          (s[5] = u.likedByViewer),
          (s[6] = a));
      } else a = s[6];
      let h = m?.likedByViewer ?? u.likedByViewer ?? !1,
        f = u.replyCount ?? m?.replyCount ?? null;
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
          (n = (0, i.i)(
            { count: u.repostCount, byViewer: u.repostedByViewer },
            e,
          )),
          (s[9] = m),
          (s[10] = u.repostCount),
          (s[11] = u.repostedByViewer),
          (s[12] = n));
      } else n = s[12];
      let y = m?.repostedByViewer ?? u.repostedByViewer ?? !1,
        b = u.viewCount ?? m?.viewCount ?? null,
        v = m?.mediaUrl ?? void 0,
        g = m?.caller?.twitterUrl,
        x = p ? m?.calloutId : d;
      return (
        s[15] !== a ||
        s[16] !== h ||
        s[17] !== f ||
        s[18] !== n ||
        s[19] !== y ||
        s[20] !== b ||
        s[21] !== v ||
        s[22] !== g ||
        s[23] !== x
          ? ((o = {
              likeCount: a,
              likedByViewer: h,
              replyCount: f,
              repostCount: n,
              repostedByViewer: y,
              viewCount: b,
              mediaUrl: v,
              twitterUrl: g,
              threadCalloutId: x,
            }),
            (s[15] = a),
            (s[16] = h),
            (s[17] = f),
            (s[18] = n),
            (s[19] = y),
            (s[20] = b),
            (s[21] = v),
            (s[22] = g),
            (s[23] = x),
            (s[24] = o))
          : (o = s[24]),
        o
      );
    },
  ]);
};
