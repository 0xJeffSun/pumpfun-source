// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (e.i(149502), Object.defineProperty(n, "__esModule", { value: !0 }));
  var r = {
    completeHardNavigation: function () {
      return m;
    },
    completeSoftNavigation: function () {
      return R;
    },
    completeTraverseNavigation: function () {
      return P;
    },
    navigate: function () {
      return g;
    },
    navigateToKnownRoute: function () {
      return v;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  e.r(368418);
  let l = e.r(581131),
    u = e.r(944112),
    o = e.r(790661),
    i = e.r(85396),
    c = e.r(994260),
    s = e.r(946859);
  (e.r(685003), e.r(634258), e.r(360601));
  let f = e.r(313537),
    d = e.r(220605),
    h = e.r(863090),
    p = e.r(581761);
  e.r(29388);
  let y = e.r(260239);
  function g(e, t, n, r, a, l, u, o, c, f) {
    var d, h, y, g, _, m, R, P, E, b, T, A, O, w, C, M, N, I, F, j, D, U, k, H;
    let L, x, B, V, $, K;
    return (
      (d = e),
      (h = t),
      (y = n),
      (g = r),
      (_ = a),
      (m = l),
      (R = u),
      (P = o),
      (E = c),
      (b = f),
      (T = i.segmentCacheMap),
      (L = Date.now()),
      (x = h.href),
      (B = (0, s.createCacheKey)(x, R)),
      null !== (V = (0, i.readRouteCacheEntry)(L, B)) &&
      V.status === i.EntryStatus.Fulfilled
        ? ((A = L),
          (O = d),
          (w = h),
          (C = y),
          (M = g),
          (N = R),
          (I = _),
          (F = P),
          (j = E),
          (D = b),
          (U = V),
          (k = null),
          (H = T),
          ($ = U.canonicalUrl + w.hash),
          (K = {
            renderedSearch: U.renderedSearch,
            root: U.root,
            dynamicStaleAt: (0, p.computeDynamicStaleAt)(
              A,
              p.UnknownDynamicStaleTime,
            ),
            treeDivergedFromBase: !1,
          }),
          v(A, O, w, $, K, C, M, I, F, N, j, D, k, H, null, U, void 0))
        : S(L, d, h, y, g, R, _, m, P, E, b, null, T).catch(() => d)
    );
  }
  function v(e, t, n, r, a, l, o, i, c, s, f, d, h, p, y, g, v) {
    let _ = { separateRefreshUrls: null, scrollRef: null },
      S = n.href === l.href,
      P = (0, u.startPPRNavigation)(
        e,
        l,
        o,
        i,
        a.root,
        c,
        a.dynamicStaleAt,
        S,
        _,
        p,
        !1,
      );
    return null !== P
      ? (c !== u.FreshnessPolicy.Gesture &&
          (0, u.spawnDynamicRequests)(P, n, s, c, _, g, d, h, p, v),
        R(t, n, s, P, a.renderedSearch, r, d, f, _.scrollRef, y))
      : m(t, n, d);
  }
  let _ = ["", {}, null, "refetch"];
  async function S(e, t, n, r, a, s, f, d, h, p, g, S, R) {
    let P;
    switch (h) {
      case u.FreshnessPolicy.Default:
      case u.FreshnessPolicy.HistoryTraversal:
      case u.FreshnessPolicy.Gesture:
        P = d;
        break;
      case u.FreshnessPolicy.Hydration:
      case u.FreshnessPolicy.RefreshAll:
      case u.FreshnessPolicy.HMRRefresh:
        P = _;
        break;
      default:
        P = d;
    }
    let E = (0, l.fetchServerResponse)(n, { flightRouterState: P, nextUrl: s }),
      b = await E;
    if ("string" == typeof b) return m(t, new URL(b, location.origin), g);
    let {
        transportData: T,
        canonicalUrl: A,
        renderedSearch: O,
        couldBeIntercepted: w,
        supportsPerSegmentPrefetching: C,
        dynamicStaleTime: M,
        isResponsePartial: N,
        staticStageResponse: I,
        runtimePrefetchStream: F,
        responseHeaders: j,
        debugInfo: D,
      } = b,
      U = (0, y.createNavigationSeed)(e, d, T, null, N, null, O, null, M);
    return (
      (0, c.discoverKnownRoute)(
        e,
        n.pathname,
        n.search,
        s,
        null,
        U.root,
        w,
        (0, o.createHrefFromUrl)(A, !1),
        U.renderedSearch,
        C,
        !1,
      ),
      null !== I && (0, i.spawnStaticStageCacheWrite)(e, I, N, j, d, O, R),
      null !== F &&
        (0, i.writeRuntimePrefetchStreamIntoCache)(e, F, d, O, R).catch(
          () => {},
        ),
      null !== b.revealAfter && (await b.revealAfter),
      v(
        e,
        t,
        n,
        (0, o.createHrefFromUrl)(A),
        U,
        r,
        a,
        f,
        h,
        s,
        p,
        g,
        S,
        R,
        D,
        null,
        void 0,
      )
    );
  }
  function m(e, t, n) {
    return (0, h.isJavaScriptURLString)(t.href)
      ? (console.error(
          "Next.js has blocked a javascript: URL as a security precaution.",
        ),
        e)
      : {
          canonicalUrl:
            t.origin === location.origin ? (0, o.createHrefFromUrl)(t) : t.href,
          pushRef: {
            pendingPush: "push" === n,
            mpaNavigation: !0,
            preserveCustomHistoryState: !1,
          },
          renderedSearch: e.renderedSearch,
          scrollRef: e.scrollRef,
          root: e.root,
          tree: e.tree,
          nextUrl: e.nextUrl,
          previousNextUrl: e.previousNextUrl,
          debugInfo: null,
        };
  }
  function R(e, t, n, r, a, l, u, o, c, s) {
    let h,
      p,
      y = r.tree.route,
      g = (0, d.computeChangedPath)(e.tree, y) || e.nextUrl,
      v = new URL(e.canonicalUrl, t),
      _ =
        t.pathname === v.pathname && t.search === v.search && t.hash !== v.hash;
    if (o === f.ScrollBehavior.NoScroll)
      (null !== c && (c.current = !1), (h = e.scrollRef.scrollRef), (p = !1));
    else if (_) {
      let t = e.scrollRef.scrollRef;
      (null !== t && (t.current = !1),
        null !== c && (c.current = !1),
        (h = { current: !0 }),
        (p = !0));
    } else {
      if (((h = c), null !== c)) {
        let t = e.scrollRef.scrollRef;
        null !== t && (t.current = !1);
      }
      p = !1;
    }
    return {
      canonicalUrl: l,
      renderedSearch: a,
      pushRef: {
        pendingPush: "push" === u,
        mpaNavigation: !1,
        preserveCustomHistoryState: !1,
      },
      scrollRef: {
        scrollRef: h,
        forceScroll: p,
        onlyHashChange: _,
        hashFragment:
          o !== f.ScrollBehavior.NoScroll && "" !== t.hash
            ? decodeURIComponent(t.hash.slice(1))
            : e.scrollRef.hashFragment,
      },
      root: (0, i.createRootRouteTree)(r.tree.node, r.head.node),
      tree: y,
      nextUrl: g,
      previousNextUrl: n,
      debugInfo: s,
    };
  }
  function P(e, t, n, r, a) {
    return {
      canonicalUrl: (0, o.createHrefFromUrl)(t),
      renderedSearch: n,
      pushRef: {
        pendingPush: !1,
        mpaNavigation: !1,
        preserveCustomHistoryState: !0,
      },
      scrollRef: e.scrollRef,
      root: (0, i.createRootRouteTree)(r.tree.node, r.head.node),
      tree: r.tree.route,
      nextUrl: a,
      previousNextUrl: null,
      debugInfo: null,
    };
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
