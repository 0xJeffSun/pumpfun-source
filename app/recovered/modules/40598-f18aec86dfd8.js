// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    s = e.i(445242),
    r = e.i(352386);
  e.i(12692);
  var n = e.i(398902),
    i = e.i(944410),
    l = e.i(761459),
    o = e.i(38279),
    a = e.i(711902);
  function u(e) {
    return e.nextCursor ?? void 0;
  }
  var d = e.i(576766),
    c = e.i(915631),
    f = e.i(471106),
    m = e.i(674865),
    b = e.i(526372),
    g = e.i(51447),
    p = e.i(144687),
    h = e.i(260095),
    x = e.i(695111),
    y = e.i(158791);
  let w = ({
      items: e,
      filters: t,
      parentBountyByTaskId: s,
      now: r = Date.now(),
    }) =>
      e.filter((e) => {
        let n,
          i,
          l = s.get(e.bounty.id);
        return (
          !!l &&
          (!(n = t.q.trim().toLowerCase()) ||
            [
              l.title,
              e.submission.bodyMarkdown,
              e.bounty.title,
              e.submitter?.username,
            ]
              .filter(Boolean)
              .join("\n")
              .toLowerCase()
              .includes(n)) &&
          ((e, t) => {
            if (0 === t.length) return !0;
            let s = (0, y.v)(e.status, e.expiresAt);
            return "DRAFT" !== s && t.includes(s);
          })(l, t.statuses) &&
          ((e, t) => {
            if (0 === t.length) return !0;
            let s = (0, g.X)(e.submission, e.isWinner);
            return t.includes(s);
          })(e, t.submissionStatuses) &&
          ((e, t) => {
            if (0 === t.length) return !0;
            let s = new Set(
              e.rewardLegs.map((e) => e.mintAddress).filter((e) => !!e),
            );
            return (
              e.coinAddress && s.add(e.coinAddress),
              t.some((e) => s.has(y.h[e]))
            );
          })(l, t.rewardTokens) &&
          (null == (i = l.rewardTotalUsd) ||
            ((null == t.rewardUsdMin ||
              !(t.rewardUsdMin > 0) ||
              !(i < t.rewardUsdMin)) &&
              (null == t.rewardUsdMax ||
                !(t.rewardUsdMax < y.V.max) ||
                !(i > t.rewardUsdMax)))) &&
          ((e, t, s) => {
            if (!t || !e.expiresAt) return !0;
            let r = Date.parse(e.expiresAt);
            if (Number.isNaN(r)) return !0;
            let n = r - s;
            switch (t) {
              case "lt-24h":
                return n > 0 && n <= 864e5;
              case "lt-3d":
                return n > 0 && n <= 2592e5;
              case "lt-7d":
                return n > 0 && n <= 6048e5;
              case "gte-7d":
                return n > 6048e5;
              default:
                return !0;
            }
          })(l, t.timeLeft, r)
        );
      }),
    _ = (e, t) => {
      let s = new Set(),
        r = [];
      for (let n of e) {
        let e = t.get(n.bounty.id);
        !e || s.has(e.taskId) || (s.add(e.taskId), r.push(e));
      }
      return r;
    };
  function v(e) {
    return e.items;
  }
  function T(e) {
    return "submission" === e.type;
  }
  e.s(
    [
      "BountiesSubmissionsTabView",
      0,
      (e) => {
        let y,
          N,
          M,
          S,
          j,
          k,
          I,
          L,
          R,
          U,
          A,
          C,
          B,
          E,
          O,
          D,
          P,
          q,
          F,
          K,
          J,
          Z,
          z,
          G,
          Q,
          V,
          W,
          H = (0, s.c)(99),
          {
            viewMode: X,
            sortKey: Y,
            filters: $,
            onFilterFacetsChange: ee,
            onTimeLeftCountsChange: et,
          } = e,
          { t: es } = (0, n.f)();
        H[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((y = { limit: 24 }), (H[0] = y))
          : (y = H[0]);
        let {
          data: er,
          isLoading: en,
          isError: ei,
          isFetchingNextPage: el,
          hasNextPage: eo,
          fetchNextPage: ea,
        } = ((e) => {
          let t,
            r,
            n = (0, s.c)(7),
            { limit: d, enabled: c } = void 0 === e ? {} : e,
            f = void 0 === c || c,
            m = (0, i.useLivestreamApiClient)(),
            b = o.Q.BOUNTY_RECENT_SUBMISSIONS_FEED_INFINITE({ limit: d });
          return (
            n[0] !== m || n[1] !== d
              ? ((t = async (e) => {
                  let { pageParam: t } = e,
                    s = {};
                  (null != d && (s.limit = String(d)),
                    null != t && "" !== t && (s.cursor = t));
                  let r = await m
                    .get("bounties/feed/recent/submissions", {
                      searchParams: s,
                    })
                    .json();
                  return a.T.parse(r);
                }),
                (n[0] = m),
                (n[1] = d),
                (n[2] = t))
              : (t = n[2]),
            n[3] !== f || n[4] !== b || n[5] !== t
              ? ((r = {
                  enabled: f,
                  queryKey: b,
                  initialPageParam: void 0,
                  queryFn: t,
                  getNextPageParam: u,
                }),
                (n[3] = f),
                (n[4] = b),
                (n[5] = t),
                (n[6] = r))
              : (r = n[6]),
            (0, l.useInfiniteQuery)(r)
          );
        })(y);
        (er?.pages,
          H[1] !== er?.pages
            ? ((N = er?.pages.flatMap(v) ?? []), (H[1] = er?.pages), (H[2] = N))
            : (N = H[2]));
        let eu = N;
        H[3] !== eu
          ? ((M = (0, f.L)(eu)), (H[3] = eu), (H[4] = M))
          : (M = H[4]);
        let ed = M;
        if (H[5] !== eu) {
          for (let e of ((S = new Map()), eu))
            "submission" === e.type && S.set(e.parentTaskId, e.parentBounty);
          ((H[5] = eu), (H[6] = S));
        } else S = H[6];
        let ec = S,
          { bounties: ef, liveTokens: em } = (0, h.E)(ed);
        if (H[7] !== ef) {
          for (let e of ((j = new Map()), ef)) j.set(e.id, e);
          ((H[7] = ef), (H[8] = j));
        } else j = H[8];
        let eb = j;
        H[9] !== eu
          ? ((k = (0, f.e)(eu)), (H[9] = eu), (H[10] = k))
          : (k = H[10]);
        let eg = k,
          ep = eg.length > 0;
        (H[11] !== ep
          ? ((I = { enabled: ep }), (H[11] = ep), (H[12] = I))
          : (I = H[12]),
          H[13] !== eg || H[14] !== I
            ? ((L = { userAddresses: eg, queryOptions: I }),
              (H[13] = eg),
              (H[14] = I),
              (H[15] = L))
            : (L = H[15]));
        let { data: eh } = (0, d.f)(L);
        if (H[16] !== eh) {
          for (let e of ((R = new Map()), eh ?? []))
            R.set(e.address, {
              address: e.address,
              username: e.username ?? e.address.slice(0, 6),
              profileImage: e.profile_image ?? void 0,
            });
          ((H[16] = eh), (H[17] = R));
        } else R = H[17];
        let ex = R;
        if (H[18] !== eb || H[19] !== ex || H[20] !== eu) {
          for (let e of ((U = []), eu)) {
            if ("submission" !== e.type) continue;
            let t = eb.get(e.parentTaskId);
            t &&
              U.push(
                (0, f.R)({
                  submission: e.submission,
                  bounty: t,
                  submitter: ex.get(e.submission.requesterAddress),
                  isWinner: (0, f.J)(e.parentBounty, e.submission.submissionId),
                  keyPrefix: "recent-submission",
                }),
              );
          }
          ((H[18] = eb), (H[19] = ex), (H[20] = eu), (H[21] = U));
        } else U = H[21];
        let ey = U;
        H[22] !== ey
          ? ((A = ey.filter(T)), (H[22] = ey), (H[23] = A))
          : (A = H[23]);
        let ew = A;
        H[24] !== $ || H[25] !== ec || H[26] !== ew
          ? ((C = w({
              items: ew,
              filters: (0, g.Z)((0, g.h)($)),
              parentBountyByTaskId: ec,
            })),
            (H[24] = $),
            (H[25] = ec),
            (H[26] = ew),
            (H[27] = C))
          : (C = H[27]);
        let e_ = C;
        H[28] !== $ || H[29] !== ec || H[30] !== ew
          ? ((B = w({
              items: ew,
              filters: (0, g.Z)($),
              parentBountyByTaskId: ec,
            })),
            (H[28] = $),
            (H[29] = ec),
            (H[30] = ew),
            (H[31] = B))
          : (B = H[31]);
        let ev = B;
        H[32] !== e_ || H[33] !== ec
          ? ((E = _(e_, ec)), (H[32] = e_), (H[33] = ec), (H[34] = E))
          : (E = H[34]);
        let eT = E;
        H[35] !== ev || H[36] !== ec
          ? ((O = _(ev, ec)), (H[35] = ev), (H[36] = ec), (H[37] = O))
          : (O = H[37]);
        let eN = O;
        H[38] !== eT
          ? ((D = eT.length > 0 ? (0, g.k)(eT) : void 0),
            (H[38] = eT),
            (H[39] = D))
          : (D = H[39]);
        let eM = D;
        H[40] !== eN
          ? ((P = (0, g.t)(eN)), (H[40] = eN), (H[41] = P))
          : (P = H[41]);
        let eS = P;
        if (
          ((0, p.T)(eM, ee, p.w),
          (0, p.T)(eS, et, p.G),
          H[42] !== $ || H[43] !== ec || H[44] !== Y || H[45] !== ew)
        ) {
          var ej;
          let e;
          ((ej = w({
            items: ew,
            filters: (0, g.Z)($),
            parentBountyByTaskId: ec,
          })),
            (e = [...ej]).sort((e, t) => {
              switch (Y) {
                case "reward-desc":
                  return (
                    (t.bounty.rewardTotalUsd ?? 0) -
                    (e.bounty.rewardTotalUsd ?? 0)
                  );
                case "reward-asc":
                  return (
                    (e.bounty.rewardTotalUsd ?? 0) -
                    (t.bounty.rewardTotalUsd ?? 0)
                  );
                case "submissions-desc":
                  return t.submission.likeCount - e.submission.likeCount;
                case "time-asc":
                  return (
                    Date.parse(e.bounty.expiresAt) -
                    Date.parse(t.bounty.expiresAt)
                  );
                default:
                  return t.timestamp - e.timestamp;
              }
            }),
            (q = e),
            (H[42] = $),
            (H[43] = ec),
            (H[44] = Y),
            (H[45] = ew),
            (H[46] = q));
        } else q = H[46];
        let ek = q;
        H[47] !== ea || H[48] !== eo || H[49] !== el
          ? ((F = { hasMore: eo, isLoading: el, onLoadMore: ea }),
            (H[47] = ea),
            (H[48] = eo),
            (H[49] = el),
            (H[50] = F))
          : (F = H[50]);
        let { sentinelRef: eI } = (0, b.f)(F);
        if (
          (H[51] !== ey.length ||
          H[52] !== ea ||
          H[53] !== eo ||
          H[54] !== el ||
          H[55] !== ek.length
            ? ((K = () => {
                ek.length > 0 || 0 === ey.length || (eo && !el && ea());
              }),
              (J = [ey.length, ea, eo, el, ek.length]),
              (H[51] = ey.length),
              (H[52] = ea),
              (H[53] = eo),
              (H[54] = el),
              (H[55] = ek.length),
              (H[56] = K),
              (H[57] = J))
            : ((K = H[56]), (J = H[57])),
          (0, r.useEffect)(K, J),
          H[58] !== ek)
        ) {
          for (let e of ((Z = new Set()), ek)) {
            for (let t of e.bounty.rewardBreakdown)
              t.token?.mint && Z.add(t.token.mint);
            e.bounty.token?.mint && Z.add(e.bounty.token.mint);
          }
          ((H[58] = ek), (H[59] = Z));
        } else Z = H[59];
        H[60] !== Z ? ((z = [...Z]), (H[60] = Z), (H[61] = z)) : (z = H[61]);
        let eL = z;
        (0, c.f)(eL, eL.length > 0);
        let eR = 0 === ek.length && ey.length > 0 && el && !!eo;
        if (ei) {
          let e, s, r, n, i;
          return (
            H[62] !== es
              ? ((e = es("web.bounties.submissions_load_error")),
                (H[62] = es),
                (H[63] = e))
              : (e = H[63]),
            H[64] !== e
              ? ((s = (0, t.jsx)("h2", {
                  className: "text-base font-semibold text-text-primary",
                  children: e,
                })),
                (H[64] = e),
                (H[65] = s))
              : (s = H[65]),
            H[66] !== es
              ? ((r = es("web.bounties.try_refreshing")),
                (H[66] = es),
                (H[67] = r))
              : (r = H[67]),
            H[68] !== r
              ? ((n = (0, t.jsx)("p", {
                  className: "mt-2 text-sm leading-6 text-text-secondary",
                  children: r,
                })),
                (H[68] = r),
                (H[69] = n))
              : (n = H[69]),
            H[70] !== s || H[71] !== n
              ? ((i = (0, t.jsxs)("div", {
                  className: "px-6 py-24 text-center",
                  children: [s, n],
                })),
                (H[70] = s),
                (H[71] = n),
                (H[72] = i))
              : (i = H[72]),
            i
          );
        }
        if (en) {
          let e, s;
          return (
            H[73] !== es
              ? ((e = es("web.bounties.loading_submissions_ellipsis")),
                (H[73] = es),
                (H[74] = e))
              : (e = H[74]),
            H[75] !== e
              ? ((s = (0, t.jsx)("div", {
                  className:
                    "px-6 py-24 text-center text-sm text-text-tertiary",
                  children: e,
                })),
                (H[75] = e),
                (H[76] = s))
              : (s = H[76]),
            s
          );
        }
        if (eR) {
          let e, s;
          return (
            H[77] !== es
              ? ((e = es("web.bounties.finding_submissions")),
                (H[77] = es),
                (H[78] = e))
              : (e = H[78]),
            H[79] !== e
              ? ((s = (0, t.jsx)("div", {
                  className:
                    "px-6 py-24 text-center text-sm text-text-tertiary",
                  children: e,
                })),
                (H[79] = e),
                (H[80] = s))
              : (s = H[80]),
            s
          );
        }
        (H[81] !== ey.length || H[82] !== es
          ? ((G = es(
              0 === ey.length
                ? "web.bounties.submissions_feed_empty_description"
                : "web.bounties.loosen_filters",
            )),
            (H[81] = ey.length),
            (H[82] = es),
            (H[83] = G))
          : (G = H[83]),
          H[84] !== ey.length || H[85] !== es
            ? ((Q = es(
                0 === ey.length
                  ? "home.bounties.submissions_empty_title"
                  : "web.bounties.no_submissions_match_filters",
              )),
              (H[84] = ey.length),
              (H[85] = es),
              (H[86] = Q))
            : (Q = H[86]));
        let eU = !!eo;
        return (
          H[87] !== el || H[88] !== eI || H[89] !== eU || H[90] !== ek.length
            ? ((V = (0, t.jsx)(m.f, {
                hasMore: eU,
                isLoading: el,
                itemLabel: "submissions",
                sentinelRef: eI,
                visibleCount: ek.length,
              })),
              (H[87] = el),
              (H[88] = eI),
              (H[89] = eU),
              (H[90] = ek.length),
              (H[91] = V))
            : (V = H[91]),
          H[92] !== em ||
          H[93] !== G ||
          H[94] !== Q ||
          H[95] !== V ||
          H[96] !== X ||
          H[97] !== ek
            ? ((W = (0, t.jsx)(x.f, {
                disableHoverCards: !0,
                emptyDescription: G,
                emptyTitle: Q,
                feedKind: "submissions",
                footer: V,
                items: ek,
                resolvedTokens: em,
                viewMode: X,
              })),
              (H[92] = em),
              (H[93] = G),
              (H[94] = Q),
              (H[95] = V),
              (H[96] = X),
              (H[97] = ek),
              (H[98] = W))
            : (W = H[98]),
          W
        );
      },
    ],
    40598,
  );
};
