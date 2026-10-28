// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = ["narrow", "normal", "wide"],
    a = ["compact", "comfy"],
    i = ["framed", "flat"],
    n = { accents: !0, density: "comfy", columnWidth: "normal", frame: "flat" };
  e.s([
    "X",
    0,
    n,
    "$",
    0,
    (e) => {
      let r = e ?? {};
      return {
        accents: "boolean" == typeof r.accents ? r.accents : n.accents,
        density: a.includes(r.density) ? r.density : n.density,
        columnWidth: t.includes(r.columnWidth) ? r.columnWidth : n.columnWidth,
        frame: i.includes(r.frame) ? r.frame : n.frame,
      };
    },
  ]);
};
