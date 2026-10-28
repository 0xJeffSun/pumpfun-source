// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(352386),
    a = e.i(338319),
    n = e.i(813792);
  let l = { terminal: 24, comfortable: 28 },
    o =
      "inline-flex w-fit shrink-0 items-stretch gap-0.5 rounded-md border border-border-tertiary bg-bg-secondary p-0.5",
    s = { 24: "h-6", 28: "h-7", 32: "h-8" },
    d =
      "inline-flex min-w-0 items-center justify-center gap-1 whitespace-nowrap rounded-sm text-xs leading-4 font-medium text-text-tertiary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent aria-checked:bg-bg-tertiary aria-checked:text-text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-text-tertiary aria-disabled:cursor-not-allowed aria-disabled:opacity-40 aria-disabled:hover:text-text-tertiary [&>svg]:size-3.5 [&>svg]:shrink-0",
    c = "ml-0.5 inline-flex items-center border-l border-border-tertiary pl-1",
    u = { 24: "px-2", 28: "px-2.5", 32: "px-3" },
    p = {
      mint: "aria-checked:bg-bg-accent aria-checked:text-[var(--color-text-on-accent)]",
      gain: "aria-checked:bg-gain aria-checked:text-[var(--color-text-on-accent)]",
      loss: "aria-checked:bg-loss aria-checked:text-[var(--color-text-on-error)]",
    },
    m = new Set(["ArrowRight", "ArrowDown"]),
    x = new Set(["ArrowLeft", "ArrowUp"]);
  function b(e) {
    return !e.disabled;
  }
  e.s([
    "l",
    0,
    l,
    "C",
    0,
    d,
    "_",
    0,
    u,
    "f",
    0,
    o,
    "h",
    0,
    s,
    "w",
    0,
    c,
    "X",
    0,
    function (e) {
      let f,
        h,
        v,
        y,
        g,
        _,
        w,
        k,
        N,
        I = (0, i.c)(38),
        {
          density: S,
          size: A,
          value: j,
          onValueChange: $,
          options: U,
          fullWidth: F,
          trailing: C,
          className: T,
          optionClassName: E,
          "aria-label": z,
          "aria-labelledby": q,
        } = e,
        R = void 0 === A ? l[S] : A,
        D = void 0 !== F && F;
      I[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((f = new Map()), (I[0] = f))
        : (f = I[0]);
      let M = (0, r.useRef)(f);
      if (I[1] !== U || I[2] !== j) {
        let e;
        ((h = U.filter(b)),
          I[5] !== j
            ? ((e = (e) => e.value === j), (I[5] = j), (I[6] = e))
            : (e = I[6]),
          (v = h.findIndex(e)),
          (I[1] = U),
          (I[2] = j),
          (I[3] = h),
          (I[4] = v));
      } else ((h = I[3]), (v = I[4]));
      let O = v,
        K = h[O >= 0 ? O : 0]?.value;
      I[7] !== $
        ? ((y = (e) => {
            ($(e), M.current.get(e)?.focus());
          }),
          (I[7] = $),
          (I[8] = y))
        : (y = I[8]);
      let P = y;
      I[9] !== O || I[10] !== P || I[11] !== h || I[12] !== j
        ? ((g = (e) => {
            let t;
            if (
              0 === h.length ||
              ![...M.current.values()].some((t) => t === e.target)
            )
              return;
            let i = Math.max(O, 0);
            (m.has(e.key)
              ? (t = h[(i + 1) % h.length])
              : x.has(e.key)
                ? (t = h[(i - 1 + h.length) % h.length])
                : "Home" === e.key
                  ? (t = h[0])
                  : "End" === e.key && (t = h[h.length - 1]),
              t &&
                (e.preventDefault(),
                t.value !== j ? P(t.value) : M.current.get(t.value)?.focus()));
          }),
          (I[9] = O),
          (I[10] = P),
          (I[11] = h),
          (I[12] = j),
          (I[13] = g))
        : (g = I[13]);
      let B = g,
        W = s[R],
        L = D && "flex w-full";
      return (
        I[14] !== T || I[15] !== W || I[16] !== L
          ? ((_ = (0, a.c)(o, W, L, T)),
            (I[14] = T),
            (I[15] = W),
            (I[16] = L),
            (I[17] = _))
          : (_ = I[17]),
        I[18] !== P ||
        I[19] !== S ||
        I[20] !== D ||
        I[21] !== E ||
        I[22] !== U ||
        I[23] !== R ||
        I[24] !== K ||
        I[25] !== j
          ? ((w = U.map((e) => {
              let i = e.value === j,
                r = (0, t.jsx)(
                  "button",
                  {
                    ref: (t) => {
                      t ? M.current.set(e.value, t) : M.current.delete(e.value);
                    },
                    type: "button",
                    role: "radio",
                    "aria-checked": i,
                    tabIndex: e.value === K ? 0 : -1,
                    disabled: (!!e.disabled && !e.disabledReason) || void 0,
                    "aria-disabled":
                      (!!e.disabled && !!e.disabledReason) || void 0,
                    title: e.title,
                    "data-tone": e.tone,
                    onClick: () => {
                      e.disabled || i || P(e.value);
                    },
                    className: (0, a.c)(
                      d,
                      u[R],
                      e.tone && p[e.tone],
                      D && "flex-1",
                      E,
                    ),
                    children: e.label,
                  },
                  e.value,
                ),
                l = e.tooltip ?? (e.disabled ? e.disabledReason : void 0);
              return l
                ? (0, t.jsx)(
                    n.f,
                    { content: l, density: S, children: r },
                    e.value,
                  )
                : r;
            })),
            (I[18] = P),
            (I[19] = S),
            (I[20] = D),
            (I[21] = E),
            (I[22] = U),
            (I[23] = R),
            (I[24] = K),
            (I[25] = j),
            (I[26] = w))
          : (w = I[26]),
        I[27] !== C
          ? ((k = C ? (0, t.jsx)("span", { className: c, children: C }) : null),
            (I[27] = C),
            (I[28] = k))
          : (k = I[28]),
        I[29] !== z ||
        I[30] !== q ||
        I[31] !== S ||
        I[32] !== B ||
        I[33] !== R ||
        I[34] !== k ||
        I[35] !== _ ||
        I[36] !== w
          ? ((N = (0, t.jsxs)("div", {
              role: "radiogroup",
              "aria-label": z,
              "aria-labelledby": q,
              "data-density": S,
              "data-size": R,
              onKeyDown: B,
              className: _,
              children: [w, k],
            })),
            (I[29] = z),
            (I[30] = q),
            (I[31] = S),
            (I[32] = B),
            (I[33] = R),
            (I[34] = k),
            (I[35] = _),
            (I[36] = w),
            (I[37] = N))
          : (N = I[37]),
        N
      );
    },
  ]);
};
