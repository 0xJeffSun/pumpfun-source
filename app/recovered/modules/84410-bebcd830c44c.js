// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(352386);
  let o = r.forwardRef(function ({ title: e, titleId: o, ...i }, a) {
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
          ref: a,
          "aria-labelledby": o,
        },
        i,
      ),
      e ? r.createElement("title", { id: o }, e) : null,
      r.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "m19.5 8.25-7.5 7.5-7.5-7.5",
      }),
    );
  });
  e.s(["f", 0, o]);
};
