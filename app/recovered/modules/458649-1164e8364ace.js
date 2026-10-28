// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(149502);
  var t = e.i(352386),
    n = e.i(732486);
  let r = t.forwardRef(function (e, t) {
    let r,
      { cutout: i, ...o } = e;
    if (i) {
      let e = i?.getBoundingClientRect();
      r = `polygon(
      0% 0%,
      100% 0%,
      100% 100%,
      0% 100%,
      0% 0%,
      ${e.left}px ${e.top}px,
      ${e.left}px ${e.bottom}px,
      ${e.right}px ${e.bottom}px,
      ${e.right}px ${e.top}px,
      ${e.left}px ${e.top}px
    )`;
    }
    return (0, n.jsx)("div", {
      ref: t,
      role: "presentation",
      "data-base-ui-inert": "",
      ...o,
      style: {
        position: "fixed",
        inset: 0,
        userSelect: "none",
        WebkitUserSelect: "none",
        clipPath: r,
      },
    });
  });
  e.s(["f", 0, r]);
};
