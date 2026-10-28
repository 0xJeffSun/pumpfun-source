// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(231332),
    n = e.i(144977),
    o = e.i(732486);
  function i(e) {
    var r;
    let i,
      a =
        ((r = e),
        ((i = t.forwardRef((e, r) => {
          let { children: o, ...i } = e;
          if (t.isValidElement(o)) {
            var a;
            let e,
              s,
              l =
                ((a = o),
                (s =
                  (e = Object.getOwnPropertyDescriptor(a.props, "ref")?.get) &&
                  "isReactWarning" in e &&
                  e.isReactWarning)
                  ? a.ref
                  : (s =
                        (e = Object.getOwnPropertyDescriptor(a, "ref")?.get) &&
                        "isReactWarning" in e &&
                        e.isReactWarning)
                    ? a.props.ref
                    : a.props.ref || a.ref),
              d = (function (e, t) {
                let r = { ...t };
                for (let n in t) {
                  let o = e[n],
                    i = t[n];
                  /^on[A-Z]/.test(n)
                    ? o && i
                      ? (r[n] = (...e) => {
                          (i(...e), o(...e));
                        })
                      : o && (r[n] = o)
                    : "style" === n
                      ? (r[n] = { ...o, ...i })
                      : "className" === n &&
                        (r[n] = [o, i].filter(Boolean).join(" "));
                }
                return { ...e, ...r };
              })(i, o.props);
            return (
              o.type !== t.Fragment && (d.ref = r ? (0, n.Q)(r, l) : l),
              t.cloneElement(o, d)
            );
          }
          return t.Children.count(o) > 1 ? t.Children.only(null) : null;
        })).displayName = `${r}.SlotClone`),
        i),
      l = t.forwardRef((e, r) => {
        let { children: n, ...i } = e,
          l = t.Children.toArray(n),
          d = l.find(s);
        if (d) {
          let e = d.props.children,
            n = l.map((r) =>
              r !== d
                ? r
                : t.Children.count(e) > 1
                  ? t.Children.only(null)
                  : t.isValidElement(e)
                    ? e.props.children
                    : null,
            );
          return (0, o.jsx)(a, {
            ...i,
            ref: r,
            children: t.isValidElement(e) ? t.cloneElement(e, void 0, n) : null,
          });
        }
        return (0, o.jsx)(a, { ...i, ref: r, children: n });
      });
    return ((l.displayName = `${e}.Slot`), l);
  }
  var a = Symbol("radix.slottable");
  function s(e) {
    return (
      t.isValidElement(e) &&
      "function" == typeof e.type &&
      "__radixId" in e.type &&
      e.type.__radixId === a
    );
  }
  e.s(["f", 0, i], 681289);
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
    "select",
    "span",
    "svg",
    "ul",
  ].reduce((e, r) => {
    let n = i(`Primitive.${r}`),
      a = t.forwardRef((e, t) => {
        let { asChild: i, ...a } = e;
        return (
          "u" > typeof window && (window[Symbol.for("radix-ui")] = !0),
          (0, o.jsx)(i ? n : r, { ...a, ref: t })
        );
      });
    return ((a.displayName = `Primitive.${r}`), { ...e, [r]: a });
  }, {});
  e.s(
    [
      "V",
      0,
      l,
      "u",
      0,
      function (e, t) {
        e && r.flushSync(() => e.dispatchEvent(t));
      },
    ],
    362275,
  );
};
