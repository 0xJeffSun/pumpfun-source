// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(648105),
    r = e.i(10180),
    o = e.i(385676),
    i = e.i(908116),
    a = e.i(271983),
    s = e.i(656522),
    l = e.i(53249),
    c = e.i(702232);
  let u = t.createContext(void 0);
  function p(e) {
    let n = t.useContext(u);
    if (void 0 === n && !e) throw Error((0, c.f)(47));
    return n;
  }
  var d = e.i(231332),
    f = e.i(726062),
    g = e.i(209296),
    m = e.i(732612),
    b = e.i(303232),
    h = e.i(268932),
    v = e.i(875355),
    x = e.i(854274),
    y = e.i(913281),
    _ = e.i(251669),
    k = e.i(590547),
    z = e.i(340607),
    S = e.i(300310);
  let C = {
    ...k.j,
    disabled: (0, g.f)((e) => e.disabled),
    instantType: (0, g.f)((e) => e.instantType),
    openMethod: (0, g.f)((e) => e.openMethod),
    openChangeReason: (0, g.f)((e) => e.openChangeReason),
    modal: (0, g.f)((e) => e.modal),
    stickIfOpen: (0, g.f)((e) => e.stickIfOpen),
    titleElementId: (0, g.f)((e) => e.titleElementId),
    descriptionElementId: (0, g.f)((e) => e.descriptionElementId),
    openOnHover: (0, g.f)((e) => e.openOnHover),
    closeDelay: (0, g.f)((e) => e.closeDelay),
    hasViewport: (0, g.f)((e) => e.hasViewport),
  };
  class R extends f.f {
    constructor(e) {
      let n = {
        ...{
          ...(0, k.i)(),
          disabled: !1,
          modal: !1,
          instantType: void 0,
          openMethod: null,
          openChangeReason: null,
          titleElementId: void 0,
          descriptionElementId: void 0,
          stickIfOpen: !0,
          nested: !1,
          openOnHover: !1,
          closeDelay: 0,
          hasViewport: !1,
        },
        ...e,
      };
      (n.open && e?.mounted === void 0 && (n.mounted = !0),
        super(
          n,
          {
            popupRef: t.createRef(),
            backdropRef: t.createRef(),
            internalBackdropRef: t.createRef(),
            onOpenChange: void 0,
            onOpenChangeComplete: void 0,
            triggerFocusTargetRef: t.createRef(),
            beforeContentFocusGuardRef: t.createRef(),
            stickIfOpenTimeout: new m.U(),
            triggerElements: new z.f(),
          },
          C,
        ));
    }
    setOpen = (e, t) => {
      let n = t.reason === v.f.triggerHover,
        r = t.reason === x.f.triggerPress && 0 === t.event.detail,
        o = !e && (t.reason === y.f.escapeKey || null == t.reason);
      if (
        ((t.preventUnmountOnClose = () => {
          this.set("preventUnmountingOnClose", !0);
        }),
        this.context.onOpenChange?.(e, t),
        t.isCanceled)
      )
        return;
      let i = {
          open: e,
          nativeEvent: t.event,
          reason: t.reason,
          nested: this.state.nested,
          triggerElement: t.trigger,
        },
        a = this.state.floatingRootContext.context.events;
      a?.emit("openchange", i);
      let s = () => {
        let n = { open: e, openChangeReason: t.reason },
          r = t.trigger?.id ?? null;
        ((r || e) &&
          ((n.activeTriggerId = r),
          (n.activeTriggerElement = t.trigger ?? null)),
          this.update(n));
      };
      (n
        ? (this.set("stickIfOpen", !0),
          this.context.stickIfOpenTimeout.start(S.K, () => {
            this.set("stickIfOpen", !1);
          }),
          d.flushSync(s))
        : s(),
        r || o
          ? this.set("instantType", r ? "click" : "dismiss")
          : t.reason === _.f.focusOut
            ? this.set("instantType", "focus")
            : this.set("instantType", void 0));
    };
    static useStore(e, t) {
      let n = (0, b.f)(() => new R(t)).current,
        r = e ?? n;
      return ((0, h.f)(n.disposeEffect), r);
    }
    disposeEffect = () => this.context.stickIfOpenTimeout.disposeEffect();
  }
  var $ = e.i(523686),
    O = e.i(814421),
    j = e.i(290915),
    I = e.i(87893),
    P = e.i(732486);
  function w({ props: e }) {
    let {
        children: c,
        open: p,
        defaultOpen: d = !1,
        onOpenChange: f,
        onOpenChangeComplete: g,
        modal: m = !1,
        handle: b,
        triggerId: h,
        defaultTriggerId: x = null,
      } = e,
      y = R.useStore(b?.store, {
        modal: m,
        open: d,
        openProp: p,
        activeTriggerId: x,
        triggerIdProp: h,
      });
    ((0, r.f)(() => {
      void 0 === p &&
        !1 === y.state.open &&
        !0 === d &&
        y.update({ open: !0, activeTriggerId: x });
    }),
      y.useControlledProp("openProp", p),
      y.useControlledProp("triggerIdProp", h));
    let _ = y.useState("open"),
      k = y.useState("positionerElement"),
      z = y.useState("payload"),
      S = y.useState("openChangeReason");
    (y.useContextCallback("onOpenChange", f),
      y.useContextCallback("onOpenChangeComplete", g));
    let { openMethod: C, triggerProps: T } = (0, I.f)(_);
    (0, j.z)(y);
    let { forceUnmount: E } = (0, j.L)(_, y, () => {
      y.update({ stickIfOpen: !0, openChangeReason: null });
    });
    ((0, n.f)(_ && !0 === m && S !== v.f.triggerHover && "touch" !== C, k),
      t.useEffect(() => {
        _ || y.context.stickIfOpenTimeout.clear();
      }, [y, _]));
    let F = t.useCallback(
        (e) => {
          let t = (0, $.f)(e);
          return (
            (t.preventUnmountOnClose = () => {
              y.set("preventUnmountingOnClose", !0);
            }),
            t
          );
        },
        [y],
      ),
      M = t.useCallback(() => {
        y.setOpen(!1, F(O.f.imperativeAction));
      }, [y, F]);
    t.useImperativeHandle(e.actionsRef, () => ({ unmount: E, close: M }), [
      E,
      M,
    ]);
    let B = (0, l.f)({ popupStore: y, onOpenChange: y.setOpen }),
      A = (0, o.f)(B, {
        outsidePressEvent: {
          mouse: "trap-focus" === m ? "sloppy" : "intentional",
          touch: "sloppy",
        },
      }),
      U = (0, a.f)(B),
      {
        getReferenceProps: V,
        getFloatingProps: H,
        getTriggerProps: N,
      } = (0, i.f)([A, U]),
      D = t.useMemo(() => V(T), [V, T]),
      G = t.useMemo(() => N(T), [N, T]),
      L = t.useMemo(() => H(), [H]);
    y.useSyncedValues({
      modal: m,
      openMethod: C,
      activeTriggerProps: D,
      inactiveTriggerProps: G,
      popupProps: L,
      floatingRootContext: B,
      nested: null != (0, s.G)(),
    });
    let W = t.useMemo(() => ({ store: y }), [y]);
    return (0, P.jsx)(u.Provider, {
      value: W,
      children: "function" == typeof c ? c({ payload: z }) : c,
    });
  }
  var T = e.i(278051),
    E = e.i(681402),
    F = e.i(833551),
    M = e.i(648585),
    B = e.i(994907),
    A = e.i(385705),
    U = e.i(175843),
    V = e.i(739774),
    H = e.i(62819),
    N = e.i(430186),
    D = e.i(50408);
  let G = t.forwardRef(function (e, n) {
    let {
        render: r,
        className: o,
        disabled: a = !1,
        nativeButton: s = !0,
        handle: l,
        payload: u,
        openOnHover: f = !1,
        delay: g = 300,
        closeDelay: m = 0,
        id: b,
        ...h
      } = e,
      v = p(!0),
      y = l?.store ?? v?.store;
    if (!y) throw Error((0, c.f)(74));
    let k = (0, V.f)(b),
      z = y.useState("isTriggerActive", k),
      C = y.useState("floatingRootContext"),
      R = y.useState("isOpenedByTrigger", k),
      O = t.useRef(null),
      { registerTrigger: I, isMountedByThisTrigger: w } = (0, j.F)(k, O, y, {
        payload: u,
        disabled: a,
        openOnHover: f,
        closeDelay: m,
      }),
      G = y.useState("openChangeReason"),
      L = y.useState("stickIfOpen"),
      W = y.useState("openMethod"),
      K = (0, U.f)(C, {
        enabled: null != C && f && ("touch" !== W || G !== x.f.triggerPress),
        mouseOnly: !0,
        move: !1,
        handleClose: (0, B.f)(),
        restMs: g,
        delay: { close: m },
        triggerElementRef: O,
        isActiveTrigger: z,
      }),
      Y = (0, A.f)(C, { enabled: null != C, stickIfOpen: L }),
      Z = (0, i.f)([Y]),
      J = y.useState("triggerProps", w),
      { getButtonProps: q, buttonRef: Q } = (0, E.f)({
        disabled: a,
        native: s,
      }),
      X = t.useMemo(
        () => ({
          open: (e) =>
            e && G === x.f.triggerPress ? F.f.open(e) : F.J.open(e),
        }),
        [G],
      ),
      ee = (0, M.f)("button", e, {
        state: { disabled: a, open: R },
        ref: [Q, n, I, O],
        props: [Z.getReferenceProps(), K, J, { [S.j]: "", id: k }, h, q],
        stateAttributesMapping: X,
      }),
      et = t.useRef(null),
      en = (0, T.f)((e) => {
        d.flushSync(() => {
          y.setOpen(!1, (0, $.f)(_.f.focusOut, e.nativeEvent, e.currentTarget));
        });
        let t = (0, D.E)(et.current);
        t?.focus();
      }),
      er = (0, T.f)((e) => {
        let t = y.select("positionerElement");
        if (t && (0, D.A)(e, t))
          y.context.beforeContentFocusGuardRef.current?.focus();
        else {
          d.flushSync(() => {
            y.setOpen(
              !1,
              (0, $.f)(_.f.focusOut, e.nativeEvent, e.currentTarget),
            );
          });
          let n = (0, D.W)(
            y.context.triggerFocusTargetRef.current || O.current,
          );
          for (; null !== n && (0, N.I)(t, n); ) {
            let e = n;
            if ((n = (0, D.O)(n)) === e) break;
          }
          n?.focus();
        }
      });
    return z
      ? (0, P.jsxs)(t.Fragment, {
          children: [
            (0, P.jsx)(H.f, { ref: et, onFocus: en }),
            (0, P.jsx)(t.Fragment, { children: ee }, k),
            (0, P.jsx)(H.f, {
              ref: y.context.triggerFocusTargetRef,
              onFocus: er,
            }),
          ],
        })
      : (0, P.jsx)(t.Fragment, { children: ee }, k);
  });
  var L = e.i(27369);
  let W = t.createContext(void 0),
    K = t.forwardRef(function (e, t) {
      let { keepMounted: n = !1, ...r } = e,
        { store: o } = p();
      return o.useState("mounted") || n
        ? (0, P.jsx)(W.Provider, {
            value: n,
            children: (0, P.jsx)(L.r, { ref: t, ...r }),
          })
        : null;
    });
  var Y = e.i(363855),
    Z = e.i(565693);
  let J = t.createContext(void 0);
  function q() {
    let e = t.useContext(J);
    if (!e) throw Error((0, c.f)(46));
    return e;
  }
  var Q = e.i(257311),
    X = e.i(458649),
    ee = e.i(67467),
    et = e.i(996971),
    en = e.i(813258);
  let er = t.forwardRef(function (e, n) {
    let {
        render: r,
        className: o,
        anchor: i,
        positionMethod: a = "absolute",
        side: l = "bottom",
        align: u = "center",
        sideOffset: d = 0,
        alignOffset: f = 0,
        collisionBoundary: g = "clipping-ancestors",
        collisionPadding: m = 5,
        arrowPadding: b = 5,
        sticky: h = !1,
        disableAnchorTracking: x = !1,
        collisionAvoidance: y = S.n,
        ..._
      } = e,
      { store: k } = p(),
      z = (function () {
        let e = t.useContext(W);
        if (void 0 === e) throw Error((0, c.f)(45));
        return e;
      })(),
      C = (0, s.T)(),
      R = k.useState("floatingRootContext"),
      $ = k.useState("mounted"),
      O = k.useState("open"),
      j = k.useState("openChangeReason"),
      I = k.useState("activeTriggerElement"),
      w = k.useState("modal"),
      T = k.useState("positionerElement"),
      E = k.useState("instantType"),
      B = k.useState("transitionStatus"),
      A = k.useState("hasViewport"),
      U = t.useRef(null),
      V = (0, ee.f)(T, !1, !1),
      H = (0, Q.f)({
        anchor: i,
        floatingRootContext: R,
        positionMethod: a,
        mounted: $,
        side: l,
        sideOffset: d,
        align: u,
        alignOffset: f,
        arrowPadding: b,
        collisionBoundary: g,
        collisionPadding: m,
        sticky: h,
        disableAnchorTracking: x,
        keepMounted: z,
        nodeId: C,
        collisionAvoidance: y,
        adaptiveOrigin: A ? et.e : void 0,
      }),
      N = t.useMemo(() => {
        let e = {};
        return (
          O || (e.pointerEvents = "none"),
          {
            role: "presentation",
            hidden: !$,
            style: { ...H.positionerStyles, ...e },
          }
        );
      }, [O, $, H.positionerStyles]),
      D = t.useMemo(() => ({ props: N, ...H }), [N, H]),
      G = R.useState("domReferenceElement");
    (0, Z.f)(() => {
      let e = U.current;
      if ((G && (U.current = G), e && G && G !== e)) {
        k.set("instantType", void 0);
        let e = new AbortController();
        return (
          V(() => {
            k.set("instantType", "trigger-change");
          }, e.signal),
          () => {
            e.abort();
          }
        );
      }
    }, [G, V, k]);
    let L = {
        open: O,
        side: D.side,
        align: D.align,
        anchorHidden: D.anchorHidden,
        instant: E,
      },
      K = t.useCallback(
        (e) => {
          k.set("positionerElement", e);
        },
        [k],
      ),
      q = (0, M.f)("div", e, {
        state: L,
        props: [D.props, (0, en.f)(B), _],
        ref: [n, K],
        stateAttributesMapping: F.E,
      });
    return (0, P.jsxs)(J.Provider, {
      value: D,
      children: [
        $ &&
          !0 === w &&
          j !== v.f.triggerHover &&
          (0, P.jsx)(X.f, {
            ref: k.context.internalBackdropRef,
            inert: (0, Y.f)(!O),
            cutout: I,
          }),
        (0, P.jsx)(s.s, { id: C, children: q }),
      ],
    });
  });
  var eo = e.i(92615),
    ei = e.i(901348),
    ea = e.i(195086),
    es = e.i(810954),
    el = e.i(24542),
    ec = e.i(845891),
    eu = e.i(307934);
  let ep = t.createContext(void 0);
  function ed(e) {
    let { value: t, children: n } = e;
    return (0, P.jsx)(ep.Provider, { value: t, children: n });
  }
  let ef = { ...F.E, ...es.T },
    eg = t.forwardRef(function (e, n) {
      let { className: r, render: o, initialFocus: i, finalFocus: a, ...s } = e,
        { store: l } = p(),
        c = q(),
        u = null != (0, eu.f)(!0),
        { context: d, hasClosePart: f } = (function () {
          let [e, n] = t.useState(0),
            r = (0, T.f)(
              () => (
                n((e) => e + 1),
                () => {
                  n((e) => Math.max(0, e - 1));
                }
              ),
            );
          return {
            context: t.useMemo(() => ({ register: r }), [r]),
            hasClosePart: e > 0,
          };
        })(),
        g = l.useState("open"),
        m = l.useState("openMethod"),
        b = l.useState("instantType"),
        h = l.useState("transitionStatus"),
        x = l.useState("popupProps"),
        y = l.useState("titleElementId"),
        _ = l.useState("descriptionElementId"),
        k = l.useState("modal"),
        z = l.useState("mounted"),
        S = l.useState("openChangeReason"),
        C = l.useState("activeTriggerElement"),
        R = l.useState("floatingRootContext");
      (0, el.f)({
        open: g,
        ref: l.context.popupRef,
        onComplete() {
          g && l.context.onOpenChangeComplete?.(!0);
        },
      });
      let $ = l.useState("disabled"),
        O = l.useState("openOnHover"),
        j = l.useState("closeDelay");
      (0, ea.f)(R, { enabled: O && !$, closeDelay: j });
      let I =
          void 0 === i
            ? function (e) {
                return "touch" !== e || l.context.popupRef.current;
              }
            : i,
        w = {
          open: g,
          side: c.side,
          align: c.align,
          instant: b,
          transitionStatus: h,
        },
        E = t.useCallback(
          (e) => {
            l.set("popupElement", e);
          },
          [l],
        ),
        F = (0, M.f)("div", e, {
          state: w,
          ref: [n, l.context.popupRef, E],
          props: [
            x,
            {
              "aria-labelledby": y,
              "aria-describedby": _,
              onKeyDown(e) {
                u && ec.J.has(e.key) && e.stopPropagation();
              },
            },
            (0, en.f)(h),
            s,
          ],
          stateAttributesMapping: ef,
        });
      return (0, P.jsx)(ei.f, {
        context: R,
        openInteractionType: m,
        modal: !1 !== k && f,
        disabled: !z || S === v.f.triggerHover,
        initialFocus: I,
        returnFocus: a,
        restoreFocus: "popup",
        previousFocusableElement: (0, eo.E)(C) ? C : void 0,
        nextFocusableElement: l.context.triggerFocusTargetRef,
        beforeContentFocusGuardRef: l.context.beforeContentFocusGuardRef,
        children: (0, P.jsx)(ed, { value: d, children: F }),
      });
    }),
    em = t.forwardRef(function (e, t) {
      let { className: n, render: r, ...o } = e,
        { store: i } = p(),
        a = i.useState("open"),
        {
          arrowRef: s,
          side: l,
          align: c,
          arrowUncentered: u,
          arrowStyles: d,
        } = q();
      return (0, M.f)("div", e, {
        state: { open: a, side: l, align: c, uncentered: u },
        ref: [t, s],
        props: [{ style: d, "aria-hidden": !0 }, o],
        stateAttributesMapping: F.E,
      });
    });
  var eb = e.i(594646);
  let eh = t.forwardRef(function (e, n) {
    let r,
      {
        render: o,
        className: i,
        disabled: a = !1,
        nativeButton: s = !0,
        ...l
      } = e,
      { buttonRef: c, getButtonProps: u } = (0, E.f)({
        disabled: a,
        focusableWhenDisabled: !1,
        native: s,
      }),
      { store: d } = p();
    return (
      (r = t.useContext(ep)),
      (0, Z.f)(() => r?.register(), [r]),
      (0, M.f)("button", e, {
        ref: [n, c],
        props: [
          {
            onClick(e) {
              d.setOpen(
                !1,
                (0, $.f)(eb.f.closePress, e.nativeEvent, e.currentTarget),
              );
            },
          },
          l,
          u,
        ],
      })
    );
  });
  e.s(
    [
      "Arrow",
      0,
      em,
      "Close",
      0,
      eh,
      "Popup",
      0,
      eg,
      "Portal",
      0,
      K,
      "Positioner",
      0,
      er,
      "Root",
      0,
      function (e) {
        return p(!0)
          ? (0, P.jsx)(w, { props: e })
          : (0, P.jsx)(s.V, { children: (0, P.jsx)(w, { props: e }) });
      },
      "Trigger",
      0,
      G,
    ],
    164674,
  );
};
