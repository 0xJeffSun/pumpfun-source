// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    function (e, t, { checkForDefaultPrevented: r = !0 } = {}) {
      return function (n) {
        if ((e?.(n), !1 === r || !n.defaultPrevented)) return t?.(n);
      };
    },
  ]);
};
