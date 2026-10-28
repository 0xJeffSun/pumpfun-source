// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    i = e.i(732486);
  e.i(231332);
  var r = t.forwardRef((e, r) => {
    let { children: n, ...l } = e,
      o = t.Children.toArray(n),
      c = o.find(s);
    if (c) {
      let e = c.props.children,
        n = o.map((i) =>
          i !== c
            ? i
            : t.Children.count(e) > 1
              ? t.Children.only(null)
              : t.isValidElement(e)
                ? e.props.children
                : null,
        );
      return (0, i.jsx)(a, {
        ...l,
        ref: r,
        children: t.isValidElement(e) ? t.cloneElement(e, void 0, n) : null,
      });
    }
    return (0, i.jsx)(a, { ...l, ref: r, children: n });
  });
  r.displayName = "Slot";
  var a = t.forwardRef((e, i) => {
    let { children: r, ...a } = e;
    if (t.isValidElement(r)) {
      var n;
      let e,
        s,
        l =
          ((n = r),
          (s =
            (e = Object.getOwnPropertyDescriptor(n.props, "ref")?.get) &&
            "isReactWarning" in e &&
            e.isReactWarning)
            ? n.ref
            : (s =
                  (e = Object.getOwnPropertyDescriptor(n, "ref")?.get) &&
                  "isReactWarning" in e &&
                  e.isReactWarning)
              ? n.props.ref
              : n.props.ref || n.ref);
      return t.cloneElement(r, {
        ...(function (e, t) {
          let i = { ...t };
          for (let r in t) {
            let a = e[r],
              n = t[r];
            /^on[A-Z]/.test(r)
              ? a && n
                ? (i[r] = (...e) => {
                    (n(...e), a(...e));
                  })
                : a && (i[r] = a)
              : "style" === r
                ? (i[r] = { ...a, ...n })
                : "className" === r &&
                  (i[r] = [a, n].filter(Boolean).join(" "));
          }
          return { ...e, ...i };
        })(a, r.props),
        ref: i
          ? (function (...e) {
              return (t) =>
                e.forEach((e) => {
                  "function" == typeof e ? e(t) : null != e && (e.current = t);
                });
            })(i, l)
          : l,
      });
    }
    return t.Children.count(r) > 1 ? t.Children.only(null) : null;
  });
  a.displayName = "SlotClone";
  var n = ({ children: e }) => (0, i.jsx)(i.Fragment, { children: e });
  function s(e) {
    return t.isValidElement(e) && e.type === n;
  }
  var l = [
      "a",
      "button",
      "div",
      "form",
      "h2",
      "h3",
      "img",
      "input",
      "label",
      "li",
      "nav",
      "ol",
      "p",
      "span",
      "svg",
      "ul",
    ].reduce((e, a) => {
      let n = t.forwardRef((e, t) => {
        let { asChild: n, ...s } = e,
          l = n ? r : a;
        return (
          "u" > typeof window && (window[Symbol.for("radix-ui")] = !0),
          (0, i.jsx)(l, { ...s, ref: t })
        );
      });
      return ((n.displayName = `Primitive.${a}`), { ...e, [a]: n });
    }, {}),
    o = "Progress",
    [c, m] = (function (e, r = []) {
      let a = [],
        n = () => {
          let i = a.map((e) => t.createContext(e));
          return function (r) {
            let a = r?.[e] || i;
            return t.useMemo(
              () => ({ [`__scope${e}`]: { ...r, [e]: a } }),
              [r, a],
            );
          };
        };
      return (
        (n.scopeName = e),
        [
          function (r, n) {
            let s = t.createContext(n),
              l = a.length;
            function o(r) {
              let { scope: a, children: n, ...o } = r,
                c = a?.[e][l] || s,
                m = t.useMemo(() => o, Object.values(o));
              return (0, i.jsx)(c.Provider, { value: m, children: n });
            }
            return (
              (a = [...a, n]),
              (o.displayName = r + "Provider"),
              [
                o,
                function (i, a) {
                  let o = a?.[e][l] || s,
                    c = t.useContext(o);
                  if (c) return c;
                  if (void 0 !== n) return n;
                  throw Error(`\`${i}\` must be used within \`${r}\``);
                },
              ]
            );
          },
          (function (...e) {
            let i = e[0];
            if (1 === e.length) return i;
            let r = () => {
              let r = e.map((e) => ({ useScope: e(), scopeName: e.scopeName }));
              return function (e) {
                let a = r.reduce((t, { useScope: i, scopeName: r }) => {
                  let a = i(e)[`__scope${r}`];
                  return { ...t, ...a };
                }, {});
                return t.useMemo(() => ({ [`__scope${i.scopeName}`]: a }), [a]);
              };
            };
            return ((r.scopeName = i.scopeName), r);
          })(n, ...r),
        ]
      );
    })(o),
    [u, d] = c(o),
    f = t.forwardRef((e, t) => {
      var r, a;
      let {
        __scopeProgress: n,
        value: s = null,
        max: o,
        getValueLabel: c = x,
        ...m
      } = e;
      (o || 0 === o) &&
        !b(o) &&
        console.error(
          ((r = `${o}`),
          `Invalid prop \`max\` of value \`${r}\` supplied to \`Progress\`. Only numbers greater than 0 are valid max values. Defaulting to \`100\`.`),
        );
      let d = b(o) ? o : 100;
      null === s ||
        y(s, d) ||
        console.error(
          ((a = `${s}`),
          `Invalid prop \`value\` of value \`${a}\` supplied to \`Progress\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or 100 if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`),
        );
      let f = y(s, d) ? s : null,
        p = g(f) ? c(f, d) : void 0;
      return (0, i.jsx)(u, {
        scope: n,
        value: f,
        max: d,
        children: (0, i.jsx)(l.div, {
          "aria-valuemax": d,
          "aria-valuemin": 0,
          "aria-valuenow": g(f) ? f : void 0,
          "aria-valuetext": p,
          role: "progressbar",
          "data-state": v(f, d),
          "data-value": f ?? void 0,
          "data-max": d,
          ...m,
          ref: t,
        }),
      });
    });
  f.displayName = o;
  var p = "ProgressIndicator",
    h = t.forwardRef((e, t) => {
      let { __scopeProgress: r, ...a } = e,
        n = d(p, r);
      return (0, i.jsx)(l.div, {
        "data-state": v(n.value, n.max),
        "data-value": n.value ?? void 0,
        "data-max": n.max,
        ...a,
        ref: t,
      });
    });
  function x(e, t) {
    return `${Math.round((e / t) * 100)}%`;
  }
  function v(e, t) {
    return null == e ? "indeterminate" : e === t ? "complete" : "loading";
  }
  function g(e) {
    return "number" == typeof e;
  }
  function b(e) {
    return g(e) && !isNaN(e) && e > 0;
  }
  function y(e, t) {
    return g(e) && !isNaN(e) && e <= t && e >= 0;
  }
  ((h.displayName = p), e.s(["S", 0, h, "F", 0, f], 177560));
};
