// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(575272),
    r = e.i(732612),
    i = e.i(297454),
    o = e.i(36177),
    l = e.i(430186),
    s = e.i(523686),
    u = e.i(854274);
  e.s([
    "f",
    0,
    function (e, a = {}) {
      let c = "rootStore" in e ? e.rootStore : e,
        f = c.context.dataRef,
        {
          enabled: d = !0,
          event: p = "click",
          toggle: g = !0,
          ignoreMouse: h = !1,
          stickIfOpen: m = !0,
          touchOpenDelay: v = 0,
          reason: y = u.f.triggerPress,
        } = a,
        b = t.useRef(void 0),
        w = (0, n.z)(),
        E = (0, r.e)(),
        x = t.useMemo(
          () => ({
            onPointerDown(e) {
              b.current = e.pointerType;
            },
            onMouseDown(e) {
              let t = b.current,
                n = e.nativeEvent,
                r = c.select("open");
              if (0 !== e.button || "click" === p || ((0, o.J)(t, !0) && h))
                return;
              let i = f.current.openEvent,
                u = i?.type,
                a = c.select("domReferenceElement") !== e.currentTarget,
                d =
                  (r && a) ||
                  !(r && g && (!i || !m || "click" === u || "mousedown" === u));
              if ((0, l.Q)(n.target)) {
                let e = (0, s.f)(y, n, n.target);
                d && "touch" === t && v > 0
                  ? E.start(v, () => {
                      c.setOpen(!0, e);
                    })
                  : c.setOpen(d, e);
                return;
              }
              let x = e.currentTarget;
              w.request(() => {
                let e = (0, s.f)(y, n, x);
                d && "touch" === t && v > 0
                  ? E.start(v, () => {
                      c.setOpen(!0, e);
                    })
                  : c.setOpen(d, e);
              });
            },
            onClick(e) {
              if ("mousedown-only" === p) return;
              let t = b.current;
              if ("mousedown" === p && t) {
                b.current = void 0;
                return;
              }
              if ((0, o.J)(t, !0) && h) return;
              let n = c.select("open"),
                r = f.current.openEvent,
                i = c.select("domReferenceElement") !== e.currentTarget,
                l = (n && i) || !(n && g && (!r || !m || (0, o.D)(r))),
                u = (0, s.f)(y, e.nativeEvent, e.currentTarget);
              l && "touch" === t && v > 0
                ? E.start(v, () => {
                    c.setOpen(!0, u);
                  })
                : c.setOpen(l, u);
            },
            onKeyDown() {
              b.current = void 0;
            },
          }),
          [f, p, h, c, m, g, w, E, v, y],
        );
      return t.useMemo(() => (d ? { reference: x } : i.w), [d, x]);
    },
  ]);
};
