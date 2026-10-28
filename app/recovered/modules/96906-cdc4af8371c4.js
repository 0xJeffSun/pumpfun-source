// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  (e.s(
    [
      "f",
      0,
      function (e, { timeout: t = 3e3, fallbackDelay: r = 2e3 } = {}) {
        if ("function" == typeof window.requestIdleCallback) {
          let r = window.requestIdleCallback(e, { timeout: t });
          return () => window.cancelIdleCallback(r);
        }
        let a = window.setTimeout(e, r);
        return () => window.clearTimeout(a);
      },
    ],
    96906,
  ),
    e.s(
      [
        "f",
        0,
        () => "u" > typeof navigator && navigator.connection?.saveData === !0,
      ],
      937164,
    ));
};
