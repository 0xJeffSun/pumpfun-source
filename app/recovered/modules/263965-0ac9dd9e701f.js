// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    function (e, t) {
      let i = e.toString(),
        n = i.startsWith("-");
      n && (i = i.slice(1));
      let [r, s] = [
        (i = i.padStart(t, "0")).slice(0, i.length - t),
        i.slice(i.length - t),
      ];
      return (
        (s = s.replace(/(0+)$/, "")),
        `${n ? "-" : ""}${r || "0"}${s ? `.${s}` : ""}`
      );
    },
  ]);
};
