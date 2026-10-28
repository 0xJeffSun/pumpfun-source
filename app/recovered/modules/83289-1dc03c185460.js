// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (e.i(149502), Object.defineProperty(n, "__esModule", { value: !0 }));
  var r = {
    initializeRouterTransitionModules: function () {
      return u;
    },
    startRouterTransition: function () {
      return o;
    },
  };
  for (var a in r) Object.defineProperty(n, a, { enumerable: !0, get: r[a] });
  (e.r(706957), e.r(220605));
  let l = [];
  function u(e) {
    l = e.filter((e) => null != e);
  }
  function o(e, t, n, r) {
    for (let n of l)
      try {
        let r;
        ((r = n), r.onRouterTransitionStart?.(e, t, null));
      } catch (e) {
        console.error(
          "An instrumentation-client router transition hook failed",
          e,
        );
      }
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
