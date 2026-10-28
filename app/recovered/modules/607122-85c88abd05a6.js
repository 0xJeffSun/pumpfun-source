// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(352386),
    n = e.i(338319),
    r = e.i(813792);
  let s = { terminal: 24, comfortable: 28 },
    l =
      "inline-flex w-fit shrink-0 items-stretch gap-0.5 rounded-md border border-border-tertiary bg-bg-secondary p-0.5",
    o = { 24: "h-6", 28: "h-7", 32: "h-8" },
    c =
      "inline-flex min-w-0 items-center justify-center gap-1 whitespace-nowrap rounded-sm text-xs leading-4 font-medium text-text-tertiary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent aria-checked:bg-bg-tertiary aria-checked:text-text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-text-tertiary aria-disabled:cursor-not-allowed aria-disabled:opacity-40 aria-disabled:hover:text-text-tertiary [&>svg]:size-3.5 [&>svg]:shrink-0",
    d = "ml-0.5 inline-flex items-center border-l border-border-tertiary pl-1",
    m = { 24: "px-2", 28: "px-2.5", 32: "px-3" },
    u = {
      mint: "aria-checked:bg-bg-accent aria-checked:text-[var(--color-text-on-accent)]",
      gain: "aria-checked:bg-gain aria-checked:text-[var(--color-text-on-accent)]",
      loss: "aria-checked:bg-loss aria-checked:text-[var(--color-text-on-error)]",
    },
    p = new Set(["ArrowRight", "ArrowDown"]),
    f = new Set(["ArrowLeft", "ArrowUp"]);
  function x(e) {
    return !e.disabled;
  }
  e.s([
    "l",
    0,
    s,
    "C",
    0,
    c,
    "_",
    0,
    m,
    "f",
    0,
    l,
    "h",
    0,
    o,
    "w",
    0,
    d,
    "X",
    0,
    function (e) {
      let g,
        h,
        b,
        y,
        v,
        w,
        _,
        k,
        j,
        C = (0, i.c)(38),
        {
          density: N,
          size: S,
          value: P,
          onValueChange: V,
          options: A,
          fullWidth: T,
          trailing: L,
          className: $,
          optionClassName: z,
          "aria-label": O,
          "aria-labelledby": W,
        } = e,
        I = void 0 === S ? s[N] : S,
        F = void 0 !== T && T;
      C[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((g = new Map()), (C[0] = g))
        : (g = C[0]);
      let R = (0, a.useRef)(g);
      if (C[1] !== A || C[2] !== P) {
        let e;
        ((h = A.filter(x)),
          C[5] !== P
            ? ((e = (e) => e.value === P), (C[5] = P), (C[6] = e))
            : (e = C[6]),
          (b = h.findIndex(e)),
          (C[1] = A),
          (C[2] = P),
          (C[3] = h),
          (C[4] = b));
      } else ((h = C[3]), (b = C[4]));
      let K = b,
        q = h[K >= 0 ? K : 0]?.value;
      C[7] !== V
        ? ((y = (e) => {
            (V(e), R.current.get(e)?.focus());
          }),
          (C[7] = V),
          (C[8] = y))
        : (y = C[8]);
      let D = y;
      C[9] !== K || C[10] !== D || C[11] !== h || C[12] !== P
        ? ((v = (e) => {
            let t;
            if (
              0 === h.length ||
              ![...R.current.values()].some((t) => t === e.target)
            )
              return;
            let i = Math.max(K, 0);
            (p.has(e.key)
              ? (t = h[(i + 1) % h.length])
              : f.has(e.key)
                ? (t = h[(i - 1 + h.length) % h.length])
                : "Home" === e.key
                  ? (t = h[0])
                  : "End" === e.key && (t = h[h.length - 1]),
              t &&
                (e.preventDefault(),
                t.value !== P ? D(t.value) : R.current.get(t.value)?.focus()));
          }),
          (C[9] = K),
          (C[10] = D),
          (C[11] = h),
          (C[12] = P),
          (C[13] = v))
        : (v = C[13]);
      let Q = v,
        U = o[I],
        E = F && "flex w-full";
      return (
        C[14] !== $ || C[15] !== U || C[16] !== E
          ? ((w = (0, n.c)(l, U, E, $)),
            (C[14] = $),
            (C[15] = U),
            (C[16] = E),
            (C[17] = w))
          : (w = C[17]),
        C[18] !== D ||
        C[19] !== N ||
        C[20] !== F ||
        C[21] !== z ||
        C[22] !== A ||
        C[23] !== I ||
        C[24] !== q ||
        C[25] !== P
          ? ((_ = A.map((e) => {
              let i = e.value === P,
                a = (0, t.jsx)(
                  "button",
                  {
                    ref: (t) => {
                      t ? R.current.set(e.value, t) : R.current.delete(e.value);
                    },
                    type: "button",
                    role: "radio",
                    "aria-checked": i,
                    tabIndex: e.value === q ? 0 : -1,
                    disabled: (!!e.disabled && !e.disabledReason) || void 0,
                    "aria-disabled":
                      (!!e.disabled && !!e.disabledReason) || void 0,
                    title: e.title,
                    "data-tone": e.tone,
                    onClick: () => {
                      e.disabled || i || D(e.value);
                    },
                    className: (0, n.c)(
                      c,
                      m[I],
                      e.tone && u[e.tone],
                      F && "flex-1",
                      z,
                    ),
                    children: e.label,
                  },
                  e.value,
                ),
                s = e.tooltip ?? (e.disabled ? e.disabledReason : void 0);
              return s
                ? (0, t.jsx)(
                    r.f,
                    { content: s, density: N, children: a },
                    e.value,
                  )
                : a;
            })),
            (C[18] = D),
            (C[19] = N),
            (C[20] = F),
            (C[21] = z),
            (C[22] = A),
            (C[23] = I),
            (C[24] = q),
            (C[25] = P),
            (C[26] = _))
          : (_ = C[26]),
        C[27] !== L
          ? ((k = L ? (0, t.jsx)("span", { className: d, children: L }) : null),
            (C[27] = L),
            (C[28] = k))
          : (k = C[28]),
        C[29] !== O ||
        C[30] !== W ||
        C[31] !== N ||
        C[32] !== Q ||
        C[33] !== I ||
        C[34] !== k ||
        C[35] !== w ||
        C[36] !== _
          ? ((j = (0, t.jsxs)("div", {
              role: "radiogroup",
              "aria-label": O,
              "aria-labelledby": W,
              "data-density": N,
              "data-size": I,
              onKeyDown: Q,
              className: w,
              children: [_, k],
            })),
            (C[29] = O),
            (C[30] = W),
            (C[31] = N),
            (C[32] = Q),
            (C[33] = I),
            (C[34] = k),
            (C[35] = w),
            (C[36] = _),
            (C[37] = j))
          : (j = C[37]),
        j
      );
    },
  ]);
};
