// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    function (e, t) {
      let r = e.toString(),
        s = r.startsWith("-");
      s && (r = r.slice(1));
      let [n, o] = [
        (r = r.padStart(t, "0")).slice(0, r.length - t),
        r.slice(r.length - t),
      ];
      return (
        (o = o.replace(/(0+)$/, "")),
        `${s ? "-" : ""}${n || "0"}${o ? `.${o}` : ""}`
      );
    },
  ]);
};
