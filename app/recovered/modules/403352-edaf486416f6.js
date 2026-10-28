// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(338319),
    i = e.i(606178);
  let a = {
    terminal: {
      1: "h-8 grid-cols-[20px_20px_minmax(2rem,1fr)_auto]",
      2: "min-h-10 grid-cols-[20px_20px_minmax(0,1fr)] py-1",
    },
    comfortable: {
      1: "h-11 grid-cols-[20px_28px_minmax(2rem,1fr)_auto]",
      2: "min-h-14 grid-cols-[20px_28px_minmax(0,1fr)] py-2",
    },
  };
  e.s([
    "c",
    0,
    "grid size-5 shrink-0 place-items-center rounded-md p-0 text-text-quaternary transition-colors hover:bg-bg-tertiary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent [&>svg]:size-3.5",
    "U",
    0,
    "relative z-10 hidden size-5 place-items-center group-hover:grid group-focus-within:grid [@media(hover:none)]:grid",
    "P",
    0,
    "relative z-10",
    "a",
    0,
    "absolute inset-0 z-0 rounded-none focus-inset",
    "w",
    0,
    {
      terminal:
        "flex min-w-0 items-baseline gap-2 text-[11px] leading-4 text-text-tertiary [&>span]:whitespace-nowrap",
      comfortable:
        "mt-0.5 flex min-w-0 items-baseline gap-3 text-xs leading-4 text-text-tertiary [&>span]:whitespace-nowrap",
    },
    "A",
    0,
    "ml-auto",
    "S",
    0,
    "relative z-10 hidden size-5 place-items-center rounded-md text-text-quaternary transition-colors hover:bg-bg-tertiary hover:text-text-primary group-hover:grid group-focus-within:grid [@media(hover:none)]:grid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent [&>svg]:size-3.5",
    "j",
    0,
    { terminal: "size-5", comfortable: "size-7" },
    "B",
    0,
    { terminal: 20, comfortable: 28 },
    "T",
    0,
    "grid h-5 items-center justify-items-end",
    "z",
    0,
    "text-xs leading-4 font-medium text-text-quaternary tabular-nums",
    "Y",
    0,
    "text-text-primary",
    "V",
    0,
    "group-hover:hidden group-focus-within:hidden [@media(hover:none)]:hidden",
    "t",
    0,
    {
      terminal:
        "flex min-w-0 items-center gap-1.5 text-[13px] leading-4 font-medium text-text-primary",
      comfortable:
        "flex min-w-0 items-center gap-1.5 text-sm leading-5 font-medium text-text-primary",
    },
    "l",
    0,
    "flex min-w-0 items-center justify-between gap-3",
    "W",
    0,
    {
      terminal:
        "flex shrink-0 items-baseline gap-1.5 whitespace-nowrap text-right text-[13px] leading-4 font-medium tabular-nums",
      comfortable:
        "flex shrink-0 items-baseline gap-3 whitespace-nowrap text-right text-sm leading-5 font-medium tabular-nums",
    },
    "s",
    0,
    function ({
      density: e,
      lines: n = 1,
      insetClassName: r = i.U[e],
      covered: s = !1,
      className: l,
    }) {
      return (0, t.c)(
        "group relative grid items-center gap-x-3 transition-colors hover:bg-bg-tertiary",
        a[e][n],
        r,
        s && "cursor-pointer",
        l,
      );
    },
  ]);
};
