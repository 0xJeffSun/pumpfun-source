// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    function (e, t) {
      let n = null,
        i = () =>
          (n ??= e().catch((e) => {
            throw ((n = null), e);
          }));
      return {
        load: i,
        warm: (e) => {
          i().then(e, t);
        },
      };
    },
  ]);
};
