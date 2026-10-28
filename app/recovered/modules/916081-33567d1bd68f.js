// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (e.i(149502), Object.defineProperty(n, "__esModule", { value: !0 }));
  var r = {
    refreshDynamicData: function () {
      return h;
    },
    refreshReducer: function () {
      return d;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = e.r(313537),
    u = e.r(813328),
    o = e.r(260239),
    i = e.r(85396),
    c = e.r(468314),
    s = e.r(944112),
    f = e.r(581761);
  function d(e, t) {
    {
      let t = e.nextUrl,
        n = e.root;
      (0, i.invalidateSegmentCacheEntries)(t, n);
    }
    return h(e, s.FreshnessPolicy.RefreshAll, void 0);
  }
  function h(e, t, n) {
    (0, f.invalidateBfCache)();
    let r = e.nextUrl,
      a = (0, c.hasInterceptionRouteInCurrentTree)(e.tree)
        ? e.previousNextUrl || r
        : null,
      d = e.canonicalUrl,
      h = new URL(d, location.origin),
      p = e.renderedSearch,
      y = e.tree,
      g = l.ScrollBehavior.NoScroll,
      v = (0, s.getCurrentNavigationLock)(),
      _ = Date.now(),
      S = (0, o.createNavigationSeed)(
        _,
        y,
        null,
        null,
        !0,
        null,
        p,
        null,
        f.UnknownDynamicStaleTime,
      ),
      m = e.pushRef.pendingPush ? "push" : "replace";
    return (0, u.navigateToKnownRoute)(
      _,
      e,
      h,
      d,
      S,
      h,
      p,
      e.root,
      t,
      a,
      g,
      m,
      v,
      i.segmentCacheMap,
      null,
      null,
      n,
    );
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
