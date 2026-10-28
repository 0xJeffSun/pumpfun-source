// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["A", () => j, "t", () => _, "L", () => N, "N", () => E], 859960);
  var t,
    a = e.i(445242),
    i = e.i(761459),
    l = e.i(690877),
    r = e.i(133244),
    s = e.i(788501);
  let n = 24;
  (Object.values(s.f),
    e.s(["B", 0, 1e4, "o", 0, 10, "R", 0, 100, "O", 0, n], 606706));
  var c = e.i(558898),
    o =
      (((t = {}).FEATURED = "featured"),
      (t.MARKET_CAP = "market_cap"),
      (t.MOST_VIEWERS = "most_viewers"),
      t);
  e.s(["f", () => o], 539335);
  var d = e.i(997887),
    m = e.i(759257),
    u = e.i(503630),
    f = e.i(369091),
    h = e.i(358893),
    x = e.i(419111),
    p = e.i(54567),
    v = e.i(493025);
  let g = {
      most_viewers: "livestream_num_participants",
      market_cap: "market_cap",
      featured: "featured",
    },
    b = (e) => ({
      id: e.mint,
      mint: e.mint,
      coinCreatedTimestamp: e.created_timestamp ?? null,
      title: e.name ?? e.mint,
      creator: { address: e.creator, username: e.username },
      marketCap: e.usd_market_cap,
      thumbnail: e.thumbnail,
      ipfsThumbnail: e.image_uri ?? "",
      thumbnailUpdatedAt: e.thumbnail_updated_at,
      avatarUri: e.image_uri ?? "",
      isLive: e.is_currently_live,
      playlistUrl: e.playlist_url_low || e.playlist_url || void 0,
      viewerCount: e.num_participants,
      linkUrl: `/coin/${e.mint}`,
      symbol: e.symbol,
      coin: e,
    }),
    y = async ({
      limit: e = n,
      offset: t,
      includeNsfw: a,
      ipfsPrefix: i,
      livePageSort: l,
    }) => {
      let r = e;
      l === o.MOST_VIEWERS &&
        (e !== n &&
          p.logger.warn(
            "Non-default limit set for MOST_VIEWERS coins query. It will be ignored and a custom default limit will be used.",
          ),
        (r = l === o.MOST_VIEWERS ? 100 : e));
      let s = await (0, m.j)()("GET /coins/search-unrestricted", {
        query: {
          limit: r,
          offset: t,
          includeNsfw: a,
          order: "desc",
          currentlyLive: !0,
          sort: g[l],
        },
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 10 },
        hooks: {
          afterResponse: [
            (e, t, a) => {
              if (!a.ok) throw Error(`Error fetching coins: ${a.statusText}`);
            },
          ],
        },
      });
      return (0, v.f)((0, d.l)(s), i);
    },
    _ = async (e) => {
      let t = new URL("/livestream/playlist-map", (0, u.c)()),
        a = await fetch(t.toString(), {
          method: "POST",
          body: JSON.stringify({ mints: e }),
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        });
      if (!a.ok) throw Error(`Error fetching playlist map: ${a.statusText}`);
      let i = await a.json();
      return c.S.parse(i).map;
    },
    j = async (e) => {
      let t = (await y(e)).map(b),
        a = t.reduce((e, t) => (t.playlistUrl || e.push(t.mint), e), []);
      if (0 === a.length) return t;
      let i = {};
      try {
        i = await _(a);
      } catch (e) {
        p.logger.error((0, x.w)(e));
      }
      return 0 === Object.keys(i).length
        ? t
        : t.map((e) =>
            i[e.mint]
              ? {
                  ...e,
                  playlistUrl:
                    i[e.mint].playlistUrlLow ||
                    i[e.mint].playlistUrl ||
                    i[e.mint].playlistUrlHigh ||
                    i[e.mint].vodPlaylistUrl ||
                    void 0,
                }
              : e,
          );
    },
    w = async (e) =>
      (await y({ limit: r.E, offset: 0, livePageSort: o.FEATURED, ...e })).map(
        r.g,
      ),
    N = (e) => {
      let t,
        i,
        r,
        s = (0, a.c)(10),
        { initialData: n, staleTime: c } = e,
        o = void 0 === c ? 1e4 : c,
        d = (0, h.M)(),
        { ipfsPrefix: m } = (0, f.useIpfsPrefix)();
      return (
        s[0] !== d
          ? ((t = ["live-hero-coins", d]), (s[0] = d), (s[1] = t))
          : (t = s[1]),
        s[2] !== d || s[3] !== m
          ? ((i = () => w({ includeNsfw: d, ipfsPrefix: m })),
            (s[2] = d),
            (s[3] = m),
            (s[4] = i))
          : (i = s[4]),
        s[5] !== n || s[6] !== o || s[7] !== t || s[8] !== i
          ? ((r = { queryKey: t, queryFn: i, initialData: n, staleTime: o }),
            (s[5] = n),
            (s[6] = o),
            (s[7] = t),
            (s[8] = i),
            (s[9] = r))
          : (r = s[9]),
        (0, l.useQuery)(r)
      );
    },
    E = (e) => {
      let t,
        l,
        r,
        s,
        c,
        o,
        d = (0, a.c)(21),
        { limit: m, livePageSort: u, initialData: x, staleTime: p } = e,
        v = void 0 === m ? n : m,
        g = void 0 === p ? 1e4 : p,
        b = (0, h.M)(),
        { ipfsPrefix: y } = (0, f.useIpfsPrefix)();
      (d[0] !== b || d[1] !== y || d[2] !== v || d[3] !== u
        ? ((t = ["live-section-coins", u, b, v, y]),
          (l = async (e) => {
            let { pageParam: t } = e;
            return j({
              offset: t,
              limit: v,
              livePageSort: u,
              includeNsfw: b,
              ipfsPrefix: y,
            });
          }),
          (d[0] = b),
          (d[1] = y),
          (d[2] = v),
          (d[3] = u),
          (d[4] = t),
          (d[5] = l))
        : ((t = d[4]), (l = d[5])),
        d[6] !== x
          ? ((r = x ? { pages: [x], pageParams: [0] } : void 0),
            (d[6] = x),
            (d[7] = r))
          : (r = d[7]),
        d[8] !== g || d[9] !== t || d[10] !== l || d[11] !== r
          ? ((s = {
              queryKey: t,
              queryFn: l,
              initialPageParam: 0,
              getNextPageParam: S,
              select: k,
              initialData: r,
              staleTime: g,
            }),
            (d[8] = g),
            (d[9] = t),
            (d[10] = l),
            (d[11] = r),
            (d[12] = s))
          : (s = d[12]));
      let _ = (0, i.useInfiniteQuery)(s);
      return (
        d[13] !== _.data?.pages
          ? ((c = _.data?.pages.flatMap(P) ?? []),
            (d[13] = _.data?.pages),
            (d[14] = c))
          : (c = d[14]),
        d[15] !== _.fetchNextPage ||
        d[16] !== _.hasNextPage ||
        d[17] !== _.isFetchingNextPage ||
        d[18] !== _.isLoading ||
        d[19] !== c
          ? ((o = {
              data: c,
              isLoading: _.isLoading,
              fetchNextPage: _.fetchNextPage,
              hasNextPage: _.hasNextPage,
              isFetchingNextPage: _.isFetchingNextPage,
            }),
            (d[15] = _.fetchNextPage),
            (d[16] = _.hasNextPage),
            (d[17] = _.isFetchingNextPage),
            (d[18] = _.isLoading),
            (d[19] = c),
            (d[20] = o))
          : (o = d[20]),
        o
      );
    };
  function S(e, t, a) {
    if (e && 0 !== e.length) return a + e.length;
  }
  function k(e) {
    let t = new Set();
    return {
      ...e,
      pages: e.pages.map((e) =>
        e.filter((e) => {
          let a = e.playlistUrl || e.thumbnail;
          if (a) {
            if (t.has(a)) return !1;
            t.add(a);
          }
          return !0;
        }),
      ),
    };
  }
  function P(e) {
    return e;
  }
};
