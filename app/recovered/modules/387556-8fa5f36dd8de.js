// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(352386);
  let a = r.forwardRef(function ({ title: e, titleId: a, ...o }, i) {
    return r.createElement(
      "svg",
      Object.assign(
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          "aria-hidden": "true",
          "data-slot": "icon",
          ref: i,
          "aria-labelledby": a,
        },
        o,
      ),
      e ? r.createElement("title", { id: a }, e) : null,
      r.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18",
      }),
    );
  });
  e.s(["f", 0, a]);
};
