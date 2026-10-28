// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(759257),
    a = e.i(361284);
  let i = (e) =>
    "TWITTER" ===
    e.provider
      .trim()
      .toUpperCase()
      .replace(/^SOCIAL_PROVIDER_/, "");
  async function n(e) {
    let {
      mint: a,
      limit: i = 50,
      offset: n = 0,
      includePositions: l = !1,
      chain: s,
      signal: o,
    } = e;
    return await (0, t.j)()("GET /followed-holders/{mint}", {
      params: { mint: a },
      query: {
        limit: i,
        offset: n,
        includePositions: l || void 0,
        ...(s ? { chain: s } : {}),
      },
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      signal: o,
      hooks: {
        afterResponse: [
          (e, t, a) => {
            if (!a.ok) throw new r(a.status);
          },
        ],
      },
    });
  }
  class r extends Error {
    status;
    constructor(e) {
      (super(`Failed to fetch followed holders: ${e}`),
        (this.name = "FollowedHoldersHttpError"),
        (this.status = e));
    }
  }
  let l = (e, t) => {
    let a = e.holders.filter((e) => !t(e));
    if (a.length === e.holders.length) return e;
    if (0 === a.length) return null;
    let i = e.holders.length - a.length;
    return { holders: a, totalCount: Math.max(e.totalCount - i, a.length) };
  };
  e.s([
    "A",
    0,
    5,
    "m",
    0,
    r,
    "i",
    0,
    (e, t) => (e && t ? l(e, (e) => e.userId === t) : e),
    "h",
    0,
    (e, t) => {
      if (!e || !t) return e;
      let a = t.toLowerCase();
      return l(e, (e) => e.username.toLowerCase() === a);
    },
    "D",
    0,
    n,
    "u",
    0,
    (e) => e instanceof r && (401 === e.status || 403 === e.status),
    "X",
    0,
    (e) => e instanceof r && 401 === e.status,
    "F",
    0,
    (e, t) => {
      let n = new Map();
      for (let e of t) {
        let t = n.get(e.userId) ?? [];
        (t.push(e), n.set(e.userId, t));
      }
      return e.map((e) => {
        var t;
        let r = n.get(e.userId) ?? [],
          l = r.length > 0 ? r.reduce((e, t) => e + t.amountHeld, 0) : null,
          s = r.map((e) => e.pnlUsd).filter((e) => null !== e),
          o = s.length > 0 ? s.reduce((e, t) => e + t, 0) : null,
          d = 1 === r.length ? (0, a.f)(r[0]?.pnlPercentage) : null;
        return {
          userId: e.userId,
          username: e.username,
          profileImageUrl: e.profileImageUrl,
          walletAddress: e.walletAddress,
          isVerified: e.isVerified,
          verifiedBadgeVisible: !1 !== e.verifiedBadgeVisible,
          xUsername:
            ((t = e.socials),
            t?.find(i)?.username.trim().replace(/^@/, "") || null),
          resolvedAvatarDecoration: e.resolvedAvatarDecoration ?? null,
          amountHeld: l,
          pnlUsd: o,
          pnlPercentage: d,
        };
      });
    },
  ]);
};
