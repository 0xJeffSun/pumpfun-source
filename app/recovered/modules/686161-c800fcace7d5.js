// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(291967),
    n = e.i(156207),
    a = e.i(534643),
    i = e.i(127864),
    o = e.i(144977),
    s = e.i(556872),
    l = e.i(653747),
    u = e.i(461194),
    c = e.i(732486),
    d = "Collapsible",
    [f, m] = (0, n.c)(d),
    [h, p] = f(d),
    w = t.forwardRef((e, r) => {
      let {
          __scopeCollapsible: n,
          open: i,
          defaultOpen: o,
          disabled: l,
          onOpenChange: f,
          ...m
        } = e,
        [p, w] = (0, a.f)({
          prop: i,
          defaultProp: o ?? !1,
          onChange: f,
          caller: d,
        });
      return (0, c.jsx)(h, {
        scope: n,
        disabled: l,
        contentId: (0, u.f)(),
        open: p,
        onOpenToggle: t.useCallback(() => w((e) => !e), [w]),
        children: (0, c.jsx)(s.V.div, {
          "data-state": _(p),
          "data-disabled": l ? "" : void 0,
          ...m,
          ref: r,
        }),
      });
    });
  w.displayName = d;
  var y = "CollapsibleTrigger",
    b = t.forwardRef((e, t) => {
      let { __scopeCollapsible: n, ...a } = e,
        i = p(y, n);
      return (0, c.jsx)(s.V.button, {
        type: "button",
        "aria-controls": i.contentId,
        "aria-expanded": i.open || !1,
        "data-state": _(i.open),
        "data-disabled": i.disabled ? "" : void 0,
        disabled: i.disabled,
        ...a,
        ref: t,
        onClick: (0, r.f)(e.onClick, i.onOpenToggle),
      });
    });
  b.displayName = y;
  var g = "CollapsibleContent",
    x = t.forwardRef((e, t) => {
      let { forceMount: r, ...n } = e,
        a = p(g, e.__scopeCollapsible);
      return (0, c.jsx)(l.f, {
        present: r || a.open,
        children: ({ present: e }) =>
          (0, c.jsx)(v, { ...n, ref: t, present: e }),
      });
    });
  x.displayName = g;
  var v = t.forwardRef((e, r) => {
    let { __scopeCollapsible: n, present: a, children: l, ...u } = e,
      d = p(g, n),
      [f, m] = t.useState(a),
      h = t.useRef(null),
      w = (0, o.j)(r, h),
      y = t.useRef(0),
      b = y.current,
      x = t.useRef(0),
      v = x.current,
      k = d.open || f,
      E = t.useRef(k),
      N = t.useRef(void 0);
    return (
      t.useEffect(() => {
        let e = requestAnimationFrame(() => (E.current = !1));
        return () => cancelAnimationFrame(e);
      }, []),
      (0, i.f)(() => {
        let e = h.current;
        if (e) {
          ((N.current = N.current || {
            transitionDuration: e.style.transitionDuration,
            animationName: e.style.animationName,
          }),
            (e.style.transitionDuration = "0s"),
            (e.style.animationName = "none"));
          let t = e.getBoundingClientRect();
          ((y.current = t.height),
            (x.current = t.width),
            E.current ||
              ((e.style.transitionDuration = N.current.transitionDuration),
              (e.style.animationName = N.current.animationName)),
            m(a));
        }
      }, [d.open, a]),
      (0, c.jsx)(s.V.div, {
        "data-state": _(d.open),
        "data-disabled": d.disabled ? "" : void 0,
        id: d.contentId,
        hidden: !k,
        ...u,
        ref: w,
        style: {
          "--radix-collapsible-content-height": b ? `${b}px` : void 0,
          "--radix-collapsible-content-width": v ? `${v}px` : void 0,
          ...e.style,
        },
        children: k && l,
      })
    );
  });
  function _(e) {
    return e ? "open" : "closed";
  }
  e.s(["C", 0, x, "v", 0, b, "c", 0, x, "F", 0, w, "d", 0, b, "z", 0, m]);
};
