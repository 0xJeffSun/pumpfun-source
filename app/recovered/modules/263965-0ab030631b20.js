// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    function (e, t) {
      let r = e.toString(),
        o = r.startsWith("-");
      o && (r = r.slice(1));
      let [a, s] = [
        (r = r.padStart(t, "0")).slice(0, r.length - t),
        r.slice(r.length - t),
      ];
      return (
        (s = s.replace(/(0+)$/, "")),
        `${o ? "-" : ""}${a || "0"}${s ? `.${s}` : ""}`
      );
    },
  ]);
};
