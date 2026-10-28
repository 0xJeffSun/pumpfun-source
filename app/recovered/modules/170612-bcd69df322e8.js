// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    s = e.i(745018),
    a = e.i(352386),
    r = e.i(338319),
    n = e.i(606178);
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
        x,
        h,
        u,
        f,
        b,
        p,
        m,
        y,
        v,
        g = (0, i.c)(45),
        {
          density: w,
          label: _,
          summary: N,
          open: A,
          defaultOpen: I,
          onOpenChange: k,
          bleed: j,
          className: S,
          headerClassName: $,
          panelClassName: C,
          children: U,
          "data-testid": E,
        } = e,
        [F, D] = (0, a.useState)(void 0 !== I && I),
        T = A ?? F,
        B = (0, a.useId)(),
        q = (0, a.useId)();
      g[0] !== T || g[1] !== k || g[2] !== A
        ? ((c = () => {
            let e = !T;
            (void 0 === A && D(e), k?.(e));
          }),
          (g[0] = T),
          (g[1] = k),
          (g[2] = A),
          (g[3] = c))
        : (c = g[3]);
      let z = c,
        O = T || void 0,
        M = void 0 !== j && j && n.z[w];
      g[4] !== S || g[5] !== M
        ? ((d = (0, r.c)(M, S)), (g[4] = S), (g[5] = M), (g[6] = d))
        : (d = g[6]);
      let R = l[w],
        L = n.U[w];
      (g[7] !== $ || g[8] !== R || g[9] !== L
        ? ((x = (0, r.c)(
            "flex w-full items-center gap-2 border-t border-border-secondary text-left font-medium text-text-primary transition-colors hover:bg-bg-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text-accent",
            R,
            L,
            $,
          )),
          (g[7] = $),
          (g[8] = R),
          (g[9] = L),
          (g[10] = x))
        : (x = g[10]),
        g[11] !== _
          ? ((h = (0, t.jsx)("span", { className: "shrink-0", children: _ })),
            (g[11] = _),
            (g[12] = h))
          : (h = g[12]),
        g[13] !== w || g[14] !== T || g[15] !== N
          ? ((u =
              null == N || T
                ? null
                : (0, t.jsx)("span", {
                    "data-slot": "disclosure-summary",
                    className: o[w],
                    children: N,
                  })),
            (g[13] = w),
            (g[14] = T),
            (g[15] = N),
            (g[16] = u))
          : (u = g[16]));
      let H = T && "rotate-180";
      (g[17] !== H
        ? ((f = (0, r.c)(
            "ml-auto size-3.5 shrink-0 text-text-quaternary transition-transform",
            H,
          )),
          (g[17] = H),
          (g[18] = f))
        : (f = g[18]),
        g[19] !== f
          ? ((b = (0, t.jsx)(s.vY, { "aria-hidden": !0, className: f })),
            (g[19] = f),
            (g[20] = b))
          : (b = g[20]),
        g[21] !== B ||
        g[22] !== T ||
        g[23] !== q ||
        g[24] !== h ||
        g[25] !== u ||
        g[26] !== b ||
        g[27] !== x ||
        g[28] !== z
          ? ((p = (0, t.jsxs)("button", {
              type: "button",
              id: B,
              "aria-expanded": T,
              "aria-controls": q,
              onClick: z,
              "data-slot": "disclosure-header",
              className: x,
              children: [h, u, b],
            })),
            (g[21] = B),
            (g[22] = T),
            (g[23] = q),
            (g[24] = h),
            (g[25] = u),
            (g[26] = b),
            (g[27] = x),
            (g[28] = z),
            (g[29] = p))
          : (p = g[29]));
      let P = !T;
      return (
        g[30] !== C
          ? ((m = (0, r.c)("border-t border-border-secondary", C)),
            (g[30] = C),
            (g[31] = m))
          : (m = g[31]),
        g[32] !== U || g[33] !== B || g[34] !== q || g[35] !== P || g[36] !== m
          ? ((y = (0, t.jsx)("div", {
              id: q,
              role: "region",
              "aria-labelledby": B,
              hidden: P,
              "data-slot": "disclosure-panel",
              className: m,
              children: U,
            })),
            (g[32] = U),
            (g[33] = B),
            (g[34] = q),
            (g[35] = P),
            (g[36] = m),
            (g[37] = y))
          : (y = g[37]),
        g[38] !== w ||
        g[39] !== p ||
        g[40] !== y ||
        g[41] !== O ||
        g[42] !== d ||
        g[43] !== E
          ? ((v = (0, t.jsxs)("div", {
              "data-disclosure": !0,
              "data-density": w,
              "data-open": O,
              "data-testid": E,
              className: d,
              children: [p, y],
            })),
            (g[38] = w),
            (g[39] = p),
            (g[40] = y),
            (g[41] = O),
            (g[42] = d),
            (g[43] = E),
            (g[44] = v))
          : (v = g[44]),
        v
      );
    },
  ]);
};
