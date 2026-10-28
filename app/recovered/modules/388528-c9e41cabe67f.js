// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t =
      "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-md text-text-primary outline-none transition-colors hover:bg-bg-quaternary focus:bg-bg-quaternary data-[highlighted]:bg-bg-quaternary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    n = {
      comfortable: "h-10 px-3 text-sm font-normal leading-5",
      terminal: "h-7 px-2 text-[12px] font-medium leading-4",
    };
  e.s([
    "p",
    0,
    "ml-auto flex size-3.5 shrink-0 items-center justify-center text-text-accent",
    "o",
    0,
    t,
    "j",
    0,
    n,
    "k",
    0,
    "px-3 py-1.5 text-xs font-medium leading-4 text-text-quaternary",
    "c",
    0,
    "-mx-1 my-1 h-px bg-border-secondary",
    "t",
    0,
    "p-1",
    "q",
    0,
    function (e, r) {
      return `${t} ${n[e]}${r ? " bg-bg-accent/10 text-text-accent hover:bg-bg-accent/10 focus:bg-bg-accent/10 data-[highlighted]:bg-bg-accent/10" : ""}`;
    },
  ]);
};
