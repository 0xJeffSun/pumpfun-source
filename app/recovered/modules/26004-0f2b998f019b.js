// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(389238);
  e.s([
    "f",
    0,
    (e, a) =>
      e === a ||
      (!!(e.startsWith("0x") && a.startsWith("0x")) &&
        42 === e.length &&
        42 === a.length &&
        (0, t.A)(e) === (0, t.A)(a)),
  ]);
};
