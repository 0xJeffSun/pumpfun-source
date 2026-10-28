// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(439587),
    a = e.i(352386),
    n = e.i(338319),
    s = e.i(606178),
    l = e.i(908163);
  let o =
      "@container flex items-stretch justify-between gap-3 border-b border-border-secondary",
    c = { terminal: "min-h-9", comfortable: "min-h-11" },
    m = "-mb-px shrink-0 gap-6 !overflow-visible !border-0",
    d = { terminal: "!h-[37px]", comfortable: "!h-[45px]" },
    u =
      "!mb-0 !rounded-none !px-0 !py-0 !font-medium !text-text-tertiary hover:!text-text-primary data-[active]:!text-text-primary disabled:cursor-not-allowed disabled:opacity-40",
    h = {
      terminal: "!h-9 !gap-1.5 !text-[13px] [&>svg]:!size-3.5",
      comfortable: "!h-11 !gap-2 !text-sm [&>svg]:!size-4",
    },
    x = "flex shrink-0 items-center gap-2 self-center";
  function f(e) {
    return e.value;
  }
  e.s([
    "t",
    0,
    m,
    "b",
    0,
    d,
    "u",
    0,
    o,
    "T",
    0,
    c,
    "h",
    0,
    u,
    "U",
    0,
    h,
    "w",
    0,
    x,
    "p",
    0,
    function (e) {
      let b,
        p,
        y,
        v,
        g,
        w,
        k,
        N,
        j,
        _,
        C = (0, r.c)(46),
        {
          density: I,
          value: S,
          onValueChange: T,
          tabs: A,
          tools: F,
          shrinkTools: E,
          tabsOverflow: R,
          children: O,
          className: B,
          listClassName: D,
          tabClassName: M,
          "aria-label": z,
        } = e,
        L = void 0 !== E && E,
        U = (0, a.useRef)(null),
        q = "scroll" === R;
      (C[0] !== A
        ? ((b = A.map(f).join(" ")), (C[0] = A), (C[1] = b))
        : (b = C[1]),
        C[2] !== q || C[3] !== b
          ? ((p = { rowRef: U, enabled: q, tabsKey: b }),
            (C[2] = q),
            (C[3] = b),
            (C[4] = p))
          : (p = C[4]));
      let H = ((e) => {
        let t,
          i,
          n = (0, r.c)(7),
          { rowRef: s, enabled: l, tabsKey: o } = e,
          [c, m] = (0, a.useState)(!1);
        return (
          n[0] !== l || n[1] !== s
            ? ((t = () => {
                let e = s.current,
                  t = e?.querySelector('[role="tablist"]');
                if (!l || !e || !t) return;
                let r = () => {
                  let { paddingLeft: r, paddingRight: i } = getComputedStyle(e),
                    a =
                      e.clientWidth -
                      (Number.parseFloat(r) || 0) -
                      (Number.parseFloat(i) || 0),
                    n = t.scrollWidth > a;
                  m((e) => (e === n ? e : n));
                };
                if ("u" < typeof ResizeObserver) {
                  let e = requestAnimationFrame(r);
                  return () => cancelAnimationFrame(e);
                }
                let i = new ResizeObserver(r);
                return (i.observe(e), i.observe(t), () => i.disconnect());
              }),
              (n[0] = l),
              (n[1] = s),
              (n[2] = t))
            : (t = n[2]),
          n[3] !== l || n[4] !== s || n[5] !== o
            ? ((i = [s, l, o]), (n[3] = l), (n[4] = s), (n[5] = o), (n[6] = i))
            : (i = n[6]),
          (0, a.useEffect)(t, i),
          c
        );
      })(p);
      C[5] !== T
        ? ((y = (e) => T(String(e))), (C[5] = T), (C[6] = y))
        : (y = C[6]);
      let P = c[I],
        W = s.U[I];
      C[7] !== B || C[8] !== P || C[9] !== W
        ? ((v = (0, n.c)(o, P, W, B)),
          (C[7] = B),
          (C[8] = P),
          (C[9] = W),
          (C[10] = v))
        : (v = C[10]);
      let K = H
          ? "-mb-px min-w-0 shrink gap-6 !overflow-x-auto !overflow-y-hidden !border-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          : m,
        V = d[I];
      if (
        (C[11] !== D || C[12] !== K || C[13] !== V
          ? ((g = (0, n.c)(K, V, D)),
            (C[11] = D),
            (C[12] = K),
            (C[13] = V),
            (C[14] = g))
          : (g = C[14]),
        C[15] !== I ||
          C[16] !== H ||
          C[17] !== T ||
          C[18] !== M ||
          C[19] !== A ||
          C[20] !== S)
      ) {
        let e;
        (C[22] !== I || C[23] !== H || C[24] !== T || C[25] !== M || C[26] !== S
          ? ((e = (e) =>
              (0, t.jsxs)(
                i.V,
                {
                  value: e.value,
                  disabled: e.disabled,
                  ...(e.onClick
                    ? {
                        onClick: (t) => {
                          (e.onClick?.(t),
                            t.preventBaseUIHandler?.(),
                            e.disabled || e.value === S || T(e.value));
                        },
                      }
                    : void 0),
                  className: (0, n.c)(u, h[I], H && "focus-inset", M),
                  children: [
                    e.label,
                    void 0 !== e.count && null !== e.count
                      ? (0, t.jsx)(l.E, {
                          density: I,
                          className: "text-text-tertiary",
                          children: e.count,
                        })
                      : null,
                  ],
                },
                e.value,
              )),
            (C[22] = I),
            (C[23] = H),
            (C[24] = T),
            (C[25] = M),
            (C[26] = S),
            (C[27] = e))
          : (e = C[27]),
          (w = A.map(e)),
          (C[15] = I),
          (C[16] = H),
          (C[17] = T),
          (C[18] = M),
          (C[19] = A),
          (C[20] = S),
          (C[21] = w));
      } else w = C[21];
      return (
        C[28] !== z || C[29] !== g || C[30] !== w
          ? ((k = (0, t.jsx)(i.R, {
              "aria-label": z,
              className: g,
              children: w,
            })),
            (C[28] = z),
            (C[29] = g),
            (C[30] = w),
            (C[31] = k))
          : (k = C[31]),
        C[32] !== L || C[33] !== F
          ? ((N = F
              ? (0, t.jsx)("div", {
                  "data-tab-strip-tools": !0,
                  "data-shrink": L ? "" : void 0,
                  className: L
                    ? "flex min-w-0 shrink grow items-center justify-end gap-2 self-center"
                    : x,
                  children: F,
                })
              : null),
            (C[32] = L),
            (C[33] = F),
            (C[34] = N))
          : (N = C[34]),
        C[35] !== I || C[36] !== k || C[37] !== N || C[38] !== v || C[39] !== R
          ? ((j = (0, t.jsxs)("div", {
              ref: U,
              "data-tab-strip": !0,
              "data-density": I,
              "data-tabs-overflow": R,
              className: v,
              children: [k, N],
            })),
            (C[35] = I),
            (C[36] = k),
            (C[37] = N),
            (C[38] = v),
            (C[39] = R),
            (C[40] = j))
          : (j = C[40]),
        C[41] !== O || C[42] !== j || C[43] !== y || C[44] !== S
          ? ((_ = (0, t.jsxs)(i.i, {
              value: S,
              onValueChange: y,
              children: [j, O],
            })),
            (C[41] = O),
            (C[42] = j),
            (C[43] = y),
            (C[44] = S),
            (C[45] = _))
          : (_ = C[45]),
        _
      );
    },
  ]);
};
