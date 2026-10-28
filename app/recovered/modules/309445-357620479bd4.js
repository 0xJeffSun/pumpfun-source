// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(845785);
  let n = ({
    id: e,
    title: t,
    creator: n,
    token: r,
    videoId: i,
    page: s,
    playerName: o,
    videoTitle: d,
  }) => ({
    videoId: i,
    videoTitle: d ?? t,
    bountyId: e,
    creatorId: n.address,
    ...(n.creatorUserId ? { creatorCcUserId: n.creatorUserId } : {}),
    ...(r?.mint ? { associatedCoinMint: r.mint } : {}),
    page: s,
    playerName: o,
  });
  e.s([
    "Z",
    0,
    ({ bounty: e, attachment: t, page: r, playerName: i }) =>
      n({
        ...e,
        videoId: t.key,
        videoTitle: t.filename || e.title,
        page: r,
        playerName: i,
      }),
    "H",
    0,
    () => ({
      videoId: "bounties-intro-ftue",
      videoTitle: "Pump.fun GO intro",
      bountyId: "bounties-intro-ftue",
      creatorId: "",
      page: t.j.WEB_BOUNTIES_INTRO,
      playerName: t.w.WEB_BOUNTY_INTRO_PLAYER,
    }),
    "U",
    0,
    n,
    "C",
    0,
    ({
      bounty: e,
      submissionId: t,
      videoId: r,
      page: i,
      playerName: s,
      videoTitle: o,
    }) =>
      n({
        ...e,
        videoId: `${t}:${r}`,
        videoTitle: o ?? e.title,
        page: i,
        playerName: s,
      }),
    "p",
    0,
    ({ src: e, attachments: t }) => {
      let n = t?.find((t) => t.url === e);
      return n?.key ?? e;
    },
  ]);
};
