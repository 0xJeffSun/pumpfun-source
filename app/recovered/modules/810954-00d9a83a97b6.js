// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t;
  let n =
      (((t = {}).startingStyle = "data-starting-style"),
      (t.endingStyle = "data-ending-style"),
      t),
    r = { [n.startingStyle]: "" },
    i = { [n.endingStyle]: "" };
  e.s([
    "S",
    0,
    n,
    "T",
    0,
    {
      transitionStatus: (e) =>
        "starting" === e ? r : "ending" === e ? i : null,
    },
  ]);
};
