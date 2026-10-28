// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  function r(e) {
    return e.startsWith("/") ? e : `/${e}`;
  }
  (Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.defineProperty(n, "ensureLeadingSlash", {
      enumerable: !0,
      get: function () {
        return r;
      },
    }));
};
