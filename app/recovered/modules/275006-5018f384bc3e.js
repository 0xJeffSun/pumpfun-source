// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  let e = (0, t.i(99860).f)(() => {
    try {
      document
        .createElement("div")
        .animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch (t) {
      return !1;
    }
    return !0;
  }, "linearEasing");
  t.s(["f", 0, e]);
};
