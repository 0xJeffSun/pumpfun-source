// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(402030),
    r = e.i(549613);
  let n = "ASSET_CLASS_NFT_LIKE",
    i = new Set(["held", "listed", "inventory"]),
    a = (e) => {
      if (null == e) return null;
      let t = e.trim();
      return "" === t ? null : t;
    },
    l = (e) => ("number" == typeof e && Number.isFinite(e) && e > 0 ? e : null),
    o = (e) => null != e && (e.assetClass === n || null != e.collectible),
    s = (e) => ({
      ...(null != e.assetClass ? { assetClass: e.assetClass } : {}),
      ...(null != e.collectible ? { collectible: e.collectible } : {}),
    });
  e.s(
    [
      "R",
      0,
      n,
      "k",
      0,
      (e) => `${(Math.floor(100 * e) / 100).toFixed(2)}\xd7`,
      "Q",
      0,
      o,
      "E",
      0,
      s,
      "r",
      0,
      (e, t) => {
        if (null == t || !o(t)) return null;
        let n = t.collectible ?? null,
          s = a(n?.status)?.toLowerCase() ?? null;
        return {
          nftAddress: e,
          name: a(n?.name),
          grade: a(n?.grade),
          setName: a(n?.setName),
          image: (0, r.G)(n?.provider, n?.imageUrl),
          markUsd: l(n?.markUsd) ?? l(n?.insuredValueUsd),
          status: s,
          isClosed: null !== s && !i.has(s),
          provider: a(n?.provider),
          listingUsd: "listed" === s ? l(n?.listing?.priceUsd) : null,
          multiple: l(t.multiple),
          calloutPriceUsd: l(t.calloutPrice),
        };
      },
      "U",
      0,
      (e, t) => ({
        nftAddress: e.nftAddress,
        name: e.name,
        grade: e.grade,
        setName: e.setName,
        image: e.image,
        markUsd: l(e.priceUsd),
        status: null,
        isClosed: !1,
        provider: "collector_crypt",
        listingUsd: null,
        multiple: l(t?.multiple),
        calloutPriceUsd: l(t?.calloutPrice),
      }),
    ],
    917341,
  );
  var d = e.i(637172),
    u = e.i(559015);
  let c = (e) => {
    let t = e?.trim().replace(/^@/, "");
    return t ? `https://x.com/${encodeURIComponent(t)}` : void 0;
  };
  e.s(["f", 0, c], 119675);
  var p = e.i(759257),
    m = e.i(646908),
    h = e.i(231824),
    f = e.i(192);
  let g = (e) => {
    let { thesis: t, likes: r, hasLiked: n, hasReposted: i, perp: a, ...l } = e;
    return {
      ...l,
      ...(void 0 !== a ? { perp: a } : {}),
      ...(void 0 !== t ? { note: t } : {}),
      ...(void 0 !== r ? { likeCount: r } : {}),
      ...("boolean" == typeof n ? { likedByViewer: n } : {}),
      ...("boolean" == typeof i ? { repostedByViewer: i } : {}),
    };
  };
  async function v(e) {
    let t,
      {
        userId: r,
        limit: n = 30,
        sortBy: i = "TIMESTAMP",
        sortOrder: a = "DESC",
        pageToken: l,
        includeMembers: o = !1,
        window: s,
        signal: d,
      } = e;
    return {
      callouts: (
        (t = await (0, p.j)()("GET /callout/list/{userId}", {
          params: { userId: r },
          query: {
            limit: n,
            sortBy: i,
            sortOrder: a,
            pageToken: l || void 0,
            includeMembers: o || void 0,
            window: s || void 0,
          },
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          signal: d,
          hooks: {
            afterResponse: [
              (e, t, r) => {
                if (!r.ok)
                  throw Error(`Failed to fetch callouts for user: ${r.status}`);
              },
            ],
          },
        })).callouts ?? []
      ).map(g),
      ...(void 0 !== t.nextPageToken ? { nextPageToken: t.nextPageToken } : {}),
    };
  }
  async function y(e) {
    var t;
    let r,
      n,
      i,
      a,
      l,
      o,
      { calloutId: d, signal: u, cache: m } = e,
      h = await (0, p.j)()("GET /callout/{calloutId}", {
        params: { calloutId: d },
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        ...(m ? { cache: m } : {}),
        signal: u,
        hooks: {
          afterResponse: [
            (e, t, r) => {
              if (404 === r.status) return Response.json({ callout: null });
              if (!r.ok) throw Error(`Failed to fetch callout: ${r.status}`);
            },
          ],
        },
      });
    return h.callout
      ? ((t = h.callout),
        (r = t.userId?.trim() || void 0),
        (n = t.user_uuid?.trim() || void 0),
        (i = t.thesis?.trim() || void 0),
        (a = t.userName?.trim() || void 0),
        (l = t.profileImage?.trim() || void 0),
        (o = c(t.xUsername)),
        {
          calloutId: t.calloutId,
          userId: r || n || t.calloutId,
          ...(n ? { authorCcUserId: n } : {}),
          coinMint: t.coinMint,
          marketCap: t.marketCap,
          calloutPrice: t.calloutPriceUsd,
          multiple: t.multiple,
          createdAt: t.createdAt,
          maxPriceSol: 0,
          source: "coin_communities",
          ...(i ? { note: i } : {}),
          ...(t.mediaUrl ? { mediaUrl: t.mediaUrl } : {}),
          ...(void 0 !== t.quotedCalloutId
            ? { quotedCalloutId: t.quotedCalloutId }
            : {}),
          ...(void 0 !== t.quotedCallout
            ? { quotedCallout: t.quotedCallout }
            : {}),
          ...(void 0 !== t.chain ? { chain: t.chain } : {}),
          ...(void 0 !== t.perp ? { perp: t.perp } : {}),
          ...s(t),
          caller: {
            ...(a ? { username: a } : {}),
            ...(l ? { avatarUrl: l } : {}),
            ...(o ? { twitterUrl: o } : {}),
            ...(r ? { walletAddress: r } : {}),
          },
          ...(void 0 !== t.likes ? { likeCount: t.likes } : {}),
          ...(void 0 !== t.replyCount ? { replyCount: t.replyCount } : {}),
          ...(void 0 !== t.viewCount ? { viewCount: t.viewCount } : {}),
          ...("boolean" == typeof t.hasLiked
            ? { likedByViewer: t.hasLiked }
            : {}),
          ...(void 0 !== t.repostCount ? { repostCount: t.repostCount } : {}),
          ...(void 0 !== t.quoteCount ? { quoteCount: t.quoteCount } : {}),
          ...("boolean" == typeof t.hasReposted
            ? { repostedByViewer: t.hasReposted }
            : {}),
        })
      : null;
  }
  async function b(e) {
    let { userId: t, mint: r, signal: n } = e,
      i = (0, m.L)(e.chain),
      a = (0, m.B)(e.chain),
      l = await (0, p.j)()("GET /callout/user/{userId}/mint/{coinMint}", {
        params: { userId: t, coinMint: r },
        query: i ? { chain: m.J } : a ? { chain: m.d } : {},
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        signal: n,
        hooks: {
          afterResponse: [
            (e, t, r) => {
              if (400 === r.status && (i || a))
                return Response.json({ callout: null });
              if (!r.ok)
                throw Error(`Failed to fetch user mint callout: ${r.status}`);
            },
          ],
        },
      });
    if (!l.callout) return null;
    let o = l.callout.thesis?.trim() || void 0;
    return {
      calloutId: l.callout.calloutId,
      userId: t,
      coinMint: l.callout.coinMint || r,
      marketCap: l.callout.marketCap,
      calloutPrice: l.callout.calloutPriceUsd,
      multiple: l.callout.multiple,
      createdAt: l.callout.createdAt,
      maxPriceSol: l.callout.maxPriceSol ?? 0,
      source: "coin_communities",
      ...(o ? { note: o } : {}),
      ...(l.callout.mediaUrl ? { mediaUrl: l.callout.mediaUrl } : {}),
    };
  }
  async function _(e) {
    let {
      pageSize: r = 10,
      cursor: n,
      kinds: i = "callout,update,trade,collectible",
      minTradeAmountUsd: a = 10,
      minMarketCapUsd: l = null,
      maxMarketCapUsd: o = null,
      signal: s,
      chainIds: d,
      chains: u,
    } = e;
    return await (0, p.j)()("GET /following-positions/alerts", {
      query: {
        pageSize: r,
        kinds: t.contract[
          "GET /following-positions/alerts"
        ].query.shape.kinds.parse(i.split(",")),
        minTradeAmountUsd: a ?? void 0,
        minMarketCapUsd: l ?? void 0,
        maxMarketCapUsd: o ?? void 0,
        chainIds: d,
        chains: u,
        cursor: n || void 0,
      },
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      signal: s,
      hooks: {
        afterResponse: [
          (e, t, r) => {
            if (!r.ok) throw Error(`Failed to fetch alerts feed: ${r.status}`);
          },
        ],
      },
    });
  }
  async function k(e) {
    return await (0, p.j)()("POST /following-positions/alerts/presence", {
      ...(e?.filters && { body: { filters: e.filters } }),
      credentials: "include",
      signal: e?.signal,
      hooks: {
        afterResponse: [
          (e, t, r) => {
            if (!r.ok)
              throw Error(`Failed to register alerts presence: ${r.status}`);
          },
        ],
      },
    });
  }
  async function w() {
    await (0, p.j)()("DELETE /following-positions/alerts/presence", {
      credentials: "include",
      hooks: {
        afterResponse: [
          (e, t, r) => {
            if (!r.ok)
              throw Error(`Failed to delete alerts presence: ${r.status}`);
          },
        ],
      },
    });
  }
  async function C(e) {
    let {
        pageSize: t = 150,
        chain: r = "all",
        includeFollowedHolders: n = !1,
        viewerAddress: i = null,
        signal: a,
      } = e,
      {
        sessionId: l,
        deviceId: o,
        sessionStartTimestampMs: s,
      } = (0, h.f)((0, f.r)()),
      c = {
        pageSize: t,
        ...(0, d.s)(r),
        platform: "WEB",
        session_id: l || void 0,
        device_id: o || void 0,
        session_start_timestamp_ms: s,
        userId: i || void 0,
        ...(n ? { includeFollowedHolders: !0, followedHoldersLimit: u.A } : {}),
      };
    return await (0, p.j)()("GET /home-feed", {
      query: c,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      signal: a,
      hooks: {
        afterResponse: [
          (e, t, r) => {
            if (!r.ok) throw Error(`Failed to fetch home feed: ${r.status}`);
          },
        ],
      },
    });
  }
  async function I(e) {
    let {
        pageSize: t,
        chain: r = "all",
        bounds: n,
        pageToken: i,
        signal: a,
      } = e,
      l = { pageSize: t, ...(0, d.s)(r), ...n, pageToken: i || void 0 };
    return (0, p.j)()("GET /home-feed/new", {
      query: l,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      signal: a,
      hooks: {
        afterResponse: [
          (e, t, r) => {
            if (!r.ok)
              throw Error(`Failed to fetch latest callouts: ${r.status}`);
          },
        ],
      },
    });
  }
  async function T(e) {
    let { since: t, chain: r = "all", bounds: n, signal: i } = e,
      a = { since: t, ...(0, d.s)(r), ...n };
    return (0, p.j)()("GET /home-feed/new/count", {
      query: a,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      signal: i,
      hooks: {
        afterResponse: [
          (e, t, r) => {
            if (!r.ok)
              throw Error(`Failed to count latest callouts: ${r.status}`);
          },
        ],
      },
    });
  }
  async function E(e) {
    let { period: t = "daily", includeFollowedHolders: r = !1, signal: n } = e;
    return await (0, p.j)()("GET /pnl-leaderboard/positions", {
      query: {
        period: t,
        ...(r ? { includeFollowedHolders: !0, followedHoldersLimit: u.A } : {}),
      },
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      signal: n,
      hooks: {
        afterResponse: [
          (e, t, r) => {
            if (!r.ok)
              throw Error(`Failed to fetch pnl leaderboard: ${r.status}`);
          },
        ],
      },
    });
  }
  e.s(
    [
      "G",
      0,
      "callout,update,reply,quote,repost",
      "T",
      0,
      10,
      "O",
      0,
      10,
      "c",
      0,
      150,
      "$",
      0,
      w,
      "r",
      0,
      _,
      "Q",
      0,
      y,
      "Z",
      0,
      C,
      "f",
      0,
      I,
      "x",
      0,
      T,
      "F",
      0,
      E,
      "H",
      0,
      v,
      "o",
      0,
      b,
      "m",
      0,
      k,
    ],
    735821,
  );
};
