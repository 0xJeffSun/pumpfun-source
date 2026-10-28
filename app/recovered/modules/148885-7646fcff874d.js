// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "D",
    0,
    6,
    "W",
    0,
    (e, t) => {
      if (null == e || !/^\d+$/.test(e) || !Number.isInteger(t) || t < 0)
        return null;
      let l = BigInt(e).toString(),
        r = l.length > t ? l.slice(0, -t || void 0) : "0",
        n = l.length > t ? l.slice(l.length - t) : l.padStart(t, "0"),
        i = Number(0 === t ? r : `${r}.${n}`);
      return Number.isFinite(i) && i > 0 ? i : null;
    },
  ]);
};
