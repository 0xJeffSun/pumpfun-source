// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  Object.defineProperty(n, "__esModule", { value: !0 });
  var r,
    a = {
      ParamsChange: function () {
        return v;
      },
      appendLayoutVaryPath: function () {
        return f;
      },
      cloneVaryPathWithNewSearchParams: function () {
        return y;
      },
      compareParams: function () {
        return _;
      },
      didReadChangedParam: function () {
        return S;
      },
      finalizeVaryPath: function () {
        return d;
      },
      getFulfilledRouteVaryPath: function () {
        return s;
      },
      getFulfilledSegmentVaryPath: function () {
        return function e(t, n) {
          return {
            id: t.id,
            value: null === t.id || n.has(t.id) ? t.value : o.Fallback,
            isRootParam: t.isRootParam,
            parent: null === t.parent ? null : e(t.parent, n),
          };
        };
      },
      getPartialVaryPath: function () {
        return h;
      },
      getRenderedSearchFromVaryPath: function () {
        return g;
      },
      getRouteVaryPath: function () {
        return c;
      },
      getSegmentVaryPathForRequest: function () {
        return p;
      },
      getShellSegmentVaryPath: function () {
        return function e(t) {
          return {
            id: t.id,
            value: null === t.id || !0 === t.isRootParam ? t.value : o.Fallback,
            isRootParam: t.isRootParam,
            parent: null === t.parent ? null : e(t.parent),
          };
        };
      },
    };
  for (var l in a) Object.defineProperty(n, l, { enumerable: !0, get: a[l] });
  let u = e.r(634258),
    o = e.r(948176),
    i = e.r(438188);
  function c(e, t, n) {
    return {
      id: null,
      value: e,
      isRootParam: !1,
      parent: {
        id: i.SEARCH_PARAMS_VARY_ID,
        value: t,
        isRootParam: !1,
        parent: { id: null, value: n, isRootParam: !1, parent: null },
      },
    };
  }
  function s(e, t, n, r) {
    return {
      id: null,
      value: e,
      isRootParam: !1,
      parent: {
        id: i.SEARCH_PARAMS_VARY_ID,
        value: t,
        isRootParam: !1,
        parent: {
          id: null,
          value: r ? n : o.Fallback,
          isRootParam: !1,
          parent: null,
        },
      },
    };
  }
  function f(e, t, n, r) {
    return { id: n, value: t, isRootParam: r, parent: e };
  }
  function d(e, t, n) {
    let r = n;
    return (
      null !== t &&
        (r = {
          id: i.SEARCH_PARAMS_VARY_ID,
          value: t,
          isRootParam: !1,
          parent: n,
        }),
      { id: null, value: e, isRootParam: !1, parent: r }
    );
  }
  function h(e) {
    let t = e.parent;
    return null !== t && t.id === i.SEARCH_PARAMS_VARY_ID ? t.parent : t;
  }
  function p(e, t) {
    let n = t.varyPath;
    if (e === u.FetchStrategy.RuntimeShell || e === u.FetchStrategy.StaticShell)
      return t.shellVaryPath;
    let r = n.parent;
    return null !== r &&
      r.id === i.SEARCH_PARAMS_VARY_ID &&
      e !== u.FetchStrategy.Full &&
      e !== u.FetchStrategy.PPRRuntime
      ? d(n.value, o.Fallback, h(n))
      : n;
  }
  function y(e, t) {
    let n = e.parent;
    return null === n || n.id !== i.SEARCH_PARAMS_VARY_ID
      ? e
      : d(e.value, t, h(e));
  }
  function g(e) {
    let t = e;
    for (; null !== t; ) {
      if (t.id === i.SEARCH_PARAMS_VARY_ID) {
        let e = t.value;
        if ("string" == typeof e) return e;
        break;
      }
      t = t.parent;
    }
    return null;
  }
  var v =
    (((r = {})[(r.None = 0)] = "None"),
    (r[(r.SearchParams = 1)] = "SearchParams"),
    (r[(r.PathParam = 2)] = "PathParam"),
    r);
  function _(e, t) {
    let n = e,
      r = t,
      a = 0;
    for (; null !== n && null !== r; ) {
      if (n.value !== r.value) {
        let e = n.id;
        if (null === e);
        else {
          if (e !== i.SEARCH_PARAMS_VARY_ID) return 2;
          a = 1;
        }
      }
      ((n = n.parent), (r = r.parent));
    }
    return a;
  }
  function S(e, t, n) {
    let r = e,
      a = t,
      l = null;
    for (; null !== r && null !== a; ) {
      if (r.value !== a.value) {
        let e = r.id;
        if (null === e);
        else if (
          (null === l &&
            (null === n || null === (l = (0, i.readVaryParams)(n)))) ||
          l.has(e)
        )
          return !0;
      }
      ((r = r.parent), (a = a.parent));
    }
    return !1;
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
