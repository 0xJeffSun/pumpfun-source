// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(144977),
    r = e.i(732486);
  function o(e) {
    var o;
    let i,
      a =
        ((o = e),
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
              u = (function (e, t) {
                let n = { ...t };
                for (let r in t) {
                  let o = e[r],
                    i = t[r];
                  /^on[A-Z]/.test(r)
                    ? o && i
                      ? (n[r] = (...e) => {
                          let t = i(...e);
                          return (o(...e), t);
                        })
                      : o && (n[r] = o)
                    : "style" === r
                      ? (n[r] = { ...o, ...i })
                      : "className" === r &&
                        (n[r] = [o, i].filter(Boolean).join(" "));
                }
                return { ...e, ...n };
              })(i, o.props);
            return (
              o.type !== t.Fragment && (u.ref = r ? (0, n.Q)(r, l) : l),
              t.cloneElement(o, u)
            );
          }
          return t.Children.count(o) > 1 ? t.Children.only(null) : null;
        })).displayName = `${o}.SlotClone`),
        i),
      l = t.forwardRef((e, n) => {
        let { children: o, ...i } = e,
          l = t.Children.toArray(o),
          u = l.find(s);
        if (u) {
          let e = u.props.children,
            o = l.map((n) =>
              n !== u
                ? n
                : t.Children.count(e) > 1
                  ? t.Children.only(null)
                  : t.isValidElement(e)
                    ? e.props.children
                    : null,
            );
          return (0, r.jsx)(a, {
            ...i,
            ref: n,
            children: t.isValidElement(e) ? t.cloneElement(e, void 0, o) : null,
          });
        }
        return (0, r.jsx)(a, { ...i, ref: n, children: o });
      });
    return ((l.displayName = `${e}.Slot`), l);
  }
  var i = o("Slot"),
    a = Symbol("radix.slottable");
  function s(e) {
    return (
      t.isValidElement(e) &&
      "function" == typeof e.type &&
      "__radixId" in e.type &&
      e.type.__radixId === a
    );
  }
  e.s(["M", 0, i, "B", 0, o]);
};
