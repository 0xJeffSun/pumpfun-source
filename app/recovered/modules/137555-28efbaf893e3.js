// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    function (e, t) {
      let i = t?.trim(),
        r = i ? `$${i}` : "a coin";
      return `${e} called ${r} on pump.fun`;
    },
  ]);
};
