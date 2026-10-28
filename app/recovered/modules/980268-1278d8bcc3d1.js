// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(745018),
    o = e.i(352386),
    i = e.i(144977),
    a = e.i(156207),
    s = e.i(775453),
    l = e.i(534643),
    d = e.i(337755),
    u = e.i(853233),
    c = e.i(406657),
    f = e.i(362275),
    p = "Checkbox",
    [m, v] = (0, a.c)(p),
    [h, y] = m(p),
    g = o.forwardRef((e, r) => {
      let {
          __scopeCheckbox: n,
          name: a,
          checked: d,
          defaultChecked: u,
          required: c,
          disabled: m,
          value: v = "on",
          onCheckedChange: y,
          form: g,
          ...b
        } = e,
        [x, j] = o.useState(null),
        O = (0, i.j)(r, (e) => j(e)),
        P = o.useRef(!1),
        N = !x || g || !!x.closest("form"),
        [R, A] = (0, l.f)({
          prop: d,
          defaultProp: u ?? !1,
          onChange: y,
          caller: p,
        }),
        D = o.useRef(R);
      return (
        o.useEffect(() => {
          let e = x?.form;
          if (e) {
            let t = () => A(D.current);
            return (
              e.addEventListener("reset", t),
              () => e.removeEventListener("reset", t)
            );
          }
        }, [x, A]),
        (0, t.jsxs)(h, {
          scope: n,
          state: R,
          disabled: m,
          children: [
            (0, t.jsx)(f.V.button, {
              type: "button",
              role: "checkbox",
              "aria-checked": E(R) ? "mixed" : R,
              "aria-required": c,
              "data-state": C(R),
              "data-disabled": m ? "" : void 0,
              disabled: m,
              value: v,
              ...b,
              ref: O,
              onKeyDown: (0, s.f)(e.onKeyDown, (e) => {
                "Enter" === e.key && e.preventDefault();
              }),
              onClick: (0, s.f)(e.onClick, (e) => {
                (A((e) => !!E(e) || !e),
                  N &&
                    ((P.current = e.isPropagationStopped()),
                    P.current || e.stopPropagation()));
              }),
            }),
            N &&
              (0, t.jsx)(w, {
                control: x,
                bubbles: !P.current,
                name: a,
                value: v,
                checked: R,
                required: c,
                disabled: m,
                form: g,
                style: { transform: "translateX(-100%)" },
                defaultChecked: !E(u) && u,
              }),
          ],
        })
      );
    });
  g.displayName = p;
  var b = "CheckboxIndicator",
    x = o.forwardRef((e, r) => {
      let { __scopeCheckbox: n, forceMount: o, ...i } = e,
        a = y(b, n);
      return (0, t.jsx)(c.f, {
        present: o || E(a.state) || !0 === a.state,
        children: (0, t.jsx)(f.V.span, {
          "data-state": C(a.state),
          "data-disabled": a.disabled ? "" : void 0,
          ...i,
          ref: r,
          style: { pointerEvents: "none", ...e.style },
        }),
      });
    });
  x.displayName = b;
  var w = o.forwardRef(
    (
      {
        __scopeCheckbox: e,
        control: r,
        checked: n,
        bubbles: a = !0,
        defaultChecked: s,
        ...l
      },
      c,
    ) => {
      let p = o.useRef(null),
        m = (0, i.j)(p, c),
        v = (0, d.f)(n),
        h = (0, u.f)(r);
      o.useEffect(() => {
        let e = p.current;
        if (!e) return;
        let t = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "checked",
        ).set;
        if (v !== n && t) {
          let r = new Event("click", { bubbles: a });
          ((e.indeterminate = E(n)), t.call(e, !E(n) && n), e.dispatchEvent(r));
        }
      }, [v, n, a]);
      let y = o.useRef(!E(n) && n);
      return (0, t.jsx)(f.V.input, {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: s ?? y.current,
        ...l,
        tabIndex: -1,
        ref: m,
        style: {
          ...l.style,
          ...h,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
        },
      });
    },
  );
  function E(e) {
    return "indeterminate" === e;
  }
  function C(e) {
    return E(e) ? "indeterminate" : e ? "checked" : "unchecked";
  }
  w.displayName = "CheckboxBubbleInput";
  var j = e.i(426091);
  let O = o.forwardRef((e, o) => {
    let i,
      a,
      s,
      l,
      d,
      u = (0, r.c)(10);
    return (
      u[0] !== e
        ? (({ className: i, ...a } = e), (u[0] = e), (u[1] = i), (u[2] = a))
        : ((i = u[1]), (a = u[2])),
      u[3] !== i
        ? ((s = (0, j.c)(
            "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
            i,
          )),
          (u[3] = i),
          (u[4] = s))
        : (s = u[4]),
      u[5] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = (0, t.jsx)(x, {
            className: (0, j.c)(
              "flex items-center justify-center text-current",
            ),
            children: (0, t.jsx)(n.sX, { className: "h-4 w-4" }),
          })),
          (u[5] = l))
        : (l = u[5]),
      u[6] !== a || u[7] !== o || u[8] !== s
        ? ((d = (0, t.jsx)(g, { ref: o, className: s, ...a, children: l })),
          (u[6] = a),
          (u[7] = o),
          (u[8] = s),
          (u[9] = d))
        : (d = u[9]),
      d
    );
  });
  ((O.displayName = g.displayName), e.s(["f", 0, O], 980268));
};
