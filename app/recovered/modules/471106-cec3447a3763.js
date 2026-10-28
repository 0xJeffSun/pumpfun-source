// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "N",
    0,
    function (e) {
      return {
        type: "bounty",
        bounty: e.bounty,
        resolvedToken:
          e.resolvedTokens && e.bounty.token
            ? e.resolvedTokens.get(e.bounty.token.mint)
            : void 0,
        resolvedTokens: e.resolvedTokens,
        isDraft: e.isDraft,
        timestamp: new Date(e.bounty.createdAt).getTime(),
        key: `${e.keyPrefix}-${e.bounty.id}`,
      };
    },
    "e",
    0,
    function (e) {
      let t = new Set();
      for (let r of e)
        "submission" === r.type && t.add(r.submission.requesterAddress);
      return [...t];
    },
    "J",
    0,
    function (e, t) {
      return e.resolution?.winners?.some((e) => e.submissionId === t) ?? !1;
    },
    "R",
    0,
    function (e) {
      return {
        type: "submission",
        submission: e.submission,
        bounty: e.bounty,
        submitter: e.submitter,
        isWinner: e.isWinner,
        timestamp: new Date(
          e.submission.publishedAt ?? e.submission.createdAt,
        ).getTime(),
        key: `${e.keyPrefix}-${e.submission.submissionId}`,
      };
    },
    "L",
    0,
    function (e) {
      let t = new Map();
      for (let r of e)
        "bounty" === r.type
          ? t.set(r.bounty.taskId, r.bounty)
          : t.set(r.parentTaskId, r.parentBounty);
      return [...t.values()];
    },
  ]);
};
