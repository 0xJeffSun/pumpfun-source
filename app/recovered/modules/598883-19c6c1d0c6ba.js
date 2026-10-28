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
    d = e.i(301345),
    c = e.i(614952),
    f = e.i(653747),
    u = e.i(556872),
    m = e.i(60212),
    p = "HoverCard",
    [x, h] = (0, l.c)(p, [d.y]),
    y = (0, d.y)(),
    [g, v] = x(p),
    w = (e) => {
      let {
          __scopeHoverCard: t,
          children: n,
          open: i,
          defaultOpen: l,
          onOpenChange: s,
          openDelay: c = 700,
          closeDelay: f = 300,
        } = e,
        u = y(t),
        m = a.useRef(0),
        x = a.useRef(0),
        h = a.useRef(!1),
        v = a.useRef(!1),
        [w, b] = (0, o.f)({
          prop: i,
          defaultProp: l ?? !1,
          onChange: s,
          caller: p,
        }),
        j = a.useCallback(() => {
          (clearTimeout(x.current),
            (m.current = window.setTimeout(() => b(!0), c)));
        }, [c, b]),
        N = a.useCallback(() => {
          (clearTimeout(m.current),
            h.current ||
              v.current ||
              (x.current = window.setTimeout(() => b(!1), f)));
        }, [f, b]),
        C = a.useCallback(() => b(!1), [b]);
      return (
        a.useEffect(
          () => () => {
            (clearTimeout(m.current), clearTimeout(x.current));
          },
          [],
        ),
        (0, r.jsx)(g, {
          scope: t,
          open: w,
          onOpenChange: b,
          onOpen: j,
          onClose: N,
          onDismiss: C,
          hasSelectionRef: h,
          isPointerDownOnContentRef: v,
          children: (0, r.jsx)(d.F, { ...u, children: n }),
        })
      );
    };
  w.displayName = p;
  var b = "HoverCardTrigger",
    j = a.forwardRef((e, t) => {
      let { __scopeHoverCard: n, ...a } = e,
        l = v(b, n),
        o = y(n);
      return (0, r.jsx)(d.g, {
        asChild: !0,
        ...o,
        children: (0, r.jsx)(u.V.a, {
          "data-state": l.open ? "open" : "closed",
          ...a,
          ref: t,
          onPointerEnter: (0, i.f)(e.onPointerEnter, F(l.onOpen)),
          onPointerLeave: (0, i.f)(e.onPointerLeave, F(l.onClose)),
          onFocus: (0, i.f)(e.onFocus, l.onOpen),
          onBlur: (0, i.f)(e.onBlur, l.onClose),
          onTouchStart: (0, i.f)(e.onTouchStart, (e) => e.preventDefault()),
        }),
      });
    });
  j.displayName = b;
  var N = "HoverCardPortal",
    [C, P] = x(N, { forceMount: void 0 }),
    S = (e) => {
      let { __scopeHoverCard: t, forceMount: n, children: a, container: i } = e,
        l = v(N, t);
      return (0, r.jsx)(C, {
        scope: t,
        forceMount: n,
        children: (0, r.jsx)(f.f, {
          present: n || l.open,
          children: (0, r.jsx)(c.f, { asChild: !0, container: i, children: a }),
        }),
      });
    };
  S.displayName = N;
  var R = "HoverCardContent",
    _ = a.forwardRef((e, t) => {
      let n = P(R, e.__scopeHoverCard),
        { forceMount: a = n.forceMount, ...l } = e,
        o = v(R, e.__scopeHoverCard);
      return (0, r.jsx)(f.f, {
        present: a || o.open,
        children: (0, r.jsx)(E, {
          "data-state": o.open ? "open" : "closed",
          ...l,
          onPointerEnter: (0, i.f)(e.onPointerEnter, F(o.onOpen)),
          onPointerLeave: (0, i.f)(e.onPointerLeave, F(o.onClose)),
          ref: t,
        }),
      });
    });
  _.displayName = R;
  var E = a.forwardRef((e, n) => {
    let {
        __scopeHoverCard: l,
        onEscapeKeyDown: o,
        onPointerDownOutside: c,
        onFocusOutside: f,
        onInteractOutside: u,
        ...p
      } = e,
      x = v(R, l),
      h = y(l),
      g = a.useRef(null),
      w = (0, s.j)(n, g),
      [b, j] = a.useState(!1);
    return (
      a.useEffect(() => {
        if (b) {
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
      }, [b]),
      a.useEffect(() => {
        if (g.current) {
          let e = () => {
            (j(!1),
              (x.isPointerDownOnContentRef.current = !1),
              setTimeout(() => {
                document.getSelection()?.toString() !== "" &&
                  (x.hasSelectionRef.current = !0);
              }));
          };
          return (
            document.addEventListener("pointerup", e),
            () => {
              (document.removeEventListener("pointerup", e),
                (x.hasSelectionRef.current = !1),
                (x.isPointerDownOnContentRef.current = !1));
            }
          );
        }
      }, [x.isPointerDownOnContentRef, x.hasSelectionRef]),
      a.useEffect(() => {
        g.current &&
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
          })(g.current).forEach((e) => e.setAttribute("tabindex", "-1"));
      }),
      (0, r.jsx)(m.f, {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onInteractOutside: u,
        onEscapeKeyDown: o,
        onPointerDownOutside: c,
        onFocusOutside: (0, i.f)(f, (e) => {
          e.preventDefault();
        }),
        onDismiss: x.onDismiss,
        children: (0, r.jsx)(d.c, {
          ...h,
          ...p,
          onPointerDown: (0, i.f)(p.onPointerDown, (e) => {
            (e.currentTarget.contains(e.target) && j(!0),
              (x.hasSelectionRef.current = !1),
              (x.isPointerDownOnContentRef.current = !0));
          }),
          ref: w,
          style: {
            ...p.style,
            userSelect: b ? "text" : void 0,
            WebkitUserSelect: b ? "text" : void 0,
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
  function F(e) {
    return (t) => ("touch" === t.pointerType ? void 0 : e());
  }
  a.forwardRef((e, t) => {
    let { __scopeHoverCard: n, ...a } = e,
      i = y(n);
    return (0, r.jsx)(d.j, { ...i, ...a, ref: t });
  }).displayName = "HoverCardArrow";
  var $ = e.i(426091),
    A = e.i(360827);
  let T = a.forwardRef((e, t) => {
    let a,
      i,
      l,
      o,
      s,
      d,
      c = (0, n.c)(13);
    c[0] !== e
      ? (({ className: a, align: l, sideOffset: o, ...i } = e),
        (c[0] = e),
        (c[1] = a),
        (c[2] = i),
        (c[3] = l),
        (c[4] = o))
      : ((a = c[1]), (i = c[2]), (l = c[3]), (o = c[4]));
    let f = void 0 === l ? "center" : l,
      u = void 0 === o ? 4 : o;
    return (
      c[5] !== a
        ? ((s = (0, $.c)(
            "z-50 w-80 origin-[--radix-hover-card-content-transform-origin] p-0 outline-none",
            A.V,
            a,
          )),
          (c[5] = a),
          (c[6] = s))
        : (s = c[6]),
      c[7] !== f || c[8] !== i || c[9] !== t || c[10] !== u || c[11] !== s
        ? ((d = (0, r.jsx)(S, {
            children: (0, r.jsx)(_, {
              ref: t,
              align: f,
              sideOffset: u,
              className: s,
              ...i,
            }),
          })),
          (c[7] = f),
          (c[8] = i),
          (c[9] = t),
          (c[10] = u),
          (c[11] = s),
          (c[12] = d))
        : (d = c[12]),
      d
    );
  });
  ((T.displayName = _.displayName),
    e.s(["c", 0, w, "P", 0, T, "b", 0, j], 598883),
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
                    d = n?.[e]?.[o] || l,
                    c = a.useMemo(() => s, Object.values(s));
                  return (0, r.jsx)(d.Provider, { value: c, children: i });
                };
                return (
                  (s.displayName = t + "Provider"),
                  [
                    s,
                    function (r, n) {
                      let s = n?.[e]?.[o] || l,
                        d = a.useContext(s);
                      if (d) return d;
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
