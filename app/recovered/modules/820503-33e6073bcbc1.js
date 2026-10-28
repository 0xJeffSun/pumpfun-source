// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, r, t) => {
  let s = /^[0-9]+$/,
    i = (e, r) => {
      if ("number" == typeof e && "number" == typeof r)
        return e === r ? 0 : e < r ? -1 : 1;
      let t = s.test(e),
        i = s.test(r);
      return (
        t && i && ((e *= 1), (r *= 1)),
        e === r ? 0 : t && !i ? -1 : i && !t ? 1 : e < r ? -1 : 1
      );
    };
  r.exports = { compareIdentifiers: i, rcompareIdentifiers: (e, r) => i(r, e) };
};
