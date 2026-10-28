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
      let l = e ?? {};
      return {
        accents: "boolean" == typeof l.accents ? l.accents : n.accents,
        density: a.includes(l.density) ? l.density : n.density,
        columnWidth: t.includes(l.columnWidth) ? l.columnWidth : n.columnWidth,
        frame: i.includes(l.frame) ? l.frame : n.frame,
      };
    },
  ]);
};
