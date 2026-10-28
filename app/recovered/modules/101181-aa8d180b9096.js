// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    l = e.i(352386);
  e.s([
    "f",
    0,
    function (e) {
      let r,
        n,
        i,
        a,
        s,
        o,
        c,
        d,
        u,
        m,
        f,
        x,
        h,
        p = (0, t.c)(21);
      p[0] !== e
        ? ((r = void 0 === e ? {} : e), (p[0] = e), (p[1] = r))
        : (r = p[1]);
      let { resumeDelayMs: g } = r,
        b = void 0 === g ? 400 : g,
        [v, y] = (0, l.useState)(!1);
      p[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = { hover: !1, focus: !1, selection: !1 }), (p[2] = n))
        : (n = p[2]);
      let _ = (0, l.useRef)(n),
        j = (0, l.useRef)(null),
        w = (0, l.useRef)(null);
      p[3] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = () => {
            null !== w.current && (clearTimeout(w.current), (w.current = null));
          }),
          (p[3] = i))
        : (i = p[3]);
      let N = i;
      p[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = () => {
            let e = _.current;
            return e.hover || e.focus || e.selection;
          }),
          (p[4] = a))
        : (a = p[4]);
      let k = a;
      p[5] !== b
        ? ((s = () => {
            if (k()) {
              (N(), y(!0));
              return;
            }
            null === w.current &&
              (w.current = setTimeout(() => {
                ((w.current = null), k() || y(!1));
              }, b));
          }),
          (p[5] = b),
          (p[6] = s))
        : (s = p[6]);
      let S = s;
      p[7] !== S
        ? ((o = (e, t) => {
            _.current[e] !== t && ((_.current[e] = t), S());
          }),
          (p[7] = S),
          (p[8] = o))
        : (o = p[8]);
      let C = o;
      (p[9] !== C
        ? ((c = () => {
            let e = () => {
              let e = j.current,
                t = document.getSelection();
              C(
                "selection",
                !!(
                  e &&
                  t &&
                  !t.isCollapsed &&
                  t.anchorNode &&
                  e.contains(t.anchorNode)
                ),
              );
            };
            return (
              document.addEventListener("selectionchange", e),
              () => {
                document.removeEventListener("selectionchange", e);
              }
            );
          }),
          (d = [C]),
          (p[9] = C),
          (p[10] = c),
          (p[11] = d))
        : ((c = p[10]), (d = p[11])),
        (0, l.useEffect)(c, d),
        p[12] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = () => N), (m = [N]), (p[12] = u), (p[13] = m))
          : ((u = p[12]), (m = p[13])),
        (0, l.useEffect)(u, m),
        p[14] !== C
          ? ((f = () => {
              let e = j.current;
              e &&
                !e.isConnected &&
                ((j.current = null),
                C("hover", !1),
                C("focus", !1),
                C("selection", !1));
            }),
            (p[14] = C),
            (p[15] = f))
          : (f = p[15]),
        (0, l.useEffect)(f),
        p[16] !== C
          ? ((x = {
              onPointerEnter: (e) => {
                ((j.current = e.currentTarget),
                  "touch" !== e.pointerType && C("hover", !0));
              },
              onPointerLeave: (e) => {
                "touch" !== e.pointerType && C("hover", !1);
              },
              onFocus: (e) => {
                ((j.current = e.currentTarget),
                  ((e) => {
                    if (!(e instanceof Element)) return !1;
                    try {
                      return e.matches(":focus-visible");
                    } catch {
                      return !0;
                    }
                  })(e.target) && C("focus", !0));
              },
              onBlur: (e) => {
                let t = e.relatedTarget;
                (t instanceof Node && e.currentTarget.contains(t)) ||
                  C("focus", !1);
              },
            }),
            (p[16] = C),
            (p[17] = x))
          : (x = p[17]));
      let M = x;
      return (
        p[18] !== v || p[19] !== M
          ? ((h = { paused: v, targetProps: M }),
            (p[18] = v),
            (p[19] = M),
            (p[20] = h))
          : (h = p[20]),
        h
      );
    },
  ]);
};
