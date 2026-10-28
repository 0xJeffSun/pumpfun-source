// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "A",
    0,
    ({ element: e, stickyOffset: t }) => {
      let { top: r } = e.getBoundingClientRect();
      return (
        !(r >= t) &&
        (window.scrollTo({
          top: Math.max(0, window.scrollY + r - t),
          behavior: "smooth",
        }),
        !0)
      );
    },
    "n",
    0,
    (e = 445, t = 20) => {
      (window.pageYOffset || document.documentElement.scrollTop) > e + t &&
        window.scrollTo({ top: e, behavior: "smooth" });
    },
  ]);
};
