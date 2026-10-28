// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(579510),
    n = e.i(278928),
    a = e.i(182782),
    i = e.i(144977),
    l = e.i(156207),
    o = e.i(556872),
    s = e.i(252960),
    u = e.i(127864),
    d = e.i(853233),
    c = e.i(732486),
    f = "Popper",
    [m, h] = (0, l.c)(f),
    [p, x] = m(f),
    g = (e) => {
      let { __scopePopper: r, children: n } = e,
        [a, i] = t.useState(null);
      return (0, c.jsx)(p, {
        scope: r,
        anchor: a,
        onAnchorChange: i,
        children: n,
      });
    };
  g.displayName = f;
  var y = "PopperAnchor",
    v = t.forwardRef((e, r) => {
      let { __scopePopper: n, virtualRef: a, ...l } = e,
        s = x(y, n),
        u = t.useRef(null),
        d = (0, i.j)(r, u),
        f = t.useRef(null);
      return (
        t.useEffect(() => {
          let e = f.current;
          ((f.current = a?.current || u.current),
            e !== f.current && s.onAnchorChange(f.current));
        }),
        a ? null : (0, c.jsx)(o.V.div, { ...l, ref: d })
      );
    });
  v.displayName = y;
  var b = "PopperContent",
    [w, j] = m(b),
    C = t.forwardRef((e, a) => {
      let {
          __scopePopper: l,
          side: f = "bottom",
          sideOffset: m = 0,
          align: h = "center",
          alignOffset: p = 0,
          arrowPadding: g = 0,
          avoidCollisions: y = !0,
          collisionBoundary: v = [],
          collisionPadding: j = 0,
          sticky: C = "partial",
          hideWhenDetached: _ = !1,
          updatePositionStrategy: N = "optimized",
          onPlaced: P,
          ...D
        } = e,
        F = x(b, l),
        [T, $] = t.useState(null),
        U = (0, i.j)(a, (e) => $(e)),
        [R, A] = t.useState(null),
        W = (0, d.f)(R),
        E = W?.width ?? 0,
        I = W?.height ?? 0,
        z =
          "number" == typeof j
            ? j
            : { top: 0, right: 0, bottom: 0, left: 0, ...j },
        O = Array.isArray(v) ? v : [v],
        L = O.length > 0,
        q = { padding: z, boundary: O.filter(S), altBoundary: L },
        {
          refs: V,
          floatingStyles: X,
          placement: B,
          isPositioned: H,
          middlewareData: Y,
        } = (0, r.E)({
          strategy: "fixed",
          placement: f + ("center" !== h ? "-" + h : ""),
          whileElementsMounted: (...e) =>
            (0, n.n)(...e, { animationFrame: "always" === N }),
          elements: { reference: F.anchor },
          middleware: [
            (0, r.T)({ mainAxis: m + I, alignmentAxis: p }),
            y &&
              (0, r.e)({
                mainAxis: !0,
                crossAxis: !1,
                limiter: "partial" === C ? (0, r.n)() : void 0,
                ...q,
              }),
            y && (0, r.x)({ ...q }),
            (0, r.o)({
              ...q,
              apply: ({
                elements: e,
                rects: t,
                availableWidth: r,
                availableHeight: n,
              }) => {
                let { width: a, height: i } = t.reference,
                  l = e.floating.style;
                (l.setProperty("--radix-popper-available-width", `${r}px`),
                  l.setProperty("--radix-popper-available-height", `${n}px`),
                  l.setProperty("--radix-popper-anchor-width", `${a}px`),
                  l.setProperty("--radix-popper-anchor-height", `${i}px`));
              },
            }),
            R && (0, r.P)({ element: R, padding: g }),
            M({ arrowWidth: E, arrowHeight: I }),
            _ && (0, r.c)({ strategy: "referenceHidden", ...q }),
          ],
        }),
        [J, Q] = k(B),
        K = (0, s.f)(P);
      (0, u.f)(() => {
        H && K?.();
      }, [H, K]);
      let Z = Y.arrow?.x,
        G = Y.arrow?.y,
        ee = Y.arrow?.centerOffset !== 0,
        [et, er] = t.useState();
      return (
        (0, u.f)(() => {
          T && er(window.getComputedStyle(T).zIndex);
        }, [T]),
        (0, c.jsx)("div", {
          ref: V.setFloating,
          "data-radix-popper-content-wrapper": "",
          style: {
            ...X,
            transform: H ? X.transform : "translate(0, -200%)",
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
          children: (0, c.jsx)(w, {
            scope: l,
            placedSide: J,
            onArrowChange: A,
            arrowX: Z,
            arrowY: G,
            shouldHideArrow: ee,
            children: (0, c.jsx)(o.V.div, {
              "data-side": J,
              "data-align": Q,
              ...D,
              ref: U,
              style: { ...D.style, animation: H ? void 0 : "none" },
            }),
          }),
        })
      );
    });
  C.displayName = b;
  var _ = "PopperArrow",
    N = { top: "bottom", right: "left", bottom: "top", left: "right" },
    P = t.forwardRef(function (e, t) {
      let { __scopePopper: r, ...n } = e,
        i = j(_, r),
        l = N[i.placedSide];
      return (0, c.jsx)("span", {
        ref: i.onArrowChange,
        style: {
          position: "absolute",
          left: i.arrowX,
          top: i.arrowY,
          [l]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0",
          }[i.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)",
          }[i.placedSide],
          visibility: i.shouldHideArrow ? "hidden" : void 0,
        },
        children: (0, c.jsx)(a.f, {
          ...n,
          ref: t,
          style: { ...n.style, display: "block" },
        }),
      });
    });
  function S(e) {
    return null !== e;
  }
  P.displayName = _;
  var M = (e) => ({
    name: "transformOrigin",
    options: e,
    fn(t) {
      let { placement: r, rects: n, middlewareData: a } = t,
        i = a.arrow?.centerOffset !== 0,
        l = i ? 0 : e.arrowWidth,
        o = i ? 0 : e.arrowHeight,
        [s, u] = k(r),
        d = { start: "0%", center: "50%", end: "100%" }[u],
        c = (a.arrow?.x ?? 0) + l / 2,
        f = (a.arrow?.y ?? 0) + o / 2,
        m = "",
        h = "";
      return (
        "bottom" === s
          ? ((m = i ? d : `${c}px`), (h = `${-o}px`))
          : "top" === s
            ? ((m = i ? d : `${c}px`), (h = `${n.floating.height + o}px`))
            : "right" === s
              ? ((m = `${-o}px`), (h = i ? d : `${f}px`))
              : "left" === s &&
                ((m = `${n.floating.width + o}px`), (h = i ? d : `${f}px`)),
        { data: { x: m, y: h } }
      );
    },
  });
  function k(e) {
    let [t, r = "center"] = e.split("-");
    return [t, r];
  }
  e.s(["g", 0, v, "j", 0, P, "c", 0, C, "F", 0, g, "y", 0, h]);
};
