// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(158791);
  let r = (e, t, r) => {
    if (!t || !e.expiresAt) return !0;
    let n = Date.parse(e.expiresAt);
    if (Number.isNaN(n)) return !0;
    let i = n - r;
    switch (t) {
      case "lt-24h":
        return i > 0 && i <= 864e5;
      case "lt-3d":
        return i > 0 && i <= 2592e5;
      case "lt-7d":
        return i > 0 && i <= 6048e5;
      case "gte-7d":
        return i > 6048e5;
      default:
        return !0;
    }
  };
  e.s([
    "k",
    0,
    (e) => {
      let r = new Map(),
        n = new Map();
      for (let i of e) {
        let e = (0, t.v)(i.status, i.expiresAt);
        for (let t of (r.set(e, (r.get(e) ?? 0) + 1), i.rewardLegs))
          t.mintAddress &&
            n.set(t.mintAddress, (n.get(t.mintAddress) ?? 0) + 1);
      }
      return {
        phase: [...r.entries()].map(([e, t]) => ({ key: e, count: t })),
        status: [],
        rewardMints: [...n.entries()].map(([e, t]) => ({ key: e, count: t })),
      };
    },
    "t",
    0,
    (e, n = Date.now()) => {
      let i = new Map();
      for (let { key: e } of t.w) i.set(e, 0);
      for (let s of e)
        for (let { key: e } of t.w) r(s, e, n) && i.set(e, (i.get(e) ?? 0) + 1);
      return i;
    },
    "x",
    0,
    (e, n, i = Date.now()) =>
      e.filter((e) => {
        let s, a;
        return (
          (!(s = n.q.trim().toLowerCase()) ||
            [e.title, e.bodyMarkdown]
              .filter(Boolean)
              .join("\n")
              .toLowerCase()
              .includes(s)) &&
          ((e, r) => {
            if (0 === r.length) return !0;
            let n = (0, t.v)(e.status, e.expiresAt);
            return "DRAFT" !== n && r.includes(n);
          })(e, n.statuses) &&
          ((e, r) => {
            if (0 === r.length) return !0;
            let n = new Set(
              e.rewardLegs.map((e) => e.mintAddress).filter((e) => !!e),
            );
            return (
              e.coinAddress && n.add(e.coinAddress),
              r.some((e) => n.has(t.h[e]))
            );
          })(e, n.rewardTokens) &&
          (null == (a = e.rewardTotalUsd) ||
            ((null == n.rewardUsdMin ||
              !(n.rewardUsdMin > 0) ||
              !(a < n.rewardUsdMin)) &&
              (null == n.rewardUsdMax ||
                !(n.rewardUsdMax < t.V.max) ||
                !(a > n.rewardUsdMax)))) &&
          r(e, n.timeLeft, i)
        );
      }),
    "X",
    0,
    (e, t) =>
      t && e.publishedAt
        ? "WINNER"
        : "PENDING_REVIEW" === e.moderationStatus
          ? "IN_REVIEW"
          : e.publishedAt
            ? "LIVE"
            : "DRAFT",
    "h",
    0,
    (e) => ({ ...e, rewardTokens: [] }),
    "L",
    0,
    (e) => ({ ...e, statuses: [] }),
    "u",
    0,
    (e) => ({ ...e, submissionStatuses: [] }),
    "Z",
    0,
    (e) => ({ ...e, timeLeft: null }),
  ]);
};
