// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(352386),
    l = e.i(338319),
    a = e.i(813792);
  let n = { terminal: 24, comfortable: 28 },
    s =
      "inline-flex w-fit shrink-0 items-stretch gap-0.5 rounded-md border border-border-tertiary bg-bg-secondary p-0.5",
    o = { 24: "h-6", 28: "h-7", 32: "h-8" },
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
    s,
    "h",
    0,
    o,
    "w",
    0,
    c,
    "X",
    0,
    function (e) {
      let x,
        b,
        v,
        y,
        g,
        w,
        j,
        k,
        N,
        _ = (0, i.c)(38),
        {
          density: S,
          size: C,
          value: I,
          onValueChange: A,
          options: D,
          fullWidth: U,
          trailing: F,
          className: M,
          optionClassName: z,
          "aria-label": P,
          "aria-labelledby": $,
        } = e,
        E = void 0 === C ? n[S] : C,
        L = void 0 !== U && U;
      _[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((x = new Map()), (_[0] = x))
        : (x = _[0]);
      let R = (0, r.useRef)(x);
      if (_[1] !== D || _[2] !== I) {
        let e;
        ((b = D.filter(h)),
          _[5] !== I
            ? ((e = (e) => e.value === I), (_[5] = I), (_[6] = e))
            : (e = _[6]),
          (v = b.findIndex(e)),
          (_[1] = D),
          (_[2] = I),
          (_[3] = b),
          (_[4] = v));
      } else ((b = _[3]), (v = _[4]));
      let T = v,
        q = b[T >= 0 ? T : 0]?.value;
      _[7] !== A
        ? ((y = (e) => {
            (A(e), R.current.get(e)?.focus());
          }),
          (_[7] = A),
          (_[8] = y))
        : (y = _[8]);
      let H = y;
      _[9] !== T || _[10] !== H || _[11] !== b || _[12] !== I
        ? ((g = (e) => {
            let t;
            if (
              0 === b.length ||
              ![...R.current.values()].some((t) => t === e.target)
            )
              return;
            let i = Math.max(T, 0);
            (f.has(e.key)
              ? (t = b[(i + 1) % b.length])
              : p.has(e.key)
                ? (t = b[(i - 1 + b.length) % b.length])
                : "Home" === e.key
                  ? (t = b[0])
                  : "End" === e.key && (t = b[b.length - 1]),
              t &&
                (e.preventDefault(),
                t.value !== I ? H(t.value) : R.current.get(t.value)?.focus()));
          }),
          (_[9] = T),
          (_[10] = H),
          (_[11] = b),
          (_[12] = I),
          (_[13] = g))
        : (g = _[13]);
      let B = g,
        O = o[E],
        V = L && "flex w-full";
      return (
        _[14] !== M || _[15] !== O || _[16] !== V
          ? ((w = (0, l.c)(s, O, V, M)),
            (_[14] = M),
            (_[15] = O),
            (_[16] = V),
            (_[17] = w))
          : (w = _[17]),
        _[18] !== H ||
        _[19] !== S ||
        _[20] !== L ||
        _[21] !== z ||
        _[22] !== D ||
        _[23] !== E ||
        _[24] !== q ||
        _[25] !== I
          ? ((j = D.map((e) => {
              let i = e.value === I,
                r = (0, t.jsx)(
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
                      e.disabled || i || H(e.value);
                    },
                    className: (0, l.c)(
                      d,
                      u[E],
                      e.tone && m[e.tone],
                      L && "flex-1",
                      z,
                    ),
                    children: e.label,
                  },
                  e.value,
                ),
                n = e.tooltip ?? (e.disabled ? e.disabledReason : void 0);
              return n
                ? (0, t.jsx)(
                    a.f,
                    { content: n, density: S, children: r },
                    e.value,
                  )
                : r;
            })),
            (_[18] = H),
            (_[19] = S),
            (_[20] = L),
            (_[21] = z),
            (_[22] = D),
            (_[23] = E),
            (_[24] = q),
            (_[25] = I),
            (_[26] = j))
          : (j = _[26]),
        _[27] !== F
          ? ((k = F ? (0, t.jsx)("span", { className: c, children: F }) : null),
            (_[27] = F),
            (_[28] = k))
          : (k = _[28]),
        _[29] !== P ||
        _[30] !== $ ||
        _[31] !== S ||
        _[32] !== B ||
        _[33] !== E ||
        _[34] !== k ||
        _[35] !== w ||
        _[36] !== j
          ? ((N = (0, t.jsxs)("div", {
              role: "radiogroup",
              "aria-label": P,
              "aria-labelledby": $,
              "data-density": S,
              "data-size": E,
              onKeyDown: B,
              className: w,
              children: [j, k],
            })),
            (_[29] = P),
            (_[30] = $),
            (_[31] = S),
            (_[32] = B),
            (_[33] = E),
            (_[34] = k),
            (_[35] = w),
            (_[36] = j),
            (_[37] = N))
          : (N = _[37]),
        N
      );
    },
  ]);
};
