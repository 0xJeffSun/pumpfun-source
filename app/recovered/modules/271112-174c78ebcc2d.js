// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, r) => {
  let n = t.r(628151).getSymbolSize;
  ((r.getRowColCoords = function (t) {
    if (1 === t) return [];
    let e = Math.floor(t / 7) + 2,
      r = n(t),
      o = 145 === r ? 26 : 2 * Math.ceil((r - 13) / (2 * e - 2)),
      i = [r - 7];
    for (let t = 1; t < e - 1; t++) i[t] = i[t - 1] - o;
    return (i.push(6), i.reverse());
  }),
    (r.getPositions = function (t) {
      let e = [],
        n = r.getRowColCoords(t),
        o = n.length;
      for (let t = 0; t < o; t++)
        for (let r = 0; r < o; r++)
          (0 !== t || 0 !== r) &&
            (0 !== t || r !== o - 1) &&
            (t !== o - 1 || 0 !== r) &&
            e.push([n[t], n[r]]);
      return e;
    }));
};
