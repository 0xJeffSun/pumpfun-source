// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.defineProperty(n, "addPathPrefix", {
      enumerable: !0,
      get: function () {
        return a;
      },
    }));
  let r = e.r(556494);
  function a(e, t) {
    if (!e.startsWith("/") || !t) return e;
    let { pathname: n, query: a, hash: l } = (0, r.parsePath)(e);
    return `${t}${n}${a}${l}`;
  }
};
