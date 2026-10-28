// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    n = e.i(231332);
  e.i(12692);
  var a = e.i(398902),
    s = e.i(745018),
    r = e.i(844510),
    i = e.i(338319);
  function d(e) {
    let n,
      d,
      c,
      o,
      u,
      p,
      m,
      h,
      x,
      f = (0, l.c)(30),
      {
        side: g,
        targeted: b,
        count: y,
        max: v,
        full: w,
        edgeX: _,
        testId: j,
      } = e,
      { t: C } = (0, a.f)(),
      N = "left" === g ? s.xa : s.Ie;
    f[0] !== g || f[1] !== C
      ? ((n = C(
          "left" === g
            ? "web.screeners.panel_left"
            : "web.screeners.panel_right",
        )),
        (f[0] = g),
        (f[1] = C),
        (f[2] = n))
      : (n = f[2]);
    let U = n;
    f[3] !== y || f[4] !== w || f[5] !== v || f[6] !== U || f[7] !== C
      ? ((d = w
          ? `${C("web.screeners.drag_side_full")} ${y}/${v}`
          : `${U} \xb7 ${y}/${v}`),
        (f[3] = y),
        (f[4] = w),
        (f[5] = v),
        (f[6] = U),
        (f[7] = C),
        (f[8] = d))
      : (d = f[8]);
    let k = d;
    f[9] !== _ || f[10] !== g
      ? ((c =
          "left" === g
            ? { left: _ + 8 }
            : { right: Math.max(0, window.innerWidth - _) + 8 }),
        (f[9] = _),
        (f[10] = g),
        (f[11] = c))
      : (c = f[11]);
    let M = c,
      z = j ?? `screeners-pin-tab-${g}`,
      S = b ? "true" : "false",
      I = w ? "true" : "false";
    f[12] !== M
      ? ((o = {
          ...M,
          width: 40,
          top: "calc(var(--layout-top-offset, 109px) + 12px)",
          bottom: 56,
          animationDelay: "120ms",
          animationFillMode: "both",
        }),
        (f[12] = M),
        (f[13] = o))
      : (o = f[13]);
    let K = r.z[b && !w ? "targeted" : "idle"],
      E = w && "opacity-40";
    return (
      f[14] !== K || f[15] !== E
        ? ((u = (0, i.c)(
            "pointer-events-none fixed z-40 flex animate-in flex-col items-center gap-2 rounded-md border py-3 fade-in duration-150",
            K,
            E,
          )),
          (f[14] = K),
          (f[15] = E),
          (f[16] = u))
        : (u = f[16]),
      f[17] !== N
        ? ((p = (0, t.jsx)(N, { className: "size-4 shrink-0" })),
          (f[17] = N),
          (f[18] = p))
        : (p = f[18]),
      f[19] === Symbol.for("react.memo_cache_sentinel")
        ? ((m = { writingMode: "vertical-rl", transform: "rotate(180deg)" }),
          (f[19] = m))
        : (m = f[19]),
      f[20] !== k
        ? ((h = (0, t.jsx)("span", {
            className: "whitespace-nowrap text-xs font-medium leading-4",
            style: m,
            children: k,
          })),
          (f[20] = k),
          (f[21] = h))
        : (h = f[21]),
      f[22] !== p ||
      f[23] !== h ||
      f[24] !== z ||
      f[25] !== S ||
      f[26] !== I ||
      f[27] !== o ||
      f[28] !== u
        ? ((x = (0, t.jsxs)("div", {
            "aria-hidden": !0,
            "data-testid": z,
            "data-targeted": S,
            "data-full": I,
            style: o,
            className: u,
            children: [p, h],
          })),
          (f[22] = p),
          (f[23] = h),
          (f[24] = z),
          (f[25] = S),
          (f[26] = I),
          (f[27] = o),
          (f[28] = u),
          (f[29] = x))
        : (x = f[29]),
      x
    );
  }
  var c = e.i(352386);
  let o = (e, t) => (e < t / 2 ? "left" : "right"),
    u = (e, t) =>
      e < t.left + 56 ? "left" : e > t.right - 56 ? "right" : "float",
    p = (e, t) => t.filter((t) => t < e).length;
  e.s(["j", 0, 56, "g", 0, p, "W", 0, o, "t", 0, u], 245632);
  let m = (e, t, l) => {
    e.setPointerCapture?.(t);
    let n = () => {
        (document.removeEventListener("pointermove", a),
          document.removeEventListener("pointerup", s),
          document.removeEventListener("pointercancel", r),
          e.removeEventListener("lostpointercapture", r),
          window.removeEventListener("blur", i));
      },
      a = (e) => {
        if (e.pointerId === t) {
          if (0 === e.buttons) {
            (n(), l.onCancel());
            return;
          }
          l.onMove(e);
        }
      },
      s = (e) => {
        e.pointerId === t && (n(), l.onRelease(e));
      },
      r = (e) => {
        e.pointerId === t && (n(), l.onCancel());
      },
      i = () => {
        (n(), l.onCancel());
      };
    return (
      document.addEventListener("pointermove", a),
      document.addEventListener("pointerup", s),
      document.addEventListener("pointercancel", r),
      e.addEventListener("lostpointercapture", r),
      window.addEventListener("blur", i),
      n
    );
  };
  e.s(
    [
      "U",
      0,
      (e) =>
        e && "pointerId" in e && "number" == typeof e.pointerId
          ? e.pointerId
          : null,
      "L",
      0,
      m,
    ],
    721165,
  );
  var h = e.i(743786);
  let x = "--edge-drag-x",
    f = "--edge-drag-y",
    g = "--edge-drag-float-w",
    b = "--edge-drag-float-h",
    y = () => {
      let e =
          "u" < typeof document
            ? null
            : document.querySelector(".pump-main-row"),
        t = e?.getBoundingClientRect();
      return t && 0 !== t.width
        ? { left: t.left, right: t.right }
        : { left: 0, right: window.innerWidth };
    },
    v = ({ side: e, kind: t, excludeId: l }) =>
      [
        ...document.querySelectorAll(
          `[data-widget-side="${e}"] [data-edge-panel="${t}"]`,
        ),
      ]
        .filter((e) => e.getAttribute("data-edge-panel-id") !== l)
        .map((e) => e.getBoundingClientRect()),
    w = (e, t, l, n) => {
      let a = l ? u(e.clientX, n) : o(e.clientX, window.innerWidth);
      if ("float" === a)
        return {
          zone: a,
          side: o(e.clientX, window.innerWidth),
          index: 0,
          slotY: null,
          slotX: 0,
          slotWidth: 0,
        };
      let s = t(a),
        r = p(
          e.clientY,
          s.map((e) => e.top + e.height / 2),
        );
      if (0 === s.length) {
        let e = y();
        return {
          zone: a,
          side: a,
          index: r,
          slotY: null,
          slotX: "left" === a ? e.left + 24 : e.right - 352 - 24,
          slotWidth: 352,
        };
      }
      let i =
        0 === r
          ? s[0].top - 6
          : r >= s.length
            ? s[s.length - 1].bottom + 6
            : (s[r - 1].bottom + s[r].top) / 2;
      return {
        zone: a,
        side: a,
        index: r,
        slotY: i,
        slotX: s[0].x,
        slotWidth: s[0].width,
      };
    };
  e.s(
    [
      "f",
      0,
      x,
      "p",
      0,
      f,
      "j",
      0,
      480,
      "x",
      0,
      360,
      "S",
      0,
      (e, t = "widget") => {
        let l = v({ side: e, kind: t });
        if (0 === l.length) {
          let t = y();
          return {
            zone: e,
            side: e,
            index: 0,
            slotY: null,
            slotX: "left" === e ? t.left + 24 : t.right - 352 - 24,
            slotWidth: 352,
          };
        }
        return {
          zone: e,
          side: e,
          index: 0,
          slotY: l[0].top - 6,
          slotX: l[0].x,
          slotWidth: l[0].width,
        };
      },
      "Z",
      0,
      y,
      "h",
      0,
      function (e) {
        let t,
          n,
          a,
          s = (0, l.c)(12),
          { kind: r, excludeId: i, allowFloat: d, floatSize: o, onDrop: u } = e,
          p = void 0 !== d && d;
        s[0] !== o
          ? ((t = o ?? { w: 360, h: 480 }), (s[0] = o), (s[1] = t))
          : (t = s[1]);
        let _ = t,
          [j, C] = (0, c.useState)(null),
          [N, U] = (0, c.useState)(null),
          k = (0, c.useRef)(!1);
        s[2] !== p || s[3] !== i || s[4] !== r || s[5] !== u || s[6] !== _
          ? ((n = (e) => {
              let t;
              if (0 !== e.button) return;
              let l = e.currentTarget;
              k.current = !1;
              let n = e.clientX,
                a = e.clientY,
                s = !1,
                d =
                  ((t = {}),
                  (e) => (t[e] ??= v({ side: e, kind: r, excludeId: i }))),
                c = y(),
                o = { clientX: n, clientY: a },
                j = 0,
                N = !1,
                M = null,
                z = () => {
                  var e, t;
                  ((j = 0),
                    (e = o.clientX),
                    (t = o.clientY),
                    document.documentElement.style.setProperty(x, `${e}px`),
                    document.documentElement.style.setProperty(f, `${t}px`));
                  let l = w(o, d, p, c);
                  (null === M ||
                    l.zone !== M.zone ||
                    l.index !== M.index ||
                    l.slotY !== M.slotY) &&
                    ((M = l), U(l));
                },
                S = () => {
                  (T(),
                    window.removeEventListener("keydown", E),
                    j && cancelAnimationFrame(j),
                    (document.body.style.userSelect = ""));
                },
                I = () => {
                  let e;
                  ((e = document.documentElement.style).removeProperty(x),
                    e.removeProperty(f),
                    e.removeProperty(g),
                    e.removeProperty(b),
                    C(null),
                    U(null));
                },
                K = () => {
                  (S(), I());
                },
                E = (e) => {
                  "Escape" === e.key && (s && (k.current = !0), K());
                },
                T = m(l, e.pointerId, {
                  onMove: (e) => {
                    if (!s) {
                      if (6 > Math.hypot(e.clientX - n, e.clientY - a)) return;
                      ((s = !0),
                        (k.current = !0),
                        (document.body.style.userSelect = "none"),
                        window.getSelection()?.removeAllRanges());
                    }
                    if (
                      ((o = { clientX: e.clientX, clientY: e.clientY }), !N)
                    ) {
                      ((N = !0),
                        document.documentElement.style.setProperty(
                          g,
                          `${_.w}px`,
                        ),
                        document.documentElement.style.setProperty(
                          b,
                          `${_.h}px`,
                        ),
                        C({ x: o.clientX, y: o.clientY }),
                        z());
                      return;
                    }
                    j || (j = requestAnimationFrame(z));
                  },
                  onRelease: (e) => {
                    let t, l;
                    if ((S(), !s)) return void I();
                    let n = w(
                        { clientX: e.clientX, clientY: e.clientY },
                        d,
                        p,
                        c,
                      ),
                      a = (0, h._)(I);
                    (u({
                      zone: n.zone,
                      side: n.side,
                      index: n.index,
                      floatRect:
                        "float" === n.zone
                          ? ((t = e.clientX),
                            (l = e.clientY),
                            {
                              x: Math.max(
                                8,
                                Math.min(t - 48, window.innerWidth - _.w - 8),
                              ),
                              y: Math.max(
                                8,
                                Math.min(l - 16, window.innerHeight - _.h - 48),
                              ),
                              w: _.w,
                              h: _.h,
                            })
                          : void 0,
                      clientX: e.clientX,
                      clientY: e.clientY,
                    }),
                      a());
                  },
                  onCancel: K,
                });
              window.addEventListener("keydown", E);
            }),
            (s[2] = p),
            (s[3] = i),
            (s[4] = r),
            (s[5] = u),
            (s[6] = _),
            (s[7] = n))
          : (n = s[7]);
        let M = n;
        return (
          s[8] !== j || s[9] !== M || s[10] !== N
            ? ((a = {
                ghost: j,
                hover: N,
                didDragRef: k,
                handlePointerDown: M,
              }),
              (s[8] = j),
              (s[9] = M),
              (s[10] = N),
              (s[11] = a))
            : (a = s[11]),
          a
        );
      },
    ],
    200478,
  );
  var _ = e.i(116549),
    j = e.i(606178),
    C = e.i(360827),
    N = e.i(634661),
    U = e.i(994112),
    k = e.i(45329);
  function M(e) {
    return e.widgets;
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let s,
          c,
          o,
          u,
          p,
          m,
          h = (0, l.c)(26),
          {
            ghost: x,
            hover: f,
            label: g,
            variant: b,
            excludeWidgetId: v,
            sideState: w,
          } = e,
          { t: z } = (0, a.f)(),
          S = (0, _.x)(),
          I = (0, k.V)(M);
        if (!x || !f) return null;
        let K = "ride" === (void 0 === b ? "ghost" : b),
          E = "left" === f.zone || "right" === f.zone ? f.zone : null;
        h[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((s = y()), (h[0] = s))
          : (s = h[0]);
        let T = s;
        h[1] !== v || h[2] !== w || h[3] !== I
          ? ((c = (e) => {
              if (w) return w[e];
              let t = I.filter(
                (t) => t.side === e && !t.float && t.id !== v,
              ).length;
              return { count: t, full: t >= U._ };
            }),
            (h[1] = v),
            (h[2] = w),
            (h[3] = I),
            (h[4] = c))
          : (c = h[4]);
        let X = c;
        return (
          h[5] !== X || h[6] !== E
            ? ((o = ["left", "right"].map((e) => {
                let l = X(e);
                return (0, t.jsx)(
                  d,
                  {
                    side: e,
                    targeted: E === e,
                    count: l.count,
                    max: U._,
                    full: l.full,
                    edgeX: "left" === e ? T.left : T.right,
                    testId: `screeners-dock-band-${e}`,
                  },
                  e,
                );
              })),
              (h[5] = X),
              (h[6] = E),
              (h[7] = o))
            : (o = h[7]),
          h[8] !== S ||
          h[9] !== f.slotWidth ||
          h[10] !== f.slotX ||
          h[11] !== f.slotY ||
          h[12] !== f.zone ||
          h[13] !== g ||
          h[14] !== K
            ? ((u =
                null === f.slotY || "float" === f.zone
                  ? "float" === f.zone && K
                    ? null
                    : (0, t.jsx)("div", {
                        "aria-hidden": !0,
                        "data-testid":
                          "float" === f.zone
                            ? "screeners-edge-float-preview"
                            : "screeners-edge-drop-placeholder",
                        className: (0, i.c)(
                          "pointer-events-none fixed z-40 animate-in overflow-hidden rounded-xl border bg-bg-primary shadow-lg transition-none fade-in zoom-in-95 duration-150",
                          "float" === f.zone
                            ? "border-solid border-border-tertiary"
                            : "border-dashed border-text-accent/50",
                        ),
                        style:
                          "float" === f.zone
                            ? {
                                left: "clamp(8px, calc(var(--edge-drag-x, -999px) - 48px), calc(100vw - var(--edge-drag-float-w, 360px) - 8px))",
                                top: "clamp(8px, calc(var(--edge-drag-y, -999px) - 16px), calc(100dvh - var(--edge-drag-float-h, 480px) - 48px))",
                                width: "var(--edge-drag-float-w, 360px)",
                                height: "var(--edge-drag-float-h, 480px)",
                              }
                            : {
                                left: f.slotX,
                                width: f.slotWidth,
                                top: "calc(var(--layout-top-offset, 109px) + 12px)",
                                bottom: 56,
                              },
                        children: (0, t.jsx)("div", {
                          className: (0, i.c)(N.t, N.F[S], j.U[S]),
                          children: (0, t.jsx)("span", {
                            className: N.s[S],
                            children: g,
                          }),
                        }),
                      })
                  : (0, t.jsxs)("div", {
                      "aria-hidden": !0,
                      "data-testid": "screeners-edge-drop-slot",
                      className: (0, i.c)(
                        "pointer-events-none fixed z-40 h-0.5 animate-in rounded-full fade-in zoom-in-95 duration-150",
                        r.Z,
                      ),
                      style: {
                        left: f.slotX,
                        width: f.slotWidth,
                        top: f.slotY,
                      },
                      children: [
                        (0, t.jsx)("span", {
                          className: (0, i.c)(r.g, "-left-1 -top-1"),
                        }),
                        (0, t.jsx)("span", {
                          className: (0, i.c)(r.g, "-right-1 -top-1"),
                        }),
                      ],
                    })),
              (h[8] = S),
              (h[9] = f.slotWidth),
              (h[10] = f.slotX),
              (h[11] = f.slotY),
              (h[12] = f.zone),
              (h[13] = g),
              (h[14] = K),
              (h[15] = u))
            : (u = h[15]),
          h[16] !== x ||
          h[17] !== f.zone ||
          h[18] !== g ||
          h[19] !== K ||
          h[20] !== z
            ? ((p = K
                ? null
                : (0, t.jsxs)("div", {
                    "data-testid": "screeners-edge-drag-ghost",
                    className: (0, i.c)(
                      "pointer-events-none fixed z-50 flex h-7 -translate-x-1/2 -translate-y-full items-center gap-2 px-2.5 will-change-[left,top]",
                      C.V,
                    ),
                    style: {
                      left: `var(--edge-drag-x, ${x.x}px)`,
                      top: `calc(var(--edge-drag-y, ${x.y}px) - 10px)`,
                    },
                    children: [
                      (0, t.jsx)("span", {
                        className:
                          "whitespace-nowrap text-xs font-medium leading-4 text-text-primary",
                        children: g,
                      }),
                      "float" === f.zone
                        ? (0, t.jsx)("span", {
                            className:
                              "whitespace-nowrap text-xs font-medium leading-4 text-text-accent",
                            children: z("web.screeners.float_here"),
                          })
                        : null,
                    ],
                  })),
              (h[16] = x),
              (h[17] = f.zone),
              (h[18] = g),
              (h[19] = K),
              (h[20] = z),
              (h[21] = p))
            : (p = h[21]),
          h[22] !== o || h[23] !== u || h[24] !== p
            ? ((m = (0, n.createPortal)(
                (0, t.jsxs)(t.Fragment, { children: [o, u, p] }),
                document.body,
              )),
              (h[22] = o),
              (h[23] = u),
              (h[24] = p),
              (h[25] = m))
            : (m = h[25]),
          m
        );
      },
    ],
    307649,
  );
  let z = {
      green: "text-gain",
      blue: "text-sky-300",
      purple: "text-violet-300",
      amber: "text-amber-300",
      rose: "text-rose-300",
      cyan: "text-cyan-300",
    },
    S = {
      green: "bg-gain/60",
      blue: "bg-sky-300/60",
      purple: "bg-violet-300/60",
      amber: "bg-amber-300/60",
      rose: "bg-rose-300/60",
      cyan: "bg-cyan-300/60",
    };
  e.s(
    [
      "m",
      0,
      {
        green: "bg-gain",
        blue: "bg-sky-300",
        purple: "bg-violet-300",
        amber: "bg-amber-300",
        rose: "bg-rose-300",
        cyan: "bg-cyan-300",
      },
      "B",
      0,
      (e) => (e.accent ? S[e.accent] : null),
      "y",
      0,
      (e) => (e.accent ? z[e.accent] : "text-text-tertiary"),
    ],
    493607,
  );
};
