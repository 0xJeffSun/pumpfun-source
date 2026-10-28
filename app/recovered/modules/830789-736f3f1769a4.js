// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  let r;
  (e.i(149502),
    Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.defineProperty(n, "serverActionReducer", {
      enumerable: !0,
      get: function () {
        return j;
      },
    }));
  let a = e.r(225599),
    l = e.r(730137),
    u = e.r(674637),
    o = e.r(210215),
    i = e.r(964724),
    c = e.r(925142),
    s = e.r(313537),
    f = e.r(934239),
    d = e.r(790661),
    h = e.r(468314),
    p = e.r(71223),
    y = e.r(46485),
    g = e.r(461172),
    v = e.r(948866),
    _ = e.r(291573),
    S = e.r(85396),
    m = e.r(685003),
    R = e.r(185457),
    P = e.r(107793),
    E = e.r(369095),
    b = e.r(813328),
    T = e.r(260239),
    A = e.r(994260),
    O = e.r(674118),
    w = e.r(611520),
    C = e.r(944112),
    M = e.r(581131),
    N = e.r(581761),
    I = c.createFromFetch;
  async function F(e, t, n) {
    let s,
      d,
      h,
      y,
      g,
      { actionId: v, actionArgs: S } = n,
      m = (0, c.createTemporaryReferenceSet)(),
      b = (0, _.extractInfoFromServerReferenceId)(v),
      T = (0, _.omitUnusedArgs)(S, b),
      A = await (0, c.encodeReply)(T, { temporaryReferences: m }),
      w = {
        Accept: u.RSC_CONTENT_TYPE_HEADER,
        [u.ACTION_HEADER]: v,
        [u.NEXT_ROUTER_STATE_TREE_HEADER]: (0,
        p.prepareFlightRouterStateForRequest)(e.tree),
      },
      C = (0, R.getDeploymentId)();
    (C && (w["x-deployment-id"] = C), t && (w[u.NEXT_URL] = t));
    try {
      s = await (0, i.fetch)(e.canonicalUrl, {
        method: "POST",
        headers: w,
        body: A,
      });
    } catch (e) {
      throw e;
    }
    if ("1" === s.headers.get(u.NEXT_ACTION_NOT_FOUND_HEADER))
      throw new o.UnrecognizedActionError(`Server Action "${v}" was not found on the server. 
Read more: https://nextjs.org/docs/messages/failed-to-find-server-action`);
    let N = s.headers.get("x-action-redirect"),
      [F, j] = N?.split(";") || [];
    switch (j) {
      case "push":
        d = "push";
        break;
      case "replace":
        d = "replace";
        break;
      default:
        d = void 0;
    }
    let D = !!s.headers.get(u.NEXT_IS_PRERENDER_HEADER),
      U = O.ActionDidNotRevalidate;
    try {
      let e = s.headers.get("x-action-revalidated");
      if (e) {
        let t = JSON.parse(e);
        (t === O.ActionDidRevalidateStaticAndDynamic ||
          t === O.ActionDidRevalidateDynamicOnly) &&
          (U = t);
      }
    } catch {}
    let k = F
        ? (0, f.assignLocation)(
            F,
            new URL(e.canonicalUrl, window.location.href),
          )
        : void 0,
      H = s.headers.get("content-type"),
      L = !!(H && H.startsWith(u.RSC_CONTENT_TYPE_HEADER));
    if (!L && !k)
      throw Error(
        s.status >= 400 && "text/plain" === H
          ? await s.text()
          : "An unexpected response was received from the server.",
      );
    let x = !1;
    if (L) {
      let e = k
          ? (0, M.processFetch)(s).then(({ response: e }) => e)
          : Promise.resolve(s),
        t = await I(e, {
          callServer: a.callServer,
          findSourceMapURL: l.findSourceMapURL,
          temporaryReferences: m,
          debugChannel: r && r(w),
        });
      ((h = k ? void 0 : t.a), (x = t.i));
      let n = s.headers.get(E.NEXT_NAV_DEPLOYMENT_ID_HEADER) ?? t.b;
      (void 0 !== n && n !== (0, P.getNavigationBuildId)()) ||
        (void 0 !== t.t ? ((y = t.t), (g = t.q)) : void 0 !== t.n && (y = t.n));
    } else ((h = void 0), (y = void 0), (g = void 0));
    return {
      actionResult: h,
      actionFlightData: y,
      actionFlightDataRenderedSearch: g,
      redirectLocation: k,
      redirectType: d,
      revalidationKind: U,
      isPrerender: D,
      couldBeIntercepted: x,
    };
  }
  function j(e, t) {
    let { resolve: n, reject: r } = t,
      a =
        (e.previousNextUrl || e.nextUrl) &&
        (0, h.hasInterceptionRouteInCurrentTree)(e.tree)
          ? e.previousNextUrl || e.nextUrl
          : null;
    return F(e, a, t).then(
      async ({
        revalidationKind: l,
        actionResult: u,
        actionFlightData: o,
        actionFlightDataRenderedSearch: i,
        redirectLocation: c,
        redirectType: f,
        isPrerender: h,
        couldBeIntercepted: p,
      }) => {
        l !== O.ActionDidNotRevalidate &&
          ((0, N.invalidateBfCache)(),
          (t.didRevalidate = !0),
          l === O.ActionDidRevalidateStaticAndDynamic &&
            (0, S.invalidateEntirePrefetchCache)(a, e.root),
          (0, m.startRevalidationCooldown)());
        let y = f || "push";
        if (void 0 !== c)
          if ((0, w.isExternalURL)(c))
            return (r(D(c.href, y)), (0, b.completeHardNavigation)(e, c, y));
          else {
            let e = (0, d.createHrefFromUrl)(c, !1);
            r(D((0, v.hasBasePath)(e) ? (0, g.removeBasePath)(e) : e, y));
          }
        else n(u);
        if (void 0 === c && l === O.ActionDidNotRevalidate && void 0 === o)
          return e;
        if (void 0 === o && void 0 !== c)
          return (0, b.completeHardNavigation)(e, c, y);
        if ("string" == typeof o)
          return (0, b.completeHardNavigation)(
            e,
            new URL(o, location.origin),
            y,
          );
        let _ = new URL(e.canonicalUrl, location.origin),
          R = e.renderedSearch,
          P = void 0 !== c ? c : _,
          E = e.tree,
          M = s.ScrollBehavior.Default,
          I =
            l === O.ActionDidNotRevalidate
              ? C.FreshnessPolicy.Default
              : C.FreshnessPolicy.RefreshAll;
        if (void 0 !== o && void 0 !== i) {
          let t = (0, d.createHrefFromUrl)(P),
            n = Date.now(),
            r = (0, T.createNavigationSeed)(
              n,
              E,
              o,
              null,
              !0,
              null,
              i,
              null,
              N.UnknownDynamicStaleTime,
            );
          (0, A.discoverKnownRoute)(
            n,
            P.pathname,
            P.search,
            a,
            null,
            r.root,
            p,
            t,
            r.renderedSearch,
            h,
            !1,
          );
          let l = (0, C.getCurrentNavigationLock)();
          return (0, b.navigateToKnownRoute)(
            n,
            e,
            P,
            t,
            r,
            _,
            R,
            e.root,
            I,
            a,
            M,
            y,
            l,
            S.segmentCacheMap,
            null,
            null,
            void 0,
          );
        }
        return (0, b.navigate)(e, P, _, R, e.root, E, a, I, M, y);
      },
      (t) => (r(t), e),
    );
  }
  function D(e, t) {
    let n = (0, y.getRedirectError)(e, t);
    return ((n.handled = !0), n);
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
