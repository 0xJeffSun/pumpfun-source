// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    l = e.i(745018),
    r = e.i(352386),
    a = e.i(338319),
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
        m,
        f,
        y,
        h,
        p,
        x,
        b,
        v,
        g = (0, i.c)(45),
        {
          density: C,
          label: w,
          summary: k,
          open: _,
          defaultOpen: j,
          onOpenChange: A,
          bleed: I,
          className: S,
          headerClassName: N,
          panelClassName: E,
          children: U,
          "data-testid": B,
        } = e,
        [V, T] = (0, r.useState)(void 0 !== j && j),
        O = _ ?? V,
        R = (0, r.useId)(),
        P = (0, r.useId)();
      g[0] !== O || g[1] !== A || g[2] !== _
        ? ((d = () => {
            let e = !O;
            (void 0 === _ && T(e), A?.(e));
          }),
          (g[0] = O),
          (g[1] = A),
          (g[2] = _),
          (g[3] = d))
        : (d = g[3]);
      let M = d,
        L = O || void 0,
        F = void 0 !== I && I && n.z[C];
      g[4] !== S || g[5] !== F
        ? ((c = (0, a.c)(F, S)), (g[4] = S), (g[5] = F), (g[6] = c))
        : (c = g[6]);
      let z = o[C],
        D = n.U[C];
      (g[7] !== N || g[8] !== z || g[9] !== D
        ? ((u = (0, a.c)(
            "flex w-full items-center gap-2 border-t border-border-secondary text-left font-medium text-text-primary transition-colors hover:bg-bg-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text-accent",
            z,
            D,
            N,
          )),
          (g[7] = N),
          (g[8] = z),
          (g[9] = D),
          (g[10] = u))
        : (u = g[10]),
        g[11] !== w
          ? ((m = (0, t.jsx)("span", { className: "shrink-0", children: w })),
            (g[11] = w),
            (g[12] = m))
          : (m = g[12]),
        g[13] !== C || g[14] !== O || g[15] !== k
          ? ((f =
              null == k || O
                ? null
                : (0, t.jsx)("span", {
                    "data-slot": "disclosure-summary",
                    className: s[C],
                    children: k,
                  })),
            (g[13] = C),
            (g[14] = O),
            (g[15] = k),
            (g[16] = f))
          : (f = g[16]));
      let $ = O && "rotate-180";
      (g[17] !== $
        ? ((y = (0, a.c)(
            "ml-auto size-3.5 shrink-0 text-text-quaternary transition-transform",
            $,
          )),
          (g[17] = $),
          (g[18] = y))
        : (y = g[18]),
        g[19] !== y
          ? ((h = (0, t.jsx)(l.vY, { "aria-hidden": !0, className: y })),
            (g[19] = y),
            (g[20] = h))
          : (h = g[20]),
        g[21] !== R ||
        g[22] !== O ||
        g[23] !== P ||
        g[24] !== m ||
        g[25] !== f ||
        g[26] !== h ||
        g[27] !== u ||
        g[28] !== M
          ? ((p = (0, t.jsxs)("button", {
              type: "button",
              id: R,
              "aria-expanded": O,
              "aria-controls": P,
              onClick: M,
              "data-slot": "disclosure-header",
              className: u,
              children: [m, f, h],
            })),
            (g[21] = R),
            (g[22] = O),
            (g[23] = P),
            (g[24] = m),
            (g[25] = f),
            (g[26] = h),
            (g[27] = u),
            (g[28] = M),
            (g[29] = p))
          : (p = g[29]));
      let W = !O;
      return (
        g[30] !== E
          ? ((x = (0, a.c)("border-t border-border-secondary", E)),
            (g[30] = E),
            (g[31] = x))
          : (x = g[31]),
        g[32] !== U || g[33] !== R || g[34] !== P || g[35] !== W || g[36] !== x
          ? ((b = (0, t.jsx)("div", {
              id: P,
              role: "region",
              "aria-labelledby": R,
              hidden: W,
              "data-slot": "disclosure-panel",
              className: x,
              children: U,
            })),
            (g[32] = U),
            (g[33] = R),
            (g[34] = P),
            (g[35] = W),
            (g[36] = x),
            (g[37] = b))
          : (b = g[37]),
        g[38] !== C ||
        g[39] !== p ||
        g[40] !== b ||
        g[41] !== L ||
        g[42] !== c ||
        g[43] !== B
          ? ((v = (0, t.jsxs)("div", {
              "data-disclosure": !0,
              "data-density": C,
              "data-open": L,
              "data-testid": B,
              className: c,
              children: [p, b],
            })),
            (g[38] = C),
            (g[39] = p),
            (g[40] = b),
            (g[41] = L),
            (g[42] = c),
            (g[43] = B),
            (g[44] = v))
          : (v = g[44]),
        v
      );
    },
  ]);
};
