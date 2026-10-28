// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(144977),
    r = e.i(127864),
    o = (e) => {
      var o;
      let a,
        s,
        { present: l, children: u } = e,
        d = (function (e) {
          var n, o;
          let [a, s] = t.useState(),
            l = t.useRef(null),
            u = t.useRef(e),
            d = t.useRef("none"),
            [c, f] =
              ((n = e ? "mounted" : "unmounted"),
              (o = {
                mounted: {
                  UNMOUNT: "unmounted",
                  ANIMATION_OUT: "unmountSuspended",
                },
                unmountSuspended: {
                  MOUNT: "mounted",
                  ANIMATION_END: "unmounted",
                },
                unmounted: { MOUNT: "mounted" },
              }),
              t.useReducer((e, t) => o[e][t] ?? e, n));
          return (
            t.useEffect(() => {
              let e = i(l.current);
              d.current = "mounted" === c ? e : "none";
            }, [c]),
            (0, r.f)(() => {
              let t = l.current,
                n = u.current;
              if (n !== e) {
                let r = d.current,
                  o = i(t);
                (e
                  ? f("MOUNT")
                  : "none" === o || t?.display === "none"
                    ? f("UNMOUNT")
                    : n && r !== o
                      ? f("ANIMATION_OUT")
                      : f("UNMOUNT"),
                  (u.current = e));
              }
            }, [e, f]),
            (0, r.f)(() => {
              if (a) {
                let e,
                  t = a.ownerDocument.defaultView ?? window,
                  n = (n) => {
                    let r = i(l.current).includes(CSS.escape(n.animationName));
                    if (
                      n.target === a &&
                      r &&
                      (f("ANIMATION_END"), !u.current)
                    ) {
                      let n = a.style.animationFillMode;
                      ((a.style.animationFillMode = "forwards"),
                        (e = t.setTimeout(() => {
                          "forwards" === a.style.animationFillMode &&
                            (a.style.animationFillMode = n);
                        })));
                    }
                  },
                  r = (e) => {
                    e.target === a && (d.current = i(l.current));
                  };
                return (
                  a.addEventListener("animationstart", r),
                  a.addEventListener("animationcancel", n),
                  a.addEventListener("animationend", n),
                  () => {
                    (t.clearTimeout(e),
                      a.removeEventListener("animationstart", r),
                      a.removeEventListener("animationcancel", n),
                      a.removeEventListener("animationend", n));
                  }
                );
              }
              f("ANIMATION_END");
            }, [a, f]),
            {
              isPresent: ["mounted", "unmountSuspended"].includes(c),
              ref: t.useCallback((e) => {
                ((l.current = e ? getComputedStyle(e) : null), s(e));
              }, []),
            }
          );
        })(l),
        c =
          "function" == typeof u
            ? u({ present: d.isPresent })
            : t.Children.only(u),
        f = (0, n.j)(
          d.ref,
          ((o = c),
          (s =
            (a = Object.getOwnPropertyDescriptor(o.props, "ref")?.get) &&
            "isReactWarning" in a &&
            a.isReactWarning)
            ? o.ref
            : (s =
                  (a = Object.getOwnPropertyDescriptor(o, "ref")?.get) &&
                  "isReactWarning" in a &&
                  a.isReactWarning)
              ? o.props.ref
              : o.props.ref || o.ref),
        );
      return "function" == typeof u || d.isPresent
        ? t.cloneElement(c, { ref: f })
        : null;
    };
  function i(e) {
    return e?.animationName || "none";
  }
  ((o.displayName = "Presence"), e.s(["f", 0, o]));
};
