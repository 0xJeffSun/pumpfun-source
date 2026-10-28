// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, r, t) => {
  var s = e.i(149502);
  r.exports =
    "object" == typeof s.default &&
    s.default.env &&
    s.default.env.NODE_DEBUG &&
    /\bsemver\b/i.test(s.default.env.NODE_DEBUG)
      ? (...e) => console.error("SEMVER", ...e)
      : () => {};
};
