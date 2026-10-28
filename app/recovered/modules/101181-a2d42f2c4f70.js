// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386);
  e.s([
    "f",
    0,
    function (e) {
      let i,
        l,
        n,
        a,
        s,
        o,
        d,
        c,
        u,
        m,
        h,
        f,
        x,
        p = (0, t.c)(21);
      p[0] !== e
        ? ((i = void 0 === e ? {} : e), (p[0] = e), (p[1] = i))
        : (i = p[1]);
      let { resumeDelayMs: y } = i,
        v = void 0 === y ? 400 : y,
        [w, b] = (0, r.useState)(!1);
      p[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = { hover: !1, focus: !1, selection: !1 }), (p[2] = l))
        : (l = p[2]);
      let g = (0, r.useRef)(l),
        j = (0, r.useRef)(null),
        _ = (0, r.useRef)(null);
      p[3] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = () => {
            null !== _.current && (clearTimeout(_.current), (_.current = null));
          }),
          (p[3] = n))
        : (n = p[3]);
      let k = n;
      p[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = () => {
            let e = g.current;
            return e.hover || e.focus || e.selection;
          }),
          (p[4] = a))
        : (a = p[4]);
      let C = a;
      p[5] !== v
        ? ((s = () => {
            if (C()) {
              (k(), b(!0));
              return;
            }
            null === _.current &&
              (_.current = setTimeout(() => {
                ((_.current = null), C() || b(!1));
              }, v));
          }),
          (p[5] = v),
          (p[6] = s))
        : (s = p[6]);
      let N = s;
      p[7] !== N
        ? ((o = (e, t) => {
            g.current[e] !== t && ((g.current[e] = t), N());
          }),
          (p[7] = N),
          (p[8] = o))
        : (o = p[8]);
      let A = o;
      (p[9] !== A
        ? ((d = () => {
            let e = () => {
              let e = j.current,
                t = document.getSelection();
              A(
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
          (c = [A]),
          (p[9] = A),
          (p[10] = d),
          (p[11] = c))
        : ((d = p[10]), (c = p[11])),
        (0, r.useEffect)(d, c),
        p[12] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = () => k), (m = [k]), (p[12] = u), (p[13] = m))
          : ((u = p[12]), (m = p[13])),
        (0, r.useEffect)(u, m),
        p[14] !== A
          ? ((h = () => {
              let e = j.current;
              e &&
                !e.isConnected &&
                ((j.current = null),
                A("hover", !1),
                A("focus", !1),
                A("selection", !1));
            }),
            (p[14] = A),
            (p[15] = h))
          : (h = p[15]),
        (0, r.useEffect)(h),
        p[16] !== A
          ? ((f = {
              onPointerEnter: (e) => {
                ((j.current = e.currentTarget),
                  "touch" !== e.pointerType && A("hover", !0));
              },
              onPointerLeave: (e) => {
                "touch" !== e.pointerType && A("hover", !1);
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
                  })(e.target) && A("focus", !0));
              },
              onBlur: (e) => {
                let t = e.relatedTarget;
                (t instanceof Node && e.currentTarget.contains(t)) ||
                  A("focus", !1);
              },
            }),
            (p[16] = A),
            (p[17] = f))
          : (f = p[17]));
      let I = f;
      return (
        p[18] !== w || p[19] !== I
          ? ((x = { paused: w, targetProps: I }),
            (p[18] = w),
            (p[19] = I),
            (p[20] = x))
          : (x = p[20]),
        x
      );
    },
  ]);
};
