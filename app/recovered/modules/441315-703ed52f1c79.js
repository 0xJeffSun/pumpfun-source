// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(745018),
    o = e.i(338319);
  let i = { terminal: "h-6 gap-1 px-2", comfortable: "h-7 gap-1.5 px-2.5" },
    a = {
      outlined: "border-border-tertiary bg-transparent text-text-secondary",
      raised: "border-transparent bg-bg-tertiary text-text-secondary",
      pressed: "border-transparent bg-bg-accent/[0.12] text-text-accent",
    },
    s = {
      gain: "border-transparent bg-gain/[0.12] text-gain",
      loss: "border-transparent bg-loss/[0.12] text-loss",
    },
    l = {
      outlined: "hover:bg-bg-tertiary hover:text-text-primary",
      raised: "hover:text-text-primary",
      pressed: "hover:bg-bg-accent/[0.12]",
      tone: "",
    };
  function c({
    density: e,
    variant: t = "outlined",
    tone: n = "gain",
    pressed: r,
    interactive: u,
    className: p,
  }) {
    let d = r ? "pressed" : t;
    return (0, o.c)(
      "inline-flex shrink-0 items-center whitespace-nowrap rounded-md border text-xs leading-4 font-medium transition-colors",
      i[e],
      "tone" === d ? s[n] : a[d],
      u &&
        "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-text-secondary",
      u && l[d],
      p,
    );
  }
  e.s([
    "p",
    0,
    function (e) {
      let o,
        i,
        a,
        s,
        l,
        u,
        p,
        d,
        f,
        g,
        m,
        b,
        h,
        v,
        x,
        y,
        _,
        k = (0, n.c)(47);
      k[0] !== e
        ? (({
            density: a,
            variant: p,
            tone: d,
            pressed: l,
            leading: s,
            trailing: g,
            className: i,
            children: o,
            as: f,
            ...u
          } = e),
          (k[0] = e),
          (k[1] = o),
          (k[2] = i),
          (k[3] = a),
          (k[4] = s),
          (k[5] = l),
          (k[6] = u),
          (k[7] = p),
          (k[8] = d),
          (k[9] = f),
          (k[10] = g))
        : ((o = k[1]),
          (i = k[2]),
          (a = k[3]),
          (s = k[4]),
          (l = k[5]),
          (u = k[6]),
          (p = k[7]),
          (d = k[8]),
          (f = k[9]),
          (g = k[10]));
      let z = void 0 === p ? "outlined" : p,
        S = void 0 === d ? "gain" : d,
        C = void 0 === f ? "button" : f;
      (k[11] !== s
        ? ((m = s
            ? (0, t.jsx)("span", {
                className:
                  "flex shrink-0 items-center [&>svg]:size-3.5 [&>img]:size-3.5 [&>svg]:shrink-0",
                children: s,
              })
            : null),
          (k[11] = s),
          (k[12] = m))
        : (m = k[12]),
        k[13] !== o
          ? ((b = (0, t.jsx)("span", {
              className: "min-w-0 truncate",
              children: o,
            })),
            (k[13] = o),
            (k[14] = b))
          : (b = k[14]),
        k[15] !== g
          ? ((h = g
              ? (0, t.jsx)("span", {
                  className:
                    "flex shrink-0 items-center text-text-quaternary [&>svg]:size-3 [&>svg]:shrink-0",
                  children:
                    !0 === g ? (0, t.jsx)(r.vY, { "aria-hidden": !0 }) : g,
                })
              : null),
            (k[15] = g),
            (k[16] = h))
          : (h = k[16]),
        k[17] !== m || k[18] !== b || k[19] !== h
          ? ((v = (0, t.jsxs)(t.Fragment, { children: [m, b, h] })),
            (k[17] = m),
            (k[18] = b),
            (k[19] = h),
            (k[20] = v))
          : (v = k[20]));
      let R = v,
        $ = l ? "pressed" : z;
      k[21] !== a || k[22] !== $
        ? ((x = { "data-density": a, "data-variant": $ }),
          (k[21] = a),
          (k[22] = $),
          (k[23] = x))
        : (x = k[23]);
      let O = x;
      if ("span" === C) {
        let e, n;
        k[24] !== i || k[25] !== a || k[26] !== l || k[27] !== S || k[28] !== z
          ? ((e = c({
              density: a,
              variant: z,
              tone: S,
              pressed: l,
              interactive: !1,
              className: i,
            })),
            (k[24] = i),
            (k[25] = a),
            (k[26] = l),
            (k[27] = S),
            (k[28] = z),
            (k[29] = e))
          : (e = k[29]);
        let r = u;
        return (
          k[30] !== R || k[31] !== O || k[32] !== r || k[33] !== e
            ? ((n = (0, t.jsx)("span", {
                ...O,
                className: e,
                ...r,
                children: R,
              })),
              (k[30] = R),
              (k[31] = O),
              (k[32] = r),
              (k[33] = e),
              (k[34] = n))
            : (n = k[34]),
          n
        );
      }
      k[35] !== i || k[36] !== a || k[37] !== l || k[38] !== S || k[39] !== z
        ? ((y = c({
            density: a,
            variant: z,
            tone: S,
            pressed: l,
            interactive: !0,
            className: i,
          })),
          (k[35] = i),
          (k[36] = a),
          (k[37] = l),
          (k[38] = S),
          (k[39] = z),
          (k[40] = y))
        : (y = k[40]);
      let j = u;
      return (
        k[41] !== R || k[42] !== O || k[43] !== l || k[44] !== j || k[45] !== y
          ? ((_ = (0, t.jsx)("button", {
              type: "button",
              "aria-pressed": l,
              ...O,
              className: y,
              ...j,
              children: R,
            })),
            (k[41] = R),
            (k[42] = O),
            (k[43] = l),
            (k[44] = j),
            (k[45] = y),
            (k[46] = _))
          : (_ = k[46]),
        _
      );
    },
    "C",
    0,
    c,
  ]);
};
