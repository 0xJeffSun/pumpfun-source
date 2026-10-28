// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    s = e.i(445242);
  e.i(12692);
  var i = e.i(398902),
    n = e.i(574914),
    l = e.i(576766),
    r = e.i(915631),
    a = e.i(65996),
    o = e.i(471106),
    u = e.i(260095),
    c = e.i(695111),
    d = e.i(848651),
    m = e.i(65231);
  e.s(
    [
      "BountiesTrendingTabView",
      0,
      (e) => {
        let b,
          x,
          h,
          f,
          p,
          g,
          v,
          y,
          w,
          _,
          j,
          S,
          N,
          C,
          T,
          k = (0, s.c)(52),
          { initialTrendingFeed: E } = e,
          { t: O } = (0, i.f)();
        k[0] !== E
          ? ((b = { limit: 50, initialData: E }), (k[0] = E), (k[1] = b))
          : (b = k[1]);
        let { data: L, isLoading: I, isError: R } = (0, n.f)(b);
        k[2] !== L?.items
          ? ((x = L?.items ?? []), (k[2] = L?.items), (k[3] = x))
          : (x = k[3]);
        let U = x;
        k[4] !== U ? ((h = (0, o.L)(U)), (k[4] = U), (k[5] = h)) : (h = k[5]);
        let M = h,
          { bounties: P, liveTokens: q } = (0, u.E)(M);
        if (k[6] !== P) {
          for (let e of ((f = new Map()), P)) f.set(e.id, e);
          ((k[6] = P), (k[7] = f));
        } else f = k[7];
        let A = f;
        k[8] !== U ? ((p = (0, o.e)(U)), (k[8] = U), (k[9] = p)) : (p = k[9]);
        let B = p,
          F = B.length > 0;
        (k[10] !== F
          ? ((g = { enabled: F }), (k[10] = F), (k[11] = g))
          : (g = k[11]),
          k[12] !== B || k[13] !== g
            ? ((v = { userAddresses: B, queryOptions: g }),
              (k[12] = B),
              (k[13] = g),
              (k[14] = v))
            : (v = k[14]));
        let { data: D } = (0, l.f)(v);
        if (k[15] !== D) {
          for (let e of ((y = new Map()), D ?? []))
            y.set(e.address, {
              address: e.address,
              username: e.username ?? e.address.slice(0, 6),
              profileImage: e.profile_image ?? void 0,
            });
          ((k[15] = D), (k[16] = y));
        } else y = k[16];
        let K = y;
        if (k[17] !== A || k[18] !== q || k[19] !== K || k[20] !== U) {
          for (let e of ((w = []), U))
            if ("bounty" === e.type) {
              let t = A.get(e.bounty.taskId);
              if (!t) continue;
              w.push(
                (0, o.N)({
                  bounty: t,
                  resolvedTokens: q,
                  keyPrefix: "trending-bounty",
                }),
              );
            } else {
              let t = A.get(e.parentTaskId);
              if (!t) continue;
              w.push(
                (0, o.R)({
                  submission: e.submission,
                  bounty: t,
                  submitter: K.get(e.submission.requesterAddress),
                  isWinner: (0, o.J)(e.parentBounty, e.submission.submissionId),
                  keyPrefix: "trending-submission",
                }),
              );
            }
          ((k[17] = A), (k[18] = q), (k[19] = K), (k[20] = U), (k[21] = w));
        } else w = k[21];
        let Q = w;
        if (k[22] !== Q) {
          for (let e of ((_ = new Set()), Q)) {
            for (let t of e.bounty.rewardBreakdown)
              t.token?.mint && _.add(t.token.mint);
            e.bounty.token?.mint && _.add(e.bounty.token.mint);
          }
          ((k[22] = Q), (k[23] = _));
        } else _ = k[23];
        k[24] !== _ ? ((j = [..._]), (k[24] = _), (k[25] = j)) : (j = k[25]);
        let V = j;
        if (((0, r.f)(V, V.length > 0), R)) {
          let e, s, i, n, l;
          return (
            k[26] !== O
              ? ((e = O("web.bounties.feed_load_error")),
                (k[26] = O),
                (k[27] = e))
              : (e = k[27]),
            k[28] !== e
              ? ((s = (0, t.jsx)("h2", {
                  className: "text-base font-semibold text-text-primary",
                  children: e,
                })),
                (k[28] = e),
                (k[29] = s))
              : (s = k[29]),
            k[30] !== O
              ? ((i = O("web.bounties.feed_unavailable")),
                (k[30] = O),
                (k[31] = i))
              : (i = k[31]),
            k[32] !== i
              ? ((n = (0, t.jsx)("p", {
                  className: "mt-2 text-sm leading-6 text-text-secondary",
                  children: i,
                })),
                (k[32] = i),
                (k[33] = n))
              : (n = k[33]),
            k[34] !== s || k[35] !== n
              ? ((l = (0, t.jsxs)("div", {
                  className: "px-6 py-24 text-center",
                  children: [s, n],
                })),
                (k[34] = s),
                (k[35] = n),
                (k[36] = l))
              : (l = k[36]),
            l
          );
        }
        if (I) {
          let e, s;
          return (
            k[37] !== O
              ? ((e = O("web.bounties.loading_feed")), (k[37] = O), (k[38] = e))
              : (e = k[38]),
            k[39] !== e
              ? ((s = (0, t.jsx)(d.f, {
                  label: e,
                  masonryClassName: m.j,
                  viewMode: "grid",
                })),
                (k[39] = e),
                (k[40] = s))
              : (s = k[40]),
            s
          );
        }
        return (
          k[41] !== O
            ? ((S = O("home.bounties.trending_empty_subtitle")),
              (k[41] = O),
              (k[42] = S))
            : (S = k[42]),
          k[43] !== O
            ? ((N = O("home.bounties.trending_empty_title")),
              (k[43] = O),
              (k[44] = N))
            : (N = k[44]),
          k[45] === Symbol.for("react.memo_cache_sentinel")
            ? ((C = (0, a.f)({ filter: "bounty", view: "all" })), (k[45] = C))
            : (C = k[45]),
          k[46] !== Q ||
          k[47] !== q ||
          k[48] !== N ||
          k[49] !== C ||
          k[50] !== S
            ? ((T = (0, t.jsx)(c.f, {
                emptyDescription: S,
                emptyTitle: N,
                endOfFeedFooter: C,
                items: Q,
                masonryClassName: m.j,
                resolvedTokens: q,
                viewMode: "grid",
              })),
              (k[46] = Q),
              (k[47] = q),
              (k[48] = N),
              (k[49] = C),
              (k[50] = S),
              (k[51] = T))
            : (T = k[51]),
          T
        );
      },
    ],
    253306,
  );
};
