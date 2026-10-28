// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    i = e.i(352386),
    a = e.i(338319),
    r = e.i(813792);
  let s = { terminal: 24, comfortable: 28 },
    l =
      "inline-flex w-fit shrink-0 items-stretch gap-0.5 rounded-md border border-border-tertiary bg-bg-secondary p-0.5",
    o = { 24: "h-6", 28: "h-7", 32: "h-8" },
    u =
      "inline-flex min-w-0 items-center justify-center gap-1 whitespace-nowrap rounded-sm text-xs leading-4 font-medium text-text-tertiary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent aria-checked:bg-bg-tertiary aria-checked:text-text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-text-tertiary aria-disabled:cursor-not-allowed aria-disabled:opacity-40 aria-disabled:hover:text-text-tertiary [&>svg]:size-3.5 [&>svg]:shrink-0",
    d = "ml-0.5 inline-flex items-center border-l border-border-tertiary pl-1",
    c = { 24: "px-2", 28: "px-2.5", 32: "px-3" },
    m = {
      mint: "aria-checked:bg-bg-accent aria-checked:text-[var(--color-text-on-accent)]",
      gain: "aria-checked:bg-gain aria-checked:text-[var(--color-text-on-accent)]",
      loss: "aria-checked:bg-loss aria-checked:text-[var(--color-text-on-error)]",
    },
    g = new Set(["ArrowRight", "ArrowDown"]),
    p = new Set(["ArrowLeft", "ArrowUp"]);
  function f(e) {
    return !e.disabled;
  }
  e.s([
    "l",
    0,
    s,
    "C",
    0,
    u,
    "_",
    0,
    c,
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
      let h,
        _,
        b,
        y,
        v,
        w,
        x,
        z,
        A,
        S = (0, n.c)(38),
        {
          density: k,
          size: I,
          value: q,
          onValueChange: $,
          options: B,
          fullWidth: N,
          trailing: M,
          className: T,
          optionClassName: j,
          "aria-label": U,
          "aria-labelledby": P,
        } = e,
        E = void 0 === I ? s[k] : I,
        W = void 0 !== N && N;
      S[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((h = new Map()), (S[0] = h))
        : (h = S[0]);
      let D = (0, i.useRef)(h);
      if (S[1] !== B || S[2] !== q) {
        let e;
        ((_ = B.filter(f)),
          S[5] !== q
            ? ((e = (e) => e.value === q), (S[5] = q), (S[6] = e))
            : (e = S[6]),
          (b = _.findIndex(e)),
          (S[1] = B),
          (S[2] = q),
          (S[3] = _),
          (S[4] = b));
      } else ((_ = S[3]), (b = S[4]));
      let C = b,
        R = _[C >= 0 ? C : 0]?.value;
      S[7] !== $
        ? ((y = (e) => {
            ($(e), D.current.get(e)?.focus());
          }),
          (S[7] = $),
          (S[8] = y))
        : (y = S[8]);
      let F = y;
      S[9] !== C || S[10] !== F || S[11] !== _ || S[12] !== q
        ? ((v = (e) => {
            let t;
            if (
              0 === _.length ||
              ![...D.current.values()].some((t) => t === e.target)
            )
              return;
            let n = Math.max(C, 0);
            (g.has(e.key)
              ? (t = _[(n + 1) % _.length])
              : p.has(e.key)
                ? (t = _[(n - 1 + _.length) % _.length])
                : "Home" === e.key
                  ? (t = _[0])
                  : "End" === e.key && (t = _[_.length - 1]),
              t &&
                (e.preventDefault(),
                t.value !== q ? F(t.value) : D.current.get(t.value)?.focus()));
          }),
          (S[9] = C),
          (S[10] = F),
          (S[11] = _),
          (S[12] = q),
          (S[13] = v))
        : (v = S[13]);
      let O = v,
        L = o[E],
        K = W && "flex w-full";
      return (
        S[14] !== T || S[15] !== L || S[16] !== K
          ? ((w = (0, a.c)(l, L, K, T)),
            (S[14] = T),
            (S[15] = L),
            (S[16] = K),
            (S[17] = w))
          : (w = S[17]),
        S[18] !== F ||
        S[19] !== k ||
        S[20] !== W ||
        S[21] !== j ||
        S[22] !== B ||
        S[23] !== E ||
        S[24] !== R ||
        S[25] !== q
          ? ((x = B.map((e) => {
              let n = e.value === q,
                i = (0, t.jsx)(
                  "button",
                  {
                    ref: (t) => {
                      t ? D.current.set(e.value, t) : D.current.delete(e.value);
                    },
                    type: "button",
                    role: "radio",
                    "aria-checked": n,
                    tabIndex: e.value === R ? 0 : -1,
                    disabled: (!!e.disabled && !e.disabledReason) || void 0,
                    "aria-disabled":
                      (!!e.disabled && !!e.disabledReason) || void 0,
                    title: e.title,
                    "data-tone": e.tone,
                    onClick: () => {
                      e.disabled || n || F(e.value);
                    },
                    className: (0, a.c)(
                      u,
                      c[E],
                      e.tone && m[e.tone],
                      W && "flex-1",
                      j,
                    ),
                    children: e.label,
                  },
                  e.value,
                ),
                s = e.tooltip ?? (e.disabled ? e.disabledReason : void 0);
              return s
                ? (0, t.jsx)(
                    r.f,
                    { content: s, density: k, children: i },
                    e.value,
                  )
                : i;
            })),
            (S[18] = F),
            (S[19] = k),
            (S[20] = W),
            (S[21] = j),
            (S[22] = B),
            (S[23] = E),
            (S[24] = R),
            (S[25] = q),
            (S[26] = x))
          : (x = S[26]),
        S[27] !== M
          ? ((z = M ? (0, t.jsx)("span", { className: d, children: M }) : null),
            (S[27] = M),
            (S[28] = z))
          : (z = S[28]),
        S[29] !== U ||
        S[30] !== P ||
        S[31] !== k ||
        S[32] !== O ||
        S[33] !== E ||
        S[34] !== z ||
        S[35] !== w ||
        S[36] !== x
          ? ((A = (0, t.jsxs)("div", {
              role: "radiogroup",
              "aria-label": U,
              "aria-labelledby": P,
              "data-density": k,
              "data-size": E,
              onKeyDown: O,
              className: w,
              children: [x, z],
            })),
            (S[29] = U),
            (S[30] = P),
            (S[31] = k),
            (S[32] = O),
            (S[33] = E),
            (S[34] = z),
            (S[35] = w),
            (S[36] = x),
            (S[37] = A))
          : (A = S[37]),
        A
      );
    },
  ]);
};
