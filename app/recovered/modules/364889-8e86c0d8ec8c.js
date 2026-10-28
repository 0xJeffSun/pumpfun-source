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
    d = e.i(702232);
  let c = a.createContext(void 0);
  function u(e) {
    let t = a.useContext(c);
    if (void 0 === t && !e) throw Error((0, d.f)(50));
    return t;
  }
  var m = e.i(523686),
    p = e.i(814421),
    h = e.i(231332),
    f = e.i(209296),
    g = e.i(726062),
    x = e.i(303232),
    v = e.i(590547),
    y = e.i(340607),
    w = e.i(53249),
    b = e.i(875355),
    j = e.i(530425),
    N = e.i(854274),
    C = e.i(913281);
  let S = {
    ...v.j,
    instantType: (0, f.f)((e) => e.instantType),
    hasViewport: (0, f.f)((e) => e.hasViewport),
  };
  class M extends g.f {
    constructor(e) {
      super(
        { ...{ ...(0, v.i)(), instantType: void 0, hasViewport: !1 }, ...e },
        {
          popupRef: a.createRef(),
          onOpenChange: void 0,
          onOpenChangeComplete: void 0,
          triggerElements: new y.f(),
          closeDelayRef: { current: 300 },
        },
        S,
      );
    }
    setOpen = (e, t) => {
      let i = t.reason,
        a = i === b.f.triggerHover,
        r = e && i === j.f.triggerFocus,
        n = !e && (i === N.f.triggerPress || i === C.f.escapeKey);
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
      a ? h.flushSync(l) : l();
    };
    static useStore(e, t) {
      let i = (0, x.f)(() => new M(t)).current,
        a = e ?? i,
        r = (0, w.f)({ popupStore: a, onOpenChange: a.setOpen });
      return ((a.state.floatingRootContext = r), a);
    }
  }
  var T = e.i(290915);
  function k(e) {
    let {
        open: i,
        defaultOpen: o = !1,
        onOpenChange: d,
        onOpenChangeComplete: u,
        actionsRef: h,
        handle: f,
        triggerId: g,
        defaultTriggerId: x = null,
        children: v,
      } = e,
      y = M.useStore(f?.store, {
        open: o,
        openProp: i,
        activeTriggerId: x,
        triggerIdProp: g,
      });
    ((0, n.f)(() => {
      void 0 === i &&
        !1 === y.state.open &&
        !0 === o &&
        y.update({ open: !0, activeTriggerId: x });
    }),
      y.useControlledProp("openProp", i),
      y.useControlledProp("triggerIdProp", g),
      y.useContextCallback("onOpenChange", d),
      y.useContextCallback("onOpenChangeComplete", u));
    let w = y.useState("open"),
      b = y.useState("activeTriggerId"),
      j = y.useState("payload");
    (0, T.z)(y);
    let { forceUnmount: N } = (0, T.L)(w, y);
    (0, r.f)(() => {
      w && null == b && y.set("payload", void 0);
    }, [y, b, w]);
    let C = a.useCallback(() => {
      var e, t;
      let i;
      y.setOpen(
        !1,
        ((e = y),
        (t = p.f.imperativeAction),
        ((i = (0, m.f)(t)).preventUnmountOnClose = () => {
          e.set("preventUnmountingOnClose", !0);
        }),
        i),
      );
    }, [y]);
    a.useImperativeHandle(h, () => ({ unmount: N, close: C }), [N, C]);
    let S = y.useState("floatingRootContext"),
      k = (0, l.f)(S),
      {
        getReferenceProps: R,
        getTriggerProps: _,
        getFloatingProps: E,
      } = (0, s.f)([k]),
      P = a.useMemo(() => R(), [R]),
      A = a.useMemo(() => _(), [_]),
      z = a.useMemo(() => E(), [E]);
    return (
      y.useSyncedValues({
        activeTriggerProps: P,
        inactiveTriggerProps: A,
        popupProps: z,
      }),
      (0, t.jsx)(c.Provider, {
        value: y,
        children: "function" == typeof v ? v({ payload: j }) : v,
      })
    );
  }
  let R = a.createContext(void 0);
  var _ = e.i(873425);
  let E = a.forwardRef(function (e, i) {
    let { keepMounted: a = !1, ...r } = e;
    return u().useState("mounted") || a
      ? (0, t.jsx)(R.Provider, {
          value: a,
          children: (0, t.jsx)(_.f, { ref: i, ...r }),
        })
      : null;
  });
  var P = e.i(833551),
    A = e.i(648585),
    z = e.i(739774),
    U = e.i(994907),
    I = e.i(502522),
    F = e.i(175843);
  let O = a.forwardRef(function (e, t) {
      let {
          render: i,
          className: n,
          delay: l,
          closeDelay: s,
          id: o,
          payload: c,
          handle: m,
          ...p
        } = e,
        h = u(!0),
        f = m?.store ?? h;
      if (!f) throw Error((0, d.f)(89));
      let g = (0, z.f)(o),
        x = f.useState("isTriggerActive", g),
        v = f.useState("isOpenedByTrigger", g),
        y = f.useState("floatingRootContext"),
        w = a.useRef(null),
        b = l ?? 600,
        j = s ?? 300,
        { registerTrigger: N, isMountedByThisTrigger: C } = (0, T.F)(g, w, f, {
          payload: c,
        });
      (0, r.f)(() => {
        C && (f.context.closeDelayRef.current = j);
      }, [f, C, j]);
      let S = (0, F.f)(y, {
          mouseOnly: !0,
          move: !1,
          handleClose: (0, U.f)(),
          delay: () => ({ open: b, close: j }),
          triggerElementRef: w,
          isActiveTrigger: x,
        }),
        M = (0, I.f)(y, { delay: b }),
        k = f.useState("triggerProps", C);
      return (0, A.f)("a", e, {
        state: { open: v },
        ref: [t, N, w],
        props: [S, M.reference, k, { id: g }, p],
        stateAttributesMapping: P.J,
      });
    }),
    B = a.createContext(void 0);
  var D = e.i(257311),
    L = e.i(300310),
    q = e.i(996971),
    $ = e.i(813258);
  let H = a.forwardRef(function (e, i) {
    let {
        render: r,
        className: n,
        anchor: l,
        positionMethod: s = "absolute",
        side: c = "bottom",
        align: m = "center",
        sideOffset: p = 0,
        alignOffset: h = 0,
        collisionBoundary: f = "clipping-ancestors",
        collisionPadding: g = 5,
        arrowPadding: x = 5,
        sticky: v = !1,
        disableAnchorTracking: y = !1,
        collisionAvoidance: w = L.n,
        ...b
      } = e,
      j = u(),
      N = (function () {
        let e = a.useContext(R);
        if (void 0 === e) throw Error((0, d.f)(48));
        return e;
      })(),
      C = (0, o.T)(),
      S = j.useState("open"),
      M = j.useState("mounted"),
      T = j.useState("floatingRootContext"),
      k = j.useState("instantType"),
      _ = j.useState("transitionStatus"),
      E = j.useState("hasViewport"),
      z = (0, D.f)({
        anchor: l,
        floatingRootContext: T,
        positionMethod: s,
        mounted: M,
        side: c,
        sideOffset: p,
        align: m,
        alignOffset: h,
        arrowPadding: x,
        collisionBoundary: f,
        collisionPadding: g,
        sticky: v,
        disableAnchorTracking: y,
        keepMounted: N,
        nodeId: C,
        collisionAvoidance: w,
        adaptiveOrigin: E ? q.e : void 0,
      }),
      U = a.useMemo(() => {
        let e = {};
        return (
          S || (e.pointerEvents = "none"),
          {
            role: "presentation",
            hidden: !M,
            style: { ...z.positionerStyles, ...e },
          }
        );
      }, [S, M, z.positionerStyles]),
      I = {
        open: S,
        side: z.side,
        align: z.align,
        anchorHidden: z.anchorHidden,
        instant: k,
      },
      F = a.useMemo(
        () => ({
          side: z.side,
          align: z.align,
          arrowRef: z.arrowRef,
          arrowUncentered: z.arrowUncentered,
          arrowStyles: z.arrowStyles,
        }),
        [z.side, z.align, z.arrowRef, z.arrowUncentered, z.arrowStyles],
      ),
      O = (0, A.f)("div", e, {
        state: I,
        props: [U, (0, $.f)(_), b],
        ref: [i, j.useStateSetter("positionerElement")],
        stateAttributesMapping: P.E,
      });
    return (0, t.jsx)(B.Provider, {
      value: F,
      children: (0, t.jsx)(o.s, { id: C, children: O }),
    });
  });
  var V = e.i(278051),
    W = e.i(810954),
    K = e.i(24542),
    G = e.i(195086);
  let J = { ...P.E, ...W.T },
    Q = a.forwardRef(function (e, t) {
      let { className: i, render: r, ...n } = e,
        l = u(),
        { side: s, align: o } = (function () {
          let e = a.useContext(B);
          if (void 0 === e) throw Error((0, d.f)(49));
          return e;
        })(),
        c = l.useState("open"),
        m = l.useState("instantType"),
        p = l.useState("transitionStatus"),
        h = l.useState("popupProps"),
        f = l.useState("floatingRootContext");
      (0, K.f)({
        open: c,
        ref: l.context.popupRef,
        onComplete() {
          c && l.context.onOpenChangeComplete?.(!0);
        },
      });
      let g = (0, V.f)(() => l.context.closeDelayRef.current);
      return (
        (0, G.f)(f, { closeDelay: g }),
        (0, A.f)("div", e, {
          state: {
            open: c,
            side: s,
            align: o,
            instant: m,
            transitionStatus: p,
          },
          ref: [t, l.context.popupRef, l.useStateSetter("popupElement")],
          props: [h, (0, $.f)(p), n],
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
      E,
      "Positioner",
      0,
      H,
      "Root",
      0,
      function (e) {
        return u(!0)
          ? (0, t.jsx)(k, { ...e })
          : (0, t.jsx)(o.V, { children: (0, t.jsx)(k, { ...e }) });
      },
      "Trigger",
      0,
      O,
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
          d,
          c,
          u,
          m,
          p,
          h,
          f,
          g,
          x = (0, i.c)(35),
          {
            src: v,
            testId: y,
            className: w,
            dense: b,
            priority: j,
            hostHref: N,
            onHostClick: C,
          } = e,
          S = void 0 !== j && j,
          M = (0, a.useRef)(null),
          T = (0, a.useRef)(null),
          [k, R] = (0, a.useState)(!1),
          [_, E] = (0, a.useState)(null);
        (x[0] !== k
          ? ((r = () => {
              if (!k) return;
              let e = (e) => {
                let t = M.current;
                t && e.target instanceof Node && e.target.contains(t) && R(!1);
              };
              return (
                document.addEventListener("scroll", e, {
                  capture: !0,
                  passive: !0,
                }),
                () => document.removeEventListener("scroll", e, { capture: !0 })
              );
            }),
            (n = [k]),
            (x[0] = k),
            (x[1] = r),
            (x[2] = n))
          : ((r = x[1]), (n = x[2])),
          (0, a.useEffect)(r, n),
          x[3] === Symbol.for("react.memo_cache_sentinel")
            ? ((l = (e) => {
                let { movementX: t, movementY: i } = e.nativeEvent;
                (0 !== t || 0 !== i) &&
                  (T.current = e.currentTarget.getBoundingClientRect().top);
              }),
              (x[3] = l))
            : (l = x[3]));
        let P = l;
        x[4] === Symbol.for("react.memo_cache_sentinel")
          ? ((s = (e, t) => {
              let i = M.current;
              e &&
              "trigger-hover" === t.reason &&
              T.current !== i?.getBoundingClientRect().top
                ? t.cancel()
                : (R(e),
                  e &&
                    E(
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
            (x[4] = s))
          : (s = x[4]);
        let A = s;
        x[5] === Symbol.for("react.memo_cache_sentinel")
          ? ((o = () => {
              T.current = null;
            }),
            (x[5] = o))
          : (o = x[5]);
        let z = S ? "eager" : "lazy",
          U = S ? "high" : void 0,
          I = void 0 !== b && b ? "rounded-md" : "rounded-xl",
          F = !N && w;
        (x[6] !== I || x[7] !== F
          ? ((d = (0, er.c)(
              "max-h-80 w-auto max-w-full border border-border-secondary object-cover",
              I,
              F,
            )),
            (x[6] = I),
            (x[7] = F),
            (x[8] = d))
          : (d = x[8]),
          x[9] !== v || x[10] !== d || x[11] !== z || x[12] !== U || x[13] !== y
            ? ((c = (0, t.jsx)(Z.Trigger, {
                delay: 600,
                closeDelay: 100,
                onMouseEnter: o,
                onMouseMove: P,
                render: (0, t.jsx)("img", {
                  ref: M,
                  src: v,
                  alt: "",
                  loading: z,
                  fetchPriority: U,
                  "data-testid": y,
                  className: d,
                }),
              })),
              (x[9] = v),
              (x[10] = d),
              (x[11] = z),
              (x[12] = U),
              (x[13] = y),
              (x[14] = c))
            : (c = x[14]));
        let O = c;
        x[15] !== w || x[16] !== N || x[17] !== C || x[18] !== y || x[19] !== O
          ? ((u = N
              ? (0, t.jsx)(ei.default, {
                  href: N,
                  prefetch: !1,
                  onClick: C,
                  tabIndex: -1,
                  "aria-hidden": "true",
                  "data-testid": `${y}-host-link`,
                  className: (0, er.c)(
                    "relative z-[2] block w-fit max-w-full",
                    w,
                  ),
                  children: O,
                })
              : O),
            (x[15] = w),
            (x[16] = N),
            (x[17] = C),
            (x[18] = y),
            (x[19] = O),
            (x[20] = u))
          : (u = x[20]);
        let B = `${y}-preview-popup`;
        x[21] === Symbol.for("react.memo_cache_sentinel")
          ? ((m = (0, er.c)(
              "origin-(--transform-origin) p-1 outline-none duration-150 data-[open]:animate-in data-[open]:fade-in-0 data-[open]:zoom-in-95",
              ea.V,
            )),
            (x[21] = m))
          : (m = x[21]);
        let D = `${y}-preview`;
        return (
          x[22] !== _
            ? ((p = _
                ? {
                    "--zoom-w": `${_.width}px`,
                    "--zoom-ratio": `${_.width} / ${_.height}`,
                  }
                : void 0),
              (x[22] = _),
              (x[23] = p))
            : (p = x[23]),
          x[24] !== v || x[25] !== D || x[26] !== p
            ? ((h = (0, t.jsx)("img", {
                src: v,
                alt: "",
                decoding: "async",
                draggable: !1,
                "data-testid": D,
                className:
                  "block h-auto w-auto max-w-[calc(var(--available-width)-8px)] max-h-[calc(var(--available-height)-8px)] aspect-[var(--zoom-ratio)] w-[min(var(--zoom-w),calc(var(--available-width)_-_8px),calc((var(--available-height)_-_8px)_*_var(--zoom-ratio)))] rounded-md object-contain",
                style: p,
              })),
              (x[24] = v),
              (x[25] = D),
              (x[26] = p),
              (x[27] = h))
            : (h = x[27]),
          x[28] !== B || x[29] !== h
            ? ((f = (0, t.jsx)(X.Portal, {
                children: (0, t.jsx)(Y.Positioner, {
                  side: "right",
                  align: "start",
                  sideOffset: 12,
                  collisionPadding: 16,
                  className: "pointer-events-none z-[1000]",
                  children: (0, t.jsx)(ee.Popup, {
                    "data-testid": B,
                    className: m,
                    children: h,
                  }),
                }),
              })),
              (x[28] = B),
              (x[29] = h),
              (x[30] = f))
            : (f = x[30]),
          x[31] !== k || x[32] !== u || x[33] !== f
            ? ((g = (0, t.jsxs)(et.Root, {
                open: k,
                onOpenChange: A,
                children: [u, f],
              })),
              (x[31] = k),
              (x[32] = u),
              (x[33] = f),
              (x[34] = g))
            : (g = x[34]),
          g
        );
      },
    ],
    364889,
  );
};
