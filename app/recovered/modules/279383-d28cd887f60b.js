// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(157633);
  e.s([
    "f",
    0,
    (e) => {
      let a,
        i,
        o,
        s,
        l,
        u = (0, r.c)(9),
        { onAddFunds: c, message: d } = e,
        f = void 0 === d ? "You need at least $10 in your wallet to chat." : d;
      return (
        u[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((a = (0, t.jsx)("span", {
              "aria-hidden": !0,
              className: "pointer-events-none absolute inset-0",
              style: {
                background:
                  "linear-gradient(135deg, hsl(var(--primary) / 0.16) 0%, transparent 60%)",
              },
            })),
            (u[0] = a))
          : (a = u[0]),
        u[1] === Symbol.for("react.memo_cache_sentinel")
          ? ((i = (0, t.jsx)("span", {
              className:
                "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary",
              children: (0, t.jsx)(n.Of, { className: "size-5" }),
            })),
            (u[1] = i))
          : (i = u[1]),
        u[2] !== f
          ? ((o = (0, t.jsx)("span", {
              className: "relative z-10 min-w-0 flex-1 text-sm font-semibold",
              children: f,
            })),
            (u[2] = f),
            (u[3] = o))
          : (o = u[3]),
        u[4] !== c
          ? ((s = (0, t.jsx)("button", {
              type: "button",
              onClick: c,
              "data-testid": "livechat-insufficient-portfolio-toast-cta",
              className:
                "relative z-10 inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground transition-[filter,transform] hover:brightness-110 active:translate-y-px",
              children: "Add funds",
            })),
            (u[4] = c),
            (u[5] = s))
          : (s = u[5]),
        u[6] !== o || u[7] !== s
          ? ((l = (0, t.jsxs)("div", {
              role: "alert",
              "data-testid": "livechat-insufficient-portfolio-toast",
              className:
                "relative flex w-full min-w-[320px] max-w-[420px] items-center gap-3 overflow-hidden rounded-xl border border-primary/30 bg-popover p-3 text-left text-popover-foreground shadow-lg",
              children: [a, i, o, s],
            })),
            (u[6] = o),
            (u[7] = s),
            (u[8] = l))
          : (l = u[8]),
        l
      );
    },
  ]);
};
