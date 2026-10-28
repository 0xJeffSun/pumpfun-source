// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(579510),
    n = e.i(278928),
    i = e.i(182782),
    a = e.i(144977),
    o = e.i(156207),
    s = e.i(556872),
    l = e.i(252960),
    d = e.i(127864),
    u = e.i(853233),
    m = e.i(732486),
    c = "Popper",
    [f, p] = (0, o.c)(c),
    [h, g] = f(c),
    w = (e) => {
      let { __scopePopper: r, children: n } = e,
        [i, a] = t.useState(null);
      return (0, m.jsx)(h, {
        scope: r,
        anchor: i,
        onAnchorChange: a,
        children: n,
      });
    };
  w.displayName = c;
  var y = "PopperAnchor",
    b = t.forwardRef((e, r) => {
      let { __scopePopper: n, virtualRef: i, ...o } = e,
        l = g(y, n),
        d = t.useRef(null),
        u = (0, a.j)(r, d),
        c = t.useRef(null);
      return (
        t.useEffect(() => {
          let e = c.current;
          ((c.current = i?.current || d.current),
            e !== c.current && l.onAnchorChange(c.current));
        }),
        i ? null : (0, m.jsx)(s.V.div, { ...o, ref: u })
      );
    });
  b.displayName = y;
  var x = "PopperContent",
    [$, S] = f(x),
    A = t.forwardRef((e, i) => {
      let {
          __scopePopper: o,
          side: c = "bottom",
          sideOffset: f = 0,
          align: p = "center",
          alignOffset: h = 0,
          arrowPadding: w = 0,
          avoidCollisions: y = !0,
          collisionBoundary: b = [],
          collisionPadding: S = 0,
          sticky: A = "partial",
          hideWhenDetached: N = !1,
          updatePositionStrategy: v = "optimized",
          onPlaced: U,
          ...F
        } = e,
        M = g(x, o),
        [P, k] = t.useState(null),
        C = (0, a.j)(i, (e) => k(e)),
        [T, R] = t.useState(null),
        G = (0, u.f)(T),
        I = G?.width ?? 0,
        q = G?.height ?? 0,
        E =
          "number" == typeof S
            ? S
            : { top: 0, right: 0, bottom: 0, left: 0, ...S },
        L = Array.isArray(b) ? b : [b],
        z = L.length > 0,
        V = { padding: E, boundary: L.filter(D), altBoundary: z },
        {
          refs: B,
          floatingStyles: H,
          placement: W,
          isPositioned: Z,
          middlewareData: O,
        } = (0, r.E)({
          strategy: "fixed",
          placement: c + ("center" !== p ? "-" + p : ""),
          whileElementsMounted: (...e) =>
            (0, n.n)(...e, { animationFrame: "always" === v }),
          elements: { reference: M.anchor },
          middleware: [
            (0, r.T)({ mainAxis: f + q, alignmentAxis: h }),
            y &&
              (0, r.e)({
                mainAxis: !0,
                crossAxis: !1,
                limiter: "partial" === A ? (0, r.n)() : void 0,
                ...V,
              }),
            y && (0, r.x)({ ...V }),
            (0, r.o)({
              ...V,
              apply: ({
                elements: e,
                rects: t,
                availableWidth: r,
                availableHeight: n,
              }) => {
                let { width: i, height: a } = t.reference,
                  o = e.floating.style;
                (o.setProperty("--radix-popper-available-width", `${r}px`),
                  o.setProperty("--radix-popper-available-height", `${n}px`),
                  o.setProperty("--radix-popper-anchor-width", `${i}px`),
                  o.setProperty("--radix-popper-anchor-height", `${a}px`));
              },
            }),
            T && (0, r.P)({ element: T, padding: w }),
            _({ arrowWidth: I, arrowHeight: q }),
            N && (0, r.c)({ strategy: "referenceHidden", ...V }),
          ],
        }),
        [K, X] = j(W),
        Y = (0, l.f)(U);
      (0, d.f)(() => {
        Z && Y?.();
      }, [Z, Y]);
      let J = O.arrow?.x,
        Q = O.arrow?.y,
        ee = O.arrow?.centerOffset !== 0,
        [et, er] = t.useState();
      return (
        (0, d.f)(() => {
          P && er(window.getComputedStyle(P).zIndex);
        }, [P]),
        (0, m.jsx)("div", {
          ref: B.setFloating,
          "data-radix-popper-content-wrapper": "",
          style: {
            ...H,
            transform: Z ? H.transform : "translate(0, -200%)",
            minWidth: "max-content",
            zIndex: et,
            "--radix-popper-transform-origin": [
              O.transformOrigin?.x,
              O.transformOrigin?.y,
            ].join(" "),
            ...(O.hide?.referenceHidden && {
              visibility: "hidden",
              pointerEvents: "none",
            }),
          },
          dir: e.dir,
          children: (0, m.jsx)($, {
            scope: o,
            placedSide: K,
            onArrowChange: R,
            arrowX: J,
            arrowY: Q,
            shouldHideArrow: ee,
            children: (0, m.jsx)(s.V.div, {
              "data-side": K,
              "data-align": X,
              ...F,
              ref: C,
              style: { ...F.style, animation: Z ? void 0 : "none" },
            }),
          }),
        })
      );
    });
  A.displayName = x;
  var N = "PopperArrow",
    v = { top: "bottom", right: "left", bottom: "top", left: "right" },
    U = t.forwardRef(function (e, t) {
      let { __scopePopper: r, ...n } = e,
        a = S(N, r),
        o = v[a.placedSide];
      return (0, m.jsx)("span", {
        ref: a.onArrowChange,
        style: {
          position: "absolute",
          left: a.arrowX,
          top: a.arrowY,
          [o]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0",
          }[a.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)",
          }[a.placedSide],
          visibility: a.shouldHideArrow ? "hidden" : void 0,
        },
        children: (0, m.jsx)(i.f, {
          ...n,
          ref: t,
          style: { ...n.style, display: "block" },
        }),
      });
    });
  function D(e) {
    return null !== e;
  }
  U.displayName = N;
  var _ = (e) => ({
    name: "transformOrigin",
    options: e,
    fn(t) {
      let { placement: r, rects: n, middlewareData: i } = t,
        a = i.arrow?.centerOffset !== 0,
        o = a ? 0 : e.arrowWidth,
        s = a ? 0 : e.arrowHeight,
        [l, d] = j(r),
        u = { start: "0%", center: "50%", end: "100%" }[d],
        m = (i.arrow?.x ?? 0) + o / 2,
        c = (i.arrow?.y ?? 0) + s / 2,
        f = "",
        p = "";
      return (
        "bottom" === l
          ? ((f = a ? u : `${m}px`), (p = `${-s}px`))
          : "top" === l
            ? ((f = a ? u : `${m}px`), (p = `${n.floating.height + s}px`))
            : "right" === l
              ? ((f = `${-s}px`), (p = a ? u : `${c}px`))
              : "left" === l &&
                ((f = `${n.floating.width + s}px`), (p = a ? u : `${c}px`)),
        { data: { x: f, y: p } }
      );
    },
  });
  function j(e) {
    let [t, r = "center"] = e.split("-");
    return [t, r];
  }
  e.s(["g", 0, b, "j", 0, U, "c", 0, A, "F", 0, w, "y", 0, p]);
};
