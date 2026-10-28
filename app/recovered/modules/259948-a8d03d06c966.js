// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    l = e.i(527069),
    r = e.i(775453),
    n = e.i(144977),
    i = e.i(156207),
    a = e.i(534643),
    s = e.i(770460),
    o = e.i(337755),
    c = e.i(853233),
    d = e.i(556872),
    u = e.i(357784),
    m = e.i(732486),
    f = ["PageUp", "PageDown"],
    x = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
    h = {
      "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
      "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
      "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
      "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"],
    },
    p = "Slider",
    [g, b, v] = (0, u.f)(p),
    [y, _] = (0, i.c)(p, [v]),
    [j, w] = y(p),
    N = t.forwardRef((e, n) => {
      let {
          name: i,
          min: s = 0,
          max: o = 100,
          step: c = 1,
          orientation: d = "horizontal",
          disabled: u = !1,
          minStepsBetweenThumbs: h = 0,
          defaultValue: p = [s],
          value: b,
          onValueChange: v = () => {},
          onValueCommit: y = () => {},
          inverted: _ = !1,
          form: w,
          ...N
        } = e,
        k = t.useRef(new Set()),
        S = t.useRef(0),
        I = "horizontal" === d,
        [P = [], E] = (0, a.f)({
          prop: b,
          defaultProp: p,
          onChange: (e) => {
            let t = [...k.current];
            (t[S.current]?.focus(), v(e));
          },
        }),
        A = t.useRef(P);
      function $(e, t, { commit: r } = { commit: !1 }) {
        let n,
          i = (String(c).split(".")[1] || "").length,
          a =
            Math.round(
              (Math.round((e - s) / c) * c + s) * (n = Math.pow(10, i)),
            ) / n,
          d = (0, l.f)(a, [s, o]);
        E((e = []) => {
          let l = (function (e = [], t, l) {
            let r = [...e];
            return ((r[l] = t), r.sort((e, t) => e - t));
          })(e, d, t);
          if (
            !(function (e, t) {
              if (t > 0)
                return (
                  Math.min(...e.slice(0, -1).map((t, l) => e[l + 1] - t)) >= t
                );
              return !0;
            })(l, h * c)
          )
            return e;
          {
            S.current = l.indexOf(d);
            let t = String(l) !== String(e);
            return (t && r && y(l), t ? l : e);
          }
        });
      }
      return (0, m.jsx)(j, {
        scope: e.__scopeSlider,
        name: i,
        disabled: u,
        min: s,
        max: o,
        valueIndexToChangeRef: S,
        thumbs: k.current,
        values: P,
        orientation: d,
        form: w,
        children: (0, m.jsx)(g.Provider, {
          scope: e.__scopeSlider,
          children: (0, m.jsx)(g.Slot, {
            scope: e.__scopeSlider,
            children: (0, m.jsx)(I ? C : M, {
              "aria-disabled": u,
              "data-disabled": u ? "" : void 0,
              ...N,
              ref: n,
              onPointerDown: (0, r.f)(N.onPointerDown, () => {
                u || (A.current = P);
              }),
              min: s,
              max: o,
              inverted: _,
              onSlideStart: u
                ? void 0
                : function (e) {
                    let t = (function (e, t) {
                      if (1 === e.length) return 0;
                      let l = e.map((e) => Math.abs(e - t)),
                        r = Math.min(...l);
                      return l.indexOf(r);
                    })(P, e);
                    $(e, t);
                  },
              onSlideMove: u
                ? void 0
                : function (e) {
                    $(e, S.current);
                  },
              onSlideEnd: u
                ? void 0
                : function () {
                    let e = A.current[S.current];
                    P[S.current] !== e && y(P);
                  },
              onHomeKeyDown: () => !u && $(s, 0, { commit: !0 }),
              onEndKeyDown: () => !u && $(o, P.length - 1, { commit: !0 }),
              onStepKeyDown: ({ event: e, direction: t }) => {
                if (!u) {
                  let l =
                      f.includes(e.key) || (e.shiftKey && x.includes(e.key)),
                    r = S.current;
                  $(P[r] + c * (l ? 10 : 1) * t, r, { commit: !0 });
                }
              },
            }),
          }),
        }),
      });
    });
  N.displayName = p;
  var [k, S] = y(p, {
      startEdge: "left",
      endEdge: "right",
      size: "width",
      direction: 1,
    }),
    C = t.forwardRef((e, l) => {
      let {
          min: r,
          max: i,
          dir: a,
          inverted: o,
          onSlideStart: c,
          onSlideMove: d,
          onSlideEnd: u,
          onStepKeyDown: f,
          ...x
        } = e,
        [p, g] = t.useState(null),
        b = (0, n.j)(l, (e) => g(e)),
        v = t.useRef(void 0),
        y = (0, s.f)(a),
        _ = "ltr" === y,
        j = (_ && !o) || (!_ && o);
      function w(e) {
        let t = v.current || p.getBoundingClientRect(),
          l = L([0, t.width], j ? [r, i] : [i, r]);
        return ((v.current = t), l(e - t.left));
      }
      return (0, m.jsx)(k, {
        scope: e.__scopeSlider,
        startEdge: j ? "left" : "right",
        endEdge: j ? "right" : "left",
        direction: j ? 1 : -1,
        size: "width",
        children: (0, m.jsx)(I, {
          dir: y,
          "data-orientation": "horizontal",
          ...x,
          ref: b,
          style: {
            ...x.style,
            "--radix-slider-thumb-transform": "translateX(-50%)",
          },
          onSlideStart: (e) => {
            let t = w(e.clientX);
            c?.(t);
          },
          onSlideMove: (e) => {
            let t = w(e.clientX);
            d?.(t);
          },
          onSlideEnd: () => {
            ((v.current = void 0), u?.());
          },
          onStepKeyDown: (e) => {
            let t = h[j ? "from-left" : "from-right"].includes(e.key);
            f?.({ event: e, direction: t ? -1 : 1 });
          },
        }),
      });
    }),
    M = t.forwardRef((e, l) => {
      let {
          min: r,
          max: i,
          inverted: a,
          onSlideStart: s,
          onSlideMove: o,
          onSlideEnd: c,
          onStepKeyDown: d,
          ...u
        } = e,
        f = t.useRef(null),
        x = (0, n.j)(l, f),
        p = t.useRef(void 0),
        g = !a;
      function b(e) {
        let t = p.current || f.current.getBoundingClientRect(),
          l = L([0, t.height], g ? [i, r] : [r, i]);
        return ((p.current = t), l(e - t.top));
      }
      return (0, m.jsx)(k, {
        scope: e.__scopeSlider,
        startEdge: g ? "bottom" : "top",
        endEdge: g ? "top" : "bottom",
        size: "height",
        direction: g ? 1 : -1,
        children: (0, m.jsx)(I, {
          "data-orientation": "vertical",
          ...u,
          ref: x,
          style: {
            ...u.style,
            "--radix-slider-thumb-transform": "translateY(50%)",
          },
          onSlideStart: (e) => {
            let t = b(e.clientY);
            s?.(t);
          },
          onSlideMove: (e) => {
            let t = b(e.clientY);
            o?.(t);
          },
          onSlideEnd: () => {
            ((p.current = void 0), c?.());
          },
          onStepKeyDown: (e) => {
            let t = h[g ? "from-bottom" : "from-top"].includes(e.key);
            d?.({ event: e, direction: t ? -1 : 1 });
          },
        }),
      });
    }),
    I = t.forwardRef((e, t) => {
      let {
          __scopeSlider: l,
          onSlideStart: n,
          onSlideMove: i,
          onSlideEnd: a,
          onHomeKeyDown: s,
          onEndKeyDown: o,
          onStepKeyDown: c,
          ...u
        } = e,
        h = w(p, l);
      return (0, m.jsx)(d.V.span, {
        ...u,
        ref: t,
        onKeyDown: (0, r.f)(e.onKeyDown, (e) => {
          "Home" === e.key
            ? (s(e), e.preventDefault())
            : "End" === e.key
              ? (o(e), e.preventDefault())
              : f.concat(x).includes(e.key) && (c(e), e.preventDefault());
        }),
        onPointerDown: (0, r.f)(e.onPointerDown, (e) => {
          let t = e.target;
          (t.setPointerCapture(e.pointerId),
            e.preventDefault(),
            h.thumbs.has(t) ? t.focus() : n(e));
        }),
        onPointerMove: (0, r.f)(e.onPointerMove, (e) => {
          e.target.hasPointerCapture(e.pointerId) && i(e);
        }),
        onPointerUp: (0, r.f)(e.onPointerUp, (e) => {
          let t = e.target;
          t.hasPointerCapture(e.pointerId) &&
            (t.releasePointerCapture(e.pointerId), a(e));
        }),
      });
    }),
    P = "SliderTrack",
    E = t.forwardRef((e, t) => {
      let { __scopeSlider: l, ...r } = e,
        n = w(P, l);
      return (0, m.jsx)(d.V.span, {
        "data-disabled": n.disabled ? "" : void 0,
        "data-orientation": n.orientation,
        ...r,
        ref: t,
      });
    });
  E.displayName = P;
  var A = "SliderRange",
    $ = t.forwardRef((e, l) => {
      let { __scopeSlider: r, ...i } = e,
        a = w(A, r),
        s = S(A, r),
        o = t.useRef(null),
        c = (0, n.j)(l, o),
        u = a.values.length,
        f = a.values.map((e) => F(e, a.min, a.max)),
        x = u > 1 ? Math.min(...f) : 0,
        h = 100 - Math.max(...f);
      return (0, m.jsx)(d.V.span, {
        "data-orientation": a.orientation,
        "data-disabled": a.disabled ? "" : void 0,
        ...i,
        ref: c,
        style: { ...e.style, [s.startEdge]: x + "%", [s.endEdge]: h + "%" },
      });
    });
  $.displayName = A;
  var T = "SliderThumb",
    R = t.forwardRef((e, l) => {
      let r = b(e.__scopeSlider),
        [i, a] = t.useState(null),
        s = (0, n.j)(l, (e) => a(e)),
        o = t.useMemo(
          () => (i ? r().findIndex((e) => e.ref.current === i) : -1),
          [r, i],
        );
      return (0, m.jsx)(U, { ...e, ref: s, index: o });
    }),
    U = t.forwardRef((e, l) => {
      var i, a, s, o, u;
      let f,
        x,
        { __scopeSlider: h, index: p, name: b, ...v } = e,
        y = w(T, h),
        _ = S(T, h),
        [j, N] = t.useState(null),
        k = (0, n.j)(l, (e) => N(e)),
        C = !j || y.form || !!j.closest("form"),
        M = (0, c.f)(j),
        I = y.values[p],
        P = void 0 === I ? 0 : F(I, y.min, y.max),
        E =
          ((i = p),
          (a = y.values.length) > 2
            ? `Value ${i + 1} of ${a}`
            : 2 === a
              ? ["Minimum", "Maximum"][i]
              : void 0),
        A = M?.[_.size],
        $ = A
          ? ((s = A),
            (o = P),
            (u = _.direction),
            (x = L([0, 50], [0, (f = s / 2)])),
            (f - x(o) * u) * u)
          : 0;
      return (
        t.useEffect(() => {
          if (j)
            return (
              y.thumbs.add(j),
              () => {
                y.thumbs.delete(j);
              }
            );
        }, [j, y.thumbs]),
        (0, m.jsxs)("span", {
          style: {
            transform: "var(--radix-slider-thumb-transform)",
            position: "absolute",
            [_.startEdge]: `calc(${P}% + ${$}px)`,
          },
          children: [
            (0, m.jsx)(g.ItemSlot, {
              scope: e.__scopeSlider,
              children: (0, m.jsx)(d.V.span, {
                role: "slider",
                "aria-label": e["aria-label"] || E,
                "aria-valuemin": y.min,
                "aria-valuenow": I,
                "aria-valuemax": y.max,
                "aria-orientation": y.orientation,
                "data-orientation": y.orientation,
                "data-disabled": y.disabled ? "" : void 0,
                tabIndex: y.disabled ? void 0 : 0,
                ...v,
                ref: k,
                style: void 0 === I ? { display: "none" } : e.style,
                onFocus: (0, r.f)(e.onFocus, () => {
                  y.valueIndexToChangeRef.current = p;
                }),
              }),
            }),
            C &&
              (0, m.jsx)(
                D,
                {
                  name:
                    b ??
                    (y.name
                      ? y.name + (y.values.length > 1 ? "[]" : "")
                      : void 0),
                  form: y.form,
                  value: I,
                },
                p,
              ),
          ],
        })
      );
    });
  R.displayName = T;
  var D = t.forwardRef(({ __scopeSlider: e, value: l, ...r }, i) => {
    let a = t.useRef(null),
      s = (0, n.j)(a, i),
      c = (0, o.f)(l);
    return (
      t.useEffect(() => {
        let e = a.current;
        if (!e) return;
        let t = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value",
        ).set;
        if (c !== l && t) {
          let r = new Event("input", { bubbles: !0 });
          (t.call(e, l), e.dispatchEvent(r));
        }
      }, [c, l]),
      (0, m.jsx)(d.V.input, {
        style: { display: "none" },
        ...r,
        ref: s,
        defaultValue: l,
      })
    );
  });
  function F(e, t, r) {
    return (0, l.f)((100 / (r - t)) * (e - t), [0, 100]);
  }
  function L(e, t) {
    return (l) => {
      if (e[0] === e[1] || t[0] === t[1]) return t[0];
      let r = (t[1] - t[0]) / (e[1] - e[0]);
      return t[0] + r * (l - e[0]);
    };
  }
  ((D.displayName = "RadioBubbleInput"),
    e.s(["h", 0, $, "F", 0, N, "w", 0, R, "m", 0, E]));
};
