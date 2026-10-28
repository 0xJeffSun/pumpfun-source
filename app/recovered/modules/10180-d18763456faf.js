// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386);
  e.s(
    [
      "f",
      0,
      function (e) {
        let n = t.useRef(!0);
        n.current && ((n.current = !1), e());
      },
    ],
    10180,
  );
  var n = e.i(92615),
    r = e.i(732612),
    i = e.i(278051),
    o = e.i(226115),
    l = e.i(430186),
    s = e.i(36177),
    u = e.i(493798),
    a = e.i(656522),
    c = e.i(523686),
    f = e.i(913281),
    d = e.i(128969),
    p = e.i(854274),
    g = e.i(555877);
  let h = { intentional: "onClick", sloppy: "onPointerDown" };
  function m() {
    return !1;
  }
  e.s(
    [
      "f",
      0,
      function (e, v = {}) {
        let y = "rootStore" in e ? e.rootStore : e,
          b = y.useState("open"),
          w = y.useState("floatingElement"),
          { dataRef: E } = y.context,
          {
            enabled: x = !0,
            escapeKey: R = !0,
            outsidePress: S = !0,
            outsidePressEvent: T = "sloppy",
            referencePress: C = m,
            referencePressEvent: k = "sloppy",
            bubbles: O,
            externalTree: I,
          } = v,
          P = (0, a.$)(I),
          M = (0, i.f)("function" == typeof S ? S : () => !1),
          A = "function" == typeof S ? M : S,
          L = !1 !== A,
          $ = (0, i.f)(() => T),
          D = t.useRef(!1),
          H = t.useRef(!1),
          W = t.useRef(!1),
          { escapeKey: B, outsidePress: N } = {
            escapeKey: "boolean" == typeof O ? O : (O?.escapeKey ?? !1),
            outsidePress: "boolean" == typeof O ? O : (O?.outsidePress ?? !0),
          },
          j = t.useRef(null),
          F = (0, r.e)(),
          V = (0, r.e)(),
          _ = (0, i.f)(() => {
            (V.clear(), (E.current.insideReactTree = !1));
          }),
          U = t.useRef(!1),
          z = t.useRef(""),
          q = (0, i.f)(C),
          X = (0, i.f)((e) => {
            if (!b || !x || !R || "Escape" !== e.key || U.current) return;
            let t = E.current.floatingContext?.nodeId,
              n = P ? (0, u.Q)(P.nodesRef.current, t) : [];
            if (!B && n.length > 0) {
              let e = !0;
              if (
                (n.forEach((t) => {
                  t.context?.open &&
                    !t.context.dataRef.current.__escapeKeyBubbles &&
                    (e = !1);
                }),
                !e)
              )
                return;
            }
            let r = (0, s.M)(e) ? e.nativeEvent : e,
              i = (0, c.f)(f.f.escapeKey, r);
            (y.setOpen(!1, i),
              B || i.isPropagationAllowed || e.stopPropagation());
          }),
          Y = (0, i.f)(() => {
            ((E.current.insideReactTree = !0), V.start(0, _));
          });
        (t.useEffect(() => {
          if (!b || !x) return;
          ((E.current.__escapeKeyBubbles = B),
            (E.current.__outsidePressBubbles = N));
          let e = new r.U(),
            t = new r.U();
          function i() {
            (e.clear(), (U.current = !0));
          }
          function s() {
            e.start(5 * !!(0, n.i)(), () => {
              U.current = !1;
            });
          }
          function a() {
            ((W.current = !0),
              t.start(0, () => {
                W.current = !1;
              }));
          }
          function f() {
            ((D.current = !1), (H.current = !1));
          }
          function p() {
            let e = z.current,
              t = $(),
              n = "function" == typeof t ? t() : t;
            return "string" == typeof n ? n : n["pen" !== e && e ? e : "mouse"];
          }
          function h(e) {
            let t = E.current.floatingContext?.nodeId,
              n =
                P &&
                (0, u.Q)(P.nodesRef.current, t).some((t) =>
                  (0, l.V)(e, t.context?.elements.floating),
                );
            return (
              (0, l.V)(e, y.select("floatingElement")) ||
              (0, l.V)(e, y.select("domReferenceElement")) ||
              n
            );
          }
          function m(e) {
            let r;
            if (
              ("intentional" === (r = p()) && "click" !== e.type) ||
              ("sloppy" === r && "click" === e.type) ||
              E.current.insideReactTree
            )
              return void _();
            let i = (0, l.Z)(e),
              s = `[${(0, g.f)("inert")}]`,
              a = Array.from(
                (0, o.f)(y.select("floatingElement")).querySelectorAll(s),
              ),
              f = (0, n.m)(i) ? i.getRootNode() : null;
            (0, n.R)(f) && (a = a.concat(Array.from(f.querySelectorAll(s))));
            let m = y.context.triggerElements;
            if (
              i &&
              (m.hasElement(i) || m.hasMatchingElement((e) => (0, l.I)(e, i)))
            )
              return;
            let v = (0, n.m)(i) ? i : null;
            for (; v && !(0, n.Z)(v); ) {
              let e = (0, n.I)(v);
              if ((0, n.Z)(e) || !(0, n.m)(e)) break;
              v = e;
            }
            if (
              a.length &&
              (0, n.m)(i) &&
              !(0, l.W)(i) &&
              !(0, l.I)(i, y.select("floatingElement")) &&
              a.every((e) => !(0, l.I)(v, e))
            )
              return;
            if ((0, n.E)(i) && !("touches" in e)) {
              let t = (0, n.Z)(i),
                r = (0, n.X)(i),
                o = /auto|scroll/,
                l = t || o.test(r.overflowX),
                s = t || o.test(r.overflowY),
                u = l && i.clientWidth > 0 && i.scrollWidth > i.clientWidth,
                a = s && i.clientHeight > 0 && i.scrollHeight > i.clientHeight,
                c = "rtl" === r.direction,
                f =
                  a &&
                  (c
                    ? e.offsetX <= i.offsetWidth - i.clientWidth
                    : e.offsetX > i.clientWidth),
                d = u && e.offsetY > i.clientHeight;
              if (f || d) return;
            }
            if (h(e)) return;
            if ("intentional" === p() && W.current) {
              (t.clear(), (W.current = !1));
              return;
            }
            if ("function" == typeof A && !A(e)) return;
            let b = E.current.floatingContext?.nodeId,
              w = P ? (0, u.Q)(P.nodesRef.current, b) : [];
            if (w.length > 0) {
              let e = !0;
              if (
                (w.forEach((t) => {
                  t.context?.open &&
                    !t.context.dataRef.current.__outsidePressBubbles &&
                    (e = !1);
                }),
                !e)
              )
                return;
            }
            (y.setOpen(!1, (0, c.f)(d.f.outsidePress, e)), _());
          }
          function v(e) {
            z.current = "touch";
            let t = (0, l.Z)(e);
            t?.addEventListener(e.type, function n() {
              (!(function (e) {
                if (
                  "sloppy" !== p() ||
                  !y.select("open") ||
                  !x ||
                  (0, l.V)(e, y.select("floatingElement")) ||
                  (0, l.V)(e, y.select("domReferenceElement"))
                )
                  return;
                let t = e.touches[0];
                t &&
                  ((j.current = {
                    startTime: Date.now(),
                    startX: t.clientX,
                    startY: t.clientY,
                    dismissOnTouchEnd: !1,
                    dismissOnMouseDown: !0,
                  }),
                  F.start(1e3, () => {
                    j.current &&
                      ((j.current.dismissOnTouchEnd = !1),
                      (j.current.dismissOnMouseDown = !1));
                  }));
              })(e),
                t?.removeEventListener(e.type, n));
            });
          }
          function S(e) {
            if (
              (F.clear(),
              "pointerdown" === e.type && (z.current = e.pointerType),
              "mousedown" === e.type &&
                j.current &&
                !j.current.dismissOnMouseDown)
            )
              return;
            let t = (0, l.Z)(e);
            t?.addEventListener(e.type, function n() {
              if ("pointerdown" === e.type)
                "sloppy" !== p() ||
                  "touch" === e.pointerType ||
                  !y.select("open") ||
                  !x ||
                  (0, l.V)(e, y.select("floatingElement")) ||
                  (0, l.V)(e, y.select("domReferenceElement")) ||
                  m(e);
              else m(e);
              t?.removeEventListener(e.type, n);
            });
          }
          function T(e) {
            if (!D.current) return;
            let n = H.current;
            if ((f(), "intentional" === p())) {
              if ("pointercancel" === e.type) {
                n && a();
                return;
              }
              h(e) ||
                (n
                  ? a()
                  : ("function" != typeof A || A(e)) &&
                    (t.clear(), (W.current = !0), _()));
            }
          }
          function C(e) {
            let t = (0, l.Z)(e);
            t?.addEventListener(e.type, function n() {
              (!(function (e) {
                if (
                  "sloppy" !== p() ||
                  !j.current ||
                  (0, l.V)(e, y.select("floatingElement")) ||
                  (0, l.V)(e, y.select("domReferenceElement"))
                )
                  return;
                let t = e.touches[0];
                if (!t) return;
                let n = Math.abs(t.clientX - j.current.startX),
                  r = Math.abs(t.clientY - j.current.startY),
                  i = Math.sqrt(n * n + r * r);
                (i > 5 && (j.current.dismissOnTouchEnd = !0),
                  i > 10 && (m(e), F.clear(), (j.current = null)));
              })(e),
                t?.removeEventListener(e.type, n));
            });
          }
          function k(e) {
            let t = (0, l.Z)(e);
            t?.addEventListener(e.type, function n() {
              ("sloppy" !== p() ||
                !j.current ||
                (0, l.V)(e, y.select("floatingElement")) ||
                (0, l.V)(e, y.select("domReferenceElement")) ||
                (j.current.dismissOnTouchEnd && m(e),
                F.clear(),
                (j.current = null)),
                t?.removeEventListener(e.type, n));
            });
          }
          let O = (0, o.f)(w);
          return (
            R &&
              (O.addEventListener("keydown", X),
              O.addEventListener("compositionstart", i),
              O.addEventListener("compositionend", s)),
            L &&
              (O.addEventListener("click", S, !0),
              O.addEventListener("pointerdown", S, !0),
              O.addEventListener("pointerup", T, !0),
              O.addEventListener("pointercancel", T, !0),
              O.addEventListener("mousedown", S, !0),
              O.addEventListener("mouseup", T, !0),
              O.addEventListener("touchstart", v, !0),
              O.addEventListener("touchmove", C, !0),
              O.addEventListener("touchend", k, !0)),
            () => {
              (R &&
                (O.removeEventListener("keydown", X),
                O.removeEventListener("compositionstart", i),
                O.removeEventListener("compositionend", s)),
                L &&
                  (O.removeEventListener("click", S, !0),
                  O.removeEventListener("pointerdown", S, !0),
                  O.removeEventListener("pointerup", T, !0),
                  O.removeEventListener("pointercancel", T, !0),
                  O.removeEventListener("mousedown", S, !0),
                  O.removeEventListener("mouseup", T, !0),
                  O.removeEventListener("touchstart", v, !0),
                  O.removeEventListener("touchmove", C, !0),
                  O.removeEventListener("touchend", k, !0)),
                e.clear(),
                t.clear(),
                f(),
                (W.current = !1));
            }
          );
        }, [E, w, R, L, A, b, x, B, N, X, _, $, P, y, F]),
          t.useEffect(_, [A, _]));
        let K = t.useMemo(
            () => ({
              onKeyDown: X,
              [h[k]]: (e) => {
                q() && y.setOpen(!1, (0, c.f)(p.f.triggerPress, e.nativeEvent));
              },
              ...("intentional" !== k && {
                onClick(e) {
                  q() &&
                    y.setOpen(!1, (0, c.f)(p.f.triggerPress, e.nativeEvent));
                },
              }),
            }),
            [X, y, k, q],
          ),
          G = (0, i.f)((e) => {
            if (!b || !x || 0 !== e.button) return;
            let t = (0, l.Z)(e.nativeEvent);
            (0, l.I)(y.select("floatingElement"), t) &&
              (D.current || ((D.current = !0), (H.current = !1)));
          }),
          Z = (0, i.f)((e) => {
            !b ||
              !x ||
              ((e.defaultPrevented || e.nativeEvent.defaultPrevented) &&
                D.current &&
                (H.current = !0));
          }),
          J = t.useMemo(
            () => ({
              onKeyDown: X,
              onPointerDown: Z,
              onMouseDown: Z,
              onClickCapture: Y,
              onMouseDownCapture(e) {
                (Y(), G(e));
              },
              onPointerDownCapture(e) {
                (Y(), G(e));
              },
              onMouseUpCapture: Y,
              onTouchEndCapture: Y,
              onTouchMoveCapture: Y,
            }),
            [X, Y, G, Z],
          );
        return t.useMemo(
          () => (x ? { reference: K, floating: J, trigger: K } : {}),
          [x, K, J],
        );
      },
    ],
    385676,
  );
};
