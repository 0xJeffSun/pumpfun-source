// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.defineProperty(n, "pathHasPrefix", {
      enumerable: !0,
      get: function () {
        return a;
      },
    }));
  let r = e.r(556494);
  function a(e, t) {
    if ("string" != typeof e) return !1;
    let { pathname: n } = (0, r.parsePath)(e);
    return n === t || n.startsWith(t + "/");
  }
};
