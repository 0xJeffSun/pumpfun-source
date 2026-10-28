// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (e.i(149502), Object.defineProperty(r, "__esModule", { value: !0 }));
  var n = {
    default: function () {
      return w;
    },
    useLinkStatus: function () {
      return y;
    },
  };
  for (var o in n) Object.defineProperty(r, o, { enumerable: !0, get: n[o] });
  let i = e.r(56421),
    s = e.r(732486),
    a = i._(e.r(352386)),
    l = e.r(597354),
    u = e.r(8001),
    c = e.r(610961),
    d = e.r(965333),
    f = e.r(814621),
    p = e.r(313537),
    h = e.r(360601),
    g = e.r(657693),
    m = e.r(634258);
  function w(t) {
    var r;
    let n,
      o,
      i,
      [w, y] = (0, a.useOptimistic)(h.IDLE_LINK_STATUS),
      v = (0, a.useRef)(null),
      {
        href: E,
        as: S,
        children: _,
        prefetch: A = null,
        passHref: L,
        replace: C,
        shallow: I,
        scroll: O,
        onClick: k,
        onMouseEnter: N,
        onTouchStart: x,
        legacyBehavior: U = !1,
        onNavigate: P,
        transitionTypes: R,
        ref: $,
        unstable_dynamicOnHover: T,
        ...D
      } = t;
    ((n = _),
      U &&
        ("string" == typeof n || "number" == typeof n) &&
        (n = (0, s.jsx)("a", { children: n })));
    let j = a.default.useContext(u.AppRouterContext),
      M = !1 !== A,
      F = !1 === A ? "none" : !0 === A ? "full" : "auto",
      B =
        "none" !== F && "full" === F
          ? m.FetchStrategy.Full
          : m.FetchStrategy.PPR,
      W = "string" == typeof (r = S || E) ? r : (0, l.formatUrl)(r);
    if (U) {
      if (n?.$$typeof === Symbol.for("react.lazy"))
        throw Error(
          "`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag.",
        );
      o = a.default.Children.only(n);
    }
    let z = U ? o && "object" == typeof o && o.ref : $,
      K,
      V = a.default.useCallback(
        (e) => (
          null !== j &&
            (v.current = (0, h.mountLinkInstance)(e, W, j, B, M, y, K)),
          () => {
            (v.current &&
              ((0, h.unmountLinkForCurrentNavigation)(v.current),
              (v.current = null)),
              (0, h.unmountPrefetchableInstance)(e));
          }
        ),
        [M, W, j, B, y, K],
      ),
      J = {
        ref: (0, c.useMergedRef)(V, z),
        onClick(t) {
          (U || "function" != typeof k || k(t),
            U &&
              o.props &&
              "function" == typeof o.props.onClick &&
              o.props.onClick(t),
            !j ||
              t.defaultPrevented ||
              (function (t, r, n, o, i, s, a, l = "none") {
                if ("u" > typeof window) {
                  let u,
                    { nodeName: c } = t.currentTarget;
                  if (
                    ("A" === c.toUpperCase() &&
                      (((u = t.currentTarget.getAttribute("target")) &&
                        "_self" !== u) ||
                        t.metaKey ||
                        t.ctrlKey ||
                        t.shiftKey ||
                        t.altKey ||
                        (t.nativeEvent && 2 === t.nativeEvent.which))) ||
                    t.currentTarget.hasAttribute("download")
                  )
                    return;
                  if (!(0, g.isLocalURL)(r)) {
                    o && (t.preventDefault(), location.replace(r));
                    return;
                  }
                  if ((t.preventDefault(), s)) {
                    let e = !1;
                    if (
                      (s({
                        preventDefault: () => {
                          e = !0;
                        },
                      }),
                      e)
                    )
                      return;
                  }
                  let { navigate: d } = e.r(311134);
                  d(
                    r,
                    o ? "replace" : "push",
                    !1 === i
                      ? p.ScrollBehavior.NoScroll
                      : p.ScrollBehavior.Default,
                    n.current,
                    a,
                    l,
                  );
                }
              })(t, W, v, C, O, P, R, F));
        },
        onMouseEnter(e) {
          (U || "function" != typeof N || N(e),
            U &&
              o.props &&
              "function" == typeof o.props.onMouseEnter &&
              o.props.onMouseEnter(e),
            j && M && (0, h.onNavigationIntent)(e.currentTarget, !0 === T));
        },
        onTouchStart: function (e) {
          (U || "function" != typeof x || x(e),
            U &&
              o.props &&
              "function" == typeof o.props.onTouchStart &&
              o.props.onTouchStart(e),
            j && M && (0, h.onNavigationIntent)(e.currentTarget, !0 === T));
        },
      };
    return (
      (0, d.isAbsoluteUrl)(W)
        ? (J.href = W)
        : (U && !L && ("a" !== o.type || "href" in o.props)) ||
          (J.href = (0, f.addBasePath)(W)),
      (i = U
        ? a.default.cloneElement(o, J)
        : (0, s.jsx)("a", { ...D, ...J, children: n })),
      (0, s.jsx)(b.Provider, { value: w, children: i })
    );
  }
  let b = (0, a.createContext)(h.IDLE_LINK_STATUS),
    y = () => (0, a.useContext)(b);
  ("function" == typeof r.default ||
    ("object" == typeof r.default && null !== r.default)) &&
    void 0 === r.default.__esModule &&
    (Object.defineProperty(r.default, "__esModule", { value: !0 }),
    Object.assign(r.default, r),
    (t.exports = r.default));
};
