// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, r, t) => {
  let s = e.r(424522);
  r.exports = (e, r) => {
    let t = s(e, null, !0),
      i = s(r, null, !0),
      n = t.compare(i);
    if (0 === n) return null;
    let o = n > 0,
      a = o ? t : i,
      l = o ? i : t,
      p = !!a.prerelease.length;
    if (l.prerelease.length && !p) {
      if (!l.patch && !l.minor) return "major";
      if (0 === l.compareMain(a))
        return l.minor && !l.patch ? "minor" : "patch";
    }
    let c = p ? "pre" : "";
    return t.major !== i.major
      ? c + "major"
      : t.minor !== i.minor
        ? c + "minor"
        : t.patch !== i.patch
          ? c + "patch"
          : "prerelease";
  };
};
