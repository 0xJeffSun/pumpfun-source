// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(527069),
    a = e.i(775453),
    i = e.i(144977),
    n = e.i(156207),
    l = e.i(534643),
    s = e.i(770460),
    o = e.i(337755),
    c = e.i(853233),
    d = e.i(556872),
    m = e.i(357784),
    u = e.i(732486),
    f = ["PageUp", "PageDown"],
    h = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
    p = {
      "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
      "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
      "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
      "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"],
    },
    x = "Slider",
    [g, b, v] = (0, m.f)(x),
    [y, j] = (0, n.c)(x, [v]),
    [w, N] = y(x),
    _ = t.forwardRef((e, i) => {
      let {
          name: n,
          min: s = 0,
          max: o = 100,
          step: c = 1,
          orientation: d = "horizontal",
          disabled: m = !1,
          minStepsBetweenThumbs: p = 0,
          defaultValue: x = [s],
          value: b,
          onValueChange: v = () => {},
          onValueCommit: y = () => {},
          inverted: j = !1,
          form: N,
          ..._
        } = e,
        k = t.useRef(new Set()),
        S = t.useRef(0),
        E = "horizontal" === d,
        [A = [], R] = (0, l.f)({
          prop: b,
          defaultProp: x,
          onChange: (e) => {
            let t = [...k.current];
            (t[S.current]?.focus(), v(e));
          },
        }),
        D = t.useRef(A);
      function z(e, t, { commit: a } = { commit: !1 }) {
        let i,
          n = (String(c).split(".")[1] || "").length,
          l =
            Math.round(
              (Math.round((e - s) / c) * c + s) * (i = Math.pow(10, n)),
            ) / i,
          d = (0, r.f)(l, [s, o]);
        R((e = []) => {
          let r = (function (e = [], t, r) {
            let a = [...e];
            return ((a[r] = t), a.sort((e, t) => e - t));
          })(e, d, t);
          if (
            !(function (e, t) {
              if (t > 0)
                return (
                  Math.min(...e.slice(0, -1).map((t, r) => e[r + 1] - t)) >= t
                );
              return !0;
            })(r, p * c)
          )
            return e;
          {
            S.current = r.indexOf(d);
            let t = String(r) !== String(e);
            return (t && a && y(r), t ? r : e);
          }
        });
      }
      return (0, u.jsx)(w, {
        scope: e.__scopeSlider,
        name: n,
        disabled: m,
        min: s,
        max: o,
        valueIndexToChangeRef: S,
        thumbs: k.current,
        values: A,
        orientation: d,
        form: N,
        children: (0, u.jsx)(g.Provider, {
          scope: e.__scopeSlider,
          children: (0, u.jsx)(g.Slot, {
            scope: e.__scopeSlider,
            children: (0, u.jsx)(E ? C : M, {
              "aria-disabled": m,
              "data-disabled": m ? "" : void 0,
              ..._,
              ref: i,
              onPointerDown: (0, a.f)(_.onPointerDown, () => {
                m || (D.current = A);
              }),
              min: s,
              max: o,
              inverted: j,
              onSlideStart: m
                ? void 0
                : function (e) {
                    let t = (function (e, t) {
                      if (1 === e.length) return 0;
                      let r = e.map((e) => Math.abs(e - t)),
                        a = Math.min(...r);
                      return r.indexOf(a);
                    })(A, e);
                    z(e, t);
                  },
              onSlideMove: m
                ? void 0
                : function (e) {
                    z(e, S.current);
                  },
              onSlideEnd: m
                ? void 0
                : function () {
                    let e = D.current[S.current];
                    A[S.current] !== e && y(A);
                  },
              onHomeKeyDown: () => !m && z(s, 0, { commit: !0 }),
              onEndKeyDown: () => !m && z(o, A.length - 1, { commit: !0 }),
              onStepKeyDown: ({ event: e, direction: t }) => {
                if (!m) {
                  let r =
                      f.includes(e.key) || (e.shiftKey && h.includes(e.key)),
                    a = S.current;
                  z(A[a] + c * (r ? 10 : 1) * t, a, { commit: !0 });
                }
              },
            }),
          }),
        }),
      });
    });
  _.displayName = x;
  var [k, S] = y(x, {
      startEdge: "left",
      endEdge: "right",
      size: "width",
      direction: 1,
    }),
    C = t.forwardRef((e, r) => {
      let {
          min: a,
          max: n,
          dir: l,
          inverted: o,
          onSlideStart: c,
          onSlideMove: d,
          onSlideEnd: m,
          onStepKeyDown: f,
          ...h
        } = e,
        [x, g] = t.useState(null),
        b = (0, i.j)(r, (e) => g(e)),
        v = t.useRef(void 0),
        y = (0, s.f)(l),
        j = "ltr" === y,
        w = (j && !o) || (!j && o);
      function N(e) {
        let t = v.current || x.getBoundingClientRect(),
          r = L([0, t.width], w ? [a, n] : [n, a]);
        return ((v.current = t), r(e - t.left));
      }
      return (0, u.jsx)(k, {
        scope: e.__scopeSlider,
        startEdge: w ? "left" : "right",
        endEdge: w ? "right" : "left",
        direction: w ? 1 : -1,
        size: "width",
        children: (0, u.jsx)(E, {
          dir: y,
          "data-orientation": "horizontal",
          ...h,
          ref: b,
          style: {
            ...h.style,
            "--radix-slider-thumb-transform": "translateX(-50%)",
          },
          onSlideStart: (e) => {
            let t = N(e.clientX);
            c?.(t);
          },
          onSlideMove: (e) => {
            let t = N(e.clientX);
            d?.(t);
          },
          onSlideEnd: () => {
            ((v.current = void 0), m?.());
          },
          onStepKeyDown: (e) => {
            let t = p[w ? "from-left" : "from-right"].includes(e.key);
            f?.({ event: e, direction: t ? -1 : 1 });
          },
        }),
      });
    }),
    M = t.forwardRef((e, r) => {
      let {
          min: a,
          max: n,
          inverted: l,
          onSlideStart: s,
          onSlideMove: o,
          onSlideEnd: c,
          onStepKeyDown: d,
          ...m
        } = e,
        f = t.useRef(null),
        h = (0, i.j)(r, f),
        x = t.useRef(void 0),
        g = !l;
      function b(e) {
        let t = x.current || f.current.getBoundingClientRect(),
          r = L([0, t.height], g ? [n, a] : [a, n]);
        return ((x.current = t), r(e - t.top));
      }
      return (0, u.jsx)(k, {
        scope: e.__scopeSlider,
        startEdge: g ? "bottom" : "top",
        endEdge: g ? "top" : "bottom",
        size: "height",
        direction: g ? 1 : -1,
        children: (0, u.jsx)(E, {
          "data-orientation": "vertical",
          ...m,
          ref: h,
          style: {
            ...m.style,
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
            ((x.current = void 0), c?.());
          },
          onStepKeyDown: (e) => {
            let t = p[g ? "from-bottom" : "from-top"].includes(e.key);
            d?.({ event: e, direction: t ? -1 : 1 });
          },
        }),
      });
    }),
    E = t.forwardRef((e, t) => {
      let {
          __scopeSlider: r,
          onSlideStart: i,
          onSlideMove: n,
          onSlideEnd: l,
          onHomeKeyDown: s,
          onEndKeyDown: o,
          onStepKeyDown: c,
          ...m
        } = e,
        p = N(x, r);
      return (0, u.jsx)(d.V.span, {
        ...m,
        ref: t,
        onKeyDown: (0, a.f)(e.onKeyDown, (e) => {
          "Home" === e.key
            ? (s(e), e.preventDefault())
            : "End" === e.key
              ? (o(e), e.preventDefault())
              : f.concat(h).includes(e.key) && (c(e), e.preventDefault());
        }),
        onPointerDown: (0, a.f)(e.onPointerDown, (e) => {
          let t = e.target;
          (t.setPointerCapture(e.pointerId),
            e.preventDefault(),
            p.thumbs.has(t) ? t.focus() : i(e));
        }),
        onPointerMove: (0, a.f)(e.onPointerMove, (e) => {
          e.target.hasPointerCapture(e.pointerId) && n(e);
        }),
        onPointerUp: (0, a.f)(e.onPointerUp, (e) => {
          let t = e.target;
          t.hasPointerCapture(e.pointerId) &&
            (t.releasePointerCapture(e.pointerId), l(e));
        }),
      });
    }),
    A = "SliderTrack",
    R = t.forwardRef((e, t) => {
      let { __scopeSlider: r, ...a } = e,
        i = N(A, r);
      return (0, u.jsx)(d.V.span, {
        "data-disabled": i.disabled ? "" : void 0,
        "data-orientation": i.orientation,
        ...a,
        ref: t,
      });
    });
  R.displayName = A;
  var D = "SliderRange",
    z = t.forwardRef((e, r) => {
      let { __scopeSlider: a, ...n } = e,
        l = N(D, a),
        s = S(D, a),
        o = t.useRef(null),
        c = (0, i.j)(r, o),
        m = l.values.length,
        f = l.values.map((e) => F(e, l.min, l.max)),
        h = m > 1 ? Math.min(...f) : 0,
        p = 100 - Math.max(...f);
      return (0, u.jsx)(d.V.span, {
        "data-orientation": l.orientation,
        "data-disabled": l.disabled ? "" : void 0,
        ...n,
        ref: c,
        style: { ...e.style, [s.startEdge]: h + "%", [s.endEdge]: p + "%" },
      });
    });
  z.displayName = D;
  var T = "SliderThumb",
    P = t.forwardRef((e, r) => {
      let a = b(e.__scopeSlider),
        [n, l] = t.useState(null),
        s = (0, i.j)(r, (e) => l(e)),
        o = t.useMemo(
          () => (n ? a().findIndex((e) => e.ref.current === n) : -1),
          [a, n],
        );
      return (0, u.jsx)(B, { ...e, ref: s, index: o });
    }),
    B = t.forwardRef((e, r) => {
      var n, l, s, o, m;
      let f,
        h,
        { __scopeSlider: p, index: x, name: b, ...v } = e,
        y = N(T, p),
        j = S(T, p),
        [w, _] = t.useState(null),
        k = (0, i.j)(r, (e) => _(e)),
        C = !w || y.form || !!w.closest("form"),
        M = (0, c.f)(w),
        E = y.values[x],
        A = void 0 === E ? 0 : F(E, y.min, y.max),
        R =
          ((n = x),
          (l = y.values.length) > 2
            ? `Value ${n + 1} of ${l}`
            : 2 === l
              ? ["Minimum", "Maximum"][n]
              : void 0),
        D = M?.[j.size],
        z = D
          ? ((s = D),
            (o = A),
            (m = j.direction),
            (h = L([0, 50], [0, (f = s / 2)])),
            (f - h(o) * m) * m)
          : 0;
      return (
        t.useEffect(() => {
          if (w)
            return (
              y.thumbs.add(w),
              () => {
                y.thumbs.delete(w);
              }
            );
        }, [w, y.thumbs]),
        (0, u.jsxs)("span", {
          style: {
            transform: "var(--radix-slider-thumb-transform)",
            position: "absolute",
            [j.startEdge]: `calc(${A}% + ${z}px)`,
          },
          children: [
            (0, u.jsx)(g.ItemSlot, {
              scope: e.__scopeSlider,
              children: (0, u.jsx)(d.V.span, {
                role: "slider",
                "aria-label": e["aria-label"] || R,
                "aria-valuemin": y.min,
                "aria-valuenow": E,
                "aria-valuemax": y.max,
                "aria-orientation": y.orientation,
                "data-orientation": y.orientation,
                "data-disabled": y.disabled ? "" : void 0,
                tabIndex: y.disabled ? void 0 : 0,
                ...v,
                ref: k,
                style: void 0 === E ? { display: "none" } : e.style,
                onFocus: (0, a.f)(e.onFocus, () => {
                  y.valueIndexToChangeRef.current = x;
                }),
              }),
            }),
            C &&
              (0, u.jsx)(
                I,
                {
                  name:
                    b ??
                    (y.name
                      ? y.name + (y.values.length > 1 ? "[]" : "")
                      : void 0),
                  form: y.form,
                  value: E,
                },
                x,
              ),
          ],
        })
      );
    });
  P.displayName = T;
  var I = t.forwardRef(({ __scopeSlider: e, value: r, ...a }, n) => {
    let l = t.useRef(null),
      s = (0, i.j)(l, n),
      c = (0, o.f)(r);
    return (
      t.useEffect(() => {
        let e = l.current;
        if (!e) return;
        let t = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value",
        ).set;
        if (c !== r && t) {
          let a = new Event("input", { bubbles: !0 });
          (t.call(e, r), e.dispatchEvent(a));
        }
      }, [c, r]),
      (0, u.jsx)(d.V.input, {
        style: { display: "none" },
        ...a,
        ref: s,
        defaultValue: r,
      })
    );
  });
  function F(e, t, a) {
    return (0, r.f)((100 / (a - t)) * (e - t), [0, 100]);
  }
  function L(e, t) {
    return (r) => {
      if (e[0] === e[1] || t[0] === t[1]) return t[0];
      let a = (t[1] - t[0]) / (e[1] - e[0]);
      return t[0] + a * (r - e[0]);
    };
  }
  ((I.displayName = "RadioBubbleInput"),
    e.s(["h", 0, z, "F", 0, _, "w", 0, P, "m", 0, R]));
};
