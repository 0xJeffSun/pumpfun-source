// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  function r(e, t) {
    let n = e || 75;
    return t?.qualities?.length
      ? t.qualities.reduce(
          (e, t) => (Math.abs(t - n) < Math.abs(e - n) ? t : e),
          t.qualities[0],
        )
      : n;
  }
  (Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.defineProperty(n, "findClosestQuality", {
      enumerable: !0,
      get: function () {
        return r;
      },
    }));
};
