// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "group/follow",
    r = `${t} inline-flex shrink-0 items-center justify-center font-medium transition-colors`;
  e.s([
    "$",
    0,
    "border-transparent bg-transparent text-text-quaternary hover:bg-bg-tertiary hover:text-text-primary focus-visible:bg-bg-tertiary focus-visible:text-text-primary",
    "r",
    0,
    function (e) {
      return e
        ? {
            variant: "ghost",
            className: `${t} ring-1 ring-inset ring-border-tertiary !text-text-secondary hover:ring-border-error hover:!bg-bg-error/10 hover:!text-text-error focus-visible:ring-border-error focus-visible:!bg-bg-error/10 focus-visible:!text-text-error`,
          }
        : { variant: "secondary", className: t };
    },
    "z",
    0,
    function (e) {
      return e
        ? `${r} border border-border-tertiary bg-transparent text-text-secondary hover:border-border-error hover:bg-bg-error/10 hover:text-text-error focus-visible:border-border-error focus-visible:bg-bg-error/10 focus-visible:text-text-error`
        : `${r} border border-transparent bg-bg-tertiary text-text-primary hover:bg-bg-quaternary focus-visible:bg-bg-quaternary`;
    },
  ]);
};
