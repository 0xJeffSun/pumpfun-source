// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(149502);
  let t = null;
  e.s([
    "C",
    0,
    function (e) {
      t && t(e);
    },
    "s",
    0,
    (e) =>
      [
        e.mint,
        e.walletAddress,
        e.initialTab ?? "chart",
        e.scope ? `${e.scope.fromMs}-${e.scope.toMs}` : "all",
      ].join("-"),
    "u",
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
