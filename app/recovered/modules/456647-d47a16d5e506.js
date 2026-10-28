// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(462024),
    n = e.i(32850);
  let r = t.i.SOL.mint,
    i = t.i.USDC.mint;
  function s(e) {
    return e === r ? 9 : 6;
  }
  function o(e) {
    let t = e?.winnerCount;
    if (!e?.winners?.length) return { total: t ?? 0, claimed: 0 };
    let n = new Set(),
      r = 0;
    for (let t of e.winners) {
      let e = `${t.submissionId}|${t.mintAddress}`;
      !n.has(e) && (n.add(e), t.claimedAt && r++);
    }
    return { total: t ?? n.size, claimed: r };
  }
  function d(e) {
    if (
      !e.viewerAddress ||
      e.viewerAddress.toLowerCase() !== e.creatorAddress.toLowerCase()
    )
      return "none";
    let t = e.resolution;
    if (!t || ("REFUND" !== t.outcomeType && "SPLIT" !== t.outcomeType))
      return "none";
    let n = t.refundClaims ?? [],
      r = e.viewerAddress.toLowerCase();
    return n.some((e) => e.depositor.toLowerCase() === r)
      ? "claimed"
      : "pending";
  }
  function a(e) {
    let t = e.trim();
    if (!t) return { summary: "", description: [] };
    let n = t
        .split(/\n\s*\n/)
        .map((e) => e.trim())
        .filter(Boolean),
      r = n[0] ?? t,
      i = r.split("\n", 1)[0]?.trim() ?? r;
    return {
      summary: i.length > 160 ? `${i.slice(0, 157).trimEnd()}…` : i,
      description: n,
    };
  }
  function u(e) {
    return "CLOSED" === e.status
      ? e.resolution?.outcomeType === "WINNER_PAYOUT" ||
        e.resolution?.outcomeType === "SPLIT"
        ? "done"
        : "closed"
      : "open";
  }
  function l(e) {
    let t = Date.parse(e);
    return Number.isNaN(t) ? e : new Date(t + 6048e5).toISOString();
  }
  function m(e) {
    let t = e.rewardLegs.flatMap((e) =>
        c({
          amountAtomic: e.amountAtomic,
          decimals: e.decimalsSnapshot,
          mintAddress: e.mintAddress,
          symbolSnapshot: e.symbolSnapshot,
        }),
      ),
      n = e.rewardLegs[0];
    if (!n) return { reward: 0, currency: "USDC", rewardBreakdown: t };
    let s = n.decimalsSnapshot ?? 0,
      o = f(n.amountAtomic ?? "0", s);
    return n.mintAddress === r
      ? { reward: o, currency: "SOL", rewardTokenAmount: o, rewardBreakdown: t }
      : n.mintAddress === i
        ? {
            reward: o,
            currency: "USDC",
            rewardTokenAmount: o,
            rewardBreakdown: t,
          }
        : {
            reward: o,
            currency: "USDC",
            rewardTokenAmount: o,
            rewardToken: n.mintAddress
              ? {
                  id: n.mintAddress,
                  mint: n.mintAddress,
                  name: n.symbolSnapshot ?? n.mintAddress,
                  symbol: n.symbolSnapshot ?? n.mintAddress.slice(0, 4),
                  imageUri: "",
                }
              : void 0,
            rewardBreakdown: t,
          };
  }
  function c(e) {
    let n = f(e.amountAtomic ?? "0", e.decimals ?? 0);
    if (n <= 0) return [];
    switch (e.mintAddress) {
      case r:
        return [{ amount: n, currency: "SOL", token: { ...t.i.SOL } }];
      case i:
        return [{ amount: n, currency: "USDC", token: { ...t.i.USDC } }];
      default:
        return [
          {
            amount: n,
            currency: "USDC",
            token: e.mintAddress
              ? {
                  id: e.mintAddress,
                  mint: e.mintAddress,
                  name: e.symbolSnapshot ?? e.mintAddress,
                  symbol: e.symbolSnapshot ?? e.mintAddress.slice(0, 4),
                  imageUri: "",
                }
              : void 0,
          },
        ];
    }
  }
  function f(e, t) {
    if (!/^\d+$/.test(e)) return 0;
    if (t <= 0) {
      let t = Number(e);
      return Number.isFinite(t) ? t : 0;
    }
    let n = e.padStart(t + 1, "0"),
      r = n.slice(0, n.length - t),
      i = n.slice(n.length - t),
      s = Number(`${r}.${i}`);
    return Number.isFinite(s) ? s : 0;
  }
  function w(e, t) {
    let n = t?.username?.trim(),
      r = t?.userId;
    return {
      address: e,
      id: t?.address ?? e,
      ...(r ? { creatorUserId: r } : {}),
      username: n && n.length > 0 ? n : null,
      profileImage: t?.profile_image ?? "",
      rating: 0,
    };
  }
  function p(e, t) {
    if (e)
      return {
        id: e,
        mint: e,
        name: t?.name ?? e,
        symbol: t?.symbol ?? e.slice(0, 4),
        imageUri: t?.imageUri ?? "",
      };
  }
  e.s([
    "x",
    0,
    function (e, t) {
      let r = new Map();
      if (!e?.awards?.length) return r;
      let i = new Map();
      for (let e of t)
        null != e.mintAddress &&
          null != e.decimalsSnapshot &&
          i.set(e.mintAddress, e.decimalsSnapshot);
      for (let s of e.awards) {
        let e = t.find((e) => e.mintAddress === s.mintAddress),
          o =
            i.get(s.mintAddress) ??
            (e ? (0, n.Q)(e) : (0, n.K)(s.mintAddress, void 0, t)),
          d = c({
            amountAtomic: s.amountAtomic,
            decimals: o,
            mintAddress: s.mintAddress,
            symbolSnapshot: e?.symbolSnapshot,
          })[0];
        if (!d) continue;
        let a = r.get(s.submissionId) ?? [];
        (a.push(d), r.set(s.submissionId, a));
      }
      return r;
    },
    "i",
    0,
    function (e) {
      let {
        viewerAddress: t,
        winners: n,
        winnerBreakdownsBySubmissionId: r,
      } = e;
      if (!t || !n?.length) return;
      let i = t.toLowerCase(),
        s = new Set(
          n
            .filter((e) => e.address.toLowerCase() === i)
            .map((e) => e.submissionId),
        );
      if (0 === s.size) return;
      let o = new Map();
      for (let e of s)
        for (let t of r.get(e) ?? []) {
          let e = t.token?.mint ?? t.currency,
            n = o.get(e);
          n ? o.set(e, { ...n, amount: n.amount + t.amount }) : o.set(e, t);
        }
      let d = [...o.values()];
      return d.length > 0 ? d : void 0;
    },
    "P",
    0,
    function (e, t) {
      let r = new Map();
      if (!e) return r;
      let i = new Map();
      for (let e of t)
        null != e.mintAddress &&
          null != e.decimalsSnapshot &&
          i.set(e.mintAddress, e.decimalsSnapshot);
      for (let s of e) {
        let e = t.find((e) => e.mintAddress === s.mintAddress),
          o =
            i.get(s.mintAddress) ??
            (e ? (0, n.Q)(e) : (0, n.K)(s.mintAddress, void 0, t)),
          d = c({
            amountAtomic: s.amountToPayAtomic,
            decimals: o,
            mintAddress: s.mintAddress,
            symbolSnapshot: e?.symbolSnapshot,
          })[0];
        if (!d) continue;
        let a = r.get(s.submissionId) ?? [];
        (a.push(d), r.set(s.submissionId, a));
      }
      return r;
    },
    "$",
    0,
    o,
    "j",
    0,
    function (e, t, n = {}) {
      let { summary: o, description: d } = a(e.bodyMarkdown),
        u = [...e.criteria]
          .sort((e, t) => e.order - t.order)
          .map((e) => e.text),
        m = (function (e) {
          let t = e.intendedPools.flatMap((e) =>
              c({
                amountAtomic: e.amountAtomic,
                decimals: s(e.mintAddress),
                mintAddress: e.mintAddress,
              }),
            ),
            n = e.intendedPools[0];
          if (!n) return { reward: 0, currency: "USDC", rewardBreakdown: t };
          let o = s(n.mintAddress),
            d = f(n.amountAtomic, o);
          return n.mintAddress === r
            ? {
                reward: d,
                currency: "SOL",
                rewardTokenAmount: d,
                rewardBreakdown: t,
              }
            : n.mintAddress === i
              ? {
                  reward: d,
                  currency: "USDC",
                  rewardTokenAmount: d,
                  rewardBreakdown: t,
                }
              : {
                  reward: d,
                  currency: "USDC",
                  rewardTokenAmount: d,
                  rewardToken: {
                    id: n.mintAddress,
                    mint: n.mintAddress,
                    name: n.mintAddress,
                    symbol: n.mintAddress.slice(0, 4),
                    imageUri: "",
                  },
                  rewardBreakdown: t,
                };
        })(e),
        b = e.expiresAt ?? l(e.createdAt),
        A = w(t, n.creatorUser),
        h = p(e.coinAddress, n.coinMeta);
      return {
        id: e.taskId,
        title: e.title,
        summary: o,
        tags: [],
        description: d,
        descriptionMarkdown: e.bodyMarkdown.trim(),
        deliverables: u,
        rewardDistribution: e.rewardDistribution,
        reward: m.reward,
        currency: m.currency,
        rewardTokenAmount: m.rewardTokenAmount,
        rewardToken: m.rewardToken,
        rewardBreakdown: m.rewardBreakdown,
        status: "open",
        createdAt: e.createdAt,
        expiresAt: b,
        submissionCount: 0,
        creator: A,
        token: h,
        attachments: e.attachments ?? [],
        acceptsSubmissions: !1,
        allowsSubmissionMutations: !1,
        likeCount: 0,
        viewerLiked: void 0,
        winnerCount: 0,
        claimedWinnerCount: 0,
        viewerIsCreator: !0,
        refundStatus: "none",
        resolution: void 0,
      };
    },
    "c",
    0,
    function (e, n = {}) {
      let r = m({ rewardLegs: e.rewardLegs }),
        i = u({ status: e.status, resolution: e.resolution }),
        s =
          e.expiresAt ??
          l(e.publishedAt ?? e.fundedAt ?? new Date().toISOString()),
        a = !!e.resolution,
        c = (0, t.u)({
          status: i,
          expiresAt: s,
          hasResolution: a,
          moderationStatus: e.moderationStatus,
          payoutMode: e.payoutMode,
        }),
        f = (0, t.Q)({ status: i, hasResolution: a, payoutMode: e.payoutMode }),
        b = w(e.creatorAddress, n.creatorUser),
        A = p(e.coinAddress, n.coinMeta),
        h = o(e.resolution),
        g = !!(
          n.viewerAddress &&
          n.viewerAddress.toLowerCase() === e.creatorAddress.toLowerCase()
        ),
        y = d({
          resolution: e.resolution,
          viewerAddress: n.viewerAddress,
          creatorAddress: e.creatorAddress,
        });
      return {
        id: e.taskId,
        title: e.title,
        summary: "",
        tags: [],
        description: [],
        deliverables: [],
        reward: r.reward,
        currency: r.currency,
        rewardTokenAmount: r.rewardTokenAmount,
        rewardToken: r.rewardToken,
        rewardBreakdown: r.rewardBreakdown,
        status: i,
        createdAt: e.publishedAt ?? e.fundedAt ?? new Date().toISOString(),
        expiresAt: s,
        submissionCount: e.counts.submissionCount,
        creator: b,
        token: A,
        attachments: [],
        acceptsSubmissions: c,
        allowsSubmissionMutations: f,
        likeCount: 0,
        viewerLiked: void 0,
        winnerCount: h.total,
        claimedWinnerCount: h.claimed,
        viewerIsCreator: g,
        refundStatus: y,
        resolution: e.resolution,
        moderationStatus: e.moderationStatus,
        banInfo: e.banInfo,
        unbanInfo: e.unbanInfo,
        nsfwInfo: e.nsfwInfo,
        unNsfwInfo: e.unNsfwInfo,
        rewardTotalUsd: e.rewardTotalUsd,
        rewardLegsUsd: e.rewardLegsUsd,
        rewardPricedAt: e.rewardPricedAt,
        rewardLegSnapshots: e.rewardLegs.map((e) => ({
          mintAddress: e.mintAddress,
          decimalsSnapshot: e.decimalsSnapshot,
        })),
      };
    },
    "m",
    0,
    function (e, n = {}) {
      let { summary: r, description: i } = a(e.bodyMarkdown),
        s = [...e.criteria]
          .sort((e, t) => e.order - t.order)
          .map((e) => e.text),
        c = m({ rewardLegs: e.rewardLegs }),
        f = u({ status: e.status, resolution: e.resolution }),
        b = e.expiresAt ?? l(e.createdAt),
        A = e.publishedAt ?? e.fundedAt ?? e.createdAt,
        h = !!e.resolution,
        g = (0, t.u)({
          status: f,
          expiresAt: b,
          hasResolution: h,
          moderationStatus: e.moderationStatus,
          payoutMode: e.payoutMode,
        }),
        y = (0, t.Q)({ status: f, hasResolution: h, payoutMode: e.payoutMode }),
        S = w(e.creatorAddress, n.creatorUser),
        U = p(e.coinAddress, n.coinMeta),
        $ = o(e.resolution),
        k = !!(
          n.viewerAddress &&
          n.viewerAddress.toLowerCase() === e.creatorAddress.toLowerCase()
        ),
        v = d({
          resolution: e.resolution,
          viewerAddress: n.viewerAddress,
          creatorAddress: e.creatorAddress,
        });
      return {
        id: e.taskId,
        title: e.title,
        summary: r,
        tags: [],
        description: i,
        descriptionMarkdown: e.bodyMarkdown.trim(),
        deliverables: s,
        rewardDistribution: e.rewardDistribution,
        reward: c.reward,
        currency: c.currency,
        rewardTokenAmount: c.rewardTokenAmount,
        rewardToken: c.rewardToken,
        rewardBreakdown: c.rewardBreakdown,
        status: f,
        createdAt: A,
        expiresAt: b,
        submissionCount: e.counts.submissionCount,
        creator: S,
        token: U,
        attachments: e.attachments ?? [],
        acceptsSubmissions: g,
        allowsSubmissionMutations: y,
        likeCount: e.likeCount,
        viewerLiked: e.viewerLiked,
        winnerCount: $.total,
        claimedWinnerCount: $.claimed,
        viewerIsCreator: k,
        refundStatus: v,
        resolution: e.resolution,
        moderationStatus: e.moderationStatus,
        banInfo: e.banInfo,
        unbanInfo: e.unbanInfo,
        isNsfw: e.isNsfw,
        nsfwInfo: e.nsfwInfo,
        unNsfwInfo: e.unNsfwInfo,
        rewardTotalUsd: e.rewardTotalUsd,
        rewardLegsUsd: e.rewardLegsUsd,
        rewardPricedAt: e.rewardPricedAt,
        rewardLegSnapshots: e.rewardLegs.map((e) => ({
          mintAddress: e.mintAddress,
          decimalsSnapshot: e.decimalsSnapshot,
        })),
      };
    },
  ]);
};
