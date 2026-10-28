// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(352386),
    r = e.i(565693),
    n = e.i(10180),
    l = e.i(385676),
    s = e.i(908116),
    o = e.i(656522),
    c = e.i(702232);
  let d = a.createContext(void 0);
  function u(e) {
    let t = a.useContext(d);
    if (void 0 === t && !e) throw Error((0, c.f)(50));
    return t;
  }
  var m = e.i(523686),
    p = e.i(814421),
    g = e.i(231332),
    h = e.i(209296),
    x = e.i(726062),
    f = e.i(303232),
    w = e.i(590547),
    v = e.i(340607),
    y = e.i(53249),
    b = e.i(875355),
    j = e.i(530425),
    N = e.i(854274),
    S = e.i(913281);
  let C = {
    ...w.j,
    instantType: (0, h.f)((e) => e.instantType),
    hasViewport: (0, h.f)((e) => e.hasViewport),
  };
  class R extends x.f {
    constructor(e) {
      super(
        { ...{ ...(0, w.i)(), instantType: void 0, hasViewport: !1 }, ...e },
        {
          popupRef: a.createRef(),
          onOpenChange: void 0,
          onOpenChangeComplete: void 0,
          triggerElements: new v.f(),
          closeDelayRef: { current: 300 },
        },
        C,
      );
    }
    setOpen = (e, t) => {
      let i = t.reason,
        a = i === b.f.triggerHover,
        r = e && i === j.f.triggerFocus,
        n = !e && (i === N.f.triggerPress || i === S.f.escapeKey);
      if (
        ((t.preventUnmountOnClose = () => {
          this.set("preventUnmountingOnClose", !0);
        }),
        this.context.onOpenChange?.(e, t),
        t.isCanceled)
      )
        return;
      let l = () => {
        let a = { open: e };
        r
          ? (a.instantType = "focus")
          : n
            ? (a.instantType = "dismiss")
            : i === b.f.triggerHover && (a.instantType = void 0);
        let l = t.trigger?.id ?? null;
        ((l || e) &&
          ((a.activeTriggerId = l),
          (a.activeTriggerElement = t.trigger ?? null)),
          this.update(a));
      };
      a ? g.flushSync(l) : l();
    };
    static useStore(e, t) {
      let i = (0, f.f)(() => new R(t)).current,
        a = e ?? i,
        r = (0, y.f)({ popupStore: a, onOpenChange: a.setOpen });
      return ((a.state.floatingRootContext = r), a);
    }
  }
  var E = e.i(290915);
  function _(e) {
    let {
        open: i,
        defaultOpen: o = !1,
        onOpenChange: c,
        onOpenChangeComplete: u,
        actionsRef: g,
        handle: h,
        triggerId: x,
        defaultTriggerId: f = null,
        children: w,
      } = e,
      v = R.useStore(h?.store, {
        open: o,
        openProp: i,
        activeTriggerId: f,
        triggerIdProp: x,
      });
    ((0, n.f)(() => {
      void 0 === i &&
        !1 === v.state.open &&
        !0 === o &&
        v.update({ open: !0, activeTriggerId: f });
    }),
      v.useControlledProp("openProp", i),
      v.useControlledProp("triggerIdProp", x),
      v.useContextCallback("onOpenChange", c),
      v.useContextCallback("onOpenChangeComplete", u));
    let y = v.useState("open"),
      b = v.useState("activeTriggerId"),
      j = v.useState("payload");
    (0, E.z)(v);
    let { forceUnmount: N } = (0, E.L)(y, v);
    (0, r.f)(() => {
      y && null == b && v.set("payload", void 0);
    }, [v, b, y]);
    let S = a.useCallback(() => {
      var e, t;
      let i;
      v.setOpen(
        !1,
        ((e = v),
        (t = p.f.imperativeAction),
        ((i = (0, m.f)(t)).preventUnmountOnClose = () => {
          e.set("preventUnmountingOnClose", !0);
        }),
        i),
      );
    }, [v]);
    a.useImperativeHandle(g, () => ({ unmount: N, close: S }), [N, S]);
    let C = v.useState("floatingRootContext"),
      _ = (0, l.f)(C),
      {
        getReferenceProps: P,
        getTriggerProps: T,
        getFloatingProps: M,
      } = (0, s.f)([_]),
      I = a.useMemo(() => P(), [P]),
      k = a.useMemo(() => T(), [T]),
      O = a.useMemo(() => M(), [M]);
    return (
      v.useSyncedValues({
        activeTriggerProps: I,
        inactiveTriggerProps: k,
        popupProps: O,
      }),
      (0, t.jsx)(d.Provider, {
        value: v,
        children: "function" == typeof w ? w({ payload: j }) : w,
      })
    );
  }
  let P = a.createContext(void 0);
  var T = e.i(873425);
  let M = a.forwardRef(function (e, i) {
    let { keepMounted: a = !1, ...r } = e;
    return u().useState("mounted") || a
      ? (0, t.jsx)(P.Provider, {
          value: a,
          children: (0, t.jsx)(T.f, { ref: i, ...r }),
        })
      : null;
  });
  var I = e.i(833551),
    k = e.i(648585),
    O = e.i(739774),
    z = e.i(994907),
    A = e.i(502522),
    q = e.i(175843);
  let U = a.forwardRef(function (e, t) {
      let {
          render: i,
          className: n,
          delay: l,
          closeDelay: s,
          id: o,
          payload: d,
          handle: m,
          ...p
        } = e,
        g = u(!0),
        h = m?.store ?? g;
      if (!h) throw Error((0, c.f)(89));
      let x = (0, O.f)(o),
        f = h.useState("isTriggerActive", x),
        w = h.useState("isOpenedByTrigger", x),
        v = h.useState("floatingRootContext"),
        y = a.useRef(null),
        b = l ?? 600,
        j = s ?? 300,
        { registerTrigger: N, isMountedByThisTrigger: S } = (0, E.F)(x, y, h, {
          payload: d,
        });
      (0, r.f)(() => {
        S && (h.context.closeDelayRef.current = j);
      }, [h, S, j]);
      let C = (0, q.f)(v, {
          mouseOnly: !0,
          move: !1,
          handleClose: (0, z.f)(),
          delay: () => ({ open: b, close: j }),
          triggerElementRef: y,
          isActiveTrigger: f,
        }),
        R = (0, A.f)(v, { delay: b }),
        _ = h.useState("triggerProps", S);
      return (0, k.f)("a", e, {
        state: { open: w },
        ref: [t, N, y],
        props: [C, R.reference, _, { id: x }, p],
        stateAttributesMapping: I.J,
      });
    }),
    L = a.createContext(void 0);
  var F = e.i(257311),
    $ = e.i(300310),
    D = e.i(996971),
    H = e.i(813258);
  let B = a.forwardRef(function (e, i) {
    let {
        render: r,
        className: n,
        anchor: l,
        positionMethod: s = "absolute",
        side: d = "bottom",
        align: m = "center",
        sideOffset: p = 0,
        alignOffset: g = 0,
        collisionBoundary: h = "clipping-ancestors",
        collisionPadding: x = 5,
        arrowPadding: f = 5,
        sticky: w = !1,
        disableAnchorTracking: v = !1,
        collisionAvoidance: y = $.n,
        ...b
      } = e,
      j = u(),
      N = (function () {
        let e = a.useContext(P);
        if (void 0 === e) throw Error((0, c.f)(48));
        return e;
      })(),
      S = (0, o.T)(),
      C = j.useState("open"),
      R = j.useState("mounted"),
      E = j.useState("floatingRootContext"),
      _ = j.useState("instantType"),
      T = j.useState("transitionStatus"),
      M = j.useState("hasViewport"),
      O = (0, F.f)({
        anchor: l,
        floatingRootContext: E,
        positionMethod: s,
        mounted: R,
        side: d,
        sideOffset: p,
        align: m,
        alignOffset: g,
        arrowPadding: f,
        collisionBoundary: h,
        collisionPadding: x,
        sticky: w,
        disableAnchorTracking: v,
        keepMounted: N,
        nodeId: S,
        collisionAvoidance: y,
        adaptiveOrigin: M ? D.e : void 0,
      }),
      z = a.useMemo(() => {
        let e = {};
        return (
          C || (e.pointerEvents = "none"),
          {
            role: "presentation",
            hidden: !R,
            style: { ...O.positionerStyles, ...e },
          }
        );
      }, [C, R, O.positionerStyles]),
      A = {
        open: C,
        side: O.side,
        align: O.align,
        anchorHidden: O.anchorHidden,
        instant: _,
      },
      q = a.useMemo(
        () => ({
          side: O.side,
          align: O.align,
          arrowRef: O.arrowRef,
          arrowUncentered: O.arrowUncentered,
          arrowStyles: O.arrowStyles,
        }),
        [O.side, O.align, O.arrowRef, O.arrowUncentered, O.arrowStyles],
      ),
      U = (0, k.f)("div", e, {
        state: A,
        props: [z, (0, H.f)(T), b],
        ref: [i, j.useStateSetter("positionerElement")],
        stateAttributesMapping: I.E,
      });
    return (0, t.jsx)(L.Provider, {
      value: q,
      children: (0, t.jsx)(o.s, { id: S, children: U }),
    });
  });
  var V = e.i(278051),
    W = e.i(810954),
    K = e.i(24542),
    G = e.i(195086);
  let J = { ...I.E, ...W.T },
    Q = a.forwardRef(function (e, t) {
      let { className: i, render: r, ...n } = e,
        l = u(),
        { side: s, align: o } = (function () {
          let e = a.useContext(L);
          if (void 0 === e) throw Error((0, c.f)(49));
          return e;
        })(),
        d = l.useState("open"),
        m = l.useState("instantType"),
        p = l.useState("transitionStatus"),
        g = l.useState("popupProps"),
        h = l.useState("floatingRootContext");
      (0, K.f)({
        open: d,
        ref: l.context.popupRef,
        onComplete() {
          d && l.context.onOpenChangeComplete?.(!0);
        },
      });
      let x = (0, V.f)(() => l.context.closeDelayRef.current);
      return (
        (0, G.f)(h, { closeDelay: x }),
        (0, k.f)("div", e, {
          state: {
            open: d,
            side: s,
            align: o,
            instant: m,
            transitionStatus: p,
          },
          ref: [t, l.context.popupRef, l.useStateSetter("popupElement")],
          props: [g, (0, H.f)(p), n],
          stateAttributesMapping: J,
        })
      );
    });
  e.s(
    [
      "Popup",
      0,
      Q,
      "Portal",
      0,
      M,
      "Positioner",
      0,
      B,
      "Root",
      0,
      function (e) {
        return u(!0)
          ? (0, t.jsx)(_, { ...e })
          : (0, t.jsx)(o.V, { children: (0, t.jsx)(_, { ...e }) });
      },
      "Trigger",
      0,
      U,
    ],
    752365,
  );
  var Z = e.i(752365),
    Z = Z,
    X = Z,
    Y = Z,
    ee = Z,
    et = Z,
    ei = e.i(458310),
    ea = e.i(360827),
    er = e.i(338319);
  e.s(
    [
      "f",
      0,
      (e) => {
        let r,
          n,
          l,
          s,
          o,
          c,
          d,
          u,
          m,
          p,
          g,
          h,
          x,
          f = (0, i.c)(35),
          {
            src: w,
            testId: v,
            className: y,
            dense: b,
            priority: j,
            hostHref: N,
            onHostClick: S,
          } = e,
          C = void 0 !== j && j,
          R = (0, a.useRef)(null),
          E = (0, a.useRef)(null),
          [_, P] = (0, a.useState)(!1),
          [T, M] = (0, a.useState)(null);
        (f[0] !== _
          ? ((r = () => {
              if (!_) return;
              let e = (e) => {
                let t = R.current;
                t && e.target instanceof Node && e.target.contains(t) && P(!1);
              };
              return (
                document.addEventListener("scroll", e, {
                  capture: !0,
                  passive: !0,
                }),
                () => document.removeEventListener("scroll", e, { capture: !0 })
              );
            }),
            (n = [_]),
            (f[0] = _),
            (f[1] = r),
            (f[2] = n))
          : ((r = f[1]), (n = f[2])),
          (0, a.useEffect)(r, n),
          f[3] === Symbol.for("react.memo_cache_sentinel")
            ? ((l = (e) => {
                let { movementX: t, movementY: i } = e.nativeEvent;
                (0 !== t || 0 !== i) &&
                  (E.current = e.currentTarget.getBoundingClientRect().top);
              }),
              (f[3] = l))
            : (l = f[3]));
        let I = l;
        f[4] === Symbol.for("react.memo_cache_sentinel")
          ? ((s = (e, t) => {
              let i = R.current;
              e &&
              "trigger-hover" === t.reason &&
              E.current !== i?.getBoundingClientRect().top
                ? t.cancel()
                : (P(e),
                  e &&
                    M(
                      i
                        ? (({
                            naturalWidth: e,
                            naturalHeight: t,
                            viewportWidth: i,
                            viewportHeight: a,
                          }) => {
                            if (e <= 0 || t <= 0) return null;
                            let r = Math.min(0.9 * i, 960) - 8,
                              n = Math.min(0.85 * a, 960) - 8;
                            if (r <= 0 || n <= 0) return null;
                            let l = Math.min(r / e, n / t, 3);
                            return {
                              width: Math.round(e * l),
                              height: Math.round(t * l),
                            };
                          })({
                            naturalWidth: i.naturalWidth,
                            naturalHeight: i.naturalHeight,
                            viewportWidth: window.innerWidth,
                            viewportHeight: window.innerHeight,
                          })
                        : null,
                    ));
            }),
            (f[4] = s))
          : (s = f[4]);
        let k = s;
        f[5] === Symbol.for("react.memo_cache_sentinel")
          ? ((o = () => {
              E.current = null;
            }),
            (f[5] = o))
          : (o = f[5]);
        let O = C ? "eager" : "lazy",
          z = C ? "high" : void 0,
          A = void 0 !== b && b ? "rounded-md" : "rounded-xl",
          q = !N && y;
        (f[6] !== A || f[7] !== q
          ? ((c = (0, er.c)(
              "max-h-80 w-auto max-w-full border border-border-secondary object-cover",
              A,
              q,
            )),
            (f[6] = A),
            (f[7] = q),
            (f[8] = c))
          : (c = f[8]),
          f[9] !== w || f[10] !== c || f[11] !== O || f[12] !== z || f[13] !== v
            ? ((d = (0, t.jsx)(Z.Trigger, {
                delay: 600,
                closeDelay: 100,
                onMouseEnter: o,
                onMouseMove: I,
                render: (0, t.jsx)("img", {
                  ref: R,
                  src: w,
                  alt: "",
                  loading: O,
                  fetchPriority: z,
                  "data-testid": v,
                  className: c,
                }),
              })),
              (f[9] = w),
              (f[10] = c),
              (f[11] = O),
              (f[12] = z),
              (f[13] = v),
              (f[14] = d))
            : (d = f[14]));
        let U = d;
        f[15] !== y || f[16] !== N || f[17] !== S || f[18] !== v || f[19] !== U
          ? ((u = N
              ? (0, t.jsx)(ei.default, {
                  href: N,
                  prefetch: !1,
                  onClick: S,
                  tabIndex: -1,
                  "aria-hidden": "true",
                  "data-testid": `${v}-host-link`,
                  className: (0, er.c)(
                    "relative z-[2] block w-fit max-w-full",
                    y,
                  ),
                  children: U,
                })
              : U),
            (f[15] = y),
            (f[16] = N),
            (f[17] = S),
            (f[18] = v),
            (f[19] = U),
            (f[20] = u))
          : (u = f[20]);
        let L = `${v}-preview-popup`;
        f[21] === Symbol.for("react.memo_cache_sentinel")
          ? ((m = (0, er.c)(
              "origin-(--transform-origin) p-1 outline-none duration-150 data-[open]:animate-in data-[open]:fade-in-0 data-[open]:zoom-in-95",
              ea.V,
            )),
            (f[21] = m))
          : (m = f[21]);
        let F = `${v}-preview`;
        return (
          f[22] !== T
            ? ((p = T
                ? {
                    "--zoom-w": `${T.width}px`,
                    "--zoom-ratio": `${T.width} / ${T.height}`,
                  }
                : void 0),
              (f[22] = T),
              (f[23] = p))
            : (p = f[23]),
          f[24] !== w || f[25] !== F || f[26] !== p
            ? ((g = (0, t.jsx)("img", {
                src: w,
                alt: "",
                decoding: "async",
                draggable: !1,
                "data-testid": F,
                className:
                  "block h-auto w-auto max-w-[calc(var(--available-width)-8px)] max-h-[calc(var(--available-height)-8px)] aspect-[var(--zoom-ratio)] w-[min(var(--zoom-w),calc(var(--available-width)_-_8px),calc((var(--available-height)_-_8px)_*_var(--zoom-ratio)))] rounded-md object-contain",
                style: p,
              })),
              (f[24] = w),
              (f[25] = F),
              (f[26] = p),
              (f[27] = g))
            : (g = f[27]),
          f[28] !== L || f[29] !== g
            ? ((h = (0, t.jsx)(X.Portal, {
                children: (0, t.jsx)(Y.Positioner, {
                  side: "right",
                  align: "start",
                  sideOffset: 12,
                  collisionPadding: 16,
                  className: "pointer-events-none z-[1000]",
                  children: (0, t.jsx)(ee.Popup, {
                    "data-testid": L,
                    className: m,
                    children: g,
                  }),
                }),
              })),
              (f[28] = L),
              (f[29] = g),
              (f[30] = h))
            : (h = f[30]),
          f[31] !== _ || f[32] !== u || f[33] !== h
            ? ((x = (0, t.jsxs)(et.Root, {
                open: _,
                onOpenChange: k,
                children: [u, h],
              })),
              (f[31] = _),
              (f[32] = u),
              (f[33] = h),
              (f[34] = x))
            : (x = f[34]),
          x
        );
      },
    ],
    364889,
  );
};
