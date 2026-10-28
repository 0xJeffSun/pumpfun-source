// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(439587),
    a = e.i(352386),
    i = e.i(338319),
    n = e.i(606178),
    s = e.i(908163);
  let o =
      "@container flex items-stretch justify-between gap-3 border-b border-border-secondary",
    d = { terminal: "min-h-9", comfortable: "min-h-11" },
    c = "-mb-px shrink-0 gap-6 !overflow-visible !border-0",
    u = { terminal: "!h-[37px]", comfortable: "!h-[45px]" },
    m =
      "!mb-0 !rounded-none !px-0 !py-0 !font-medium !text-text-tertiary hover:!text-text-primary data-[active]:!text-text-primary disabled:cursor-not-allowed disabled:opacity-40",
    f = {
      terminal: "!h-9 !gap-1.5 !text-[13px] [&>svg]:!size-3.5",
      comfortable: "!h-11 !gap-2 !text-sm [&>svg]:!size-4",
    },
    p = "flex shrink-0 items-center gap-2 self-center";
  function h(e) {
    return e.value;
  }
  e.s([
    "t",
    0,
    c,
    "b",
    0,
    u,
    "u",
    0,
    o,
    "T",
    0,
    d,
    "h",
    0,
    m,
    "U",
    0,
    f,
    "w",
    0,
    p,
    "p",
    0,
    function (e) {
      let v,
        b,
        g,
        y,
        x,
        w,
        _,
        A,
        j,
        I,
        U = (0, r.c)(46),
        {
          density: S,
          value: N,
          onValueChange: C,
          tabs: k,
          tools: E,
          shrinkTools: M,
          tabsOverflow: P,
          children: F,
          className: R,
          listClassName: T,
          tabClassName: z,
          "aria-label": O,
        } = e,
        $ = void 0 !== M && M,
        K = (0, a.useRef)(null),
        B = "scroll" === P;
      (U[0] !== k
        ? ((v = k.map(h).join(" ")), (U[0] = k), (U[1] = v))
        : (v = U[1]),
        U[2] !== B || U[3] !== v
          ? ((b = { rowRef: K, enabled: B, tabsKey: v }),
            (U[2] = B),
            (U[3] = v),
            (U[4] = b))
          : (b = U[4]));
      let L = ((e) => {
        let t,
          l,
          i = (0, r.c)(7),
          { rowRef: n, enabled: s, tabsKey: o } = e,
          [d, c] = (0, a.useState)(!1);
        return (
          i[0] !== s || i[1] !== n
            ? ((t = () => {
                let e = n.current,
                  t = e?.querySelector('[role="tablist"]');
                if (!s || !e || !t) return;
                let r = () => {
                  let { paddingLeft: r, paddingRight: l } = getComputedStyle(e),
                    a =
                      e.clientWidth -
                      (Number.parseFloat(r) || 0) -
                      (Number.parseFloat(l) || 0),
                    i = t.scrollWidth > a;
                  c((e) => (e === i ? e : i));
                };
                if ("u" < typeof ResizeObserver) {
                  let e = requestAnimationFrame(r);
                  return () => cancelAnimationFrame(e);
                }
                let l = new ResizeObserver(r);
                return (l.observe(e), l.observe(t), () => l.disconnect());
              }),
              (i[0] = s),
              (i[1] = n),
              (i[2] = t))
            : (t = i[2]),
          i[3] !== s || i[4] !== n || i[5] !== o
            ? ((l = [n, s, o]), (i[3] = s), (i[4] = n), (i[5] = o), (i[6] = l))
            : (l = i[6]),
          (0, a.useEffect)(t, l),
          d
        );
      })(b);
      U[5] !== C
        ? ((g = (e) => C(String(e))), (U[5] = C), (U[6] = g))
        : (g = U[6]);
      let Z = d[S],
        q = n.U[S];
      U[7] !== R || U[8] !== Z || U[9] !== q
        ? ((y = (0, i.c)(o, Z, q, R)),
          (U[7] = R),
          (U[8] = Z),
          (U[9] = q),
          (U[10] = y))
        : (y = U[10]);
      let W = L
          ? "-mb-px min-w-0 shrink gap-6 !overflow-x-auto !overflow-y-hidden !border-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          : c,
        H = u[S];
      if (
        (U[11] !== T || U[12] !== W || U[13] !== H
          ? ((x = (0, i.c)(W, H, T)),
            (U[11] = T),
            (U[12] = W),
            (U[13] = H),
            (U[14] = x))
          : (x = U[14]),
        U[15] !== S ||
          U[16] !== L ||
          U[17] !== C ||
          U[18] !== z ||
          U[19] !== k ||
          U[20] !== N)
      ) {
        let e;
        (U[22] !== S || U[23] !== L || U[24] !== C || U[25] !== z || U[26] !== N
          ? ((e = (e) =>
              (0, t.jsxs)(
                l.V,
                {
                  value: e.value,
                  disabled: e.disabled,
                  ...(e.onClick
                    ? {
                        onClick: (t) => {
                          (e.onClick?.(t),
                            t.preventBaseUIHandler?.(),
                            e.disabled || e.value === N || C(e.value));
                        },
                      }
                    : void 0),
                  className: (0, i.c)(m, f[S], L && "focus-inset", z),
                  children: [
                    e.label,
                    void 0 !== e.count && null !== e.count
                      ? (0, t.jsx)(s.E, {
                          density: S,
                          className: "text-text-tertiary",
                          children: e.count,
                        })
                      : null,
                  ],
                },
                e.value,
              )),
            (U[22] = S),
            (U[23] = L),
            (U[24] = C),
            (U[25] = z),
            (U[26] = N),
            (U[27] = e))
          : (e = U[27]),
          (w = k.map(e)),
          (U[15] = S),
          (U[16] = L),
          (U[17] = C),
          (U[18] = z),
          (U[19] = k),
          (U[20] = N),
          (U[21] = w));
      } else w = U[21];
      return (
        U[28] !== O || U[29] !== x || U[30] !== w
          ? ((_ = (0, t.jsx)(l.R, {
              "aria-label": O,
              className: x,
              children: w,
            })),
            (U[28] = O),
            (U[29] = x),
            (U[30] = w),
            (U[31] = _))
          : (_ = U[31]),
        U[32] !== $ || U[33] !== E
          ? ((A = E
              ? (0, t.jsx)("div", {
                  "data-tab-strip-tools": !0,
                  "data-shrink": $ ? "" : void 0,
                  className: $
                    ? "flex min-w-0 shrink grow items-center justify-end gap-2 self-center"
                    : p,
                  children: E,
                })
              : null),
            (U[32] = $),
            (U[33] = E),
            (U[34] = A))
          : (A = U[34]),
        U[35] !== S || U[36] !== _ || U[37] !== A || U[38] !== y || U[39] !== P
          ? ((j = (0, t.jsxs)("div", {
              ref: K,
              "data-tab-strip": !0,
              "data-density": S,
              "data-tabs-overflow": P,
              className: y,
              children: [_, A],
            })),
            (U[35] = S),
            (U[36] = _),
            (U[37] = A),
            (U[38] = y),
            (U[39] = P),
            (U[40] = j))
          : (j = U[40]),
        U[41] !== F || U[42] !== j || U[43] !== g || U[44] !== N
          ? ((I = (0, t.jsxs)(l.i, {
              value: N,
              onValueChange: g,
              children: [j, F],
            })),
            (U[41] = F),
            (U[42] = j),
            (U[43] = g),
            (U[44] = N),
            (U[45] = I))
          : (I = U[45]),
        I
      );
    },
  ]);
};
