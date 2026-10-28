// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    n = e.i(92615),
    r = e.i(278051),
    i = e.i(565693),
    o = e.i(732612),
    l = e.i(226115),
    s = e.i(493798),
    u = e.i(430186),
    a = e.i(523686),
    c = e.i(875355),
    f = e.i(656522),
    d = e.i(409102),
    p = e.i(530001);
  e.s([
    "f",
    0,
    function (e, g = {}) {
      let h = "rootStore" in e ? e.rootStore : e,
        m = h.useState("open"),
        v = h.useState("floatingElement"),
        y = h.useState("domReferenceElement"),
        { dataRef: b } = h.context,
        { enabled: w = !0, closeDelay: E = 0 } = g,
        x = (0, d.s)(h),
        R = (0, f.$)(),
        S = (0, f.G)(),
        T = (0, r.f)(() =>
          (0, p.a)(b.current.openEvent?.type, x.interactedInside),
        ),
        C = (0, r.f)(() => {
          let e = b.current.openEvent?.type;
          return e?.includes("mouse") && "mousedown" !== e;
        }),
        k = (0, r.f)((e) => (0, u.x)(e, h.context.triggerElements)),
        O = t.useCallback(
          (e) => {
            let t = (0, p.c)(E, "close", x.pointerType),
              n = () => {
                (h.setOpen(!1, (0, a.f)(c.f.triggerHover, e)),
                  R?.events.emit("floating.closed", e));
              };
            t
              ? x.openChangeTimeout.start(t, n)
              : (x.openChangeTimeout.clear(), n());
          },
          [E, h, x, R],
        ),
        I = (0, r.f)(() => {
          (0, d.O)(x);
        }),
        P = (0, r.f)((e) => {
          let t = (0, u.Z)(e);
          if (!(0, d.W)(t)) {
            x.interactedInside = !1;
            return;
          }
          x.interactedInside = t?.closest("[aria-haspopup]") != null;
        });
      ((0, i.f)(() => {
        m ||
          ((x.pointerType = void 0),
          (x.restTimeoutPending = !1),
          (x.interactedInside = !1),
          I());
      }, [m, x, I]),
        t.useEffect(() => I, [I]),
        (0, i.f)(() => {
          if (
            w &&
            m &&
            x.handleCloseOptions?.blockPointerEvents &&
            C() &&
            (0, n.m)(y) &&
            v
          ) {
            let e = (0, l.f)(v),
              t = R?.nodesRef.current.find((e) => e.id === S)?.context?.elements
                .floating;
            t && (t.style.pointerEvents = "");
            let n =
              x.handleCloseOptions?.getScope?.() ??
              x.pointerEventsScopeElement ??
              t ??
              y.closest("[data-rootownerid]") ??
              e.body;
            return (
              (0, d.p)(x, {
                scopeElement: n,
                referenceElement: y,
                floatingElement: v,
              }),
              () => {
                I();
              }
            );
          }
        }, [w, m, y, v, x, C, R, S, I]));
      let M = (0, o.e)();
      t.useEffect(() => {
        if (w)
          return (
            v &&
              (v.addEventListener("mouseenter", e),
              v.addEventListener("mouseleave", t),
              v.addEventListener("pointerdown", P, !0)),
            () => {
              (v &&
                (v.removeEventListener("mouseenter", e),
                v.removeEventListener("mouseleave", t),
                v.removeEventListener("pointerdown", P, !0)),
                R?.events.off("floating.closed", n));
            }
          );
        function e() {
          (x.openChangeTimeout.clear(),
            M.clear(),
            R?.events.off("floating.closed", n),
            I());
        }
        function t(e) {
          if (R && S && (0, s.Q)(R.nodesRef.current, S).length > 0)
            return void R.events.on("floating.closed", n);
          if (!k(e.relatedTarget)) {
            if (x.handler) return void x.handler(e);
            (I(), T() || O(e));
          }
        }
        function n(e) {
          R &&
            S &&
            !((0, s.Q)(R.nodesRef.current, S).length > 0) &&
            M.start(0, () => {
              (R.events.off("floating.closed", n),
                h.setOpen(!1, (0, a.f)(c.f.triggerHover, e)),
                R.events.emit("floating.closed", e));
            });
        }
      }, [w, v, h, b, T, k, O, I, P, x, R, S, M]);
    },
  ]);
};
