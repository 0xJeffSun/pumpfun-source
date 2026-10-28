// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386);
  e.i(231332);
  var r = e.i(144977),
    n = e.i(732486),
    a = Symbol.for("react.lazy"),
    i = t[" use ".trim().toString()];
  function l(e) {
    var t;
    return (
      null != e &&
      "object" == typeof e &&
      "$$typeof" in e &&
      e.$$typeof === a &&
      "_payload" in e &&
      "object" == typeof (t = e._payload) &&
      null !== t &&
      "then" in t
    );
  }
  var o = Symbol("radix.slottable");
  function s(e) {
    return (
      t.isValidElement(e) &&
      "function" == typeof e.type &&
      "__radixId" in e.type &&
      e.type.__radixId === o
    );
  }
  var d = [
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
    "select",
    "span",
    "svg",
    "ul",
  ].reduce((e, a) => {
    var o, d;
    let c,
      f,
      u,
      m =
        ((d = o = `Primitive.${a}`),
        ((c = t.forwardRef((e, n) => {
          let { children: a, ...o } = e;
          if (
            (l(a) && "function" == typeof i && (a = i(a._payload)),
            t.isValidElement(a))
          ) {
            var s;
            let e,
              i,
              l =
                ((s = a),
                (i =
                  (e = Object.getOwnPropertyDescriptor(s.props, "ref")?.get) &&
                  "isReactWarning" in e &&
                  e.isReactWarning)
                  ? s.ref
                  : (i =
                        (e = Object.getOwnPropertyDescriptor(s, "ref")?.get) &&
                        "isReactWarning" in e &&
                        e.isReactWarning)
                    ? s.props.ref
                    : s.props.ref || s.ref),
              d = (function (e, t) {
                let r = { ...t };
                for (let n in t) {
                  let a = e[n],
                    i = t[n];
                  /^on[A-Z]/.test(n)
                    ? a && i
                      ? (r[n] = (...e) => {
                          let t = i(...e);
                          return (a(...e), t);
                        })
                      : a && (r[n] = a)
                    : "style" === n
                      ? (r[n] = { ...a, ...i })
                      : "className" === n &&
                        (r[n] = [a, i].filter(Boolean).join(" "));
                }
                return { ...e, ...r };
              })(o, a.props);
            return (
              a.type !== t.Fragment && (d.ref = n ? (0, r.Q)(n, l) : l),
              t.cloneElement(a, d)
            );
          }
          return t.Children.count(a) > 1 ? t.Children.only(null) : null;
        })).displayName = `${d}.SlotClone`),
        (f = c),
        ((u = t.forwardRef((e, r) => {
          let { children: a, ...o } = e;
          l(a) && "function" == typeof i && (a = i(a._payload));
          let d = t.Children.toArray(a),
            c = d.find(s);
          if (c) {
            let e = c.props.children,
              a = d.map((r) =>
                r !== c
                  ? r
                  : t.Children.count(e) > 1
                    ? t.Children.only(null)
                    : t.isValidElement(e)
                      ? e.props.children
                      : null,
              );
            return (0, n.jsx)(f, {
              ...o,
              ref: r,
              children: t.isValidElement(e)
                ? t.cloneElement(e, void 0, a)
                : null,
            });
          }
          return (0, n.jsx)(f, { ...o, ref: r, children: a });
        })).displayName = `${o}.Slot`),
        u),
      p = t.forwardRef((e, t) => {
        let { asChild: r, ...i } = e;
        return (
          "u" > typeof window && (window[Symbol.for("radix-ui")] = !0),
          (0, n.jsx)(r ? m : a, { ...i, ref: t })
        );
      });
    return ((p.displayName = `Primitive.${a}`), { ...e, [a]: p });
  }, {});
  e.s(["f", 0, d], 271818);
};
