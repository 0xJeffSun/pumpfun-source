// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = null;
  e.s([
    "n",
    0,
    function (e) {
      t?.(e);
    },
    "r",
    0,
    function (e) {
      return (
        (t = e),
        () => {
          t === e && (t = null);
        }
      );
    },
  ]);
};
