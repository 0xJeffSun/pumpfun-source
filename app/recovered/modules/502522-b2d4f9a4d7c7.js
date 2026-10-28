// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(92615),
    r = e.i(234006),
    i = e.i(732612),
    o = e.i(226115),
    l = e.i(430186),
    s = e.i(523686),
    u = e.i(854274),
    a = e.i(913281),
    c = e.i(530425),
    f = e.i(555877);
  let d = r.F && r.G;
  e.s([
    "f",
    0,
    function (e, r = {}) {
      let p = "rootStore" in e ? e.rootStore : e,
        { events: g, dataRef: h } = p.context,
        { enabled: m = !0, delay: v } = r,
        y = t.useRef(!1),
        b = t.useRef(null),
        w = (0, i.e)(),
        E = t.useRef(!0);
      (t.useEffect(() => {
        let e = p.select("domReferenceElement");
        if (!m) return;
        let t = (0, n.J)(e);
        function r() {
          let e = p.select("domReferenceElement");
          !p.select("open") &&
            (0, n.E)(e) &&
            e === (0, l.T)((0, o.f)(e)) &&
            (y.current = !0);
        }
        function i() {
          E.current = !0;
        }
        function s() {
          E.current = !1;
        }
        return (
          t.addEventListener("blur", r),
          d &&
            (t.addEventListener("keydown", i, !0),
            t.addEventListener("pointerdown", s, !0)),
          () => {
            (t.removeEventListener("blur", r),
              d &&
                (t.removeEventListener("keydown", i, !0),
                t.removeEventListener("pointerdown", s, !0)));
          }
        );
      }, [p, m]),
        t.useEffect(() => {
          if (m)
            return (
              g.on("openchange", e),
              () => {
                g.off("openchange", e);
              }
            );
          function e(e) {
            if (e.reason === u.f.triggerPress || e.reason === a.f.escapeKey) {
              let e = p.select("domReferenceElement");
              (0, n.m)(e) && ((b.current = e), (y.current = !0));
            }
          }
        }, [g, m, p]));
      let x = t.useMemo(
        () => ({
          onMouseLeave() {
            ((y.current = !1), (b.current = null));
          },
          onFocus(e) {
            let t = e.currentTarget;
            if (y.current) {
              if (b.current === t) return;
              ((y.current = !1), (b.current = null));
            }
            let r = (0, l.Z)(e.nativeEvent);
            if ((0, n.m)(r)) {
              if (d && !e.relatedTarget) {
                if (!E.current && !(0, l.Q)(r)) return;
              } else if (!(0, l.F)(r)) return;
            }
            let i = (0, l.x)(e.relatedTarget, p.context.triggerElements),
              { nativeEvent: o, currentTarget: u } = e,
              a = "function" == typeof v ? v() : v;
            (p.select("open") && i) || 0 === a || void 0 === a
              ? p.setOpen(!0, (0, s.f)(c.f.triggerFocus, o, u))
              : w.start(a, () => {
                  y.current || p.setOpen(!0, (0, s.f)(c.f.triggerFocus, o, u));
                });
          },
          onBlur(e) {
            ((y.current = !1), (b.current = null));
            let t = e.relatedTarget,
              r = e.nativeEvent,
              i =
                (0, n.m)(t) &&
                t.hasAttribute((0, f.f)("focus-guard")) &&
                "outside" === t.getAttribute("data-type");
            w.start(0, () => {
              let e = p.select("domReferenceElement"),
                n = (0, l.T)(e ? e.ownerDocument : document);
              if (
                (!t && n === e) ||
                (0, l.I)(h.current.floatingContext?.refs.floating.current, n) ||
                (0, l.I)(e, n) ||
                i
              )
                return;
              let o = t ?? n;
              (0, l.x)(o, p.context.triggerElements) ||
                p.setOpen(!1, (0, s.f)(c.f.triggerFocus, r));
            });
          },
        }),
        [h, p, w, v],
      );
      return t.useMemo(() => (m ? { reference: x, trigger: x } : {}), [m, x]);
    },
  ]);
};
