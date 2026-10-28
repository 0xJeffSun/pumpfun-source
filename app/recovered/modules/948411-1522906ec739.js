// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(775453),
    a = e.i(156207),
    i = e.i(291132),
    l = e.i(406657),
    n = e.i(362275),
    o = e.i(770460),
    s = e.i(534643),
    d = e.i(461194),
    c = e.i(732486),
    u = "Tabs",
    [f, m] = (0, a.c)(u, [i.B]),
    p = (0, i.B)(),
    [b, h] = f(u),
    v = t.forwardRef((e, t) => {
      let {
          __scopeTabs: r,
          value: a,
          onValueChange: i,
          defaultValue: l,
          orientation: f = "horizontal",
          dir: m,
          activationMode: p = "automatic",
          ...h
        } = e,
        v = (0, o.f)(m),
        [x, g] = (0, s.f)({
          prop: a,
          onChange: i,
          defaultProp: l ?? "",
          caller: u,
        });
      return (0, c.jsx)(b, {
        scope: r,
        baseId: (0, d.f)(),
        value: x,
        onValueChange: g,
        orientation: f,
        dir: v,
        activationMode: p,
        children: (0, c.jsx)(n.V.div, {
          dir: v,
          "data-orientation": f,
          ...h,
          ref: t,
        }),
      });
    });
  v.displayName = u;
  var x = "TabsList",
    g = t.forwardRef((e, t) => {
      let { __scopeTabs: r, loop: a = !0, ...l } = e,
        o = h(x, r),
        s = p(r);
      return (0, c.jsx)(i.F, {
        asChild: !0,
        ...s,
        orientation: o.orientation,
        dir: o.dir,
        loop: a,
        children: (0, c.jsx)(n.V.div, {
          role: "tablist",
          "aria-orientation": o.orientation,
          ...l,
          ref: t,
        }),
      });
    });
  g.displayName = x;
  var y = "TabsTrigger",
    w = t.forwardRef((e, t) => {
      let { __scopeTabs: a, value: l, disabled: o = !1, ...s } = e,
        d = h(y, a),
        u = p(a),
        f = R(d.baseId, l),
        m = k(d.baseId, l),
        b = l === d.value;
      return (0, c.jsx)(i.M, {
        asChild: !0,
        ...u,
        focusable: !o,
        active: b,
        children: (0, c.jsx)(n.V.button, {
          type: "button",
          role: "tab",
          "aria-selected": b,
          "aria-controls": m,
          "data-state": b ? "active" : "inactive",
          "data-disabled": o ? "" : void 0,
          disabled: o,
          id: f,
          ...s,
          ref: t,
          onMouseDown: (0, r.f)(e.onMouseDown, (e) => {
            o || 0 !== e.button || !1 !== e.ctrlKey
              ? e.preventDefault()
              : d.onValueChange(l);
          }),
          onKeyDown: (0, r.f)(e.onKeyDown, (e) => {
            [" ", "Enter"].includes(e.key) && d.onValueChange(l);
          }),
          onFocus: (0, r.f)(e.onFocus, () => {
            let e = "manual" !== d.activationMode;
            b || o || !e || d.onValueChange(l);
          }),
        }),
      });
    });
  w.displayName = y;
  var j = "TabsContent",
    N = t.forwardRef((e, r) => {
      let { __scopeTabs: a, value: i, forceMount: o, children: s, ...d } = e,
        u = h(j, a),
        f = R(u.baseId, i),
        m = k(u.baseId, i),
        p = i === u.value,
        b = t.useRef(p);
      return (
        t.useEffect(() => {
          let e = requestAnimationFrame(() => (b.current = !1));
          return () => cancelAnimationFrame(e);
        }, []),
        (0, c.jsx)(l.f, {
          present: o || p,
          children: ({ present: t }) =>
            (0, c.jsx)(n.V.div, {
              "data-state": p ? "active" : "inactive",
              "data-orientation": u.orientation,
              role: "tabpanel",
              "aria-labelledby": f,
              hidden: !t,
              id: m,
              tabIndex: 0,
              ...d,
              ref: r,
              style: {
                ...e.style,
                animationDuration: b.current ? "0s" : void 0,
              },
              children: t && s,
            }),
        })
      );
    });
  function R(e, t) {
    return `${e}-trigger-${t}`;
  }
  function k(e, t) {
    return `${e}-content-${t}`;
  }
  ((N.displayName = j),
    e.s(["Content", 0, N, "List", 0, g, "Root", 0, v, "Trigger", 0, w]));
};
