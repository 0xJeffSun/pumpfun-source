// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(92615),
    r = e.i(278051),
    i = e.i(565693),
    o = e.i(309899),
    l = e.i(509015);
  function s(e) {
    return (0, n.E)(e) && "BUTTON" === e.tagName;
  }
  e.s(
    [
      "f",
      0,
      function (e = {}) {
        let {
            disabled: n = !1,
            focusableWhenDisabled: u,
            tabIndex: a = 0,
            native: c = !0,
            composite: f,
          } = e,
          d = t.useRef(null),
          p = (0, l.o)(!0),
          g = f ?? void 0 !== p,
          { props: h } = (function (e) {
            let {
                focusableWhenDisabled: n,
                disabled: r,
                composite: i = !1,
                tabIndex: o = 0,
                isNativeButton: l,
              } = e,
              s = i && !1 !== n,
              u = i && !1 === n;
            return {
              props: t.useMemo(() => {
                let e = {
                  onKeyDown(e) {
                    r && n && "Tab" !== e.key && e.preventDefault();
                  },
                };
                return (
                  i || ((e.tabIndex = o), !l && r && (e.tabIndex = n ? o : -1)),
                  ((l && (n || s)) || (!l && r)) && (e["aria-disabled"] = r),
                  l && (!n || u) && (e.disabled = r),
                  e
                );
              }, [i, r, n, s, u, l, o]),
            };
          })({
            focusableWhenDisabled: u,
            disabled: n,
            composite: g,
            tabIndex: a,
            isNativeButton: c,
          }),
          m = t.useCallback(() => {
            let e = d.current;
            s(e) &&
              g &&
              n &&
              void 0 === h.disabled &&
              e.disabled &&
              (e.disabled = !1);
          }, [n, h.disabled, g]);
        return (
          (0, i.f)(m, [m]),
          {
            getButtonProps: t.useCallback(
              (e = {}) => {
                let {
                    onClick: t,
                    onMouseDown: r,
                    onKeyUp: i,
                    onKeyDown: l,
                    onPointerDown: u,
                    ...a
                  } = e,
                  f = c ? "button" : void 0;
                return (0, o.w)(
                  {
                    type: f,
                    onClick(e) {
                      n ? e.preventDefault() : t?.(e);
                    },
                    onMouseDown(e) {
                      n || r?.(e);
                    },
                    onKeyDown(e) {
                      var r;
                      if (n || ((0, o.U)(e), l?.(e), e.baseUIHandlerPrevented))
                        return;
                      let i = e.target === e.currentTarget,
                        u = e.currentTarget,
                        a = s(u),
                        f = !c && ((r = u), !!(r?.tagName === "A" && r?.href)),
                        d = i && (c ? a : !f),
                        p = "Enter" === e.key,
                        h = " " === e.key,
                        m = u.getAttribute("role"),
                        v =
                          m?.startsWith("menuitem") ||
                          "option" === m ||
                          "gridcell" === m;
                      if (i && g && h) {
                        if (e.defaultPrevented && v) return;
                        (e.preventDefault(),
                          f || (c && a)
                            ? (u.click(), e.preventBaseUIHandler())
                            : d && (t?.(e), e.preventBaseUIHandler()));
                        return;
                      }
                      d &&
                        (!c && (h || p) && e.preventDefault(),
                        !c && p && t?.(e));
                    },
                    onKeyUp(e) {
                      n ||
                        (((0, o.U)(e),
                        i?.(e),
                        e.target === e.currentTarget &&
                          c &&
                          g &&
                          s(e.currentTarget) &&
                          " " === e.key)
                          ? e.preventDefault()
                          : !e.baseUIHandlerPrevented &&
                            (e.target !== e.currentTarget ||
                              c ||
                              g ||
                              " " !== e.key ||
                              t?.(e)));
                    },
                    onPointerDown(e) {
                      n ? e.preventDefault() : u?.(e);
                    },
                  },
                  c ? void 0 : { role: "button" },
                  h,
                  a,
                );
              },
              [n, h, g, c],
            ),
            buttonRef: (0, r.f)((e) => {
              ((d.current = e), m());
            }),
          }
        );
      },
    ],
    681402,
  );
};
