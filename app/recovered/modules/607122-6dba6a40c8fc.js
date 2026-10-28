// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(352386),
    l = e.i(338319),
    r = e.i(813792);
  let n = { terminal: 24, comfortable: 28 },
    o =
      "inline-flex w-fit shrink-0 items-stretch gap-0.5 rounded-md border border-border-tertiary bg-bg-secondary p-0.5",
    s = { 24: "h-6", 28: "h-7", 32: "h-8" },
    d =
      "inline-flex min-w-0 items-center justify-center gap-1 whitespace-nowrap rounded-sm text-xs leading-4 font-medium text-text-tertiary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent aria-checked:bg-bg-tertiary aria-checked:text-text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-text-tertiary aria-disabled:cursor-not-allowed aria-disabled:opacity-40 aria-disabled:hover:text-text-tertiary [&>svg]:size-3.5 [&>svg]:shrink-0",
    c = "ml-0.5 inline-flex items-center border-l border-border-tertiary pl-1",
    u = { 24: "px-2", 28: "px-2.5", 32: "px-3" },
    m = {
      mint: "aria-checked:bg-bg-accent aria-checked:text-[var(--color-text-on-accent)]",
      gain: "aria-checked:bg-gain aria-checked:text-[var(--color-text-on-accent)]",
      loss: "aria-checked:bg-loss aria-checked:text-[var(--color-text-on-error)]",
    },
    f = new Set(["ArrowRight", "ArrowDown"]),
    p = new Set(["ArrowLeft", "ArrowUp"]);
  function h(e) {
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
      let b,
        y,
        x,
        v,
        g,
        w,
        k,
        C,
        N,
        j = (0, i.c)(38),
        {
          density: I,
          size: _,
          value: A,
          onValueChange: U,
          options: V,
          fullWidth: B,
          trailing: S,
          className: M,
          optionClassName: T,
          "aria-label": E,
          "aria-labelledby": R,
        } = e,
        $ = void 0 === _ ? n[I] : _,
        q = void 0 !== B && B;
      j[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((b = new Map()), (j[0] = b))
        : (b = j[0]);
      let z = (0, a.useRef)(b);
      if (j[1] !== V || j[2] !== A) {
        let e;
        ((y = V.filter(h)),
          j[5] !== A
            ? ((e = (e) => e.value === A), (j[5] = A), (j[6] = e))
            : (e = j[6]),
          (x = y.findIndex(e)),
          (j[1] = V),
          (j[2] = A),
          (j[3] = y),
          (j[4] = x));
      } else ((y = j[3]), (x = j[4]));
      let K = x,
        F = y[K >= 0 ? K : 0]?.value;
      j[7] !== U
        ? ((v = (e) => {
            (U(e), z.current.get(e)?.focus());
          }),
          (j[7] = U),
          (j[8] = v))
        : (v = j[8]);
      let L = v;
      j[9] !== K || j[10] !== L || j[11] !== y || j[12] !== A
        ? ((g = (e) => {
            let t;
            if (
              0 === y.length ||
              ![...z.current.values()].some((t) => t === e.target)
            )
              return;
            let i = Math.max(K, 0);
            (f.has(e.key)
              ? (t = y[(i + 1) % y.length])
              : p.has(e.key)
                ? (t = y[(i - 1 + y.length) % y.length])
                : "Home" === e.key
                  ? (t = y[0])
                  : "End" === e.key && (t = y[y.length - 1]),
              t &&
                (e.preventDefault(),
                t.value !== A ? L(t.value) : z.current.get(t.value)?.focus()));
          }),
          (j[9] = K),
          (j[10] = L),
          (j[11] = y),
          (j[12] = A),
          (j[13] = g))
        : (g = j[13]);
      let P = g,
        D = s[$],
        O = q && "flex w-full";
      return (
        j[14] !== M || j[15] !== D || j[16] !== O
          ? ((w = (0, l.c)(o, D, O, M)),
            (j[14] = M),
            (j[15] = D),
            (j[16] = O),
            (j[17] = w))
          : (w = j[17]),
        j[18] !== L ||
        j[19] !== I ||
        j[20] !== q ||
        j[21] !== T ||
        j[22] !== V ||
        j[23] !== $ ||
        j[24] !== F ||
        j[25] !== A
          ? ((k = V.map((e) => {
              let i = e.value === A,
                a = (0, t.jsx)(
                  "button",
                  {
                    ref: (t) => {
                      t ? z.current.set(e.value, t) : z.current.delete(e.value);
                    },
                    type: "button",
                    role: "radio",
                    "aria-checked": i,
                    tabIndex: e.value === F ? 0 : -1,
                    disabled: (!!e.disabled && !e.disabledReason) || void 0,
                    "aria-disabled":
                      (!!e.disabled && !!e.disabledReason) || void 0,
                    title: e.title,
                    "data-tone": e.tone,
                    onClick: () => {
                      e.disabled || i || L(e.value);
                    },
                    className: (0, l.c)(
                      d,
                      u[$],
                      e.tone && m[e.tone],
                      q && "flex-1",
                      T,
                    ),
                    children: e.label,
                  },
                  e.value,
                ),
                n = e.tooltip ?? (e.disabled ? e.disabledReason : void 0);
              return n
                ? (0, t.jsx)(
                    r.f,
                    { content: n, density: I, children: a },
                    e.value,
                  )
                : a;
            })),
            (j[18] = L),
            (j[19] = I),
            (j[20] = q),
            (j[21] = T),
            (j[22] = V),
            (j[23] = $),
            (j[24] = F),
            (j[25] = A),
            (j[26] = k))
          : (k = j[26]),
        j[27] !== S
          ? ((C = S ? (0, t.jsx)("span", { className: c, children: S }) : null),
            (j[27] = S),
            (j[28] = C))
          : (C = j[28]),
        j[29] !== E ||
        j[30] !== R ||
        j[31] !== I ||
        j[32] !== P ||
        j[33] !== $ ||
        j[34] !== C ||
        j[35] !== w ||
        j[36] !== k
          ? ((N = (0, t.jsxs)("div", {
              role: "radiogroup",
              "aria-label": E,
              "aria-labelledby": R,
              "data-density": I,
              "data-size": $,
              onKeyDown: P,
              className: w,
              children: [k, C],
            })),
            (j[29] = E),
            (j[30] = R),
            (j[31] = I),
            (j[32] = P),
            (j[33] = $),
            (j[34] = C),
            (j[35] = w),
            (j[36] = k),
            (j[37] = N))
          : (N = j[37]),
        N
      );
    },
  ]);
};
