// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  function r(e) {
    return 47 === e.charCodeAt(e.length - 1) && e.length > 1
      ? e.slice(0, -1)
      : e;
  }
  (Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.defineProperty(n, "removeTrailingSlash", {
      enumerable: !0,
      get: function () {
        return r;
      },
    }));
};
