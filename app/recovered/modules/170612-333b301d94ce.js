// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    l = e.i(745018),
    i = e.i(352386),
    a = e.i(338319),
    r = e.i(606178);
  let s = {
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
    s,
    "Disclosure",
    0,
    function (e) {
      let u,
        c,
        d,
        m,
        b,
        f,
        y,
        h,
        v,
        p,
        g,
        x = (0, n.c)(45),
        {
          density: _,
          label: k,
          summary: w,
          open: S,
          defaultOpen: N,
          onOpenChange: q,
          bleed: C,
          className: I,
          headerClassName: j,
          panelClassName: $,
          children: E,
          "data-testid": L,
        } = e,
        [P, R] = (0, i.useState)(void 0 !== N && N),
        D = S ?? P,
        T = (0, i.useId)(),
        A = (0, i.useId)();
      x[0] !== D || x[1] !== q || x[2] !== S
        ? ((u = () => {
            let e = !D;
            (void 0 === S && R(e), q?.(e));
          }),
          (x[0] = D),
          (x[1] = q),
          (x[2] = S),
          (x[3] = u))
        : (u = x[3]);
      let F = u,
        U = D || void 0,
        B = void 0 !== C && C && r.z[_];
      x[4] !== I || x[5] !== B
        ? ((c = (0, a.c)(B, I)), (x[4] = I), (x[5] = B), (x[6] = c))
        : (c = x[6]);
      let M = s[_],
        O = r.U[_];
      (x[7] !== j || x[8] !== M || x[9] !== O
        ? ((d = (0, a.c)(
            "flex w-full items-center gap-2 border-t border-border-secondary text-left font-medium text-text-primary transition-colors hover:bg-bg-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text-accent",
            M,
            O,
            j,
          )),
          (x[7] = j),
          (x[8] = M),
          (x[9] = O),
          (x[10] = d))
        : (d = x[10]),
        x[11] !== k
          ? ((m = (0, t.jsx)("span", { className: "shrink-0", children: k })),
            (x[11] = k),
            (x[12] = m))
          : (m = x[12]),
        x[13] !== _ || x[14] !== D || x[15] !== w
          ? ((b =
              null == w || D
                ? null
                : (0, t.jsx)("span", {
                    "data-slot": "disclosure-summary",
                    className: o[_],
                    children: w,
                  })),
            (x[13] = _),
            (x[14] = D),
            (x[15] = w),
            (x[16] = b))
          : (b = x[16]));
      let z = D && "rotate-180";
      (x[17] !== z
        ? ((f = (0, a.c)(
            "ml-auto size-3.5 shrink-0 text-text-quaternary transition-transform",
            z,
          )),
          (x[17] = z),
          (x[18] = f))
        : (f = x[18]),
        x[19] !== f
          ? ((y = (0, t.jsx)(l.vY, { "aria-hidden": !0, className: f })),
            (x[19] = f),
            (x[20] = y))
          : (y = x[20]),
        x[21] !== T ||
        x[22] !== D ||
        x[23] !== A ||
        x[24] !== m ||
        x[25] !== b ||
        x[26] !== y ||
        x[27] !== d ||
        x[28] !== F
          ? ((h = (0, t.jsxs)("button", {
              type: "button",
              id: T,
              "aria-expanded": D,
              "aria-controls": A,
              onClick: F,
              "data-slot": "disclosure-header",
              className: d,
              children: [m, b, y],
            })),
            (x[21] = T),
            (x[22] = D),
            (x[23] = A),
            (x[24] = m),
            (x[25] = b),
            (x[26] = y),
            (x[27] = d),
            (x[28] = F),
            (x[29] = h))
          : (h = x[29]));
      let H = !D;
      return (
        x[30] !== $
          ? ((v = (0, a.c)("border-t border-border-secondary", $)),
            (x[30] = $),
            (x[31] = v))
          : (v = x[31]),
        x[32] !== E || x[33] !== T || x[34] !== A || x[35] !== H || x[36] !== v
          ? ((p = (0, t.jsx)("div", {
              id: A,
              role: "region",
              "aria-labelledby": T,
              hidden: H,
              "data-slot": "disclosure-panel",
              className: v,
              children: E,
            })),
            (x[32] = E),
            (x[33] = T),
            (x[34] = A),
            (x[35] = H),
            (x[36] = v),
            (x[37] = p))
          : (p = x[37]),
        x[38] !== _ ||
        x[39] !== h ||
        x[40] !== p ||
        x[41] !== U ||
        x[42] !== c ||
        x[43] !== L
          ? ((g = (0, t.jsxs)("div", {
              "data-disclosure": !0,
              "data-density": _,
              "data-open": U,
              "data-testid": L,
              className: c,
              children: [h, p],
            })),
            (x[38] = _),
            (x[39] = h),
            (x[40] = p),
            (x[41] = U),
            (x[42] = c),
            (x[43] = L),
            (x[44] = g))
          : (g = x[44]),
        g
      );
    },
  ]);
};
