// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242);
  e.i(12692);
  var n = e.i(398902),
    s = e.i(695111),
    i = e.i(848651),
    l = e.i(471106),
    a = e.i(260095),
    o = e.i(170258),
    c = e.i(915631),
    u = e.i(51447),
    d = e.i(158791),
    f = e.i(144687),
    x = e.i(674865);
  let b = (e) => {
    let s,
      i,
      l,
      a,
      o,
      c = (0, r.c)(12),
      { nearMeActive: u } = e,
      d = void 0 !== u && u,
      { t: f } = (0, n.f)();
    return (
      c[0] !== f
        ? ((s = f("web.bounties.no_bounties_match_filters")),
          (c[0] = f),
          (c[1] = s))
        : (s = c[1]),
      c[2] !== s
        ? ((i = (0, t.jsx)("h2", {
            className: "text-base font-semibold text-text-primary",
            children: s,
          })),
          (c[2] = s),
          (c[3] = i))
        : (i = c[3]),
      c[4] !== d || c[5] !== f
        ? ((l = f(
            d
              ? "web.bounties.near_me_empty_hint"
              : "web.bounties.loosen_filters",
          )),
          (c[4] = d),
          (c[5] = f),
          (c[6] = l))
        : (l = c[6]),
      c[7] !== l
        ? ((a = (0, t.jsx)("p", {
            className: "max-w-[360px] text-sm leading-6 text-text-secondary",
            children: l,
          })),
          (c[7] = l),
          (c[8] = a))
        : (a = c[8]),
      c[9] !== i || c[10] !== a
        ? ((o = (0, t.jsxs)("div", {
            className:
              "flex flex-col items-center gap-2 px-6 py-24 text-center",
            children: [i, a],
          })),
          (c[9] = i),
          (c[10] = a),
          (c[11] = o))
        : (o = c[11]),
      o
    );
  };
  var m = e.i(526372);
  let g = [],
    p = (e) => {
      let s,
        l,
        a = (0, r.c)(5),
        { viewMode: o } = e,
        { t: c } = (0, n.f)();
      return (
        a[0] !== c
          ? ((s = c("web.bounties.loading_bounties")), (a[0] = c), (a[1] = s))
          : (s = a[1]),
        a[2] !== s || a[3] !== o
          ? ((l = (0, t.jsx)(i.f, { label: s, viewMode: o })),
            (a[2] = s),
            (a[3] = o),
            (a[4] = l))
          : (l = a[4]),
        l
      );
    },
    h = () => {
      let e,
        s,
        i,
        l,
        a,
        o = (0, r.c)(11),
        { t: c } = (0, n.f)();
      return (
        o[0] !== c
          ? ((e = c("web.bounties.bounties_load_error")),
            (o[0] = c),
            (o[1] = e))
          : (e = o[1]),
        o[2] !== e
          ? ((s = (0, t.jsx)("h2", {
              className: "text-base font-semibold text-text-primary",
              children: e,
            })),
            (o[2] = e),
            (o[3] = s))
          : (s = o[3]),
        o[4] !== c
          ? ((i = c("web.bounties.try_refreshing")), (o[4] = c), (o[5] = i))
          : (i = o[5]),
        o[6] !== i
          ? ((l = (0, t.jsx)("p", {
              className: "max-w-[360px] text-sm leading-6 text-text-secondary",
              children: i,
            })),
            (o[6] = i),
            (o[7] = l))
          : (l = o[7]),
        o[8] !== s || o[9] !== l
          ? ((a = (0, t.jsxs)("div", {
              className:
                "flex flex-col items-center gap-2 px-6 py-24 text-center",
              children: [s, l],
            })),
            (o[8] = s),
            (o[9] = l),
            (o[10] = a))
          : (a = o[10]),
        a
      );
    };
  function v(e) {
    return e.items;
  }
  e.s(
    [
      "ScreenerListingView",
      0,
      (e) => {
        let n,
          i,
          w,
          _,
          y,
          j,
          M,
          N,
          L,
          R,
          S,
          A,
          T,
          C,
          k,
          E,
          O,
          B,
          I = (0, r.c)(60),
          {
            sortKey: K,
            viewMode: P,
            filters: z,
            nearMe: G,
            onFacetsChange: J,
            onTimeLeftCountsChange: U,
          } = e,
          F = void 0 === G ? null : G;
        I[0] !== z || I[1] !== F || I[2] !== K
          ? ((n = (0, d.N)({ sortKey: K, filters: z, nearMe: F })),
            (I[0] = z),
            (I[1] = F),
            (I[2] = K),
            (I[3] = n))
          : (n = I[3]);
        let H = n;
        I[4] !== z || I[5] !== F || I[6] !== K
          ? ((i = (0, d.N)({ sortKey: K, filters: (0, u.L)(z), nearMe: F })),
            (I[4] = z),
            (I[5] = F),
            (I[6] = K),
            (I[7] = i))
          : (i = I[7]);
        let V = i;
        I[8] !== H
          ? ((w = { ...H, limit: 24, facets: !0, enabled: !0 }),
            (I[8] = H),
            (I[9] = w))
          : (w = I[9]);
        let {
          data: Z,
          isLoading: q,
          isFetchingNextPage: D,
          hasNextPage: Q,
          fetchNextPage: W,
          isError: X,
        } = (0, o.f)(w);
        I[10] !== V
          ? ((_ = { ...V, limit: 1, facets: !0, enabled: !0 }),
            (I[10] = V),
            (I[11] = _))
          : (_ = I[11]);
        let { data: Y } = (0, o.f)(_);
        (I[12] !== Z?.pages
          ? ((y = () => Z?.pages.flatMap(v) ?? []),
            (I[12] = Z?.pages),
            (I[13] = y))
          : (y = I[13]),
          Z?.pages,
          I[14] !== y ? ((j = y()), (I[14] = y), (I[15] = j)) : (j = I[15]));
        let $ = j,
          ee = Y?.pages[0]?.facets?.phase;
        if (I[16] !== z || I[17] !== $ || I[18] !== ee) {
          let e = (0, u.x)($, (0, u.L)(z)),
            t = (0, u.x)($, (0, u.h)(z));
          ((N = ee ?? (0, u.k)(e).phase),
            (L = g),
            (M = (0, u.k)(t)),
            (I[16] = z),
            (I[17] = $),
            (I[18] = ee),
            (I[19] = M),
            (I[20] = N),
            (I[21] = L));
        } else ((M = I[19]), (N = I[20]), (L = I[21]));
        I[22] !== M.rewardMints || I[23] !== N || I[24] !== L
          ? ((R = { phase: N, status: L, rewardMints: M.rewardMints }),
            (I[22] = M.rewardMints),
            (I[23] = N),
            (I[24] = L),
            (I[25] = R))
          : (R = I[25]);
        let et = R;
        I[26] !== z || I[27] !== $
          ? ((S = (0, u.t)((0, u.x)($, (0, u.Z)(z)))),
            (I[26] = z),
            (I[27] = $),
            (I[28] = S))
          : (S = I[28]);
        let er = S;
        ((0, f.T)(et, J, f.w), (0, f.T)(er, U, f.G));
        let { bounties: en, liveTokens: es } = (0, a.E)($);
        if (I[29] !== en) {
          for (let e of ((A = new Map()), en)) A.set(e.id, e);
          ((I[29] = en), (I[30] = A));
        } else A = I[30];
        let ei = A;
        if (I[31] !== ei || I[32] !== es || I[33] !== $) {
          let e;
          (I[35] !== ei || I[36] !== es
            ? ((e = (e) => {
                let t = ei.get(e.taskId);
                return t
                  ? [
                      (0, l.N)({
                        bounty: t,
                        resolvedTokens: es,
                        keyPrefix: "screener-bounty",
                      }),
                    ]
                  : [];
              }),
              (I[35] = ei),
              (I[36] = es),
              (I[37] = e))
            : (e = I[37]),
            (T = $.flatMap(e)),
            (I[31] = ei),
            (I[32] = es),
            (I[33] = $),
            (I[34] = T));
        } else T = I[34];
        let el = T;
        if (I[38] !== $) {
          for (let e of ((C = new Set()), $)) {
            for (let t of e.rewardLegs) t.mintAddress && C.add(t.mintAddress);
            e.coinAddress && C.add(e.coinAddress);
          }
          ((I[38] = $), (I[39] = C));
        } else C = I[39];
        I[40] !== C ? ((k = [...C]), (I[40] = C), (I[41] = k)) : (k = I[41]);
        let ea = k;
        ((0, c.f)(ea, ea.length > 0),
          I[42] !== W || I[43] !== Q || I[44] !== D
            ? ((E = { hasMore: Q, isLoading: D, onLoadMore: W }),
              (I[42] = W),
              (I[43] = Q),
              (I[44] = D),
              (I[45] = E))
            : (E = I[45]));
        let { sentinelRef: eo } = (0, m.f)(E);
        if (q && 0 === $.length) {
          let e;
          return (
            I[46] !== P
              ? ((e = (0, t.jsx)(p, { viewMode: P })), (I[46] = P), (I[47] = e))
              : (e = I[47]),
            e
          );
        }
        if (X && 0 === $.length) {
          let e;
          return (
            I[48] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = (0, t.jsx)(h, {})), (I[48] = e))
              : (e = I[48]),
            e
          );
        }
        if (0 === $.length) {
          let e,
            r = null != F;
          return (
            I[49] !== r
              ? ((e = (0, t.jsx)(b, { nearMeActive: r })),
                (I[49] = r),
                (I[50] = e))
              : (e = I[50]),
            e
          );
        }
        return (
          I[51] !== Q || I[52] !== D || I[53] !== eo || I[54] !== $.length
            ? ((O = (0, t.jsx)(x.f, {
                hasMore: Q,
                isLoading: D,
                sentinelRef: eo,
                visibleCount: $.length,
              })),
              (I[51] = Q),
              (I[52] = D),
              (I[53] = eo),
              (I[54] = $.length),
              (I[55] = O))
            : (O = I[55]),
          I[56] !== el || I[57] !== O || I[58] !== P
            ? ((B = (0, t.jsx)(s.f, {
                disableHoverCards: !0,
                feedKind: "bounties",
                footer: O,
                items: el,
                viewMode: P,
              })),
              (I[56] = el),
              (I[57] = O),
              (I[58] = P),
              (I[59] = B))
            : (B = I[59]),
          B
        );
      },
    ],
    851373,
  );
};
