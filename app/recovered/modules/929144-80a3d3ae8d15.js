// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  function n(e) {
    return Array.isArray(e) ? `${e[0]}|${e[1]}|${e[2]}` : e;
  }
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    Object.defineProperty(r, "createRouterCacheKey", {
      enumerable: !0,
      get: function () {
        return n;
      },
    }),
    ("function" == typeof r.default ||
      ("object" == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, "__esModule", { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default)));
};
