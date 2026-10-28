// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (e.i(149502), Object.defineProperty(n, "__esModule", { value: !0 }));
  var r,
    a = {
      FreshnessPolicy: function () {
        return R;
      },
      beginLockedNavigation: function () {
        return G;
      },
      createInitialRenderTreeForHydration: function () {
        return E;
      },
      createRootNavigationTask: function () {
        return m;
      },
      getCurrentNavigationLock: function () {
        return X;
      },
      isDeferredRsc: function () {
        return q;
      },
      resetNavigationLockToPending: function () {
        return Y;
      },
      spawnDynamicRequests: function () {
        return H;
      },
      startPPRNavigation: function () {
        return b;
      },
    };
  for (var l in a) Object.defineProperty(n, l, { enumerable: !0, get: a[l] });
  let u = e.r(368418),
    o = e.r(706957),
    i = e.r(357830),
    c = e.r(790661),
    s = e.r(581131),
    f = e.r(212835),
    d = e.r(313537),
    h = e.r(263829),
    p = e.r(449030),
    y = e.r(260239),
    g = e.r(85396),
    v = e.r(994260),
    _ = e.r(190561),
    S = e.r(581761);
  function m(e, t) {
    return { tree: e, head: t };
  }
  var R =
    (((r = {})[(r.Default = 0)] = "Default"),
    (r[(r.Hydration = 1)] = "Hydration"),
    (r[(r.HistoryTraversal = 2)] = "HistoryTraversal"),
    (r[(r.RefreshAll = 3)] = "RefreshAll"),
    (r[(r.HMRRefresh = 4)] = "HMRRefresh"),
    (r[(r.Gesture = 5)] = "Gesture"),
    r);
  let P = () => {};
  function E(e, t, n) {
    let r = { separateRefreshUrls: null, scrollRef: null },
      a = g.segmentCacheMap;
    return m(
      w(e, t.tree, 1, n, !1, r, a, !1),
      w(e, t.head, 1, n, !1, r, a, !1),
    );
  }
  function b(e, t, n, r, a, l, u, o, i, s, f) {
    let d = { canonicalUrl: (0, c.createHrefFromUrl)(t), renderedSearch: n },
      h = A(e, r.tree, a.tree, l, u, o, !1, d, null, i, s, f);
    if (null === h) return null;
    let p = A(e, r.head, a.head, l, u, o, !1, d, null, i, s, f);
    return null === p ? null : m(h, p);
  }
  function T(e, t, n, r, a) {
    return { status: e, route: t, node: n, dynamicRequestTree: r, children: a };
  }
  function A(e, t, n, r, a, l, i, c, s, f, d, p) {
    var y;
    let v,
      m,
      R,
      P,
      E = n.segment;
    if (!(0, g.doesRouteStructureMatch)(t, n))
      return ((n.prefetchHints & u.PrefetchHint.IsRootLayoutOrAbove) != 0 &&
        (0, h.isNavigatingToNewRootLayout)(t, n)) ||
        E === o.NOT_FOUND_SEGMENT_KEY
        ? null
        : w(e, n, r, a, i, f, d, p);
    let b = n.slots,
      M = !1;
    switch (r) {
      case 0:
      case 2:
      case 1:
      case 5:
        M = !1;
        break;
      case 3:
      case 4:
        M = !0;
    }
    let D = null === b,
      k = (0, _.compareParams)(t.varyPath, n.varyPath);
    if (k !== _.ParamsChange.None) {
      let l;
      switch (
        ((l = k === _.ParamsChange.PathParam ? U(r) : t.data.bfcacheId), r)
      ) {
        case 0:
        case 5: {
          let u = t.data;
          if (
            !(0, _.didReadChangedParam)(t.varyPath, n.varyPath, u.varyParams)
          ) {
            let t = j(u.rsc, u.prefetchRsc, u.varyParams, l);
            (5 !== r && (0, S.writeToBFCache)(e, n.varyPath, t, a),
              (R = I(n, t)),
              (P = !1));
            break;
          }
        }
        case 1:
        case 2:
        case 3:
        case 4: {
          let t = F(e, n, r, a, l, d, p);
          ((R = t.node), (P = t.needsDynamicRequest));
        }
      }
      D && O(r, R.data, f);
    } else if (M || (D && l)) {
      let l = F(e, n, r, a, t.data.bfcacheId, d, p);
      ((R = l.node),
        (P = l.needsDynamicRequest),
        (R.data.scrollRef = t.data.scrollRef));
    } else ((R = I(n, t.data)), (P = !1));
    let H = n.refreshState,
      L = null != H ? H : s;
    ((R.refreshState = L),
      P &&
        null !== L &&
        ((y = f),
        (v = L.canonicalUrl),
        null === (m = y.separateRefreshUrls)
          ? (y.separateRefreshUrls = new Set([v]))
          : m.add(v)));
    let x = {},
      B = null,
      V = !1,
      $ = {};
    if (null !== b) {
      let n = t.slots,
        u = new Map();
      for (let [t, s] of ((R.slots = u), (B = new Map()), b)) {
        let h = n?.get(t);
        if (void 0 === h) return null;
        let y = h.segment,
          v = s.segment;
        2 !== r &&
          v === o.DEFAULT_SEGMENT_KEY &&
          y !== o.DEFAULT_SEGMENT_KEY &&
          k !== _.ParamsChange.PathParam &&
          (s = (function (e, t) {
            let n,
              r,
              a = t.refreshState;
            null !== a
              ? ((n = a.canonicalUrl), (r = a.renderedSearch))
              : ((n = e.canonicalUrl), (r = e.renderedSearch));
            let l = (0, g.rebaseInactiveRouteTree)(t);
            return (
              (l.refreshState = { canonicalUrl: n, renderedSearch: r }),
              l
            );
          })(c, h));
        let S = A(e, h, s, r, a, l, i || P, c, L, f, d, p);
        if (null === S) return null;
        (B.set(t, S), u.set(t, S.node));
        let m = S.route;
        x[t] = m;
        let R = S.dynamicRequestTree;
        null !== R ? ((V = !0), ($[t] = R)) : ($[t] = m);
      }
    }
    let K = C(n, x, L);
    return T(+!P, K, R, N(K, $, P, V, i), B);
  }
  function O(e, t, n) {
    switch (e) {
      case 0:
      case 5:
      case 3:
      case 4:
        (null === n.scrollRef && (n.scrollRef = { current: !0 }),
          (t.scrollRef = n.scrollRef));
    }
  }
  function w(e, t, n, r, a, l, u, o) {
    let i = t.slots,
      c = F(e, t, n, r, U(n), u, o),
      s = c.node,
      f = c.needsDynamicRequest;
    null === i && O(n, s.data, l);
    let d = {},
      h = null,
      p = !1,
      y = {};
    if (null !== i) {
      let t = new Map();
      for (let [c, g] of ((s.slots = t), (h = new Map()), i)) {
        let i = w(e, g, n, r, a || f, l, u, o);
        (h.set(c, i), t.set(c, i.node));
        let s = i.route;
        d[c] = s;
        let v = i.dynamicRequestTree;
        null !== v ? ((p = !0), (y[c] = v)) : (y[c] = s);
      }
    }
    let g = C(t, d, null);
    return T(+!f, g, s, N(g, y, f, p, a), h);
  }
  function C(e, t, n) {
    let r = [
      e.segment,
      t,
      null !== n ? [n.canonicalUrl, n.renderedSearch] : null,
      null,
      e.prefetchHints,
    ];
    if (e.segment === o.PAGE_SEGMENT_KEY) {
      let t = (0, _.getRenderedSearchFromVaryPath)(e.varyPath);
      null !== t && (r[5] = t);
    }
    return r;
  }
  function M(e, t) {
    let n = [e[0], t];
    return (
      2 in e && (n[2] = e[2]),
      3 in e && (n[3] = e[3]),
      4 in e && (n[4] = e[4]),
      5 in e && (n[5] = e[5]),
      n
    );
  }
  function N(e, t, n, r, a) {
    let l = null;
    return (
      n ? ((l = M(e, t)), a || (l[3] = "refetch")) : (l = r ? M(e, t) : null),
      l
    );
  }
  function I(e, t) {
    return {
      requestKey: e.requestKey,
      segment: e.segment,
      shellVaryPath: e.shellVaryPath,
      refreshState: null,
      data: t,
      varyPath: e.varyPath,
      slots: null,
      prefetchHints: e.prefetchHints,
    };
  }
  function F(e, t, n, r, a, l, u) {
    let o,
      c,
      s,
      f,
      d,
      h,
      p,
      y,
      v = t.data,
      _ = null !== v ? v.rsc : null,
      m = null !== v ? v.varyParams : null;
    switch (n) {
      case 0: {
        let n = (0, S.readFromBFCacheDuringRegularNavigation)(e, t.varyPath);
        if (null !== n)
          return {
            node: I(t, j(n.rsc, n.prefetchRsc, n.varyParams, a)),
            needsDynamicRequest: !1,
          };
        break;
      }
      case 1: {
        let n = j(_, null, m, a);
        return (
          (0, S.writeToBFCache)(e, t.varyPath, n, r),
          { node: I(t, n), needsDynamicRequest: !1 }
        );
      }
      case 2:
        let R = (0, S.readFromBFCache)(t.varyPath);
        if (null !== R) {
          let e = R.rsc,
            n = !q(e) || "pending" !== e.status;
          return {
            node: I(
              t,
              j(R.rsc, n ? null : R.prefetchRsc, R.varyParams, R.bfcacheId),
            ),
            needsDynamicRequest: !1,
          };
        }
    }
    let P = null,
      E = !0,
      b = null,
      T = (0, g.readSegmentCacheEntryForNavigation)(e, l, t.varyPath, u);
    if (null !== T)
      switch (T.status) {
        case g.EntryStatus.Fulfilled:
          ((P = T.rsc), (E = T.isPartial), (b = T.varyParams));
          break;
        case g.EntryStatus.Pending:
          ((P = (0, g.waitForSegmentCacheEntry)(T).then((e) =>
            null !== e ? e.rsc : null,
          )),
            (E = T.isPartial));
        case g.EntryStatus.Empty:
        case g.EntryStatus.Rejected:
      }
    (t.segment === i.HEAD_REQUEST_KEY && E && (P = ""),
      null !== _
        ? (E ? ((d = P), (h = _), (p = m)) : ((d = null), (h = P), (p = b)),
          (y = !1))
        : (E
            ? ((d = P),
              (s = []),
              ((f = new Promise((e, t) => {
                ((o = e), (c = t));
              })).status = "pending"),
              (f.resolve = (e, t) => {
                "pending" === f.status &&
                  ((f.status = "fulfilled"),
                  (f.value = e),
                  null !== t && s.push.apply(s, t),
                  o(e));
              }),
              (f.reject = (e, t) => {
                "pending" === f.status &&
                  ((f.status = "rejected"),
                  (f.reason = e),
                  null !== t && s.push.apply(s, t),
                  c(e));
              }),
              (f.tag = K),
              (f._debugInfo = s),
              (h = f),
              (p = null))
            : ((d = null), (h = P), (p = b)),
          (y = E)));
    let A = j(h, d, p, a);
    return (
      5 !== n && (0, S.writeToBFCache)(e, t.varyPath, A, r),
      { node: I(t, A), needsDynamicRequest: y }
    );
  }
  function j(e, t, n, r, a = null) {
    return {
      rsc: e,
      prefetchRsc: t,
      varyParams: n,
      scrollRef: a,
      bfcacheId: r,
    };
  }
  let D = 0;
  function U(e) {
    return "u" < typeof window || 1 === e ? 0 : ++D;
  }
  let k = !1;
  function H(e, t, n, r, a, l, u, o, i, s) {
    let f = e.tree.dynamicRequestTree;
    if (null === f)
      if (0 === e.head.status) f = g.MetadataOnlyRequestTree;
      else {
        k = !1;
        return;
      }
    let d = B(e.tree, e.head, f, t, n, r, l, o, i, s),
      h = a.separateRefreshUrls,
      p = null;
    if (null !== h) {
      p = [];
      let a = (0, c.createHrefFromUrl)(t);
      for (let t of h) {
        if (t === a) continue;
        let u = f;
        null !== u &&
          p.push(
            B(e.tree, null, u, new URL(t, location.origin), n, r, l, o, i, s),
          );
      }
    }
    L(e, n, d, p, l, u).then(P, P);
  }
  async function L(e, t, n, r, a, l) {
    var u, o;
    let i = await ((u = n),
    (o = r),
    new Promise((e) => {
      let t = (t) => {
          0 === t.exitStatus ? 0 == --r && e(0) : e(t.exitStatus);
        },
        n = () => e(2),
        r = 1;
      (u.then(t, n),
        null !== o && ((r += o.length), o.forEach((e) => e.then(t, n))));
    }));
    if (0 === i) {
      i = $(e.tree, null, null);
      let t = $(e.head, null, null);
      t > i && (i = t);
    }
    switch (i) {
      case -1:
        return;
      case 0:
        k = !1;
        return;
      case 1: {
        let r = await n;
        x(!1, r.url, t, r.seed, e, a, l, 3);
        return;
      }
      case 3: {
        let r = await n;
        x(!1, r.url, t, r.seed, e, a, l, 2);
        return;
      }
      case 2: {
        let r = await n;
        x(!0, r.url, t, r.seed, e, a, l, 3);
        return;
      }
      default:
        return i;
    }
  }
  function x(e, t, n, r, a, l, u, o) {
    if (null !== l) {
      let e = l.predictedFrom;
      null !== e && (e.hasDynamicRewrite = !0);
    } else if (null !== r) {
      let e = Date.now();
      (0, v.discoverKnownRoute)(
        e,
        t.pathname,
        t.search,
        n,
        null,
        r.root,
        !1,
        (0, c.createHrefFromUrl)(t),
        r.renderedSearch,
        !1,
        !0,
      );
    }
    ((0, g.invalidateRouteCacheEntries)(n, {
      tree: a.tree.node,
      head: a.head.node,
    }),
      (e = e || k),
      (k = !0));
    let i = a.tree.route,
      s = (0, p.getLastCommittedTree)(),
      h = {
        type: d.ACTION_SERVER_PATCH,
        previousTree: i,
        url: t,
        nextUrl: n,
        seed: r,
        mpa: e,
        navigateType: null !== s && i !== s ? u : "replace",
        freshnessPolicy: o,
      };
    (0, f.dispatchAppRouterAction)(h);
  }
  async function B(e, t, n, r, a, l, u, o, i, c) {
    try {
      let o = await (0, s.fetchServerResponse)(r, {
        flightRouterState: n,
        nextUrl: a,
        isHmrRefresh: 4 === l,
        signal: c,
      });
      if ("string" == typeof o)
        return { exitStatus: 2, url: new URL(o, location.origin), seed: null };
      let f = Date.now(),
        d = (0, y.createNavigationSeed)(
          f,
          e.route,
          o.transportData,
          null,
          o.isResponsePartial,
          null,
          o.renderedSearch,
          null,
          o.dynamicStaleTime,
        );
      (null !== u &&
        null !== o.staticStageResponse &&
        (0, g.spawnStaticStageCacheWrite)(
          f,
          o.staticStageResponse,
          o.isResponsePartial,
          o.responseHeaders,
          n,
          o.renderedSearch,
          i,
        ),
        null !== u &&
          null !== o.runtimePrefetchStream &&
          (0, g.writeRuntimePrefetchStreamIntoCache)(
            f,
            o.runtimePrefetchStream,
            n,
            o.renderedSearch,
            i,
          ).catch(() => {}));
      let h = (0, S.computeDynamicStaleAt)(f, o.dynamicStaleTime),
        p = V(e, d.root.tree, h, o.debugInfo, o.revealAfter);
      null !== t && V(t, d.root.head, h, o.debugInfo, o.revealAfter);
      let v = new URL(o.canonicalUrl, location.origin),
        _ = !1;
      if (null !== u) {
        let e = new URL(u.canonicalUrl, location.origin);
        _ = e.pathname !== v.pathname || e.search !== v.search;
      }
      return { exitStatus: p ? 1 : 3 * !!_, url: v, seed: d };
    } catch {
      if (c?.aborted) return { exitStatus: -1, url: r, seed: null };
      return { exitStatus: 2, url: r, seed: null };
    }
  }
  function V(e, t, n, r, a) {
    let l = t.data;
    if (0 === e.status && null !== l) {
      e.status = 1;
      let u = e.node.data;
      ((function (e, t, n, r) {
        let a = e.rsc,
          l = t.rsc;
        if (null !== l) {
          if (null === a) ((e.rsc = l), (e.varyParams = t.varyParams));
          else if (q(a) && "pending" === a.status)
            if (((e.varyParams = t.varyParams), null !== r)) {
              let e = () => a.resolve(l, n);
              r.then(e, e);
            } else a.resolve(l, n);
        }
      })(u, l, r, a),
        (0, S.updateBFCacheEntryFromDynamicResponse)(t.varyPath, u, n));
    }
    let u = e.children,
      o = t.slots,
      i = !1;
    if (null !== u)
      if (null !== o)
        for (let [e, t] of o) {
          let l = u.get(e);
          void 0 === l
            ? (i = !0)
            : (0, g.doesRouteStructureMatch)(l.node, t) &&
              null !== t.data &&
              (0, _.compareParams)(l.node.varyPath, t.varyPath) ===
                _.ParamsChange.None &&
              V(l, t, n, r, a) &&
              (i = !0);
        }
      else null !== o && (i = !0);
    return i;
  }
  function $(e, t, n) {
    var r, a, l;
    let u, o;
    0 === e.status
      ? ((e.status = 2),
        (r = e.node.data),
        (a = t),
        (l = n),
        q((o = r.rsc)) && (null === a ? o.resolve(null, l) : o.reject(a, l)),
        (u = null === e.node.refreshState ? 1 : 2))
      : (u = 0);
    let i = e.children;
    if (null !== i)
      for (let [, e] of i) {
        let r = $(e, t, n);
        r > u && (u = r);
      }
    return u;
  }
  let K = Symbol();
  function q(e) {
    return e && "object" == typeof e && e.tag === K;
  }
  function X() {
    return null;
  }
  function G() {
    return null;
  }
  function Y() {}
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
