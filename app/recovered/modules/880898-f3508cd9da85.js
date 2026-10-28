// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(572544);
  let n = (e) => `/go/${encodeURIComponent(e)}`,
    r = (e, t) =>
      `/go/${encodeURIComponent(e)}/submissions/${encodeURIComponent(t)}`,
    i = (e, t, i) => {
      let s = i ? r(e, i) : n(e);
      return `${s}?comment=${encodeURIComponent(t)}`;
    };
  e.s([
    "p",
    0,
    i,
    "Z",
    0,
    n,
    "L",
    0,
    r,
    "$",
    0,
    (e) => {
      let s,
        o = e.bountyTitle.trim() || "Bounty";
      if (e.commentId) {
        let n, r, s;
        return {
          shareUrl:
            ((n = e.bountyId),
            (r = e.commentId),
            (s = e.submissionId),
            `${(0, t.f)()}${i(n, r, s)}`),
          shareText: `Check out this comment on Pump: "${o}"`,
          dialogTitle: "Share comment",
        };
      }
      if (e.submissionId) {
        let n, i;
        return {
          shareUrl:
            ((n = e.bountyId), (i = e.submissionId), `${(0, t.f)()}${r(n, i)}`),
          shareText: `Check out this bounty submission on Pump: "${o}"`,
          dialogTitle: "Share submission",
        };
      }
      return {
        shareUrl: ((s = e.bountyId), `${(0, t.f)()}${n(s)}`),
        shareText: `Check out this bounty on Pump: "${o}"`,
        dialogTitle: "Share bounty",
      };
    },
  ]);
};
