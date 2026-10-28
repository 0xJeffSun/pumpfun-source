// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386);
  function r(e, t) {
    if ("function" == typeof e) return e(t);
    null != e && (e.current = t);
  }
  function n(...e) {
    return (t) => {
      let n = !1,
        a = e.map((e) => {
          let a = r(e, t);
          return (n || "function" != typeof a || (n = !0), a);
        });
      if (n)
        return () => {
          for (let t = 0; t < a.length; t++) {
            let n = a[t];
            "function" == typeof n ? n() : r(e[t], null);
          }
        };
    };
  }
  (e.i(231332),
    e.s(
      [
        "Q",
        0,
        n,
        "j",
        0,
        function (...e) {
          return t.useCallback(n(...e), e);
        },
      ],
      474765,
    ));
  var a = e.i(732486),
    i = t.forwardRef((e, r) => {
      let { children: n, ...i } = e,
        s = t.Children.toArray(n),
        u = s.find(l);
      if (u) {
        let e = u.props.children,
          n = s.map((r) =>
            r !== u
              ? r
              : t.Children.count(e) > 1
                ? t.Children.only(null)
                : t.isValidElement(e)
                  ? e.props.children
                  : null,
          );
        return (0, a.jsx)(o, {
          ...i,
          ref: r,
          children: t.isValidElement(e) ? t.cloneElement(e, void 0, n) : null,
        });
      }
      return (0, a.jsx)(o, { ...i, ref: r, children: n });
    });
  i.displayName = "Slot";
  var o = t.forwardRef((e, r) => {
    let { children: a, ...i } = e;
    if (t.isValidElement(a)) {
      var o;
      let e,
        s,
        l =
          ((o = a),
          (s =
            (e = Object.getOwnPropertyDescriptor(o.props, "ref")?.get) &&
            "isReactWarning" in e &&
            e.isReactWarning)
            ? o.ref
            : (s =
                  (e = Object.getOwnPropertyDescriptor(o, "ref")?.get) &&
                  "isReactWarning" in e &&
                  e.isReactWarning)
              ? o.props.ref
              : o.props.ref || o.ref),
        u = (function (e, t) {
          let r = { ...t };
          for (let n in t) {
            let a = e[n],
              i = t[n];
            /^on[A-Z]/.test(n)
              ? a && i
                ? (r[n] = (...e) => {
                    (i(...e), a(...e));
                  })
                : a && (r[n] = a)
              : "style" === n
                ? (r[n] = { ...a, ...i })
                : "className" === n &&
                  (r[n] = [a, i].filter(Boolean).join(" "));
          }
          return { ...e, ...r };
        })(i, a.props);
      return (
        a.type !== t.Fragment && (u.ref = r ? n(r, l) : l),
        t.cloneElement(a, u)
      );
    }
    return t.Children.count(a) > 1 ? t.Children.only(null) : null;
  });
  o.displayName = "SlotClone";
  var s = ({ children: e }) => (0, a.jsx)(a.Fragment, { children: e });
  function l(e) {
    return t.isValidElement(e) && e.type === s;
  }
  e.s(["f", 0, i], 172095);
  var u = [
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
  ].reduce((e, r) => {
    let n = t.forwardRef((e, t) => {
      let { asChild: n, ...o } = e,
        s = n ? i : r;
      return (
        "u" > typeof window && (window[Symbol.for("radix-ui")] = !0),
        (0, a.jsx)(s, { ...o, ref: t })
      );
    });
    return ((n.displayName = `Primitive.${r}`), { ...e, [r]: n });
  }, {});
  e.s(["f", 0, u], 125214);
};
