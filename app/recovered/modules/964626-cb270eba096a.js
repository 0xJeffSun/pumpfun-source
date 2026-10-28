// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    function (e) {
      if (null == e || !Number.isFinite(e) || e <= 0)
        return { label: "—", tone: "flat" };
      let t = e >= 10 ? 0 : e >= 2 ? 1 : 2,
        l = Number.parseFloat(e.toFixed(t)),
        n = l.toFixed(t);
      return (
        n.includes(".") && (n = n.replace(/\.?0+$/, "")),
        { label: `${n}x`, tone: l > 1 ? "up" : l < 1 ? "down" : "flat" }
      );
    },
  ]);
};
