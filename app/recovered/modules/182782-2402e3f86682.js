// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    i = e.i(556872),
    r = e.i(732486),
    n = t.forwardRef((e, t) => {
      let { children: n, width: a = 10, height: o = 5, ...s } = e;
      return (0, r.jsx)(i.V.svg, {
        ...s,
        ref: t,
        width: a,
        height: o,
        viewBox: "0 0 30 10",
        preserveAspectRatio: "none",
        children: e.asChild
          ? n
          : (0, r.jsx)("polygon", { points: "0,0 30,0 15,10" }),
      });
    });
  ((n.displayName = "Arrow"), e.s(["f", 0, n]));
};
