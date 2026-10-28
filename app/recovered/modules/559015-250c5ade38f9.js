// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(759257),
    r = e.i(361284);
  let n = (e) =>
    "TWITTER" ===
    e.provider
      .trim()
      .toUpperCase()
      .replace(/^SOCIAL_PROVIDER_/, "");
  async function i(e) {
    let {
      mint: r,
      limit: n = 50,
      offset: i = 0,
      includePositions: l = !1,
      chain: o,
      signal: s,
    } = e;
    return await (0, t.j)()("GET /followed-holders/{mint}", {
      params: { mint: r },
      query: {
        limit: n,
        offset: i,
        includePositions: l || void 0,
        ...(o ? { chain: o } : {}),
      },
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      signal: s,
      hooks: {
        afterResponse: [
          (e, t, r) => {
            if (!r.ok) throw new a(r.status);
          },
        ],
      },
    });
  }
  class a extends Error {
    status;
    constructor(e) {
      (super(`Failed to fetch followed holders: ${e}`),
        (this.name = "FollowedHoldersHttpError"),
        (this.status = e));
    }
  }
  let l = (e, t) => {
    let r = e.holders.filter((e) => !t(e));
    if (r.length === e.holders.length) return e;
    if (0 === r.length) return null;
    let n = e.holders.length - r.length;
    return { holders: r, totalCount: Math.max(e.totalCount - n, r.length) };
  };
  e.s([
    "A",
    0,
    5,
    "m",
    0,
    a,
    "i",
    0,
    (e, t) => (e && t ? l(e, (e) => e.userId === t) : e),
    "h",
    0,
    (e, t) => {
      if (!e || !t) return e;
      let r = t.toLowerCase();
      return l(e, (e) => e.username.toLowerCase() === r);
    },
    "D",
    0,
    i,
    "u",
    0,
    (e) => e instanceof a && (401 === e.status || 403 === e.status),
    "X",
    0,
    (e) => e instanceof a && 401 === e.status,
    "F",
    0,
    (e, t) => {
      let i = new Map();
      for (let e of t) {
        let t = i.get(e.userId) ?? [];
        (t.push(e), i.set(e.userId, t));
      }
      return e.map((e) => {
        var t;
        let a = i.get(e.userId) ?? [],
          l = a.length > 0 ? a.reduce((e, t) => e + t.amountHeld, 0) : null,
          o = a.map((e) => e.pnlUsd).filter((e) => null !== e),
          s = o.length > 0 ? o.reduce((e, t) => e + t, 0) : null,
          d = 1 === a.length ? (0, r.f)(a[0]?.pnlPercentage) : null;
        return {
          userId: e.userId,
          username: e.username,
          profileImageUrl: e.profileImageUrl,
          walletAddress: e.walletAddress,
          isVerified: e.isVerified,
          verifiedBadgeVisible: !1 !== e.verifiedBadgeVisible,
          xUsername:
            ((t = e.socials),
            t?.find(n)?.username.trim().replace(/^@/, "") || null),
          resolvedAvatarDecoration: e.resolvedAvatarDecoration ?? null,
          amountHeld: l,
          pnlUsd: s,
          pnlPercentage: d,
        };
      });
    },
  ]);
};
