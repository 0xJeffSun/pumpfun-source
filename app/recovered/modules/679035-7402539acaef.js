// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (e.i(149502), Object.defineProperty(n, "__esModule", { value: !0 }));
  var r = {
    hmrRefresh: function () {
      return R;
    },
    navigate: function () {
      return y;
    },
    push: function () {
      return g;
    },
    refresh: function () {
      return m;
    },
    replace: function () {
      return v;
    },
    restore: function () {
      return S;
    },
    traverse: function () {
      return _;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  let l = e.r(352386),
    u = e.r(313537),
    o = e.r(212835),
    i = e.r(871512),
    c = e.r(360601),
    s = e.r(83289),
    f = e.r(814621),
    d = e.r(611520),
    h = e.r(863090);
  function p() {
    let e = (0, i.getCurrentAppRouterState)();
    if (null === e)
      throw Error(
        "Internal Next.js error: Router action dispatched before initialization.",
      );
    return e;
  }
  function y(e, t, n, r, a, i) {
    if ((0, h.isJavaScriptURLString)(e))
      throw Error(
        "Next.js has blocked a javascript: URL as a security precaution.",
      );
    (0, l.startTransition)(() => {
      if (a) for (let e of a) (0, l.addTransitionType)(e);
      let h = new URL((0, f.addBasePath)(e), location.href);
      ((0, c.setLinkForCurrentNavigation)(r),
        (0, s.startRouterTransition)(e, t, p().tree, i),
        (0, o.dispatchAppRouterAction)({
          type: u.ACTION_NAVIGATE,
          url: h,
          isExternalUrl: (0, d.isExternalURL)(h),
          locationSearch: location.search,
          scrollBehavior: n,
          navigateType: t,
        }));
    });
  }
  function g(e, t) {
    y(
      e,
      "push",
      t?.scroll === !1 ? u.ScrollBehavior.NoScroll : u.ScrollBehavior.Default,
      null,
      t?.transitionTypes,
      null,
    );
  }
  function v(e, t) {
    y(
      e,
      "replace",
      t?.scroll === !1 ? u.ScrollBehavior.NoScroll : u.ScrollBehavior.Default,
      null,
      t?.transitionTypes,
      null,
    );
  }
  function _(e, t) {
    (0, l.startTransition)(() => {
      ((0, s.startRouterTransition)(e, "traverse", p().tree, null),
        S(new URL(e), t));
    });
  }
  function S(e, t) {
    (0, l.startTransition)(() => {
      (0, o.dispatchAppRouterAction)({
        type: u.ACTION_RESTORE,
        url: e,
        historyState: t,
      });
    });
  }
  function m() {
    (0, l.startTransition)(() => {
      (0, o.dispatchAppRouterAction)({ type: u.ACTION_REFRESH });
    });
  }
  function R() {
    throw Error(
      "hmrRefresh can only be used in development mode. Please use refresh instead.",
    );
  }
  (e.r(994260),
    ("function" == typeof n.default ||
      ("object" == typeof n.default && null !== n.default)) &&
      void 0 === n.default.__esModule &&
      (Object.defineProperty(n.default, "__esModule", { value: !0 }),
      Object.assign(n.default, n),
      (t.exports = n.default)));
};
