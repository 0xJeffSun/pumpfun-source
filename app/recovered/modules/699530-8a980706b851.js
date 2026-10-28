// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.defineProperty(n, "callServer", {
      enumerable: !0,
      get: function () {
        return u;
      },
    }));
  let r = e.r(352386),
    a = e.r(313537),
    l = e.r(212835);
  async function u(e, t) {
    return new Promise((n, u) => {
      (0, r.startTransition)(() => {
        (0, l.dispatchAppRouterAction)({
          type: a.ACTION_SERVER_ACTION,
          actionId: e,
          actionArgs: t,
          resolve: n,
          reject: u,
        });
      });
    });
  }
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
