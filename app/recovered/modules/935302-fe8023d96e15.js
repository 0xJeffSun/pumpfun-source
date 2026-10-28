// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(745018),
    n = e.i(352386);
  e.i(12692);
  var a = e.i(398902),
    i = e.i(338319),
    s = e.i(51206);
  let u =
      "relative flex min-w-0 items-center rounded-md border border-border-tertiary bg-bg-tertiary transition-colors focus-within:border-text-quaternary",
    o = { terminal: "h-7", comfortable: "h-8" },
    c = {
      terminal:
        "pointer-events-none absolute left-2 size-3.5 text-text-quaternary",
      comfortable:
        "pointer-events-none absolute left-2.5 size-3.5 text-text-quaternary",
    },
    d = {
      terminal: "pl-7 text-[12px] leading-4",
      comfortable: "pl-8 text-[13px] leading-[18px]",
    },
    f = {
      terminal: { clear: "pr-7", plain: "pr-2" },
      comfortable: { clear: "pr-8", plain: "pr-2.5" },
    },
    p = { terminal: 20, comfortable: 24 },
    m = { clear: "pr-14", plain: "pr-5" };
  e.s([
    "R",
    0,
    u,
    "g",
    0,
    { terminal: "min-w-24", comfortable: "min-w-28" },
    "y",
    0,
    { terminal: 96, comfortable: 112 },
    "H",
    0,
    c,
    "q",
    0,
    d,
    "L",
    0,
    o,
    "o",
    0,
    function (e) {
      let h,
        b,
        g,
        y,
        v,
        S,
        x,
        w,
        N,
        E,
        M,
        I,
        O,
        T,
        _,
        j,
        R,
        k,
        A,
        C = (0, r.c)(44);
      C[0] !== e
        ? (({
            density: b,
            size: N,
            value: E,
            onValueChange: x,
            label: v,
            onClear: S,
            inputRef: g,
            className: h,
            inputClassName: y,
            ...w
          } = e),
          (C[0] = e),
          (C[1] = h),
          (C[2] = b),
          (C[3] = g),
          (C[4] = y),
          (C[5] = v),
          (C[6] = S),
          (C[7] = x),
          (C[8] = w),
          (C[9] = N),
          (C[10] = E))
        : ((h = C[1]),
          (b = C[2]),
          (g = C[3]),
          (y = C[4]),
          (v = C[5]),
          (S = C[6]),
          (x = C[7]),
          (w = C[8]),
          (N = C[9]),
          (E = C[10]));
      let { t: D } = (0, a.f)(),
        q = (0, n.useRef)(null);
      (C[11] === Symbol.for("react.memo_cache_sentinel")
        ? ((M = () => q.current), (I = []), (C[11] = M), (C[12] = I))
        : ((M = C[11]), (I = C[12])),
        (0, n.useImperativeHandle)(g, M, I));
      let U = E.length > 0,
        z = "hero" === N,
        L = z ? m : f[b],
        P = z ? "h-14" : o[b];
      C[13] !== h || C[14] !== P
        ? ((O = (0, i.c)(u, P, h)), (C[13] = h), (C[14] = P), (C[15] = O))
        : (O = C[15]);
      let F = z
        ? "pointer-events-none absolute left-5 size-4 text-text-quaternary"
        : c[b];
      (C[16] !== F
        ? ((T = (0, t.jsx)(l.L3, { "aria-hidden": !0, className: F })),
          (C[16] = F),
          (C[17] = T))
        : (T = C[17]),
        C[18] !== x
          ? ((_ = (e) => x(e.target.value)), (C[18] = x), (C[19] = _))
          : (_ = C[19]));
      let B = z ? "pl-12 text-base leading-6" : d[b],
        $ = U ? L.clear : L.plain;
      return (
        C[20] !== y || C[21] !== B || C[22] !== $
          ? ((j = (0, i.c)(
              "h-full w-full min-w-0 truncate bg-transparent text-text-primary outline-none placeholder:truncate placeholder:text-text-quaternary [&::-webkit-search-cancel-button]:appearance-none",
              B,
              $,
              y,
            )),
            (C[20] = y),
            (C[21] = B),
            (C[22] = $),
            (C[23] = j))
          : (j = C[23]),
        C[24] !== v || C[25] !== w || C[26] !== _ || C[27] !== j || C[28] !== E
          ? ((R = (0, t.jsx)("input", {
              ref: q,
              type: "search",
              value: E,
              onChange: _,
              placeholder: v,
              "aria-label": v,
              className: j,
              ...w,
            })),
            (C[24] = v),
            (C[25] = w),
            (C[26] = _),
            (C[27] = j),
            (C[28] = E),
            (C[29] = R))
          : (R = C[29]),
        C[30] !== b ||
        C[31] !== U ||
        C[32] !== z ||
        C[33] !== S ||
        C[34] !== x ||
        C[35] !== D
          ? ((k = U
              ? (0, t.jsx)(s._, {
                  density: b,
                  size: z ? 32 : p[b],
                  variant: "ghost",
                  "aria-label": D("common.clear"),
                  className: z ? "absolute right-3" : "absolute right-1",
                  onClick: () => {
                    (x(""), S?.(), q.current?.focus());
                  },
                  children: (0, t.jsx)(l.AD, { "aria-hidden": !0 }),
                })
              : null),
            (C[30] = b),
            (C[31] = U),
            (C[32] = z),
            (C[33] = S),
            (C[34] = x),
            (C[35] = D),
            (C[36] = k))
          : (k = C[36]),
        C[37] !== b ||
        C[38] !== N ||
        C[39] !== R ||
        C[40] !== k ||
        C[41] !== O ||
        C[42] !== T
          ? ((A = (0, t.jsxs)("div", {
              "data-density": b,
              "data-size": N,
              "data-search-well": !0,
              className: O,
              children: [T, R, k],
            })),
            (C[37] = b),
            (C[38] = N),
            (C[39] = R),
            (C[40] = k),
            (C[41] = O),
            (C[42] = T),
            (C[43] = A))
          : (A = C[43]),
        A
      );
    },
  ]);
};
