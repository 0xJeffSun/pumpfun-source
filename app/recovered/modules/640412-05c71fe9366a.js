// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(745018);
  e.i(12692);
  var i = e.i(398902),
    n = e.i(786147),
    l = e.i(764844),
    s = e.i(607122),
    o = e.i(182303),
    c = e.i(671722),
    d = e.i(338319),
    m = e.i(723352),
    u = e.i(617826),
    f = e.i(761234);
  function h(e) {
    let a,
      l,
      s,
      f,
      h,
      p,
      x,
      g = (0, r.c)(30),
      { id: b, active: v, liveCount: y, callsCount: j, labels: w } = e,
      N = void 0 === w ? "responsive" : w,
      { t: _ } = (0, i.f)(),
      k = c.M[b];
    g[0] !== _ || g[1] !== k.labelKey
      ? ((a = (0, n.f)(_, k.labelKey)),
        (g[0] = _),
        (g[1] = k.labelKey),
        (g[2] = a))
      : (a = g[2]);
    let S = a;
    g[3] !== v || g[4] !== b || g[5] !== N
      ? ((l =
          "watchlist" === b
            ? "sr-only"
            : "always" === N
              ? void 0
              : (0, d.c)("sr-only @[880px]:not-sr-only", v && "not-sr-only")),
        (g[3] = v),
        (g[4] = b),
        (g[5] = N),
        (g[6] = l))
      : (l = g[6]);
    let C = l,
      M = v ? "true" : void 0;
    return (
      g[7] !== v || g[8] !== b
        ? ((s = (0, t.jsx)(u.f, { active: v, id: b })),
          (g[7] = v),
          (g[8] = b),
          (g[9] = s))
        : (s = g[9]),
      g[10] !== S || g[11] !== C
        ? ((f = (0, t.jsx)("span", {
            className: C,
            "data-lens-label": "",
            children: S,
          })),
          (g[10] = S),
          (g[11] = C),
          (g[12] = f))
        : (f = g[12]),
      g[13] !== v || g[14] !== b || g[15] !== y || g[16] !== _
        ? ((h =
            "live" === b
              ? (0, t.jsx)(m.f, {
                  active: v,
                  ariaLabel: _("web.home.lens_live_count_aria", {
                    count: y ?? 0,
                  }),
                  tone: "live",
                  value: (0, o.j)(y),
                })
              : null),
          (g[13] = v),
          (g[14] = b),
          (g[15] = y),
          (g[16] = _),
          (g[17] = h))
        : (h = g[17]),
      g[18] !== v || g[19] !== j || g[20] !== b || g[21] !== _
        ? ((p =
            "calls" === b
              ? (0, t.jsx)(m.f, {
                  active: v,
                  ariaLabel: _("web.home.lens_calls_count_aria", {
                    count: j ?? 0,
                  }),
                  tone: "amber",
                  value: (0, o.j)(j, o.b),
                })
              : null),
          (g[18] = v),
          (g[19] = j),
          (g[20] = b),
          (g[21] = _),
          (g[22] = p))
        : (p = g[22]),
      g[23] !== b ||
      g[24] !== M ||
      g[25] !== s ||
      g[26] !== f ||
      g[27] !== h ||
      g[28] !== p
        ? ((x = (0, t.jsxs)("span", {
            className: "inline-flex items-center gap-1.5",
            "data-active": M,
            "data-lens": b,
            children: [s, f, h, p],
          })),
          (g[23] = b),
          (g[24] = M),
          (g[25] = s),
          (g[26] = f),
          (g[27] = h),
          (g[28] = p),
          (g[29] = x))
        : (x = g[29]),
      x
    );
  }
  e.s([
    "C",
    0,
    h,
    "E",
    0,
    function (e) {
      let o,
        m,
        p,
        x,
        g,
        b,
        v,
        y,
        j,
        w,
        N,
        _,
        k,
        S,
        C,
        M,
        E,
        A,
        R,
        D = (0, r.c)(55),
        {
          lenses: z,
          moreLenses: T,
          activeLens: P,
          liveCount: B,
          callsCount: I,
          onSelect: F,
          onCustomize: L,
          trailing: H,
        } = e,
        { t: K } = (0, i.f)();
      D[0] !== P || D[1] !== z
        ? ((o =
            null === P || z.includes(P) || "strip" !== c.M[P].placement
              ? null
              : P),
          (D[0] = P),
          (D[1] = z),
          (D[2] = o))
        : (o = D[2]);
      let q = o;
      D[3] !== z || D[4] !== q
        ? ((m = q ? [...z, q] : [...z]), (D[3] = z), (D[4] = q), (D[5] = m))
        : (m = D[5]);
      let U = m;
      D[6] !== P || D[7] !== I || D[8] !== B || D[9] !== U || D[10] !== K
        ? ((p = U.map((e) => ({
            value: e,
            tooltip: (0, n.f)(K, c.M[e].labelKey),
            label: (0, t.jsx)(h, {
              active: e === P,
              callsCount: I,
              id: e,
              liveCount: B,
            }),
          }))),
          (D[6] = P),
          (D[7] = I),
          (D[8] = B),
          (D[9] = U),
          (D[10] = K),
          (D[11] = p))
        : (p = D[11]);
      let W = p,
        V = s.l[f.f];
      if (
        (D[12] !== K
          ? ((x = K("web.home.lens_strip_a11y")), (D[12] = K), (D[13] = x))
          : (x = D[13]),
        D[14] !== F
          ? ((g = (e) => {
              (0, c.$)(e) && F(e);
            }),
            (D[14] = F),
            (D[15] = g))
          : (g = D[15]),
        D[16] === Symbol.for("react.memo_cache_sentinel")
          ? ((b = (0, t.jsx)("button", {
              className: (0, d.c)(s.C, s._[V], "h-full"),
              "data-testid": "explore-lens-more",
              type: "button",
            })),
            (D[16] = b))
          : (b = D[16]),
        D[17] !== K
          ? ((v = K("common.more")), (D[17] = K), (D[18] = v))
          : (v = D[18]),
        D[19] === Symbol.for("react.memo_cache_sentinel")
          ? ((y = (0, t.jsx)(a.vY, { "aria-hidden": !0, className: "size-3" })),
            (D[19] = y))
          : (y = D[19]),
        D[20] !== v
          ? ((j = (0, t.jsxs)(l.g, { render: b, children: [v, y] })),
            (D[20] = v),
            (D[21] = j))
          : (j = D[21]),
        D[22] !== T || D[23] !== F || D[24] !== K)
      ) {
        let e;
        (D[26] !== F || D[27] !== K
          ? ((e = (e) =>
              (0, t.jsxs)(
                l.d,
                {
                  "data-lens": e,
                  onClick: () => F(e),
                  children: [
                    (0, t.jsx)(u.f, { className: "text-text-tertiary", id: e }),
                    (0, n.f)(K, c.M[e].labelKey),
                  ],
                },
                e,
              )),
            (D[26] = F),
            (D[27] = K),
            (D[28] = e))
          : (e = D[28]),
          (w = T.map(e)),
          (D[22] = T),
          (D[23] = F),
          (D[24] = K),
          (D[25] = w));
      } else w = D[25];
      (D[29] !== T.length
        ? ((N = T.length > 0 ? (0, t.jsx)(l.Z, {}) : null),
          (D[29] = T.length),
          (D[30] = N))
        : (N = D[30]),
        D[31] === Symbol.for("react.memo_cache_sentinel")
          ? ((_ = (0, t.jsx)(a.m_, {
              "aria-hidden": !0,
              className: "size-4 shrink-0 text-text-tertiary",
            })),
            (D[31] = _))
          : (_ = D[31]),
        D[32] !== K
          ? ((k = K("web.home.lens_customize")), (D[32] = K), (D[33] = k))
          : (k = D[33]),
        D[34] !== L || D[35] !== k
          ? ((S = (0, t.jsxs)(l.d, {
              "data-testid": "explore-lens-customize",
              onClick: L,
              children: [_, k, "…"],
            })),
            (D[34] = L),
            (D[35] = k),
            (D[36] = S))
          : (S = D[36]),
        D[37] !== N || D[38] !== S || D[39] !== w
          ? ((C = (0, t.jsxs)(l.A, { align: "end", children: [w, N, S] })),
            (D[37] = N),
            (D[38] = S),
            (D[39] = w),
            (D[40] = C))
          : (C = D[40]),
        D[41] !== C || D[42] !== j
          ? ((M = (0, t.jsxs)(l.k, { modal: !1, children: [j, C] })),
            (D[41] = C),
            (D[42] = j),
            (D[43] = M))
          : (M = D[43]),
        D[44] !== H
          ? ((E = H
              ? (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsx)("span", {
                      "aria-hidden": !0,
                      className: "mx-1 h-5 w-px shrink-0 bg-border-tertiary",
                      "data-testid": "explore-lens-strip-divider",
                    }),
                    H,
                  ],
                })
              : null),
            (D[44] = H),
            (D[45] = E))
          : (E = D[45]),
        D[46] !== M || D[47] !== E
          ? ((A = (0, t.jsxs)(t.Fragment, { children: [M, E] })),
            (D[46] = M),
            (D[47] = E),
            (D[48] = A))
          : (A = D[48]));
      let $ = P ?? "";
      return (
        D[49] !== W || D[50] !== A || D[51] !== $ || D[52] !== x || D[53] !== g
          ? ((R = (0, t.jsx)("div", {
              className: "flex min-w-0 shrink-0 items-center",
              "data-testid": "explore-lens-strip",
              children: (0, t.jsx)(s.X, {
                "aria-label": x,
                density: f.f,
                onValueChange: g,
                options: W,
                trailing: A,
                value: $,
              }),
            })),
            (D[49] = W),
            (D[50] = A),
            (D[51] = $),
            (D[52] = x),
            (D[53] = g),
            (D[54] = R))
          : (R = D[54]),
        R
      );
    },
  ]);
};
