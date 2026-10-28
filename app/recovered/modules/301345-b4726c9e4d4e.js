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
    d = e.i(127864),
    c = e.i(853233),
    f = e.i(732486),
    u = "Popper",
    [m, p] = (0, l.c)(u),
    [x, h] = m(u),
    y = (e) => {
      let { __scopePopper: r, children: n } = e,
        [a, i] = t.useState(null);
      return (0, f.jsx)(x, {
        scope: r,
        anchor: a,
        onAnchorChange: i,
        children: n,
      });
    };
  y.displayName = u;
  var g = "PopperAnchor",
    v = t.forwardRef((e, r) => {
      let { __scopePopper: n, virtualRef: a, ...l } = e,
        s = h(g, n),
        d = t.useRef(null),
        c = (0, i.j)(r, d),
        u = t.useRef(null);
      return (
        t.useEffect(() => {
          let e = u.current;
          ((u.current = a?.current || d.current),
            e !== u.current && s.onAnchorChange(u.current));
        }),
        a ? null : (0, f.jsx)(o.V.div, { ...l, ref: c })
      );
    });
  v.displayName = g;
  var w = "PopperContent",
    [b, j] = m(w),
    N = t.forwardRef((e, a) => {
      let {
          __scopePopper: l,
          side: u = "bottom",
          sideOffset: m = 0,
          align: p = "center",
          alignOffset: x = 0,
          arrowPadding: y = 0,
          avoidCollisions: g = !0,
          collisionBoundary: v = [],
          collisionPadding: j = 0,
          sticky: N = "partial",
          hideWhenDetached: C = !1,
          updatePositionStrategy: P = "optimized",
          onPlaced: S,
          ...F
        } = e,
        $ = h(w, l),
        [A, T] = t.useState(null),
        O = (0, i.j)(a, (e) => T(e)),
        [U, I] = t.useState(null),
        k = (0, c.f)(U),
        D = k?.width ?? 0,
        z = k?.height ?? 0,
        L =
          "number" == typeof j
            ? j
            : { top: 0, right: 0, bottom: 0, left: 0, ...j },
        V = Array.isArray(v) ? v : [v],
        H = V.length > 0,
        W = { padding: L, boundary: V.filter(R), altBoundary: H },
        {
          refs: M,
          floatingStyles: q,
          placement: B,
          isPositioned: X,
          middlewareData: J,
        } = (0, r.E)({
          strategy: "fixed",
          placement: u + ("center" !== p ? "-" + p : ""),
          whileElementsMounted: (...e) =>
            (0, n.n)(...e, { animationFrame: "always" === P }),
          elements: { reference: $.anchor },
          middleware: [
            (0, r.T)({ mainAxis: m + z, alignmentAxis: x }),
            g &&
              (0, r.e)({
                mainAxis: !0,
                crossAxis: !1,
                limiter: "partial" === N ? (0, r.n)() : void 0,
                ...W,
              }),
            g && (0, r.x)({ ...W }),
            (0, r.o)({
              ...W,
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
            U && (0, r.P)({ element: U, padding: y }),
            _({ arrowWidth: D, arrowHeight: z }),
            C && (0, r.c)({ strategy: "referenceHidden", ...W }),
          ],
        }),
        [Y, K] = E(B),
        Q = (0, s.f)(S);
      (0, d.f)(() => {
        X && Q?.();
      }, [X, Q]);
      let Z = J.arrow?.x,
        G = J.arrow?.y,
        ee = J.arrow?.centerOffset !== 0,
        [et, er] = t.useState();
      return (
        (0, d.f)(() => {
          A && er(window.getComputedStyle(A).zIndex);
        }, [A]),
        (0, f.jsx)("div", {
          ref: M.setFloating,
          "data-radix-popper-content-wrapper": "",
          style: {
            ...q,
            transform: X ? q.transform : "translate(0, -200%)",
            minWidth: "max-content",
            zIndex: et,
            "--radix-popper-transform-origin": [
              J.transformOrigin?.x,
              J.transformOrigin?.y,
            ].join(" "),
            ...(J.hide?.referenceHidden && {
              visibility: "hidden",
              pointerEvents: "none",
            }),
          },
          dir: e.dir,
          children: (0, f.jsx)(b, {
            scope: l,
            placedSide: Y,
            onArrowChange: I,
            arrowX: Z,
            arrowY: G,
            shouldHideArrow: ee,
            children: (0, f.jsx)(o.V.div, {
              "data-side": Y,
              "data-align": K,
              ...F,
              ref: O,
              style: { ...F.style, animation: X ? void 0 : "none" },
            }),
          }),
        })
      );
    });
  N.displayName = w;
  var C = "PopperArrow",
    P = { top: "bottom", right: "left", bottom: "top", left: "right" },
    S = t.forwardRef(function (e, t) {
      let { __scopePopper: r, ...n } = e,
        i = j(C, r),
        l = P[i.placedSide];
      return (0, f.jsx)("span", {
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
        children: (0, f.jsx)(a.f, {
          ...n,
          ref: t,
          style: { ...n.style, display: "block" },
        }),
      });
    });
  function R(e) {
    return null !== e;
  }
  S.displayName = C;
  var _ = (e) => ({
    name: "transformOrigin",
    options: e,
    fn(t) {
      let { placement: r, rects: n, middlewareData: a } = t,
        i = a.arrow?.centerOffset !== 0,
        l = i ? 0 : e.arrowWidth,
        o = i ? 0 : e.arrowHeight,
        [s, d] = E(r),
        c = { start: "0%", center: "50%", end: "100%" }[d],
        f = (a.arrow?.x ?? 0) + l / 2,
        u = (a.arrow?.y ?? 0) + o / 2,
        m = "",
        p = "";
      return (
        "bottom" === s
          ? ((m = i ? c : `${f}px`), (p = `${-o}px`))
          : "top" === s
            ? ((m = i ? c : `${f}px`), (p = `${n.floating.height + o}px`))
            : "right" === s
              ? ((m = `${-o}px`), (p = i ? c : `${u}px`))
              : "left" === s &&
                ((m = `${n.floating.width + o}px`), (p = i ? c : `${u}px`)),
        { data: { x: m, y: p } }
      );
    },
  });
  function E(e) {
    let [t, r = "center"] = e.split("-");
    return [t, r];
  }
  e.s(["g", 0, v, "j", 0, S, "c", 0, N, "F", 0, y, "y", 0, p]);
};
