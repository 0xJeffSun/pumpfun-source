// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, f) => {
  function r(e, t) {
    if (!e) throw Error(t || "Assertion failed");
  }
  ((t.exports = r),
    (r.equal = function (e, t, f) {
      if (e != t) throw Error(f || "Assertion failed: " + e + " != " + t);
    }));
};
