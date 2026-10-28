// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(352386),
    a = e.i(338319);
  let n =
      "flex items-center gap-2 rounded-md border bg-bg-tertiary transition-colors focus-within:border-text-quaternary",
    i = { terminal: "h-8 px-2.5", comfortable: "h-11 px-3" },
    s = { valid: "border-border-tertiary", invalid: "border-loss" },
    o =
      "h-full w-full min-w-0 bg-transparent text-text-primary outline-none tabular-nums placeholder:text-text-quaternary disabled:cursor-not-allowed",
    u = { terminal: "text-[13px] leading-4", comfortable: "text-sm leading-5" },
    d = {
      terminal:
        "flex shrink-0 items-center gap-1 text-text-quaternary [&>svg]:size-3.5 [&>svg]:shrink-0",
      comfortable:
        "flex shrink-0 items-center gap-1.5 text-text-quaternary [&>svg]:size-4 [&>svg]:shrink-0",
    },
    c = "mt-1 text-xs leading-4",
    m = { valid: "text-text-tertiary", invalid: "text-loss" };
  e.s([
    "F",
    0,
    n,
    "D",
    0,
    s,
    "E",
    0,
    c,
    "m",
    0,
    m,
    "z",
    0,
    o,
    "g",
    0,
    u,
    "X",
    0,
    i,
    "N",
    0,
    function (e) {
      let f,
        p,
        h,
        y,
        g,
        x,
        I,
        v,
        w,
        b,
        A,
        N,
        k,
        C,
        E,
        _,
        R,
        T,
        j,
        F,
        P,
        D,
        S = (0, r.c)(54);
      S[0] !== e
        ? (({
            density: p,
            value: N,
            onValueChange: v,
            leading: I,
            trailing: A,
            invalid: b,
            helper: y,
            className: f,
            inputClassName: x,
            id: g,
            "aria-describedby": h,
            ...w
          } = e),
          (S[0] = e),
          (S[1] = f),
          (S[2] = p),
          (S[3] = h),
          (S[4] = y),
          (S[5] = g),
          (S[6] = x),
          (S[7] = I),
          (S[8] = v),
          (S[9] = w),
          (S[10] = b),
          (S[11] = A),
          (S[12] = N))
        : ((f = S[1]),
          (p = S[2]),
          (h = S[3]),
          (y = S[4]),
          (g = S[5]),
          (x = S[6]),
          (I = S[7]),
          (v = S[8]),
          (w = S[9]),
          (b = S[10]),
          (A = S[11]),
          (N = S[12]));
      let q = void 0 !== b && b,
        L = (0, l.useId)(),
        M = g ?? L,
        B = `${M}-helper`;
      S[13] !== h || S[14] !== y || S[15] !== B
        ? ((k = [h, y ? B : void 0].filter(Boolean).join(" ") || void 0),
          (S[13] = h),
          (S[14] = y),
          (S[15] = B),
          (S[16] = k))
        : (k = S[16]);
      let $ = k,
        O = q ? "" : void 0,
        U = i[p],
        Q = q ? s.invalid : s.valid;
      (S[17] !== f || S[18] !== U || S[19] !== Q
        ? ((C = (0, a.c)(n, U, Q, f)),
          (S[17] = f),
          (S[18] = U),
          (S[19] = Q),
          (S[20] = C))
        : (C = S[20]),
        S[21] !== p || S[22] !== I
          ? ((E = I
              ? (0, t.jsx)("span", { className: d[p], children: I })
              : null),
            (S[21] = p),
            (S[22] = I),
            (S[23] = E))
          : (E = S[23]),
        S[24] !== v
          ? ((_ = (e) => v(e.target.value)), (S[24] = v), (S[25] = _))
          : (_ = S[25]));
      let K = q || void 0,
        z = u[p];
      return (
        S[26] !== x || S[27] !== z
          ? ((R = (0, a.c)(o, z, x)), (S[26] = x), (S[27] = z), (S[28] = R))
          : (R = S[28]),
        S[29] !== $ ||
        S[30] !== M ||
        S[31] !== w ||
        S[32] !== R ||
        S[33] !== _ ||
        S[34] !== K ||
        S[35] !== N
          ? ((T = (0, t.jsx)("input", {
              id: M,
              value: N,
              onChange: _,
              "aria-invalid": K,
              "aria-describedby": $,
              className: R,
              ...w,
            })),
            (S[29] = $),
            (S[30] = M),
            (S[31] = w),
            (S[32] = R),
            (S[33] = _),
            (S[34] = K),
            (S[35] = N),
            (S[36] = T))
          : (T = S[36]),
        S[37] !== p || S[38] !== A
          ? ((j = A
              ? (0, t.jsx)("span", { className: d[p], children: A })
              : null),
            (S[37] = p),
            (S[38] = A),
            (S[39] = j))
          : (j = S[39]),
        S[40] !== T || S[41] !== j || S[42] !== C || S[43] !== E
          ? ((F = (0, t.jsxs)("div", { className: C, children: [E, T, j] })),
            (S[40] = T),
            (S[41] = j),
            (S[42] = C),
            (S[43] = E),
            (S[44] = F))
          : (F = S[44]),
        S[45] !== y || S[46] !== B || S[47] !== q
          ? ((P = y
              ? (0, t.jsx)("p", {
                  id: B,
                  className: (0, a.c)(c, q ? m.invalid : m.valid),
                  children: y,
                })
              : null),
            (S[45] = y),
            (S[46] = B),
            (S[47] = q),
            (S[48] = P))
          : (P = S[48]),
        S[49] !== p || S[50] !== F || S[51] !== P || S[52] !== O
          ? ((D = (0, t.jsxs)("div", {
              "data-density": p,
              "data-field": !0,
              "data-invalid": O,
              className: "flex min-w-0 flex-col",
              children: [F, P],
            })),
            (S[49] = p),
            (S[50] = F),
            (S[51] = P),
            (S[52] = O),
            (S[53] = D))
          : (D = S[53]),
        D
      );
    },
  ]);
};
