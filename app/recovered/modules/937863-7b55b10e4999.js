// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(791898);
  let a = (e) =>
      [...new Set(e)].sort((e, a) => t.z.indexOf(e) - t.z.indexOf(a)),
    i = (e, t) => e.pins?.includes(t) ?? !1;
  e.s([
    "R",
    0,
    4,
    "b",
    0,
    (e) => {
      if (!Array.isArray(e)) return;
      let i = a(e.filter(t.g)).slice(0, 4);
      return i.length > 0 ? i : void 0;
    },
    "g",
    0,
    (e, t) => i(e, t) || (e.pins?.length ?? 0) < 4,
    "x",
    0,
    i,
    "Z",
    0,
    (e, t) => {
      let i = e.pins ?? [];
      if (i.includes(t)) {
        let { pins: a, ...n } = e,
          l = i.filter((e) => e !== t);
        return l.length > 0 ? { ...n, pins: l } : n;
      }
      return i.length >= 4 ? e : { ...e, pins: a([...i, t]) };
    },
  ]);
};
