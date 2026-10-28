// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(439587),
    n = e.i(426091),
    s = e.i(256272);
  let r = {
      thumb: { buy: "bg-bg-accent", sell: "bg-loss" },
      cta: {
        buy: "!bg-bg-accent !text-text-on-accent hover:!bg-bg-accent/75",
        sell: "!bg-loss !text-text-on-error hover:!bg-loss/75",
      },
    },
    l = (e) => r;
  e.s(
    [
      "B",
      0,
      "shrink-0 text-[11px] font-normal leading-none text-text-quaternary",
      "F",
      0,
      "flex h-6 items-center justify-between gap-3",
      "o",
      0,
      "min-w-0 truncate text-right text-[12px] font-medium leading-none tabular-nums text-text-primary",
      "l",
      0,
      "relative isolate flex h-7 shrink-0 items-center gap-1.5 text-[12px] font-medium tabular-nums leading-none text-text-tertiary transition-colors before:absolute before:-inset-x-1.5 before:inset-y-0 before:-z-10 before:rounded-md before:transition-colors hover:text-text-primary hover:before:bg-bg-tertiary focus-visible:outline-none focus-visible:before:ring-2 focus-visible:before:ring-text-accent",
      "q",
      0,
      l,
    ],
    855659,
  );
  let o =
    "!rounded-md !text-[13px] font-semibold leading-normal transition-colors disabled:opacity-50";
  e.s(
    [
      "h",
      0,
      o,
      "u",
      0,
      function (e) {
        let r,
          d,
          c,
          u,
          m,
          f = (0, i.c)(12);
        f[0] !== e
          ? (({ className: r, side: c, isLoading: u, ...d } = e),
            (f[0] = e),
            (f[1] = r),
            (f[2] = d),
            (f[3] = c),
            (f[4] = u))
          : ((r = f[1]), (d = f[2]), (c = f[3]), (u = f[4]));
        let p = void 0 !== u && u,
          b = l((0, s.u)()),
          x = a.K,
          y = !!p || void 0,
          h = c ?? "neutral",
          g = (0, n.c)(o, c ? b.cta[c] : void 0, r);
        return (
          f[5] !== x ||
          f[6] !== p ||
          f[7] !== d ||
          f[8] !== y ||
          f[9] !== h ||
          f[10] !== g
            ? ((m = (0, t.jsx)(x, {
                size: 40,
                isFullWidth: !0,
                isLoading: p,
                "aria-busy": y,
                "data-trade-cta": h,
                className: g,
                ...d,
              })),
              (f[5] = x),
              (f[6] = p),
              (f[7] = d),
              (f[8] = y),
              (f[9] = h),
              (f[10] = g),
              (f[11] = m))
            : (m = f[11]),
          m
        );
      },
    ],
    833119,
  );
};
