// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var n = e.i(292686),
    t = e.i(26101),
    a = e.i(203350);
  let r = ({
      mint: e,
      livestreamId: n,
      mediaType: r,
      isEnabled: i,
      role: o,
      context: s,
    }) => {
      (0, a.j)(
        (0, t.F0)({
          mint: e,
          livestreamId: n,
          mediaType: r,
          isEnabled: i,
          role: o,
        }),
        s,
      );
    },
    i = ({
      mint: e,
      livestreamId: n,
      mediaType: r,
      sourceName: i,
      role: o,
      context: s,
    }) => {
      (0, a.j)(
        (0, t.u7)({
          mint: e,
          livestreamId: n,
          mediaType: r,
          sourceName: i,
          role: o,
        }),
        s,
      );
    };
  e.s([
    "n",
    0,
    ({ mint: e, livestreamId: t, sourceName: a, role: r, context: o }) =>
      i({
        mint: e,
        livestreamId: t,
        mediaType: n.nR.AUDIO,
        sourceName: a,
        role: r,
        context: o,
      }),
    "e",
    0,
    ({ mint: e, livestreamId: t, isEnabled: a, role: i, context: o }) =>
      r({
        mint: e,
        livestreamId: t,
        mediaType: n.nR.AUDIO,
        isEnabled: a,
        role: i,
        context: o,
      }),
    "r",
    0,
    ({ mint: e, livestreamId: t, isEnabled: a, role: i, context: o }) =>
      r({
        mint: e,
        livestreamId: t,
        mediaType: n.nR.SCREENSHARE,
        isEnabled: a,
        role: i,
        context: o,
      }),
    "$",
    0,
    ({ mint: e, livestreamId: t, sourceName: a, role: r, context: o }) =>
      i({
        mint: e,
        livestreamId: t,
        mediaType: n.nR.VIDEO,
        sourceName: a,
        role: r,
        context: o,
      }),
    "s",
    0,
    ({ mint: e, livestreamId: t, isEnabled: a, role: i, context: o }) =>
      r({
        mint: e,
        livestreamId: t,
        mediaType: n.nR.VIDEO,
        isEnabled: a,
        role: i,
        context: o,
      }),
    "f",
    0,
    ({ mint: e, livestreamId: n, gateValue: r, context: i }) => {
      (0, a.j)((0, t.z2)({ mint: e, livestreamId: n, gateValue: r }), i);
    },
  ]);
};
