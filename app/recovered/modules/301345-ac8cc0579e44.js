// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    i = e.i(579510),
    a = e.i(278928),
    n = e.i(182782),
    r = e.i(144977),
    s = e.i(156207),
    l = e.i(556872),
    o = e.i(252960),
    c = e.i(127864),
    d = e.i(853233),
    m = e.i(732486),
    u = "Popper",
    [p, f] = (0, s.c)(u),
    [x, g] = p(u),
    h = (e) => {
      let { __scopePopper: i, children: a } = e,
        [n, r] = t.useState(null);
      return (0, m.jsx)(x, {
        scope: i,
        anchor: n,
        onAnchorChange: r,
        children: a,
      });
    };
  h.displayName = u;
  var b = "PopperAnchor",
    y = t.forwardRef((e, i) => {
      let { __scopePopper: a, virtualRef: n, ...s } = e,
        o = g(b, a),
        c = t.useRef(null),
        d = (0, r.j)(i, c),
        u = t.useRef(null);
      return (
        t.useEffect(() => {
          let e = u.current;
          ((u.current = n?.current || c.current),
            e !== u.current && o.onAnchorChange(u.current));
        }),
        n ? null : (0, m.jsx)(l.V.div, { ...s, ref: d })
      );
    });
  y.displayName = b;
  var v = "PopperContent",
    [w, _] = p(v),
    k = t.forwardRef((e, n) => {
      let {
          __scopePopper: s,
          side: u = "bottom",
          sideOffset: p = 0,
          align: f = "center",
          alignOffset: x = 0,
          arrowPadding: h = 0,
          avoidCollisions: b = !0,
          collisionBoundary: y = [],
          collisionPadding: _ = 0,
          sticky: k = "partial",
          hideWhenDetached: j = !1,
          updatePositionStrategy: C = "optimized",
          onPlaced: N,
          ...A
        } = e,
        T = g(v, s),
        [L, $] = t.useState(null),
        z = (0, r.j)(n, (e) => $(e)),
        [O, W] = t.useState(null),
        I = (0, d.f)(O),
        F = I?.width ?? 0,
        R = I?.height ?? 0,
        K =
          "number" == typeof _
            ? _
            : { top: 0, right: 0, bottom: 0, left: 0, ..._ },
        q = Array.isArray(y) ? y : [y],
        D = q.length > 0,
        Q = { padding: K, boundary: q.filter(S), altBoundary: D },
        {
          refs: U,
          floatingStyles: E,
          placement: J,
          isPositioned: B,
          middlewareData: H,
        } = (0, i.E)({
          strategy: "fixed",
          placement: u + ("center" !== f ? "-" + f : ""),
          whileElementsMounted: (...e) =>
            (0, a.n)(...e, { animationFrame: "always" === C }),
          elements: { reference: T.anchor },
          middleware: [
            (0, i.T)({ mainAxis: p + R, alignmentAxis: x }),
            b &&
              (0, i.e)({
                mainAxis: !0,
                crossAxis: !1,
                limiter: "partial" === k ? (0, i.n)() : void 0,
                ...Q,
              }),
            b && (0, i.x)({ ...Q }),
            (0, i.o)({
              ...Q,
              apply: ({
                elements: e,
                rects: t,
                availableWidth: i,
                availableHeight: a,
              }) => {
                let { width: n, height: r } = t.reference,
                  s = e.floating.style;
                (s.setProperty("--radix-popper-available-width", `${i}px`),
                  s.setProperty("--radix-popper-available-height", `${a}px`),
                  s.setProperty("--radix-popper-anchor-width", `${n}px`),
                  s.setProperty("--radix-popper-anchor-height", `${r}px`));
              },
            }),
            O && (0, i.P)({ element: O, padding: h }),
            P({ arrowWidth: F, arrowHeight: R }),
            j && (0, i.c)({ strategy: "referenceHidden", ...Q }),
          ],
        }),
        [M, G] = V(J),
        X = (0, o.f)(N);
      (0, c.f)(() => {
        B && X?.();
      }, [B, X]);
      let Y = H.arrow?.x,
        Z = H.arrow?.y,
        ee = H.arrow?.centerOffset !== 0,
        [et, ei] = t.useState();
      return (
        (0, c.f)(() => {
          L && ei(window.getComputedStyle(L).zIndex);
        }, [L]),
        (0, m.jsx)("div", {
          ref: U.setFloating,
          "data-radix-popper-content-wrapper": "",
          style: {
            ...E,
            transform: B ? E.transform : "translate(0, -200%)",
            minWidth: "max-content",
            zIndex: et,
            "--radix-popper-transform-origin": [
              H.transformOrigin?.x,
              H.transformOrigin?.y,
            ].join(" "),
            ...(H.hide?.referenceHidden && {
              visibility: "hidden",
              pointerEvents: "none",
            }),
          },
          dir: e.dir,
          children: (0, m.jsx)(w, {
            scope: s,
            placedSide: M,
            onArrowChange: W,
            arrowX: Y,
            arrowY: Z,
            shouldHideArrow: ee,
            children: (0, m.jsx)(l.V.div, {
              "data-side": M,
              "data-align": G,
              ...A,
              ref: z,
              style: { ...A.style, animation: B ? void 0 : "none" },
            }),
          }),
        })
      );
    });
  k.displayName = v;
  var j = "PopperArrow",
    C = { top: "bottom", right: "left", bottom: "top", left: "right" },
    N = t.forwardRef(function (e, t) {
      let { __scopePopper: i, ...a } = e,
        r = _(j, i),
        s = C[r.placedSide];
      return (0, m.jsx)("span", {
        ref: r.onArrowChange,
        style: {
          position: "absolute",
          left: r.arrowX,
          top: r.arrowY,
          [s]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0",
          }[r.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)",
          }[r.placedSide],
          visibility: r.shouldHideArrow ? "hidden" : void 0,
        },
        children: (0, m.jsx)(n.f, {
          ...a,
          ref: t,
          style: { ...a.style, display: "block" },
        }),
      });
    });
  function S(e) {
    return null !== e;
  }
  N.displayName = j;
  var P = (e) => ({
    name: "transformOrigin",
    options: e,
    fn(t) {
      let { placement: i, rects: a, middlewareData: n } = t,
        r = n.arrow?.centerOffset !== 0,
        s = r ? 0 : e.arrowWidth,
        l = r ? 0 : e.arrowHeight,
        [o, c] = V(i),
        d = { start: "0%", center: "50%", end: "100%" }[c],
        m = (n.arrow?.x ?? 0) + s / 2,
        u = (n.arrow?.y ?? 0) + l / 2,
        p = "",
        f = "";
      return (
        "bottom" === o
          ? ((p = r ? d : `${m}px`), (f = `${-l}px`))
          : "top" === o
            ? ((p = r ? d : `${m}px`), (f = `${a.floating.height + l}px`))
            : "right" === o
              ? ((p = `${-l}px`), (f = r ? d : `${u}px`))
              : "left" === o &&
                ((p = `${a.floating.width + l}px`), (f = r ? d : `${u}px`)),
        { data: { x: p, y: f } }
      );
    },
  });
  function V(e) {
    let [t, i = "center"] = e.split("-");
    return [t, i];
  }
  e.s(["g", 0, y, "j", 0, N, "c", 0, k, "F", 0, h, "y", 0, f]);
};
