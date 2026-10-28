// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, r, t) => {
  let s = e.r(424522);
  r.exports = (e, r) => {
    let t = s(e.trim().replace(/^[=v]+/, ""), r);
    return t ? t.version : null;
  };
};
