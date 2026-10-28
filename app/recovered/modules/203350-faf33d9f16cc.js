// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  (e.i(149502),
    e.s([
      "j",
      0,
      (e, t) => {
        let r;
        (Object.keys(e)[0], Object.values(e)[0]);
        let n =
          "__livestreamRecordEventFn" in (r = window)
            ? (r.__livestreamRecordEventFn ?? null)
            : null;
        n && n(e, t);
      },
      "g",
      0,
      (e) => {
        window.__livestreamRecordEventFn = e ?? void 0;
      },
      "R",
      0,
      (e) => {},
    ]));
};
