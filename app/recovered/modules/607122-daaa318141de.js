// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(352386),
    i = e.i(338319),
    l = e.i(813792);
  let n = { terminal: 24, comfortable: 28 },
    o =
      "inline-flex w-fit shrink-0 items-stretch gap-0.5 rounded-md border border-border-tertiary bg-bg-secondary p-0.5",
    s = { 24: "h-6", 28: "h-7", 32: "h-8" },
    d =
      "inline-flex min-w-0 items-center justify-center gap-1 whitespace-nowrap rounded-sm text-xs leading-4 font-medium text-text-tertiary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent aria-checked:bg-bg-tertiary aria-checked:text-text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-text-tertiary aria-disabled:cursor-not-allowed aria-disabled:opacity-40 aria-disabled:hover:text-text-tertiary [&>svg]:size-3.5 [&>svg]:shrink-0",
    c = "ml-0.5 inline-flex items-center border-l border-border-tertiary pl-1",
    u = { 24: "px-2", 28: "px-2.5", 32: "px-3" },
    f = {
      mint: "aria-checked:bg-bg-accent aria-checked:text-[var(--color-text-on-accent)]",
      gain: "aria-checked:bg-gain aria-checked:text-[var(--color-text-on-accent)]",
      loss: "aria-checked:bg-loss aria-checked:text-[var(--color-text-on-error)]",
    },
    m = new Set(["ArrowRight", "ArrowDown"]),
    p = new Set(["ArrowLeft", "ArrowUp"]);
  function b(e) {
    return !e.disabled;
  }
  e.s([
    "l",
    0,
    n,
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
      let h,
        v,
        x,
        g,
        y,
        w,
        j,
        N,
        R,
        k = (0, r.c)(38),
        {
          density: _,
          size: A,
          value: S,
          onValueChange: C,
          options: I,
          fullWidth: T,
          trailing: E,
          className: F,
          optionClassName: D,
          "aria-label": M,
          "aria-labelledby": K,
        } = e,
        L = void 0 === A ? n[_] : A,
        P = void 0 !== T && T;
      k[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((h = new Map()), (k[0] = h))
        : (h = k[0]);
      let V = (0, a.useRef)(h);
      if (k[1] !== I || k[2] !== S) {
        let e;
        ((v = I.filter(b)),
          k[5] !== S
            ? ((e = (e) => e.value === S), (k[5] = S), (k[6] = e))
            : (e = k[6]),
          (x = v.findIndex(e)),
          (k[1] = I),
          (k[2] = S),
          (k[3] = v),
          (k[4] = x));
      } else ((v = k[3]), (x = k[4]));
      let O = x,
        $ = v[O >= 0 ? O : 0]?.value;
      k[7] !== C
        ? ((g = (e) => {
            (C(e), V.current.get(e)?.focus());
          }),
          (k[7] = C),
          (k[8] = g))
        : (g = k[8]);
      let U = g;
      k[9] !== O || k[10] !== U || k[11] !== v || k[12] !== S
        ? ((y = (e) => {
            let t;
            if (
              0 === v.length ||
              ![...V.current.values()].some((t) => t === e.target)
            )
              return;
            let r = Math.max(O, 0);
            (m.has(e.key)
              ? (t = v[(r + 1) % v.length])
              : p.has(e.key)
                ? (t = v[(r - 1 + v.length) % v.length])
                : "Home" === e.key
                  ? (t = v[0])
                  : "End" === e.key && (t = v[v.length - 1]),
              t &&
                (e.preventDefault(),
                t.value !== S ? U(t.value) : V.current.get(t.value)?.focus()));
          }),
          (k[9] = O),
          (k[10] = U),
          (k[11] = v),
          (k[12] = S),
          (k[13] = y))
        : (y = k[13]);
      let B = y,
        z = s[L],
        G = P && "flex w-full";
      return (
        k[14] !== F || k[15] !== z || k[16] !== G
          ? ((w = (0, i.c)(o, z, G, F)),
            (k[14] = F),
            (k[15] = z),
            (k[16] = G),
            (k[17] = w))
          : (w = k[17]),
        k[18] !== U ||
        k[19] !== _ ||
        k[20] !== P ||
        k[21] !== D ||
        k[22] !== I ||
        k[23] !== L ||
        k[24] !== $ ||
        k[25] !== S
          ? ((j = I.map((e) => {
              let r = e.value === S,
                a = (0, t.jsx)(
                  "button",
                  {
                    ref: (t) => {
                      t ? V.current.set(e.value, t) : V.current.delete(e.value);
                    },
                    type: "button",
                    role: "radio",
                    "aria-checked": r,
                    tabIndex: e.value === $ ? 0 : -1,
                    disabled: (!!e.disabled && !e.disabledReason) || void 0,
                    "aria-disabled":
                      (!!e.disabled && !!e.disabledReason) || void 0,
                    title: e.title,
                    "data-tone": e.tone,
                    onClick: () => {
                      e.disabled || r || U(e.value);
                    },
                    className: (0, i.c)(
                      d,
                      u[L],
                      e.tone && f[e.tone],
                      P && "flex-1",
                      D,
                    ),
                    children: e.label,
                  },
                  e.value,
                ),
                n = e.tooltip ?? (e.disabled ? e.disabledReason : void 0);
              return n
                ? (0, t.jsx)(
                    l.f,
                    { content: n, density: _, children: a },
                    e.value,
                  )
                : a;
            })),
            (k[18] = U),
            (k[19] = _),
            (k[20] = P),
            (k[21] = D),
            (k[22] = I),
            (k[23] = L),
            (k[24] = $),
            (k[25] = S),
            (k[26] = j))
          : (j = k[26]),
        k[27] !== E
          ? ((N = E ? (0, t.jsx)("span", { className: c, children: E }) : null),
            (k[27] = E),
            (k[28] = N))
          : (N = k[28]),
        k[29] !== M ||
        k[30] !== K ||
        k[31] !== _ ||
        k[32] !== B ||
        k[33] !== L ||
        k[34] !== N ||
        k[35] !== w ||
        k[36] !== j
          ? ((R = (0, t.jsxs)("div", {
              role: "radiogroup",
              "aria-label": M,
              "aria-labelledby": K,
              "data-density": _,
              "data-size": L,
              onKeyDown: B,
              className: w,
              children: [j, N],
            })),
            (k[29] = M),
            (k[30] = K),
            (k[31] = _),
            (k[32] = B),
            (k[33] = L),
            (k[34] = N),
            (k[35] = w),
            (k[36] = j),
            (k[37] = R))
          : (R = k[37]),
        R
      );
    },
  ]);
};
