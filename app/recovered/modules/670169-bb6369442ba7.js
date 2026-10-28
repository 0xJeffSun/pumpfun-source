// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    r = e.i(352386),
    n = e.i(775453),
    o = e.i(144977),
    i = e.i(156207),
    a = e.i(556872),
    s = e.i(252960),
    l = e.i(42316),
    d = e.i(732486),
    u = "dismissableLayer.update",
    c = r.createContext({
      layers: new Set(),
      layersWithOutsidePointerEventsDisabled: new Set(),
      branches: new Set(),
    }),
    f = r.forwardRef((e, i) => {
      let {
          disableOutsidePointerEvents: f = !1,
          onEscapeKeyDown: v,
          onPointerDownOutside: h,
          onFocusOutside: y,
          onInteractOutside: g,
          onDismiss: b,
          ...x
        } = e,
        w = r.useContext(c),
        [E, C] = r.useState(null),
        j = E?.ownerDocument ?? globalThis?.document,
        [, O] = r.useState({}),
        P = (0, o.j)(i, (e) => C(e)),
        N = Array.from(w.layers),
        [R] = [...w.layersWithOutsidePointerEventsDisabled].slice(-1),
        A = N.indexOf(R),
        D = E ? N.indexOf(E) : -1,
        k = w.layersWithOutsidePointerEventsDisabled.size > 0,
        S = D >= A,
        T = (function (e, t = globalThis?.document) {
          let n = (0, s.f)(e),
            o = r.useRef(!1),
            i = r.useRef(() => {});
          return (
            r.useEffect(() => {
              let e = (e) => {
                  if (e.target && !o.current) {
                    let r = function () {
                        m("dismissableLayer.pointerDownOutside", n, o, {
                          discrete: !0,
                        });
                      },
                      o = { originalEvent: e };
                    "touch" === e.pointerType
                      ? (t.removeEventListener("click", i.current),
                        (i.current = r),
                        t.addEventListener("click", i.current, { once: !0 }))
                      : r();
                  } else t.removeEventListener("click", i.current);
                  o.current = !1;
                },
                r = window.setTimeout(() => {
                  t.addEventListener("pointerdown", e);
                }, 0);
              return () => {
                (window.clearTimeout(r),
                  t.removeEventListener("pointerdown", e),
                  t.removeEventListener("click", i.current));
              };
            }, [t, n]),
            { onPointerDownCapture: () => (o.current = !0) }
          );
        })((e) => {
          let t = e.target,
            r = [...w.branches].some((e) => e.contains(t));
          S && !r && (h?.(e), g?.(e), e.defaultPrevented || b?.());
        }, j),
        I = (function (e, t = globalThis?.document) {
          let n = (0, s.f)(e),
            o = r.useRef(!1);
          return (
            r.useEffect(() => {
              let e = (e) => {
                e.target &&
                  !o.current &&
                  m(
                    "dismissableLayer.focusOutside",
                    n,
                    { originalEvent: e },
                    { discrete: !1 },
                  );
              };
              return (
                t.addEventListener("focusin", e),
                () => t.removeEventListener("focusin", e)
              );
            }, [t, n]),
            {
              onFocusCapture: () => (o.current = !0),
              onBlurCapture: () => (o.current = !1),
            }
          );
        })((e) => {
          let t = e.target;
          ![...w.branches].some((e) => e.contains(t)) &&
            (y?.(e), g?.(e), e.defaultPrevented || b?.());
        }, j);
      return (
        (0, l.f)((e) => {
          D === w.layers.size - 1 &&
            (v?.(e), !e.defaultPrevented && b && (e.preventDefault(), b()));
        }, j),
        r.useEffect(() => {
          if (E)
            return (
              f &&
                (0 === w.layersWithOutsidePointerEventsDisabled.size &&
                  ((t = j.body.style.pointerEvents),
                  (j.body.style.pointerEvents = "none")),
                w.layersWithOutsidePointerEventsDisabled.add(E)),
              w.layers.add(E),
              p(),
              () => {
                f &&
                  1 === w.layersWithOutsidePointerEventsDisabled.size &&
                  (j.body.style.pointerEvents = t);
              }
            );
        }, [E, j, f, w]),
        r.useEffect(
          () => () => {
            E &&
              (w.layers.delete(E),
              w.layersWithOutsidePointerEventsDisabled.delete(E),
              p());
          },
          [E, w],
        ),
        r.useEffect(() => {
          let e = () => O({});
          return (
            document.addEventListener(u, e),
            () => document.removeEventListener(u, e)
          );
        }, []),
        (0, d.jsx)(a.V.div, {
          ...x,
          ref: P,
          style: {
            pointerEvents: k ? (S ? "auto" : "none") : void 0,
            ...e.style,
          },
          onFocusCapture: (0, n.f)(e.onFocusCapture, I.onFocusCapture),
          onBlurCapture: (0, n.f)(e.onBlurCapture, I.onBlurCapture),
          onPointerDownCapture: (0, n.f)(
            e.onPointerDownCapture,
            T.onPointerDownCapture,
          ),
        })
      );
    });
  function p() {
    let e = new CustomEvent(u);
    document.dispatchEvent(e);
  }
  function m(e, t, r, { discrete: n }) {
    let o = r.originalEvent.target,
      i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: r });
    (t && o.addEventListener(e, t, { once: !0 }),
      n ? (0, a.u)(o, i) : o.dispatchEvent(i));
  }
  ((f.displayName = "DismissableLayer"),
    (r.forwardRef((e, t) => {
      let n = r.useContext(c),
        i = r.useRef(null),
        s = (0, o.j)(t, i);
      return (
        r.useEffect(() => {
          let e = i.current;
          if (e)
            return (
              n.branches.add(e),
              () => {
                n.branches.delete(e);
              }
            );
        }, [n.branches]),
        (0, d.jsx)(a.V.div, { ...e, ref: s })
      );
    }).displayName = "DismissableLayerBranch"));
  var v = e.i(329352),
    h = e.i(89535),
    y = e.i(461194),
    g = e.i(579510),
    b = e.i(278928),
    x = e.i(182782),
    w = e.i(127864),
    E = e.i(853233),
    C = "Popper",
    [j, O] = (0, i.c)(C),
    [P, N] = j(C),
    R = (e) => {
      let { __scopePopper: t, children: n } = e,
        [o, i] = r.useState(null);
      return (0, d.jsx)(P, {
        scope: t,
        anchor: o,
        onAnchorChange: i,
        children: n,
      });
    };
  R.displayName = C;
  var A = "PopperAnchor",
    D = r.forwardRef((e, t) => {
      let { __scopePopper: n, virtualRef: i, ...s } = e,
        l = N(A, n),
        u = r.useRef(null),
        c = (0, o.j)(t, u);
      return (
        r.useEffect(() => {
          l.onAnchorChange(i?.current || u.current);
        }),
        i ? null : (0, d.jsx)(a.V.div, { ...s, ref: c })
      );
    });
  D.displayName = A;
  var k = "PopperContent",
    [S, T] = j(k),
    I = r.forwardRef((e, t) => {
      let {
          __scopePopper: n,
          side: i = "bottom",
          sideOffset: l = 0,
          align: u = "center",
          alignOffset: c = 0,
          arrowPadding: f = 0,
          avoidCollisions: p = !0,
          collisionBoundary: m = [],
          collisionPadding: v = 0,
          sticky: h = "partial",
          hideWhenDetached: y = !1,
          updatePositionStrategy: x = "optimized",
          onPlaced: C,
          ...j
        } = e,
        O = N(k, n),
        [P, R] = r.useState(null),
        A = (0, o.j)(t, (e) => R(e)),
        [D, T] = r.useState(null),
        I = (0, E.f)(D),
        F = I?.width ?? 0,
        L = I?.height ?? 0,
        M =
          "number" == typeof v
            ? v
            : { top: 0, right: 0, bottom: 0, left: 0, ...v },
        z = Array.isArray(m) ? m : [m],
        $ = z.length > 0,
        U = { padding: M, boundary: z.filter(_), altBoundary: $ },
        {
          refs: B,
          floatingStyles: H,
          placement: K,
          isPositioned: X,
          middlewareData: Y,
        } = (0, g.E)({
          strategy: "fixed",
          placement: i + ("center" !== u ? "-" + u : ""),
          whileElementsMounted: (...e) =>
            (0, b.n)(...e, { animationFrame: "always" === x }),
          elements: { reference: O.anchor },
          middleware: [
            (0, g.T)({ mainAxis: l + L, alignmentAxis: c }),
            p &&
              (0, g.e)({
                mainAxis: !0,
                crossAxis: !1,
                limiter: "partial" === h ? (0, g.n)() : void 0,
                ...U,
              }),
            p && (0, g.x)({ ...U }),
            (0, g.o)({
              ...U,
              apply: ({
                elements: e,
                rects: t,
                availableWidth: r,
                availableHeight: n,
              }) => {
                let { width: o, height: i } = t.reference,
                  a = e.floating.style;
                (a.setProperty("--radix-popper-available-width", `${r}px`),
                  a.setProperty("--radix-popper-available-height", `${n}px`),
                  a.setProperty("--radix-popper-anchor-width", `${o}px`),
                  a.setProperty("--radix-popper-anchor-height", `${i}px`));
              },
            }),
            D && (0, g.P)({ element: D, padding: f }),
            W({ arrowWidth: F, arrowHeight: L }),
            y && (0, g.c)({ strategy: "referenceHidden", ...U }),
          ],
        }),
        [q, Z] = V(K),
        G = (0, s.f)(C);
      (0, w.f)(() => {
        X && G?.();
      }, [X, G]);
      let J = Y.arrow?.x,
        Q = Y.arrow?.y,
        ee = Y.arrow?.centerOffset !== 0,
        [et, er] = r.useState();
      return (
        (0, w.f)(() => {
          P && er(window.getComputedStyle(P).zIndex);
        }, [P]),
        (0, d.jsx)("div", {
          ref: B.setFloating,
          "data-radix-popper-content-wrapper": "",
          style: {
            ...H,
            transform: X ? H.transform : "translate(0, -200%)",
            minWidth: "max-content",
            zIndex: et,
            "--radix-popper-transform-origin": [
              Y.transformOrigin?.x,
              Y.transformOrigin?.y,
            ].join(" "),
            ...(Y.hide?.referenceHidden && {
              visibility: "hidden",
              pointerEvents: "none",
            }),
          },
          dir: e.dir,
          children: (0, d.jsx)(S, {
            scope: n,
            placedSide: q,
            onArrowChange: T,
            arrowX: J,
            arrowY: Q,
            shouldHideArrow: ee,
            children: (0, d.jsx)(a.V.div, {
              "data-side": q,
              "data-align": Z,
              ...j,
              ref: A,
              style: { ...j.style, animation: X ? void 0 : "none" },
            }),
          }),
        })
      );
    });
  I.displayName = k;
  var F = "PopperArrow",
    L = { top: "bottom", right: "left", bottom: "top", left: "right" },
    M = r.forwardRef(function (e, t) {
      let { __scopePopper: r, ...n } = e,
        o = T(F, r),
        i = L[o.placedSide];
      return (0, d.jsx)("span", {
        ref: o.onArrowChange,
        style: {
          position: "absolute",
          left: o.arrowX,
          top: o.arrowY,
          [i]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0",
          }[o.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)",
          }[o.placedSide],
          visibility: o.shouldHideArrow ? "hidden" : void 0,
        },
        children: (0, d.jsx)(x.f, {
          ...n,
          ref: t,
          style: { ...n.style, display: "block" },
        }),
      });
    });
  function _(e) {
    return null !== e;
  }
  M.displayName = F;
  var W = (e) => ({
    name: "transformOrigin",
    options: e,
    fn(t) {
      let { placement: r, rects: n, middlewareData: o } = t,
        i = o.arrow?.centerOffset !== 0,
        a = i ? 0 : e.arrowWidth,
        s = i ? 0 : e.arrowHeight,
        [l, d] = V(r),
        u = { start: "0%", center: "50%", end: "100%" }[d],
        c = (o.arrow?.x ?? 0) + a / 2,
        f = (o.arrow?.y ?? 0) + s / 2,
        p = "",
        m = "";
      return (
        "bottom" === l
          ? ((p = i ? u : `${c}px`), (m = `${-s}px`))
          : "top" === l
            ? ((p = i ? u : `${c}px`), (m = `${n.floating.height + s}px`))
            : "right" === l
              ? ((p = `${-s}px`), (m = i ? u : `${f}px`))
              : "left" === l &&
                ((p = `${n.floating.width + s}px`), (m = i ? u : `${f}px`)),
        { data: { x: p, y: m } }
      );
    },
  });
  function V(e) {
    let [t, r = "center"] = e.split("-");
    return [t, r];
  }
  var z = e.i(614952),
    $ = e.i(406657),
    U = e.i(93074),
    B = e.i(534643),
    H = e.i(73772),
    K = e.i(621790),
    X = "Popover",
    [Y, q] = (0, i.c)(X, [O]),
    Z = O(),
    [G, J] = Y(X),
    Q = (e) => {
      let {
          __scopePopover: t,
          children: n,
          open: o,
          defaultOpen: i,
          onOpenChange: a,
          modal: s = !1,
        } = e,
        l = Z(t),
        u = r.useRef(null),
        [c, f] = r.useState(!1),
        [p, m] = (0, B.f)({
          prop: o,
          defaultProp: i ?? !1,
          onChange: a,
          caller: X,
        });
      return (0, d.jsx)(R, {
        ...l,
        children: (0, d.jsx)(G, {
          scope: t,
          contentId: (0, y.f)(),
          triggerRef: u,
          open: p,
          onOpenChange: m,
          onOpenToggle: r.useCallback(() => m((e) => !e), [m]),
          hasCustomAnchor: c,
          onCustomAnchorAdd: r.useCallback(() => f(!0), []),
          onCustomAnchorRemove: r.useCallback(() => f(!1), []),
          modal: s,
          children: n,
        }),
      });
    };
  Q.displayName = X;
  var ee = "PopoverAnchor",
    et = r.forwardRef((e, t) => {
      let { __scopePopover: n, ...o } = e,
        i = J(ee, n),
        a = Z(n),
        { onCustomAnchorAdd: s, onCustomAnchorRemove: l } = i;
      return (
        r.useEffect(() => (s(), () => l()), [s, l]),
        (0, d.jsx)(D, { ...a, ...o, ref: t })
      );
    });
  et.displayName = ee;
  var er = "PopoverTrigger",
    en = r.forwardRef((e, t) => {
      let { __scopePopover: r, ...i } = e,
        s = J(er, r),
        l = Z(r),
        u = (0, o.j)(t, s.triggerRef),
        c = (0, d.jsx)(a.V.button, {
          type: "button",
          "aria-haspopup": "dialog",
          "aria-expanded": s.open,
          "aria-controls": s.contentId,
          "data-state": eh(s.open),
          ...i,
          ref: u,
          onClick: (0, n.f)(e.onClick, s.onOpenToggle),
        });
      return s.hasCustomAnchor
        ? c
        : (0, d.jsx)(D, { asChild: !0, ...l, children: c });
    });
  en.displayName = er;
  var eo = "PopoverPortal",
    [ei, ea] = Y(eo, { forceMount: void 0 }),
    es = (e) => {
      let { __scopePopover: t, forceMount: r, children: n, container: o } = e,
        i = J(eo, t);
      return (0, d.jsx)(ei, {
        scope: t,
        forceMount: r,
        children: (0, d.jsx)($.f, {
          present: r || i.open,
          children: (0, d.jsx)(z.f, { asChild: !0, container: o, children: n }),
        }),
      });
    };
  es.displayName = eo;
  var el = "PopoverContent",
    ed = r.forwardRef((e, t) => {
      let r = ea(el, e.__scopePopover),
        { forceMount: n = r.forceMount, ...o } = e,
        i = J(el, e.__scopePopover);
      return (0, d.jsx)($.f, {
        present: n || i.open,
        children: i.modal
          ? (0, d.jsx)(ec, { ...o, ref: t })
          : (0, d.jsx)(ef, { ...o, ref: t }),
      });
    });
  ed.displayName = el;
  var eu = (0, U.B)("PopoverContent.RemoveScroll"),
    ec = r.forwardRef((e, t) => {
      let i = J(el, e.__scopePopover),
        a = r.useRef(null),
        s = (0, o.j)(t, a),
        l = r.useRef(!1);
      return (
        r.useEffect(() => {
          let e = a.current;
          if (e) return (0, H.f)(e);
        }, []),
        (0, d.jsx)(K.f, {
          as: eu,
          allowPinchZoom: !0,
          children: (0, d.jsx)(ep, {
            ...e,
            ref: s,
            trapFocus: i.open,
            disableOutsidePointerEvents: !0,
            onCloseAutoFocus: (0, n.f)(e.onCloseAutoFocus, (e) => {
              (e.preventDefault(), l.current || i.triggerRef.current?.focus());
            }),
            onPointerDownOutside: (0, n.f)(
              e.onPointerDownOutside,
              (e) => {
                let t = e.detail.originalEvent,
                  r = 0 === t.button && !0 === t.ctrlKey;
                l.current = 2 === t.button || r;
              },
              { checkForDefaultPrevented: !1 },
            ),
            onFocusOutside: (0, n.f)(
              e.onFocusOutside,
              (e) => e.preventDefault(),
              { checkForDefaultPrevented: !1 },
            ),
          }),
        })
      );
    }),
    ef = r.forwardRef((e, t) => {
      let n = J(el, e.__scopePopover),
        o = r.useRef(!1),
        i = r.useRef(!1);
      return (0, d.jsx)(ep, {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (t) => {
          (e.onCloseAutoFocus?.(t),
            t.defaultPrevented ||
              (o.current || n.triggerRef.current?.focus(), t.preventDefault()),
            (o.current = !1),
            (i.current = !1));
        },
        onInteractOutside: (t) => {
          (e.onInteractOutside?.(t),
            t.defaultPrevented ||
              ((o.current = !0),
              "pointerdown" === t.detail.originalEvent.type &&
                (i.current = !0)));
          let r = t.target;
          (n.triggerRef.current?.contains(r) && t.preventDefault(),
            "focusin" === t.detail.originalEvent.type &&
              i.current &&
              t.preventDefault());
        },
      });
    }),
    ep = r.forwardRef((e, t) => {
      let {
          __scopePopover: r,
          trapFocus: n,
          onOpenAutoFocus: o,
          onCloseAutoFocus: i,
          disableOutsidePointerEvents: a,
          onEscapeKeyDown: s,
          onPointerDownOutside: l,
          onFocusOutside: u,
          onInteractOutside: c,
          ...p
        } = e,
        m = J(el, r),
        y = Z(r);
      return (
        (0, v.f)(),
        (0, d.jsx)(h.f, {
          asChild: !0,
          loop: !0,
          trapped: n,
          onMountAutoFocus: o,
          onUnmountAutoFocus: i,
          children: (0, d.jsx)(f, {
            asChild: !0,
            disableOutsidePointerEvents: a,
            onInteractOutside: c,
            onEscapeKeyDown: s,
            onPointerDownOutside: l,
            onFocusOutside: u,
            onDismiss: () => m.onOpenChange(!1),
            children: (0, d.jsx)(I, {
              "data-state": eh(m.open),
              role: "dialog",
              id: m.contentId,
              ...y,
              ...p,
              ref: t,
              style: {
                ...p.style,
                "--radix-popover-content-transform-origin":
                  "var(--radix-popper-transform-origin)",
                "--radix-popover-content-available-width":
                  "var(--radix-popper-available-width)",
                "--radix-popover-content-available-height":
                  "var(--radix-popper-available-height)",
                "--radix-popover-trigger-width":
                  "var(--radix-popper-anchor-width)",
                "--radix-popover-trigger-height":
                  "var(--radix-popper-anchor-height)",
              },
            }),
          }),
        })
      );
    }),
    em = "PopoverClose";
  r.forwardRef((e, t) => {
    let { __scopePopover: r, ...o } = e,
      i = J(em, r);
    return (0, d.jsx)(a.V.button, {
      type: "button",
      ...o,
      ref: t,
      onClick: (0, n.f)(e.onClick, () => i.onOpenChange(!1)),
    });
  }).displayName = em;
  var ev = r.forwardRef((e, t) => {
    let { __scopePopover: r, ...n } = e,
      o = Z(r);
    return (0, d.jsx)(M, { ...o, ...n, ref: t });
  });
  function eh(e) {
    return e ? "open" : "closed";
  }
  ((ev.displayName = "PopoverArrow"),
    e.s(
      [
        "g",
        0,
        et,
        "j",
        0,
        ev,
        "c",
        0,
        ed,
        "r",
        0,
        et,
        "z",
        0,
        es,
        "F",
        0,
        Q,
        "d",
        0,
        en,
      ],
      670169,
    ));
};
