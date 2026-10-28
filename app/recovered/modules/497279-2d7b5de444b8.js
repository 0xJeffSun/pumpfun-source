// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    Object.defineProperty(r, "useUntrackedPathname", {
      enumerable: !0,
      get: function () {
        return a;
      },
    }));
  let n = e.r(352386),
    o = e.r(201800),
    i = e.r(675942);
  function a() {
    return !(function () {
      if ("u" < typeof window) {
        let e = i.workUnitAsyncStorage.getStore();
        if (!e) return !1;
        switch (e.type) {
          case "prerender":
          case "prerender-client":
          case "validation-client":
            let t = e.fallbackRouteParams;
            return !!t && t.size > 0;
        }
      }
      return !1;
    })()
      ? (0, n.useContext)(o.PathnameContext)
      : null;
  }
  ("function" == typeof r.default ||
    ("object" == typeof r.default && null !== r.default)) &&
    void 0 === r.default.__esModule &&
    (Object.defineProperty(r.default, "__esModule", { value: !0 }),
    Object.assign(r.default, r),
    (t.exports = r.default));
};
