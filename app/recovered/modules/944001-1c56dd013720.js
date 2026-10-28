// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(788501),
    i = e.i(859960),
    r = e.i(445242),
    s = e.i(458013),
    l = e.i(647145),
    a = e.i(606706),
    n = e.i(944410),
    o = e.i(690877),
    c = e.i(418096),
    d = e.i(613677),
    m = e.i(637782),
    u = e.i(342463),
    f = e.i(297865),
    h = e.i(866890),
    x = e.i(54567);
  let p = c.z.enum(["low", "mid", "high"]),
    v = d.z.object({
      name: p,
      height: m.z.number(),
      playlistUrl: u.z.string(),
      playlistS3Key: u.z.string().nullish(),
    }),
    g = c.z.enum(["COMPLETE", "HIGHLIGHT", "PREVIEW"]),
    b = c.z.enum(["ACTIVE", "SOFT_DELETED", "HARD_DELETED"]),
    w = d.z.object({
      clipId: u.z.string(),
      clipType: g,
      createdAt: u.z.string(),
      deletionStatus: b.nullish(),
      duration: m.z.number(),
      endTime: u.z.string(),
      hidden: f.z.boolean().nullish(),
      mp4CreatedAt: u.z.string().nullish(),
      mp4Url: u.z.string().nullish(),
      mp4S3Key: u.z.string().nullish(),
      mp4SizeBytes: m.z.number().nullish(),
      pinnedAt: u.z.string().nullish(),
      playlistS3Key: u.z.string().nullish(),
      playlistUrl: u.z.string().nullish(),
      roomName: u.z.string(),
      sessionId: u.z.string().nullish(),
      startTime: u.z.string(),
      thumbnailS3Key: u.z.string().nullish(),
      thumbnailUrl: u.z.string(),
      title: u.z.string().nullish(),
      variants: h.z.array(v).nullish(),
      viewCount: m.z.number().nullish(),
    });
  var y = e.i(254667);
  let N = d.z.object({
    vodId: u.z.string(),
    viewsTotal: m.z.number(),
    roomName: u.z.string().optional(),
  });
  function j(e, t) {
    return (
      t.roomName &&
        t.vodId &&
        e.push({ roomName: t.roomName, clipId: t.vodId }),
      e
    );
  }
  var _ = e.i(363250);
  let C = {
      [t.f.TRENDING_CLIPS]: { type: "weekly", clipType: "HIGHLIGHT" },
      [t.f.POPULAR_RECORDINGS]: { type: "monthly", clipType: "COMPLETE" },
    },
    E = (e) => {
      let t,
        i,
        c,
        d,
        m,
        u,
        f = (0, r.c)(10),
        { limit: p, sectionId: v } = e,
        g = void 0 === p ? a.O : p,
        b = C[v],
        E = Math.floor(3 * g);
      (f[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((t = { staleTime: 36e5 }),
          (i = { staleTime: 36e5 }),
          (f[0] = t),
          (f[1] = i))
        : ((t = f[0]), (i = f[1])),
        f[2] !== b || f[3] !== E
          ? ((c = { ...b, limit: E, vodAnalyticsOptions: t, clipsOptions: i }),
            (f[2] = b),
            (f[3] = E),
            (f[4] = c))
          : (c = f[4]));
      let { clipsQuery: A, vodAnalyticsQuery: z } = ((e) => {
          var t, i;
          let s,
            l,
            a,
            c,
            d,
            m,
            u,
            f,
            p,
            v,
            g,
            b,
            _,
            C,
            E,
            I,
            S,
            T,
            L,
            k,
            R,
            A,
            z = (0, r.c)(13),
            {
              type: P,
              limit: M,
              clipType: F,
              vodAnalyticsOptions: O,
              clipsOptions: D,
            } = e;
          z[0] !== F || z[1] !== M || z[2] !== P || z[3] !== O
            ? ((s = { type: P, limit: M, clipType: F, ...O }),
              (z[0] = F),
              (z[1] = M),
              (z[2] = P),
              (z[3] = O),
              (z[4] = s))
            : (s = z[4]);
          let U =
            ((t = s),
            (_ = (0, r.c)(21))[0] !== t
              ? (({
                  type: p,
                  limit: m,
                  clipType: d,
                  oversampleFactor: f,
                  ...u
                } = t),
                (_[0] = t),
                (_[1] = d),
                (_[2] = m),
                (_[3] = u),
                (_[4] = f),
                (_[5] = p))
              : ((d = _[1]), (m = _[2]), (u = _[3]), (f = _[4]), (p = _[5])),
            (C = void 0 === f ? 5 : f),
            (E = (0, n.useLivestreamApiClient)()),
            _[6] !== d || _[7] !== m || _[8] !== C || _[9] !== p
              ? ((v = ["vod-analytics", p, m, d, C]),
                (_[6] = d),
                (_[7] = m),
                (_[8] = C),
                (_[9] = p),
                (_[10] = v))
              : (v = _[10]),
            _[11] !== E ||
            _[12] !== d ||
            _[13] !== m ||
            _[14] !== C ||
            _[15] !== p
              ? ((g = async () => {
                  let e = new URLSearchParams();
                  (e.set("type", p),
                    e.set("limit", m.toString()),
                    e.set(
                      "timestamp",
                      Math.floor(new Date().getTime() / 1e3).toString(),
                    ),
                    e.set("oversample", (m * C).toString()),
                    e.set("clipType", d));
                  let t = await E.get("vod-analytics/top", {
                    searchParams: e,
                  }).json();
                  try {
                    return h.z.array(N).parse(t);
                  } catch (e) {
                    throw (
                      y.y.error("Failed to parse vod analytics", { error: e }),
                      e
                    );
                  }
                }),
                (_[11] = E),
                (_[12] = d),
                (_[13] = m),
                (_[14] = C),
                (_[15] = p),
                (_[16] = g))
              : (g = _[16]),
            _[17] !== u || _[18] !== v || _[19] !== g
              ? ((b = { queryKey: v, queryFn: g, ...u }),
                (_[17] = u),
                (_[18] = v),
                (_[19] = g),
                (_[20] = b))
              : (b = _[20]),
            (0, o.useQuery)(b));
          (z[5] !== U.data
            ? ((l = U.data?.reduce(j, []) ?? []), (z[5] = U.data), (z[6] = l))
            : (l = z[6]),
            z[7] !== D || z[8] !== l
              ? ((a = { ids: l, ...D }), (z[7] = D), (z[8] = l), (z[9] = a))
              : (a = z[9]));
          let H =
            ((i = a),
            (R = (0, r.c)(12))[0] !== i
              ? (({ ids: I, ...S } = i), (R[0] = i), (R[1] = I), (R[2] = S))
              : ((I = R[1]), (S = R[2])),
            (A = (0, n.useLivestreamApiClient)()),
            R[3] !== I
              ? ((T = ["clips-by-ids", I]), (R[3] = I), (R[4] = T))
              : (T = R[4]),
            R[5] !== A || R[6] !== I
              ? ((L = async () => {
                  if (0 === I.length) return [];
                  let e = await A.post("clips/by-ids", {
                    json: { ids: I },
                  }).json();
                  try {
                    return h.z.array(w).parse(e);
                  } catch (e) {
                    throw (
                      x.logger.error("[useClipsByIds] Failed to parse clips", {
                        error: e,
                      }),
                      e
                    );
                  }
                }),
                (R[5] = A),
                (R[6] = I),
                (R[7] = L))
              : (L = R[7]),
            R[8] !== S || R[9] !== T || R[10] !== L
              ? ((k = { queryKey: T, queryFn: L, ...S }),
                (R[8] = S),
                (R[9] = T),
                (R[10] = L),
                (R[11] = k))
              : (k = R[11]),
            (0, o.useQuery)(k));
          return (
            z[10] !== H || z[11] !== U
              ? ((c = { vodAnalyticsQuery: U, clipsQuery: H }),
                (z[10] = H),
                (z[11] = U),
                (z[12] = c))
              : (c = z[12]),
            c
          );
        })(c),
        P = [...(A.data ?? [])].sort(I),
        M = new Map();
      f[5] === Symbol.for("react.memo_cache_sentinel")
        ? ((d = function (e, t, i) {
            let r = 0;
            for (let s of e.values())
              for (let { index: e } of s) (i ? e <= t : e < t) && r++;
            return r;
          }),
          (f[5] = d))
        : (d = f[5]);
      let F = d;
      for (let e = 0; e < P.length; e++) {
        let t = P[e],
          i = M.get(t.roomName) ?? [],
          r = i[i.length - 1];
        if (r) {
          let t = F(M, r.index, !1);
          if (F(M, e, !1) - t < l.g.large) continue;
        }
        (i.push({ index: e, clip: t }), M.set(t.roomName, i));
      }
      let O = [...M.values()].flat().sort(S).map(T),
        D = (0, s.f)({ mints: [...new Set(O.map(L) ?? [])] }),
        U = D.data?.reduce(k, {}) ?? {};
      f[6] === Symbol.for("react.memo_cache_sentinel")
        ? ((m = {}), (f[6] = m))
        : (m = f[6]);
      let H = (0, _.f)(m),
        K = O.reduce((e, t) => {
          let i = U[t.roomName],
            r = H.data && i?.market_cap ? i.market_cap * H.data : null;
          return (
            e.push({
              id: t.clipId,
              mint: t.roomName,
              coinCreatedTimestamp: i?.created_timestamp ?? null,
              title: t.title || i?.name || t.roomName,
              creator: { address: i?.creator, username: i?.username || void 0 },
              marketCap: r,
              thumbnail: t.thumbnailUrl,
              ipfsThumbnail: t.thumbnailUrl,
              thumbnailUpdatedAt: Date.parse(t.createdAt) || Date.now(),
              avatarUri: i?.image_uri ?? "",
              isLive: i?.is_currently_live || !1,
              playlistUrl:
                t.playlistUrl ||
                t.mp4Url ||
                i?.playlist_url_low ||
                i?.playlist_url ||
                void 0,
              viewerCount: t.viewCount ?? 0,
              viewerCountLabel: "views",
              linkUrl: `/coin/${t.roomName}?clip=${t.clipId}`,
              symbol: i?.symbol,
              coin: i,
            }),
            e
          );
        }, []),
        V = z.isLoading || A.isLoading || D.isLoading;
      return (
        f[7] !== K || f[8] !== V
          ? ((u = {
              data: K,
              isLoading: V,
              fetchNextPage: R,
              hasNextPage: !1,
              isFetchingNextPage: !1,
            }),
            (f[7] = K),
            (f[8] = V),
            (f[9] = u))
          : (u = f[9]),
        u
      );
    };
  function I(e, t) {
    return (t.viewCount ?? 0) - (e.viewCount ?? 0);
  }
  function S(e, t) {
    return e.index - t.index;
  }
  function T(e) {
    return e.clip;
  }
  function L(e) {
    return e.roomName;
  }
  function k(e, t) {
    return ((e[t.mint] = t), e);
  }
  function R() {}
  var A = e.i(539335);
  let z = [
      {
        id: t.f.MOST_VIEWERS,
        titleKey: "livestream.feed.sort.most_viewers",
        useFetch: (e) => (0, i.N)({ livePageSort: A.f.MOST_VIEWERS, ...e }),
        fetch: (e) => (0, i.A)({ livePageSort: A.f.MOST_VIEWERS, ...e }),
      },
      {
        id: t.f.HIGHEST_MARKET_CAP,
        titleKey: "web.live.section_highest_market_cap",
        useFetch: (e) => (0, i.N)({ livePageSort: A.f.MARKET_CAP, ...e }),
        fetch: (e) => (0, i.A)({ livePageSort: A.f.MARKET_CAP, ...e }),
      },
      {
        id: t.f.TRENDING_CLIPS,
        titleKey: "web.live.section_trending_clips",
        useFetch: (e) => E({ ...e, sectionId: t.f.TRENDING_CLIPS }),
      },
      {
        id: t.f.POPULAR_RECORDINGS,
        titleKey: "web.live.section_popular_recordings",
        useFetch: (e) => E({ ...e, sectionId: t.f.POPULAR_RECORDINGS }),
      },
      {
        id: t.f.NEW_CREATORS,
        titleKey: "web.live.section_new_creators",
        useFetch: () => ({
          data: [],
          isLoading: !1,
          fetchNextPage: () => {},
          hasNextPage: !1,
          isFetchingNextPage: !1,
        }),
      },
      {
        id: t.f.FOR_YOU,
        titleKey: "web.live.section_for_you",
        subtitleKey: "web.live.section_for_you_subtitle",
        useFetch: () => ({
          data: [],
          isLoading: !1,
          fetchNextPage: () => {},
          hasNextPage: !1,
          isFetchingNextPage: !1,
        }),
      },
    ],
    P = new Map(z.map((e) => [e.id, e]));
  e.s(["Z", 0, z, "A", 0, P], 944001);
  var M = e.i(732486),
    F = e.i(157633),
    O = e.i(426091),
    D = e.i(458310),
    U = e.i(352386);
  e.i(12692);
  var H = e.i(398902);
  let K = (e) => {
    let t,
      i,
      s,
      l,
      a = (0, r.c)(8),
      { sectionId: n } = e,
      { t: o } = (0, H.f)(),
      c = `/live/${n}`;
    return (
      a[0] !== o
        ? ((t = o("web.live.show_all")), (a[0] = o), (a[1] = t))
        : (t = a[1]),
      a[2] !== t
        ? ((i = (0, M.jsx)("p", {
            className: "text-sm font-medium",
            children: t,
          })),
          (a[2] = t),
          (a[3] = i))
        : (i = a[3]),
      a[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = (0, M.jsx)(F.kK, {
            size: 12,
            className: "transition-transform duration-200",
          })),
          (a[4] = s))
        : (s = a[4]),
      a[5] !== c || a[6] !== i
        ? ((l = (0, M.jsxs)(D.default, {
            className: "flex flex-row items-center gap-2.5",
            href: c,
            children: [i, s],
          })),
          (a[5] = c),
          (a[6] = i),
          (a[7] = l))
        : (l = a[7]),
      l
    );
  };
  var V = e.i(314982);
  e.s(
    [
      "Z",
      0,
      ({
        sectionId: e,
        titleKey: t,
        subtitleKey: i,
        onShowAll: r,
        onSectionComplete: s,
        limit: a,
        isExpanded: n = !1,
        useFetch: o,
        initialData: c,
        eager: d = !1,
      }) => {
        let { t: m } = (0, H.f)(),
          {
            data: u,
            isLoading: f,
            fetchNextPage: h,
            hasNextPage: x,
            isFetchingNextPage: p,
          } = o({ limit: a, initialData: c });
        (0, U.useEffect)(() => {
          f || s?.(e);
        }, [f, e, s]);
        let v = (0, U.useCallback)(() => {
          x && !p && h();
        }, [x, p, h]);
        if (f) return (0, M.jsx)(V.SectionSkeleton, {});
        if (0 === u.length) return null;
        let g = r && (u.length > l.g.large || x);
        return (0, M.jsxs)("div", {
          className: "flex flex-col gap-4",
          children: [
            (0, M.jsxs)("div", {
              className: "flex flex-row items-center justify-between",
              children: [
                (0, M.jsxs)("div", {
                  className: "flex flex-row items-center gap-2",
                  children: [
                    !g &&
                      n &&
                      (0, M.jsx)(D.default, {
                        href: "/live",
                        children: (0, M.jsx)(F.S, { size: 18 }),
                      }),
                    (0, M.jsxs)("p", {
                      className: "text-xl font-semibold",
                      children: [
                        m(t),
                        " ",
                        i &&
                          (0, M.jsx)("span", {
                            className: "text-text-mid-em text-sm",
                            children: m(i),
                          }),
                      ],
                    }),
                  ],
                }),
                g && (0, M.jsx)(K, { sectionId: e }),
              ],
            }),
            (0, M.jsx)(l.X, {
              livestreams: u,
              scrollContainerClassName: (0, O.c)(
                n ? "flex-wrap" : "flex-nowrap",
              ),
              onScrollNearEnd: v,
              useViewportIntersection: n,
              eager: d,
            }),
          ],
        });
      },
      "R",
      0,
      300,
    ],
    310766,
  );
};
