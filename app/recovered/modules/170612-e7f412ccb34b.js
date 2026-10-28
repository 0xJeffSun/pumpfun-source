// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(745018),
    n = e.i(352386),
    r = e.i(338319),
    s = e.i(606178);
  let l = {
      terminal: "h-9 text-[13px] leading-4",
      comfortable: "h-11 text-sm leading-5",
    },
    o = {
      terminal:
        "min-w-0 flex-1 truncate text-xs font-normal leading-4 tabular-nums text-text-tertiary",
      comfortable:
        "min-w-0 flex-1 truncate text-[13px] font-normal leading-[18px] tabular-nums text-text-tertiary",
    };
  e.s([
    "DISCLOSURE_HEADER_SIZE_CLASS",
    0,
    l,
    "Disclosure",
    0,
    function (e) {
      let c,
        d,
        m,
        u,
        p,
        f,
        x,
        g,
        h,
        b,
        y,
        v = (0, i.c)(45),
        {
          density: w,
          label: _,
          summary: k,
          open: j,
          defaultOpen: C,
          onOpenChange: N,
          bleed: S,
          className: P,
          headerClassName: V,
          panelClassName: A,
          children: T,
          "data-testid": L,
        } = e,
        [$, z] = (0, n.useState)(void 0 !== C && C),
        O = j ?? $,
        W = (0, n.useId)(),
        I = (0, n.useId)();
      v[0] !== O || v[1] !== N || v[2] !== j
        ? ((c = () => {
            let e = !O;
            (void 0 === j && z(e), N?.(e));
          }),
          (v[0] = O),
          (v[1] = N),
          (v[2] = j),
          (v[3] = c))
        : (c = v[3]);
      let F = c,
        R = O || void 0,
        K = void 0 !== S && S && s.z[w];
      v[4] !== P || v[5] !== K
        ? ((d = (0, r.c)(K, P)), (v[4] = P), (v[5] = K), (v[6] = d))
        : (d = v[6]);
      let q = l[w],
        D = s.U[w];
      (v[7] !== V || v[8] !== q || v[9] !== D
        ? ((m = (0, r.c)(
            "flex w-full items-center gap-2 border-t border-border-secondary text-left font-medium text-text-primary transition-colors hover:bg-bg-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text-accent",
            q,
            D,
            V,
          )),
          (v[7] = V),
          (v[8] = q),
          (v[9] = D),
          (v[10] = m))
        : (m = v[10]),
        v[11] !== _
          ? ((u = (0, t.jsx)("span", { className: "shrink-0", children: _ })),
            (v[11] = _),
            (v[12] = u))
          : (u = v[12]),
        v[13] !== w || v[14] !== O || v[15] !== k
          ? ((p =
              null == k || O
                ? null
                : (0, t.jsx)("span", {
                    "data-slot": "disclosure-summary",
                    className: o[w],
                    children: k,
                  })),
            (v[13] = w),
            (v[14] = O),
            (v[15] = k),
            (v[16] = p))
          : (p = v[16]));
      let Q = O && "rotate-180";
      (v[17] !== Q
        ? ((f = (0, r.c)(
            "ml-auto size-3.5 shrink-0 text-text-quaternary transition-transform",
            Q,
          )),
          (v[17] = Q),
          (v[18] = f))
        : (f = v[18]),
        v[19] !== f
          ? ((x = (0, t.jsx)(a.vY, { "aria-hidden": !0, className: f })),
            (v[19] = f),
            (v[20] = x))
          : (x = v[20]),
        v[21] !== W ||
        v[22] !== O ||
        v[23] !== I ||
        v[24] !== u ||
        v[25] !== p ||
        v[26] !== x ||
        v[27] !== m ||
        v[28] !== F
          ? ((g = (0, t.jsxs)("button", {
              type: "button",
              id: W,
              "aria-expanded": O,
              "aria-controls": I,
              onClick: F,
              "data-slot": "disclosure-header",
              className: m,
              children: [u, p, x],
            })),
            (v[21] = W),
            (v[22] = O),
            (v[23] = I),
            (v[24] = u),
            (v[25] = p),
            (v[26] = x),
            (v[27] = m),
            (v[28] = F),
            (v[29] = g))
          : (g = v[29]));
      let U = !O;
      return (
        v[30] !== A
          ? ((h = (0, r.c)("border-t border-border-secondary", A)),
            (v[30] = A),
            (v[31] = h))
          : (h = v[31]),
        v[32] !== T || v[33] !== W || v[34] !== I || v[35] !== U || v[36] !== h
          ? ((b = (0, t.jsx)("div", {
              id: I,
              role: "region",
              "aria-labelledby": W,
              hidden: U,
              "data-slot": "disclosure-panel",
              className: h,
              children: T,
            })),
            (v[32] = T),
            (v[33] = W),
            (v[34] = I),
            (v[35] = U),
            (v[36] = h),
            (v[37] = b))
          : (b = v[37]),
        v[38] !== w ||
        v[39] !== g ||
        v[40] !== b ||
        v[41] !== R ||
        v[42] !== d ||
        v[43] !== L
          ? ((y = (0, t.jsxs)("div", {
              "data-disclosure": !0,
              "data-density": w,
              "data-open": R,
              "data-testid": L,
              className: d,
              children: [g, b],
            })),
            (v[38] = w),
            (v[39] = g),
            (v[40] = b),
            (v[41] = R),
            (v[42] = d),
            (v[43] = L),
            (v[44] = y))
          : (y = v[44]),
        y
      );
    },
  ]);
};
