// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(745018),
    i = e.i(352386),
    l = e.i(338319),
    n = e.i(606178);
  let o = {
      terminal: "h-9 text-[13px] leading-4",
      comfortable: "h-11 text-sm leading-5",
    },
    s = {
      terminal:
        "min-w-0 flex-1 truncate text-xs font-normal leading-4 tabular-nums text-text-tertiary",
      comfortable:
        "min-w-0 flex-1 truncate text-[13px] font-normal leading-[18px] tabular-nums text-text-tertiary",
    };
  e.s([
    "DISCLOSURE_HEADER_SIZE_CLASS",
    0,
    o,
    "Disclosure",
    0,
    function (e) {
      let d,
        c,
        u,
        f,
        m,
        p,
        b,
        h,
        v,
        x,
        g,
        y = (0, r.c)(45),
        {
          density: w,
          label: j,
          summary: N,
          open: R,
          defaultOpen: k,
          onOpenChange: _,
          bleed: A,
          className: S,
          headerClassName: C,
          panelClassName: I,
          children: T,
          "data-testid": E,
        } = e,
        [F, D] = (0, i.useState)(void 0 !== k && k),
        M = R ?? F,
        K = (0, i.useId)(),
        L = (0, i.useId)();
      y[0] !== M || y[1] !== _ || y[2] !== R
        ? ((d = () => {
            let e = !M;
            (void 0 === R && D(e), _?.(e));
          }),
          (y[0] = M),
          (y[1] = _),
          (y[2] = R),
          (y[3] = d))
        : (d = y[3]);
      let P = d,
        V = M || void 0,
        O = void 0 !== A && A && n.z[w];
      y[4] !== S || y[5] !== O
        ? ((c = (0, l.c)(O, S)), (y[4] = S), (y[5] = O), (y[6] = c))
        : (c = y[6]);
      let $ = o[w],
        U = n.U[w];
      (y[7] !== C || y[8] !== $ || y[9] !== U
        ? ((u = (0, l.c)(
            "flex w-full items-center gap-2 border-t border-border-secondary text-left font-medium text-text-primary transition-colors hover:bg-bg-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text-accent",
            $,
            U,
            C,
          )),
          (y[7] = C),
          (y[8] = $),
          (y[9] = U),
          (y[10] = u))
        : (u = y[10]),
        y[11] !== j
          ? ((f = (0, t.jsx)("span", { className: "shrink-0", children: j })),
            (y[11] = j),
            (y[12] = f))
          : (f = y[12]),
        y[13] !== w || y[14] !== M || y[15] !== N
          ? ((m =
              null == N || M
                ? null
                : (0, t.jsx)("span", {
                    "data-slot": "disclosure-summary",
                    className: s[w],
                    children: N,
                  })),
            (y[13] = w),
            (y[14] = M),
            (y[15] = N),
            (y[16] = m))
          : (m = y[16]));
      let B = M && "rotate-180";
      (y[17] !== B
        ? ((p = (0, l.c)(
            "ml-auto size-3.5 shrink-0 text-text-quaternary transition-transform",
            B,
          )),
          (y[17] = B),
          (y[18] = p))
        : (p = y[18]),
        y[19] !== p
          ? ((b = (0, t.jsx)(a.vY, { "aria-hidden": !0, className: p })),
            (y[19] = p),
            (y[20] = b))
          : (b = y[20]),
        y[21] !== K ||
        y[22] !== M ||
        y[23] !== L ||
        y[24] !== f ||
        y[25] !== m ||
        y[26] !== b ||
        y[27] !== u ||
        y[28] !== P
          ? ((h = (0, t.jsxs)("button", {
              type: "button",
              id: K,
              "aria-expanded": M,
              "aria-controls": L,
              onClick: P,
              "data-slot": "disclosure-header",
              className: u,
              children: [f, m, b],
            })),
            (y[21] = K),
            (y[22] = M),
            (y[23] = L),
            (y[24] = f),
            (y[25] = m),
            (y[26] = b),
            (y[27] = u),
            (y[28] = P),
            (y[29] = h))
          : (h = y[29]));
      let z = !M;
      return (
        y[30] !== I
          ? ((v = (0, l.c)("border-t border-border-secondary", I)),
            (y[30] = I),
            (y[31] = v))
          : (v = y[31]),
        y[32] !== T || y[33] !== K || y[34] !== L || y[35] !== z || y[36] !== v
          ? ((x = (0, t.jsx)("div", {
              id: L,
              role: "region",
              "aria-labelledby": K,
              hidden: z,
              "data-slot": "disclosure-panel",
              className: v,
              children: T,
            })),
            (y[32] = T),
            (y[33] = K),
            (y[34] = L),
            (y[35] = z),
            (y[36] = v),
            (y[37] = x))
          : (x = y[37]),
        y[38] !== w ||
        y[39] !== h ||
        y[40] !== x ||
        y[41] !== V ||
        y[42] !== c ||
        y[43] !== E
          ? ((g = (0, t.jsxs)("div", {
              "data-disclosure": !0,
              "data-density": w,
              "data-open": V,
              "data-testid": E,
              className: c,
              children: [h, x],
            })),
            (y[38] = w),
            (y[39] = h),
            (y[40] = x),
            (y[41] = V),
            (y[42] = c),
            (y[43] = E),
            (y[44] = g))
          : (g = y[44]),
        g
      );
    },
  ]);
};
