// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(144977),
    n = e.i(127864),
    o = (e) => {
      var o;
      let a,
        s,
        { present: l, children: d } = e,
        u = (function (e) {
          var r, o;
          let [a, s] = t.useState(),
            l = t.useRef(null),
            d = t.useRef(e),
            u = t.useRef("none"),
            [c, f] =
              ((r = e ? "mounted" : "unmounted"),
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
              t.useReducer((e, t) => o[e][t] ?? e, r));
          return (
            t.useEffect(() => {
              let e = i(l.current);
              u.current = "mounted" === c ? e : "none";
            }, [c]),
            (0, n.f)(() => {
              let t = l.current,
                r = d.current;
              if (r !== e) {
                let n = u.current,
                  o = i(t);
                (e
                  ? f("MOUNT")
                  : "none" === o || t?.display === "none"
                    ? f("UNMOUNT")
                    : r && n !== o
                      ? f("ANIMATION_OUT")
                      : f("UNMOUNT"),
                  (d.current = e));
              }
            }, [e, f]),
            (0, n.f)(() => {
              if (a) {
                let e,
                  t = a.ownerDocument.defaultView ?? window,
                  r = (r) => {
                    let n = i(l.current).includes(r.animationName);
                    if (
                      r.target === a &&
                      n &&
                      (f("ANIMATION_END"), !d.current)
                    ) {
                      let r = a.style.animationFillMode;
                      ((a.style.animationFillMode = "forwards"),
                        (e = t.setTimeout(() => {
                          "forwards" === a.style.animationFillMode &&
                            (a.style.animationFillMode = r);
                        })));
                    }
                  },
                  n = (e) => {
                    e.target === a && (u.current = i(l.current));
                  };
                return (
                  a.addEventListener("animationstart", n),
                  a.addEventListener("animationcancel", r),
                  a.addEventListener("animationend", r),
                  () => {
                    (t.clearTimeout(e),
                      a.removeEventListener("animationstart", n),
                      a.removeEventListener("animationcancel", r),
                      a.removeEventListener("animationend", r));
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
          "function" == typeof d
            ? d({ present: u.isPresent })
            : t.Children.only(d),
        f = (0, r.j)(
          u.ref,
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
      return "function" == typeof d || u.isPresent
        ? t.cloneElement(c, { ref: f })
        : null;
    };
  function i(e) {
    return e?.animationName || "none";
  }
  ((o.displayName = "Presence"), e.s(["f", 0, o]));
};
