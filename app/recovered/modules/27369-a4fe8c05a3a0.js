// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(149502);
  var t = e.i(352386),
    n = e.i(231332),
    r = e.i(92615),
    i = e.i(761806),
    o = e.i(565693),
    l = e.i(278051),
    s = e.i(62819),
    u = e.i(50408),
    a = e.i(523686),
    c = e.i(251669),
    f = e.i(555877),
    d = e.i(648585),
    p = e.i(297454),
    g = e.i(300310),
    h = e.i(732486);
  let m = t.createContext(null),
    v = () => t.useContext(m),
    y = (0, f.f)("portal");
  function b(e = {}) {
    let { ref: s, container: u, componentProps: a = p.w, elementProps: c } = e,
      f = (0, i.f)(),
      g = v(),
      h = g?.portalNode,
      [m, w] = t.useState(null),
      [E, x] = t.useState(null),
      R = (0, l.f)((e) => {
        null !== e && x(e);
      }),
      S = t.useRef(null);
    (0, o.f)(() => {
      if (null === u) {
        S.current && ((S.current = null), x(null), w(null));
        return;
      }
      if (null == f) return;
      let e = (u && ((0, r.t)(u) ? u : u.current)) ?? h ?? document.body;
      if (null == e) {
        S.current && ((S.current = null), x(null), w(null));
        return;
      }
      S.current !== e && ((S.current = e), x(null), w(e));
    }, [u, h, f]);
    let T = (0, d.f)("div", a, { ref: [s, R], props: [{ id: f, [y]: "" }, c] });
    return {
      portalNode: E,
      portalSubtree: m && T ? n.createPortal(T, m) : null,
    };
  }
  let w = t.forwardRef(function (e, r) {
    let {
        children: i,
        container: o,
        className: l,
        render: f,
        renderGuards: d,
        ...p
      } = e,
      { portalNode: v, portalSubtree: y } = b({
        container: o,
        ref: r,
        componentProps: e,
        elementProps: p,
      }),
      w = t.useRef(null),
      E = t.useRef(null),
      x = t.useRef(null),
      R = t.useRef(null),
      [S, T] = t.useState(null),
      C = S?.modal,
      k = S?.open,
      O = "boolean" == typeof d ? d : !!S && !S.modal && S.open && !!v;
    (t.useEffect(() => {
      if (v && !C)
        return (
          v.addEventListener("focusin", e, !0),
          v.addEventListener("focusout", e, !0),
          () => {
            (v.removeEventListener("focusin", e, !0),
              v.removeEventListener("focusout", e, !0));
          }
        );
      function e(e) {
        v &&
          e.relatedTarget &&
          (0, u.A)(e) &&
          ("focusin" === e.type ? u.d : u.r)(v);
      }
    }, [v, C]),
      t.useEffect(() => {
        v && !k && (0, u.d)(v);
      }, [k, v]));
    let I = t.useMemo(
      () => ({
        beforeOutsideRef: w,
        afterOutsideRef: E,
        beforeInsideRef: x,
        afterInsideRef: R,
        portalNode: v,
        setFocusManagerState: T,
      }),
      [v],
    );
    return (0, h.jsxs)(t.Fragment, {
      children: [
        y,
        (0, h.jsxs)(m.Provider, {
          value: I,
          children: [
            O &&
              v &&
              (0, h.jsx)(s.f, {
                "data-type": "outside",
                ref: w,
                onFocus: (e) => {
                  if ((0, u.A)(e, v)) x.current?.focus();
                  else {
                    let e = S ? S.domReference : null,
                      t = (0, u.B)(e);
                    t?.focus();
                  }
                },
              }),
            O && v && (0, h.jsx)("span", { "aria-owns": v.id, style: g.Z }),
            v && n.createPortal(i, v),
            O &&
              v &&
              (0, h.jsx)(s.f, {
                "data-type": "outside",
                ref: E,
                onFocus: (e) => {
                  if ((0, u.A)(e, v)) R.current?.focus();
                  else {
                    let t = S ? S.domReference : null,
                      n = (0, u.O)(t);
                    (n?.focus(),
                      S?.closeOnFocusOut &&
                        S?.onOpenChange(
                          !1,
                          (0, a.f)(c.f.focusOut, e.nativeEvent),
                        ));
                  }
                },
              }),
          ],
        }),
      ],
    });
  });
  e.s(["r", 0, w, "o", 0, b, "M", 0, v]);
};
