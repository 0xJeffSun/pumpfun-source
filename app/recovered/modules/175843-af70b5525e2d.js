// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(231332),
    r = e.i(92615),
    i = e.i(925849),
    o = e.i(278051),
    l = e.i(226115),
    s = e.i(430186),
    u = e.i(36177),
    a = e.i(523686),
    c = e.i(875355),
    f = e.i(656522),
    d = e.i(409102),
    p = e.i(530001);
  let g = { current: null };
  e.s([
    "f",
    0,
    function (e, h = {}) {
      let m = "rootStore" in e ? e.rootStore : e,
        { dataRef: v, events: y } = m.context,
        {
          enabled: b = !0,
          delay: w = 0,
          handleClose: E = null,
          mouseOnly: x = !1,
          restMs: R = 0,
          move: S = !0,
          triggerElementRef: T = g,
          externalTree: C,
          isActiveTrigger: k = !0,
          getHandleCloseContext: O,
        } = h,
        I = (0, f.$)(C),
        P = (0, d.s)(m),
        M = (0, i.f)(E),
        A = (0, i.f)(w),
        L = (0, i.f)(R),
        $ = (0, i.f)(b);
      k && (P.handleCloseOptions = M.current?.__options);
      let D = (0, o.f)(() =>
          (0, p.a)(v.current.openEvent?.type, P.interactedInside),
        ),
        H = (0, o.f)((e) => (0, s.x)(e, m.context.triggerElements)),
        W = (0, o.f)((e, t, n) => {
          let i = m.context.triggerElements;
          return i.hasElement(t)
            ? !e || !(0, s.I)(e, t)
            : !!(0, r.m)(n) &&
                i.hasMatchingElement((e) => (0, s.I)(e, n)) &&
                (!e || !(0, s.I)(e, n));
        }),
        B = t.useCallback(
          (e, t = !0) => {
            let n = (0, p.c)(A.current, "close", P.pointerType);
            n
              ? P.openChangeTimeout.start(n, () => {
                  (m.setOpen(!1, (0, a.f)(c.f.triggerHover, e)),
                    I?.events.emit("floating.closed", e));
                })
              : t &&
                (P.openChangeTimeout.clear(),
                m.setOpen(!1, (0, a.f)(c.f.triggerHover, e)),
                I?.events.emit("floating.closed", e));
          },
          [A, m, P, I],
        ),
        N = (0, o.f)(() => {
          P.handler &&
            ((0, l.f)(m.select("domReferenceElement")).removeEventListener(
              "mousemove",
              P.handler,
            ),
            (P.handler = void 0));
        });
      t.useEffect(() => N, [N]);
      let j = (0, o.f)(() => {
        (0, d.O)(P);
      });
      return (
        t.useEffect(() => {
          if (b)
            return (
              y.on("openchange", e),
              () => {
                y.off("openchange", e);
              }
            );
          function e(e) {
            e.open ||
              (N(),
              P.openChangeTimeout.clear(),
              P.restTimeout.clear(),
              (P.blockMouseMove = !0),
              (P.restTimeoutPending = !1));
          }
        }, [b, y, P, N]),
        t.useEffect(() => {
          if (!b) return;
          let e = T.current ?? (k ? m.select("domReferenceElement") : null);
          if ((0, r.m)(e))
            return (
              S && e.addEventListener("mousemove", t, { once: !0 }),
              e.addEventListener("mouseenter", t),
              e.addEventListener("mouseleave", n),
              () => {
                (S && e.removeEventListener("mousemove", t),
                  e.removeEventListener("mouseenter", t),
                  e.removeEventListener("mouseleave", n));
              }
            );
          function t(e) {
            if (
              (P.openChangeTimeout.clear(),
              (P.blockMouseMove = !1),
              (x && !(0, u.J)(P.pointerType)) ||
                ((0, p.Z)(L.current) > 0 && !(0, p.c)(A.current, "open")))
            )
              return;
            let t = (0, p.c)(A.current, "open", P.pointerType),
              n = e.currentTarget ?? null,
              r = m.select("domReferenceElement"),
              i = null != n && W(r, n, e.target),
              o = m.select("open"),
              l = !o || i;
            i && o
              ? m.setOpen(!0, (0, a.f)(c.f.triggerHover, e, n))
              : t
                ? P.openChangeTimeout.start(t, () => {
                    l && m.setOpen(!0, (0, a.f)(c.f.triggerHover, e, n));
                  })
                : l && m.setOpen(!0, (0, a.f)(c.f.triggerHover, e, n));
          }
          function n(e) {
            if (D()) return void j();
            N();
            let t = m.select("domReferenceElement"),
              n = (0, l.f)(t);
            (P.restTimeout.clear(), (P.restTimeoutPending = !1));
            let r = v.current.floatingContext ?? O?.();
            if (!H(e.relatedTarget)) {
              if (M.current && r) {
                m.select("open") || P.openChangeTimeout.clear();
                let t = T.current;
                ((P.handler = M.current({
                  ...r,
                  tree: I,
                  x: e.clientX,
                  y: e.clientY,
                  onClose() {
                    (j(),
                      N(),
                      $.current &&
                        !D() &&
                        t === m.select("domReferenceElement") &&
                        B(e, !0));
                  },
                })),
                  n.addEventListener("mousemove", P.handler),
                  P.handler(e));
                return;
              }
              ("touch" === P.pointerType &&
                (0, s.I)(m.select("floatingElement"), e.relatedTarget)) ||
                B(e);
            }
          }
        }, [N, j, v, A, B, m, b, M, P, k, W, D, H, x, S, L, T, I, $, O]),
        t.useMemo(() => {
          if (b)
            return {
              onPointerDown: e,
              onPointerEnter: e,
              onMouseMove(e) {
                let { nativeEvent: t } = e,
                  r = e.currentTarget,
                  i = m.select("domReferenceElement"),
                  o = m.select("open"),
                  l = W(i, r, e.target);
                if (x && !(0, u.J)(P.pointerType)) return;
                let s = (0, p.Z)(L.current);
                function f() {
                  if (((P.restTimeoutPending = !1), D())) return;
                  let e = m.select("open");
                  P.blockMouseMove ||
                    (e && !l) ||
                    m.setOpen(!0, (0, a.f)(c.f.triggerHover, t, r));
                }
                (!o || l) &&
                  0 !== s &&
                  ((!l &&
                    P.restTimeoutPending &&
                    e.movementX ** 2 + e.movementY ** 2 < 2) ||
                    (P.restTimeout.clear(),
                    "touch" === P.pointerType
                      ? n.flushSync(() => {
                          f();
                        })
                      : l && o
                        ? f()
                        : ((P.restTimeoutPending = !0),
                          P.restTimeout.start(s, f))));
              },
            };
          function e(e) {
            P.pointerType = e.pointerType;
          }
        }, [b, P, D, W, x, m, L])
      );
    },
  ]);
};
