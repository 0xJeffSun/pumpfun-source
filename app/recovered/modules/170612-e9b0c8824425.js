// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(745018),
    l = e.i(352386),
    n = e.i(338319),
    a = e.i(606178);
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
      let d,
        c,
        u,
        m,
        h,
        f,
        x,
        p,
        y,
        v,
        w,
        b = (0, r.c)(45),
        {
          density: g,
          label: j,
          summary: _,
          open: k,
          defaultOpen: C,
          onOpenChange: N,
          bleed: A,
          className: I,
          headerClassName: S,
          panelClassName: E,
          children: L,
          "data-testid": U,
        } = e,
        [B, P] = (0, l.useState)(void 0 !== C && C),
        R = k ?? B,
        T = (0, l.useId)(),
        V = (0, l.useId)();
      b[0] !== R || b[1] !== N || b[2] !== k
        ? ((d = () => {
            let e = !R;
            (void 0 === k && P(e), N?.(e));
          }),
          (b[0] = R),
          (b[1] = N),
          (b[2] = k),
          (b[3] = d))
        : (d = b[3]);
      let M = d,
        $ = R || void 0,
        D = void 0 !== A && A && a.z[g];
      b[4] !== I || b[5] !== D
        ? ((c = (0, n.c)(D, I)), (b[4] = I), (b[5] = D), (b[6] = c))
        : (c = b[6]);
      let z = s[g],
        F = a.U[g];
      (b[7] !== S || b[8] !== z || b[9] !== F
        ? ((u = (0, n.c)(
            "flex w-full items-center gap-2 border-t border-border-secondary text-left font-medium text-text-primary transition-colors hover:bg-bg-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text-accent",
            z,
            F,
            S,
          )),
          (b[7] = S),
          (b[8] = z),
          (b[9] = F),
          (b[10] = u))
        : (u = b[10]),
        b[11] !== j
          ? ((m = (0, t.jsx)("span", { className: "shrink-0", children: j })),
            (b[11] = j),
            (b[12] = m))
          : (m = b[12]),
        b[13] !== g || b[14] !== R || b[15] !== _
          ? ((h =
              null == _ || R
                ? null
                : (0, t.jsx)("span", {
                    "data-slot": "disclosure-summary",
                    className: o[g],
                    children: _,
                  })),
            (b[13] = g),
            (b[14] = R),
            (b[15] = _),
            (b[16] = h))
          : (h = b[16]));
      let H = R && "rotate-180";
      (b[17] !== H
        ? ((f = (0, n.c)(
            "ml-auto size-3.5 shrink-0 text-text-quaternary transition-transform",
            H,
          )),
          (b[17] = H),
          (b[18] = f))
        : (f = b[18]),
        b[19] !== f
          ? ((x = (0, t.jsx)(i.vY, { "aria-hidden": !0, className: f })),
            (b[19] = f),
            (b[20] = x))
          : (x = b[20]),
        b[21] !== T ||
        b[22] !== R ||
        b[23] !== V ||
        b[24] !== m ||
        b[25] !== h ||
        b[26] !== x ||
        b[27] !== u ||
        b[28] !== M
          ? ((p = (0, t.jsxs)("button", {
              type: "button",
              id: T,
              "aria-expanded": R,
              "aria-controls": V,
              onClick: M,
              "data-slot": "disclosure-header",
              className: u,
              children: [m, h, x],
            })),
            (b[21] = T),
            (b[22] = R),
            (b[23] = V),
            (b[24] = m),
            (b[25] = h),
            (b[26] = x),
            (b[27] = u),
            (b[28] = M),
            (b[29] = p))
          : (p = b[29]));
      let q = !R;
      return (
        b[30] !== E
          ? ((y = (0, n.c)("border-t border-border-secondary", E)),
            (b[30] = E),
            (b[31] = y))
          : (y = b[31]),
        b[32] !== L || b[33] !== T || b[34] !== V || b[35] !== q || b[36] !== y
          ? ((v = (0, t.jsx)("div", {
              id: V,
              role: "region",
              "aria-labelledby": T,
              hidden: q,
              "data-slot": "disclosure-panel",
              className: y,
              children: L,
            })),
            (b[32] = L),
            (b[33] = T),
            (b[34] = V),
            (b[35] = q),
            (b[36] = y),
            (b[37] = v))
          : (v = b[37]),
        b[38] !== g ||
        b[39] !== p ||
        b[40] !== v ||
        b[41] !== $ ||
        b[42] !== c ||
        b[43] !== U
          ? ((w = (0, t.jsxs)("div", {
              "data-disclosure": !0,
              "data-density": g,
              "data-open": $,
              "data-testid": U,
              className: c,
              children: [p, v],
            })),
            (b[38] = g),
            (b[39] = p),
            (b[40] = v),
            (b[41] = $),
            (b[42] = c),
            (b[43] = U),
            (b[44] = w))
          : (w = b[44]),
        w
      );
    },
  ]);
};
