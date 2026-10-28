// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(352386),
    r = e.i(957680),
    n = e.i(457150),
    a = e.i(144685),
    o = e.i(329041),
    s = e.i(43536),
    l = e.i(242194),
    u = e.i(398246),
    c = e.i(679895),
    d = e.i(725692),
    f = e.i(463264),
    m = e.i(80496),
    h = e.i(964421),
    p = e.i(428746),
    E = e.i(554653),
    v = e.i(430663),
    g = e.i(140267),
    L = e.i(350986),
    O = e.i(826085);
  function y(e, { forwardMotionProps: A = !1, type: T } = {}, I, C) {
    I && (0, m.f)(I);
    let w = T ? "svg" === T : (0, u.f)(e),
      R = w ? d.f : c.f;
    function S(u, c) {
      let d,
        m = {
          ...(0, i.useContext)(a.f),
          ...u,
          layoutId: (function ({ layoutId: e }) {
            let t = (0, i.useContext)(r.f).id;
            return t && void 0 !== e ? t + "-" + e : e;
          })(u),
        },
        { isStatic: h } = m,
        y = (0, s.f)(u),
        T = R(u, h);
      if (!h && "u" > typeof window) {
        (0, i.useContext)(n.f).strict;
        let t = (function (e) {
          let { drag: t, layout: i } = (0, f.f)();
          if (!t && !i) return {};
          let r = { ...t, ...i };
          return {
            MeasureLayout:
              t?.isEnabled(e) || i?.isEnabled(e) ? r.MeasureLayout : void 0,
            ProjectionNode: r.ProjectionNode,
          };
        })(m);
        ((d = t.MeasureLayout),
          (y.visualElement = (function (e, t, r, s, l, u) {
            let { visualElement: c } = (0, i.useContext)(o.f),
              d = (0, i.useContext)(n.f),
              f = (0, i.useContext)(v.f),
              m = (0, i.useContext)(a.f),
              h = m.reducedMotion,
              p = m.skipAnimations,
              y = (0, i.useRef)(null),
              A = (0, i.useRef)(!1);
            ((s = s || d.renderer),
              !y.current &&
                s &&
                ((y.current = s(e, {
                  visualState: t,
                  parent: c,
                  props: r,
                  presenceContext: f,
                  blockInitialAnimation: !!f && !1 === f.initial,
                  reducedMotionConfig: h,
                  skipAnimations: p,
                  isSVG: u,
                })),
                A.current &&
                  y.current &&
                  (y.current.manuallyAnimateOnMount = !0)));
            let T = y.current,
              I = (0, i.useContext)(g.f);
            T &&
              !T.projection &&
              l &&
              ("html" === T.type || "svg" === T.type) &&
              (function (e, t, i, r) {
                let {
                  layoutId: n,
                  layout: a,
                  drag: o,
                  dragConstraints: s,
                  layoutScroll: l,
                  layoutRoot: u,
                  layoutAnchor: c,
                  layoutCrossfade: d,
                } = t;
                ((e.projection = new i(
                  e.latestValues,
                  t["data-framer-portal-id"]
                    ? void 0
                    : (function e(t) {
                        if (t)
                          return !1 !== t.options.allowProjection
                            ? t.projection
                            : e(t.parent);
                      })(e.parent),
                )),
                  e.projection.setOptions({
                    layoutId: n,
                    layout: a,
                    alwaysMeasureLayout: !!o || (s && (0, L.f)(s)),
                    visualElement: e,
                    animationType: "string" == typeof a ? a : "both",
                    initialPromotionConfig: r,
                    crossfade: d,
                    layoutScroll: l,
                    layoutRoot: u,
                    layoutAnchor: c,
                  }));
              })(y.current, r, l, I);
            let C = (0, i.useRef)(!1);
            (0, i.useInsertionEffect)(() => {
              T && C.current && T.update(r, f);
            });
            let w = r[E.f],
              R = (0, i.useRef)(
                !!w &&
                  "u" > typeof window &&
                  !window.MotionHandoffIsComplete?.(w) &&
                  window.MotionHasOptimisedAnimation?.(w),
              );
            return (
              (0, O.f)(() => {
                ((A.current = !0),
                  T &&
                    ((C.current = !0),
                    (window.MotionIsMounted = !0),
                    T.updateFeatures(),
                    T.scheduleRenderMicrotask(),
                    R.current &&
                      T.animationState &&
                      T.animationState.animateChanges()));
              }),
              (0, i.useEffect)(() => {
                T &&
                  (!R.current &&
                    T.animationState &&
                    T.animationState.animateChanges(),
                  R.current &&
                    (queueMicrotask(() => {
                      window.MotionHandoffMarkAsComplete?.(w);
                    }),
                    (R.current = !1)),
                  (T.enteringChildren = void 0));
              }),
              T
            );
          })(e, T, m, C, t.ProjectionNode, w)));
      }
      return (0, t.jsxs)(o.f.Provider, {
        value: y,
        children: [
          d && y.visualElement
            ? (0, t.jsx)(d, { visualElement: y.visualElement, ...m })
            : null,
          (0, l.f)(e, u, (0, p.f)(T, y.visualElement, c), T, h, A, w),
        ],
      });
    }
    S.displayName = `motion.${"string" == typeof e ? e : `create(${e.displayName ?? e.name ?? ""})`}`;
    let b = (0, i.forwardRef)(S);
    return ((b[h.f] = e), b);
  }
  e.s(
    [
      "f",
      0,
      function (e, t) {
        if ("u" < typeof Proxy) return y;
        let i = new Map(),
          r = (i, r) => y(i, r, e, t);
        return new Proxy((e, t) => r(e, t), {
          get: (n, a) =>
            "create" === a
              ? r
              : (i.has(a) || i.set(a, y(a, void 0, e, t)), i.get(a)),
        });
      },
    ],
    360286,
  );
};
