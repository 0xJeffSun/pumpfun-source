// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    function (e, t) {
      let s = e.toString(),
        i = s.startsWith("-");
      i && (s = s.slice(1));
      let [r, n] = [
        (s = s.padStart(t, "0")).slice(0, s.length - t),
        s.slice(s.length - t),
      ];
      return (
        (n = n.replace(/(0+)$/, "")),
        `${i ? "-" : ""}${r || "0"}${n ? `.${n}` : ""}`
      );
    },
  ]);
};
