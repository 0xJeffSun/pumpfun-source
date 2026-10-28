// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  t.s([
    "f",
    0,
    function (t, e) {
      let n = t.toString(),
        i = n.startsWith("-");
      i && (n = n.slice(1));
      let [s, r] = [
        (n = n.padStart(e, "0")).slice(0, n.length - e),
        n.slice(n.length - e),
      ];
      return (
        (r = r.replace(/(0+)$/, "")),
        `${i ? "-" : ""}${s || "0"}${r ? `.${r}` : ""}`
      );
    },
  ]);
};
