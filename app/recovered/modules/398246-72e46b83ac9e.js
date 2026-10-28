// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  let e = [
    "animate",
    "circle",
    "defs",
    "desc",
    "ellipse",
    "g",
    "image",
    "line",
    "filter",
    "marker",
    "mask",
    "metadata",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "rect",
    "stop",
    "switch",
    "symbol",
    "svg",
    "text",
    "tspan",
    "use",
    "view",
  ];
  t.s(
    [
      "f",
      0,
      function (t) {
        if ("string" != typeof t || t.includes("-"));
        else if (e.indexOf(t) > -1 || /[A-Z]/u.test(t)) return !0;
        return !1;
      },
    ],
    398246,
  );
};
