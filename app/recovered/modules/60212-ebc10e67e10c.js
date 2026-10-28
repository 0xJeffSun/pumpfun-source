// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    n = e.i(352386),
    r = e.i(291967),
    o = e.i(556872),
    i = e.i(144977),
    a = e.i(252960),
    s = e.i(42316),
    l = e.i(732486),
    u = "dismissableLayer.update",
    d = n.createContext({
      layers: new Set(),
      layersWithOutsidePointerEventsDisabled: new Set(),
      branches: new Set(),
    }),
    c = n.forwardRef((e, c) => {
      let {
          disableOutsidePointerEvents: m = !1,
          onEscapeKeyDown: v,
          onPointerDownOutside: y,
          onFocusOutside: g,
          onInteractOutside: b,
          onDismiss: h,
          ...x
        } = e,
        E = n.useContext(d),
        [w, N] = n.useState(null),
        j = w?.ownerDocument ?? globalThis?.document,
        [, C] = n.useState({}),
        D = (0, i.j)(c, (e) => N(e)),
        R = Array.from(E.layers),
        [O] = [...E.layersWithOutsidePointerEventsDisabled].slice(-1),
        P = R.indexOf(O),
        T = w ? R.indexOf(w) : -1,
        I = E.layersWithOutsidePointerEventsDisabled.size > 0,
        S = T >= P,
        A = (function (e, t = globalThis?.document) {
          let r = (0, a.f)(e),
            o = n.useRef(!1),
            i = n.useRef(() => {});
          return (
            n.useEffect(() => {
              let e = (e) => {
                  if (e.target && !o.current) {
                    let n = function () {
                        p("dismissableLayer.pointerDownOutside", r, o, {
                          discrete: !0,
                        });
                      },
                      o = { originalEvent: e };
                    "touch" === e.pointerType
                      ? (t.removeEventListener("click", i.current),
                        (i.current = n),
                        t.addEventListener("click", i.current, { once: !0 }))
                      : n();
                  } else t.removeEventListener("click", i.current);
                  o.current = !1;
                },
                n = window.setTimeout(() => {
                  t.addEventListener("pointerdown", e);
                }, 0);
              return () => {
                (window.clearTimeout(n),
                  t.removeEventListener("pointerdown", e),
                  t.removeEventListener("click", i.current));
              };
            }, [t, r]),
            { onPointerDownCapture: () => (o.current = !0) }
          );
        })((e) => {
          let t = e.target,
            n = [...E.branches].some((e) => e.contains(t));
          S && !n && (y?.(e), b?.(e), e.defaultPrevented || h?.());
        }, j),
        _ = (function (e, t = globalThis?.document) {
          let r = (0, a.f)(e),
            o = n.useRef(!1);
          return (
            n.useEffect(() => {
              let e = (e) => {
                e.target &&
                  !o.current &&
                  p(
                    "dismissableLayer.focusOutside",
                    r,
                    { originalEvent: e },
                    { discrete: !1 },
                  );
              };
              return (
                t.addEventListener("focusin", e),
                () => t.removeEventListener("focusin", e)
              );
            }, [t, r]),
            {
              onFocusCapture: () => (o.current = !0),
              onBlurCapture: () => (o.current = !1),
            }
          );
        })((e) => {
          let t = e.target;
          ![...E.branches].some((e) => e.contains(t)) &&
            (g?.(e), b?.(e), e.defaultPrevented || h?.());
        }, j);
      return (
        (0, s.f)((e) => {
          T === E.layers.size - 1 &&
            (v?.(e), !e.defaultPrevented && h && (e.preventDefault(), h()));
        }, j),
        n.useEffect(() => {
          if (w)
            return (
              m &&
                (0 === E.layersWithOutsidePointerEventsDisabled.size &&
                  ((t = j.body.style.pointerEvents),
                  (j.body.style.pointerEvents = "none")),
                E.layersWithOutsidePointerEventsDisabled.add(w)),
              E.layers.add(w),
              f(),
              () => {
                m &&
                  1 === E.layersWithOutsidePointerEventsDisabled.size &&
                  (j.body.style.pointerEvents = t);
              }
            );
        }, [w, j, m, E]),
        n.useEffect(
          () => () => {
            w &&
              (E.layers.delete(w),
              E.layersWithOutsidePointerEventsDisabled.delete(w),
              f());
          },
          [w, E],
        ),
        n.useEffect(() => {
          let e = () => C({});
          return (
            document.addEventListener(u, e),
            () => document.removeEventListener(u, e)
          );
        }, []),
        (0, l.jsx)(o.V.div, {
          ...x,
          ref: D,
          style: {
            pointerEvents: I ? (S ? "auto" : "none") : void 0,
            ...e.style,
          },
          onFocusCapture: (0, r.f)(e.onFocusCapture, _.onFocusCapture),
          onBlurCapture: (0, r.f)(e.onBlurCapture, _.onBlurCapture),
          onPointerDownCapture: (0, r.f)(
            e.onPointerDownCapture,
            A.onPointerDownCapture,
          ),
        })
      );
    });
  function f() {
    let e = new CustomEvent(u);
    document.dispatchEvent(e);
  }
  function p(e, t, n, { discrete: r }) {
    let i = n.originalEvent.target,
      a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
    (t && i.addEventListener(e, t, { once: !0 }),
      r ? (0, o.u)(i, a) : i.dispatchEvent(a));
  }
  ((c.displayName = "DismissableLayer"),
    (n.forwardRef((e, t) => {
      let r = n.useContext(d),
        a = n.useRef(null),
        s = (0, i.j)(t, a);
      return (
        n.useEffect(() => {
          let e = a.current;
          if (e)
            return (
              r.branches.add(e),
              () => {
                r.branches.delete(e);
              }
            );
        }, [r.branches]),
        (0, l.jsx)(o.V.div, { ...e, ref: s })
      );
    }).displayName = "DismissableLayerBranch"),
    e.s(["f", 0, c]));
};
