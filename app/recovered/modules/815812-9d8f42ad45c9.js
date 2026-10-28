// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  function r() {
    let e,
      t,
      n = new Promise((n, r) => {
        ((e = n), (t = r));
      });
    return { resolve: e, reject: t, promise: n };
  }
  (Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.defineProperty(n, "createPromiseWithResolvers", {
      enumerable: !0,
      get: function () {
        return r;
      },
    }));
};
