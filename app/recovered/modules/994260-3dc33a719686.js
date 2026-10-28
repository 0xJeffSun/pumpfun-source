// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r = {
    discoverKnownRoute: function () {
      return y;
    },
    matchKnownRoute: function () {
      return _;
    },
    resetKnownRoutes: function () {
      return S;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = e.r(368418),
    u = e.r(706957),
    o = e.r(85396),
    i = e.r(948176),
    c = e.r(188294),
    s = e.r(946859),
    f = e.r(190561);
  function d(e, t) {
    let n = t.pattern;
    return null === n
      ? null
      : (0, i.isValueExpired)(e, (0, o.getCurrentRouteCacheVersion)(), n)
        ? ((t.pattern = null), null)
        : n;
  }
  function h() {
    return {
      staticChildren: null,
      dynamicChild: null,
      dynamicChildParamName: null,
      dynamicChildParamType: null,
      pattern: null,
      hasConflictingDynamicChildren: !1,
      hasDynamicRewrite: !1,
    };
  }
  let p = h();
  function y(e, t, n, r, a, l, u, i, c, f, d) {
    let h = l.tree,
      y = (0, s.splitPathnameIntoParts)(t);
    if (null !== a) {
      let s = (0, o.fulfillRouteCacheEntry)(e, a, l, u, i, c, f);
      return (v(p, h, y, 0, s, e, t, n, r, l, u, i, c, f, d), s);
    }
    return v(p, h, y, 0, null, e, t, n, r, l, u, i, c, f, d);
  }
  function g(e, t, n, r, a, l, u, i, c, s) {
    return null !== e
      ? e
      : (0, o.writeRouteIntoCache)(t, n, r, a, l, u, i, c, s);
  }
  function v(e, t, n, r, a, l, u, i, s, f, p, y, _, S, m) {
    let R,
      P = t.segment,
      E = r < n.length ? n[r] : null,
      b = e,
      T = r;
    if ("string" == typeof P) {
      if ((0, c.doesStaticSegmentAppearInURL)(P)) {
        if (null === E || E !== P) return g(a, l, u, i, s, f, p, y, _, S);
        null === e.staticChildren && (e.staticChildren = new Map());
        let t = e.staticChildren.get(E);
        (void 0 === t && ((t = h()), e.staticChildren.set(E, t)),
          (b = t),
          (T = r + 1));
      }
    } else {
      let t = P[0],
        o = P[1],
        d = P[2],
        v = P[3];
      if (
        ("oc" !== d && null === E) ||
        (null !== v && null !== E && v.includes(E))
      )
        return g(a, l, u, i, s, f, p, y, _, S);
      switch (d) {
        case "d":
          if (null !== E && (0, c.canonicalizeURLPart)(E) !== o)
            return g(a, l, u, i, s, f, p, y, _, S);
          break;
        case "c":
        case "oc":
          if (n.slice(r).map(c.canonicalizeURLPart).join("/") !== o)
            return g(a, l, u, i, s, f, p, y, _, S);
      }
      if (
        e.hasConflictingDynamicChildren ||
        (null !== e.dynamicChild &&
          (e.dynamicChildParamName !== t || e.dynamicChildParamType !== d))
      )
        return (
          (e.hasConflictingDynamicChildren = !0),
          g(a, l, u, i, s, f, p, y, _, S)
        );
      if (
        ((b = (function (e, t, n) {
          if (null !== e.dynamicChild) return e.dynamicChild;
          let r = h();
          return (
            (e.dynamicChild = r),
            (e.dynamicChildParamName = t),
            (e.dynamicChildParamType = n),
            r
          );
        })(e, t, d)),
        null !== v)
      )
        for (let t of (null === e.staticChildren &&
          (e.staticChildren = new Map()),
        v))
          e.staticChildren.has(t) || e.staticChildren.set(t, h());
      T = "c" === d || "oc" === d ? n.length : r + 1;
    }
    let A = t.slots,
      O = null;
    if (null !== A) {
      for (let e of A.values())
        null === e.refreshState &&
          (O = v(b, e, n, T, a, l, u, i, s, f, p, y, _, S, m));
      return null !== O ? O : g(a, l, u, i, s, f, p, y, _, S);
    }
    if (T < n.length) return g(a, l, u, i, s, f, p, y, _, S);
    m && (b.hasDynamicRewrite = !0);
    let w = d(l, b);
    return null !== w
      ? w
      : ((R =
          null !== a
            ? a
            : (0, o.writeRouteIntoCache)(l, u, i, s, f, p, y, _, S)),
        (b.pattern = R),
        R);
  }
  function _(e, t, n) {
    let r = (0, s.splitPathnameIntoParts)(t),
      a = new Map(),
      i = (function e(t, n, r, a, l) {
        let u = a < r.length ? r[a] : null;
        if (null === n.staticChildren) {
          if (null === u && !n.hasDynamicRewrite) {
            let e = d(t, n);
            if (null !== e) return { part: n, pattern: e };
          }
          return null;
        }
        if (null !== u) {
          let o = n.staticChildren.get(u);
          if (void 0 !== o) {
            if (
              null === o.pattern &&
              null === o.dynamicChild &&
              null === o.staticChildren
            )
              return null;
            let n = e(t, o, r, a + 1, l);
            return null !== n ? n : null;
          }
        }
        if (null !== n.dynamicChild && !n.hasConflictingDynamicChildren) {
          let o = n.dynamicChild,
            i = n.dynamicChildParamName,
            s = n.dynamicChildParamType,
            f = o.hasDynamicRewrite ? null : d(t, o);
          switch (s) {
            case "c":
              if (null !== f && null !== u)
                return (
                  l.set(i, r.slice(a).map(c.canonicalizeURLPart).join("/")),
                  { part: o, pattern: f }
                );
              break;
            case "oc":
              if (null !== f) {
                if (null !== u)
                  return (
                    l.set(i, r.slice(a).map(c.canonicalizeURLPart).join("/")),
                    { part: o, pattern: f }
                  );
                if (null === (n.hasDynamicRewrite ? null : d(t, n)))
                  return (l.set(i, ""), { part: o, pattern: f });
              }
              break;
            case "d":
              if (null !== u)
                return (
                  l.set(i, (0, c.canonicalizeURLPart)(u)),
                  e(t, o, r, a + 1, l)
                );
              break;
            case "ci(..)(..)":
            case "ci(.)":
            case "ci(..)":
            case "ci(...)":
            case "di(..)(..)":
            case "di(.)":
            case "di(..)":
            case "di(...)":
              return null;
          }
        }
        if (null === u && !n.hasDynamicRewrite) {
          let e = d(t, n);
          if (null !== e) return { part: n, pattern: e };
        }
        return null;
      })(e, p, r, 0, a);
    if (null === i) return null;
    let h = i.part,
      y = i.pattern;
    if (
      y.couldBeIntercepted ||
      y.root.tree.prefetchHints &
        (l.PrefetchHint.IsClosedParam | l.PrefetchHint.SubtreeHasClosedParams)
    )
      return null;
    let g = (0, c.normalizeRenderedSearch)(n),
      v = { metadataVaryPath: null },
      _ = (function e(t, n, r, a, i) {
        let c,
          s,
          d = t.segment,
          h = (t.prefetchHints & l.PrefetchHint.IsRootLayoutOrAbove) != 0,
          p = d;
        if ("string" != typeof d) {
          let e = d[0],
            t = d[2],
            r = d[3],
            l = n.get(e);
          void 0 !== l
            ? ((p = [e, l, t, r]),
              (c = (0, f.appendLayoutVaryPath)(a, l, e, h)))
            : (c = a);
        } else c = a;
        let y = null,
          g = t.slots;
        if (null !== g)
          for (let [t, a] of ((y = new Map()), g)) y.set(t, e(a, n, r, c, i));
        return (
          d === u.PAGE_SEGMENT_KEY
            ? ((s = (0, f.finalizeVaryPath)(t.requestKey, r, c)),
              null === i.metadataVaryPath &&
                (i.metadataVaryPath = (0, f.finalizeVaryPath)(
                  (0, o.getHeadRequestKey)(t.requestKey),
                  r,
                  c,
                )))
            : (s = (0, f.finalizeVaryPath)(t.requestKey, null, c)),
          {
            requestKey: t.requestKey,
            segment: p,
            shellVaryPath: (0, f.getShellSegmentVaryPath)(s),
            refreshState: t.refreshState,
            data: null,
            varyPath: s,
            slots: y,
            prefetchHints: t.prefetchHints,
          }
        );
      })(y.root.tree, a, g, null, v),
      S = v.metadataVaryPath;
    if (null === S) return null;
    let m = (0, o.createMetadataRouteTree)(S, _.prefetchHints, null);
    return {
      canonicalUrl: t + n,
      status: o.EntryStatus.Fulfilled,
      blockedTasks: null,
      root: (0, o.createRootRouteTree)(_, m),
      couldBeIntercepted: y.couldBeIntercepted,
      supportsPerSegmentPrefetching: y.supportsPerSegmentPrefetching,
      predictedFrom: h,
      renderedSearch: g,
      ref: null,
      size: y.size,
      staleAt: y.staleAt,
      version: y.version,
    };
  }
  function S() {
    p = h();
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
