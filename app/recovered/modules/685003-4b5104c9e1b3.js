// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (e.i(149502), Object.defineProperty(n, "__esModule", { value: !0 }));
  var r = {
    cancelPrefetchTask: function () {
      return m;
    },
    isPrefetchTaskDirty: function () {
      return P;
    },
    needsSpeculativePrefetch: function () {
      return x;
    },
    pingPrefetchScheduler: function () {
      return b;
    },
    pingPrefetchTask: function () {
      return w;
    },
    reschedulePrefetchTask: function () {
      return R;
    },
    schedulePrefetchTask: function () {
      return S;
    },
    startRevalidationCooldown: function () {
      return _;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = e.r(190561),
    u = e.r(368418),
    o = e.r(85396),
    i = e.r(946859),
    c = e.r(634258),
    s = e.r(237833),
    f =
      "function" == typeof queueMicrotask
        ? queueMicrotask
        : (e) =>
            Promise.resolve()
              .then(e)
              .catch((e) =>
                setTimeout(() => {
                  throw e;
                }),
              ),
    d = [],
    h = 0,
    p = 0,
    y = !1,
    g = null,
    v = null;
  function _() {
    (null !== v && clearTimeout(v),
      (v = setTimeout(() => {
        ((v = null), b());
      }, 300)));
  }
  function S(e, t, n, r, a, l) {
    let u = o.segmentCacheMap,
      i = {
        key: e,
        renderTreeAtTimeOfPrefetch: t,
        routeCacheVersion: (0, o.getCurrentRouteCacheVersion)(),
        segmentCacheVersion: (0, o.getCurrentSegmentCacheVersion)(),
        segmentCacheMap: u,
        priority: r,
        phase: 2,
        hasBackgroundWork: !1,
        hasPendingResponses: !1,
        spawnedRuntimePrefetches: null,
        fetchStrategy: n,
        sortId: p++,
        isCanceled: !1,
        fallbackRetryStatus: o.EntryStatus.Empty,
        onInvalidate: a,
        _heapIndex: -1,
      };
    return (E(i), V(d, i), b(), i);
  }
  function m(e) {
    ((e.isCanceled = !0),
      (function (e, t) {
        let n = t._heapIndex;
        if (-1 !== n && ((t._heapIndex = -1), 0 !== e.length)) {
          let r = e.pop();
          r !== t && ((e[n] = r), (r._heapIndex = n), G(e, r, n));
        }
      })(d, e));
  }
  function R(e, t, n, r) {
    ((e.isCanceled = !1),
      (e.phase = 2),
      (e.sortId = p++),
      (e.priority = e === g ? c.PrefetchPriority.Intent : r),
      (e.renderTreeAtTimeOfPrefetch = t),
      (e.fetchStrategy = n),
      E(e),
      -1 !== e._heapIndex ? q(d, e) : V(d, e),
      b());
  }
  function P(e, t, n) {
    return (
      e.routeCacheVersion !== (0, o.getCurrentRouteCacheVersion)() ||
      e.segmentCacheVersion !== (0, o.getCurrentSegmentCacheVersion)() ||
      e.renderTreeAtTimeOfPrefetch !== n ||
      e.key.nextUrl !== t
    );
  }
  function E(e) {
    e.priority === c.PrefetchPriority.Intent &&
      e !== g &&
      (null !== g &&
        g.priority !== c.PrefetchPriority.Background &&
        ((g.priority = c.PrefetchPriority.Default), q(d, g)),
      (g = e));
  }
  function b() {
    y || ((y = !0), f(C));
  }
  function T(e) {
    return (
      null === v && (e.priority === c.PrefetchPriority.Intent ? h < 12 : h < 4)
    );
  }
  function A(e) {
    return (
      h++,
      e.then((e) => (null === e ? (O(), null) : (e.closed.then(O), e.value)))
    );
  }
  function O() {
    (h--, b());
  }
  function w(e) {
    e.isCanceled || -1 !== e._heapIndex || (V(d, e), b());
  }
  function C() {
    y = !1;
    let e = Date.now(),
      t = $(d);
    for (; null !== t && T(t); ) {
      ((t.routeCacheVersion = (0, o.getCurrentRouteCacheVersion)()),
        (t.segmentCacheVersion = (0, o.getCurrentSegmentCacheVersion)()));
      let n = (function (e, t) {
          let n = t.key,
            r = (0, o.readOrCreateRouteCacheEntry)(e, t, n),
            a = (function (e, t, n) {
              switch (n.status) {
                case o.EntryStatus.Empty:
                  (A((0, o.fetchRouteOnCacheMiss)(n, t.key)),
                    (n.staleAt = e + 6e4),
                    (n.status = o.EntryStatus.Pending));
                case o.EntryStatus.Pending: {
                  let e = n.blockedTasks;
                  return (
                    null === e ? (n.blockedTasks = new Set([t])) : e.add(t),
                    1
                  );
                }
                case o.EntryStatus.Rejected:
                  break;
                case o.EntryStatus.Fulfilled: {
                  let r;
                  if (2 === t.phase) return 2;
                  if (!T(t)) return 0;
                  let a = n.root.tree;
                  switch (
                    (r =
                      a.prefetchHints &
                      u.PrefetchHint.SubtreeHasPartialPrefetching
                        ? c.FetchStrategy.PPR
                        : t.fetchStrategy === c.FetchStrategy.PPR
                          ? n.supportsPerSegmentPrefetching
                            ? c.FetchStrategy.PPR
                            : c.FetchStrategy.LoadingBoundary
                          : t.fetchStrategy)
                  ) {
                    case c.FetchStrategy.PPR: {
                      let r =
                        1 === t.phase
                          ? c.FetchStrategy.StaticShell
                          : c.FetchStrategy.PPR;
                      if (
                        r === c.FetchStrategy.PPR &&
                        !x(t.fetchStrategy, n.root.tree.prefetchHints)
                      )
                        return 2;
                      let i = n.root.head;
                      if (
                        (((n.root.tree.prefetchHints &
                          u.PrefetchHint.HeadOutlined) !=
                          0 ||
                          (M(r, n) && !N(r, i))) &&
                          0 === D(e, t, n, i, null, r)) ||
                        0 ===
                          (function e(t, n, r, a, i, s, f) {
                            if (
                              !(0, o.doesRouteStructureMatch)(a, i) ||
                              (0, l.compareParams)(a.varyPath, i.varyPath) !==
                                l.ParamsChange.None
                            )
                              return D(
                                t,
                                n,
                                r,
                                i,
                                f === c.FetchStrategy.StaticShell ? null : s,
                                f,
                              );
                            let d = H(
                                t,
                                n,
                                r,
                                i,
                                s,
                                c.FetchStrategy.PPR,
                                !0,
                              ).bundle,
                              h = i.slots;
                            if (null !== h) {
                              let l = a.slots;
                              for (let [a, o] of h) {
                                let i;
                                if (!T(n)) return 0;
                                let s =
                                  null !== d &&
                                  o.prefetchHints &
                                    u.PrefetchHint.ParentInlinedIntoSelf
                                    ? d
                                    : null;
                                if (
                                  (null !== l && (i = l.get(a)),
                                  0 ===
                                    (void 0 !== i
                                      ? e(t, n, r, i, o, s, f)
                                      : D(
                                          t,
                                          n,
                                          r,
                                          o,
                                          f === c.FetchStrategy.StaticShell
                                            ? null
                                            : s,
                                          f,
                                        )))
                                )
                                  return 0;
                              }
                            }
                            return 2;
                          })(
                            e,
                            t,
                            n,
                            t.renderTreeAtTimeOfPrefetch.tree,
                            a,
                            null,
                            r,
                          )
                      )
                        return 0;
                      if (M(r, n)) {
                        let l =
                            r === c.FetchStrategy.StaticShell
                              ? c.FetchStrategy.RuntimeShell
                              : c.FetchStrategy.PPRRuntime,
                          u = t.spawnedRuntimePrefetches;
                        if (null !== u) {
                          let r = new Map();
                          k(e, t, n, i, !1, r, l);
                          let c = (function e(t, n, r, a, l, u, o) {
                            if (l.has(a.requestKey))
                              return k(t, n, r, a, !1, u, o);
                            let i = {},
                              c = a.slots;
                            if (null !== c)
                              for (let [a, s] of c)
                                i[a] = e(t, n, r, s, l, u, o);
                            let s = [a.segment, i, null, null];
                            return (
                              0 !== a.prefetchHints && (s[4] = a.prefetchHints),
                              s
                            );
                          })(e, t, n, a, u, r, l);
                          r.size > 0 &&
                            A(
                              (0, o.fetchSegmentPrefetchesUsingRuntimeRequest)(
                                t,
                                n,
                                l,
                                c,
                                r,
                              ),
                            );
                        }
                      }
                      return 2;
                    }
                    case c.FetchStrategy.Full:
                    case c.FetchStrategy.PPRRuntime:
                    case c.FetchStrategy.LoadingBoundary: {
                      if (1 === t.phase) return 2;
                      let i = new Map(),
                        s = n.root.head;
                      k(
                        e,
                        t,
                        n,
                        s,
                        !1,
                        i,
                        r === c.FetchStrategy.LoadingBoundary
                          ? c.FetchStrategy.Full
                          : r,
                      );
                      let f = (function e(t, n, r, a, i, s, f) {
                        let d = a.slots,
                          h = i.slots,
                          p = {};
                        if (null !== h)
                          for (let [a, i] of h) {
                            let h = d?.get(a);
                            p[a] = (function (t, n, r, a, i, s, f) {
                              if (
                                void 0 !== a &&
                                (0, o.doesRouteStructureMatch)(a, i) &&
                                (0, l.compareParams)(a.varyPath, i.varyPath) ===
                                  l.ParamsChange.None
                              )
                                return e(t, n, r, a, i, s, f);
                              switch (f) {
                                case c.FetchStrategy.LoadingBoundary:
                                  if (
                                    (i.prefetchHints &
                                      (u.PrefetchHint
                                        .SegmentHasLoadingBoundary |
                                        u.PrefetchHint
                                          .SubtreeHasLoadingBoundary)) !=
                                    0
                                  )
                                    return (function e(t, n, r, a, l, i) {
                                      let s =
                                          null === l
                                            ? "inside-shared-layout"
                                            : null,
                                        f = (0,
                                        o.readOrCreateSegmentCacheEntry)(
                                          t,
                                          n.segmentCacheMap,
                                          n.fetchStrategy,
                                          a,
                                        );
                                      switch (f.status) {
                                        case o.EntryStatus.Empty: {
                                          let e = (0,
                                          o.upgradeToPendingSegment)(
                                            f,
                                            c.FetchStrategy.LoadingBoundary,
                                          );
                                          (i.set(a.requestKey, e),
                                            U(n, e),
                                            "refetch" !== l &&
                                              (s = l = "refetch"));
                                          break;
                                        }
                                        case o.EntryStatus.Fulfilled:
                                          if (
                                            (a.prefetchHints &
                                              u.PrefetchHint
                                                .SegmentHasLoadingBoundary) !=
                                            0
                                          )
                                            return (0,
                                            o.convertRouteTreeToFlightRouterState)(
                                              a,
                                            );
                                          break;
                                        case o.EntryStatus.Pending:
                                          U(n, f);
                                        case o.EntryStatus.Rejected:
                                      }
                                      let d = {};
                                      if (null !== a.slots)
                                        for (let [u, o] of a.slots)
                                          d[u] = e(t, n, r, o, l, i);
                                      let h = [a.segment, d, null, s];
                                      return (
                                        0 !== a.prefetchHints &&
                                          (h[4] = a.prefetchHints),
                                        h
                                      );
                                    })(t, n, r, i, null, s);
                                  return (0,
                                  o.convertRouteTreeToFlightRouterState)(i);
                                case c.FetchStrategy.PPRRuntime:
                                case c.FetchStrategy.Full:
                                  return k(t, n, r, i, !1, s, f);
                              }
                            })(t, n, r, h, i, s, f);
                          }
                        let y = [i.segment, p, null, null];
                        return (
                          0 !== i.prefetchHints && (y[4] = i.prefetchHints),
                          y
                        );
                      })(e, t, n, t.renderTreeAtTimeOfPrefetch.tree, a, i, r);
                      return (
                        i.size > 0 &&
                          A(
                            (0, o.fetchSegmentPrefetchesUsingRuntimeRequest)(
                              t,
                              n,
                              r,
                              f,
                              i,
                            ),
                          ),
                        2
                      );
                    }
                  }
                }
              }
              return 2;
            })(e, t, r);
          if (0 !== a && "" !== n.search) {
            let r = new URL(n.pathname, location.origin),
              a = (0, i.createCacheKey)(r.href, n.nextUrl),
              l = (0, o.readOrCreateRouteCacheEntry)(e, t, a);
            switch (l.status) {
              case o.EntryStatus.Empty:
                (t.priority === c.PrefetchPriority.Background ||
                  ((t.hasBackgroundWork = !0), 0)) &&
                  ((l.status = o.EntryStatus.Pending),
                  A((0, o.fetchRouteOnCacheMiss)(l, a)));
              case o.EntryStatus.Pending:
              case o.EntryStatus.Fulfilled:
              case o.EntryStatus.Rejected:
            }
          }
          return 2 === a && t.hasPendingResponses ? 1 : a;
        })(e, t),
        r = t.hasBackgroundWork;
      switch (
        ((t.hasBackgroundWork = !1),
        (t.hasPendingResponses = !1),
        (t.spawnedRuntimePrefetches = null),
        n)
      ) {
        case 0:
          return;
        case 1:
          (K(d), (t = $(d)));
          continue;
        case 2:
          if (2 === t.phase) {
            let n = (0, o.readRouteCacheEntry)(e, t.key),
              r =
                null !== n &&
                n.status === o.EntryStatus.Fulfilled &&
                (n.root.tree.prefetchHints &
                  u.PrefetchHint.SubtreeHasPartialPrefetching) !=
                  0;
            ((t.phase = +!!r), q(d, t));
          } else
            1 === t.phase
              ? ((t.phase = 0), q(d, t))
              : r
                ? ((t.priority = c.PrefetchPriority.Background), q(d, t))
                : K(d);
          t = $(d);
          continue;
      }
    }
    null === t && 0 === h && (0, s.cleanup)();
  }
  function M(e, t) {
    return (
      e === c.FetchStrategy.StaticShell ||
      (t.root.tree.prefetchHints &
        u.PrefetchHint.SubtreeHasPartialPrefetching) !=
        0
    );
  }
  function N(e, t) {
    let { prefetchHints: n } = t;
    switch (e) {
      case c.FetchStrategy.StaticShell:
        return (n & u.PrefetchHint.ShouldAttemptStaticShell) != 0;
      case c.FetchStrategy.PPR:
        return (n & u.PrefetchHint.ShouldAttemptStaticPrefetch) != 0;
      default:
        return !1;
    }
  }
  function I(e, t) {
    return (0, o.canNewFetchStrategyProvideMoreContent)(
      e.fetchStrategy,
      t === c.FetchStrategy.StaticShell
        ? c.FetchStrategy.RuntimeShell
        : c.FetchStrategy.PPRRuntime,
    );
  }
  function F(e, t, n, r, a) {
    if (
      !(
        (n.fetchStrategy === c.FetchStrategy.StaticShell ||
          n.fetchStrategy === c.FetchStrategy.RuntimeShell) &&
        N(a, r) &&
        (0, o.canNewFetchStrategyProvideMoreContent)(n.fetchStrategy, a)
      )
    )
      return !1;
    let l = (0, o.readOrCreateRevalidatingSegmentEntry)(e, t, a, r);
    return (
      l.status === o.EntryStatus.Empty || l.status === o.EntryStatus.Pending
    );
  }
  function j(e, t) {
    null === e.spawnedRuntimePrefetches
      ? (e.spawnedRuntimePrefetches = new Set([t]))
      : e.spawnedRuntimePrefetches.add(t);
  }
  function D(e, t, n, r, a, l) {
    let o = (function (e, t, n, r, a, l) {
      if (
        l === c.FetchStrategy.PPR &&
        !x(t.fetchStrategy, n.root.tree.prefetchHints)
      )
        return null;
      let o = M(l, n);
      if (o && !N(l, r))
        return (
          j(t, r.requestKey),
          null !== a &&
            (function e(t, n, r, a, l, o) {
              let i = H(t, n, r, a, l, o, !1).bundle;
              if (null !== i && null !== a.slots) {
                for (let l of a.slots.values())
                  if (l.prefetchHints & u.PrefetchHint.ParentInlinedIntoSelf)
                    return void e(t, n, r, l, i, o);
              }
            })(e, t, n, r, a, l),
          null
        );
      let i = H(e, t, n, r, a, l, !0);
      return o && i.needsRuntimeRequest ? (j(t, r.requestKey), null) : i;
    })(e, t, n, r, a, l);
    if (null === o) return 2;
    let i = o.bundle,
      s = r.slots;
    if (null !== s)
      for (let r of s.values()) {
        if (!T(t)) return 0;
        let a =
          null !== i && r.prefetchHints & u.PrefetchHint.ParentInlinedIntoSelf
            ? i
            : null;
        if (0 === D(e, t, n, r, a, l)) return 0;
      }
    return 2;
  }
  function U(e, t) {
    ((e.hasPendingResponses = !0),
      null === t.blockedTasks
        ? (t.blockedTasks = new Set([e]))
        : t.blockedTasks.add(e));
  }
  function k(e, t, n, r, a, l, u) {
    let i = (0, o.readOrCreateSegmentCacheEntry)(e, t.segmentCacheMap, u, r),
      s = null;
    switch (i.status) {
      case o.EntryStatus.Empty:
        if (
          u === c.FetchStrategy.Full &&
          null !== (0, o.attemptToFulfillDynamicSegmentFromBFCache)(e, i, r)
        )
          break;
        s = (0, o.upgradeToPendingSegment)(i, u);
        break;
      case o.EntryStatus.Fulfilled:
        if (
          i.isPartial &&
          (0, o.canNewFetchStrategyProvideMoreContent)(i.fetchStrategy, u)
        ) {
          if (
            u === c.FetchStrategy.Full &&
            null !==
              (0, o.attemptToUpgradeSegmentFromBFCache)(e, t.segmentCacheMap, r)
          )
            break;
          s = L(e, t, r, u);
        }
        break;
      case o.EntryStatus.Pending:
      case o.EntryStatus.Rejected:
        ((0, o.canNewFetchStrategyProvideMoreContent)(i.fetchStrategy, u) &&
          (s = L(e, t, r, u)),
          i.status === o.EntryStatus.Pending && U(t, i));
    }
    null !== s && U(t, s);
    let f = {};
    if (null !== r.slots)
      for (let [o, i] of r.slots) f[o] = k(e, t, n, i, a || null !== s, l, u);
    null !== s && l.set(r.requestKey, s);
    let d = a || null === s ? null : "refetch",
      h = [r.segment, f, null, d];
    return (0 !== r.prefetchHints && (h[4] = r.prefetchHints), h);
  }
  function H(e, t, n, r, a, l, i) {
    if (r.prefetchHints & u.StaticPrefetchDisabled)
      return {
        bundle: { tree: null, entry: null, parent: a },
        needsRuntimeRequest: !1,
      };
    let s = (0, o.readOrCreateSegmentCacheEntry)(e, t.segmentCacheMap, l, r);
    if (r.prefetchHints & u.PrefetchHint.InlinedIntoChild)
      return (
        s.status === o.EntryStatus.Pending && U(t, s),
        {
          bundle: { tree: r, entry: s, parent: a },
          needsRuntimeRequest:
            s.status === o.EntryStatus.Fulfilled &&
            I(s, l) &&
            !F(e, t.segmentCacheMap, s, r, l),
        }
      );
    let f = a;
    r.prefetchHints & u.PrefetchHint.HeadInlinedIntoSelf &&
      (f = {
        tree: n.root.head,
        entry: (0, o.readOrCreateSegmentCacheEntry)(
          e,
          t.segmentCacheMap,
          l,
          n.root.head,
        ),
        parent: a,
      });
    let d = { tree: r, entry: s, parent: f };
    return {
      bundle: null,
      needsRuntimeRequest: (function (e, t, n, r, a, l, u, i) {
        let s = !1,
          f = null,
          d = l;
        for (; null !== d; ) {
          let r = d.entry,
            a = d.tree;
          if (null === r || null === a) {
            d = d.parent;
            continue;
          }
          switch (r.status) {
            case o.EntryStatus.Empty: {
              let e = (0, o.upgradeToPendingSegment)(r, u);
              (null === f && (f = new Map()), f.set(a.requestKey, e), U(t, e));
              break;
            }
            case o.EntryStatus.Pending:
              if (
                i &&
                u === c.FetchStrategy.PPR &&
                (0, o.canNewFetchStrategyProvideMoreContent)(r.fetchStrategy, u)
              ) {
                let n = (0, o.readOrCreateRevalidatingSegmentEntry)(
                  e,
                  t.segmentCacheMap,
                  u,
                  a,
                );
                if (n.status === o.EntryStatus.Empty) {
                  let e = (0, o.upgradeToPendingSegment)(n, u);
                  (null === f && (f = new Map()),
                    f.set(a.requestKey, e),
                    U(t, e));
                }
              }
              U(t, r);
              break;
            case o.EntryStatus.Rejected:
              if (
                i &&
                u === c.FetchStrategy.PPR &&
                (0, o.canNewFetchStrategyProvideMoreContent)(r.fetchStrategy, u)
              ) {
                let n = (0, o.readOrCreateRevalidatingSegmentEntry)(
                  e,
                  t.segmentCacheMap,
                  u,
                  a,
                );
                if (n.status === o.EntryStatus.Empty) {
                  let e = (0, o.upgradeToPendingSegment)(n, u);
                  (null === f && (f = new Map()),
                    f.set(a.requestKey, e),
                    U(t, e));
                }
              }
              break;
            case o.EntryStatus.Fulfilled: {
              let l = !1;
              if (M(u, n)) {
                let n = I(r, u),
                  o = F(e, t.segmentCacheMap, r, a, u);
                n && !o && ((s = !0), (l = !0));
              }
              let d =
                u === c.FetchStrategy.PPR &&
                r.isUpgradeableISRFallback &&
                (t.fallbackRetryStatus === o.EntryStatus.Empty ||
                  t.fallbackRetryStatus === o.EntryStatus.Fulfilled);
              if (
                i &&
                !l &&
                ((r.isPartial &&
                  (0, o.canNewFetchStrategyProvideMoreContent)(
                    r.fetchStrategy,
                    u,
                  )) ||
                  d)
              ) {
                let n = (0, o.readOrCreateRevalidatingSegmentEntry)(
                  e,
                  t.segmentCacheMap,
                  u,
                  a,
                );
                if (n.status === o.EntryStatus.Empty) {
                  let e = (0, o.upgradeToPendingSegment)(n, u);
                  (null === f && (f = new Map()),
                    f.set(a.requestKey, e),
                    U(t, e));
                } else n.status === o.EntryStatus.Pending && U(t, n);
              }
            }
          }
          d = d.parent;
        }
        return (
          null !== f &&
            A(
              (0, o.fetchSegmentPrefetchesUsingStaticRequest)(t, n, r, a, f, u),
            ),
          s
        );
      })(e, t, n, t.key, r, d, l, i),
    };
  }
  function L(e, t, n, r) {
    let a = (0, o.readOrCreateRevalidatingSegmentEntry)(
      e,
      t.segmentCacheMap,
      r,
      n,
    );
    if (a.status === o.EntryStatus.Empty)
      return (0, o.upgradeToPendingSegment)(a, r);
    if ((0, o.canNewFetchStrategyProvideMoreContent)(a.fetchStrategy, r)) {
      let a = (0, o.overwriteRevalidatingSegmentCacheEntry)(
        e,
        t.segmentCacheMap,
        r,
        n,
      );
      return (0, o.upgradeToPendingSegment)(a, r);
    }
    switch (a.status) {
      case o.EntryStatus.Pending:
        return (U(t, a), null);
      case o.EntryStatus.Fulfilled:
      case o.EntryStatus.Rejected:
      default:
        return null;
    }
  }
  function x(e, t) {
    return (
      (t & u.PrefetchHint.SubtreeHasPartialPrefetching) == 0 ||
      e === c.FetchStrategy.Full
    );
  }
  function B(e, t) {
    let n = t.priority - e.priority;
    if (0 !== n) return n;
    let r = t.phase - e.phase;
    return 0 !== r ? r : t.sortId - e.sortId;
  }
  function V(e, t) {
    let n = e.length;
    (e.push(t), (t._heapIndex = n), X(e, t, n));
  }
  function $(e) {
    return 0 === e.length ? null : e[0];
  }
  function K(e) {
    if (0 === e.length) return null;
    let t = e[0];
    t._heapIndex = -1;
    let n = e.pop();
    return (n !== t && ((e[0] = n), (n._heapIndex = 0), G(e, n, 0)), t);
  }
  function q(e, t) {
    let n = t._heapIndex;
    -1 !== n &&
      (0 === n
        ? G(e, t, 0)
        : B(e[(n - 1) >>> 1], t) > 0
          ? X(e, t, n)
          : G(e, t, n));
  }
  function X(e, t, n) {
    let r = n;
    for (; r > 0; ) {
      let n = (r - 1) >>> 1,
        a = e[n];
      if (!(B(a, t) > 0)) return;
      ((e[n] = t), (t._heapIndex = n), (e[r] = a), (a._heapIndex = r), (r = n));
    }
  }
  function G(e, t, n) {
    let r = n,
      a = e.length,
      l = a >>> 1;
    for (; r < l; ) {
      let n = (r + 1) * 2 - 1,
        l = e[n],
        u = n + 1,
        o = e[u];
      if (0 > B(l, t))
        u < a && 0 > B(o, l)
          ? ((e[r] = o),
            (o._heapIndex = r),
            (e[u] = t),
            (t._heapIndex = u),
            (r = u))
          : ((e[r] = l),
            (l._heapIndex = r),
            (e[n] = t),
            (t._heapIndex = n),
            (r = n));
      else {
        if (!(u < a && 0 > B(o, t))) return;
        ((e[r] = o),
          (o._heapIndex = r),
          (e[u] = t),
          (t._heapIndex = u),
          (r = u));
      }
    }
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
