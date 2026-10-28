// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, n) => {
  (e.i(149502),
    Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.defineProperty(n, "reducer", {
      enumerable: !0,
      get: function () {
        return c;
      },
    }));
  let r = e.r(313537),
    a = e.r(561448),
    l = e.r(249394),
    u = e.r(701546),
    o = e.r(916081),
    i = e.r(830789),
    c =
      "u" < typeof window
        ? function (e, t) {
            return e;
          }
        : function (e, t) {
            switch (t.type) {
              case r.ACTION_NAVIGATE:
                return (0, a.navigateReducer)(e, t);
              case r.ACTION_SERVER_PATCH:
                return (0, l.serverPatchReducer)(e, t);
              case r.ACTION_RESTORE:
                return (0, u.restoreReducer)(e, t);
              case r.ACTION_REFRESH:
                return (0, o.refreshReducer)(e, t);
              case r.ACTION_HMR_REFRESH:
                throw Error(
                  "hmrRefresh can only be used in development mode. Please use refresh instead.",
                );
              case r.ACTION_SERVER_ACTION:
                return (0, i.serverActionReducer)(e, t);
              default:
                throw Error("Unknown action");
            }
          };
  ("function" == typeof n.default ||
    ("object" == typeof n.default && null !== n.default)) &&
    void 0 === n.default.__esModule &&
    (Object.defineProperty(n.default, "__esModule", { value: !0 }),
    Object.assign(n.default, n),
    (t.exports = n.default));
};
