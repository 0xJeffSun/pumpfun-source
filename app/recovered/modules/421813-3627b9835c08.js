// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = ["mayhemRecreateDraft"];
  e.s([
    "q",
    0,
    function (e) {
      e.removeQueries({ queryKey: t, exact: !0 });
    },
    "u",
    0,
    function (e) {
      return e.getQueryData(t);
    },
    "W",
    0,
    function (e, i) {
      e.setQueryData(t, i);
    },
  ]);
};
