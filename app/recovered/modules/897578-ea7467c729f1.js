// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(732486),
    n = e.i(445242);
  e.i(12692);
  var r = e.i(398902),
    l = e.i(116549),
    i = e.i(322315),
    s = e.i(254010),
    a = e.i(352386),
    c = e.i(554325),
    d = e.i(745018),
    o = e.i(117330),
    m = e.i(827111),
    u = e.i(753192),
    h = e.i(441315),
    x = e.i(51206),
    f = e.i(813792),
    p = e.i(791898);
  function g(e) {
    let l,
      i,
      s,
      a,
      c = (0, n.c)(14),
      { columns: d, onRequestConfig: o } = e;
    c[0] !== d ? ((l = d.filter(b)), (c[0] = d), (c[1] = l)) : (l = c[1]);
    let u = l.length >= p.b,
      { t: h } = (0, r.f)(),
      x = (0, m.f)();
    if (
      (c[2] !== h
        ? ((i = h("web.screeners.tray_label")), (c[2] = h), (c[3] = i))
        : (i = c[3]),
      c[4] !== x || c[5] !== u || c[6] !== o)
    ) {
      let e;
      (c[8] !== u || c[9] !== o
        ? ((e = (e) =>
            (0, t.jsx)(
              v,
              {
                type: e,
                onRequestConfig: o,
                disabled: u,
                disabledLabel: "Deck full",
              },
              e,
            )),
          (c[8] = u),
          (c[9] = o),
          (c[10] = e))
        : (e = c[10]),
        (s = x.map(e)),
        (c[4] = x),
        (c[5] = u),
        (c[6] = o),
        (c[7] = s));
    } else s = c[7];
    return (
      c[11] !== i || c[12] !== s
        ? ((a = (0, t.jsx)("div", {
            "data-testid": "screeners-add-tray",
            role: "group",
            "aria-label": i,
            className: "flex flex-wrap items-center gap-2",
            children: s,
          })),
          (c[11] = i),
          (c[12] = s),
          (c[13] = a))
        : (a = c[13]),
      a
    );
  }
  function b(e) {
    return !e.auto;
  }
  function v(e) {
    let r,
      i,
      s,
      a,
      c,
      m,
      g,
      b,
      v = (0, n.c)(29),
      { type: j, disabled: w, disabledLabel: y, onRequestConfig: _ } = e,
      { addColumn: k } = (0, u.f)(),
      N = (0, l.x)(),
      S = p.J[j],
      C = o.Y[j]?.icon,
      I = `screeners-tray-chip-${j}`;
    (v[0] !== C
      ? ((r = C ? (0, t.jsx)(C, { "aria-hidden": !0 }) : void 0),
        (v[0] = C),
        (v[1] = r))
      : (r = v[1]),
      v[2] !== w || v[3] !== y
        ? ((i = w ? (0, t.jsx)("span", { children: y }) : null),
          (v[2] = w),
          (v[3] = y),
          (v[4] = i))
        : (i = v[4]),
      v[5] !== k || v[6] !== S.param || v[7] !== _ || v[8] !== j
        ? ((s = () => (S.param ? _(j) : k(j))),
          (v[5] = k),
          (v[6] = S.param),
          (v[7] = _),
          (v[8] = j),
          (v[9] = s))
        : (s = v[9]));
    let z = w ? `${S.label}: ${y}` : `Add ${S.label} column`;
    return (
      v[10] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, t.jsx)(d.HB, { "aria-hidden": !0 })), (v[10] = a))
        : (a = v[10]),
      v[11] !== N || v[12] !== w || v[13] !== s || v[14] !== z
        ? ((c = (0, t.jsx)(x._, {
            density: N,
            size: 20,
            variant: "ghost",
            disabled: w,
            onClick: s,
            "aria-label": z,
            children: a,
          })),
          (v[11] = N),
          (v[12] = w),
          (v[13] = s),
          (v[14] = z),
          (v[15] = c))
        : (c = v[15]),
      v[16] !== i || v[17] !== c
        ? ((m = (0, t.jsxs)("span", {
            className: "flex items-center gap-1",
            children: [i, c],
          })),
          (v[16] = i),
          (v[17] = c),
          (v[18] = m))
        : (m = v[18]),
      v[19] !== N ||
      v[20] !== S.label ||
      v[21] !== I ||
      v[22] !== r ||
      v[23] !== m
        ? ((g = (0, t.jsx)(h.p, {
            as: "span",
            density: N,
            variant: "raised",
            "data-testid": I,
            leading: r,
            className: "pr-1",
            trailing: m,
            children: S.label,
          })),
          (v[19] = N),
          (v[20] = S.label),
          (v[21] = I),
          (v[22] = r),
          (v[23] = m),
          (v[24] = g))
        : (g = v[24]),
      v[25] !== N || v[26] !== S.description || v[27] !== g
        ? ((b = (0, t.jsx)(f.f, {
            content: S.description,
            density: N,
            children: g,
          })),
          (v[25] = N),
          (v[26] = S.description),
          (v[27] = g),
          (v[28] = b))
        : (b = v[28]),
      b
    );
  }
  var j = e.i(879499),
    w = e.i(189816),
    y = e.i(231332),
    _ = e.i(307649),
    k = e.i(200478),
    N = e.i(994112),
    S = e.i(338319);
  function C(e) {
    let l,
      i,
      s,
      a,
      c,
      m,
      u,
      h,
      x = (0, n.c)(22),
      { column: f, target: p, columns: g, hint: b } = e,
      { t: v } = (0, r.f)(),
      j = f.panes[0]?.view,
      w = j ? o.Y[j]?.icon : void 0;
    x[0] !== g || x[1] !== v || x[2] !== p
      ? ((l = I(p, g, v)), (x[0] = g), (x[1] = v), (x[2] = p), (x[3] = l))
      : (l = x[3]);
    let y = l;
    return (
      x[4] !== w
        ? ((i = w
            ? (0, t.jsx)(w, {
                className: "size-3.5 shrink-0 text-text-quaternary",
              })
            : (0, t.jsx)(d.qm, {
                className: "size-3.5 shrink-0 text-text-quaternary",
              })),
          (x[4] = w),
          (x[5] = i))
        : (i = x[5]),
      x[6] !== f ? ((s = (0, N.S)(f)), (x[6] = f), (x[7] = s)) : (s = x[7]),
      x[8] !== s
        ? ((a = (0, t.jsx)("span", {
            className: "text-xs font-medium leading-4 text-text-primary",
            children: s,
          })),
          (x[8] = s),
          (x[9] = a))
        : (a = x[9]),
      x[10] !== y
        ? ((c = y
            ? (0, t.jsxs)("span", {
                "data-testid": "screeners-column-drag-chip-target",
                className: (0, S.c)(
                  "text-xs font-medium leading-4",
                  y.refused ? "text-text-tertiary" : "text-text-accent",
                ),
                children: ["→ ", y.text],
              })
            : null),
          (x[10] = y),
          (x[11] = c))
        : (c = x[11]),
      x[12] !== i || x[13] !== a || x[14] !== c
        ? ((m = (0, t.jsxs)("div", {
            "data-testid": "screeners-column-drag-chip",
            className:
              "flex h-7 items-center gap-1.5 whitespace-nowrap rounded-md border border-solid border-border-tertiary bg-bg-primary px-2.5 shadow-lg animate-in fade-in zoom-in-95 duration-150",
            children: [i, a, c],
          })),
          (x[12] = i),
          (x[13] = a),
          (x[14] = c),
          (x[15] = m))
        : (m = x[15]),
      x[16] !== b || x[17] !== v
        ? ((u = b
            ? (0, t.jsx)("span", {
                className:
                  "ml-2.5 whitespace-nowrap text-xs leading-4 text-text-quaternary animate-in fade-in duration-300",
                children: v("web.screeners.drag_hint"),
              })
            : null),
          (x[16] = b),
          (x[17] = v),
          (x[18] = u))
        : (u = x[18]),
      x[19] !== m || x[20] !== u
        ? ((h = (0, t.jsxs)("div", {
            className: "flex flex-col items-start gap-1.5",
            children: [m, u],
          })),
          (x[19] = m),
          (x[20] = u),
          (x[21] = h))
        : (h = x[21]),
      h
    );
  }
  let I = (e, t, n) => {
    if (!e) return null;
    switch (e.kind) {
      case "origin":
        return null;
      case "seam":
        return {
          text: n("web.screeners.drag_slot", { position: e.toIndex + 1 }),
          refused: !1,
        };
      case "stack": {
        let r = t.find((t) => t.id === e.columnId),
          l = r ? (0, N.S)(r) : "";
        if (!e.allowed)
          return {
            text: n("web.screeners.drag_stack_full", { max: N.p }),
            refused: !0,
          };
        return {
          text: n(
            "start" === e.at
              ? "web.screeners.drag_stack_above"
              : "web.screeners.drag_stack_below",
            { title: l },
          ),
          refused: !1,
        };
      }
      case "rail":
        return {
          text: n(
            e.allowed
              ? "left" === e.side
                ? "web.screeners.panel_left"
                : "web.screeners.panel_right"
              : "web.screeners.drag_side_full",
          ),
          refused: !e.allowed,
        };
    }
  };
  var z = e.i(421087);
  let D = "column:",
    R = "pane:",
    E = "tray:",
    P = "zone:dock-",
    L = (e) => `${D}${e}`,
    q = (e) => {
      if ("string" != typeof e) return null;
      if (e.startsWith(D)) {
        let t = e.slice(D.length);
        return t.length > 0 ? { kind: "column", columnId: t } : null;
      }
      if (e.startsWith(R)) {
        let t = e.slice(R.length),
          n = t.indexOf(":");
        return n <= 0 || n === t.length - 1
          ? null
          : { kind: "pane", columnId: t.slice(0, n), paneId: t.slice(n + 1) };
      }
      if (e.startsWith(E)) {
        let t = e.slice(E.length);
        return (0, p.g)(t) ? { kind: "tray", type: t } : null;
      }
      if (e.startsWith(P)) {
        let t = e.slice(P.length);
        return "left" === t || "right" === t
          ? { kind: "dock-zone", side: t }
          : null;
      }
      return "zone:deck" === e ? { kind: "zone", zone: "deck" } : null;
    };
  var B = e.i(245632);
  let F = { armed: !1, target: null },
    W = (e, t, n) => {
      let r = (0, B.t)(e, t);
      return "float" === r
        ? n.armed && null === n.target
          ? n
          : { armed: !0, target: null }
        : n.armed
          ? n.target === r
            ? n
            : { armed: !0, target: r }
          : n;
    },
    A = (e, t, n) => {
      let r = e.map((e) => e.id),
        [l] = r.splice(t, 1);
      return void 0 === l ? e.map((e) => e.id) : (r.splice(n, 0, l), r);
    },
    V = (e, t, n) => {
      let r = t > n ? t - 1 : t,
        l =
          0 === e.length
            ? 0
            : t <= 0
              ? e[0].left
              : t >= e.length
                ? e[e.length - 1].right
                : (e[t - 1].right + e[t].left) / 2;
      return r === n
        ? { kind: "origin", seamX: l }
        : { kind: "seam", seam: t, toIndex: r, x: l };
    },
    O = (e, t) =>
      null !== e &&
      (("seam" === e.kind && e.seam === t) ||
        ("origin" === e.kind && null !== e.seamX)),
    $ = (e, t) => null === t || e.pointerId === t;
  var M = e.i(721165),
    T = e.i(45329);
  let X = { left: { count: 0, full: !1 }, right: { count: 0, full: !1 } },
    K = (0, a.createContext)({
      model: "ride",
      activeColumn: null,
      dockTarget: null,
      target: null,
      railOpen: X,
    }),
    U = () => (0, a.use)(K),
    Y = [
      ({ transform: e, containerNodeRect: t, draggingNodeRect: n }) => {
        let r = { ...e, y: 0 };
        if (!t || !n) return r;
        let l = t.left - n.left,
          i = t.right - n.right;
        return { ...r, x: Math.min(Math.max(e.x, l), i) };
      },
    ],
    G = [],
    Z = () => [];
  function J(e) {
    var r;
    let l,
      i,
      s,
      c,
      d,
      o,
      m,
      h,
      x,
      f,
      p,
      g,
      b,
      v,
      y,
      _,
      S,
      C,
      I,
      D,
      R,
      E = (0, n.c)(53),
      { columns: P, model: L, children: U } = e,
      J = void 0 === L ? "ride" : L,
      {
        setColumnOrder: ee,
        dockColumnToSide: en,
        stackColumns: er,
      } = (0, u.f)();
    E[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((l = { activationConstraint: { distance: 6 } }), (E[0] = l))
      : (l = E[0]);
    let el = (0, j.n)((0, j.J)(j.k, l)),
      [ei, es] = (0, a.useState)(null),
      [ea, ec] = (0, a.useState)(null),
      [ed, eo] = (0, a.useState)(null),
      [em, eu] = (0, a.useState)(null),
      [eh, ex] = (0, a.useState)(X),
      ef = (0, a.useRef)(F),
      ep = (0, a.useRef)(null),
      eg = (0, a.useRef)(null),
      [eb, ev] = (0, a.useState)(J),
      ej = (0, a.useRef)(J),
      ew = (0, a.useRef)(void 0),
      ey = ei ? eb : J;
    E[1] !== ei || E[2] !== ed || E[3] !== ey || E[4] !== eh || E[5] !== em
      ? ((i = {
          model: ey,
          activeColumn: ei,
          dockTarget: ed,
          target: em,
          railOpen: eh,
        }),
        (E[1] = ei),
        (E[2] = ed),
        (E[3] = ey),
        (E[4] = eh),
        (E[5] = em),
        (E[6] = i))
      : (i = E[6]);
    let e_ = i,
      ek = !eh.left.full,
      eN = !eh.right.full;
    E[7] !== ek || E[8] !== eN
      ? ((s = { left: ek, right: eN }), (E[7] = ek), (E[8] = eN), (E[9] = s))
      : (s = E[9]);
    let eS = s;
    E[10] !== P
      ? ((c = new Map(P.map(et))), (E[10] = P), (E[11] = c))
      : (c = E[11]);
    let eC = c;
    E[12] !== eC || E[13] !== J
      ? ((d = (e) => {
          let t,
            n,
            r,
            l = q(e.active.id),
            i = l?.kind === "column" ? (eC.get(l.columnId) ?? null) : null;
          ((ej.current = J),
            ev(J),
            (ew.current = void 0),
            es(i),
            ec((0, M.U)(e.activatorEvent)));
          let s = (0, w.o)(e.activatorEvent);
          ((eg.current = s ? { x: s.x, y: s.y } : null),
            (ef.current = s ? W(s.x, (0, k.Z)(), F) : F),
            eo(null),
            (ep.current = null),
            eu(null),
            ex(
              i
                ? ((t = T.V.getState()),
                  (n = i.panes[0]?.view),
                  {
                    left: (r = (e) => ({
                      count: t.widgets.filter((t) => t.side === e && !t.float)
                        .length,
                      full: !n || !(0, T.f)(t, e, n),
                    }))("left"),
                    right: r("right"),
                  })
                : X,
            ));
        }),
        (E[12] = eC),
        (E[13] = J),
        (E[14] = d))
      : (d = E[14]);
    let eI = d;
    ((r = ei ? ea : null),
      (R = (0, n.c)(3))[0] !== r
        ? ((I = () => {
            if (null === r) return;
            let e = () => {
                document.dispatchEvent(
                  new PointerEvent("pointercancel", {
                    bubbles: !0,
                    cancelable: !0,
                    pointerId: r,
                  }),
                );
              },
              t = (t) => {
                t.pointerId === r && 0 === t.buttons && e();
              };
            return (
              document.addEventListener("pointermove", t, { passive: !0 }),
              window.addEventListener("blur", e),
              () => {
                (document.removeEventListener("pointermove", t),
                  window.removeEventListener("blur", e));
              }
            );
          }),
          (D = [r]),
          (R[0] = r),
          (R[1] = I),
          (R[2] = D))
        : ((I = R[1]), (D = R[2])),
      (0, a.useEffect)(I, D));
    let ez = null !== ei && "ride" === eb;
    (E[15] !== ea || E[16] !== ez
      ? ((o = { active: ez, pointerId: ea, railRef: ef, onTarget: eo }),
        (E[15] = ea),
        (E[16] = ez),
        (E[17] = o))
      : (o = E[17]),
      (function (e) {
        let t,
          r,
          l = (0, n.c)(6),
          { active: i, pointerId: s, railRef: c, onTarget: d } = e;
        (l[0] !== i || l[1] !== d || l[2] !== s || l[3] !== c
          ? ((t = () => {
              if (!i) return;
              let e = (0, k.Z)(),
                t = (t) => {
                  if (!$(t, s)) return;
                  let n = W(t.clientX, e, c.current);
                  n !== c.current && ((c.current = n), d(n.target));
                };
              return (
                document.addEventListener("pointermove", t, { passive: !0 }),
                () => document.removeEventListener("pointermove", t)
              );
            }),
            (r = [i, s, c, d]),
            (l[0] = i),
            (l[1] = d),
            (l[2] = s),
            (l[3] = c),
            (l[4] = t),
            (l[5] = r))
          : ((t = l[4]), (r = l[5])),
          (0, a.useEffect)(t, r));
      })(o));
    let eD = "chip" === eb ? ei : null;
    (E[18] !== eS || E[19] !== ea || E[20] !== eD
      ? ((m = {
          column: eD,
          pointerId: ea,
          railRef: ef,
          targetRef: ep,
          pointerRef: eg,
          railOpen: eS,
          onTarget: eu,
        }),
        (E[18] = eS),
        (E[19] = ea),
        (E[20] = eD),
        (E[21] = m))
      : (m = E[21]),
      (function (e) {
        let t,
          r,
          l = (0, n.c)(9),
          {
            column: i,
            pointerId: s,
            railRef: c,
            targetRef: d,
            pointerRef: o,
            railOpen: m,
            onTarget: u,
          } = e;
        (l[0] !== i ||
        l[1] !== u ||
        l[2] !== s ||
        l[3] !== o ||
        l[4] !== m ||
        l[5] !== c ||
        l[6] !== d
          ? ((t = () => {
              if (!i) return;
              let e = (0, k.Z)(),
                t = document.querySelector("[data-testid=screeners-deck]"),
                n = t?.getBoundingClientRect() ?? null,
                r = o.current ?? { x: 0, y: 0 },
                l = 0,
                a = 0,
                h = 0,
                x = () => {
                  if (!t || !n || t.scrollWidth - t.clientWidth < 2) return 0;
                  if (r.x < n.left + 48) return t.scrollLeft > 0 ? -1 : 0;
                  if (r.x > n.right - 48) {
                    let e = t.scrollWidth - t.clientWidth;
                    return +(t.scrollLeft < e);
                  }
                  return 0;
                },
                f = () => {
                  l = 0;
                  let t = W(r.x, e, c.current);
                  c.current = t;
                  let n = [
                      ...document.querySelectorAll(
                        "[data-testid=screeners-sortable-column]",
                      ),
                    ].map((e) => {
                      let t = e.getBoundingClientRect();
                      return {
                        id:
                          e
                            .querySelector("[data-column-id]")
                            ?.getAttribute("data-column-id") ?? "",
                        left: t.left,
                        right: t.right,
                        top: t.top,
                        bottom: t.bottom,
                        paneCount: e.querySelectorAll(
                          "[data-testid=screeners-pane]",
                        ).length,
                      };
                    }),
                    s = ((e) => {
                      let t,
                        n,
                        r,
                        l,
                        {
                          pointerX: i,
                          pointerY: s,
                          boxes: a,
                          fromIndex: c,
                          carriedPaneCount: d,
                          maxPanes: o,
                          rail: m,
                          railOpen: u,
                          previous: h,
                          zoneBounds: x,
                        } = e;
                      if (m) return { kind: "rail", side: m, allowed: u[m] };
                      if (0 === a.length)
                        return { kind: "origin", seamX: null };
                      let f =
                          ((t = 0),
                          (n = 1 / 0),
                          a.forEach((e, r) => {
                            let l =
                              i < e.left
                                ? e.left - i
                                : i > e.right
                                  ? i - e.right
                                  : 0;
                            l < n && ((n = l), (t = r));
                          }),
                          t),
                        p = a[f];
                      if (f === c) return { kind: "origin", seamX: null };
                      let g = x ? Math.max(p.left, x.left) : p.left,
                        b = x ? Math.min(p.right, x.right) : p.right,
                        v = 0.25 * Math.max(1, b - g),
                        j = g + v,
                        w = b - v,
                        y = (p.top + p.bottom) / 2,
                        _ =
                          ((r = p.id),
                          null !== h && "stack" === h.kind && h.columnId === r),
                        k = O(h, f),
                        N = O(h, f + 1),
                        S = i < j - 6 * !!_,
                        C = i > w + 6 * !!_,
                        I = k && i < j + 6,
                        z = N && i > w - 6;
                      if (S || I) return V(a, f, c);
                      if (C || z) return V(a, f + 1, c);
                      let D = d + p.paneCount <= o,
                        R = _ ? h.at : null,
                        E = s < y ? "start" : "end",
                        P =
                          null !== R && R !== E && 6 > Math.abs(s - y) ? R : E;
                      return (
                        (l = p.bottom - p.top),
                        {
                          kind: "stack",
                          columnId: p.id,
                          at: P,
                          allowed: D,
                          box: {
                            left: p.left,
                            top: "start" === P ? p.top : p.top + l / 2,
                            width: p.right - p.left,
                            height: l / 2,
                          },
                        }
                      );
                    })({
                      pointerX: r.x,
                      pointerY: r.y,
                      boxes: n,
                      fromIndex: n.findIndex((e) => e.id === i.id),
                      carriedPaneCount: i.panes.length,
                      maxPanes: N.p,
                      rail: t.target,
                      railOpen: m,
                      zoneBounds: { left: e.left + B.j, right: e.right - B.j },
                      previous: d.current,
                    });
                  (((e, t) => {
                    if (e === t) return !0;
                    if (null === e || null === t || e.kind !== t.kind)
                      return !1;
                    switch (e.kind) {
                      case "origin":
                        return "origin" === t.kind && e.seamX === t.seamX;
                      case "seam":
                        return (
                          "seam" === t.kind && e.seam === t.seam && e.x === t.x
                        );
                      case "stack":
                        return (
                          "stack" === t.kind &&
                          e.columnId === t.columnId &&
                          e.at === t.at &&
                          e.allowed === t.allowed &&
                          e.box.left === t.box.left &&
                          e.box.top === t.box.top &&
                          e.box.width === t.box.width &&
                          e.box.height === t.box.height
                        );
                      case "rail":
                        return (
                          "rail" === t.kind &&
                          e.side === t.side &&
                          e.allowed === t.allowed
                        );
                    }
                  })(s, d.current) || ((d.current = s), u(s)),
                    !a && x() && (a = requestAnimationFrame(p)));
                },
                p = (e) => {
                  a = 0;
                  let n = x();
                  if (!n || !t) {
                    h = 0;
                    return;
                  }
                  h || (h = e);
                  let r = Math.min(1, (e - h) / 400);
                  ((t.scrollLeft = t.scrollLeft + n * (2 + 12 * r)),
                    l || (l = requestAnimationFrame(f)),
                    (a = requestAnimationFrame(p)));
                },
                g = (e) => {
                  $(e, s) &&
                    ((o.current = r = { x: e.clientX, y: e.clientY }),
                    l || (l = requestAnimationFrame(f)));
                };
              return (
                document.addEventListener("pointermove", g, { passive: !0 }),
                f(),
                () => {
                  (document.removeEventListener("pointermove", g),
                    l && cancelAnimationFrame(l),
                    a && cancelAnimationFrame(a));
                }
              );
            }),
            (r = [i, s, c, d, o, m, u]),
            (l[0] = i),
            (l[1] = u),
            (l[2] = s),
            (l[3] = o),
            (l[4] = m),
            (l[5] = c),
            (l[6] = d),
            (l[7] = t),
            (l[8] = r))
          : ((t = l[7]), (r = l[8])),
          (0, a.useEffect)(t, r));
      })(m),
      E[22] === Symbol.for("react.memo_cache_sentinel")
        ? ((h = () => {
            ((ef.current = F),
              (ep.current = null),
              es(null),
              ec(null),
              eo(null),
              eu(null));
          }),
          (E[22] = h))
        : (h = E[22]));
    let eR = h;
    E[23] !== eC || E[24] !== P || E[25] !== en || E[26] !== ee || E[27] !== er
      ? ((x = (e) => {
          let t = ef.current,
            n = ep.current,
            r = ej.current;
          eR();
          let l = q(e.active.id);
          if (l?.kind !== "column") return;
          let i = eC.get(l.columnId);
          if (!i) return;
          let s = (0, N.S)(i),
            a = P.length,
            c = P.findIndex((e) => e.id === i.id);
          if ("chip" === r) {
            if (!n) return;
            if ("seam" === n.kind) {
              (ee(A(P, c, n.toIndex), i, { announce: !1 }),
                (ew.current = (0, z.R)({
                  title: s,
                  position: n.toIndex + 1,
                  total: a,
                })));
              return;
            }
            if ("stack" === n.kind && n.allowed) {
              (er(i.id, n.columnId, n.at, { announce: !1 }),
                (ew.current = `${s} stacked ${"start" === n.at ? "above" : "below"} ${(0, N.S)(eC.get(n.columnId) ?? i)}.`));
              return;
            }
            if ("rail" === n.kind && n.allowed) {
              (en(i, n.side, { announce: !1 }),
                (ew.current = (0, z.k)({ title: s, side: n.side })));
              return;
            }
            ew.current = (0, z.o)({ title: s });
            return;
          }
          let d = i.panes[0]?.view;
          if (t.target && d && (0, T.f)(T.V.getState(), t.target, d)) {
            (en(i, t.target, { announce: !1, transition: !1 }),
              (ew.current = (0, z.k)({ title: s, side: t.target })));
            return;
          }
          let o = q(e.over?.id);
          if (o?.kind !== "column" || o.columnId === i.id) return;
          let m = P.findIndex((e) => e.id === o.columnId);
          c < 0 ||
            m < 0 ||
            (ee(A(P, c, m), i, { announce: !1, transition: !1 }),
            (ew.current = (0, z.R)({ title: s, position: m + 1, total: a })));
        }),
        (E[23] = eC),
        (E[24] = P),
        (E[25] = en),
        (E[26] = ee),
        (E[27] = er),
        (E[28] = x))
      : (x = E[28]);
    let eE = x;
    (E[29] !== eC || E[30] !== P
      ? ((f = (e) => {
          let { active: t } = e,
            n = q(t.id),
            r = n?.kind === "column" ? eC.get(n.columnId) : null;
          if (r)
            return (0, z.b)({
              title: (0, N.S)(r),
              position: P.findIndex((e) => e.id === r.id) + 1,
              total: P.length,
            });
        }),
        (E[29] = eC),
        (E[30] = P),
        (E[31] = f))
      : (f = E[31]),
      E[32] === Symbol.for("react.memo_cache_sentinel")
        ? ((p = () => ew.current), (E[32] = p))
        : (p = E[32]),
      E[33] !== eC
        ? ((g = (e) => {
            let { active: t } = e,
              n = q(t.id),
              r = n?.kind === "column" ? eC.get(n.columnId) : null;
            return r ? (0, z.o)({ title: (0, N.S)(r) }) : void 0;
          }),
          (E[33] = eC),
          (E[34] = g))
        : (g = E[34]),
      E[35] !== f || E[36] !== g
        ? ((b = {
            onDragStart: f,
            onDragOver: H,
            onDragEnd: p,
            onDragCancel: g,
          }),
          (E[35] = f),
          (E[36] = g),
          (E[37] = b))
        : (b = E[37]));
    let eP = b,
      eL = "chip" === ey ? Z : Q,
      eq = "chip" === ey ? G : Y;
    return (
      E[38] === Symbol.for("react.memo_cache_sentinel")
        ? ((v = { droppable: { strategy: j._.Always } }), (E[38] = v))
        : (v = E[38]),
      E[39] === Symbol.for("react.memo_cache_sentinel")
        ? ((y = { draggable: z.t }), (E[39] = y))
        : (y = E[39]),
      E[40] !== eP
        ? ((_ = { announcements: eP, screenReaderInstructions: y }),
          (E[40] = eP),
          (E[41] = _))
        : (_ = E[41]),
      E[42] !== U || E[43] !== e_
        ? ((S = (0, t.jsx)(K.Provider, { value: e_, children: U })),
          (E[42] = U),
          (E[43] = e_),
          (E[44] = S))
        : (S = E[44]),
      E[45] !== eE ||
      E[46] !== eI ||
      E[47] !== el ||
      E[48] !== eL ||
      E[49] !== eq ||
      E[50] !== _ ||
      E[51] !== S
        ? ((C = (0, t.jsx)(j.H, {
            sensors: el,
            collisionDetection: eL,
            modifiers: eq,
            measuring: v,
            onDragStart: eI,
            onDragEnd: eE,
            onDragCancel: eR,
            autoScroll: !1,
            accessibility: _,
            children: S,
          })),
          (E[45] = eE),
          (E[46] = eI),
          (E[47] = el),
          (E[48] = eL),
          (E[49] = eq),
          (E[50] = _),
          (E[51] = S),
          (E[52] = C))
        : (C = E[52]),
      C
    );
  }
  function H() {}
  function Q(e) {
    let t = e.droppableContainers.filter(ee);
    return (0, j.P)({ ...e, droppableContainers: t });
  }
  function ee(e) {
    return q(e.id)?.kind === "column";
  }
  function et(e) {
    return [e.id, e];
  }
  var en = e.i(844510),
    er = e.i(908163);
  let el = "screeners-chip-drag-hint",
    ei = [
      ({
        transform: e,
        activatorEvent: t,
        activeNodeRect: n,
        overlayNodeRect: r,
        windowRect: l,
      }) => {
        if (!t || !n) return e;
        let i = (0, w.o)(t);
        if (!i) return e;
        let s = r?.width ?? 220,
          a = r?.height ?? 28,
          c = i.x + e.x,
          d = i.y + e.y,
          o = (l?.width ?? window.innerWidth) - 8;
        return {
          ...e,
          x: (c + 14 + s > o ? c - 14 - s : c + 14) - n.left,
          y: d - a / 2 - n.top,
          scaleX: 1,
          scaleY: 1,
        };
      },
    ],
    es = {
      zone: "float",
      side: "right",
      index: 0,
      slotY: null,
      slotX: 0,
      slotWidth: 0,
    },
    ea = () => {
      let e = document
        .querySelector("[data-testid=screeners-deck]")
        ?.getBoundingClientRect();
      return e
        ? { top: e.top, height: e.height, left: e.left, right: e.right }
        : null;
    },
    ec = () => {
      try {
        if (sessionStorage.getItem(el)) return !1;
        return (sessionStorage.setItem(el, "1"), !0);
      } catch {
        return !1;
      }
    };
  function ed(e) {
    let i,
      s,
      c,
      d,
      o,
      m,
      u,
      h,
      x,
      f,
      p,
      g,
      b = (0, n.c)(34),
      { columns: v } = e,
      { activeColumn: w, target: S, railOpen: I } = U(),
      { t: z } = (0, r.f)(),
      D = (0, l.x)(),
      [R] = (0, a.useState)(ec),
      [E] = (0, a.useState)(ea);
    if (
      (b[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = []), (b[0] = i))
        : (i = b[0]),
      (0, a.useEffect)(eo, i),
      !w)
    )
      return null;
    b[1] !== S
      ? ((s = S?.kind === "rail" && S.allowed ? (0, k.S)(S.side) : es),
        (b[1] = S),
        (b[2] = s))
      : (s = b[2]);
    let P = s;
    b[3] !== I.left || b[4] !== I.right
      ? ((c = { left: I.left, right: I.right }),
        (b[3] = I.left),
        (b[4] = I.right),
        (b[5] = c))
      : (c = b[5]);
    let L = c;
    return (
      b[6] === Symbol.for("react.memo_cache_sentinel")
        ? ((d = { x: 0, y: 0 }), (b[6] = d))
        : (d = b[6]),
      b[7] !== w ? ((o = (0, N.S)(w)), (b[7] = w), (b[8] = o)) : (o = b[8]),
      b[9] !== P || b[10] !== L || b[11] !== o
        ? ((m = (0, t.jsx)(_.f, {
            ghost: d,
            hover: P,
            label: o,
            variant: "ride",
            sideState: L,
          })),
          (b[9] = P),
          (b[10] = L),
          (b[11] = o),
          (b[12] = m))
        : (m = b[12]),
      b[13] !== v || b[14] !== z || b[15] !== S
        ? ((u = S?.kind === "stack" ? em(S, v, z) : null),
          (b[13] = v),
          (b[14] = z),
          (b[15] = S),
          (b[16] = u))
        : (u = b[16]),
      b[17] !== D || b[18] !== E || b[19] !== u || b[20] !== S
        ? ((h = (0, t.jsx)(eu, {
            target: S,
            stripBox: E,
            density: D,
            label: u,
          })),
          (b[17] = D),
          (b[18] = E),
          (b[19] = u),
          (b[20] = S),
          (b[21] = h))
        : (h = b[21]),
      b[22] === Symbol.for("react.memo_cache_sentinel")
        ? ((x = { width: "auto", height: "auto", pointerEvents: "none" }),
          (b[22] = x))
        : (x = b[22]),
      b[23] !== w || b[24] !== v || b[25] !== R || b[26] !== S
        ? ((f = (0, t.jsx)(j.N, {
            dropAnimation: null,
            modifiers: ei,
            zIndex: 60,
            style: x,
            children: (0, t.jsx)(C, {
              column: w,
              target: S,
              columns: v,
              hint: R,
            }),
          })),
          (b[23] = w),
          (b[24] = v),
          (b[25] = R),
          (b[26] = S),
          (b[27] = f))
        : (f = b[27]),
      b[28] !== f || b[29] !== h
        ? ((p = (0, y.createPortal)(
            (0, t.jsxs)(t.Fragment, { children: [h, f] }),
            document.body,
          )),
          (b[28] = f),
          (b[29] = h),
          (b[30] = p))
        : (p = b[30]),
      b[31] !== p || b[32] !== m
        ? ((g = (0, t.jsxs)(t.Fragment, { children: [m, p] })),
          (b[31] = p),
          (b[32] = m),
          (b[33] = g))
        : (g = b[33]),
      g
    );
  }
  function eo() {
    let e = document.body.style.cursor;
    return (
      (document.body.style.cursor = "grabbing"),
      () => {
        document.body.style.cursor = e;
      }
    );
  }
  let em = (e, t, n) => {
    if (!e.allowed) return n("web.screeners.drag_stack_full", { max: N.p });
    let r = t.find((t) => t.id === e.columnId),
      l = r ? (0, N.S)(r) : "";
    return n(
      "start" === e.at
        ? "web.screeners.drag_stack_above"
        : "web.screeners.drag_stack_below",
      { title: l },
    );
  };
  function eu(e) {
    let r = (0, n.c)(30),
      { target: l, stripBox: i, density: s, label: a } = e;
    if (!l || !i) return null;
    if ("seam" === l.kind || ("origin" === l.kind && l.seamX)) {
      let e,
        n,
        s,
        a,
        c = "origin" === l.kind,
        d = Math.min(Math.max(c ? l.seamX : l.x, i.left + 1), i.right - 1),
        o = c ? "screeners-deck-seam-own" : "screeners-deck-seam",
        m = c ? "bg-bg-quaternary" : en.Z;
      r[0] !== m
        ? ((e = (0, S.c)(
            "pointer-events-none fixed z-40 w-0.5 rounded-full animate-in fade-in duration-100",
            m,
          )),
          (r[0] = m),
          (r[1] = e))
        : (e = r[1]);
      let u = d - 1;
      return (
        r[2] !== i.height || r[3] !== i.top || r[4] !== u
          ? ((n = { left: u, top: i.top, height: i.height }),
            (r[2] = i.height),
            (r[3] = i.top),
            (r[4] = u),
            (r[5] = n))
          : (n = r[5]),
        r[6] !== c
          ? ((s = c
              ? null
              : (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)("span", {
                      className: (0, S.c)(en.g, "-left-1 -top-1"),
                    }),
                    (0, t.jsx)("span", {
                      className: (0, S.c)(en.g, "-bottom-1 -left-1"),
                    }),
                  ],
                })),
            (r[6] = c),
            (r[7] = s))
          : (s = r[7]),
        r[8] !== o || r[9] !== e || r[10] !== n || r[11] !== s
          ? ((a = (0, t.jsx)("div", {
              "aria-hidden": !0,
              "data-testid": o,
              className: e,
              style: n,
              children: s,
            })),
            (r[8] = o),
            (r[9] = e),
            (r[10] = n),
            (r[11] = s),
            (r[12] = a))
          : (a = r[12]),
        a
      );
    }
    if ("stack" === l.kind) {
      let e,
        n,
        i,
        c,
        d = l.at,
        o = l.allowed ? "true" : "false",
        m = en.I[l.allowed ? "allowed" : "refused"];
      r[13] !== m
        ? ((e = (0, S.c)(
            "pointer-events-none fixed z-40 flex items-center justify-center animate-in fade-in duration-100",
            m,
          )),
          (r[13] = m),
          (r[14] = e))
        : (e = r[14]);
      let u = l.box.left + 4,
        h = l.box.top + 4,
        x = l.box.width - 8,
        f = l.box.height - 8;
      return (
        r[15] !== u || r[16] !== h || r[17] !== x || r[18] !== f
          ? ((n = { left: u, top: h, width: x, height: f }),
            (r[15] = u),
            (r[16] = h),
            (r[17] = x),
            (r[18] = f),
            (r[19] = n))
          : (n = r[19]),
        r[20] !== s || r[21] !== a || r[22] !== l.allowed
          ? ((i = a
              ? (0, t.jsx)("span", {
                  className: "rounded-sm bg-bg-primary",
                  children: (0, t.jsx)(er.E, {
                    density: s,
                    tone: l.allowed ? "mint" : "neutral",
                    children: a,
                  }),
                })
              : null),
            (r[20] = s),
            (r[21] = a),
            (r[22] = l.allowed),
            (r[23] = i))
          : (i = r[23]),
        r[24] !== i ||
        r[25] !== o ||
        r[26] !== e ||
        r[27] !== n ||
        r[28] !== l.at
          ? ((c = (0, t.jsx)("div", {
              "aria-hidden": !0,
              "data-testid": "screeners-deck-stack-band",
              "data-at": d,
              "data-allowed": o,
              className: e,
              style: n,
              children: i,
            })),
            (r[24] = i),
            (r[25] = o),
            (r[26] = e),
            (r[27] = n),
            (r[28] = l.at),
            (r[29] = c))
          : (c = r[29]),
        c
      );
    }
    return null;
  }
  let eh = {
    zone: "float",
    side: "right",
    index: 0,
    slotY: null,
    slotX: 0,
    slotWidth: 0,
  };
  function ex(e) {
    let r,
      l,
      i,
      s,
      a,
      c = (0, n.c)(12),
      { column: d, targetedSide: o } = e,
      m = d.panes[0]?.view;
    c[0] !== o || c[1] !== m
      ? ((r = (e) => !!o && !!m && (0, T.f)(e, o, m)),
        (c[0] = o),
        (c[1] = m),
        (c[2] = r))
      : (r = c[2]);
    let u = (0, T.V)(r);
    c[3] !== u || c[4] !== o
      ? ((l = o && u ? (0, k.S)(o) : eh), (c[3] = u), (c[4] = o), (c[5] = l))
      : (l = c[5]);
    let h = l;
    return (
      c[6] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = { x: 0, y: 0 }), (c[6] = i))
        : (i = c[6]),
      c[7] !== d ? ((s = (0, N.S)(d)), (c[7] = d), (c[8] = s)) : (s = c[8]),
      c[9] !== h || c[10] !== s
        ? ((a = (0, t.jsx)(_.f, {
            ghost: i,
            hover: h,
            label: s,
            variant: "ride",
          })),
          (c[9] = h),
          (c[10] = s),
          (c[11] = a))
        : (a = c[11]),
      a
    );
  }
  var ef = e.i(513579),
    ep = e.i(929776),
    eg = e.i(574472),
    eb = e.i(157633),
    ev = e.i(387726),
    ej = e.i(928529),
    ew = e.i(464649),
    ey = e.i(786446),
    e_ = e.i(167958);
  e.i(267146);
  var ek = e.i(540805);
  let eN = { terminal: "px-3 py-2", comfortable: "px-5 py-3" },
    eS = {
      terminal: "text-[13px] leading-4 font-medium text-text-primary",
      comfortable: "text-sm leading-5 font-medium text-text-primary",
    },
    eC = {
      terminal: "text-xs leading-4 text-text-tertiary",
      comfortable: "text-[13px] leading-[18px] text-text-tertiary",
    },
    eI = {
      terminal: "text-[11px] leading-4 text-text-quaternary",
      comfortable: "text-xs leading-4 text-text-quaternary",
    },
    ez = {
      terminal:
        "text-[11px] font-medium leading-4 tabular-nums text-text-primary",
      comfortable:
        "text-xs font-medium leading-4 tabular-nums text-text-primary",
    };
  function eD() {
    let e,
      r = (0, n.c)(1);
    return (
      r[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsxs)("svg", {
            "aria-hidden": !0,
            viewBox: "0 0 32 32",
            className: "size-7 text-gain",
            children: [
              (0, t.jsx)("rect", {
                x: "1",
                y: "1",
                width: "30",
                height: "30",
                rx: "8",
                fill: "var(--color-bg-tertiary)",
                stroke: "var(--color-border-tertiary)",
                strokeWidth: "2",
              }),
              (0, t.jsx)("rect", {
                x: "1",
                y: "1",
                width: "30",
                height: "30",
                rx: "8",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                pathLength: 100,
                strokeDasharray: 100,
                strokeDashoffset: 40,
              }),
            ],
          })),
          (r[0] = e))
        : (e = r[0]),
      e
    );
  }
  function eR(e) {
    let i,
      s,
      a,
      c,
      o,
      m,
      u,
      h,
      x,
      f,
      p,
      g,
      b,
      v,
      j,
      w,
      y,
      _,
      k,
      N,
      C,
      I,
      z,
      D,
      R,
      E,
      P,
      L,
      q,
      B,
      F,
      W,
      A,
      V,
      O,
      $,
      M,
      T,
      X,
      K,
      U,
      Y,
      G,
      Z,
      J,
      H,
      Q,
      ee,
      et,
      en,
      er,
      el,
      ei,
      es,
      ea,
      ec,
      ed,
      eo,
      em,
      eu,
      eh,
      ex,
      ef,
      ep,
      eg,
      ev,
      eR,
      eE,
      eP,
      eL,
      eq,
      eB,
      eF,
      eW,
      eA,
      eV,
      eO,
      e$,
      eM,
      eT,
      eX,
      eK,
      eU,
      eY,
      eG = (0, n.c)(204),
      { onClose: eZ } = e,
      { t: eJ } = (0, r.f)(),
      eH = (0, l.x)(),
      eQ = eI[eH],
      e1 = ez[eH];
    (eG[0] !== eJ
      ? ((i = eJ("advanced_search.legend.metrics.avatar.title")),
        (eG[0] = eJ),
        (eG[1] = i))
      : (i = eG[1]),
      eG[2] !== eJ
        ? ((s = eJ("advanced_search.legend.metrics.avatar.description")),
          (eG[2] = eJ),
          (eG[3] = s))
        : (s = eG[3]),
      eG[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (0, t.jsx)(eD, {})), (eG[4] = a))
        : (a = eG[4]),
      eG[5] !== i || eG[6] !== s
        ? ((c = { id: "avatar", title: i, description: s, preview: a }),
          (eG[5] = i),
          (eG[6] = s),
          (eG[7] = c))
        : (c = eG[7]),
      eG[8] !== eJ
        ? ((o = eJ("advanced_search.legend.metrics.name.title")),
          (eG[8] = eJ),
          (eG[9] = o))
        : (o = eG[9]),
      eG[10] !== eJ
        ? ((m = eJ("advanced_search.legend.metrics.name.description")),
          (eG[10] = eJ),
          (eG[11] = m))
        : (m = eG[11]),
      eG[12] !== eQ
        ? ((u = (0, t.jsx)("span", { className: eQ, children: "PUMP" })),
          (eG[12] = eQ),
          (eG[13] = u))
        : (u = eG[13]),
      eG[14] !== e1
        ? ((h = (0, t.jsx)("span", { className: e1, children: "Pump" })),
          (eG[14] = e1),
          (eG[15] = h))
        : (h = eG[15]),
      eG[16] !== u || eG[17] !== h
        ? ((x = (0, t.jsxs)("span", {
            className: "flex items-baseline gap-1.5",
            children: [u, h],
          })),
          (eG[16] = u),
          (eG[17] = h),
          (eG[18] = x))
        : (x = eG[18]),
      eG[19] !== o || eG[20] !== m || eG[21] !== x
        ? ((f = { id: "name", title: o, description: m, preview: x }),
          (eG[19] = o),
          (eG[20] = m),
          (eG[21] = x),
          (eG[22] = f))
        : (f = eG[22]),
      eG[23] !== eJ
        ? ((p = eJ("advanced_search.legend.metrics.age.title")),
          (eG[23] = eJ),
          (eG[24] = p))
        : (p = eG[24]),
      eG[25] !== eJ
        ? ((g = eJ("advanced_search.legend.metrics.age.description")),
          (eG[25] = eJ),
          (eG[26] = g))
        : (g = eG[26]),
      eG[27] === Symbol.for("react.memo_cache_sentinel")
        ? ((b = (0, t.jsx)(d.i$, { "aria-hidden": !0, className: "size-3" })),
          (eG[27] = b))
        : (b = eG[27]),
      eG[28] !== e1
        ? ((v = (0, t.jsxs)("span", {
            className: "flex items-center gap-0.5 text-text-primary",
            children: [
              b,
              (0, t.jsx)("span", { className: e1, children: "27m" }),
            ],
          })),
          (eG[28] = e1),
          (eG[29] = v))
        : (v = eG[29]),
      eG[30] !== p || eG[31] !== g || eG[32] !== v
        ? ((j = { id: "age", title: p, description: g, preview: v }),
          (eG[30] = p),
          (eG[31] = g),
          (eG[32] = v),
          (eG[33] = j))
        : (j = eG[33]),
      eG[34] !== eJ
        ? ((w = eJ("advanced_search.legend.metrics.socials.title")),
          (eG[34] = eJ),
          (eG[35] = w))
        : (w = eG[35]),
      eG[36] !== eJ
        ? ((y = eJ("advanced_search.legend.metrics.socials.description")),
          (eG[36] = eJ),
          (eG[37] = y))
        : (y = eG[37]),
      eG[38] === Symbol.for("react.memo_cache_sentinel")
        ? ((_ = (0, t.jsxs)("span", {
            className: "flex items-center gap-1 text-text-secondary",
            children: [
              (0, t.jsx)(eb.Tc, { "aria-hidden": !0, className: "size-3.5" }),
              (0, t.jsx)(eb.DZ, { "aria-hidden": !0, className: "size-3.5" }),
            ],
          })),
          (eG[38] = _))
        : (_ = eG[38]),
      eG[39] !== w || eG[40] !== y
        ? ((k = { id: "socials", title: w, description: y, preview: _ }),
          (eG[39] = w),
          (eG[40] = y),
          (eG[41] = k))
        : (k = eG[41]),
      eG[42] !== eJ
        ? ((N = eJ("creator_fees.charity.label")), (eG[42] = eJ), (eG[43] = N))
        : (N = eG[43]),
      eG[44] !== eJ
        ? ((C = eJ("creator_fees.charity.donate_cta_description")),
          (eG[44] = eJ),
          (eG[45] = C))
        : (C = eG[45]),
      eG[46] === Symbol.for("react.memo_cache_sentinel")
        ? ((I = (0, t.jsx)(eb.cJ, {
            "aria-hidden": !0,
            className: "size-3.5 text-hot",
          })),
          (eG[46] = I))
        : (I = eG[46]),
      eG[47] !== N || eG[48] !== C
        ? ((z = { id: "charity", title: N, description: C, preview: I }),
          (eG[47] = N),
          (eG[48] = C),
          (eG[49] = z))
        : (z = eG[49]),
      eG[50] !== eJ
        ? ((D = eJ("advanced_search.legend.metrics.volume.title")),
          (eG[50] = eJ),
          (eG[51] = D))
        : (D = eG[51]),
      eG[52] !== eJ
        ? ((R = eJ("advanced_search.legend.metrics.volume.description")),
          (eG[52] = eJ),
          (eG[53] = R))
        : (R = eG[53]),
      eG[54] !== eQ
        ? ((E = (0, t.jsx)("span", { className: eQ, children: "V" })),
          (eG[54] = eQ),
          (eG[55] = E))
        : (E = eG[55]),
      eG[56] === Symbol.for("react.memo_cache_sentinel")
        ? ((P = (0, ek.l)(46e3)), (eG[56] = P))
        : (P = eG[56]),
      eG[57] !== e1
        ? ((L = (0, t.jsx)("span", { className: e1, children: P })),
          (eG[57] = e1),
          (eG[58] = L))
        : (L = eG[58]),
      eG[59] !== E || eG[60] !== L
        ? ((q = (0, t.jsxs)("span", {
            className: "flex items-baseline gap-1",
            children: [E, L],
          })),
          (eG[59] = E),
          (eG[60] = L),
          (eG[61] = q))
        : (q = eG[61]),
      eG[62] !== D || eG[63] !== R || eG[64] !== q
        ? ((B = { id: "volume", title: D, description: R, preview: q }),
          (eG[62] = D),
          (eG[63] = R),
          (eG[64] = q),
          (eG[65] = B))
        : (B = eG[65]),
      eG[66] !== eJ
        ? ((F = eJ("advanced_search.legend.metrics.market_cap.title")),
          (eG[66] = eJ),
          (eG[67] = F))
        : (F = eG[67]),
      eG[68] !== eJ
        ? ((W = eJ("advanced_search.legend.metrics.market_cap.description")),
          (eG[68] = eJ),
          (eG[69] = W))
        : (W = eG[69]),
      eG[70] !== eQ
        ? ((A = (0, t.jsx)("span", { className: eQ, children: "MC" })),
          (eG[70] = eQ),
          (eG[71] = A))
        : (A = eG[71]),
      eG[72] === Symbol.for("react.memo_cache_sentinel")
        ? ((V = (0, ek.l)(128e3)), (eG[72] = V))
        : (V = eG[72]),
      eG[73] !== e1
        ? ((O = (0, t.jsx)("span", { className: e1, children: V })),
          (eG[73] = e1),
          (eG[74] = O))
        : (O = eG[74]),
      eG[75] !== A || eG[76] !== O
        ? (($ = (0, t.jsxs)("span", {
            className: "flex items-baseline gap-1",
            children: [A, O],
          })),
          (eG[75] = A),
          (eG[76] = O),
          (eG[77] = $))
        : ($ = eG[77]),
      eG[78] !== F || eG[79] !== W || eG[80] !== $
        ? ((M = { id: "market_cap", title: F, description: W, preview: $ }),
          (eG[78] = F),
          (eG[79] = W),
          (eG[80] = $),
          (eG[81] = M))
        : (M = eG[81]),
      eG[82] !== eJ
        ? ((T = eJ("advanced_search.legend.metrics.fees.title")),
          (eG[82] = eJ),
          (eG[83] = T))
        : (T = eG[83]),
      eG[84] !== eJ
        ? ((X = eJ("advanced_search.legend.metrics.fees.description")),
          (eG[84] = eJ),
          (eG[85] = X))
        : (X = eG[85]),
      eG[86] !== eQ
        ? ((K = (0, t.jsx)("span", { className: eQ, children: "F" })),
          (eG[86] = eQ),
          (eG[87] = K))
        : (K = eG[87]),
      eG[88] === Symbol.for("react.memo_cache_sentinel")
        ? ((U = (0, t.jsx)(ej.default, {
            src: ew.U,
            alt: "",
            width: 12,
            height: 12,
            className: "size-3 object-contain",
          })),
          (eG[88] = U))
        : (U = eG[88]),
      eG[89] !== e1
        ? ((Y = (0, t.jsx)("span", { className: e1, children: "2.41" })),
          (eG[89] = e1),
          (eG[90] = Y))
        : (Y = eG[90]),
      eG[91] !== K || eG[92] !== Y
        ? ((G = (0, t.jsxs)("span", {
            className: "flex items-center gap-1",
            children: [K, U, Y],
          })),
          (eG[91] = K),
          (eG[92] = Y),
          (eG[93] = G))
        : (G = eG[93]),
      eG[94] !== T || eG[95] !== X || eG[96] !== G
        ? ((Z = { id: "fees", title: T, description: X, preview: G }),
          (eG[94] = T),
          (eG[95] = X),
          (eG[96] = G),
          (eG[97] = Z))
        : (Z = eG[97]),
      eG[98] !== eJ
        ? ((J = eJ("advanced_search.legend.metrics.holders.title")),
          (eG[98] = eJ),
          (eG[99] = J))
        : (J = eG[99]),
      eG[100] !== eJ
        ? ((H = eJ("advanced_search.legend.metrics.holders.description")),
          (eG[100] = eJ),
          (eG[101] = H))
        : (H = eG[101]),
      eG[102] === Symbol.for("react.memo_cache_sentinel")
        ? ((Q = (0, t.jsx)(ey.F, {
            testId: "legend-holders",
            icon: (0, t.jsx)(eb._3, { "aria-hidden": !0, className: "size-3" }),
            value: (0, ek.O)(353),
            alarm: !1,
          })),
          (eG[102] = Q))
        : (Q = eG[102]),
      eG[103] !== J || eG[104] !== H
        ? ((ee = { id: "holders", title: J, description: H, preview: Q }),
          (eG[103] = J),
          (eG[104] = H),
          (eG[105] = ee))
        : (ee = eG[105]),
      eG[106] !== eJ
        ? ((et = eJ("advanced_search.legend.metrics.snipers.title")),
          (eG[106] = eJ),
          (eG[107] = et))
        : (et = eG[107]),
      eG[108] !== eJ
        ? ((en = eJ("advanced_search.legend.metrics.snipers.description")),
          (eG[108] = eJ),
          (eG[109] = en))
        : (en = eG[109]),
      eG[110] === Symbol.for("react.memo_cache_sentinel")
        ? ((er = (0, t.jsx)(ey.F, {
            testId: "legend-snipers",
            icon: (0, t.jsx)(d.WW, { "aria-hidden": !0, className: "size-3" }),
            value: "4%",
            alarm: !1,
          })),
          (eG[110] = er))
        : (er = eG[110]),
      eG[111] !== et || eG[112] !== en
        ? ((el = { id: "snipers", title: et, description: en, preview: er }),
          (eG[111] = et),
          (eG[112] = en),
          (eG[113] = el))
        : (el = eG[113]),
      eG[114] !== eJ
        ? ((ei = eJ("advanced_search.legend.metrics.bundlers.title")),
          (eG[114] = eJ),
          (eG[115] = ei))
        : (ei = eG[115]),
      eG[116] !== eJ
        ? ((es = eJ("advanced_search.legend.metrics.bundlers.description")),
          (eG[116] = eJ),
          (eG[117] = es))
        : (es = eG[117]),
      eG[118] === Symbol.for("react.memo_cache_sentinel")
        ? ((ea = (0, t.jsx)(ey.F, {
            testId: "legend-bundlers",
            icon: (0, t.jsx)(d.qh, { "aria-hidden": !0, className: "size-3" }),
            value: "2%",
            alarm: !1,
          })),
          (eG[118] = ea))
        : (ea = eG[118]),
      eG[119] !== ei || eG[120] !== es
        ? ((ec = { id: "bundlers", title: ei, description: es, preview: ea }),
          (eG[119] = ei),
          (eG[120] = es),
          (eG[121] = ec))
        : (ec = eG[121]),
      eG[122] !== eJ
        ? ((ed = eJ("advanced_search.legend.metrics.dev_holdings.title")),
          (eG[122] = eJ),
          (eG[123] = ed))
        : (ed = eG[123]),
      eG[124] !== eJ
        ? ((eo = eJ("advanced_search.legend.metrics.dev_holdings.description")),
          (eG[124] = eJ),
          (eG[125] = eo))
        : (eo = eG[125]),
      eG[126] === Symbol.for("react.memo_cache_sentinel")
        ? ((em = (0, t.jsx)(ey.F, {
            testId: "legend-dev-holdings",
            icon: (0, t.jsx)(eb.Go, { "aria-hidden": !0, className: "size-3" }),
            value: "3%",
            alarm: !1,
          })),
          (eG[126] = em))
        : (em = eG[126]),
      eG[127] !== ed || eG[128] !== eo
        ? ((eu = {
            id: "dev_holdings",
            title: ed,
            description: eo,
            preview: em,
          }),
          (eG[127] = ed),
          (eG[128] = eo),
          (eG[129] = eu))
        : (eu = eG[129]),
      eG[130] !== eJ
        ? ((eh = eJ("advanced_search.legend.metrics.top_holders.title")),
          (eG[130] = eJ),
          (eG[131] = eh))
        : (eh = eG[131]),
      eG[132] !== eJ
        ? ((ex = eJ("advanced_search.legend.metrics.top_holders.description")),
          (eG[132] = eJ),
          (eG[133] = ex))
        : (ex = eG[133]),
      eG[134] === Symbol.for("react.memo_cache_sentinel")
        ? ((ef = (0, t.jsx)(ey.F, {
            testId: "legend-top-holders",
            icon: (0, t.jsx)(eb.zN, { "aria-hidden": !0, className: "size-3" }),
            value: "14%",
            alarm: !1,
          })),
          (eG[134] = ef))
        : (ef = eG[134]),
      eG[135] !== eh || eG[136] !== ex
        ? ((ep = {
            id: "top_holders",
            title: eh,
            description: ex,
            preview: ef,
          }),
          (eG[135] = eh),
          (eG[136] = ex),
          (eG[137] = ep))
        : (ep = eG[137]),
      eG[138] !== eJ
        ? ((eg = eJ("advanced_search.total_transactions")),
          (eG[138] = eJ),
          (eG[139] = eg))
        : (eg = eG[139]),
      eG[140] !== eJ
        ? ((ev = eJ(
            "advanced_search.legend.metrics.total_transactions.description",
          )),
          (eG[140] = eJ),
          (eG[141] = ev))
        : (ev = eG[141]),
      eG[142] !== eJ
        ? ((eR = eJ("common.trades")), (eG[142] = eJ), (eG[143] = eR))
        : (eR = eG[143]),
      eG[144] === Symbol.for("react.memo_cache_sentinel")
        ? ((eE = (0, t.jsx)("span", {
            className: "font-medium tabular-nums text-text-primary",
            children: (0, ek.O)(1900),
          })),
          (eG[144] = eE))
        : (eE = eG[144]),
      eG[145] !== eQ || eG[146] !== eR
        ? ((eP = (0, t.jsxs)("span", {
            className: eQ,
            children: [eR, " ", eE],
          })),
          (eG[145] = eQ),
          (eG[146] = eR),
          (eG[147] = eP))
        : (eP = eG[147]),
      eG[148] !== eg || eG[149] !== ev || eG[150] !== eP
        ? ((eL = {
            id: "total_transactions",
            title: eg,
            description: ev,
            preview: eP,
          }),
          (eG[148] = eg),
          (eG[149] = ev),
          (eG[150] = eP),
          (eG[151] = eL))
        : (eL = eG[151]),
      eG[152] !== f ||
      eG[153] !== j ||
      eG[154] !== k ||
      eG[155] !== z ||
      eG[156] !== B ||
      eG[157] !== M ||
      eG[158] !== c ||
      eG[159] !== Z ||
      eG[160] !== ee ||
      eG[161] !== el ||
      eG[162] !== ec ||
      eG[163] !== eu ||
      eG[164] !== ep ||
      eG[165] !== eL
        ? ((eq = [c, f, j, k, z, B, M, Z, ee, el, ec, eu, ep, eL]),
          (eG[152] = f),
          (eG[153] = j),
          (eG[154] = k),
          (eG[155] = z),
          (eG[156] = B),
          (eG[157] = M),
          (eG[158] = c),
          (eG[159] = Z),
          (eG[160] = ee),
          (eG[161] = el),
          (eG[162] = ec),
          (eG[163] = eu),
          (eG[164] = ep),
          (eG[165] = eL),
          (eG[166] = eq))
        : (eq = eG[166]));
    let e0 = eq;
    (eG[167] !== eZ
      ? ((eB = (e) => {
          e || eZ();
        }),
        (eG[167] = eZ),
        (eG[168] = eB))
      : (eB = eG[168]),
      eG[169] !== eJ
        ? ((eF = eJ("web.screeners.legend")), (eG[169] = eJ), (eG[170] = eF))
        : (eF = eG[170]));
    let e2 = eN[eH],
      e3 = eC[eH];
    (eG[171] !== e2 || eG[172] !== e3
      ? ((eW = (0, S.c)("border-b border-border-secondary", e2, e3)),
        (eG[171] = e2),
        (eG[172] = e3),
        (eG[173] = eW))
      : (eW = eG[173]),
      eG[174] !== eJ
        ? ((eA = eJ("advanced_search.pro_mode_description")),
          (eG[174] = eJ),
          (eG[175] = eA))
        : (eA = eG[175]),
      eG[176] !== eW || eG[177] !== eA
        ? ((eV = (0, t.jsx)("p", { className: eW, children: eA })),
          (eG[176] = eW),
          (eG[177] = eA),
          (eG[178] = eV))
        : (eV = eG[178]),
      eG[179] !== eJ
        ? ((eO = eJ("web.screeners.legend")), (eG[179] = eJ), (eG[180] = eO))
        : (eO = eG[180]),
      eG[181] !== eH || eG[182] !== e0
        ? ((e$ = e0.map((e, n) =>
            (0, t.jsxs)(
              "li",
              {
                "data-testid": `movers-legend-${e.id}`,
                className: (0, S.c)(
                  "flex items-start gap-3 border-b border-solid border-border-secondary",
                  n % 2 == 0 && n < e0.length - 1 && "sm:border-r",
                  eN[eH],
                ),
                children: [
                  (0, t.jsx)("span", {
                    className:
                      "flex h-7 w-20 shrink-0 items-center justify-center rounded-md bg-bg-tertiary px-2",
                    children: e.preview,
                  }),
                  (0, t.jsxs)("span", {
                    className: "flex min-w-0 flex-col gap-0.5",
                    children: [
                      (0, t.jsx)("span", {
                        className: eS[eH],
                        children: e.title,
                      }),
                      (0, t.jsx)("span", {
                        className: eC[eH],
                        children: e.description,
                      }),
                    ],
                  }),
                ],
              },
              e.id,
            ),
          )),
          (eG[181] = eH),
          (eG[182] = e0),
          (eG[183] = e$))
        : (e$ = eG[183]),
      eG[184] !== eO || eG[185] !== e$
        ? ((eM = (0, t.jsx)("ul", {
            className: "grid grid-cols-1 sm:grid-cols-2",
            "aria-label": eO,
            children: e$,
          })),
          (eG[184] = eO),
          (eG[185] = e$),
          (eG[186] = eM))
        : (eM = eG[186]));
    let e4 = eN[eH],
      e5 = eC[eH];
    return (
      eG[187] !== e4 || eG[188] !== e5
        ? ((eT = (0, S.c)(e4, e5)),
          (eG[187] = e4),
          (eG[188] = e5),
          (eG[189] = eT))
        : (eT = eG[189]),
      eG[190] !== eJ
        ? ((eX = eJ("web.screeners.legend_evm_note")),
          (eG[190] = eJ),
          (eG[191] = eX))
        : (eX = eG[191]),
      eG[192] !== eT || eG[193] !== eX
        ? ((eK = (0, t.jsx)("p", {
            "data-testid": "movers-legend-evm-note",
            className: eT,
            children: eX,
          })),
          (eG[192] = eT),
          (eG[193] = eX),
          (eG[194] = eK))
        : (eK = eG[194]),
      eG[195] !== eV || eG[196] !== eM || eG[197] !== eK
        ? ((eU = (0, t.jsxs)(e_.K, {
            className: "p-0",
            children: [eV, eM, eK],
          })),
          (eG[195] = eV),
          (eG[196] = eM),
          (eG[197] = eK),
          (eG[198] = eU))
        : (eU = eG[198]),
      eG[199] !== eH || eG[200] !== eB || eG[201] !== eF || eG[202] !== eU
        ? ((eY = (0, t.jsx)(e_.N, {
            open: !0,
            onOpenChange: eB,
            density: eH,
            size: "lg",
            title: eF,
            "data-testid": "movers-legend-dialog",
            children: eU,
          })),
          (eG[199] = eH),
          (eG[200] = eB),
          (eG[201] = eF),
          (eG[202] = eU),
          (eG[203] = eY))
        : (eY = eG[203]),
      eY
    );
  }
  var eE = e.i(493607),
    eP = e.i(703105),
    eL = e.i(347939),
    eq = e.i(461201),
    eB = e.i(354776),
    eF = e.i(146814),
    eW = e.i(923019),
    eA = e.i(439587),
    eV = e.i(724423),
    eO = e.i(764844);
  let e$ = {
    create: { title: "New list", cta: "Create" },
    duplicate: { title: "Duplicate list", cta: "Duplicate" },
    rename: { title: "Rename list", cta: "Rename" },
  };
  function eM(e) {
    let i,
      s,
      a,
      c,
      d,
      o,
      m,
      u,
      h,
      x = (0, n.c)(32),
      {
        title: f,
        cta: p,
        value: g,
        onValueChange: b,
        onSubmit: v,
        onClose: j,
        maxLength: w,
        placeholder: y,
        inputAriaLabel: _,
        inputTestId: k,
        submitTestId: N,
      } = e,
      { t: S } = (0, r.f)(),
      C = (0, l.x)();
    return (
      x[0] !== j
        ? ((i = (e) => {
            e || j();
          }),
          (x[0] = j),
          (x[1] = i))
        : (i = x[1]),
      x[2] !== v
        ? ((s = (e) => {
            (e.preventDefault(), v());
          }),
          (x[2] = v),
          (x[3] = s))
        : (s = x[3]),
      x[4] !== C ||
      x[5] !== _ ||
      x[6] !== k ||
      x[7] !== w ||
      x[8] !== b ||
      x[9] !== y ||
      x[10] !== g
        ? ((a = (0, t.jsx)(e_.K, {
            children: (0, t.jsx)(eV.N, {
              density: C,
              autoFocus: !0,
              type: "text",
              value: g,
              maxLength: w,
              onValueChange: b,
              placeholder: y,
              "aria-label": _,
              "data-testid": k,
            }),
          })),
          (x[4] = C),
          (x[5] = _),
          (x[6] = k),
          (x[7] = w),
          (x[8] = b),
          (x[9] = y),
          (x[10] = g),
          (x[11] = a))
        : (a = x[11]),
      x[12] !== S
        ? ((c = S("common.cancel")), (x[12] = S), (x[13] = c))
        : (c = x[13]),
      x[14] !== j || x[15] !== c
        ? ((d = (0, t.jsx)(eA.K, {
            type: "button",
            variant: "secondary",
            size: e_.Z,
            onClick: j,
            children: c,
          })),
          (x[14] = j),
          (x[15] = c),
          (x[16] = d))
        : (d = x[16]),
      x[17] !== p || x[18] !== N
        ? ((o = (0, t.jsx)(eA.K, {
            type: "submit",
            variant: "primary",
            size: e_.$,
            "data-testid": N,
            children: p,
          })),
          (x[17] = p),
          (x[18] = N),
          (x[19] = o))
        : (o = x[19]),
      x[20] !== d || x[21] !== o
        ? ((m = (0, t.jsxs)(e_.c, { children: [d, o] })),
          (x[20] = d),
          (x[21] = o),
          (x[22] = m))
        : (m = x[22]),
      x[23] !== s || x[24] !== a || x[25] !== m
        ? ((u = (0, t.jsxs)("form", {
            className: "flex min-h-0 flex-col",
            onSubmit: s,
            children: [a, m],
          })),
          (x[23] = s),
          (x[24] = a),
          (x[25] = m),
          (x[26] = u))
        : (u = x[26]),
      x[27] !== C || x[28] !== i || x[29] !== u || x[30] !== f
        ? ((h = (0, t.jsx)(e_.N, {
            open: !0,
            onOpenChange: i,
            density: C,
            size: "sm",
            title: f,
            hideClose: !0,
            children: u,
          })),
          (x[27] = C),
          (x[28] = i),
          (x[29] = u),
          (x[30] = f),
          (x[31] = h))
        : (h = x[31]),
      h
    );
  }
  function eT() {
    let e,
      i,
      s,
      c,
      o,
      m,
      x,
      f,
      p,
      g,
      b,
      v,
      j,
      w,
      y,
      _,
      k,
      S,
      C,
      I,
      z,
      D,
      R,
      E,
      P,
      L,
      q = (0, n.c)(86),
      { t: B } = (0, r.f)(),
      F = (0, l.x)(),
      W = (0, T.V)(eX),
      A = (0, T.V)(T.p),
      {
        createDeck: V,
        switchDeck: O,
        renameDeck: $,
        deleteDeck: M,
      } = (0, u.f)(),
      [X, K] = (0, a.useState)(null),
      [U, Y] = (0, a.useState)("");
    q[0] !== A.name
      ? ((e = (e) => {
          (Y("rename" === e ? A.name : ""), K(e));
        }),
        (q[0] = A.name),
        (q[1] = e))
      : (e = q[1]);
    let G = e;
    q[2] !== A.id || q[3] !== V || q[4] !== U || q[5] !== X || q[6] !== $
      ? ((i = () => {
          ("create" === X && V(U),
            "duplicate" === X && V(U, { cloneActive: !0 }),
            "rename" === X && $(A.id, U),
            K(null));
        }),
        (q[2] = A.id),
        (q[3] = V),
        (q[4] = U),
        (q[5] = X),
        (q[6] = $),
        (q[7] = i))
      : (i = q[7]);
    let Z = i,
      J = W.length >= N.i,
      H = X ? e$[X] : null,
      Q = en.v[F];
    (q[8] !== A.name || q[9] !== B
      ? ((s = B("web.screeners.decks_active_a11y", { name: A.name })),
        (q[8] = A.name),
        (q[9] = B),
        (q[10] = s))
      : (s = q[10]),
      q[11] !== A.name || q[12] !== F
        ? ((c = (0, t.jsx)(h.p, {
            density: F,
            variant: "raised",
            trailing: !0,
            className: "max-w-[260px] data-[popup-open]:text-text-primary",
            children: A.name,
          })),
          (q[11] = A.name),
          (q[12] = F),
          (q[13] = c))
        : (c = q[13]),
      q[14] !== s || q[15] !== c
        ? ((o = (0, t.jsx)(eO.g, {
            "data-testid": "screeners-deck-switcher",
            "aria-label": s,
            render: c,
          })),
          (q[14] = s),
          (q[15] = c),
          (q[16] = o))
        : (o = q[16]));
    let ee = "terminal" === F;
    if (q[17] !== A.id || q[18] !== W || q[19] !== O) {
      let e;
      (q[21] !== A.id || q[22] !== O
        ? ((e = (e) => {
            let n = e.id === A.id;
            return (0, t.jsxs)(
              eO.d,
              {
                onClick: () => O(e.id),
                "aria-current": n || void 0,
                active: n,
                children: [
                  (0, t.jsx)("span", {
                    className: "min-w-0 flex-1 truncate",
                    children: e.name,
                  }),
                  (0, t.jsxs)("span", {
                    className:
                      "shrink-0 text-xs leading-4 text-text-quaternary tabular-nums",
                    children: [
                      e.columns.length,
                      " ",
                      1 === e.columns.length ? "column" : "columns",
                    ],
                  }),
                ],
              },
              e.id,
            );
          }),
          (q[21] = A.id),
          (q[22] = O),
          (q[23] = e))
        : (e = q[23]),
        (m = W.map(e)),
        (q[17] = A.id),
        (q[18] = W),
        (q[19] = O),
        (q[20] = m));
    } else m = q[20];
    (q[24] === Symbol.for("react.memo_cache_sentinel")
      ? ((x = (0, t.jsx)(eO.Z, {})), (q[24] = x))
      : (x = q[24]),
      q[25] !== G
        ? ((f = () => G("create")), (q[25] = G), (q[26] = f))
        : (f = q[26]),
      q[27] !== Q
        ? ((p = (0, t.jsx)(d.HB, { className: Q })), (q[27] = Q), (q[28] = p))
        : (p = q[28]),
      q[29] !== J || q[30] !== B
        ? ((g = B(
            J ? "web.screeners.list_limit_reached" : "web.screeners.new_list",
          )),
          (q[29] = J),
          (q[30] = B),
          (q[31] = g))
        : (g = q[31]),
      q[32] !== J || q[33] !== g || q[34] !== f || q[35] !== p
        ? ((b = (0, t.jsxs)(eO.d, {
            disabled: J,
            onClick: f,
            children: [p, g],
          })),
          (q[32] = J),
          (q[33] = g),
          (q[34] = f),
          (q[35] = p),
          (q[36] = b))
        : (b = q[36]),
      q[37] !== G
        ? ((v = () => G("duplicate")), (q[37] = G), (q[38] = v))
        : (v = q[38]),
      q[39] !== Q
        ? ((j = (0, t.jsx)(d.pb, { className: Q })), (q[39] = Q), (q[40] = j))
        : (j = q[40]),
      q[41] !== B
        ? ((w = B("web.screeners.duplicate_list")), (q[41] = B), (q[42] = w))
        : (w = q[42]),
      q[43] !== J || q[44] !== v || q[45] !== j || q[46] !== w
        ? ((y = (0, t.jsxs)(eO.d, {
            disabled: J,
            onClick: v,
            children: [j, w],
          })),
          (q[43] = J),
          (q[44] = v),
          (q[45] = j),
          (q[46] = w),
          (q[47] = y))
        : (y = q[47]),
      q[48] !== G
        ? ((_ = () => G("rename")), (q[48] = G), (q[49] = _))
        : (_ = q[49]),
      q[50] !== Q
        ? ((k = (0, t.jsx)(d.I4, { className: Q })), (q[50] = Q), (q[51] = k))
        : (k = q[51]),
      q[52] !== B
        ? ((S = B("web.screeners.rename_list")), (q[52] = B), (q[53] = S))
        : (S = q[53]),
      q[54] !== _ || q[55] !== k || q[56] !== S
        ? ((C = (0, t.jsxs)(eO.d, { onClick: _, children: [k, S] })),
          (q[54] = _),
          (q[55] = k),
          (q[56] = S),
          (q[57] = C))
        : (C = q[57]));
    let et = W.length <= 1;
    (q[58] !== A.id || q[59] !== M
      ? ((I = () => M(A.id)), (q[58] = A.id), (q[59] = M), (q[60] = I))
      : (I = q[60]),
      q[61] !== Q
        ? ((z = (0, t.jsx)(d.bO, { className: Q })), (q[61] = Q), (q[62] = z))
        : (z = q[62]));
    let er = W.length <= 1 ? "Can't delete the last list" : "Delete list";
    return (
      q[63] !== et || q[64] !== I || q[65] !== z || q[66] !== er
        ? ((D = (0, t.jsxs)(eO.d, {
            variant: "destructive",
            disabled: et,
            onClick: I,
            children: [z, er],
          })),
          (q[63] = et),
          (q[64] = I),
          (q[65] = z),
          (q[66] = er),
          (q[67] = D))
        : (D = q[67]),
      q[68] !== b ||
      q[69] !== y ||
      q[70] !== C ||
      q[71] !== D ||
      q[72] !== ee ||
      q[73] !== m
        ? ((R = (0, t.jsxs)(eO.A, {
            align: "start",
            dense: ee,
            className: "min-w-56",
            children: [m, x, b, y, C, D],
          })),
          (q[68] = b),
          (q[69] = y),
          (q[70] = C),
          (q[71] = D),
          (q[72] = ee),
          (q[73] = m),
          (q[74] = R))
        : (R = q[74]),
      q[75] !== R || q[76] !== o
        ? ((E = (0, t.jsxs)(eO.k, { modal: !1, children: [o, R] })),
          (q[75] = R),
          (q[76] = o),
          (q[77] = E))
        : (E = q[77]),
      q[78] !== U || q[79] !== H || q[80] !== Z || q[81] !== B
        ? ((P = H
            ? (0, t.jsx)(eM, {
                title: H.title,
                cta: H.cta,
                value: U,
                onValueChange: Y,
                onSubmit: Z,
                onClose: () => K(null),
                maxLength: N.E,
                placeholder: B("web.screeners.list_name"),
                inputAriaLabel: B("web.screeners.list_name"),
              })
            : null),
          (q[78] = U),
          (q[79] = H),
          (q[80] = Z),
          (q[81] = B),
          (q[82] = P))
        : (P = q[82]),
      q[83] !== E || q[84] !== P
        ? ((L = (0, t.jsxs)(t.Fragment, { children: [E, P] })),
          (q[83] = E),
          (q[84] = P),
          (q[85] = L))
        : (L = q[85]),
      L
    );
  }
  function eX(e) {
    return e.decks;
  }
  var eK = e.i(970914),
    eU = e.i(548630);
  function eY(e) {
    let i,
      s,
      d,
      o,
      m,
      h,
      x,
      f,
      p,
      b,
      v,
      j,
      w,
      y,
      _,
      k,
      N,
      S,
      C,
      I,
      z,
      D,
      R,
      E = (0, n.c)(57),
      { open: P, onClose: L } = e,
      { t: q } = (0, r.f)(),
      B = (0, l.x)(),
      F = (0, T.V)(T.O),
      { addColumn: W } = (0, u.f)(),
      [A, V] = (0, a.useState)(null),
      O = en.L[B];
    return (
      E[0] !== L
        ? ((i = (e) => {
            e || L();
          }),
          (E[0] = L),
          (E[1] = i))
        : (i = E[1]),
      E[2] !== q
        ? ((s = q("web.screeners.board_settings")), (E[2] = q), (E[3] = s))
        : (s = E[3]),
      E[4] !== q
        ? ((d = q("web.screeners.my_lists")), (E[4] = q), (E[5] = d))
        : (d = E[5]),
      E[6] !== O || E[7] !== d
        ? ((o = (0, t.jsx)("p", { className: O, children: d })),
          (E[6] = O),
          (E[7] = d),
          (E[8] = o))
        : (o = E[8]),
      E[9] === Symbol.for("react.memo_cache_sentinel")
        ? ((m = (0, t.jsx)("div", {
            className: "flex",
            children: (0, t.jsx)(eT, {}),
          })),
          (E[9] = m))
        : (m = E[9]),
      E[10] !== o
        ? ((h = (0, t.jsxs)("section", {
            className: "flex flex-col gap-2",
            children: [o, m],
          })),
          (E[10] = o),
          (E[11] = h))
        : (h = E[11]),
      E[12] === Symbol.for("react.memo_cache_sentinel")
        ? ((x = (0, t.jsx)(e_.a, {})), (E[12] = x))
        : (x = E[12]),
      E[13] !== q
        ? ((f = q("web.screeners.customize_board")), (E[13] = q), (E[14] = f))
        : (f = E[14]),
      E[15] !== O || E[16] !== f
        ? ((p = (0, t.jsx)("p", { className: O, children: f })),
          (E[15] = O),
          (E[16] = f),
          (E[17] = p))
        : (p = E[17]),
      E[18] !== q
        ? ((b = q("web.settings.all_settings")), (E[18] = q), (E[19] = b))
        : (b = E[19]),
      E[20] !== b
        ? ((v = (0, t.jsx)(eA.K, {
            variant: "secondary",
            size: e_.Z,
            children: b,
          })),
          (E[20] = b),
          (E[21] = v))
        : (v = E[21]),
      E[22] === Symbol.for("react.memo_cache_sentinel")
        ? ((j = (0, t.jsx)(eK.s, {})), (E[22] = j))
        : (j = E[22]),
      E[23] !== L || E[24] !== v
        ? ((w = (0, t.jsx)("div", {
            className: "flex",
            children: (0, t.jsx)(eU.S, {
              section: "feed",
              settingId: "feed.screeners.style",
              onBeforeOpen: L,
              trigger: v,
              children: j,
            }),
          })),
          (E[23] = L),
          (E[24] = v),
          (E[25] = w))
        : (w = E[25]),
      E[26] !== w || E[27] !== p
        ? ((y = (0, t.jsxs)("section", {
            className: "flex flex-col gap-2",
            children: [p, w],
          })),
          (E[26] = w),
          (E[27] = p),
          (E[28] = y))
        : (y = E[28]),
      E[29] === Symbol.for("react.memo_cache_sentinel")
        ? ((_ = (0, t.jsx)(e_.a, {})), (E[29] = _))
        : (_ = E[29]),
      E[30] !== q
        ? ((k = q("web.screeners.add_columns")), (E[30] = q), (E[31] = k))
        : (k = E[31]),
      E[32] !== O || E[33] !== k
        ? ((N = (0, t.jsx)("p", { className: O, children: k })),
          (E[32] = O),
          (E[33] = k),
          (E[34] = N))
        : (N = E[34]),
      E[35] !== F
        ? ((S = (0, t.jsx)(g, { columns: F, onRequestConfig: V })),
          (E[35] = F),
          (E[36] = S))
        : (S = E[36]),
      E[37] !== N || E[38] !== S
        ? ((C = (0, t.jsxs)("section", {
            className: "flex flex-col gap-2",
            children: [N, S],
          })),
          (E[37] = N),
          (E[38] = S),
          (E[39] = C))
        : (C = E[39]),
      E[40] !== y || E[41] !== C || E[42] !== h
        ? ((I = (0, t.jsxs)(e_.K, {
            className: "flex flex-col gap-4",
            children: [h, x, y, _, C],
          })),
          (E[40] = y),
          (E[41] = C),
          (E[42] = h),
          (E[43] = I))
        : (I = E[43]),
      E[44] !== B || E[45] !== P || E[46] !== i || E[47] !== s || E[48] !== I
        ? ((z = (0, t.jsx)(e_.N, {
            open: P,
            onOpenChange: i,
            density: B,
            size: "lg",
            title: s,
            "data-testid": "screeners-board-settings",
            children: I,
          })),
          (E[44] = B),
          (E[45] = P),
          (E[46] = i),
          (E[47] = s),
          (E[48] = I),
          (E[49] = z))
        : (z = E[49]),
      E[50] !== W || E[51] !== F || E[52] !== A
        ? ((D = A
            ? (0, t.jsx)(c.f, {
                type: A,
                onPick: (e) => {
                  (W(A, e, F.length), V(null));
                },
                onClose: () => V(null),
              })
            : null),
          (E[50] = W),
          (E[51] = F),
          (E[52] = A),
          (E[53] = D))
        : (D = E[53]),
      E[54] !== z || E[55] !== D
        ? ((R = (0, t.jsxs)(t.Fragment, { children: [z, D] })),
          (E[54] = z),
          (E[55] = D),
          (E[56] = R))
        : (R = E[56]),
      R
    );
  }
  var eG = e.i(606178),
    eZ = e.i(634661),
    eJ = e.i(126126),
    eH = e.i(261848),
    eQ = e.i(27847),
    e1 = e.i(937863);
  let e0 = {
      green: "web.screeners.accent_green",
      blue: "web.screeners.accent_blue",
      purple: "web.screeners.accent_purple",
      amber: "web.screeners.accent_amber",
      rose: "web.screeners.accent_rose",
      cyan: "web.screeners.accent_cyan",
    },
    e2 =
      "flex size-5 items-center justify-center rounded-full border border-solid transition-colors",
    e3 = (e, t) => {
      "function" == typeof e ? e(t) : e && (e.current = t);
    };
  function e4(e) {
    let i,
      s,
      o,
      m,
      h,
      g,
      b,
      v,
      j,
      w,
      y,
      _,
      k,
      C,
      I,
      z,
      D,
      R,
      E,
      P,
      L,
      q,
      B,
      F,
      W,
      A,
      V,
      O,
      $,
      X,
      K,
      U,
      Y,
      G,
      Z,
      J,
      H,
      Q,
      ee,
      et,
      er,
      el,
      ei,
      es,
      ea,
      ec,
      ed,
      eo,
      em,
      eu,
      eh,
      ex,
      ef,
      ep,
      eg,
      ej,
      ew,
      ey,
      e_,
      ek,
      eN,
      eS,
      eC,
      eI,
      ez,
      eD,
      eA,
      eV,
      e$,
      eT,
      eX,
      eK,
      eU,
      e4,
      e7,
      e8,
      e9,
      te,
      tt,
      tn,
      tr,
      tl,
      ti,
      ts,
      ta,
      tc,
      td,
      to,
      tm,
      tu,
      th,
      tx,
      tf,
      tp,
      tg,
      tb = (0, n.c)(337),
      {
        column: tv,
        pane: tj,
        paneIndex: tw,
        paneCount: ty,
        menuExtraItems: t_,
        wrapperRef: tk,
        headerDragRef: tN,
        headerDragProps: tS,
        isDraggingPane: tC,
      } = e,
      tI = void 0 !== tC && tC,
      {
        setPaneView: tz,
        togglePanePin: tD,
        setPaneFilters: tR,
        setPaneBoard: tE,
        setPaneTrending: tP,
        setPaneSound: tL,
        setPaneAccent: tq,
        setPaneTitle: tB,
        setPaneSizes: tF,
        splitPane: tW,
        splitColumnRight: tA,
        movePane: tV,
        removePane: tO,
      } = (0, u.f)(),
      t$ = (0, T.V)(e6),
      tM = (0, T.V)(e5),
      tT = (0, l.x)(),
      tX = (0, a.useRef)(null),
      { t: tK } = (0, r.f)();
    tb[0] !== tv || tb[1] !== tj.size || tb[2] !== tw || tb[3] !== tF
      ? ((i = (e) => {
          let t = tX.current,
            n = t?.previousElementSibling;
          if (!t || !n || 0 !== e.button) return;
          (e.preventDefault(), e.stopPropagation());
          let r = e.clientY,
            l = t.getBoundingClientRect().height,
            i = n.getBoundingClientRect().height,
            s = (tj.size ?? 1) + (tv.panes[tw - 1]?.size ?? 1),
            a = l + i,
            c = (e) => {
              let t = Math.min(96, a / 2),
                n = Math.min(a - t, Math.max(t, i + e - r)),
                l = (0, N.o)((n / a) * s);
              return [l, (0, N.o)(s - l)];
            },
            d = c(r),
            o = () => {
              let [e, r] = d;
              ((n.style.flexGrow = ""),
                (t.style.flexGrow = ""),
                tF(
                  tv,
                  tv.panes.map((t, n) =>
                    n === tw - 1 ? e : n === tw ? r : (t.size ?? 1),
                  ),
                ));
            };
          (0, M.L)(e.currentTarget, e.pointerId, {
            onMove: (e) => {
              ((d = c(e.clientY)),
                (n.style.flexGrow = String(d[0])),
                (t.style.flexGrow = String(d[1])));
            },
            onRelease: o,
            onCancel: o,
          });
        }),
        (tb[0] = tv),
        (tb[1] = tj.size),
        (tb[2] = tw),
        (tb[3] = tF),
        (tb[4] = i))
      : (i = tb[4]);
    let tU = i;
    tb[5] !== tj
      ? ((s = (0, N.M)(tj)), (tb[5] = tj), (tb[6] = s))
      : (s = tb[6]);
    let tY = s,
      tG = p.J[tj.view],
      { paramLabel: tZ } = (0, eW.f)(tY);
    tb[7] !== tj.view
      ? ((o = eJ.G.has(tj.view)), (tb[7] = tj.view), (tb[8] = o))
      : (o = tb[8]);
    let tJ = o;
    tb[9] !== tj
      ? ((m = (0, e1.x)(tj, tj.view)), (tb[9] = tj), (tb[10] = m))
      : (m = tb[10]);
    let tH = m;
    tb[11] !== tj
      ? ((h = (0, e1.g)(tj, tj.view)), (tb[11] = tj), (tb[12] = h))
      : (h = tb[12]);
    let tQ = h,
      t1 = en.v[tT],
      [t0, t2] = (0, a.useState)(null),
      [t3, t4] = (0, a.useState)(null),
      [t5, t6] = (0, a.useState)(!1),
      [t7, t8] = (0, a.useState)(!1),
      { paused: t9, headerHasRoom: ne, slotRef: nt, sink: nn } = (0, l.B)(tT),
      nr = (0, l.J)();
    tb[13] !== tj.view
      ? ((g = (0, eH.R)(tj.view)), (tb[13] = tj.view), (tb[14] = g))
      : (g = tb[14]);
    let nl = g;
    tb[15] !== tv.id || tb[16] !== tj || tb[17] !== tz
      ? ((b = (e) => {
          if (e === tj.view) return;
          let t = !!p.J[e].param,
            n = !!tj.byView?.[e]?.params;
          t && !n ? t2(e) : tz(tv.id, tj, e);
        }),
        (tb[15] = tv.id),
        (tb[16] = tj),
        (tb[17] = tz),
        (tb[18] = b))
      : (b = tb[18]);
    let ni = b;
    tb[19] !== tk
      ? ((v = (e) => {
          (e3(tX, e), e3(tk, e));
        }),
        (tb[19] = tk),
        (tb[20] = v))
      : (v = tb[20]);
    let ns = tj.id,
      na = tj.size ?? 1,
      nc = `spane-${tj.id}`;
    tb[21] !== na || tb[22] !== nc
      ? ((j = { flexGrow: na, viewTransitionName: nc }),
        (tb[21] = na),
        (tb[22] = nc),
        (tb[23] = j))
      : (j = tb[23]);
    let nd = j,
      no = tw > 0 && en.Y,
      nm = tI && "opacity-40";
    (tb[24] !== no || tb[25] !== nm
      ? ((w = (0, S.c)("relative flex min-h-0 basis-0 flex-col", no, nm)),
        (tb[24] = no),
        (tb[25] = nm),
        (tb[26] = w))
      : (w = tb[26]),
      tb[27] !== tI
        ? ((y = tI
            ? (0, t.jsx)("div", {
                "aria-hidden": !0,
                "data-testid": "screeners-pane-drag-origin",
                className: en.U,
              })
            : null),
          (tb[27] = tI),
          (tb[28] = y))
        : (y = tb[28]),
      tb[29] !== tj || tb[30] !== tM.accents
        ? ((_ =
            tM.accents && (0, eE.B)(tj)
              ? (0, t.jsx)("span", {
                  "aria-hidden": !0,
                  "data-testid": "screeners-pane-accent-bar",
                  className: (0, S.c)(
                    "pointer-events-none absolute inset-x-0 top-0 z-10 h-0.5",
                    (0, eE.B)(tj),
                  ),
                })
              : null),
          (tb[29] = tj),
          (tb[30] = tM.accents),
          (tb[31] = _))
        : (_ = tb[31]),
      tb[32] !== tU || tb[33] !== tw || tb[34] !== tK
        ? ((k =
            tw > 0
              ? (0, t.jsx)("div", {
                  role: "separator",
                  "aria-orientation": "horizontal",
                  "aria-label": tK("web.screeners.resize_panes"),
                  "data-testid": "screeners-pane-resize",
                  onPointerDown: tU,
                  className: (0, S.c)(
                    "absolute -top-1 inset-x-2 z-20 h-2 cursor-row-resize",
                    en.V,
                  ),
                })
              : null),
          (tb[32] = tU),
          (tb[33] = tw),
          (tb[34] = tK),
          (tb[35] = k))
        : (k = tb[35]));
    let nu = eZ.F[tT],
      nh = eG.U[tT],
      nx = tS && "cursor-grab touch-none active:cursor-grabbing";
    tb[36] !== nu || tb[37] !== nh || tb[38] !== nx
      ? ((C = (0, S.c)(eZ.t, nu, nh, en.n, en.s, nx)),
        (tb[36] = nu),
        (tb[37] = nh),
        (tb[38] = nx),
        (tb[39] = C))
      : (C = tb[39]);
    let nf = eZ.P[tT],
      np = tS && en.u[tT];
    (tb[40] !== nf || tb[41] !== np
      ? ((I = (0, S.c)(nf, en.A, np)),
        (tb[40] = nf),
        (tb[41] = np),
        (tb[42] = I))
      : (I = tb[42]),
      tb[43] !== tS
        ? ((z = tS
            ? (0, t.jsx)("span", {
                "aria-hidden": !0,
                "data-testid": "screeners-column-grip",
                className: en.q,
                children: (0, t.jsx)(d.qm, {}),
              })
            : null),
          (tb[43] = tS),
          (tb[44] = z))
        : (z = tb[44]),
      tb[45] !== tj || tb[46] !== tM.accents
        ? ((D =
            tM.accents && tj.accent ? (0, eE.y)(tj) : "text-text-quaternary"),
          (tb[45] = tj),
          (tb[46] = tM.accents),
          (tb[47] = D))
        : (D = tb[47]),
      tb[48] !== tv.id || tb[49] !== tj || tb[50] !== tD
        ? ((R = (e) => tD(tv.id, tj, e)),
          (tb[48] = tv.id),
          (tb[49] = tj),
          (tb[50] = tD),
          (tb[51] = R))
        : (R = tb[51]));
    let ng = tS ? en.G : void 0;
    (tb[52] !== ni ||
    tb[53] !== tj ||
    tb[54] !== D ||
    tb[55] !== R ||
    tb[56] !== ng
      ? ((E = (0, t.jsx)(eF.f, {
          pane: tj,
          iconClassName: D,
          onPick: ni,
          onTogglePin: R,
          adaptive: !0,
          triggerClassName: ng,
        })),
        (tb[52] = ni),
        (tb[53] = tj),
        (tb[54] = D),
        (tb[55] = R),
        (tb[56] = ng),
        (tb[57] = E))
      : (E = tb[57]),
      tb[58] !== ni || tb[59] !== tj
        ? ((P = (0, t.jsx)(eB.f, { pane: tj, onPick: ni })),
          (tb[58] = ni),
          (tb[59] = tj),
          (tb[60] = P))
        : (P = tb[60]),
      tb[61] !== I || tb[62] !== z || tb[63] !== E || tb[64] !== P
        ? ((L = (0, t.jsxs)("span", { className: I, children: [z, E, P] })),
          (tb[61] = I),
          (tb[62] = z),
          (tb[63] = E),
          (tb[64] = P),
          (tb[65] = L))
        : (L = tb[65]),
      tb[66] === Symbol.for("react.memo_cache_sentinel")
        ? ((q = (0, S.c)(en.W, en.T)), (tb[66] = q))
        : (q = tb[66]),
      tb[67] !== tT || tb[68] !== ne || tb[69] !== t9
        ? ((B =
            t9 && ne
              ? (0, t.jsx)(ev.B, { density: tT, className: "min-w-0 shrink" })
              : null),
          (tb[67] = tT),
          (tb[68] = ne),
          (tb[69] = t9),
          (tb[70] = B))
        : (B = tb[70]),
      tb[71] !== nt || tb[72] !== B
        ? ((F = (0, t.jsx)("span", {
            ref: nt,
            "data-testid": "screeners-pane-paused-slot",
            className: q,
            children: B,
          })),
          (tb[71] = nt),
          (tb[72] = B),
          (tb[73] = F))
        : (F = tb[73]),
      tb[74] !== tZ
        ? ((W = tZ
            ? (0, t.jsx)("span", {
                "data-testid": "screeners-column-param",
                className: (0, S.c)(eZ.o, en.D),
                children: tZ,
              })
            : null),
          (tb[74] = tZ),
          (tb[75] = W))
        : (W = tb[75]));
    let nb = en.M[tT];
    (tb[76] !== tj.view || tb[77] !== tK
      ? ((A =
          "movers" === tj.view
            ? (0, t.jsx)(eP.f, {
                label: tK("web.screeners.legend"),
                testId: "screeners-pane-legend",
                onClick: () => t8(!0),
                children: (0, t.jsx)(d.wB, { "aria-hidden": !0 }),
              })
            : null),
        (tb[76] = tj.view),
        (tb[77] = tK),
        (tb[78] = A))
      : (A = tb[78]),
      tb[79] !== nl || tb[80] !== tK || tb[81] !== nr
        ? ((V = nl
            ? (0, t.jsx)(eP.f, {
                label: tK("web.screeners.search_traders"),
                testId: "screeners-pane-search-toggle",
                pressed: nr.open,
                onClick: () => nr.setOpen(!nr.open),
                children: (0, t.jsx)(d.L3, { "aria-hidden": !0 }),
              })
            : null),
          (tb[79] = nl),
          (tb[80] = tK),
          (tb[81] = nr),
          (tb[82] = V))
        : (V = tb[82]));
    let nv = tj.view;
    tb[83] !== tj
      ? ((O = (0, N.G)(tj)), (tb[83] = tj), (tb[84] = O))
      : (O = tb[84]);
    let nj = O.board;
    tb[85] !== tj
      ? (($ = (0, N.G)(tj)), (tb[85] = tj), (tb[86] = $))
      : ($ = tb[86]);
    let nw = nl ? nr.accounts : void 0;
    (tb[87] !== tv.id || tb[88] !== tj || tb[89] !== tR
      ? ((X = (e) => tR(tv.id, tj, e)),
        (tb[87] = tv.id),
        (tb[88] = tj),
        (tb[89] = tR),
        (tb[90] = X))
      : (X = tb[90]),
      tb[91] !== tj.view ||
      tb[92] !== O.board ||
      tb[93] !== $.filters ||
      tb[94] !== nw ||
      tb[95] !== X
        ? ((K = (0, t.jsx)(eq.f, {
            view: nv,
            board: nj,
            filters: $.filters,
            accounts: nw,
            onApply: X,
          })),
          (tb[91] = tj.view),
          (tb[92] = O.board),
          (tb[93] = $.filters),
          (tb[94] = nw),
          (tb[95] = X),
          (tb[96] = K))
        : (K = tb[96]),
      tb[97] !== tv.id ||
      tb[98] !== tv.panes.length ||
      tb[99] !== tj ||
      tb[100] !== tW ||
      tb[101] !== tK
        ? ((U =
            tv.panes.length < N.p
              ? (0, t.jsx)(eP.f, {
                  label: tK("web.coin.alerts_split_down"),
                  testId: "screeners-pane-split-down",
                  onClick: () => tW(tv.id, tj),
                  children: (0, t.jsx)(d.wH, { "aria-hidden": !0 }),
                })
              : null),
          (tb[97] = tv.id),
          (tb[98] = tv.panes.length),
          (tb[99] = tj),
          (tb[100] = tW),
          (tb[101] = tK),
          (tb[102] = U))
        : (U = tb[102]),
      tb[103] !== tv ||
      tb[104] !== t$ ||
      tb[105] !== tj ||
      tb[106] !== tA ||
      tb[107] !== tK
        ? ((Y =
            t$ + +!!tv.auto < p.b
              ? (0, t.jsx)(eP.f, {
                  label: tK("web.coin.alerts_split_right"),
                  testId: "screeners-pane-split-right",
                  onClick: () => tA(tv, tj),
                  children: (0, t.jsx)(d.S4, { "aria-hidden": !0 }),
                })
              : null),
          (tb[103] = tv),
          (tb[104] = t$),
          (tb[105] = tj),
          (tb[106] = tA),
          (tb[107] = tK),
          (tb[108] = Y))
        : (Y = tb[108]),
      tb[109] !== tK
        ? ((G = tK("common.close")), (tb[109] = tK), (tb[110] = G))
        : (G = tb[110]));
    let ny = en.t[tT];
    (tb[111] !== tK
      ? ((Z = tK("common.close")), (tb[111] = tK), (tb[112] = Z))
      : (Z = tb[112]),
      tb[113] !== tj
        ? ((J = (0, N.j)(tj)), (tb[113] = tj), (tb[114] = J))
        : (J = tb[114]));
    let n_ = `${Z} ${J}`;
    (tb[115] !== tv.id || tb[116] !== tj || tb[117] !== tO
      ? ((H = () => tO(tv.id, tj)),
        (tb[115] = tv.id),
        (tb[116] = tj),
        (tb[117] = tO),
        (tb[118] = H))
      : (H = tb[118]),
      tb[119] === Symbol.for("react.memo_cache_sentinel")
        ? ((Q = (0, t.jsx)(d.cm, { "aria-hidden": !0 })), (tb[119] = Q))
        : (Q = tb[119]),
      tb[120] !== tT || tb[121] !== ny || tb[122] !== n_ || tb[123] !== H
        ? ((ee = (0, t.jsx)(x._, {
            density: tT,
            size: ny,
            "aria-label": n_,
            "data-testid": "screeners-pane-close-button",
            onClick: H,
            children: Q,
          })),
          (tb[120] = tT),
          (tb[121] = ny),
          (tb[122] = n_),
          (tb[123] = H),
          (tb[124] = ee))
        : (ee = tb[124]),
      tb[125] !== tT || tb[126] !== G || tb[127] !== ee
        ? ((et = (0, t.jsx)(f.f, { content: G, density: tT, children: ee })),
          (tb[125] = tT),
          (tb[126] = G),
          (tb[127] = ee),
          (tb[128] = et))
        : (et = tb[128]),
      tb[129] !== tG.label || tb[130] !== tK
        ? ((er = tK("web.screeners.pane_options_a11y", { title: tG.label })),
          (tb[129] = tG.label),
          (tb[130] = tK),
          (tb[131] = er))
        : (er = tb[131]));
    let nk = en.t[tT];
    (tb[132] !== tG.label || tb[133] !== tK
      ? ((el = tK("web.screeners.pane_options_a11y", { title: tG.label })),
        (tb[132] = tG.label),
        (tb[133] = tK),
        (tb[134] = el))
      : (el = tb[134]),
      tb[135] === Symbol.for("react.memo_cache_sentinel")
        ? ((ei = (0, t.jsx)(d.Hs, { "aria-hidden": !0 })), (tb[135] = ei))
        : (ei = tb[135]),
      tb[136] !== tT || tb[137] !== nk || tb[138] !== el
        ? ((es = (0, t.jsx)(x._, {
            density: tT,
            size: nk,
            "aria-label": el,
            className:
              "data-[popup-open]:bg-bg-tertiary data-[popup-open]:text-text-primary",
            children: ei,
          })),
          (tb[136] = tT),
          (tb[137] = nk),
          (tb[138] = el),
          (tb[139] = es))
        : (es = tb[139]),
      tb[140] !== er || tb[141] !== es
        ? ((ea = (0, t.jsx)(eO.g, { "aria-label": er, render: es })),
          (tb[140] = er),
          (tb[141] = es),
          (tb[142] = ea))
        : (ea = tb[142]));
    let nN = "terminal" === tT;
    (tb[143] !== tG.param || tb[144] !== tj.view || tb[145] !== tK
      ? ((ec = tG.param
          ? (0, t.jsx)(eO.d, {
              "data-testid": "screeners-pane-repick",
              onClick: () => t2(tj.view),
              children:
                "coin" === tG.param.kind
                  ? tK("web.screeners.change_coin")
                  : tK("web.screeners.change_user"),
            })
          : null),
        (tb[143] = tG.param),
        (tb[144] = tj.view),
        (tb[145] = tK),
        (tb[146] = ec))
      : (ec = tb[146]),
      tb[147] !== tG.label || tb[148] !== tj.title
        ? ((ed = () => t4(tj.title ?? tG.label)),
          (tb[147] = tG.label),
          (tb[148] = tj.title),
          (tb[149] = ed))
        : (ed = tb[149]),
      tb[150] !== t1
        ? ((eo = (0, t.jsx)(d.I4, { className: t1 })),
          (tb[150] = t1),
          (tb[151] = eo))
        : (eo = tb[151]),
      tb[152] !== tK
        ? ((em = tK("web.screeners.rename_view")),
          (tb[152] = tK),
          (tb[153] = em))
        : (em = tb[153]),
      tb[154] !== ed || tb[155] !== eo || tb[156] !== em
        ? ((eu = (0, t.jsxs)(eO.d, {
            "data-testid": "screeners-pane-rename",
            onClick: ed,
            children: [eo, em],
          })),
          (tb[154] = ed),
          (tb[155] = eo),
          (tb[156] = em),
          (tb[157] = eu))
        : (eu = tb[157]));
    let nS = !tQ;
    (tb[158] !== tv.id || tb[159] !== tj || tb[160] !== tD
      ? ((eh = () => tD(tv.id, tj, tj.view)),
        (tb[158] = tv.id),
        (tb[159] = tj),
        (tb[160] = tD),
        (tb[161] = eh))
      : (eh = tb[161]),
      tb[162] !== tH || tb[163] !== t1
        ? ((ex = tH
            ? (0, t.jsx)(eb.Pj, { className: (0, S.c)(t1, "text-text-accent") })
            : (0, t.jsx)(d.Pj, { className: t1 })),
          (tb[162] = tH),
          (tb[163] = t1),
          (tb[164] = ex))
        : (ex = tb[164]),
      tb[165] !== tQ || tb[166] !== tH || tb[167] !== tK
        ? ((ef = tH
            ? tK("web.screeners.unpin_view")
            : tQ
              ? tK("web.screeners.pin_view")
              : tK("web.screeners.pins_full", { max: e1.R })),
          (tb[165] = tQ),
          (tb[166] = tH),
          (tb[167] = tK),
          (tb[168] = ef))
        : (ef = tb[168]),
      tb[169] !== nS || tb[170] !== eh || tb[171] !== ex || tb[172] !== ef
        ? ((ep = (0, t.jsxs)(eO.d, {
            "data-testid": "screeners-pane-pin-current",
            disabled: nS,
            onClick: eh,
            children: [ex, ef],
          })),
          (tb[169] = nS),
          (tb[170] = eh),
          (tb[171] = ex),
          (tb[172] = ef),
          (tb[173] = ep))
        : (ep = tb[173]),
      tb[174] !== tK
        ? ((eg = tK("web.screeners.accent_color")),
          (tb[174] = tK),
          (tb[175] = eg))
        : (eg = tb[175]),
      tb[176] !== eg
        ? ((ej = (0, t.jsx)(eO.U, { children: eg })),
          (tb[176] = eg),
          (tb[177] = ej))
        : (ej = tb[177]),
      tb[178] !== tK
        ? ((ew = tK("web.screeners.accent_color")),
          (tb[178] = tK),
          (tb[179] = ew))
        : (ew = tb[179]),
      tb[180] !== tK
        ? ((ey = tK("web.screeners.accent_swatch_a11y", {
            color: tK("web.screeners.accent_auto"),
          })),
          (tb[180] = tK),
          (tb[181] = ey))
        : (ey = tb[181]));
    let nC = void 0 === tj.accent;
    tb[182] !== tv.id || tb[183] !== tj || tb[184] !== tq
      ? ((e_ = () => tq(tv.id, tj, void 0)),
        (tb[182] = tv.id),
        (tb[183] = tj),
        (tb[184] = tq),
        (tb[185] = e_))
      : (e_ = tb[185]);
    let nI =
      void 0 === tj.accent
        ? "border-text-primary"
        : "border-border-tertiary hover:border-text-quaternary";
    (tb[186] !== nI
      ? ((ek = (0, S.c)(e2, nI)), (tb[186] = nI), (tb[187] = ek))
      : (ek = tb[187]),
      tb[188] === Symbol.for("react.memo_cache_sentinel")
        ? ((eN = (0, t.jsx)("span", {
            "aria-hidden": !0,
            className: "size-2.5 rounded-full bg-bg-quaternary",
          })),
          (tb[188] = eN))
        : (eN = tb[188]),
      tb[189] !== ey || tb[190] !== nC || tb[191] !== e_ || tb[192] !== ek
        ? ((eS = (0, t.jsx)("button", {
            type: "button",
            "aria-label": ey,
            "aria-pressed": nC,
            "data-testid": "screeners-pane-accent-auto",
            onClick: e_,
            className: ek,
            children: eN,
          })),
          (tb[189] = ey),
          (tb[190] = nC),
          (tb[191] = e_),
          (tb[192] = ek),
          (tb[193] = eS))
        : (eS = tb[193]),
      tb[194] !== tv.id || tb[195] !== tj || tb[196] !== tq || tb[197] !== tK
        ? ((eC = N.d.map((e) =>
            (0, t.jsx)(
              "button",
              {
                type: "button",
                "aria-label": tK("web.screeners.accent_swatch_a11y", {
                  color: tK(e0[e]),
                }),
                "aria-pressed": tj.accent === e,
                "data-testid": `screeners-pane-accent-${e}`,
                onClick: () => tq(tv.id, tj, e),
                className: (0, S.c)(
                  e2,
                  tj.accent === e
                    ? "border-text-primary"
                    : "border-transparent hover:border-border-tertiary",
                ),
                children: (0, t.jsx)("span", {
                  "aria-hidden": !0,
                  className: (0, S.c)("size-2.5 rounded-full", eE.m[e]),
                }),
              },
              e,
            ),
          )),
          (tb[194] = tv.id),
          (tb[195] = tj),
          (tb[196] = tq),
          (tb[197] = tK),
          (tb[198] = eC))
        : (eC = tb[198]),
      tb[199] !== ew || tb[200] !== eS || tb[201] !== eC
        ? ((eI = (0, t.jsxs)("div", {
            role: "group",
            "aria-label": ew,
            className: "flex items-center gap-1.5 px-3 pb-1.5 pt-0.5",
            children: [eS, eC],
          })),
          (tb[199] = ew),
          (tb[200] = eS),
          (tb[201] = eC),
          (tb[202] = eI))
        : (eI = tb[202]),
      tb[203] !== ej || tb[204] !== eI
        ? ((ez = (0, t.jsxs)(eO.F, { children: [ej, eI] })),
          (tb[203] = ej),
          (tb[204] = eI),
          (tb[205] = ez))
        : (ez = tb[205]),
      tb[206] !== tv.id ||
      tb[207] !== tj ||
      tb[208] !== tL ||
      tb[209] !== tJ ||
      tb[210] !== tK
        ? ((eD = tJ
            ? (0, t.jsxs)(eO.F, {
                children: [
                  (0, t.jsx)(eO.U, {
                    children: tK("web.screeners.alert_sound"),
                  }),
                  (0, t.jsx)(eO.d, {
                    closeOnClick: !1,
                    active: void 0 === tj.sound,
                    onClick: () => tL(tv.id, tj, void 0),
                    children: (0, t.jsx)("span", {
                      className: "min-w-0 flex-1",
                      children: tK("web.screeners.sound_none"),
                    }),
                  }),
                  eQ.Y.map((e) =>
                    (0, t.jsx)(
                      eO.d,
                      {
                        closeOnClick: !1,
                        active: tj.sound === e,
                        onClick: () => {
                          (tL(tv.id, tj, e), (0, eJ.p)(e));
                        },
                        children: (0, t.jsx)("span", {
                          className: "min-w-0 flex-1",
                          children: eQ.S[e],
                        }),
                      },
                      e,
                    ),
                  ),
                ],
              })
            : null),
          (tb[206] = tv.id),
          (tb[207] = tj),
          (tb[208] = tL),
          (tb[209] = tJ),
          (tb[210] = tK),
          (tb[211] = eD))
        : (eD = tb[211]),
      tb[212] === Symbol.for("react.memo_cache_sentinel")
        ? ((eA = (0, t.jsx)(eO.Z, {})), (tb[212] = eA))
        : (eA = tb[212]),
      tb[213] !== tv.id ||
      tb[214] !== t1 ||
      tb[215] !== tV ||
      tb[216] !== tj.id ||
      tb[217] !== ty ||
      tb[218] !== tw ||
      tb[219] !== tK
        ? ((eV =
            ty > 1
              ? (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsxs)(eO.d, {
                      disabled: 0 === tw,
                      "data-testid": "screeners-pane-move-up",
                      onClick: () => tV(tv.id, tj.id, tv.id, tw - 1),
                      children: [
                        (0, t.jsx)(d.DD, { className: t1 }),
                        tK("web.screeners.move_up"),
                      ],
                    }),
                    (0, t.jsxs)(eO.d, {
                      disabled: tw === ty - 1,
                      "data-testid": "screeners-pane-move-down",
                      onClick: () => tV(tv.id, tj.id, tv.id, tw + 1),
                      children: [
                        (0, t.jsx)(d.kg, { className: t1 }),
                        tK("web.screeners.move_down"),
                      ],
                    }),
                  ],
                })
              : null),
          (tb[213] = tv.id),
          (tb[214] = t1),
          (tb[215] = tV),
          (tb[216] = tj.id),
          (tb[217] = ty),
          (tb[218] = tw),
          (tb[219] = tK),
          (tb[220] = eV))
        : (eV = tb[220]));
    let nz = ty >= N.p;
    (tb[221] !== tv.id || tb[222] !== tj || tb[223] !== tW
      ? ((e$ = () => tW(tv.id, tj)),
        (tb[221] = tv.id),
        (tb[222] = tj),
        (tb[223] = tW),
        (tb[224] = e$))
      : (e$ = tb[224]),
      tb[225] !== t1
        ? ((eT = (0, t.jsx)(d.LK, { className: t1 })),
          (tb[225] = t1),
          (tb[226] = eT))
        : (eT = tb[226]));
    let nD = ty >= N.p ? `Split vertically (max ${N.p})` : "Split vertically";
    (tb[227] !== nz || tb[228] !== e$ || tb[229] !== eT || tb[230] !== nD
      ? ((eX = (0, t.jsxs)(eO.d, {
          disabled: nz,
          "data-testid": "screeners-pane-split",
          onClick: e$,
          children: [eT, nD],
        })),
        (tb[227] = nz),
        (tb[228] = e$),
        (tb[229] = eT),
        (tb[230] = nD),
        (tb[231] = eX))
      : (eX = tb[231]),
      tb[232] !== tv.id || tb[233] !== tj || tb[234] !== tO
        ? ((eK = () => tO(tv.id, tj)),
          (tb[232] = tv.id),
          (tb[233] = tj),
          (tb[234] = tO),
          (tb[235] = eK))
        : (eK = tb[235]),
      tb[236] !== t1
        ? ((eU = (0, t.jsx)(d.bO, { className: t1 })),
          (tb[236] = t1),
          (tb[237] = eU))
        : (eU = tb[237]));
    let nR = 1 === ty ? "Remove column" : "Close pane";
    (tb[238] !== nR || tb[239] !== eK || tb[240] !== eU
      ? ((e4 = (0, t.jsxs)(eO.d, {
          variant: "destructive",
          "data-testid": "screeners-pane-close",
          onClick: eK,
          children: [eU, nR],
        })),
        (tb[238] = nR),
        (tb[239] = eK),
        (tb[240] = eU),
        (tb[241] = e4))
      : (e4 = tb[241]),
      tb[242] === Symbol.for("react.memo_cache_sentinel")
        ? ((e7 = (0, t.jsx)(eO.Z, {})), (tb[242] = e7))
        : (e7 = tb[242]),
      tb[243] === Symbol.for("react.memo_cache_sentinel")
        ? ((e8 = () => t6(!0)), (tb[243] = e8))
        : (e8 = tb[243]),
      tb[244] !== t1
        ? ((e9 = (0, t.jsx)(d.cL, { className: t1 })),
          (tb[244] = t1),
          (tb[245] = e9))
        : (e9 = tb[245]),
      tb[246] !== tK
        ? ((te = tK("web.screeners.board_settings")),
          (tb[246] = tK),
          (tb[247] = te))
        : (te = tb[247]),
      tb[248] !== e9 || tb[249] !== te
        ? ((tt = (0, t.jsxs)(eO.d, {
            "data-testid": "screeners-pane-board-settings",
            onClick: e8,
            children: [e9, te],
          })),
          (tb[248] = e9),
          (tb[249] = te),
          (tb[250] = tt))
        : (tt = tb[250]),
      tb[251] !== t_ ||
      tb[252] !== e4 ||
      tb[253] !== tt ||
      tb[254] !== nN ||
      tb[255] !== ec ||
      tb[256] !== eu ||
      tb[257] !== ep ||
      tb[258] !== ez ||
      tb[259] !== eD ||
      tb[260] !== eV ||
      tb[261] !== eX
        ? ((tn = (0, t.jsxs)(eO.A, {
            align: "end",
            dense: nN,
            className: "min-w-48",
            children: [t_, ec, eu, ep, ez, eD, eA, eV, eX, e4, e7, tt],
          })),
          (tb[251] = t_),
          (tb[252] = e4),
          (tb[253] = tt),
          (tb[254] = nN),
          (tb[255] = ec),
          (tb[256] = eu),
          (tb[257] = ep),
          (tb[258] = ez),
          (tb[259] = eD),
          (tb[260] = eV),
          (tb[261] = eX),
          (tb[262] = tn))
        : (tn = tb[262]),
      tb[263] !== tn || tb[264] !== ea
        ? ((tr = (0, t.jsxs)(eO.k, { modal: !1, children: [ea, tn] })),
          (tb[263] = tn),
          (tb[264] = ea),
          (tb[265] = tr))
        : (tr = tb[265]),
      tb[266] !== tr ||
      tb[267] !== nb ||
      tb[268] !== A ||
      tb[269] !== V ||
      tb[270] !== K ||
      tb[271] !== U ||
      tb[272] !== Y ||
      tb[273] !== et
        ? ((tl = (0, t.jsxs)("div", {
            className: nb,
            children: [A, V, K, U, Y, et, tr],
          })),
          (tb[266] = tr),
          (tb[267] = nb),
          (tb[268] = A),
          (tb[269] = V),
          (tb[270] = K),
          (tb[271] = U),
          (tb[272] = Y),
          (tb[273] = et),
          (tb[274] = tl))
        : (tl = tb[274]),
      tb[275] !== tT ||
      tb[276] !== tS ||
      tb[277] !== tl ||
      tb[278] !== tN ||
      tb[279] !== C ||
      tb[280] !== L ||
      tb[281] !== F ||
      tb[282] !== W
        ? ((ti = (0, t.jsxs)("header", {
            ref: tN,
            ...tS,
            "data-testid": "screeners-pane-header",
            "data-title-band": !0,
            "data-density": tT,
            className: C,
            children: [L, F, W, tl],
          })),
          (tb[275] = tT),
          (tb[276] = tS),
          (tb[277] = tl),
          (tb[278] = tN),
          (tb[279] = C),
          (tb[280] = L),
          (tb[281] = F),
          (tb[282] = W),
          (tb[283] = ti))
        : (ti = tb[283]));
    let nE = en.w[tT];
    return (
      tb[284] !== nE
        ? ((ts = (0, S.c)("flex min-h-0 flex-1 flex-col", nE)),
          (tb[284] = nE),
          (tb[285] = ts))
        : (ts = tb[285]),
      tb[286] !== tv.id || tb[287] !== tj || tb[288] !== tE
        ? ((ta = (e) => tE(tv.id, tj, e)),
          (tb[286] = tv.id),
          (tb[287] = tj),
          (tb[288] = tE),
          (tb[289] = ta))
        : (ta = tb[289]),
      tb[290] !== tv.id || tb[291] !== tj || tb[292] !== tP
        ? ((tc = (e) => tP(tv.id, tj, e)),
          (tb[290] = tv.id),
          (tb[291] = tj),
          (tb[292] = tP),
          (tb[293] = tc))
        : (tc = tb[293]),
      tb[294] !== tY || tb[295] !== ta || tb[296] !== tc
        ? ((td = (0, t.jsx)(eL.f, {
            column: tY,
            onSetBoard: ta,
            onSetTrending: tc,
          })),
          (tb[294] = tY),
          (tb[295] = ta),
          (tb[296] = tc),
          (tb[297] = td))
        : (td = tb[297]),
      tb[298] !== td || tb[299] !== nr
        ? ((to = (0, t.jsx)(l.t, { value: nr, children: td })),
          (tb[298] = td),
          (tb[299] = nr),
          (tb[300] = to))
        : (to = tb[300]),
      tb[301] !== nn || tb[302] !== to
        ? ((tm = (0, t.jsx)(l.w, { value: nn, children: to })),
          (tb[301] = nn),
          (tb[302] = to),
          (tb[303] = tm))
        : (tm = tb[303]),
      tb[304] !== ts || tb[305] !== tm
        ? ((tu = (0, t.jsx)("div", { className: ts, children: tm })),
          (tb[304] = ts),
          (tb[305] = tm),
          (tb[306] = tu))
        : (tu = tb[306]),
      tb[307] !== tv.id ||
      tb[308] !== tG.label ||
      tb[309] !== tj ||
      tb[310] !== t3 ||
      tb[311] !== tB ||
      tb[312] !== tK
        ? ((th =
            null !== t3
              ? (0, t.jsx)(eM, {
                  title: tK("web.screeners.rename_view"),
                  cta: tK("common.save"),
                  value: t3,
                  onValueChange: t4,
                  onSubmit: () => {
                    (tB(tv.id, tj, t3 === tG.label ? void 0 : t3), t4(null));
                  },
                  onClose: () => t4(null),
                  maxLength: N.A,
                  placeholder: tG.label,
                  inputAriaLabel: tK("web.screeners.view_name"),
                  inputTestId: "screeners-pane-rename-input",
                  submitTestId: "screeners-pane-rename-save",
                })
              : null),
          (tb[307] = tv.id),
          (tb[308] = tG.label),
          (tb[309] = tj),
          (tb[310] = t3),
          (tb[311] = tB),
          (tb[312] = tK),
          (tb[313] = th))
        : (th = tb[313]),
      tb[314] !== t7
        ? ((tx = t7 ? (0, t.jsx)(eR, { onClose: () => t8(!1) }) : null),
          (tb[314] = t7),
          (tb[315] = tx))
        : (tx = tb[315]),
      tb[316] !== t5
        ? ((tf = t5
            ? (0, t.jsx)(eY, { open: !0, onClose: () => t6(!1) })
            : null),
          (tb[316] = t5),
          (tb[317] = tf))
        : (tf = tb[317]),
      tb[318] !== tv.id || tb[319] !== tj || tb[320] !== t0 || tb[321] !== tz
        ? ((tp = t0
            ? (0, t.jsx)(c.f, {
                type: t0,
                heading:
                  t0 === tj.view
                    ? `Change ${p.J[t0].label}`
                    : `Switch to ${p.J[t0].label}`,
                onPick: (e) => {
                  (tz(tv.id, tj, t0, e), t2(null));
                },
                onClose: () => t2(null),
              })
            : null),
          (tb[318] = tv.id),
          (tb[319] = tj),
          (tb[320] = t0),
          (tb[321] = tz),
          (tb[322] = tp))
        : (tp = tb[322]),
      tb[323] !== tj.id ||
      tb[324] !== ti ||
      tb[325] !== tu ||
      tb[326] !== th ||
      tb[327] !== tx ||
      tb[328] !== tf ||
      tb[329] !== tp ||
      tb[330] !== nd ||
      tb[331] !== w ||
      tb[332] !== y ||
      tb[333] !== _ ||
      tb[334] !== k ||
      tb[335] !== v
        ? ((tg = (0, t.jsxs)("div", {
            ref: v,
            "data-testid": "screeners-pane",
            "data-pane-id": ns,
            style: nd,
            className: w,
            children: [y, _, k, ti, tu, th, tx, tf, tp],
          })),
          (tb[323] = tj.id),
          (tb[324] = ti),
          (tb[325] = tu),
          (tb[326] = th),
          (tb[327] = tx),
          (tb[328] = tf),
          (tb[329] = tp),
          (tb[330] = nd),
          (tb[331] = w),
          (tb[332] = y),
          (tb[333] = _),
          (tb[334] = k),
          (tb[335] = v),
          (tb[336] = tg))
        : (tg = tb[336]),
      tg
    );
  }
  function e5(e) {
    return e.style;
  }
  function e6(e) {
    return (0, T.O)(e).filter(e7).length;
  }
  function e7(e) {
    return !e.auto;
  }
  function e8(e) {
    let l,
      i,
      s,
      c,
      d,
      o,
      m,
      h,
      x = (0, n.c)(28),
      {
        column: f,
        menuExtraItems: p,
        paneHost: g,
        headerDragRef: b,
        headerDragProps: v,
        isDragging: j,
      } = e,
      w = void 0 === g ? e4 : g,
      { t: y } = (0, r.f)(),
      _ = (0, T.V)(e9),
      { setColumnWidth: k } = (0, u.f)(),
      C = (0, a.useRef)(null);
    x[0] !== f || x[1] !== k
      ? ((l = (e) => {
          let t = C.current,
            n = t?.parentElement;
          if (!t || !n || 0 !== e.button) return;
          e.preventDefault();
          let r = e.clientX,
            l = (0, N.h)({
              basisPx: Number.parseFloat(
                n.style.flexBasis || getComputedStyle(n).flexBasis,
              ),
              renderedPx: t.getBoundingClientRect().width,
            }),
            i = l,
            s = () => {
              ((n.style.flexBasis = ""), k(f, i));
            };
          (0, M.L)(e.currentTarget, e.pointerId, {
            onMove: (e) => {
              ((i = (0, N.q)(l + e.clientX - r)),
                (n.style.flexBasis = `${i}px`));
            },
            onRelease: s,
            onCancel: s,
          });
        }),
        (x[0] = f),
        (x[1] = k),
        (x[2] = l))
      : (l = x[2]);
    let I = l;
    x[3] !== f || x[4] !== y
      ? ((i = y("web.screeners.column_a11y", { title: (0, N.S)(f) })),
        (x[3] = f),
        (x[4] = y),
        (x[5] = i))
      : (i = x[5]);
    let z = f.id,
      D = en.k[_.frame],
      R = void 0 !== j && j && en.O;
    return (
      x[6] !== D || x[7] !== R
        ? ((s = (0, S.c)(
            D,
            "group/scol relative flex h-full min-h-0 w-full min-w-0 flex-col",
            R,
          )),
          (x[6] = D),
          (x[7] = R),
          (x[8] = s))
        : (s = x[8]),
      x[9] !== w || x[10] !== f || x[11] !== v || x[12] !== b || x[13] !== p
        ? ((c = f.panes.map((e, n) =>
            (0, t.jsx)(
              w,
              {
                column: f,
                pane: e,
                paneIndex: n,
                paneCount: f.panes.length,
                menuExtraItems: 0 === n ? p : void 0,
                headerDragRef: 0 === n ? b : void 0,
                headerDragProps: 0 === n ? v : void 0,
              },
              e.id,
            ),
          )),
          (x[9] = w),
          (x[10] = f),
          (x[11] = v),
          (x[12] = b),
          (x[13] = p),
          (x[14] = c))
        : (c = x[14]),
      x[15] !== f || x[16] !== y
        ? ((d = y("web.screeners.resize_column_a11y", { title: (0, N.S)(f) })),
          (x[15] = f),
          (x[16] = y),
          (x[17] = d))
        : (d = x[17]),
      x[18] === Symbol.for("react.memo_cache_sentinel")
        ? ((o = (0, S.c)(
            "absolute -right-0.5 inset-y-2 z-20 w-1.5 cursor-col-resize max-sm:hidden",
            en.V,
          )),
          (x[18] = o))
        : (o = x[18]),
      x[19] !== I || x[20] !== d
        ? ((m = (0, t.jsx)("div", {
            role: "separator",
            "aria-orientation": "vertical",
            "aria-label": d,
            "data-testid": "screeners-column-resize",
            onPointerDown: I,
            className: o,
          })),
          (x[19] = I),
          (x[20] = d),
          (x[21] = m))
        : (m = x[21]),
      x[22] !== f.id || x[23] !== m || x[24] !== i || x[25] !== s || x[26] !== c
        ? ((h = (0, t.jsxs)("section", {
            ref: C,
            "aria-label": i,
            "data-testid": "screeners-column",
            "data-column-id": z,
            className: s,
            children: [c, m],
          })),
          (x[22] = f.id),
          (x[23] = m),
          (x[24] = i),
          (x[25] = s),
          (x[26] = c),
          (x[27] = h))
        : (h = x[27]),
      h
    );
  }
  function e9(e) {
    return e.style;
  }
  function te(e) {
    let i,
      s,
      a,
      c,
      o,
      m,
      h,
      x,
      f,
      p,
      g,
      b,
      v,
      j,
      y,
      _,
      k,
      C,
      I,
      z,
      D,
      R,
      E,
      P,
      q,
      B,
      F,
      W,
      V,
      O,
      $,
      M,
      X,
      K,
      Y,
      G,
      Z,
      J = (0, n.c)(132),
      { column: H, index: Q, columns: ee, capWidth: et } = e,
      { setColumnOrder: er, dockColumnToSide: el } = (0, u.f)(),
      { t: ei } = (0, r.f)(),
      es = "chip" === U().model,
      ea = (0, l.x)(),
      ec = (0, T.V)(tt),
      ed = H.panes[0]?.view;
    J[0] !== ed
      ? ((i = (e) => !!ed && (0, T.f)(e, "left", ed)), (J[0] = ed), (J[1] = i))
      : (i = J[1]);
    let eo = (0, T.V)(i);
    J[2] !== ed
      ? ((s = (e) => !!ed && (0, T.f)(e, "right", ed)), (J[2] = ed), (J[3] = s))
      : (s = J[3]);
    let em = (0, T.V)(s);
    J[4] !== H.id ? ((a = L(H.id)), (J[4] = H.id), (J[5] = a)) : (a = J[5]);
    let eu = es ? tn : void 0,
      eh = es ? null : void 0;
    J[6] !== a || J[7] !== eu || J[8] !== eh
      ? ((c = { id: a, animateLayoutChanges: eu, transition: eh }),
        (J[6] = a),
        (J[7] = eu),
        (J[8] = eh),
        (J[9] = c))
      : (c = J[9]);
    let {
      attributes: ex,
      listeners: ef,
      setNodeRef: eg,
      setActivatorNodeRef: eb,
      transform: ev,
      transition: ej,
      isDragging: ew,
    } = (0, ep.s)(c);
    J[10] !== H || J[11] !== ee || J[12] !== Q || J[13] !== er
      ? ((o = (e) => {
          er(A(ee, Q, Q + e), H);
        }),
        (J[10] = H),
        (J[11] = ee),
        (J[12] = Q),
        (J[13] = er),
        (J[14] = o))
      : (o = J[14]);
    let ey = o;
    J[15] !== eo ||
    J[16] !== em ||
    J[17] !== es ||
    J[18] !== H ||
    J[19] !== ee.length ||
    J[20] !== el ||
    J[21] !== Q ||
    J[22] !== ey
      ? ((m = (e) => {
          if (
            !es ||
            !e.altKey ||
            e.ctrlKey ||
            e.metaKey ||
            e.target !== e.currentTarget
          )
            return;
          let t = "ArrowLeft" === e.code ? -1 : +("ArrowRight" === e.code);
          if (!t) return;
          if ((e.preventDefault(), e.stopPropagation(), e.shiftKey)) {
            let e = t < 0 ? "left" : "right";
            ("left" === e ? eo : em) && el(H, e);
            return;
          }
          let n = Q + t;
          n < 0 || n >= ee.length || ey(t);
        }),
        (J[15] = eo),
        (J[16] = em),
        (J[17] = es),
        (J[18] = H),
        (J[19] = ee.length),
        (J[20] = el),
        (J[21] = Q),
        (J[22] = ey),
        (J[23] = m))
      : (m = J[23]);
    let e_ = m,
      ek = en.v[ea],
      eN = ew && !es,
      eS = `scol-${H.id}`,
      eC = `${H.width ?? ec}px`,
      eI = void 0 !== et && et ? `${N.W}px` : void 0;
    J[24] !== es || J[25] !== ev
      ? ((h = es
          ? void 0
          : w.r.Transform.toString(
              ev ? { ...ev, scaleX: 1, scaleY: 1 } : null,
            )),
        (J[24] = es),
        (J[25] = ev),
        (J[26] = h))
      : (h = J[26]);
    let ez = es ? void 0 : ej;
    J[27] !== eC || J[28] !== eI || J[29] !== h || J[30] !== ez || J[31] !== eS
      ? ((x = {
          viewTransitionName: eS,
          flexBasis: eC,
          maxWidth: eI,
          transform: h,
          transition: ez,
        }),
        (J[27] = eC),
        (J[28] = eI),
        (J[29] = h),
        (J[30] = ez),
        (J[31] = eS),
        (J[32] = x))
      : (x = J[32]);
    let eD = !eN && en.B,
      eR = eN && "z-50",
      eE = es && "transition-opacity duration-150",
      eP = ew && es && "opacity-40";
    (J[33] !== eD || J[34] !== eR || J[35] !== eE || J[36] !== eP
      ? ((f = (0, S.c)(
          "relative flex h-full min-h-0 min-w-[240px] grow shrink",
          eD,
          eR,
          eE,
          eP,
        )),
        (J[33] = eD),
        (J[34] = eR),
        (J[35] = eE),
        (J[36] = eP),
        (J[37] = f))
      : (f = J[37]),
      J[38] !== es || J[39] !== ew
        ? ((p =
            ew && es
              ? (0, t.jsx)("div", {
                  "aria-hidden": !0,
                  "data-testid": "screeners-column-drag-origin",
                  className: en.U,
                })
              : null),
          (J[38] = es),
          (J[39] = ew),
          (J[40] = p))
        : (p = J[40]),
      J[41] !== H
        ? ((g = (0, N.S)(H)), (J[41] = H), (J[42] = g))
        : (g = J[42]));
    let eL = `Move ${g} — drag to reorder, or to a screen edge to open it as a side panel`;
    (J[43] !== ef?.onPointerDown
      ? ((b = (e) => {
          e.target.closest("button,a,input,[role='menuitem']") ||
            ef?.onPointerDown?.(e);
        }),
        (J[43] = ef?.onPointerDown),
        (J[44] = b))
      : (b = J[44]),
      J[45] !== ex ||
      J[46] !== e_ ||
      J[47] !== ef ||
      J[48] !== eL ||
      J[49] !== b
        ? ((v = {
            ...ex,
            ...ef,
            role: "button",
            "aria-label": eL,
            onKeyDown: e_,
            onPointerDown: b,
          }),
          (J[45] = ex),
          (J[46] = e_),
          (J[47] = ef),
          (J[48] = eL),
          (J[49] = b),
          (J[50] = v))
        : (v = J[50]));
    let eq = 0 === Q;
    (J[51] !== ey
      ? ((j = () => ey(-1)), (J[51] = ey), (J[52] = j))
      : (j = J[52]),
      J[53] !== ek
        ? ((y = (0, t.jsx)(d.S, { className: ek })), (J[53] = ek), (J[54] = y))
        : (y = J[54]),
      J[55] !== ei
        ? ((_ = ei("web.screeners.move_left")), (J[55] = ei), (J[56] = _))
        : (_ = J[56]),
      J[57] !== es || J[58] !== ea
        ? ((k = es ? (0, t.jsx)(tr, { keys: "⌥←", density: ea }) : null),
          (J[57] = es),
          (J[58] = ea),
          (J[59] = k))
        : (k = J[59]),
      J[60] !== eq || J[61] !== j || J[62] !== y || J[63] !== _ || J[64] !== k
        ? ((C = (0, t.jsxs)(eO.d, {
            disabled: eq,
            onClick: j,
            children: [y, _, k],
          })),
          (J[60] = eq),
          (J[61] = j),
          (J[62] = y),
          (J[63] = _),
          (J[64] = k),
          (J[65] = C))
        : (C = J[65]));
    let eB = Q === ee.length - 1;
    (J[66] !== ey
      ? ((I = () => ey(1)), (J[66] = ey), (J[67] = I))
      : (I = J[67]),
      J[68] !== ek
        ? ((z = (0, t.jsx)(d.kK, { className: ek })), (J[68] = ek), (J[69] = z))
        : (z = J[69]),
      J[70] !== ei
        ? ((D = ei("web.screeners.move_right")), (J[70] = ei), (J[71] = D))
        : (D = J[71]),
      J[72] !== es || J[73] !== ea
        ? ((R = es ? (0, t.jsx)(tr, { keys: "⌥→", density: ea }) : null),
          (J[72] = es),
          (J[73] = ea),
          (J[74] = R))
        : (R = J[74]),
      J[75] !== eB || J[76] !== I || J[77] !== z || J[78] !== D || J[79] !== R
        ? ((E = (0, t.jsxs)(eO.d, {
            disabled: eB,
            onClick: I,
            children: [z, D, R],
          })),
          (J[75] = eB),
          (J[76] = I),
          (J[77] = z),
          (J[78] = D),
          (J[79] = R),
          (J[80] = E))
        : (E = J[80]));
    let eF = !eo;
    (J[81] !== H || J[82] !== el
      ? ((P = () => el(H, "left")), (J[81] = H), (J[82] = el), (J[83] = P))
      : (P = J[83]),
      J[84] !== ek
        ? ((q = (0, S.c)(ek, "scale-x-[-1]")), (J[84] = ek), (J[85] = q))
        : (q = J[85]),
      J[86] !== q
        ? ((B = (0, t.jsx)(d.S4, { className: q })), (J[86] = q), (J[87] = B))
        : (B = J[87]),
      J[88] !== ei
        ? ((F = ei("web.screeners.dock_left")), (J[88] = ei), (J[89] = F))
        : (F = J[89]),
      J[90] !== es || J[91] !== ea
        ? ((W = es ? (0, t.jsx)(tr, { keys: "⌥⇧←", density: ea }) : null),
          (J[90] = es),
          (J[91] = ea),
          (J[92] = W))
        : (W = J[92]),
      J[93] !== eF || J[94] !== P || J[95] !== B || J[96] !== F || J[97] !== W
        ? ((V = (0, t.jsxs)(eO.d, {
            disabled: eF,
            onClick: P,
            children: [B, F, W],
          })),
          (J[93] = eF),
          (J[94] = P),
          (J[95] = B),
          (J[96] = F),
          (J[97] = W),
          (J[98] = V))
        : (V = J[98]));
    let eW = !em;
    return (
      J[99] !== H || J[100] !== el
        ? ((O = () => el(H, "right")), (J[99] = H), (J[100] = el), (J[101] = O))
        : (O = J[101]),
      J[102] !== ek
        ? (($ = (0, t.jsx)(d.S4, { className: ek })),
          (J[102] = ek),
          (J[103] = $))
        : ($ = J[103]),
      J[104] !== ei
        ? ((M = ei("web.screeners.dock_right")), (J[104] = ei), (J[105] = M))
        : (M = J[105]),
      J[106] !== es || J[107] !== ea
        ? ((X = es ? (0, t.jsx)(tr, { keys: "⌥⇧→", density: ea }) : null),
          (J[106] = es),
          (J[107] = ea),
          (J[108] = X))
        : (X = J[108]),
      J[109] !== eW ||
      J[110] !== O ||
      J[111] !== $ ||
      J[112] !== M ||
      J[113] !== X
        ? ((K = (0, t.jsxs)(eO.d, {
            disabled: eW,
            onClick: O,
            children: [$, M, X],
          })),
          (J[109] = eW),
          (J[110] = O),
          (J[111] = $),
          (J[112] = M),
          (J[113] = X),
          (J[114] = K))
        : (K = J[114]),
      J[115] !== C || J[116] !== E || J[117] !== V || J[118] !== K
        ? ((Y = (0, t.jsxs)(t.Fragment, { children: [C, E, V, K] })),
          (J[115] = C),
          (J[116] = E),
          (J[117] = V),
          (J[118] = K),
          (J[119] = Y))
        : (Y = J[119]),
      J[120] !== H ||
      J[121] !== eN ||
      J[122] !== eb ||
      J[123] !== v ||
      J[124] !== Y
        ? ((G = (0, t.jsx)(e8, {
            column: H,
            isDragging: eN,
            headerDragRef: eb,
            headerDragProps: v,
            menuExtraItems: Y,
          })),
          (J[120] = H),
          (J[121] = eN),
          (J[122] = eb),
          (J[123] = v),
          (J[124] = Y),
          (J[125] = G))
        : (G = J[125]),
      J[126] !== eg ||
      J[127] !== x ||
      J[128] !== f ||
      J[129] !== p ||
      J[130] !== G
        ? ((Z = (0, t.jsxs)("div", {
            ref: eg,
            "data-testid": "screeners-sortable-column",
            style: x,
            className: f,
            children: [p, G],
          })),
          (J[126] = eg),
          (J[127] = x),
          (J[128] = f),
          (J[129] = p),
          (J[130] = G),
          (J[131] = Z))
        : (Z = J[131]),
      Z
    );
  }
  function tt(e) {
    return en.l[e.style.columnWidth];
  }
  let tn = () => !1;
  function tr(e) {
    let r,
      l,
      i = (0, n.c)(5),
      { keys: s, density: a } = e,
      c = "terminal" === a ? "text-[11px]" : "text-xs";
    return (
      i[0] !== c
        ? ((r = (0, S.c)(
            "ml-auto pl-3 font-sans font-normal leading-4 text-text-quaternary",
            c,
          )),
          (i[0] = c),
          (i[1] = r))
        : (r = i[1]),
      i[2] !== s || i[3] !== r
        ? ((l = (0, t.jsx)("kbd", {
            "aria-hidden": !0,
            className: r,
            children: s,
          })),
          (i[2] = s),
          (i[3] = r),
          (i[4] = l))
        : (l = i[4]),
      l
    );
  }
  let tl = () => (0, s.k)(i.D.WEB_DECK_AUTO_FILL, !0);
  function ti(e) {
    let r,
      l,
      i,
      s,
      c,
      d,
      o,
      u,
      h,
      x,
      f,
      g,
      b = (0, n.c)(38),
      { columns: v } = e;
    b[0] !== v ? ((r = v.map(tm)), (b[0] = v), (b[1] = r)) : (r = b[1]);
    let j = r,
      w = (0, a.useRef)(null),
      { model: y, activeColumn: _ } = U(),
      k = "chip" === y ? tu : ep.I,
      N = (0, T.V)(to),
      C = tl(),
      I = (function () {
        let e,
          t = (0, n.c)(5),
          r = (0, m.f)(),
          { address: l } = (0, eg.F)(),
          i = !!l;
        if (t[0] !== r || t[1] !== i) {
          let n;
          (t[3] !== i
            ? ((n = (e) => {
                let t = p.J[e];
                return !t.param && (i || !t.requiresAuth);
              }),
              (t[3] = i),
              (t[4] = n))
            : (n = t[4]),
            (e = r.filter(n)),
            (t[0] = r),
            (t[1] = i),
            (t[2] = e));
        } else e = t[2];
        return e;
      })(),
      z = (0, T.V)(td),
      D = (0, T.V)(tc);
    b[2] === Symbol.for("react.memo_cache_sentinel")
      ? ((l = { overflowing: !1, flush: !0 }), (b[2] = l))
      : (l = b[2]);
    let [R, E] = (0, a.useState)(l),
      { overflowing: P, flush: L } = R;
    (b[3] !== C || b[4] !== I || b[5] !== D || b[6] !== z
      ? ((i = () => {
          let e = w.current;
          if (!e) return;
          C || D();
          let t = () => {
            let t = e.scrollWidth - e.clientWidth > 2;
            C && z(e.clientWidth, I);
            let n = e.firstElementChild,
              r = n ? Array.from(n.children).reduce(ta, 0) : 0,
              l = !C || t || e.clientWidth - r < 1;
            E((e) =>
              e.overflowing === t && e.flush === l
                ? e
                : { overflowing: t, flush: l },
            );
          };
          if ((t(), "u" < typeof ResizeObserver)) return;
          let n = new ResizeObserver(t);
          return (n.observe(e), () => n.disconnect());
        }),
        (b[3] = C),
        (b[4] = I),
        (b[5] = D),
        (b[6] = z),
        (b[7] = i))
      : (i = b[7]),
      b[8] !== N ||
      b[9] !== C ||
      b[10] !== I ||
      b[11] !== D ||
      b[12] !== v ||
      b[13] !== z
        ? ((s = [v, N, C, I, z, D]),
          (b[8] = N),
          (b[9] = C),
          (b[10] = I),
          (b[11] = D),
          (b[12] = v),
          (b[13] = z),
          (b[14] = s))
        : (s = b[14]),
      (0, a.useLayoutEffect)(i, s));
    let q = (0, a.useRef)(null),
      B = (0, a.useRef)(N);
    (b[15] !== N || b[16] !== v
      ? ((c = () => {
          let e = v.flatMap(ts),
            t = q.current,
            n = null === t || B.current !== N ? [] : e.filter((e) => !t.has(e));
          ((q.current = new Set(e)),
            (B.current = N),
            1 === n.length &&
              w.current
                ?.querySelector(`[data-column-id="${CSS.escape(n[0])}"]`)
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "nearest",
                }));
        }),
        (d = [v, N]),
        (b[15] = N),
        (b[16] = v),
        (b[17] = c),
        (b[18] = d))
      : ((c = b[17]), (d = b[18])),
      (0, a.useEffect)(c, d));
    let F = L ? "true" : "false",
      W = P ? "overflow-x-auto" : "overflow-x-hidden";
    b[19] !== W
      ? ((o = (0, S.c)(
          "group/deck custom-scrollbar min-h-0 flex-1 overflow-y-hidden",
          W,
        )),
        (b[19] = W),
        (b[20] = o))
      : (o = b[20]);
    let A = C && !P ? "justify-center" : "justify-start",
      V = "chip" === y && null !== _ && "pointer-events-none";
    return (
      b[21] !== A || b[22] !== V
        ? ((u = (0, S.c)("flex h-full w-full items-stretch", A, V)),
          (b[21] = A),
          (b[22] = V),
          (b[23] = u))
        : (u = b[23]),
      b[24] !== C || b[25] !== v
        ? ((h = v.map((e, n) =>
            (0, t.jsx)(
              te,
              { column: e, index: n, columns: v, capWidth: C },
              e.id,
            ),
          )),
          (b[24] = C),
          (b[25] = v),
          (b[26] = h))
        : (h = b[26]),
      b[27] !== j || b[28] !== k || b[29] !== h
        ? ((x = (0, t.jsx)(ep.V, { items: j, strategy: k, children: h })),
          (b[27] = j),
          (b[28] = k),
          (b[29] = h),
          (b[30] = x))
        : (x = b[30]),
      b[31] !== u || b[32] !== x
        ? ((f = (0, t.jsx)("div", { className: u, children: x })),
          (b[31] = u),
          (b[32] = x),
          (b[33] = f))
        : (f = b[33]),
      b[34] !== o || b[35] !== f || b[36] !== F
        ? ((g = (0, t.jsx)("div", {
            ref: w,
            "data-testid": "screeners-deck",
            "data-flush": F,
            className: o,
            children: f,
          })),
          (b[34] = o),
          (b[35] = f),
          (b[36] = F),
          (b[37] = g))
        : (g = b[37]),
      g
    );
  }
  function ts(e) {
    return e.auto ? [] : [e.id];
  }
  function ta(e, t) {
    return e + t.getBoundingClientRect().width;
  }
  function tc(e) {
    return e.clearDeckFill;
  }
  function td(e) {
    return e.syncDeckFill;
  }
  function to(e) {
    return e.activeDeckId;
  }
  function tm(e) {
    return L(e.id);
  }
  let tu = () => null;
  var th = e.i(787773);
  function tx() {
    let e,
      i,
      s,
      a = (0, n.c)(8),
      { t: c } = (0, r.f)(),
      d = (0, l.x)();
    return (
      a[0] !== c
        ? ((e = c("web.screeners.empty_deck_title")), (a[0] = c), (a[1] = e))
        : (e = a[1]),
      a[2] !== c
        ? ((i = c("web.screeners.empty_deck_description")),
          (a[2] = c),
          (a[3] = i))
        : (i = a[3]),
      a[4] !== d || a[5] !== e || a[6] !== i
        ? ((s = (0, t.jsx)("div", {
            "data-testid": "screeners-empty-deck",
            className: "flex flex-1 flex-col items-center justify-center",
            children: (0, t.jsx)(th.L, {
              density: d,
              title: e,
              className: "max-w-md",
              children: i,
            }),
          })),
          (a[4] = d),
          (a[5] = e),
          (a[6] = i),
          (a[7] = s))
        : (s = a[7]),
      s
    );
  }
  function tf() {
    let e,
      r,
      l,
      c,
      d = (0, n.c)(8),
      o = (0, T.V)(T.O),
      m = (0, s.k)(i.D.WEB_DECK_DRAG_V2),
      [u, h] = (0, a.useState)(null);
    d[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((e = (e, t) => h({ type: e, placement: t })), (d[0] = e))
      : (e = d[0]);
    let x = e,
      f = m ? "chip" : "ride";
    return (
      d[1] === Symbol.for("react.memo_cache_sentinel")
        ? ((r = () => h(null)), (d[1] = r))
        : (r = d[1]),
      d[2] !== u
        ? ((l = (0, t.jsx)(tp, {
            pendingConfig: u,
            onRequestConfiguredAdd: x,
            onCloseConfig: r,
          })),
          (d[2] = u),
          (d[3] = l))
        : (l = d[3]),
      d[4] !== o || d[5] !== f || d[6] !== l
        ? ((c = (0, t.jsx)(ef.g, {
            children: (0, t.jsx)(J, { columns: o, model: f, children: l }),
          })),
          (d[4] = o),
          (d[5] = f),
          (d[6] = l),
          (d[7] = c))
        : (c = d[7]),
      c
    );
  }
  function tp(e) {
    let i,
      s,
      a,
      d,
      o,
      m,
      h,
      x = (0, n.c)(27),
      { pendingConfig: f, onRequestConfiguredAdd: p, onCloseConfig: b } = e,
      { t: v } = (0, r.f)(),
      j = (0, l.x)(),
      w = (0, T.V)(T.O),
      { addColumn: y, addPane: _ } = (0, u.f)(),
      { activeColumn: k, dockTarget: N, model: C } = U();
    return (
      x[0] !== v
        ? ((i = v("web.feed.feed_heading")), (x[0] = v), (x[1] = i))
        : (i = x[1]),
      x[2] !== i
        ? ((s = (0, t.jsx)("h2", { className: "sr-only", children: i })),
          (x[2] = i),
          (x[3] = s))
        : (s = x[3]),
      x[4] !== w || x[5] !== j || x[6] !== p
        ? ((a =
            0 === w.length
              ? (0, t.jsx)("div", {
                  className: (0, S.c)(
                    "flex border-b border-solid border-border-secondary py-3",
                    eG.U[j],
                  ),
                  children: (0, t.jsx)(g, {
                    columns: w,
                    onRequestConfig: (e) =>
                      p(e, { kind: "column", atIndex: w.length }),
                  }),
                })
              : null),
          (x[4] = w),
          (x[5] = j),
          (x[6] = p),
          (x[7] = a))
        : (a = x[7]),
      x[8] !== w
        ? ((d =
            0 === w.length
              ? (0, t.jsx)(tx, {})
              : (0, t.jsx)(ti, { columns: w })),
          (x[8] = w),
          (x[9] = d))
        : (d = x[9]),
      x[10] !== k || x[11] !== w || x[12] !== N || x[13] !== C
        ? ((o = k
            ? "chip" === C
              ? (0, t.jsx)(ed, { columns: w })
              : (0, t.jsx)(ex, { column: k, targetedSide: N })
            : null),
          (x[10] = k),
          (x[11] = w),
          (x[12] = N),
          (x[13] = C),
          (x[14] = o))
        : (o = x[14]),
      x[15] !== y || x[16] !== _ || x[17] !== w || x[18] !== b || x[19] !== f
        ? ((m = f
            ? (0, t.jsx)(c.f, {
                type: f.type,
                onPick: (e) => {
                  let { placement: t } = f;
                  if ("pane" === t.kind) {
                    let n = w.find((e) => e.id === t.columnId);
                    n && _(n, f.type, e);
                  } else y(f.type, e, t.atIndex);
                  b();
                },
                onClose: b,
              })
            : null),
          (x[15] = y),
          (x[16] = _),
          (x[17] = w),
          (x[18] = b),
          (x[19] = f),
          (x[20] = m))
        : (m = x[20]),
      x[21] !== s || x[22] !== a || x[23] !== d || x[24] !== o || x[25] !== m
        ? ((h = (0, t.jsxs)("div", {
            className: "flex min-h-0 flex-1 flex-col",
            children: [s, a, d, o, m],
          })),
          (x[21] = s),
          (x[22] = a),
          (x[23] = d),
          (x[24] = o),
          (x[25] = m),
          (x[26] = h))
        : (h = x[26]),
      h
    );
  }
  var tg = e.i(248496);
  e.i(290204);
  var tb = e.i(99844),
    tv = e.i(334942);
  let tj = en.l[tv.X.columnWidth],
    tw = (0, N.F)(tj);
  e.s(
    [
      "HomeDeckView",
      0,
      function () {
        let e,
          i,
          s,
          a,
          c,
          d,
          o,
          m,
          u,
          h = (0, n.c)(25),
          { t: x } = (0, r.f)(),
          f = (0, T.a)(),
          p = tl();
        if (h[0] !== p || h[1] !== f || h[2] !== x) {
          let n,
            r = p ? { maxWidth: N.W } : void 0;
          ((e = l.Z),
            (o = "home"),
            (i = !0),
            (s = !0),
            h[10] === Symbol.for("react.memo_cache_sentinel")
              ? ((a = (0, S.c)("flex min-h-0 flex-col", en.h)), (h[10] = a))
              : (a = h[10]),
            h[11] !== x
              ? ((n = x("web.feed.feed_heading")), (h[11] = x), (h[12] = n))
              : (n = h[12]),
            h[13] !== n
              ? ((c = (0, t.jsx)("h1", { className: "sr-only", children: n })),
                (h[13] = n),
                (h[14] = c))
              : (c = h[14]),
            (d = f
              ? (0, t.jsx)(tb.m, { children: (0, t.jsx)(tf, {}) })
              : (0, t.jsxs)("div", {
                  "aria-hidden": !0,
                  "data-testid": "screeners-hydration-skeleton",
                  className: (0, S.c)(
                    "flex min-h-0 w-full flex-1 justify-center overflow-hidden",
                    p && "@container",
                  ),
                  children: [
                    tw.map((e, n) => {
                      let { view: l, basis: i } = e;
                      return (0, t.jsx)(
                        "div",
                        {
                          "data-testid": "screeners-hydration-skeleton-column",
                          style: { flexBasis: i, ...r },
                          className: (0, S.c)(
                            "h-full min-w-0 grow shrink",
                            n > 0 &&
                              "border-l border-solid border-border-tertiary",
                          ),
                          children: (0, t.jsx)("div", {
                            className: (0, S.c)(
                              eZ.t,
                              eZ.F.comfortable,
                              eG.U.comfortable,
                            ),
                            children: (0, t.jsx)(tg.l, {
                              height: 28,
                              width: 112,
                              className: "ml-6",
                            }),
                          }),
                        },
                        l,
                      );
                    }),
                    p
                      ? en.S.map((e) =>
                          (0, t.jsx)(
                            "div",
                            {
                              "data-testid":
                                "screeners-hydration-skeleton-fill",
                              style: { flexBasis: tj, ...r },
                              className: (0, S.c)(
                                "h-full min-w-0 grow shrink border-l border-solid border-border-tertiary",
                                e,
                              ),
                              children: (0, t.jsx)("div", {
                                className: (0, S.c)(
                                  eZ.t,
                                  eZ.F.comfortable,
                                  eG.U.comfortable,
                                ),
                                children: (0, t.jsx)(tg.l, {
                                  height: 28,
                                  width: 112,
                                  className: "ml-6",
                                }),
                              }),
                            },
                            e,
                          ),
                        )
                      : null,
                  ],
                })),
            (h[0] = p),
            (h[1] = f),
            (h[2] = x),
            (h[3] = e),
            (h[4] = i),
            (h[5] = s),
            (h[6] = a),
            (h[7] = c),
            (h[8] = d),
            (h[9] = o));
        } else
          ((e = h[3]),
            (i = h[4]),
            (s = h[5]),
            (a = h[6]),
            (c = h[7]),
            (d = h[8]),
            (o = h[9]));
        return (
          h[15] !== i ||
          h[16] !== s ||
          h[17] !== a ||
          h[18] !== c ||
          h[19] !== d
            ? ((m = (0, t.jsxs)("div", {
                "data-full-bleed-page": i,
                "data-fullwidth-page": s,
                className: a,
                children: [c, d],
              })),
              (h[15] = i),
              (h[16] = s),
              (h[17] = a),
              (h[18] = c),
              (h[19] = d),
              (h[20] = m))
            : (m = h[20]),
          h[21] !== e || h[22] !== o || h[23] !== m
            ? ((u = (0, t.jsx)(e, { value: o, children: m })),
              (h[21] = e),
              (h[22] = o),
              (h[23] = m),
              (h[24] = u))
            : (u = h[24]),
          u
        );
      },
    ],
    897578,
  );
};
