// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    i = e.i(352386);
  let r = (0, i.createContext)({});
  e.s(["f", 0, r], 329041);
  var n = e.i(186645),
    a = e.i(643646);
  function o(e) {
    return Array.isArray(e) ? e.join(" ") : e;
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let { initial: t, animate: s } = (function (e, t) {
          if ((0, n.m)(e)) {
            let { initial: t, animate: i } = e;
            return {
              initial: !1 === t || (0, a.f)(t) ? t : void 0,
              animate: (0, a.f)(i) ? i : void 0,
            };
          }
          return !1 !== e.inherit ? t : {};
        })(e, (0, i.useContext)(r));
        return (0, i.useMemo)(() => ({ initial: t, animate: s }), [o(t), o(s)]);
      },
    ],
    43536,
  );
  var s = e.i(350764),
    l = e.i(97225),
    u = e.i(6778);
  let c = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
  function d(e, t, i) {
    for (let r in t) (0, s.f)(t[r]) || (0, l.f)(r, i) || (e[r] = t[r]);
  }
  e.s(["f", 0, c], 799819);
  var f = e.i(533186),
    m = e.i(140109);
  let h = () => ({ ...c(), attrs: {} });
  e.s(["f", 0, h], 775501);
  let p = new Set([
    "animate",
    "exit",
    "variants",
    "initial",
    "style",
    "values",
    "variants",
    "transition",
    "transformTemplate",
    "custom",
    "inherit",
    "onBeforeLayoutMeasure",
    "onAnimationStart",
    "onAnimationComplete",
    "onUpdate",
    "onDragStart",
    "onDrag",
    "onDragEnd",
    "onMeasureDragConstraints",
    "onDirectionLock",
    "onDragTransitionEnd",
    "_dragX",
    "_dragY",
    "onHoverStart",
    "onHoverEnd",
    "onViewportEnter",
    "onViewportLeave",
    "globalTapTarget",
    "propagate",
    "ignoreStrict",
    "viewport",
  ]);
  function E(e) {
    return (
      e.startsWith("while") ||
      (e.startsWith("drag") && "draggable" !== e) ||
      e.startsWith("layout") ||
      e.startsWith("onTap") ||
      e.startsWith("onPan") ||
      e.startsWith("onLayout") ||
      p.has(e)
    );
  }
  let v = (e) => !E(e);
  try {
    ((t = e.r(627686).default),
      "function" == typeof t &&
        (v = (e) => (e.startsWith("on") ? !E(e) : t(e))));
  } catch {}
  var g = e.i(398246);
  e.s(
    [
      "f",
      0,
      function (e, t, r, { latestValues: n }, a, o = !1, l) {
        let p = (
            (l ?? (0, g.f)(e))
              ? function (e, t, r, n) {
                  let a = (0, i.useMemo)(() => {
                    let i = h();
                    return (
                      (0, f.f)(i, t, (0, m.f)(n), e.transformTemplate, e.style),
                      { ...i.attrs, style: { ...i.style } }
                    );
                  }, [t]);
                  if (e.style) {
                    let t = {};
                    (d(t, e.style, e), (a.style = { ...t, ...a.style }));
                  }
                  return a;
                }
              : function (e, t) {
                  let r,
                    n,
                    a = {},
                    o =
                      ((r = e.style || {}),
                      d((n = {}), r, e),
                      Object.assign(
                        n,
                        (function ({ transformTemplate: e }, t) {
                          return (0, i.useMemo)(() => {
                            let i = c();
                            return (
                              (0, u.f)(i, t, e),
                              Object.assign({}, i.vars, i.style)
                            );
                          }, [t]);
                        })(e, t),
                      ),
                      n);
                  return (
                    e.drag &&
                      !1 !== e.dragListener &&
                      ((a.draggable = !1),
                      (o.userSelect =
                        o.WebkitUserSelect =
                        o.WebkitTouchCallout =
                          "none"),
                      (o.touchAction =
                        !0 === e.drag
                          ? "none"
                          : `pan-${"x" === e.drag ? "y" : "x"}`)),
                    void 0 === e.tabIndex &&
                      (e.onTap || e.onTapStart || e.whileTap) &&
                      (a.tabIndex = 0),
                    (a.style = o),
                    a
                  );
                }
          )(t, n, a, e),
          L = (function (e, t, i) {
            let r = {};
            for (let n in e)
              ("values" !== n || "object" != typeof e.values) &&
                !(0, s.f)(e[n]) &&
                (v(n) ||
                  (!0 === i && E(n)) ||
                  (!t && !E(n)) ||
                  (e.draggable && n.startsWith("onDrag"))) &&
                (r[n] = e[n]);
            return r;
          })(t, "string" == typeof e, o),
          O = e !== i.Fragment ? { ...L, ...p, ref: r } : {},
          { children: y } = t,
          A = (0, i.useMemo)(() => ((0, s.f)(y) ? y.get() : y), [y]);
        return (0, i.createElement)(e, { ...O, children: A });
      },
    ],
    242194,
  );
  var L = e.i(570110);
  e.s(["f", () => L.f], 972889);
};
