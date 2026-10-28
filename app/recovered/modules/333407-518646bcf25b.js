// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  function t(e) {
    if (void 0 === e || "" === e) return;
    let t = Date.parse(e);
    return Number.isFinite(t) ? t : void 0;
  }
  e.s([
    "Q",
    0,
    function (e) {
      let i = t(e);
      return void 0 !== i && i <= Date.now();
    },
    "K",
    0,
    t,
  ]);
};
