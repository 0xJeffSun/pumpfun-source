// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var o = r.i(352386);
  let e = o.forwardRef(function ({ title: r, titleId: e, ...a }, l) {
    return o.createElement(
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
          ref: l,
          "aria-labelledby": e,
        },
        a,
      ),
      r ? o.createElement("title", { id: e }, r) : null,
      o.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18",
      }),
    );
  });
  r.s(["f", 0, e]);
};
