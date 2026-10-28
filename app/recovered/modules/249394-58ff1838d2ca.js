// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.defineProperty(n, "serverPatchReducer", {
      enumerable: !0,
      get: function () {
        return c;
      },
    }));
  let r = e.r(790661),
    a = e.r(313537),
    l = e.r(813328),
    u = e.r(85396),
    o = e.r(916081),
    i = e.r(944112);
  function c(e, t) {
    let n = t.mpa,
      c = new URL(t.url, location.origin),
      s = t.seed,
      f = t.navigateType;
    if (n || null === s) return (0, l.completeHardNavigation)(e, c, f);
    let d = new URL(e.canonicalUrl, location.origin),
      h = e.renderedSearch;
    if (t.previousTree !== e.tree)
      return (0, o.refreshReducer)(e, { type: a.ACTION_REFRESH });
    let p = (0, r.createHrefFromUrl)(c),
      y = t.nextUrl,
      g = a.ScrollBehavior.Default,
      v = (0, i.getCurrentNavigationLock)(),
      _ = Date.now();
    return (0, l.navigateToKnownRoute)(
      _,
      e,
      c,
      p,
      s,
      d,
      h,
      e.root,
      t.freshnessPolicy,
      y,
      g,
      f,
      v,
      u.segmentCacheMap,
      null,
      null,
      void 0,
    );
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
