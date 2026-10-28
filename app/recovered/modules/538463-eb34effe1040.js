// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  let e = { current: null },
    i = { current: !1 };
  t.s(["E", 0, i, "d", 0, e], 758307);
  let s = "u" > typeof window;
  t.s(
    [
      "f",
      0,
      function () {
        if (((i.current = !0), s))
          if (window.matchMedia) {
            let t = window.matchMedia("(prefers-reduced-motion)"),
              i = () => (e.current = t.matches);
            (t.addEventListener("change", i), i());
          } else e.current = !1;
      },
    ],
    538463,
  );
};
