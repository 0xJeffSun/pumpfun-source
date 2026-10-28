// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (e.i(149502), Object.defineProperty(n, "__esModule", { value: !0 }));
  var r = {
    createNavigationSeed: function () {
      return g;
    },
    createRouteTreeNode: function () {
      return v;
    },
    decodeTransportTreeIntoRouteTree: function () {
      return _;
    },
    readFulfilledIsPartial: function () {
      return R;
    },
    readFulfilledStaleTimeSeconds: function () {
      return P;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = e.r(368418),
    u = e.r(136305),
    o = e.r(438188),
    i = e.r(357830),
    c = e.r(706957),
    s = e.r(487364),
    f = e.r(188294),
    d = e.r(946859),
    h = e.r(190561),
    p = e.r(85396),
    y = e.r(581761);
  function g(e, t, n, r, a, l, u, i, c) {
    let f,
      d = { metadataVaryPath: null, treeDivergedFromBase: !1 },
      h = null;
    if (null !== n) {
      f = _(n.t, t, r, a, l, u, d);
      let e = n.h;
      void 0 !== e &&
        (h = {
          rsc: e.r,
          isPartial: "boolean" == typeof e.p ? a : R(e.p),
          varyParams: (0, o.decodeVaryParams)(e.v, r),
          staleTimeSeconds: void 0 !== e.s ? P(e.s) : null,
        });
    } else {
      if (null === t)
        throw new s.InvariantError(
          "Cannot convert a server response with no transport data and no base tree.",
        );
      f = (0, p.convertRootFlightRouterStateToRouteTree)(t, u, d);
    }
    if (null === i && null === (i = d.metadataVaryPath))
      throw new s.InvariantError(
        "Cannot key the head of a server response: its tree has no page segment.",
      );
    return {
      root: (0, p.createRootRouteTree)(
        f,
        (0, p.createMetadataRouteTree)(i, f.prefetchHints, h),
      ),
      renderedSearch: u,
      dynamicStaleAt: (0, y.computeDynamicStaleAt)(e, c),
      treeDivergedFromBase: d.treeDivergedFromBase,
    };
  }
  function v(e, t, n, r, a, l, u) {
    let o, i, s;
    if (Array.isArray(e)) {
      let a = e[1],
        l = e[0];
      ((i = (0, h.appendLayoutVaryPath)(r, a, l, t)),
        (s = (0, h.finalizeVaryPath)(n, null, i)),
        (o = e));
    } else
      ((i = r),
        n.endsWith(c.PAGE_SEGMENT_KEY)
          ? ((o = c.PAGE_SEGMENT_KEY),
            (s = (0, h.finalizeVaryPath)(n, a, i)),
            null === l &&
              null === u.metadataVaryPath &&
              (u.metadataVaryPath = (0, h.finalizeVaryPath)(
                (0, p.getHeadRequestKey)(n),
                a,
                i,
              )))
          : ((o = e), (s = (0, h.finalizeVaryPath)(n, null, i))));
    return {
      requestKey: n,
      segment: o,
      shellVaryPath: (0, h.getShellSegmentVaryPath)(s),
      refreshState: l,
      data: null,
      varyPath: s,
      slots: null,
      prefetchHints: 0,
    };
  }
  function _(e, t, n, r, a, u, s) {
    let y = null !== a ? (0, d.splitPathnameIntoParts)(a) : null;
    return (function e(t, n, r, a, u, s, d, y, g, _, m, E) {
      let b = t.d,
        T = void 0 !== b && null === b.r,
        A = T ? r : void 0;
      if (void 0 !== a && !E.treeDivergedFromBase) {
        let e = t.s;
        if ("string" != typeof e && null == e.k);
        else {
          let e = a[0];
          n === c.DEFAULT_SEGMENT_KEY ||
            (!(function (e, t) {
              if ("string" == typeof e || "string" == typeof t) return e === t;
              let [n, r, a] = e,
                [l, u, o] = t;
              return n === l && a === o && r === u;
            })(e, n) &&
              (E.treeDivergedFromBase = !0));
        }
      }
      let O = void 0 !== A ? (A[4] ?? 0) : 0,
        w = t.h ?? O,
        C = (w & l.PrefetchHint.IsRootLayoutOrAbove) != 0,
        M = void 0 !== A ? (A[2] ?? null) : null,
        N = null !== M ? { canonicalUrl: M[0], renderedSearch: g } : null,
        I = null !== N ? N.renderedSearch : g,
        F = v(n, C, d, y, I, N, E),
        j = (0, h.getPartialVaryPath)(F.varyPath),
        D = null,
        U = t.c,
        k = void 0 !== A ? A[1] : void 0;
      if (void 0 !== U)
        for (let [t, n] of U) {
          let r,
            l = void 0 !== k ? k[t] : void 0,
            o = S(n.s, _, m);
          if (void 0 !== a && !E.treeDivergedFromBase) {
            let e = a[1][t];
            void 0 === e
              ? o !== c.DEFAULT_SEGMENT_KEY && (E.treeDivergedFromBase = !0)
              : (e[2] ?? null) !== null || (r = e);
          }
          let h =
              "string" != typeof o || (0, f.doesStaticSegmentAppearInURL)(o)
                ? m + 1
                : m,
            p = (0, i.appendSegmentRequestKeyPart)(
              d,
              t,
              (0, i.createSegmentRequestKeyPart)(o),
            ),
            y = e(n, o, l, r, u, s, p, j, I, _, h, E);
          (null === D && (D = new Map()), D.set(t, y));
        }
      if (void 0 !== k)
        for (let e in k) {
          if (void 0 !== U && U.has(e)) continue;
          let t = k[e],
            n = (0, i.appendSegmentRequestKeyPart)(
              d,
              e,
              (0, i.createSegmentRequestKeyPart)(t[0]),
            ),
            r = (0, p.convertFlightRouterStateToRouteTree)(t, n, j, I, E);
          (null === D && (D = new Map()), D.set(e, r));
        }
      if (T) {
        let e = w & ~l.SubtreePrefetchHints;
        if (null !== D)
          for (let t of D.values())
            e = (0, l.propagateSubtreeBits)(e, t.prefetchHints);
        w = e;
      }
      return (
        void 0 !== b &&
          (F.data = {
            rsc: b.r,
            isPartial: "boolean" == typeof b.p ? s : R(b.p),
            varyParams: (0, o.decodeVaryParams)(b.v, u),
            staleTimeSeconds: void 0 !== b.s ? P(b.s) : null,
          }),
        (F.slots = D),
        (F.prefetchHints = w),
        F
      );
    })(
      e,
      S(e.s, y, 0),
      t ?? void 0,
      t ?? void 0,
      n,
      r,
      i.ROOT_SEGMENT_REQUEST_KEY,
      null,
      u,
      y,
      0,
      s,
    );
  }
  function S(e, t, n) {
    if ("string" == typeof e) return e;
    let r = e.k;
    if (null !== r) return [e.n, r, e.t, e.s];
    if (null === t)
      throw new s.InvariantError(
        "Cannot resolve a dynamic segment that has no param value: the response provides no rendered pathname to parse it from.",
      );
    let a = (0, f.parseDynamicParamFromURLPart)(e.t, t, n);
    return [e.n, (0, f.getCacheKeyForDynamicParam)(a), e.t, e.s];
  }
  let m = Symbol();
  function R(e) {
    return (0, u.readFulfilledValue)(e, m) === m;
  }
  function P(e) {
    let t,
      n = e[Symbol.asyncIterator]();
    for (;;) {
      let e = (0, u.readFulfilledValue)(n.next(), void 0);
      if (void 0 === e || e.done) break;
      t = e.value;
    }
    return void 0 === t || isNaN(t) ? null : t;
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
