// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    function (e, t) {
      let n = e.toString(),
        r = n.startsWith("-");
      r && (n = n.slice(1));
      let [i, s] = [
        (n = n.padStart(t, "0")).slice(0, n.length - t),
        n.slice(n.length - t),
      ];
      return (
        (s = s.replace(/(0+)$/, "")),
        `${r ? "-" : ""}${i || "0"}${s ? `.${s}` : ""}`
      );
    },
  ]);
};
