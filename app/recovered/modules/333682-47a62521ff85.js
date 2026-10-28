// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, r, t) => {
  let s = e.r(401542),
    i = e.r(247071),
    n = e.r(573159);
  r.exports = (e, r) => {
    e = new i(e, r);
    let t = new s("0.0.0");
    if (e.test(t) || ((t = new s("0.0.0-0")), e.test(t))) return t;
    t = null;
    for (let r = 0; r < e.set.length; ++r) {
      let i = e.set[r],
        o = null;
      (i.forEach((e) => {
        let r = new s(e.semver.version);
        switch (e.operator) {
          case ">":
            (0 === r.prerelease.length ? r.patch++ : r.prerelease.push(0),
              (r.raw = r.format()));
          case "":
          case ">=":
            (!o || n(r, o)) && (o = r);
            break;
          case "<":
          case "<=":
            break;
          default:
            throw Error(`Unexpected operation: ${e.operator}`);
        }
      }),
        o && (!t || n(t, o)) && (t = o));
    }
    return t && e.test(t) ? t : null;
  };
};
