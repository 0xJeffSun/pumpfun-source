// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var n = e.i(26101),
    t = e.i(203350);
  e.s([
    "k",
    0,
    ({
      fromQuality: e,
      toQuality: a,
      mint: r,
      livestreamId: i,
      contentType: o,
      context: s,
    }) => {
      (0, t.j)(
        (0, n.pr)({
          fromQuality: e,
          toQuality: a,
          mint: r,
          livestreamId: i,
          contentType: o,
        }),
        s,
      );
    },
    "j",
    0,
    ({
      fromView: e,
      toView: a,
      mint: r,
      livestreamId: i,
      contentType: o,
      context: s,
    }) => {
      (0, t.j)(
        (0, n.m7)({
          fromView: e,
          toView: a,
          mint: r,
          livestreamId: i ?? "",
          contentType: o,
        }),
        s,
      );
    },
    "T",
    0,
    ({ mint: e, livestreamId: a, isMuted: r, contentType: i, context: o }) => {
      (0, t.j)(
        (0, n.fs)({
          mint: e,
          livestreamId: a ?? "",
          isMuted: r,
          contentType: i,
        }),
        o,
      );
    },
  ]);
};
