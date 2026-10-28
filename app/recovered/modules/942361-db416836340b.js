// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(761806),
    n = e.i(482486),
    i = e.i(34024),
    a = e.i(419965),
    l = e.i(732486),
    s = e.i(226115),
    o = e.i(732612),
    c = e.i(430186),
    u = e.i(36177),
    d = e.i(648585),
    f = e.i(523686),
    m = e.i(833551),
    p = e.i(854274),
    h = e.i(549367),
    g = e.i(906259);
  let x = t.forwardRef(function (e, r) {
    let { render: i, className: l, ...x } = e,
      {
        setAnchor: v,
        actionsRef: y,
        internalBackdropRef: b,
        backdropRef: w,
        positionerRef: _,
        allowMouseUpTriggerRef: C,
        initialCursorPointRef: S,
        rootId: k,
      } = (0, n.Z)(!1),
      { store: j } = (0, a.h)(!1),
      N = j.useState("open"),
      I = j.useState("disabled"),
      E = t.useRef(null),
      R = t.useRef(null),
      A = (0, o.e)(),
      P = (0, o.e)(),
      L = t.useRef(!1);
    function M(e, t, r) {
      let n = r.type.startsWith("touch");
      ((S.current = { x: e, y: t }),
        v({
          getBoundingClientRect: () =>
            DOMRect.fromRect({ width: 10 * !!n, height: 10 * !!n, x: e, y: t }),
        }),
        (L.current = !1),
        y.current?.setOpen(!0, (0, f.f)(p.f.triggerPress, r)),
        P.start(500, () => {
          L.current = !0;
        }));
    }
    function $() {
      (A.clear(), (R.current = null));
    }
    return (
      t.useEffect(() => {
        function e(e) {
          if (I) return;
          let t = (0, c.Z)(e);
          ((0, c.I)(E.current, t) ||
            (0, c.I)(b.current, t) ||
            (0, c.I)(w.current, t)) &&
            e.preventDefault();
        }
        let t = (0, s.f)(E.current);
        return (
          t.addEventListener("contextmenu", e),
          () => {
            t.removeEventListener("contextmenu", e);
          }
        );
      }, [w, I, b]),
      (0, d.f)("div", e, {
        state: { open: N },
        ref: [E, r],
        props: [
          {
            onContextMenu: function (e) {
              I ||
                ((C.current = !0),
                (0, u.Y)(e),
                M(e.clientX, e.clientY, e.nativeEvent),
                (0, s.f)(E.current).addEventListener(
                  "mouseup",
                  (e) => {
                    if (((C.current = !1), !L.current)) return;
                    (P.clear(), (L.current = !1));
                    let t = (0, c.Z)(e);
                    (0, c.I)(_.current, t) ||
                      (k && t && (0, g.f)(t) === k) ||
                      y.current?.setOpen(!1, (0, f.f)(h.f.cancelOpen, e));
                  },
                  { once: !0 },
                ));
            },
            onTouchStart: function (e) {
              if (!I && ((C.current = !1), 1 === e.touches.length)) {
                e.stopPropagation();
                let t = e.touches[0];
                ((R.current = { x: t.clientX, y: t.clientY }),
                  A.start(500, () => {
                    R.current && M(R.current.x, R.current.y, e.nativeEvent);
                  }));
              }
            },
            onTouchMove: function (e) {
              if (A.isStarted() && R.current && 1 === e.touches.length) {
                let t = e.touches[0],
                  r = Math.abs(t.clientX - R.current.x),
                  n = Math.abs(t.clientY - R.current.y);
                (r > 10 || n > 10) && A.clear();
              }
            },
            onTouchEnd: $,
            onTouchCancel: $,
            style: { WebkitTouchCallout: "none" },
          },
          x,
        ],
        stateAttributesMapping: m.f,
      })
    );
  });
  e.s(
    [
      "Root",
      0,
      function (e) {
        let [s, o] = t.useState({
            getBoundingClientRect: () =>
              DOMRect.fromRect({ width: 0, height: 0, x: 0, y: 0 }),
          }),
          c = t.useRef(null),
          u = t.useRef(null),
          d = t.useRef(null),
          f = t.useRef(null),
          m = t.useRef(!0),
          p = t.useRef(null),
          h = (0, r.f)(),
          g = t.useMemo(
            () => ({
              anchor: s,
              setAnchor: o,
              actionsRef: d,
              backdropRef: c,
              internalBackdropRef: u,
              positionerRef: f,
              allowMouseUpTriggerRef: m,
              initialCursorPointRef: p,
              rootId: h,
            }),
            [s, h],
          );
        return (0, l.jsx)(n.R.Provider, {
          value: g,
          children: (0, l.jsx)(a.c.Provider, {
            value: void 0,
            children: (0, l.jsx)(i.f.Root, { ...e }),
          }),
        });
      },
      "Trigger",
      0,
      x,
    ],
    645972,
  );
  var v = e.i(645972);
  (e.s(["f", 0, v], 942361), e.s(["f", 0, v], 7283));
  var y = e.i(445242),
    b = e.i(985526),
    w = e.i(283087),
    _ = e.i(573525);
  e.s(
    [
      "f",
      0,
      function (e) {
        let r,
          n,
          i,
          a,
          l,
          s,
          o,
          c = (0, y.c)(13),
          { walletAddress: u, mint: d, enabled: f, onBalanceChange: m } = e;
        c[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((r = new Map()), (c[0] = r))
          : (r = c[0]);
        let p = (0, t.useRef)(r),
          h = (0, t.useRef)(m);
        (c[1] !== m
          ? ((n = () => {
              h.current = m;
            }),
            (i = [m]),
            (c[1] = m),
            (c[2] = n),
            (c[3] = i))
          : ((n = c[2]), (i = c[3])),
          (0, t.useEffect)(n, i),
          c[4] === Symbol.for("react.memo_cache_sentinel")
            ? ((a = () => {
                p.current = new Map();
              }),
              (c[4] = a))
            : (a = c[4]),
          c[5] !== u ? ((l = [u]), (c[5] = u), (c[6] = l)) : (l = c[6]),
          (0, t.useEffect)(a, l),
          c[7] !== u
            ? ((s = (e) => {
                if (
                  !e ||
                  "string" != typeof e.walletAddress ||
                  "string" != typeof e.tokenMint ||
                  (u && e.walletAddress !== u)
                )
                  return;
                let t = `${e.walletAddress}:${e.tokenMint}`,
                  r = p.current.get(t) ?? -1;
                ("number" == typeof e.slot && e.slot < r) ||
                  (p.current.set(t, "number" == typeof e.slot ? e.slot : r),
                  h.current?.(e));
              }),
              (c[7] = u),
              (c[8] = s))
            : (s = c[8]));
        let g = s,
          x = u ? `account_balance_change.${u}.${d ?? "*"}` : "",
          v = (0, w.f)(),
          C = (void 0 === f || f) && !!u && v;
        (c[9] !== g || c[10] !== x || c[11] !== C
          ? ((o = { type: b.N.Core, subject: x, enabled: C, onEvent: g }),
            (c[9] = g),
            (c[10] = x),
            (c[11] = C),
            (c[12] = o))
          : (o = c[12]),
          (0, _.f)(o));
      },
    ],
    628959,
  );
};
