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
        i = e.map((e) => {
          let i = r(e, t);
          return (n || "function" != typeof i || (n = !0), i);
        });
      if (n)
        return () => {
          for (let t = 0; t < i.length; t++) {
            let n = i[t];
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
  var i = e.i(732486),
    o = t.forwardRef((e, r) => {
      let { children: n, ...o } = e,
        a = t.Children.toArray(n),
        u = a.find(l);
      if (u) {
        let e = u.props.children,
          n = a.map((r) =>
            r !== u
              ? r
              : t.Children.count(e) > 1
                ? t.Children.only(null)
                : t.isValidElement(e)
                  ? e.props.children
                  : null,
          );
        return (0, i.jsx)(s, {
          ...o,
          ref: r,
          children: t.isValidElement(e) ? t.cloneElement(e, void 0, n) : null,
        });
      }
      return (0, i.jsx)(s, { ...o, ref: r, children: n });
    });
  o.displayName = "Slot";
  var s = t.forwardRef((e, r) => {
    let { children: i, ...o } = e;
    if (t.isValidElement(i)) {
      var s;
      let e,
        a,
        l =
          ((s = i),
          (a =
            (e = Object.getOwnPropertyDescriptor(s.props, "ref")?.get) &&
            "isReactWarning" in e &&
            e.isReactWarning)
            ? s.ref
            : (a =
                  (e = Object.getOwnPropertyDescriptor(s, "ref")?.get) &&
                  "isReactWarning" in e &&
                  e.isReactWarning)
              ? s.props.ref
              : s.props.ref || s.ref),
        u = (function (e, t) {
          let r = { ...t };
          for (let n in t) {
            let i = e[n],
              o = t[n];
            /^on[A-Z]/.test(n)
              ? i && o
                ? (r[n] = (...e) => {
                    (o(...e), i(...e));
                  })
                : i && (r[n] = i)
              : "style" === n
                ? (r[n] = { ...i, ...o })
                : "className" === n &&
                  (r[n] = [i, o].filter(Boolean).join(" "));
          }
          return { ...e, ...r };
        })(o, i.props);
      return (
        i.type !== t.Fragment && (u.ref = r ? n(r, l) : l),
        t.cloneElement(i, u)
      );
    }
    return t.Children.count(i) > 1 ? t.Children.only(null) : null;
  });
  s.displayName = "SlotClone";
  var a = ({ children: e }) => (0, i.jsx)(i.Fragment, { children: e });
  function l(e) {
    return t.isValidElement(e) && e.type === a;
  }
  e.s(["f", 0, o], 172095);
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
      let { asChild: n, ...s } = e,
        a = n ? o : r;
      return (
        "u" > typeof window && (window[Symbol.for("radix-ui")] = !0),
        (0, i.jsx)(a, { ...s, ref: t })
      );
    });
    return ((n.displayName = `Primitive.${r}`), { ...e, [r]: n });
  }, {});
  e.s(["f", 0, u], 125214);
};
