// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (e.i(149502), Object.defineProperty(n, "__esModule", { value: !0 }));
  var r = {
    EntryStatus: function () {
      return y.EntryStatus;
    },
    MetadataOnlyRequestTree: function () {
      return N;
    },
    attemptToFulfillDynamicSegmentFromBFCache: function () {
      return en;
    },
    attemptToUpgradeSegmentFromBFCache: function () {
      return er;
    },
    bufferPrefetchResponseBody: function () {
      return eA;
    },
    canNewFetchStrategyProvideMoreContent: function () {
      return eO;
    },
    convertFlightRouterStateToRouteTree: function () {
      return eh;
    },
    convertRootFlightRouterStateToRouteTree: function () {
      return ed;
    },
    convertRouteTreeToFlightRouterState: function () {
      return function e(t) {
        let n = {},
          r = t.slots;
        if (null !== r) for (let [t, a] of r) n[t] = e(a);
        let a = [t.segment, n, null, null];
        return (0 !== t.prefetchHints && (a[4] = t.prefetchHints), a);
      };
    },
    createDetachedSegmentCacheEntry: function () {
      return ee;
    },
    createMetadataRouteTree: function () {
      return eu;
    },
    createRootRouteTree: function () {
      return C;
    },
    deprecated_requestOptimisticRouteCacheEntry: function () {
      return Y;
    },
    doesRouteStructureMatch: function () {
      return M;
    },
    fetchRouteOnCacheMiss: function () {
      return ep;
    },
    fetchSegmentPrefetchesUsingRuntimeRequest: function () {
      return eS;
    },
    fetchSegmentPrefetchesUsingStaticRequest: function () {
      return ey;
    },
    fulfillRouteCacheEntry: function () {
      return ei;
    },
    getCurrentRouteCacheVersion: function () {
      return k;
    },
    getCurrentSegmentCacheVersion: function () {
      return H;
    },
    getHeadRequestKey: function () {
      return el;
    },
    getStaleTimeMs: function () {
      return O;
    },
    invalidateEntirePrefetchCache: function () {
      return L;
    },
    invalidateRouteCacheEntries: function () {
      return x;
    },
    invalidateSegmentCacheEntries: function () {
      return B;
    },
    overwriteRevalidatingSegmentCacheEntry: function () {
      return Q;
    },
    pingInvalidationListeners: function () {
      return V;
    },
    readOrCreateRevalidatingSegmentEntry: function () {
      return z;
    },
    readOrCreateRouteCacheEntry: function () {
      return G;
    },
    readOrCreateSegmentCacheEntry: function () {
      return W;
    },
    readRouteCacheEntry: function () {
      return $;
    },
    readSegmentCacheEntryForNavigation: function () {
      return K;
    },
    rebaseInactiveRouteTree: function () {
      return function e(t) {
        let n = null;
        if (null !== t.slots)
          for (let [r, a] of ((n = new Map()), t.slots)) n.set(r, e(a));
        return {
          requestKey: t.requestKey,
          segment: t.segment,
          varyPath: t.varyPath,
          shellVaryPath: t.shellVaryPath,
          refreshState: t.refreshState,
          data: null,
          slots: n,
          prefetchHints: t.prefetchHints,
        };
      };
    },
    resolveStaleAt: function () {
      return ew;
    },
    segmentCacheMap: function () {
      return F;
    },
    spawnStaticStageCacheWrite: function () {
      return eC;
    },
    stripIsPartialByte: function () {
      return eN;
    },
    upgradeToPendingSegment: function () {
      return et;
    },
    upsertSegmentEntry: function () {
      return Z;
    },
    waitForSegmentCacheEntry: function () {
      return q;
    },
    writeRouteIntoCache: function () {
      return ec;
    },
    writeRuntimePrefetchStreamIntoCache: function () {
      return eM;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = e.r(368418),
    u = e.r(438188),
    o = e.r(136305),
    i = e.r(674637),
    c = e.r(581131);
  e.r(964724);
  let s = e.r(685003),
    f = e.r(190561),
    d = e.r(790661),
    h = e.r(946859),
    p = e.r(188294),
    y = e.r(948176),
    g = e.r(357830),
    v = e.r(71223),
    _ = e.r(561448),
    S = e.r(360601),
    m = e.r(634258),
    R = e.r(815812),
    P = e.r(581761),
    E = e.r(994260),
    b = e.r(260239),
    T = e.r(107793),
    A = e.r(369095);
  function O(e) {
    return 1e3 * Math.max(e, 30);
  }
  function w(e) {
    return Date.now() + 1e4;
  }
  function C(e, t) {
    return { tree: e, head: t };
  }
  function M(e, t) {
    return (
      e.requestKey === t.requestKey &&
      (t.requestKey !== g.ROOT_SEGMENT_REQUEST_KEY || e.segment === t.segment)
    );
  }
  let N = ["", {}, null, "metadata-only"],
    I = (0, y.createCacheMap)(),
    F = (0, y.createCacheMap)(),
    j = null,
    D = 0,
    U = 0;
  function k() {
    return D;
  }
  function H() {
    return U;
  }
  function L(e, t) {
    (D++, U++, (0, S.pingVisibleLinks)(e, t), V(e, t));
  }
  function x(e, t) {
    (D++, (0, S.pingVisibleLinks)(e, t), V(e, t));
  }
  function B(e, t) {
    (U++, (0, S.pingVisibleLinks)(e, t), V(e, t));
  }
  function V(e, t) {
    if (null !== j) {
      let n = j;
      for (let r of ((j = null), n))
        (0, s.isPrefetchTaskDirty)(r, e, t) &&
          (function (e) {
            let t = e.onInvalidate;
            if (null !== t) {
              e.onInvalidate = null;
              try {
                t();
              } catch (e) {
                "function" == typeof reportError
                  ? reportError(e)
                  : console.error(e);
              }
            }
          })(r);
    }
  }
  function $(e, t) {
    let n = (0, f.getRouteVaryPath)(t.pathname, t.search, t.nextUrl),
      r = (0, y.getFromCacheMap)(e, D, I, n, !1, !1);
    return null !== r ? r : (0, E.matchKnownRoute)(e, t.pathname, t.search);
  }
  function K(e, t, n, r = !1) {
    let a = (0, y.getFromCacheMap)(e, U, t, n, !1, !0);
    return null !== a ? a : (0, y.getFromCacheMap)(e, U, t, n, !1, !1);
  }
  function q(e) {
    let t = e.promise;
    return (
      null === t && (t = e.promise = (0, R.createPromiseWithResolvers)()),
      t.promise
    );
  }
  function X() {
    return {
      canonicalUrl: null,
      status: y.EntryStatus.Empty,
      blockedTasks: null,
      root: null,
      couldBeIntercepted: !0,
      supportsPerSegmentPrefetching: !1,
      predictedFrom: null,
      renderedSearch: null,
      ref: null,
      size: 0,
      staleAt: 1 / 0,
      version: D,
    };
  }
  function G(e, t, n) {
    null !== t.onInvalidate && (null === j ? (j = new Set([t])) : j.add(t));
    let r = $(e, n);
    if (null !== r) return r;
    let a = X(),
      l = (0, f.getRouteVaryPath)(n.pathname, n.search, n.nextUrl);
    return ((0, y.setInCacheMap)(I, l, a, !1), a);
  }
  function Y(e, t, n) {
    let r = t.search;
    if ("" === r) return null;
    let a = new URL(t);
    a.search = "";
    let l = $(e, (0, h.createCacheKey)(a.href, n));
    if (null === l || l.status !== y.EntryStatus.Fulfilled) return null;
    let u = new URL(l.canonicalUrl, t.origin),
      o = "" !== u.search ? u.search : r,
      i =
        "" !== l.renderedSearch
          ? l.renderedSearch
          : (0, p.normalizeRenderedSearch)(r),
      c = new URL(l.canonicalUrl, location.origin);
    c.search = o;
    let s = (0, d.createHrefFromUrl)(c),
      g = (function e(t, n) {
        let r = null,
          a = t.slots;
        if (null !== a)
          for (let [t, l] of ((r = new Map()), a)) r.set(t, e(l, n));
        return {
          requestKey: t.requestKey,
          segment: t.segment,
          shellVaryPath: t.shellVaryPath,
          refreshState: t.refreshState,
          data: null,
          varyPath: (0, f.cloneVaryPathWithNewSearchParams)(t.varyPath, n),
          slots: r,
          prefetchHints: t.prefetchHints,
        };
      })(l.root.tree, i),
      v = l.root.head,
      _ = eu(
        (0, f.cloneVaryPathWithNewSearchParams)(v.varyPath, i),
        v.prefetchHints,
        null,
      );
    return {
      canonicalUrl: s,
      status: y.EntryStatus.Fulfilled,
      blockedTasks: null,
      root: C(g, _),
      couldBeIntercepted: l.couldBeIntercepted,
      supportsPerSegmentPrefetching: l.supportsPerSegmentPrefetching,
      predictedFrom: null,
      renderedSearch: i,
      ref: null,
      size: 0,
      staleAt: l.staleAt,
      version: l.version,
    };
  }
  function W(e, t, n, r) {
    var a, l, u, o;
    let i,
      c,
      s = (0, y.getFromCacheMap)(e, U, t, r.varyPath, !1, !1);
    return null !== s
      ? s
      : ((a = e),
        (l = t),
        (u = n),
        (o = r),
        (i = (0, f.getSegmentVaryPathForRequest)(u, o)),
        (c = ee(a)),
        (0, y.setInCacheMap)(l, i, c, !1),
        c);
  }
  function z(e, t, n, r) {
    var a;
    let l = ((a = r.varyPath), (0, y.getFromCacheMap)(e, U, t, a, !0, !1));
    if (null !== l) return l;
    let u = (0, f.getSegmentVaryPathForRequest)(n, r),
      o = ee(e);
    return ((0, y.setInCacheMap)(t, u, o, !0), o);
  }
  function Q(e, t, n, r) {
    let a = (0, f.getSegmentVaryPathForRequest)(n, r),
      l = ee(e);
    return ((0, y.setInCacheMap)(t, a, l, !0), l);
  }
  function J(e, t) {
    var n;
    return (
      e.status !== y.EntryStatus.Empty &&
      ((t.fetchStrategy !== e.fetchStrategy &&
        ((n = e.fetchStrategy), !(n < t.fetchStrategy))) ||
        (!e.isPartial && t.isPartial))
    );
  }
  function Z(e, t, n, r, a) {
    if ((0, y.isValueExpired)(e, U, r)) return null;
    let l = (0, y.getFromCacheMap)(e, U, t, n, !1, !1);
    if (null !== l) {
      if (J(l, r)) return null;
      (l.status === y.EntryStatus.Empty ||
        l.status === y.EntryStatus.Pending) &&
        ea(l);
    }
    return (
      (0, y.setInCacheMap)(t, n, r, !1),
      null !== a &&
        (function (e, t, n, r) {
          for (let a = 0; a < 32; a++) {
            let a = (0, y.getFromCacheMap)(e, U, t, n, !1, !1);
            if (
              null === a ||
              a === r ||
              a.status === y.EntryStatus.Pending ||
              J(a, r)
            )
              return;
            (ea(a), (0, y.deleteFromCacheMap)(a));
          }
        })(e, t, a, r),
      r
    );
  }
  function ee(e) {
    return {
      status: y.EntryStatus.Empty,
      blockedTasks: null,
      fetchStrategy: m.FetchStrategy.PPR,
      rsc: null,
      isPartial: !0,
      isUpgradeableISRFallback: !1,
      promise: null,
      ref: null,
      size: 0,
      staleAt: e + 3e4,
      version: 0,
    };
  }
  function et(e, t) {
    return (
      (e.status = y.EntryStatus.Pending),
      (e.fetchStrategy = t),
      t === m.FetchStrategy.Full && (e.isPartial = !1),
      (e.version = U),
      e
    );
  }
  function en(e, t, n) {
    let r = n.varyPath,
      a = (0, P.readFromBFCache)(r);
    if (null !== a) {
      let n = a.navigatedAt + _.STATIC_STALETIME_MS;
      return e > n
        ? null
        : es(
            et(t, m.FetchStrategy.Full),
            a.rsc,
            n,
            !1,
            a.varyParams,
            !1,
            m.FetchStrategy.Full,
          );
    }
    return null;
  }
  function er(e, t, n) {
    let r = n.varyPath,
      a = (0, P.readFromBFCache)(r);
    if (null !== a) {
      let r = a.navigatedAt + _.STATIC_STALETIME_MS;
      if (e > r) return null;
      let l = es(
          et(ee(e), m.FetchStrategy.Full),
          a.rsc,
          r,
          !1,
          a.varyParams,
          !1,
          m.FetchStrategy.Full,
        ),
        u = Z(
          e,
          t,
          (0, f.getSegmentVaryPathForRequest)(m.FetchStrategy.Full, n),
          l,
          n.varyPath,
        );
      if (null !== u && u.status === y.EntryStatus.Fulfilled) return u;
    }
    return null;
  }
  function ea(e) {
    let t = e.blockedTasks;
    if (null !== t) {
      for (let e of t) (0, s.pingPrefetchTask)(e);
      e.blockedTasks = null;
    }
  }
  function el(e) {
    return e + g.HEAD_REQUEST_KEY;
  }
  function eu(e, t, n) {
    return {
      requestKey: e.value,
      segment: g.HEAD_REQUEST_KEY,
      shellVaryPath: (0, f.getShellSegmentVaryPath)(e),
      refreshState: null,
      data: n,
      varyPath: e,
      slots: null,
      prefetchHints: t & l.StaticAttemptHints,
    };
  }
  function eo(e) {
    let t = null,
      n = e.slots;
    if (null !== n)
      for (let [e, r] of n) {
        let a = eo(r);
        (a !== r && null === t && (t = new Map(n)), null !== t && t.set(e, a));
      }
    if (null === e.data && null === t) return e;
    let r = t ?? n;
    return {
      requestKey: e.requestKey,
      segment: e.segment,
      shellVaryPath: e.shellVaryPath,
      refreshState: e.refreshState,
      data: null,
      varyPath: e.varyPath,
      slots: r,
      prefetchHints: e.prefetchHints,
    };
  }
  function ei(e, t, n, r, a, u, o) {
    let i = n.tree;
    return (
      (t.status = y.EntryStatus.Fulfilled),
      (t.root = C(eo(i), eo(n.head))),
      i.prefetchHints & l.PrefetchHint.InliningHintsStale
        ? (t.staleAt = -1)
        : (t.staleAt = e + _.STATIC_STALETIME_MS),
      (t.couldBeIntercepted = r),
      (t.canonicalUrl = a),
      (t.renderedSearch = u),
      (t.supportsPerSegmentPrefetching = o),
      ea(t),
      t
    );
  }
  function ec(e, t, n, r, a, l, u, o, i) {
    let c = ei(e, X(), a, l, u, o, i),
      s = (0, f.getFulfilledRouteVaryPath)(t, n, r, l);
    return ((0, y.setInCacheMap)(I, s, c, !1), c);
  }
  function es(e, t, n, r, a, l, u) {
    return (
      (e.status = y.EntryStatus.Fulfilled),
      (e.rsc = t),
      (e.staleAt = n),
      (e.isPartial = r),
      (e.varyParams = a),
      (e.isUpgradeableISRFallback = l),
      (e.fetchStrategy = u),
      null !== e.promise && (e.promise.resolve(e), (e.promise = null)),
      ea(e),
      e
    );
  }
  function ef(e, t) {
    ((e.status = y.EntryStatus.Rejected), (e.staleAt = t), ea(e));
  }
  function ed(e, t, n) {
    return eh(e, g.ROOT_SEGMENT_REQUEST_KEY, null, t, n);
  }
  function eh(e, t, n, r, a) {
    let u = e[0],
      o = ((e[4] ?? 0) & l.PrefetchHint.IsRootLayoutOrAbove) != 0,
      i = e[2] ?? null,
      c = null !== i ? { canonicalUrl: i[0], renderedSearch: i[1] } : null,
      s = null !== c ? c.renderedSearch : r,
      d = (0, b.createRouteTreeNode)(u, o, t, n, s, c, a),
      h = (0, f.getPartialVaryPath)(d.varyPath),
      p = null,
      y = e[1];
    for (let e in y) {
      let n = y[e],
        r = n[0],
        l = (0, g.createSegmentRequestKeyPart)(r),
        u = eh(n, (0, g.appendSegmentRequestKeyPart)(t, e, l), h, s, a);
      (null === p && (p = new Map()), p.set(e, u));
    }
    return ((d.slots = p), (d.prefetchHints = e[4] ?? 0), d);
  }
  async function ep(e, t) {
    let n = t.pathname,
      r = t.search,
      a = t.nextUrl,
      l = {
        [i.RSC_HEADER]: "1",
        [i.NEXT_ROUTER_PREFETCH_HEADER]: "1",
        [i.NEXT_ROUTER_SEGMENT_PREFETCH_HEADER]: "/_tree",
      };
    null !== a && (l[i.NEXT_URL] = a);
    try {
      let t,
        u,
        o = new URL(n + r, location.origin);
      if (
        ((t = await eb(o, l)),
        (u = null !== t && t.redirected ? new URL(t.url) : o),
        !t || !t.ok || !t.body)
      )
        return (ef(e, Date.now() + 1e4), null);
      let s = (0, d.createHrefFromUrl)(u),
        h = t.headers.get("vary"),
        g = null !== h && h.includes(i.NEXT_URL),
        v = (0, R.createPromiseWithResolvers)(),
        _ = eT(t),
        S = await eA(t.body);
      (v.resolve(), (0, y.setSizeInCacheMap)(e, S.byteLength));
      let m = await (0, c.decodeBufferedStage)(S, l);
      if (
        (t.headers.get(A.NEXT_NAV_DEPLOYMENT_ID_HEADER) ?? m.b) !==
        (0, T.getNavigationBuildId)()
      )
        return (ef(e, Date.now() + 1e4), null);
      let P = m.t;
      if (void 0 === P || void 0 !== m.n)
        return (ef(e, Date.now() + 1e4), null);
      let O = (0, p.getRenderedPathname)(t),
        w = (0, p.getRenderedSearch)(t),
        C = { metadataVaryPath: null, treeDivergedFromBase: !1 },
        M = (0, b.decodeTransportTreeIntoRouteTree)(
          P.t,
          null,
          null,
          !0,
          O,
          w,
          C,
        ),
        N = C.metadataVaryPath;
      if (null === N) return (ef(e, Date.now() + 1e4), null);
      if (
        ((0, E.discoverKnownRoute)(
          Date.now(),
          n,
          r,
          a,
          e,
          { tree: M, head: eu(N, M.prefetchHints, null) },
          g,
          s,
          w,
          _,
          !1,
        ),
        !g)
      ) {
        let t = (0, f.getFulfilledRouteVaryPath)(n, r, a, g);
        (0, y.setInCacheMap)(I, t, e, !1);
      }
      return { value: null, closed: v.promise };
    } catch (t) {
      return (ef(e, w(t)), null);
    }
  }
  async function ey(e, t, n, r, a, l) {
    let u;
    try {
      u = await eg(e, t, n, r, a, l, !1);
    } catch (e) {
      return (em(a, w(e)), null);
    }
    return null === u
      ? (em(a, Date.now() + 1e4), null)
      : { value: null, closed: Promise.resolve() };
  }
  async function eg(e, t, n, r, a, l, u) {
    let s,
      f,
      d = new URL(t.canonicalUrl, location.origin),
      h = n.nextUrl;
    s =
      r.segment === g.HEAD_REQUEST_KEY
        ? g.HEAD_REQUEST_KEY
        : r.requestKey === g.ROOT_SEGMENT_REQUEST_KEY
          ? "/_index"
          : r.requestKey;
    let v = {
      [i.RSC_HEADER]: "1",
      [i.NEXT_ROUTER_PREFETCH_HEADER]: "1",
      [i.NEXT_ROUTER_SEGMENT_PREFETCH_HEADER]: s,
    };
    null !== h && (v[i.NEXT_URL] = h);
    let S = await eb(d, v);
    if (!S || !S.ok || !eT(S) || !S.body) return null;
    let m = await eA(S.body),
      R = await (0, c.decodeBufferedStage)(m, v);
    if (
      void 0 === R.t ||
      (S.headers.get(A.NEXT_NAV_DEPLOYMENT_ID_HEADER) ?? R.b) !==
        (0, T.getNavigationBuildId)()
    )
      return null;
    let P = !0 === R.f;
    if (P) {
      if (u) return !0;
      e.fallbackRetryStatus !== y.EntryStatus.Empty ||
        e.isCanceled ||
        ((e.fallbackRetryStatus = y.EntryStatus.Pending), e_(e, t, n, r, a, l));
    }
    let E = void 0 !== R.a ? (0, o.readFulfilledValue)(R.a, 0) : 0;
    if (null === E) f = R;
    else if (0 === E) f = null;
    else
      try {
        f = await (0, c.decodeBufferedStage)(m.subarray(0, E), v);
      } catch {
        f = null;
      }
    let b = (0, p.getRenderedPathname)(S),
      O = Date.now(),
      w = t.root.head.varyPath;
    return (
      eR(
        O,
        l,
        R,
        f,
        null,
        null,
        b,
        t.renderedSearch,
        void 0,
        O + _.STATIC_STALETIME_MS,
        !0,
        w,
        a,
        m.byteLength,
        e.segmentCacheMap,
      ),
      P
    );
  }
  function ev(e, t) {
    if (void 0 === t) return e + _.STATIC_STALETIME_MS;
    let n = (0, b.readFulfilledStaleTimeSeconds)(t);
    return null === n ? e + _.STATIC_STALETIME_MS : e + O(n);
  }
  async function e_(e, t, n, r, a, l) {
    for (let u = 0; u < 3; u++) {
      let u;
      if ((await new Promise((e) => setTimeout(e, 2e3)), e.isCanceled)) break;
      try {
        u = await eg(e, t, n, r, a, l, !0);
      } catch {
        break;
      }
      if (e.isCanceled) break;
      if (null !== u && !u) {
        ((e.fallbackRetryStatus = y.EntryStatus.Fulfilled),
          (0, s.pingPrefetchTask)(e));
        return;
      }
    }
    e.fallbackRetryStatus = y.EntryStatus.Rejected;
  }
  async function eS(e, t, n, r, a) {
    let l,
      u,
      o = e.key,
      s = new URL(t.canonicalUrl, location.origin),
      f = o.nextUrl;
    1 === a.size && a.has(t.root.head.requestKey)
      ? ((l = N), (u = null))
      : ((l = r), (u = t.predictedFrom));
    let d = {
      [i.RSC_HEADER]: "1",
      [i.NEXT_ROUTER_STATE_TREE_HEADER]: (0,
      v.prepareFlightRouterStateForRequest)(l),
    };
    switch ((null !== f && (d[i.NEXT_URL] = f), n)) {
      case m.FetchStrategy.Full:
        break;
      case m.FetchStrategy.PPRRuntime:
        d[i.NEXT_ROUTER_PREFETCH_HEADER] = "2";
        break;
      case m.FetchStrategy.RuntimeShell:
        d[i.NEXT_ROUTER_PREFETCH_HEADER] = "3";
        break;
      case m.FetchStrategy.LoadingBoundary:
        d[i.NEXT_ROUTER_PREFETCH_HEADER] = "1";
    }
    try {
      let r,
        o = await eb(s, d);
      if (!o || !o.ok || !o.body) return (em(a, Date.now() + 1e4), null);
      let i = (0, p.getRenderedSearch)(o);
      if (i !== t.renderedSearch) return (em(a, Date.now() + 1e4), null);
      let f = (0, R.createPromiseWithResolvers)(),
        v = null,
        S = null;
      if (n === m.FetchStrategy.Full) {
        var h, g, _;
        let e,
          t,
          n =
            ((h = o.body),
            (g = f.resolve),
            (_ = function (e) {
              if (null === v) return;
              let t = e / v.length;
              for (let e of v) (0, y.setSizeInCacheMap)(e, t);
            }),
            (e = 0),
            (t = h.getReader()),
            new ReadableStream({
              async pull(n) {
                for (;;) {
                  let { done: r, value: a } = await t.read();
                  if (!r) {
                    (n.enqueue(a), _((e += a.byteLength)));
                    continue;
                  }
                  (n.close(), g());
                  return;
                }
              },
            }));
        r = (0, c.createFromNextReadableStream)(n, d, {
          allowPartialStream: !0,
        });
      } else {
        let e = await eA(o.body);
        (f.resolve(),
          (S = e.byteLength),
          (r = (0, c.decodeBufferedStage)(e, d)));
      }
      let [P, E] = await Promise.all([r, o.cacheData]),
        b = Date.now(),
        T = await ew(b, P.s, o),
        O = o.headers.get(A.NEXT_NAV_DEPLOYMENT_ID_HEADER) ?? P.b,
        w = null !== E ? await (0, c.resolveShellStageResponse)(E, P, d) : null,
        C =
          (n === m.FetchStrategy.PPRRuntime ||
            n === m.FetchStrategy.RuntimeShell) &&
          (E?.isResponsePartial ?? !1);
      return (
        (v = eR(
          b,
          n,
          P,
          w,
          l,
          u,
          null,
          i,
          O,
          T,
          C,
          null,
          a,
          S,
          e.segmentCacheMap,
        )),
        { value: null, closed: f.promise }
      );
    } catch (e) {
      return (em(a, w(e)), null);
    }
  }
  function em(e, t) {
    for (let n of e.values())
      n.status === y.EntryStatus.Pending &&
        ((n.status = y.EntryStatus.Rejected),
        (n.staleAt = t),
        null !== n.promise && (n.promise.resolve(null), (n.promise = null)),
        ea(n));
  }
  function eR(e, t, n, r, a, l, u, o, i, c, s, f, d, h, p) {
    let g;
    if (null === r || t === m.FetchStrategy.LoadingBoundary) {
      if (t === m.FetchStrategy.StaticShell)
        return (
          eP(e, m.FetchStrategy.PPR, n, a, l, u, o, i, c, s, f, null, null, p),
          null !== d && em(d, e + 1e4),
          null
        );
      g = eP(e, t, n, a, l, u, o, i, c, s, f, d, null, p);
    } else if (r === n) {
      let r;
      switch (t) {
        case m.FetchStrategy.StaticShell:
          r = m.FetchStrategy.PPR;
          break;
        case m.FetchStrategy.RuntimeShell:
          r = m.FetchStrategy.PPRRuntime;
          break;
        case m.FetchStrategy.PPR:
        case m.FetchStrategy.PPRRuntime:
        case m.FetchStrategy.Full:
          r = null;
      }
      g = eP(e, t, n, a, l, u, o, i, c, s, f, d, r, p);
    } else {
      let h, y;
      switch (t) {
        case m.FetchStrategy.StaticShell:
        case m.FetchStrategy.PPR:
          ((h = m.FetchStrategy.PPR), (y = m.FetchStrategy.StaticShell));
          break;
        case m.FetchStrategy.RuntimeShell:
        case m.FetchStrategy.PPRRuntime:
          ((h = m.FetchStrategy.PPRRuntime),
            (y = m.FetchStrategy.RuntimeShell));
          break;
        case m.FetchStrategy.Full:
          ((h = m.FetchStrategy.Full), (y = m.FetchStrategy.StaticShell));
      }
      let v =
          t === m.FetchStrategy.StaticShell ||
          t === m.FetchStrategy.RuntimeShell,
        _ = eP(e, h, n, a, l, u, o, i, c, s, f, v ? null : d, null, p),
        S = eP(
          e,
          y,
          r,
          a,
          l,
          u,
          o,
          i,
          ev(e, r.s),
          !0,
          f,
          v ? d : null,
          null,
          p,
        );
      g = v ? S : _;
    }
    if (null !== h && null !== g && g.length > 0) {
      let e = h / g.length;
      for (let t of g) (0, y.setSizeInCacheMap)(t, e);
    }
    return g;
  }
  function eP(e, t, n, r, a, u, i, c, s, f, d, h, p, y) {
    if (c && c !== (0, T.getNavigationBuildId)())
      return (null !== h && em(h, e + 1e4), null);
    let g = n.t;
    if (void 0 === g) return (null !== h && em(h, e + 1e4), null);
    let v = (0, b.createNavigationSeed)(
        e,
        r,
        g,
        n.r ?? null,
        f,
        u,
        i,
        d,
        P.UnknownDynamicStaleTime,
      ),
      _ =
        (v.root.tree.prefetchHints &
          l.PrefetchHint.SubtreeHasPartialPrefetching) !=
        0,
      S = null !== a && v.treeDivergedFromBase;
    S && (a.hasDynamicRewrite = !0);
    let R = !0 === n.f,
      E = void 0 !== n.u ? (0, o.readFulfilledValue)(n.u, !1, !0) : null,
      A = v.root.tree,
      w = [];
    !(function e(t, n, r, a, l, u, o, i, c, s, f) {
      let d = a.data;
      if (null !== d && null !== d.rsc) {
        let e = null !== d.staleTimeSeconds ? t + O(d.staleTimeSeconds) : l,
          h = eE(
            t,
            n,
            r,
            d.rsc,
            d.isPartial,
            e,
            d.varyParams,
            a,
            u,
            o,
            i,
            c,
            s,
          );
        null !== h && f.push(h);
      }
      let h = a.slots;
      if (null !== h)
        for (let a of h.values()) e(t, n, r, a, l, u, o, i, c, s, f);
    })(e, y, t, A, s, h, p, R, _, E, w);
    let C = v.root.head,
      M = C.data;
    if (null !== M && null !== M.rsc) {
      let n = null !== M.staleTimeSeconds ? e + O(M.staleTimeSeconds) : s,
        r = eE(
          e,
          y,
          t === m.FetchStrategy.LoadingBoundary ? m.FetchStrategy.Full : t,
          M.rsc,
          M.isPartial,
          n,
          M.varyParams,
          C,
          h,
          p,
          R,
          _,
          E,
        );
      null !== r && w.push(r);
    }
    return (null !== h && em(h, S ? -1 : e + 1e4), w.length > 0 ? w : null);
  }
  function eE(e, t, n, r, a, l, o, i, c, s, d, h, p) {
    let g, v, _;
    if (null === p) g = s ?? n;
    else if (p && a) g = s ?? n;
    else {
      let e = s ?? n;
      g = h
        ? e === m.FetchStrategy.StaticShell
          ? m.FetchStrategy.RuntimeShell
          : e === m.FetchStrategy.PPR
            ? m.FetchStrategy.PPRRuntime
            : e
        : e;
    }
    let S = s ?? n,
      R = null,
      P = null;
    if (S !== m.FetchStrategy.Full && null !== o) {
      let e = (0, u.readVaryParams)(o);
      null !== e &&
        (S === m.FetchStrategy.RuntimeShell && e.has(u.SEARCH_PARAMS_VARY_ID)
          ? ((e = new Set(e)).delete(u.SEARCH_PARAMS_VARY_ID),
            (P = (0, u.createVaryParams)(e)))
          : (P = o),
        (R = (0, f.getFulfilledSegmentVaryPath)(i.varyPath, e)));
    }
    let E =
        null !== R
          ? R
          : S !== m.FetchStrategy.Full
            ? (0, f.getSegmentVaryPathForRequest)(S, i)
            : null,
      b = null !== c ? c.get(i.requestKey) : void 0,
      T = void 0 !== b && b.status === y.EntryStatus.Pending;
    return (T
      ? ((v = es(b, r, l, a, P, d, g)), (_ = E))
      : ((v = es(et(ee(e), n), r, l, a, P, d, g)),
        (_ = null !== E ? E : (0, f.getSegmentVaryPathForRequest)(n, i))),
    null === _ || null !== Z(e, t, _, v, i.varyPath) || T)
      ? v
      : null;
  }
  async function eb(e, t) {
    let n = await (0, c.createFetch)(e, t, "low", !1);
    if (!n.ok) return null;
    {
      let e = n.headers.get("content-type");
      if (!(e && e.startsWith(i.RSC_CONTENT_TYPE_HEADER))) return null;
    }
    return n;
  }
  function eT(e) {
    return "2" === e.headers.get(i.NEXT_DID_POSTPONE_HEADER);
  }
  async function eA(e, t) {
    let n = e.getReader(),
      r = [],
      a = 0;
    for (;;) {
      let { done: e, value: l } = await n.read();
      if (e) break;
      if (void 0 !== t && a + l.byteLength >= t) {
        let e = t - a;
        (e > 0 && (r.push(l.byteLength > e ? l.subarray(0, e) : l), (a += e)),
          n.cancel());
        break;
      }
      (r.push(l), (a += l.byteLength));
    }
    if (1 === r.length) return r[0];
    if (!(r.length > 1)) return new Uint8Array(0);
    {
      let e = new Uint8Array(a),
        t = 0;
      for (let n of r) (e.set(n, t), (t += n.byteLength));
      return e;
    }
  }
  function eO(e, t) {
    return e < t;
  }
  async function ew(e, t, n) {
    if (void 0 !== t) {
      let n;
      for await (let e of t) n = e;
      if (void 0 !== n) return e + (isNaN(n) ? _.STATIC_STALETIME_MS : O(n));
    }
    if (void 0 !== n) {
      let t;
      return (
        e +
        (isNaN(
          (t = parseInt(
            n.headers.get(i.NEXT_ROUTER_STALE_TIME_HEADER) ?? "",
            10,
          )),
        )
          ? _.STATIC_STALETIME_MS
          : O(t))
      );
    }
    return e + _.STATIC_STALETIME_MS;
  }
  function eC(e, t, n, r, a, l, u) {
    let o =
      null !== r ? (r.get(A.NEXT_NAV_DEPLOYMENT_ID_HEADER) ?? t.b) : void 0;
    ew(e, t.s)
      .then((r) => {
        eP(
          e,
          m.FetchStrategy.PPR,
          t,
          a,
          null,
          null,
          l,
          o,
          r,
          n,
          null,
          null,
          null,
          u,
        );
      })
      .catch(() => {});
  }
  async function eM(e, t, n, r, a) {
    let { stream: l, isPartial: u } = await eN(t),
      i = await eA(l),
      s = await (0, c.decodeBufferedStage)(i, void 0),
      f = null;
    if (void 0 !== s.a) {
      let e = (0, o.readFulfilledValue)(s.a, void 0);
      if (null === e) f = s;
      else if (void 0 !== e)
        try {
          f = await (0, c.decodeBufferedStage)(i.subarray(0, e), void 0);
        } catch {
          f = null;
        }
    }
    eR(
      e,
      m.FetchStrategy.PPRRuntime,
      s,
      f,
      n,
      null,
      null,
      r,
      s.b,
      ev(e, s.s),
      u,
      null,
      null,
      null,
      a,
    );
  }
  async function eN(e) {
    let t = e.getReader(),
      { done: n, value: r } = await t.read();
    if (n || !r || 0 === r.byteLength)
      return {
        stream: new ReadableStream({ start: (e) => e.close() }),
        isPartial: !0,
      };
    let a = r[0],
      l = 35 === a || 126 === a,
      u = l ? (r.byteLength > 1 ? r.subarray(1) : null) : r;
    return {
      isPartial: !l || 126 === a,
      stream: new ReadableStream({
        start(e) {
          u && e.enqueue(u);
        },
        async pull(e) {
          let n = await t.read();
          n.done ? e.close() : e.enqueue(n.value);
        },
      }),
    };
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
