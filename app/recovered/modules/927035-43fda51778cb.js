// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var o = e.i(352386);
  let n = o.forwardRef(function ({ title: e, titleId: n, ...r }, t) {
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
          ref: t,
          "aria-labelledby": n,
        },
        r,
      ),
      e ? o.createElement("title", { id: n }, e) : null,
      o.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
      }),
    );
  });
  e.s(["f", 0, n]);
};
