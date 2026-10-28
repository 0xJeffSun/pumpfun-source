// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.defineProperty(n, "restoreReducer", {
      enumerable: !0,
      get: function () {
        return c;
      },
    }));
  let r = e.r(220605),
    a = e.r(944112),
    l = e.r(813328),
    u = e.r(260239),
    o = e.r(85396),
    i = e.r(581761);
  function c(e, t) {
    let n,
      c,
      s = t.historyState;
    s
      ? ((n = s.tree), (c = s.renderedSearch))
      : ((n = e.tree), (c = e.renderedSearch));
    let f = new URL(e.canonicalUrl, location.origin),
      d = t.url,
      h = (0, r.extractPathFromFlightRouterState)(n) ?? d.pathname,
      p = Date.now(),
      y = { separateRefreshUrls: null, scrollRef: null },
      g = (0, u.createNavigationSeed)(
        p,
        n,
        null,
        null,
        !0,
        null,
        c,
        null,
        i.UnknownDynamicStaleTime,
      ),
      v = (0, a.startPPRNavigation)(
        p,
        f,
        e.renderedSearch,
        e.root,
        g.root,
        a.FreshnessPolicy.HistoryTraversal,
        g.dynamicStaleAt,
        !1,
        y,
        o.segmentCacheMap,
        !1,
      );
    return null === v
      ? (0, l.completeHardNavigation)(e, d, "replace")
      : ((0, a.spawnDynamicRequests)(
          v,
          d,
          h,
          a.FreshnessPolicy.HistoryTraversal,
          y,
          null,
          "replace",
          null,
          o.segmentCacheMap,
          void 0,
        ),
        (0, a.resetNavigationLockToPending)(),
        (0, l.completeTraverseNavigation)(e, d, c, v, h));
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
