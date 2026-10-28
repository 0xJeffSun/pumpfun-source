// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, r, t) => {
  let s = e.r(38104),
    i = e.r(352628);
  r.exports = (e, r, t) => {
    let n = [],
      o = null,
      a = null,
      l = e.sort((e, r) => i(e, r, t));
    for (let e of l)
      s(e, r, t)
        ? ((a = e), o || (o = e))
        : (a && n.push([o, a]), (a = null), (o = null));
    o && n.push([o, null]);
    let p = [];
    for (let [e, r] of n)
      e === r
        ? p.push(e)
        : r || e !== l[0]
          ? r
            ? e === l[0]
              ? p.push(`<=${r}`)
              : p.push(`${e} - ${r}`)
            : p.push(`>=${e}`)
          : p.push("*");
    let c = p.join(" || "),
      h = "string" == typeof r.raw ? r.raw : String(r);
    return c.length < h.length ? c : r;
  };
};
