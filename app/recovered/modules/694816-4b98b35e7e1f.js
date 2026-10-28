// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, r, t) => {
  let s = e.r(424522),
    i = e.r(444946),
    n = e.r(401542),
    o = (e) => e.startsWith("pre");
  r.exports = (e, r, t) => {
    let a, l;
    if (!i.RELEASE_TYPES.includes(r)) return null;
    let p = ((a = e), (l = t), s(a instanceof n ? a.version : a, l));
    return (
      p &&
      ((e, r) => {
        if (o(r)) return e.version;
        switch (((e.prerelease = []), r)) {
          case "major":
            ((e.minor = 0), (e.patch = 0));
            break;
          case "minor":
            e.patch = 0;
        }
        return e.format();
      })(p, r)
    );
  };
};
