// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (e.i(149502), Object.defineProperty(n, "__esModule", { value: !0 }));
  var r = {
    IDLE_LINK_STATUS: function () {
      return f;
    },
    PENDING_LINK_STATUS: function () {
      return s;
    },
    getLinkForCurrentNavigation: function () {
      return p;
    },
    mountFormInstance: function () {
      return R;
    },
    mountLinkInstance: function () {
      return m;
    },
    onLinkVisibilityChanged: function () {
      return E;
    },
    onNavigationIntent: function () {
      return b;
    },
    pingVisibleLinks: function () {
      return A;
    },
    setLinkForCurrentNavigation: function () {
      return d;
    },
    unmountLinkForCurrentNavigation: function () {
      return h;
    },
    unmountPrefetchableInstance: function () {
      return P;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = e.r(634258),
    u = e.r(946859),
    o = e.r(685003),
    i = e.r(352386),
    c = null,
    s = { pending: !0 },
    f = { pending: !1 };
  function d(e) {
    (0, i.startTransition)(() => {
      (c?.setOptimisticLinkStatus(f), e?.setOptimisticLinkStatus(s), (c = e));
    });
  }
  function h(e) {
    c === e && (c = null);
  }
  function p() {
    return c;
  }
  let y = "function" == typeof WeakMap ? new WeakMap() : new Map(),
    g = new Set(),
    v =
      "function" == typeof IntersectionObserver
        ? new IntersectionObserver(
            function (e) {
              for (let t = e.length - 1; t >= 0; t--) {
                let n = e[t],
                  r = n.intersectionRatio > 0;
                E(n.target, r);
              }
            },
            { rootMargin: "200px" },
          )
        : null;
  function _(e, t) {
    (void 0 !== y.get(e) && P(e), y.set(e, t), null !== v && v.observe(e));
  }
  function S(t) {
    if (!("u" > typeof window)) return null;
    {
      let { createPrefetchURL: n } = e.r(611520);
      try {
        return n(t);
      } catch {
        return (
          ("function" == typeof reportError ? reportError : console.error)(
            `Cannot prefetch '${t}' because it cannot be converted to a URL.`,
          ),
          null
        );
      }
    }
  }
  function m(e, t, n, r, a, l, u) {
    if (a) {
      let a = S(t);
      if (null !== a) {
        let t = {
          router: n,
          fetchStrategy: r,
          isVisible: !1,
          prefetchTask: null,
          prefetchHref: a.href,
          setOptimisticLinkStatus: l,
          ownerStack: u,
        };
        return (_(e, t), t);
      }
    }
    return {
      router: n,
      fetchStrategy: r,
      isVisible: !1,
      prefetchTask: null,
      prefetchHref: null,
      setOptimisticLinkStatus: l,
      ownerStack: u,
    };
  }
  function R(e, t, n, r) {
    let a = S(t);
    null === a ||
      _(e, {
        router: n,
        fetchStrategy: r,
        isVisible: !1,
        prefetchTask: null,
        prefetchHref: a.href,
        setOptimisticLinkStatus: null,
      });
  }
  function P(e) {
    let t = y.get(e);
    if (void 0 !== t) {
      (y.delete(e), g.delete(t));
      let n = t.prefetchTask;
      null !== n && (0, o.cancelPrefetchTask)(n);
    }
    null !== v && v.unobserve(e);
  }
  function E(e, t) {
    let n = y.get(e);
    void 0 !== n &&
      ((n.isVisible = t),
      t ? g.add(n) : g.delete(n),
      T(n, l.PrefetchPriority.Default));
  }
  function b(e, t) {
    let n = y.get(e);
    void 0 !== n && void 0 !== n && T(n, l.PrefetchPriority.Intent);
  }
  function T(t, n) {
    if ("u" > typeof window) {
      let r = t.prefetchTask;
      if (!t.isVisible) {
        null !== r && (0, o.cancelPrefetchTask)(r);
        return;
      }
      let { getCurrentAppRouterState: a } = e.r(871512),
        l = a();
      if (null !== l)
        if (null === r) {
          let e = l.nextUrl,
            r = (0, u.createCacheKey)(t.prefetchHref, e);
          t.prefetchTask = (0, o.schedulePrefetchTask)(
            r,
            l.root,
            t.fetchStrategy,
            n,
            null,
            null,
          );
        } else (0, o.reschedulePrefetchTask)(r, l.root, t.fetchStrategy, n);
    }
  }
  function A(e, t) {
    for (let n of g) {
      let r = n.prefetchTask;
      if (null !== r && !(0, o.isPrefetchTaskDirty)(r, e, t)) continue;
      null !== r && (0, o.cancelPrefetchTask)(r);
      let a = (0, u.createCacheKey)(n.prefetchHref, e);
      n.prefetchTask = (0, o.schedulePrefetchTask)(
        a,
        t,
        n.fetchStrategy,
        l.PrefetchPriority.Default,
        null,
        null,
      );
    }
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
