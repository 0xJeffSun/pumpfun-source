// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  function r(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "then" in e &&
      "function" == typeof e.then
    );
  }
  (Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.defineProperty(n, "isThenable", {
      enumerable: !0,
      get: function () {
        return r;
      },
    }));
};
