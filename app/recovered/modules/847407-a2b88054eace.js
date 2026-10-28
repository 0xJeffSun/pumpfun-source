// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    l = e.i(426091),
    i = e.i(352386),
    a = e.i(256272);
  let r = (e) => "number" == typeof e && Number.isFinite(e) && e > 0,
    s = (e, t) =>
      !(void 0 !== e && Number.isFinite(e)) ||
      (!(e < 15e3) && (!r(t) || e >= 0.1 * t));
  e.s(
    [
      "Z",
      0,
      3e3,
      "B",
      0,
      ({ tradeSizeUsd: e, marketCapUsd: t, valueLostPercent: n }) => {
        let l = r(e) ? e : void 0,
          i = r(t) ? t : void 0,
          a = null !== n && Number.isFinite(n) ? n : null,
          o = [];
        return (
          s(l, i) && o.push("big_trade"),
          null !== a &&
            Number.isFinite(a) &&
            a >= 40 &&
            o.push("extreme_impact"),
          {
            reasons: o,
            tradeSizeUsd: l,
            marketCapUsd: i,
            marketCapSharePercent:
              void 0 !== l && void 0 !== i ? (l / i) * 100 : null,
            valueLostPercent: a,
          }
        );
      },
      "W",
      0,
      s,
      "H",
      0,
      ({ paidUsd: e, receivedUsd: t }) =>
        r(e) && "number" == typeof t && Number.isFinite(t) && !(t < 0)
          ? (1 - t / e) * 100
          : null,
      "f",
      0,
      (...e) => {
        let t = e.filter((e) => "number" == typeof e && Number.isFinite(e));
        return t.length > 0 ? Math.max(...t) : null;
      },
    ],
    63225,
  );
  var o = e.i(833119),
    u = e.i(855659);
  let c = { buy: "bg-text-on-accent/20", sell: "bg-text-on-error/20" },
    d = {
      40: "h-10 px-3 text-[13px] font-semibold",
      24: "h-6 px-2 text-xs font-medium",
    };
  function m(e) {
    return e.preventDefault();
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let r,
          s,
          b,
          f,
          y,
          h,
          v,
          p,
          g,
          x,
          _,
          k,
          w,
          S,
          N,
          q,
          C = (0, n.c)(50),
          {
            side: I,
            idleLabel: j,
            holdingLabel: $,
            onConfirm: E,
            onHoldChange: L,
            disabled: P,
            size: R,
            className: D,
            "data-testid": T,
            ref: A,
          } = e,
          F = void 0 !== P && P,
          U = (0, u.q)((0, a.u)()),
          [B, M] = (0, i.useState)(!1),
          [O, z] = (0, i.useState)(3),
          H = (0, i.useRef)(null),
          V = (0, i.useRef)(null),
          K = (0, i.useRef)(E),
          W = (0, i.useRef)(F),
          Q = (0, i.useRef)(L);
        (C[0] !== F || C[1] !== E || C[2] !== L
          ? ((r = () => {
              ((K.current = E), (W.current = F), (Q.current = L));
            }),
            (s = [E, F, L]),
            (C[0] = F),
            (C[1] = E),
            (C[2] = L),
            (C[3] = r),
            (C[4] = s))
          : ((r = C[3]), (s = C[4])),
          (0, i.useEffect)(r, s),
          C[5] === Symbol.for("react.memo_cache_sentinel")
            ? ((b = () => {
                let e = null !== H.current;
                (null !== H.current &&
                  (window.clearTimeout(H.current), (H.current = null)),
                  null !== V.current &&
                    (window.clearInterval(V.current), (V.current = null)),
                  M(!1),
                  z(3),
                  e && Q.current?.(!1));
              }),
              (C[5] = b))
            : (b = C[5]));
        let G = b;
        C[6] !== F || C[7] !== G
          ? ((f = () => {
              if (F || null !== H.current) return;
              (M(!0), Q.current?.(!0));
              let e = Date.now();
              ((H.current = window.setTimeout(() => {
                (G(), W.current || K.current());
              }, 3e3)),
                (V.current = window.setInterval(() => {
                  z(Math.max(1, Math.ceil((3e3 - (Date.now() - e)) / 1e3)));
                }, 100)));
            }),
            (C[6] = F),
            (C[7] = G),
            (C[8] = f))
          : (f = C[8]);
        let J = f;
        (C[9] !== G ? ((y = () => G), (C[9] = G), (C[10] = y)) : (y = C[10]),
          C[11] === Symbol.for("react.memo_cache_sentinel")
            ? ((h = []), (C[11] = h))
            : (h = C[11]),
          (0, i.useEffect)(y, h),
          C[12] !== J
            ? ((v = (e) => {
                0 === e.button && (e.preventDefault(), J());
              }),
              (C[12] = J),
              (C[13] = v))
            : (v = C[13]));
        let Z = v;
        C[14] !== J || C[15] !== G
          ? ((p = (e) => {
              " " === e.key || "Enter" === e.key
                ? (e.preventDefault(), e.repeat || J())
                : "Escape" === e.key && G();
            }),
            (C[14] = J),
            (C[15] = G),
            (C[16] = p))
          : (p = C[16]);
        let Y = p;
        C[17] !== G
          ? ((g = (e) => {
              (" " === e.key || "Enter" === e.key) && (e.preventDefault(), G());
            }),
            (C[17] = G),
            (C[18] = g))
          : (g = C[18]);
        let X = g,
          ee = B || void 0;
        C[19] === Symbol.for("react.memo_cache_sentinel")
          ? ((x = { WebkitTouchCallout: "none" }), (C[19] = x))
          : (x = C[19]);
        let et = (0, l.c)(
            "relative w-full touch-none select-none overflow-hidden rounded-md leading-normal transition-colors disabled:opacity-50",
            o.h,
            d[void 0 === R ? 40 : R],
            U.cta[I],
            D,
          ),
          en = c[I];
        C[20] !== en
          ? ((_ = (0, l.c)("absolute inset-y-0 left-0", en)),
            (C[20] = en),
            (C[21] = _))
          : (_ = C[21]);
        let el = B ? "100%" : "0%",
          ei = B ? "width 3000ms linear" : "width 150ms ease-out";
        return (
          C[22] !== el || C[23] !== ei
            ? ((k = { width: el, transition: ei }),
              (C[22] = el),
              (C[23] = ei),
              (C[24] = k))
            : (k = C[24]),
          C[25] !== _ || C[26] !== k
            ? ((w = (0, t.jsx)("span", {
                "aria-hidden": !0,
                "data-testid": "hold-to-confirm-sweep",
                className: _,
                style: k,
              })),
              (C[25] = _),
              (C[26] = k),
              (C[27] = w))
            : (w = C[27]),
          C[28] !== $ || C[29] !== j || C[30] !== B || C[31] !== O
            ? ((S = B ? $(O) : j),
              (C[28] = $),
              (C[29] = j),
              (C[30] = B),
              (C[31] = O),
              (C[32] = S))
            : (S = C[32]),
          C[33] !== S
            ? ((N = (0, t.jsx)("span", {
                className: "relative z-[1] truncate",
                children: S,
              })),
              (C[33] = S),
              (C[34] = N))
            : (N = C[34]),
          C[35] !== F ||
          C[36] !== Y ||
          C[37] !== X ||
          C[38] !== Z ||
          C[39] !== A ||
          C[40] !== G ||
          C[41] !== I ||
          C[42] !== ee ||
          C[43] !== m ||
          C[44] !== x ||
          C[45] !== et ||
          C[46] !== w ||
          C[47] !== N ||
          C[48] !== T
            ? ((q = (0, t.jsxs)("button", {
                ref: A,
                type: "button",
                disabled: F,
                "data-trade-cta": I,
                "data-hold-to-confirm": !0,
                "data-holding": ee,
                "data-testid": T,
                onPointerDown: Z,
                onPointerUp: G,
                onPointerLeave: G,
                onPointerCancel: G,
                onKeyDown: Y,
                onKeyUp: X,
                onBlur: G,
                onContextMenu: m,
                style: x,
                className: et,
                children: [w, N],
              })),
              (C[35] = F),
              (C[36] = Y),
              (C[37] = X),
              (C[38] = Z),
              (C[39] = A),
              (C[40] = G),
              (C[41] = I),
              (C[42] = ee),
              (C[43] = m),
              (C[44] = x),
              (C[45] = et),
              (C[46] = w),
              (C[47] = N),
              (C[48] = T),
              (C[49] = q))
            : (q = C[49]),
          q
        );
      },
    ],
    847407,
  );
};
