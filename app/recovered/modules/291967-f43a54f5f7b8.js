// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  ("u" > typeof window && window.document && window.document.createElement,
    e.s([
      "f",
      0,
      function (e, t, { checkForDefaultPrevented: n = !0 } = {}) {
        return function (r) {
          if ((e?.(r), !1 === n || !r.defaultPrevented)) return t?.(r);
        };
      },
    ]));
};
