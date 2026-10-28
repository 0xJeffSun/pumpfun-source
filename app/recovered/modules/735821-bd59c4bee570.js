// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(402030),
    a = e.i(549613);
  let i = "ASSET_CLASS_NFT_LIKE",
    n = new Set(["held", "listed", "inventory"]),
    r = (e) => {
      if (null == e) return null;
      let t = e.trim();
      return "" === t ? null : t;
    },
    l = (e) => ("number" == typeof e && Number.isFinite(e) && e > 0 ? e : null),
    s = (e) => null != e && (e.assetClass === i || null != e.collectible),
    o = (e) => ({
      ...(null != e.assetClass ? { assetClass: e.assetClass } : {}),
      ...(null != e.collectible ? { collectible: e.collectible } : {}),
    });
  e.s(
    [
      "R",
      0,
      i,
      "k",
      0,
      (e) => `${(Math.floor(100 * e) / 100).toFixed(2)}\xd7`,
      "Q",
      0,
      s,
      "E",
      0,
      o,
      "r",
      0,
      (e, t) => {
        if (null == t || !s(t)) return null;
        let i = t.collectible ?? null,
          o = r(i?.status)?.toLowerCase() ?? null;
        return {
          nftAddress: e,
          name: r(i?.name),
          grade: r(i?.grade),
          setName: r(i?.setName),
          image: (0, a.G)(i?.provider, i?.imageUrl),
          markUsd: l(i?.markUsd) ?? l(i?.insuredValueUsd),
          status: o,
          isClosed: null !== o && !n.has(o),
          provider: r(i?.provider),
          listingUsd: "listed" === o ? l(i?.listing?.priceUsd) : null,
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
    let { thesis: t, likes: a, hasLiked: i, hasReposted: n, perp: r, ...l } = e;
    return {
      ...l,
      ...(void 0 !== r ? { perp: r } : {}),
      ...(void 0 !== t ? { note: t } : {}),
      ...(void 0 !== a ? { likeCount: a } : {}),
      ...("boolean" == typeof i ? { likedByViewer: i } : {}),
      ...("boolean" == typeof n ? { repostedByViewer: n } : {}),
    };
  };
  async function b(e) {
    let t,
      {
        userId: a,
        limit: i = 30,
        sortBy: n = "TIMESTAMP",
        sortOrder: r = "DESC",
        pageToken: l,
        includeMembers: s = !1,
        window: o,
        signal: d,
      } = e;
    return {
      callouts: (
        (t = await (0, p.j)()("GET /callout/list/{userId}", {
          params: { userId: a },
          query: {
            limit: i,
            sortBy: n,
            sortOrder: r,
            pageToken: l || void 0,
            includeMembers: s || void 0,
            window: o || void 0,
          },
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          signal: d,
          hooks: {
            afterResponse: [
              (e, t, a) => {
                if (!a.ok)
                  throw Error(`Failed to fetch callouts for user: ${a.status}`);
              },
            ],
          },
        })).callouts ?? []
      ).map(g),
      ...(void 0 !== t.nextPageToken ? { nextPageToken: t.nextPageToken } : {}),
    };
  }
  async function v(e) {
    var t;
    let a,
      i,
      n,
      r,
      l,
      s,
      { calloutId: d, signal: u, cache: m } = e,
      h = await (0, p.j)()("GET /callout/{calloutId}", {
        params: { calloutId: d },
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        ...(m ? { cache: m } : {}),
        signal: u,
        hooks: {
          afterResponse: [
            (e, t, a) => {
              if (404 === a.status) return Response.json({ callout: null });
              if (!a.ok) throw Error(`Failed to fetch callout: ${a.status}`);
            },
          ],
        },
      });
    return h.callout
      ? ((t = h.callout),
        (a = t.userId?.trim() || void 0),
        (i = t.user_uuid?.trim() || void 0),
        (n = t.thesis?.trim() || void 0),
        (r = t.userName?.trim() || void 0),
        (l = t.profileImage?.trim() || void 0),
        (s = c(t.xUsername)),
        {
          calloutId: t.calloutId,
          userId: a || i || t.calloutId,
          ...(i ? { authorCcUserId: i } : {}),
          coinMint: t.coinMint,
          marketCap: t.marketCap,
          calloutPrice: t.calloutPriceUsd,
          multiple: t.multiple,
          createdAt: t.createdAt,
          maxPriceSol: 0,
          source: "coin_communities",
          ...(n ? { note: n } : {}),
          ...(t.mediaUrl ? { mediaUrl: t.mediaUrl } : {}),
          ...(void 0 !== t.quotedCalloutId
            ? { quotedCalloutId: t.quotedCalloutId }
            : {}),
          ...(void 0 !== t.quotedCallout
            ? { quotedCallout: t.quotedCallout }
            : {}),
          ...(void 0 !== t.chain ? { chain: t.chain } : {}),
          ...(void 0 !== t.perp ? { perp: t.perp } : {}),
          ...o(t),
          caller: {
            ...(r ? { username: r } : {}),
            ...(l ? { avatarUrl: l } : {}),
            ...(s ? { twitterUrl: s } : {}),
            ...(a ? { walletAddress: a } : {}),
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
  async function y(e) {
    let { userId: t, mint: a, signal: i } = e,
      n = (0, m.L)(e.chain),
      r = (0, m.B)(e.chain),
      l = await (0, p.j)()("GET /callout/user/{userId}/mint/{coinMint}", {
        params: { userId: t, coinMint: a },
        query: n ? { chain: m.J } : r ? { chain: m.d } : {},
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        signal: i,
        hooks: {
          afterResponse: [
            (e, t, a) => {
              if (400 === a.status && (n || r))
                return Response.json({ callout: null });
              if (!a.ok)
                throw Error(`Failed to fetch user mint callout: ${a.status}`);
            },
          ],
        },
      });
    if (!l.callout) return null;
    let s = l.callout.thesis?.trim() || void 0;
    return {
      calloutId: l.callout.calloutId,
      userId: t,
      coinMint: l.callout.coinMint || a,
      marketCap: l.callout.marketCap,
      calloutPrice: l.callout.calloutPriceUsd,
      multiple: l.callout.multiple,
      createdAt: l.callout.createdAt,
      maxPriceSol: l.callout.maxPriceSol ?? 0,
      source: "coin_communities",
      ...(s ? { note: s } : {}),
      ...(l.callout.mediaUrl ? { mediaUrl: l.callout.mediaUrl } : {}),
    };
  }
  async function k(e) {
    let {
      pageSize: a = 10,
      cursor: i,
      kinds: n = "callout,update,trade,collectible",
      minTradeAmountUsd: r = 10,
      minMarketCapUsd: l = null,
      maxMarketCapUsd: s = null,
      signal: o,
      chainIds: d,
      chains: u,
    } = e;
    return await (0, p.j)()("GET /following-positions/alerts", {
      query: {
        pageSize: a,
        kinds: t.contract[
          "GET /following-positions/alerts"
        ].query.shape.kinds.parse(n.split(",")),
        minTradeAmountUsd: r ?? void 0,
        minMarketCapUsd: l ?? void 0,
        maxMarketCapUsd: s ?? void 0,
        chainIds: d,
        chains: u,
        cursor: i || void 0,
      },
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      signal: o,
      hooks: {
        afterResponse: [
          (e, t, a) => {
            if (!a.ok) throw Error(`Failed to fetch alerts feed: ${a.status}`);
          },
        ],
      },
    });
  }
  async function w(e) {
    return await (0, p.j)()("POST /following-positions/alerts/presence", {
      ...(e?.filters && { body: { filters: e.filters } }),
      credentials: "include",
      signal: e?.signal,
      hooks: {
        afterResponse: [
          (e, t, a) => {
            if (!a.ok)
              throw Error(`Failed to register alerts presence: ${a.status}`);
          },
        ],
      },
    });
  }
  async function C() {
    await (0, p.j)()("DELETE /following-positions/alerts/presence", {
      credentials: "include",
      hooks: {
        afterResponse: [
          (e, t, a) => {
            if (!a.ok)
              throw Error(`Failed to delete alerts presence: ${a.status}`);
          },
        ],
      },
    });
  }
  async function _(e) {
    let {
        pageSize: t = 150,
        chain: a = "all",
        includeFollowedHolders: i = !1,
        viewerAddress: n = null,
        signal: r,
      } = e,
      {
        sessionId: l,
        deviceId: s,
        sessionStartTimestampMs: o,
      } = (0, h.f)((0, f.r)()),
      c = {
        pageSize: t,
        ...(0, d.s)(a),
        platform: "WEB",
        session_id: l || void 0,
        device_id: s || void 0,
        session_start_timestamp_ms: o,
        userId: n || void 0,
        ...(i ? { includeFollowedHolders: !0, followedHoldersLimit: u.A } : {}),
      };
    return await (0, p.j)()("GET /home-feed", {
      query: c,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      signal: r,
      hooks: {
        afterResponse: [
          (e, t, a) => {
            if (!a.ok) throw Error(`Failed to fetch home feed: ${a.status}`);
          },
        ],
      },
    });
  }
  async function M(e) {
    let {
        pageSize: t,
        chain: a = "all",
        bounds: i,
        pageToken: n,
        signal: r,
      } = e,
      l = { pageSize: t, ...(0, d.s)(a), ...i, pageToken: n || void 0 };
    return (0, p.j)()("GET /home-feed/new", {
      query: l,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      signal: r,
      hooks: {
        afterResponse: [
          (e, t, a) => {
            if (!a.ok)
              throw Error(`Failed to fetch latest callouts: ${a.status}`);
          },
        ],
      },
    });
  }
  async function U(e) {
    let { since: t, chain: a = "all", bounds: i, signal: n } = e,
      r = { since: t, ...(0, d.s)(a), ...i };
    return (0, p.j)()("GET /home-feed/new/count", {
      query: r,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      signal: n,
      hooks: {
        afterResponse: [
          (e, t, a) => {
            if (!a.ok)
              throw Error(`Failed to count latest callouts: ${a.status}`);
          },
        ],
      },
    });
  }
  async function x(e) {
    let { period: t = "daily", includeFollowedHolders: a = !1, signal: i } = e;
    return await (0, p.j)()("GET /pnl-leaderboard/positions", {
      query: {
        period: t,
        ...(a ? { includeFollowedHolders: !0, followedHoldersLimit: u.A } : {}),
      },
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      signal: i,
      hooks: {
        afterResponse: [
          (e, t, a) => {
            if (!a.ok)
              throw Error(`Failed to fetch pnl leaderboard: ${a.status}`);
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
      C,
      "r",
      0,
      k,
      "Q",
      0,
      v,
      "Z",
      0,
      _,
      "f",
      0,
      M,
      "x",
      0,
      U,
      "F",
      0,
      x,
      "H",
      0,
      b,
      "o",
      0,
      y,
      "m",
      0,
      w,
    ],
    735821,
  );
};
