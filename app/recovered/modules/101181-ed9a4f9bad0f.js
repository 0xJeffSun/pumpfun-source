// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386);
  e.s([
    "f",
    0,
    function (e) {
      let l,
        a,
        i,
        n,
        s,
        o,
        d,
        c,
        u,
        m,
        f,
        p,
        h,
        v = (0, t.c)(21);
      v[0] !== e
        ? ((l = void 0 === e ? {} : e), (v[0] = e), (v[1] = l))
        : (l = v[1]);
      let { resumeDelayMs: b } = l,
        g = void 0 === b ? 400 : b,
        [y, x] = (0, r.useState)(!1);
      v[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = { hover: !1, focus: !1, selection: !1 }), (v[2] = a))
        : (a = v[2]);
      let w = (0, r.useRef)(a),
        _ = (0, r.useRef)(null),
        A = (0, r.useRef)(null);
      v[3] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = () => {
            null !== A.current && (clearTimeout(A.current), (A.current = null));
          }),
          (v[3] = i))
        : (i = v[3]);
      let j = i;
      v[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = () => {
            let e = w.current;
            return e.hover || e.focus || e.selection;
          }),
          (v[4] = n))
        : (n = v[4]);
      let I = n;
      v[5] !== g
        ? ((s = () => {
            if (I()) {
              (j(), x(!0));
              return;
            }
            null === A.current &&
              (A.current = setTimeout(() => {
                ((A.current = null), I() || x(!1));
              }, g));
          }),
          (v[5] = g),
          (v[6] = s))
        : (s = v[6]);
      let U = s;
      v[7] !== U
        ? ((o = (e, t) => {
            w.current[e] !== t && ((w.current[e] = t), U());
          }),
          (v[7] = U),
          (v[8] = o))
        : (o = v[8]);
      let S = o;
      (v[9] !== S
        ? ((d = () => {
            let e = () => {
              let e = _.current,
                t = document.getSelection();
              S(
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
          (c = [S]),
          (v[9] = S),
          (v[10] = d),
          (v[11] = c))
        : ((d = v[10]), (c = v[11])),
        (0, r.useEffect)(d, c),
        v[12] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = () => j), (m = [j]), (v[12] = u), (v[13] = m))
          : ((u = v[12]), (m = v[13])),
        (0, r.useEffect)(u, m),
        v[14] !== S
          ? ((f = () => {
              let e = _.current;
              e &&
                !e.isConnected &&
                ((_.current = null),
                S("hover", !1),
                S("focus", !1),
                S("selection", !1));
            }),
            (v[14] = S),
            (v[15] = f))
          : (f = v[15]),
        (0, r.useEffect)(f),
        v[16] !== S
          ? ((p = {
              onPointerEnter: (e) => {
                ((_.current = e.currentTarget),
                  "touch" !== e.pointerType && S("hover", !0));
              },
              onPointerLeave: (e) => {
                "touch" !== e.pointerType && S("hover", !1);
              },
              onFocus: (e) => {
                ((_.current = e.currentTarget),
                  ((e) => {
                    if (!(e instanceof Element)) return !1;
                    try {
                      return e.matches(":focus-visible");
                    } catch {
                      return !0;
                    }
                  })(e.target) && S("focus", !0));
              },
              onBlur: (e) => {
                let t = e.relatedTarget;
                (t instanceof Node && e.currentTarget.contains(t)) ||
                  S("focus", !1);
              },
            }),
            (v[16] = S),
            (v[17] = p))
          : (p = v[17]));
      let N = p;
      return (
        v[18] !== y || v[19] !== N
          ? ((h = { paused: y, targetProps: N }),
            (v[18] = y),
            (v[19] = N),
            (v[20] = h))
          : (h = v[20]),
        h
      );
    },
  ]);
};
