// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(445242),
    t = e.i(352386),
    s = e.i(78436);
  let n = (e, r) =>
    e === r ||
    (!!e &&
      !!r &&
      [
        "id",
        "mintId",
        "creatorAddress",
        "streamStartTimestamp",
        "streamEndTimestamp",
        "isLive",
        "downrankScore",
        "title",
      ].every((t) => e[t] === r[t]));
  e.s(["f", 0, n], 202565);
  let o = (0, s.$)((e, r) => ({
      livestreamsByMintId: {},
      revisionByMintId: {},
      getLivestream: (e) => r().livestreamsByMintId[e] ?? null,
      setLivestream: (t, s) => {
        let { livestreamsByMintId: o, revisionByMintId: a } = r();
        (t in o && n(o[t] ?? null, s)) ||
          e({
            livestreamsByMintId: { ...o, [t]: s },
            revisionByMintId: { ...a, [t]: (a[t] ?? 0) + 1 },
          });
      },
      clearLivestream: (e) => r().setLivestream(e, null),
    })),
    a = (e) => {
      let t,
        s = (0, r.c)(2);
      return (
        s[0] !== e
          ? ((t = (r) => r.revisionByMintId[e] ?? 0), (s[0] = e), (s[1] = t))
          : (t = s[1]),
        o(t)
      );
    };
  e.s(
    [
      "F",
      0,
      o,
      "E",
      0,
      a,
      "U",
      0,
      (e) => {
        let s,
          n = (0, r.c)(3),
          o = a(e);
        n[0] !== e || n[1] !== o
          ? ((s = { mintId: e, revision: o }),
            (n[0] = e),
            (n[1] = o),
            (n[2] = s))
          : (s = n[2]);
        let [i, d] = (0, t.useState)(s);
        return i.mintId !== e ? (d({ mintId: e, revision: o }), o) : i.revision;
      },
    ],
    182251,
  );
};
