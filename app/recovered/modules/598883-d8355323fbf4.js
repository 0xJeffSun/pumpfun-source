// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    r = e.i(732486),
    n = e.i(445242),
    a = e.i(352386),
    i = e.i(291967),
    l = e.i(156207),
    o = e.i(534643),
    s = e.i(144977),
    u = e.i(301345),
    d = e.i(614952),
    c = e.i(653747),
    f = e.i(556872),
    m = e.i(60212),
    h = "HoverCard",
    [p, x] = (0, l.c)(h, [u.y]),
    g = (0, u.y)(),
    [y, v] = p(h),
    b = (e) => {
      let {
          __scopeHoverCard: t,
          children: n,
          open: i,
          defaultOpen: l,
          onOpenChange: s,
          openDelay: d = 700,
          closeDelay: c = 300,
        } = e,
        f = g(t),
        m = a.useRef(0),
        p = a.useRef(0),
        x = a.useRef(!1),
        v = a.useRef(!1),
        [b, w] = (0, o.f)({
          prop: i,
          defaultProp: l ?? !1,
          onChange: s,
          caller: h,
        }),
        j = a.useCallback(() => {
          (clearTimeout(p.current),
            (m.current = window.setTimeout(() => w(!0), d)));
        }, [d, w]),
        C = a.useCallback(() => {
          (clearTimeout(m.current),
            x.current ||
              v.current ||
              (p.current = window.setTimeout(() => w(!1), c)));
        }, [c, w]),
        _ = a.useCallback(() => w(!1), [w]);
      return (
        a.useEffect(
          () => () => {
            (clearTimeout(m.current), clearTimeout(p.current));
          },
          [],
        ),
        (0, r.jsx)(y, {
          scope: t,
          open: b,
          onOpenChange: w,
          onOpen: j,
          onClose: C,
          onDismiss: _,
          hasSelectionRef: x,
          isPointerDownOnContentRef: v,
          children: (0, r.jsx)(u.F, { ...f, children: n }),
        })
      );
    };
  b.displayName = h;
  var w = "HoverCardTrigger",
    j = a.forwardRef((e, t) => {
      let { __scopeHoverCard: n, ...a } = e,
        l = v(w, n),
        o = g(n);
      return (0, r.jsx)(u.g, {
        asChild: !0,
        ...o,
        children: (0, r.jsx)(f.V.a, {
          "data-state": l.open ? "open" : "closed",
          ...a,
          ref: t,
          onPointerEnter: (0, i.f)(e.onPointerEnter, D(l.onOpen)),
          onPointerLeave: (0, i.f)(e.onPointerLeave, D(l.onClose)),
          onFocus: (0, i.f)(e.onFocus, l.onOpen),
          onBlur: (0, i.f)(e.onBlur, l.onClose),
          onTouchStart: (0, i.f)(e.onTouchStart, (e) => e.preventDefault()),
        }),
      });
    });
  j.displayName = w;
  var C = "HoverCardPortal",
    [_, N] = p(C, { forceMount: void 0 }),
    P = (e) => {
      let { __scopeHoverCard: t, forceMount: n, children: a, container: i } = e,
        l = v(C, t);
      return (0, r.jsx)(_, {
        scope: t,
        forceMount: n,
        children: (0, r.jsx)(c.f, {
          present: n || l.open,
          children: (0, r.jsx)(d.f, { asChild: !0, container: i, children: a }),
        }),
      });
    };
  P.displayName = C;
  var S = "HoverCardContent",
    M = a.forwardRef((e, t) => {
      let n = N(S, e.__scopeHoverCard),
        { forceMount: a = n.forceMount, ...l } = e,
        o = v(S, e.__scopeHoverCard);
      return (0, r.jsx)(c.f, {
        present: a || o.open,
        children: (0, r.jsx)(k, {
          "data-state": o.open ? "open" : "closed",
          ...l,
          onPointerEnter: (0, i.f)(e.onPointerEnter, D(o.onOpen)),
          onPointerLeave: (0, i.f)(e.onPointerLeave, D(o.onClose)),
          ref: t,
        }),
      });
    });
  M.displayName = S;
  var k = a.forwardRef((e, n) => {
    let {
        __scopeHoverCard: l,
        onEscapeKeyDown: o,
        onPointerDownOutside: d,
        onFocusOutside: c,
        onInteractOutside: f,
        ...h
      } = e,
      p = v(S, l),
      x = g(l),
      y = a.useRef(null),
      b = (0, s.j)(n, y),
      [w, j] = a.useState(!1);
    return (
      a.useEffect(() => {
        if (w) {
          let e = document.body;
          return (
            (t = e.style.userSelect || e.style.webkitUserSelect),
            (e.style.userSelect = "none"),
            (e.style.webkitUserSelect = "none"),
            () => {
              ((e.style.userSelect = t), (e.style.webkitUserSelect = t));
            }
          );
        }
      }, [w]),
      a.useEffect(() => {
        if (y.current) {
          let e = () => {
            (j(!1),
              (p.isPointerDownOnContentRef.current = !1),
              setTimeout(() => {
                document.getSelection()?.toString() !== "" &&
                  (p.hasSelectionRef.current = !0);
              }));
          };
          return (
            document.addEventListener("pointerup", e),
            () => {
              (document.removeEventListener("pointerup", e),
                (p.hasSelectionRef.current = !1),
                (p.isPointerDownOnContentRef.current = !1));
            }
          );
        }
      }, [p.isPointerDownOnContentRef, p.hasSelectionRef]),
      a.useEffect(() => {
        y.current &&
          (function (e) {
            let t = [],
              r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
                acceptNode: (e) =>
                  e.tabIndex >= 0
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_SKIP,
              });
            for (; r.nextNode(); ) t.push(r.currentNode);
            return t;
          })(y.current).forEach((e) => e.setAttribute("tabindex", "-1"));
      }),
      (0, r.jsx)(m.f, {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onInteractOutside: f,
        onEscapeKeyDown: o,
        onPointerDownOutside: d,
        onFocusOutside: (0, i.f)(c, (e) => {
          e.preventDefault();
        }),
        onDismiss: p.onDismiss,
        children: (0, r.jsx)(u.c, {
          ...x,
          ...h,
          onPointerDown: (0, i.f)(h.onPointerDown, (e) => {
            (e.currentTarget.contains(e.target) && j(!0),
              (p.hasSelectionRef.current = !1),
              (p.isPointerDownOnContentRef.current = !0));
          }),
          ref: b,
          style: {
            ...h.style,
            userSelect: w ? "text" : void 0,
            WebkitUserSelect: w ? "text" : void 0,
            "--radix-hover-card-content-transform-origin":
              "var(--radix-popper-transform-origin)",
            "--radix-hover-card-content-available-width":
              "var(--radix-popper-available-width)",
            "--radix-hover-card-content-available-height":
              "var(--radix-popper-available-height)",
            "--radix-hover-card-trigger-width":
              "var(--radix-popper-anchor-width)",
            "--radix-hover-card-trigger-height":
              "var(--radix-popper-anchor-height)",
          },
        }),
      })
    );
  });
  function D(e) {
    return (t) => ("touch" === t.pointerType ? void 0 : e());
  }
  a.forwardRef((e, t) => {
    let { __scopeHoverCard: n, ...a } = e,
      i = g(n);
    return (0, r.jsx)(u.j, { ...i, ...a, ref: t });
  }).displayName = "HoverCardArrow";
  var F = e.i(426091),
    T = e.i(360827);
  let $ = a.forwardRef((e, t) => {
    let a,
      i,
      l,
      o,
      s,
      u,
      d = (0, n.c)(13);
    d[0] !== e
      ? (({ className: a, align: l, sideOffset: o, ...i } = e),
        (d[0] = e),
        (d[1] = a),
        (d[2] = i),
        (d[3] = l),
        (d[4] = o))
      : ((a = d[1]), (i = d[2]), (l = d[3]), (o = d[4]));
    let c = void 0 === l ? "center" : l,
      f = void 0 === o ? 4 : o;
    return (
      d[5] !== a
        ? ((s = (0, F.c)(
            "z-50 w-80 origin-[--radix-hover-card-content-transform-origin] p-0 outline-none",
            T.V,
            a,
          )),
          (d[5] = a),
          (d[6] = s))
        : (s = d[6]),
      d[7] !== c || d[8] !== i || d[9] !== t || d[10] !== f || d[11] !== s
        ? ((u = (0, r.jsx)(P, {
            children: (0, r.jsx)(M, {
              ref: t,
              align: c,
              sideOffset: f,
              className: s,
              ...i,
            }),
          })),
          (d[7] = c),
          (d[8] = i),
          (d[9] = t),
          (d[10] = f),
          (d[11] = s),
          (d[12] = u))
        : (u = d[12]),
      u
    );
  });
  (($.displayName = M.displayName),
    e.s(["c", 0, b, "P", 0, $, "b", 0, j], 598883),
    e.s(
      [
        "f",
        0,
        function (e, t = []) {
          let n = [],
            i = () => {
              let t = n.map((e) => a.createContext(e));
              return function (r) {
                let n = r?.[e] || t;
                return a.useMemo(
                  () => ({ [`__scope${e}`]: { ...r, [e]: n } }),
                  [r, n],
                );
              };
            };
          return (
            (i.scopeName = e),
            [
              function (t, i) {
                let l = a.createContext(i);
                l.displayName = t + "Context";
                let o = n.length;
                n = [...n, i];
                let s = (t) => {
                  let { scope: n, children: i, ...s } = t,
                    u = n?.[e]?.[o] || l,
                    d = a.useMemo(() => s, Object.values(s));
                  return (0, r.jsx)(u.Provider, { value: d, children: i });
                };
                return (
                  (s.displayName = t + "Provider"),
                  [
                    s,
                    function (r, n) {
                      let s = n?.[e]?.[o] || l,
                        u = a.useContext(s);
                      if (u) return u;
                      if (void 0 !== i) return i;
                      throw Error(`\`${r}\` must be used within \`${t}\``);
                    },
                  ]
                );
              },
              (function (...e) {
                let t = e[0];
                if (1 === e.length) return t;
                let r = () => {
                  let r = e.map((e) => ({
                    useScope: e(),
                    scopeName: e.scopeName,
                  }));
                  return function (e) {
                    let n = r.reduce((t, { useScope: r, scopeName: n }) => {
                      let a = r(e)[`__scope${n}`];
                      return { ...t, ...a };
                    }, {});
                    return a.useMemo(
                      () => ({ [`__scope${t.scopeName}`]: n }),
                      [n],
                    );
                  };
                };
                return ((r.scopeName = t.scopeName), r);
              })(i, ...t),
            ]
          );
        },
      ],
      532047,
    ));
};
