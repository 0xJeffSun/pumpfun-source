// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    s = e.i(445242),
    n = e.i(157633),
    l = e.i(745018),
    r = e.i(352386);
  e.i(12692);
  var i = e.i(398902),
    a = e.i(117330),
    o = e.i(827111),
    c = e.i(116549),
    d = e.i(844510),
    m = e.i(170612),
    u = e.i(51206),
    f = e.i(764844),
    h = e.i(813792),
    x = e.i(791898),
    p = e.i(937863),
    g = e.i(338319);
  let b = "screeners.view-menu-advanced-open",
    v = { terminal: "px-3", comfortable: "px-4" },
    y = { terminal: 20, comfortable: 24 },
    w = { terminal: "pr-7", comfortable: "pr-9" },
    j = {
      active: "group-hover/row:bg-bg-accent/10",
      idle: "group-hover/row:bg-bg-quaternary",
    },
    _ = {
      terminal: "absolute inset-y-0 right-1 my-auto",
      comfortable: "absolute inset-y-0 right-1.5 my-auto",
    };
  function N(e) {
    let n,
      l,
      a,
      o,
      c = (0, s.c)(12),
      { density: d, activeIsAdvanced: u, testId: f, children: h } = e,
      { t: x } = (0, i.f)();
    c[0] !== u
      ? ((n = () =>
          u ||
          (() => {
            try {
              return "1" === window.sessionStorage.getItem(b);
            } catch {
              return !1;
            }
          })()),
        (c[0] = u),
        (c[1] = n))
      : (n = c[1]);
    let [p, g] = (0, r.useState)(n);
    (c[2] !== x
      ? ((l = x("web.screeners.advanced")), (c[2] = x), (c[3] = l))
      : (l = c[3]),
      c[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (e) => {
            g(e);
            try {
              window.sessionStorage.setItem(b, e ? "1" : "0");
            } catch {}
          }),
          (c[4] = a))
        : (a = c[4]));
    let y = v[d],
      w = p ? h : null;
    return (
      c[5] !== d ||
      c[6] !== p ||
      c[7] !== l ||
      c[8] !== y ||
      c[9] !== w ||
      c[10] !== f
        ? ((o = (0, t.jsx)(m.Disclosure, {
            density: d,
            label: l,
            open: p,
            onOpenChange: a,
            className: "-mx-1 mt-1",
            headerClassName: y,
            panelClassName: "px-1",
            "data-testid": f,
            children: w,
          })),
          (c[5] = d),
          (c[6] = p),
          (c[7] = l),
          (c[8] = y),
          (c[9] = w),
          (c[10] = f),
          (c[11] = o))
        : (o = c[11]),
      o
    );
  }
  function k(e) {
    let r,
      a,
      o,
      d,
      m,
      f,
      b = (0, s.c)(29),
      { view: v, pinned: w, full: j, testId: N, onToggle: k } = e,
      { t: S } = (0, i.f)(),
      M = (0, c.x)(),
      C = x.J[v].label;
    b[0] !== j || b[1] !== w || b[2] !== S || b[3] !== C
      ? ((r = w
          ? S("web.screeners.unpin_view_a11y", { title: C })
          : j
            ? S("web.screeners.pins_full", { max: p.R })
            : S("web.screeners.pin_view_a11y", { title: C })),
        (b[0] = j),
        (b[1] = w),
        (b[2] = S),
        (b[3] = C),
        (b[4] = r))
      : (r = b[4]);
    let I = r,
      P = w ? n.Pj : l.Pj,
      U = y[M],
      E = j || void 0;
    b[5] !== j || b[6] !== k || b[7] !== v
      ? ((a = () => {
          j || k(v);
        }),
        (b[5] = j),
        (b[6] = k),
        (b[7] = v),
        (b[8] = a))
      : (a = b[8]);
    let T = _[M],
      A = w
        ? "text-text-accent hover:text-text-accent"
        : "pointer-events-none opacity-0 group-focus-within/row:opacity-100 group-has-[[data-highlighted]]/row:opacity-100 group-hover/row:opacity-100 focus-visible:opacity-100 [@media(hover:hover)_and_(pointer:fine)]:pointer-events-auto",
      R = j && "cursor-not-allowed hover:bg-transparent";
    return (
      b[9] !== T || b[10] !== A || b[11] !== R
        ? ((o = (0, g.c)(T, A, R)),
          (b[9] = T),
          (b[10] = A),
          (b[11] = R),
          (b[12] = o))
        : (o = b[12]),
      b[13] !== P
        ? ((d = (0, t.jsx)(P, { "aria-hidden": !0 })), (b[13] = P), (b[14] = d))
        : (d = b[14]),
      b[15] !== M ||
      b[16] !== I ||
      b[17] !== w ||
      b[18] !== U ||
      b[19] !== E ||
      b[20] !== a ||
      b[21] !== o ||
      b[22] !== d ||
      b[23] !== N
        ? ((m = (0, t.jsx)(u._, {
            density: M,
            size: U,
            "aria-label": I,
            "aria-pressed": w,
            "aria-disabled": E,
            "data-testid": N,
            onClick: a,
            className: o,
            children: d,
          })),
          (b[15] = M),
          (b[16] = I),
          (b[17] = w),
          (b[18] = U),
          (b[19] = E),
          (b[20] = a),
          (b[21] = o),
          (b[22] = d),
          (b[23] = N),
          (b[24] = m))
        : (m = b[24]),
      b[25] !== M || b[26] !== I || b[27] !== m
        ? ((f = (0, t.jsx)(h.f, { content: I, density: M, children: m })),
          (b[25] = M),
          (b[26] = I),
          (b[27] = m),
          (b[28] = f))
        : (f = b[28]),
      f
    );
  }
  function S(e) {
    return !(0, x.l)(e);
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let n,
          m,
          u,
          h,
          b,
          v,
          y,
          _,
          M,
          C,
          I,
          P = (0, s.c)(73),
          {
            pane: U,
            iconClassName: E,
            onPick: T,
            pins: A,
            onTogglePin: R,
            unavailableViews: F,
            adaptive: $,
            triggerClassName: z,
            triggerTestId: D,
            itemTestIdPrefix: O,
            dotTestId: B,
          } = e,
          L = void 0 !== $ && $,
          q = void 0 === D ? "screeners-pane-view-trigger" : D,
          W = void 0 === O ? "screeners-pane-view" : O,
          K = void 0 === B ? "screeners-column-dot" : B,
          { t: H } = (0, i.f)(),
          V = (0, c.x)(),
          G = x.J[U.view],
          Q = a.Y[U.view]?.icon,
          J = (0, o.f)();
        if (
          P[0] !== Q ||
          P[1] !== L ||
          P[2] !== J ||
          P[3] !== V ||
          P[4] !== G.label ||
          P[5] !== K ||
          P[6] !== E ||
          P[7] !== W ||
          P[8] !== T ||
          P[9] !== R ||
          P[10] !== U.pins ||
          P[11] !== U.title ||
          P[12] !== U.view ||
          P[13] !== A ||
          P[14] !== H ||
          P[15] !== z ||
          P[16] !== q ||
          P[17] !== F
        ) {
          let e, s, i, o, c, C, I, $;
          P[27] !== J || P[28] !== U.view
            ? ((e = (e) => e === U.view || J.includes(e)),
              (P[27] = J),
              (P[28] = U.view),
              (P[29] = e))
            : (e = P[29]);
          let D = x.z.filter(e),
            O = D.filter(S),
            B = D.filter(x.l),
            X = d.v[V];
          P[30] !== U.pins || P[31] !== A
            ? ((s = A ?? U.pins ?? []),
              (P[30] = U.pins),
              (P[31] = A),
              (P[32] = s))
            : (s = P[32]);
          let Y = s;
          P[33] !== V ||
          P[34] !== X ||
          P[35] !== W ||
          P[36] !== T ||
          P[37] !== R ||
          P[38] !== U.view ||
          P[39] !== Y ||
          P[40] !== F
            ? ((i = (e) => {
                let s = a.Y[e]?.icon,
                  n = e !== U.view && (F?.has(e) ?? !1),
                  l = e === U.view,
                  i = (0, t.jsxs)(f.d, {
                    "data-testid": `${W}-${e}`,
                    disabled: n,
                    onClick: () => T(e),
                    active: l,
                    className: R
                      ? (0, g.c)(w[V], j[l ? "active" : "idle"])
                      : void 0,
                    children: [
                      s
                        ? (0, t.jsx)(s, {
                            className: (0, g.c)(
                              "shrink-0",
                              X,
                              l ? "text-text-accent" : "text-text-quaternary",
                            ),
                          })
                        : null,
                      (0, t.jsx)("span", {
                        className: "min-w-0 flex-1 truncate",
                        children: x.J[e].label,
                      }),
                    ],
                  });
                return R
                  ? (0, t.jsxs)(
                      "div",
                      {
                        className: "group/row relative flex items-center",
                        children: [
                          i,
                          (0, t.jsx)(k, {
                            view: e,
                            pinned: Y.includes(e),
                            full: !Y.includes(e) && Y.length >= p.R,
                            testId: `${W}-pin-${e}`,
                            onToggle: R,
                          }),
                        ],
                      },
                      e,
                    )
                  : (0, t.jsx)(r.Fragment, { children: i }, e);
              }),
              (P[33] = V),
              (P[34] = X),
              (P[35] = W),
              (P[36] = T),
              (P[37] = R),
              (P[38] = U.view),
              (P[39] = Y),
              (P[40] = F),
              (P[41] = i))
            : (i = P[41]);
          let Z = i;
          ((m = f.k),
            (u = !1),
            P[42] !== G.label || P[43] !== H
              ? ((o = H("web.screeners.change_view_a11y", { title: G.label })),
                (P[42] = G.label),
                (P[43] = H),
                (P[44] = o))
              : (o = P[44]));
          let ee = L ? d.d[V] : d.e[V];
          (P[45] !== ee || P[46] !== z
            ? ((c = (0, g.c)(ee, z)), (P[45] = ee), (P[46] = z), (P[47] = c))
            : (c = P[47]),
            P[48] !== Q || P[49] !== K || P[50] !== E
              ? ((C = Q
                  ? (0, t.jsx)(Q, {
                      "aria-hidden": !0,
                      "data-testid": K,
                      className: (0, g.c)("size-3.5 shrink-0", E),
                    })
                  : null),
                (P[48] = Q),
                (P[49] = K),
                (P[50] = E),
                (P[51] = C))
              : (C = P[51]));
          let et = U.title ?? G.label;
          (P[52] !== et
            ? ((I = (0, t.jsx)("span", {
                className: "min-w-0 truncate",
                children: et,
              })),
              (P[52] = et),
              (P[53] = I))
            : (I = P[53]),
            P[54] === Symbol.for("react.memo_cache_sentinel")
              ? (($ = (0, t.jsx)(l.vY, {
                  "aria-hidden": !0,
                  className: "size-3 shrink-0 text-text-quaternary",
                })),
                (P[54] = $))
              : ($ = P[54]),
            P[55] !== o ||
            P[56] !== c ||
            P[57] !== C ||
            P[58] !== I ||
            P[59] !== q
              ? ((h = (0, t.jsxs)(f.g, {
                  "aria-label": o,
                  "data-testid": q,
                  "data-variant": "plain",
                  className: c,
                  children: [C, I, $],
                })),
                (P[55] = o),
                (P[56] = c),
                (P[57] = C),
                (P[58] = I),
                (P[59] = q),
                (P[60] = h))
              : (h = P[60]),
            (n = f.A),
            (b = "start"),
            (v = "terminal" === V),
            (y = "max-h-[70vh] min-w-52 overflow-y-auto"),
            (_ = O.map(Z)),
            (M =
              B.length > 0
                ? (0, t.jsx)(N, {
                    density: V,
                    activeIsAdvanced: (0, x.l)(U.view),
                    testId: `${W}-advanced`,
                    children: B.map(Z),
                  })
                : null),
            (P[0] = Q),
            (P[1] = L),
            (P[2] = J),
            (P[3] = V),
            (P[4] = G.label),
            (P[5] = K),
            (P[6] = E),
            (P[7] = W),
            (P[8] = T),
            (P[9] = R),
            (P[10] = U.pins),
            (P[11] = U.title),
            (P[12] = U.view),
            (P[13] = A),
            (P[14] = H),
            (P[15] = z),
            (P[16] = q),
            (P[17] = F),
            (P[18] = n),
            (P[19] = m),
            (P[20] = u),
            (P[21] = h),
            (P[22] = b),
            (P[23] = v),
            (P[24] = y),
            (P[25] = _),
            (P[26] = M));
        } else
          ((n = P[18]),
            (m = P[19]),
            (u = P[20]),
            (h = P[21]),
            (b = P[22]),
            (v = P[23]),
            (y = P[24]),
            (_ = P[25]),
            (M = P[26]));
        return (
          P[61] !== n ||
          P[62] !== b ||
          P[63] !== v ||
          P[64] !== y ||
          P[65] !== _ ||
          P[66] !== M
            ? ((C = (0, t.jsxs)(n, {
                align: b,
                dense: v,
                className: y,
                children: [_, M],
              })),
              (P[61] = n),
              (P[62] = b),
              (P[63] = v),
              (P[64] = y),
              (P[65] = _),
              (P[66] = M),
              (P[67] = C))
            : (C = P[67]),
          P[68] !== m || P[69] !== u || P[70] !== h || P[71] !== C
            ? ((I = (0, t.jsxs)(m, { modal: u, children: [h, C] })),
              (P[68] = m),
              (P[69] = u),
              (P[70] = h),
              (P[71] = C),
              (P[72] = I))
            : (I = P[72]),
          I
        );
      },
    ],
    146814,
  );
  var M = e.i(365089),
    C = e.i(576766),
    I = e.i(609252),
    P = e.i(45329);
  e.s(
    [
      "f",
      0,
      function (e) {
        let t,
          n,
          l,
          r,
          i,
          a,
          o,
          c,
          d = (0, s.c)(35),
          m = x.J[e.type],
          u = m.param,
          f = u ? e.params?.[u.key] : void 0,
          h = u?.kind === "coin" && !!f,
          p = u?.kind === "user" && !!f,
          g = u?.kind === "list" && !!f;
        d[0] !== g || d[1] !== f
          ? ((t = (e) =>
              g ? (e.lists.find((e) => e.id === f)?.name ?? null) : null),
            (d[0] = g),
            (d[1] = f),
            (d[2] = t))
          : (t = d[2]);
        let b = (0, P.V)(t);
        d[3] !== h || d[4] !== f
          ? ((n = h && f ? [f] : []), (d[3] = h), (d[4] = f), (d[5] = n))
          : (n = d[5]);
        let v = n,
          y = 0 === v.length;
        d[6] !== v || d[7] !== y
          ? ((l = { mints: v, disabled: y }),
            (d[6] = v),
            (d[7] = y),
            (d[8] = l))
          : (l = d[8]);
        let { coins: w } = (0, I.f)(l);
        d[9] !== p || d[10] !== f
          ? ((r = p && f ? [f] : []), (d[9] = p), (d[10] = f), (d[11] = r))
          : (r = d[11]);
        let j = r;
        d[12] !== j
          ? ((i = { userAddresses: j }), (d[12] = j), (d[13] = i))
          : (i = d[13]);
        let { data: _ } = (0, C.f)(i);
        d[14] !== _
          ? ((a = void 0 === _ ? [] : _), (d[14] = _), (d[15] = a))
          : (a = d[15]);
        let N = a;
        e: {
          if (!f) {
            o = null;
            break e;
          }
          if (g) {
            o = b;
            break e;
          }
          if (h) {
            let e, t;
            if (d[16] !== w || d[17] !== f) {
              let t;
              d[19] !== f
                ? ((t = (e) => e?.mint === f), (d[19] = f), (d[20] = t))
                : (t = d[20]);
              let s = w.find(t);
              ((e = s?.symbol?.replace(/^\$/, "")),
                (d[16] = w),
                (d[17] = f),
                (d[18] = e));
            } else e = d[18];
            let s = e;
            (d[21] !== f || d[22] !== s
              ? ((t = s || (0, M.d)(f, 4, 4)),
                (d[21] = f),
                (d[22] = s),
                (d[23] = t))
              : (t = d[23]),
              (o = t));
            break e;
          }
          if (p) {
            let e, t;
            if (d[24] !== f || d[25] !== N) {
              let t;
              (d[27] !== f
                ? ((t = (e) => e?.address?.toLowerCase() === f.toLowerCase()),
                  (d[27] = f),
                  (d[28] = t))
                : (t = d[28]),
                (e = N.find(t)),
                (d[24] = f),
                (d[25] = N),
                (d[26] = e));
            } else e = d[26];
            let s = e;
            (d[29] !== f || d[30] !== s?.username
              ? ((t = s?.username || (0, M.d)(f, 4, 4)),
                (d[29] = f),
                (d[30] = s?.username),
                (d[31] = t))
              : (t = d[31]),
              (o = t));
            break e;
          }
          o = f;
        }
        let k = o;
        return (
          d[32] !== m.label || d[33] !== k
            ? ((c = { label: m.label, paramLabel: k }),
              (d[32] = m.label),
              (d[33] = k),
              (d[34] = c))
            : (c = d[34]),
          c
        );
      },
    ],
    923019,
  );
};
