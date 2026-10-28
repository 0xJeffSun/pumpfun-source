// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(527069),
    n = e.i(775453),
    i = e.i(144977),
    s = e.i(156207),
    a = e.i(534643),
    o = e.i(770460),
    l = e.i(337755),
    u = e.i(853233),
    d = e.i(556872),
    c = e.i(357784),
    f = e.i(732486),
    m = ["PageUp", "PageDown"],
    p = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
    w = {
      "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
      "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
      "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
      "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"],
    },
    g = "Slider",
    [b, h, v] = (0, c.f)(g),
    [y, x] = (0, s.c)(g, [v]),
    [S, N] = y(g),
    E = t.forwardRef((e, i) => {
      let {
          name: s,
          min: o = 0,
          max: l = 100,
          step: u = 1,
          orientation: d = "horizontal",
          disabled: c = !1,
          minStepsBetweenThumbs: w = 0,
          defaultValue: g = [o],
          value: h,
          onValueChange: v = () => {},
          onValueCommit: y = () => {},
          inverted: x = !1,
          form: N,
          ...E
        } = e,
        j = t.useRef(new Set()),
        I = t.useRef(0),
        _ = "horizontal" === d,
        [L = [], T] = (0, a.f)({
          prop: h,
          defaultProp: g,
          onChange: (e) => {
            let t = [...j.current];
            (t[I.current]?.focus(), v(e));
          },
        }),
        O = t.useRef(L);
      function D(e, t, { commit: n } = { commit: !1 }) {
        let i,
          s = (String(u).split(".")[1] || "").length,
          a =
            Math.round(
              (Math.round((e - o) / u) * u + o) * (i = Math.pow(10, s)),
            ) / i,
          d = (0, r.f)(a, [o, l]);
        T((e = []) => {
          let r = (function (e = [], t, r) {
            let n = [...e];
            return ((n[r] = t), n.sort((e, t) => e - t));
          })(e, d, t);
          if (
            !(function (e, t) {
              if (t > 0)
                return (
                  Math.min(...e.slice(0, -1).map((t, r) => e[r + 1] - t)) >= t
                );
              return !0;
            })(r, w * u)
          )
            return e;
          {
            I.current = r.indexOf(d);
            let t = String(r) !== String(e);
            return (t && n && y(r), t ? r : e);
          }
        });
      }
      return (0, f.jsx)(S, {
        scope: e.__scopeSlider,
        name: s,
        disabled: c,
        min: o,
        max: l,
        valueIndexToChangeRef: I,
        thumbs: j.current,
        values: L,
        orientation: d,
        form: N,
        children: (0, f.jsx)(b.Provider, {
          scope: e.__scopeSlider,
          children: (0, f.jsx)(b.Slot, {
            scope: e.__scopeSlider,
            children: (0, f.jsx)(_ ? R : A, {
              "aria-disabled": c,
              "data-disabled": c ? "" : void 0,
              ...E,
              ref: i,
              onPointerDown: (0, n.f)(E.onPointerDown, () => {
                c || (O.current = L);
              }),
              min: o,
              max: l,
              inverted: x,
              onSlideStart: c
                ? void 0
                : function (e) {
                    let t = (function (e, t) {
                      if (1 === e.length) return 0;
                      let r = e.map((e) => Math.abs(e - t)),
                        n = Math.min(...r);
                      return r.indexOf(n);
                    })(L, e);
                    D(e, t);
                  },
              onSlideMove: c
                ? void 0
                : function (e) {
                    D(e, I.current);
                  },
              onSlideEnd: c
                ? void 0
                : function () {
                    let e = O.current[I.current];
                    L[I.current] !== e && y(L);
                  },
              onHomeKeyDown: () => !c && D(o, 0, { commit: !0 }),
              onEndKeyDown: () => !c && D(l, L.length - 1, { commit: !0 }),
              onStepKeyDown: ({ event: e, direction: t }) => {
                if (!c) {
                  let r =
                      m.includes(e.key) || (e.shiftKey && p.includes(e.key)),
                    n = I.current;
                  D(L[n] + u * (r ? 10 : 1) * t, n, { commit: !0 });
                }
              },
            }),
          }),
        }),
      });
    });
  E.displayName = g;
  var [j, I] = y(g, {
      startEdge: "left",
      endEdge: "right",
      size: "width",
      direction: 1,
    }),
    R = t.forwardRef((e, r) => {
      let {
          min: n,
          max: s,
          dir: a,
          inverted: l,
          onSlideStart: u,
          onSlideMove: d,
          onSlideEnd: c,
          onStepKeyDown: m,
          ...p
        } = e,
        [g, b] = t.useState(null),
        h = (0, i.j)(r, (e) => b(e)),
        v = t.useRef(void 0),
        y = (0, o.f)(a),
        x = "ltr" === y,
        S = (x && !l) || (!x && l);
      function N(e) {
        let t = v.current || g.getBoundingClientRect(),
          r = F([0, t.width], S ? [n, s] : [s, n]);
        return ((v.current = t), r(e - t.left));
      }
      return (0, f.jsx)(j, {
        scope: e.__scopeSlider,
        startEdge: S ? "left" : "right",
        endEdge: S ? "right" : "left",
        direction: S ? 1 : -1,
        size: "width",
        children: (0, f.jsx)(_, {
          dir: y,
          "data-orientation": "horizontal",
          ...p,
          ref: h,
          style: {
            ...p.style,
            "--radix-slider-thumb-transform": "translateX(-50%)",
          },
          onSlideStart: (e) => {
            let t = N(e.clientX);
            u?.(t);
          },
          onSlideMove: (e) => {
            let t = N(e.clientX);
            d?.(t);
          },
          onSlideEnd: () => {
            ((v.current = void 0), c?.());
          },
          onStepKeyDown: (e) => {
            let t = w[S ? "from-left" : "from-right"].includes(e.key);
            m?.({ event: e, direction: t ? -1 : 1 });
          },
        }),
      });
    }),
    A = t.forwardRef((e, r) => {
      let {
          min: n,
          max: s,
          inverted: a,
          onSlideStart: o,
          onSlideMove: l,
          onSlideEnd: u,
          onStepKeyDown: d,
          ...c
        } = e,
        m = t.useRef(null),
        p = (0, i.j)(r, m),
        g = t.useRef(void 0),
        b = !a;
      function h(e) {
        let t = g.current || m.current.getBoundingClientRect(),
          r = F([0, t.height], b ? [s, n] : [n, s]);
        return ((g.current = t), r(e - t.top));
      }
      return (0, f.jsx)(j, {
        scope: e.__scopeSlider,
        startEdge: b ? "bottom" : "top",
        endEdge: b ? "top" : "bottom",
        size: "height",
        direction: b ? 1 : -1,
        children: (0, f.jsx)(_, {
          "data-orientation": "vertical",
          ...c,
          ref: p,
          style: {
            ...c.style,
            "--radix-slider-thumb-transform": "translateY(50%)",
          },
          onSlideStart: (e) => {
            let t = h(e.clientY);
            o?.(t);
          },
          onSlideMove: (e) => {
            let t = h(e.clientY);
            l?.(t);
          },
          onSlideEnd: () => {
            ((g.current = void 0), u?.());
          },
          onStepKeyDown: (e) => {
            let t = w[b ? "from-bottom" : "from-top"].includes(e.key);
            d?.({ event: e, direction: t ? -1 : 1 });
          },
        }),
      });
    }),
    _ = t.forwardRef((e, t) => {
      let {
          __scopeSlider: r,
          onSlideStart: i,
          onSlideMove: s,
          onSlideEnd: a,
          onHomeKeyDown: o,
          onEndKeyDown: l,
          onStepKeyDown: u,
          ...c
        } = e,
        w = N(g, r);
      return (0, f.jsx)(d.V.span, {
        ...c,
        ref: t,
        onKeyDown: (0, n.f)(e.onKeyDown, (e) => {
          "Home" === e.key
            ? (o(e), e.preventDefault())
            : "End" === e.key
              ? (l(e), e.preventDefault())
              : m.concat(p).includes(e.key) && (u(e), e.preventDefault());
        }),
        onPointerDown: (0, n.f)(e.onPointerDown, (e) => {
          let t = e.target;
          (t.setPointerCapture(e.pointerId),
            e.preventDefault(),
            w.thumbs.has(t) ? t.focus() : i(e));
        }),
        onPointerMove: (0, n.f)(e.onPointerMove, (e) => {
          e.target.hasPointerCapture(e.pointerId) && s(e);
        }),
        onPointerUp: (0, n.f)(e.onPointerUp, (e) => {
          let t = e.target;
          t.hasPointerCapture(e.pointerId) &&
            (t.releasePointerCapture(e.pointerId), a(e));
        }),
      });
    }),
    L = "SliderTrack",
    T = t.forwardRef((e, t) => {
      let { __scopeSlider: r, ...n } = e,
        i = N(L, r);
      return (0, f.jsx)(d.V.span, {
        "data-disabled": i.disabled ? "" : void 0,
        "data-orientation": i.orientation,
        ...n,
        ref: t,
      });
    });
  T.displayName = L;
  var O = "SliderRange",
    D = t.forwardRef((e, r) => {
      let { __scopeSlider: n, ...s } = e,
        a = N(O, n),
        o = I(O, n),
        l = t.useRef(null),
        u = (0, i.j)(r, l),
        c = a.values.length,
        m = a.values.map((e) => C(e, a.min, a.max)),
        p = c > 1 ? Math.min(...m) : 0,
        w = 100 - Math.max(...m);
      return (0, f.jsx)(d.V.span, {
        "data-orientation": a.orientation,
        "data-disabled": a.disabled ? "" : void 0,
        ...s,
        ref: u,
        style: { ...e.style, [o.startEdge]: p + "%", [o.endEdge]: w + "%" },
      });
    });
  D.displayName = O;
  var M = "SliderThumb",
    P = t.forwardRef((e, r) => {
      let n = h(e.__scopeSlider),
        [s, a] = t.useState(null),
        o = (0, i.j)(r, (e) => a(e)),
        l = t.useMemo(
          () => (s ? n().findIndex((e) => e.ref.current === s) : -1),
          [n, s],
        );
      return (0, f.jsx)(k, { ...e, ref: o, index: l });
    }),
    k = t.forwardRef((e, r) => {
      var s, a, o, l, c;
      let m,
        p,
        { __scopeSlider: w, index: g, name: h, ...v } = e,
        y = N(M, w),
        x = I(M, w),
        [S, E] = t.useState(null),
        j = (0, i.j)(r, (e) => E(e)),
        R = !S || y.form || !!S.closest("form"),
        A = (0, u.f)(S),
        _ = y.values[g],
        L = void 0 === _ ? 0 : C(_, y.min, y.max),
        T =
          ((s = g),
          (a = y.values.length) > 2
            ? `Value ${s + 1} of ${a}`
            : 2 === a
              ? ["Minimum", "Maximum"][s]
              : void 0),
        O = A?.[x.size],
        D = O
          ? ((o = O),
            (l = L),
            (c = x.direction),
            (p = F([0, 50], [0, (m = o / 2)])),
            (m - p(l) * c) * c)
          : 0;
      return (
        t.useEffect(() => {
          if (S)
            return (
              y.thumbs.add(S),
              () => {
                y.thumbs.delete(S);
              }
            );
        }, [S, y.thumbs]),
        (0, f.jsxs)("span", {
          style: {
            transform: "var(--radix-slider-thumb-transform)",
            position: "absolute",
            [x.startEdge]: `calc(${L}% + ${D}px)`,
          },
          children: [
            (0, f.jsx)(b.ItemSlot, {
              scope: e.__scopeSlider,
              children: (0, f.jsx)(d.V.span, {
                role: "slider",
                "aria-label": e["aria-label"] || T,
                "aria-valuemin": y.min,
                "aria-valuenow": _,
                "aria-valuemax": y.max,
                "aria-orientation": y.orientation,
                "data-orientation": y.orientation,
                "data-disabled": y.disabled ? "" : void 0,
                tabIndex: y.disabled ? void 0 : 0,
                ...v,
                ref: j,
                style: void 0 === _ ? { display: "none" } : e.style,
                onFocus: (0, n.f)(e.onFocus, () => {
                  y.valueIndexToChangeRef.current = g;
                }),
              }),
            }),
            R &&
              (0, f.jsx)(
                U,
                {
                  name:
                    h ??
                    (y.name
                      ? y.name + (y.values.length > 1 ? "[]" : "")
                      : void 0),
                  form: y.form,
                  value: _,
                },
                g,
              ),
          ],
        })
      );
    });
  P.displayName = M;
  var U = t.forwardRef(({ __scopeSlider: e, value: r, ...n }, s) => {
    let a = t.useRef(null),
      o = (0, i.j)(a, s),
      u = (0, l.f)(r);
    return (
      t.useEffect(() => {
        let e = a.current;
        if (!e) return;
        let t = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value",
        ).set;
        if (u !== r && t) {
          let n = new Event("input", { bubbles: !0 });
          (t.call(e, r), e.dispatchEvent(n));
        }
      }, [u, r]),
      (0, f.jsx)(d.V.input, {
        style: { display: "none" },
        ...n,
        ref: o,
        defaultValue: r,
      })
    );
  });
  function C(e, t, n) {
    return (0, r.f)((100 / (n - t)) * (e - t), [0, 100]);
  }
  function F(e, t) {
    return (r) => {
      if (e[0] === e[1] || t[0] === t[1]) return t[0];
      let n = (t[1] - t[0]) / (e[1] - e[0]);
      return t[0] + n * (r - e[0]);
    };
  }
  ((U.displayName = "RadioBubbleInput"),
    e.s(["h", 0, D, "F", 0, E, "w", 0, P, "m", 0, T]));
};
