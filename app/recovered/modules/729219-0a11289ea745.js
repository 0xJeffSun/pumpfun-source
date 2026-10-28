// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(426091);
  e.i(12692);
  var i = e.i(398902),
    s = e.i(239913);
  e.s(
    [
      "f",
      0,
      function (e) {
        let a,
          o,
          l,
          u,
          d,
          c,
          f,
          m = (0, r.c)(16),
          { className: p } = e,
          { t: w } = (0, i.f)();
        return (
          m[0] !== w
            ? ((a = w("web.bounties.nsfw_marked")), (m[0] = w), (m[1] = a))
            : (a = m[1]),
          m[2] !== p
            ? ((o = (0, n.c)(
                "inline-flex shrink-0 items-center gap-1 rounded-md border border-border-secondary bg-bg-secondary px-1.5 py-0.5",
                p,
              )),
              (m[2] = p),
              (m[3] = o))
            : (o = m[3]),
          m[4] !== w
            ? ((l = w("web.bounties.nsfw_marked_title")),
              (m[4] = w),
              (m[5] = l))
            : (l = m[5]),
          m[6] === Symbol.for("react.memo_cache_sentinel")
            ? ((u = (0, t.jsx)(s.f, {})), (m[6] = u))
            : (u = m[6]),
          m[7] !== w
            ? ((d = w("web.bounties.nsfw_badge")), (m[7] = w), (m[8] = d))
            : (d = m[8]),
          m[9] !== d
            ? ((c = (0, t.jsx)("span", {
                className:
                  "text-[10px] font-semibold leading-none text-text-tertiary",
                children: d,
              })),
              (m[9] = d),
              (m[10] = c))
            : (c = m[10]),
          m[11] !== a || m[12] !== o || m[13] !== l || m[14] !== c
            ? ((f = (0, t.jsxs)("span", {
                "aria-label": a,
                className: o,
                title: l,
                children: [u, c],
              })),
              (m[11] = a),
              (m[12] = o),
              (m[13] = l),
              (m[14] = c),
              (m[15] = f))
            : (f = m[15]),
          f
        );
      },
    ],
    729219,
  );
  var a = e.i(32850);
  function o(e, t = Date.now()) {
    let r = Date.parse(e.expiresAt);
    if (!Number.isFinite(r)) return !1;
    let n = r - t;
    return n > 0 && n <= 864e5;
  }
  function l(e) {
    return (
      0 !== e.winnerCount && ("open" !== e.status || !!e.resolution?.payedOutAt)
    );
  }
  let u = (e) => {
      if (!e || !/^\d+$/.test(e)) return BigInt(0);
      try {
        return BigInt(e);
      } catch {
        return BigInt(0);
      }
    },
    d = (e, t, r) => {
      let n = new Map();
      for (let e of t.perLeg) e.priced && n.set(e.mintAddress, e.priceUsd);
      let i = 0;
      for (let [t, s] of e) {
        let e = n.get(t);
        e &&
          s !== BigInt(0) &&
          (i += (0, a.i)(s.toString(), (0, a.K)(t, void 0, r)) * e);
      }
      return i;
    };
  e.s(
    [
      "c",
      0,
      function (e) {
        let t = (0, a.t)(e.bounty ?? { rewardLegSnapshots: [] }, e.rewardLegs),
          r = new Map();
        for (let t of e.refunds)
          t.pendingAmountAtomic !== BigInt(0) &&
            r.set(
              t.mintAddress,
              (r.get(t.mintAddress) ?? BigInt(0)) + t.pendingAmountAtomic,
            );
        return d(r, e.liveUsd, t);
      },
      "J",
      0,
      function (e) {
        let { bounty: t, viewerAddress: r, liveUsd: n } = e,
          i = (0, a.t)(t, e.rewardLegs),
          s = t.resolution?.winners;
        if (!s?.length || !r) return 0;
        let o = r.toLowerCase(),
          l = new Map();
        for (let e of s) {
          if (e.address.toLowerCase() !== o) continue;
          let t = u(e.amountToPayAtomic);
          t !== BigInt(0) &&
            l.set(e.mintAddress, (l.get(e.mintAddress) ?? BigInt(0)) + t);
        }
        return d(l, n, i);
      },
      "r",
      0,
      function (e) {
        let { bounty: t, submissionId: r, liveUsd: n } = e,
          i = (0, a.t)(t, e.rewardLegs),
          s = t.resolution?.winners;
        if (!s?.length) return 0;
        let o = new Map();
        for (let e of s) {
          if (e.submissionId !== r) continue;
          let t = u(e.amountToPayAtomic);
          t !== BigInt(0) &&
            o.set(e.mintAddress, (o.get(e.mintAddress) ?? BigInt(0)) + t);
        }
        return d(o, n, i);
      },
      "P",
      0,
      o,
      "p",
      0,
      l,
      "I",
      0,
      function (e, t, r = !1) {
        if (r) return { tone: "draft" };
        let n = e.winnerCount > 0;
        return l(e)
          ? { tone: "winner", label: "PAID" }
          : n
            ? { tone: "pending", label: "RESOLVING" }
            : "PENDING_REVIEW" === e.moderationStatus
              ? { tone: "review", label: "IN REVIEW" }
              : "closed" === e.status || "done" === e.status
                ? { tone: "draft", label: "CLOSED" }
                : t && o(e)
                  ? { tone: "endingSoon", label: "ENDING SOON" }
                  : t
                    ? { tone: "open", label: "OPEN" }
                    : { tone: "pending", label: "PENDING" };
      },
      "m",
      0,
      function (e) {
        return e.isPublished
          ? e.isWinner
            ? e.isParentPaidOut
              ? { tone: "winner", label: "PAID" }
              : { tone: "pending", label: "RESOLVING" }
            : e.isPendingReview
              ? { tone: "review", label: "IN REVIEW" }
              : { tone: "submission", label: "SUBMISSION" }
          : { tone: "draft" };
      },
    ],
    288361,
  );
};
