// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t, e, i) => {
  let r = t.r(984086).getSymbolSize;
  ((i.getRowColCoords = function (t) {
    if (1 === t) return [];
    let e = Math.floor(t / 7) + 2,
      i = r(t),
      o = 145 === i ? 26 : 2 * Math.ceil((i - 13) / (2 * e - 2)),
      n = [i - 7];
    for (let t = 1; t < e - 1; t++) n[t] = n[t - 1] - o;
    return (n.push(6), n.reverse());
  }),
    (i.getPositions = function (t) {
      let e = [],
        r = i.getRowColCoords(t),
        o = r.length;
      for (let t = 0; t < o; t++)
        for (let i = 0; i < o; i++)
          (0 !== t || 0 !== i) &&
            (0 !== t || i !== o - 1) &&
            (t !== o - 1 || 0 !== i) &&
            e.push([r[t], r[i]]);
      return e;
    }));
};
